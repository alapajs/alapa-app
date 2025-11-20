// redis.adapter.ts
import Redis, { Redis as RedisClient } from "ioredis";
import {
  BrokerAdapter,
  BrokerMessage,
  BrokerSubscription,
  Logger,
} from "alapa";

export interface RedisAdapterOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  db?: number;
  tls?: boolean;
  // Additional Redis-specific options
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
  lazyConnect?: boolean;
}

/**
 * RedisBrokerAdapter
 * Complete implementation of BrokerAdapter interface for Redis Pub/Sub
 */
export class RedisBrokerAdapter<T = any> extends BrokerAdapter<T> {
  private static instance: RedisBrokerAdapter<any>;
  private client: RedisClient;
  private subscriber: RedisClient;
  private connected = false;
  readonly adapterName: string = "redis";
  private subscriptions = new Map<
    string,
    Set<(message: BrokerMessage<T>) => void>
  >();
  private connectionPromise: Promise<void> | null = null;
  private messageHandlers = new Map<
    string,
    (message: BrokerMessage<T>) => void
  >();

  constructor(private options: RedisAdapterOptions = {}) {
    super();

    // Singleton pattern to prevent multiple connections
    if (RedisBrokerAdapter.instance) {
      return RedisBrokerAdapter.instance as RedisBrokerAdapter<T>;
    }

    const redisOptions = {
      host: options.host || process.env.REDIS_HOST || "127.0.0.1",
      port: options.port || +(process.env.REDIS_PORT || 6379),
      username: options.username || process.env.REDIS_USERNAME,
      password: options.password || process.env.REDIS_PASSWORD,
      db: options.db || 0,
      tls: options.tls ? {} : undefined,
      lazyConnect: options.lazyConnect ?? true, // Prevent auto-connect
      retryDelayOnFailover: options.retryDelayOnFailover || 100,
      maxRetriesPerRequest: options.maxRetriesPerRequest || 3,
    };

    this.client = new Redis(redisOptions);
    this.subscriber = this.client.duplicate();

    // Setup message handler for subscriber
    this.setupSubscriberHandler();

    RedisBrokerAdapter.instance = this;
  }

  /**
   * Establish a connection to Redis
   */
  async connect(): Promise<void> {
    if (this.connected) return;

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = (async () => {
      try {
        await Promise.all([this.client.connect(), this.subscriber.connect()]);
        this.connected = true;
        this.connectionPromise = null;

        // console.log("Redis Broker Adapter connected successfully");
      } catch (error) {
        this.connectionPromise = null;
        // console.error("Redis connection failed:", error);
        throw error;
      }
    })();

    return this.connectionPromise;
  }

  /**
   * Gracefully close all connections
   */
  async disconnect(): Promise<void> {
    try {
      // Unsubscribe from all channels
      const unsubscribePromises = Array.from(this.subscriptions.keys()).map(
        (topic) => this.unsubscribe(topic)
      );
      await Promise.all(unsubscribePromises);

      await Promise.all([
        this.client.disconnect(),
        this.subscriber.disconnect(),
      ]);
      this.connected = false;
      this.subscriptions.clear();
      this.messageHandlers.clear();

      // console.log("Redis Broker Adapter disconnected");
    } catch (error) {
      // console.error("Error disconnecting Redis:", error);
      throw error;
    }
  }

  /**
   * Publish a message to a Redis channel
   */
  async publish(
    topic: string,
    message: T,
    options?: Record<string, any>
  ): Promise<void> {
    if (!this.connected) {
      throw new Error("Redis is not connected. Call connect() first.");
    }

    try {
      const messagePayload = JSON.stringify({
        data: message,
        metadata: options || {},
        timestamp: Date.now(),
      });

      await this.client.publish(topic, messagePayload);
    } catch (error) {
      // console.error(`Failed to publish message to topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Subscribe to a Redis channel
   */
  async subscribe(
    topic: string,
    handler: (message: BrokerMessage<T>) => Promise<void> | void
  ): Promise<BrokerSubscription> {
    if (!this.connected) {
      throw new Error("Redis is not connected. Call connect() first.");
    }

    // Initialize topic set if it doesn't exist
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());

      // Subscribe to Redis channel only once per topic
      await this.subscriber.subscribe(topic);
      // console.log(`Subscribed to Redis channel: ${topic}`);
    }

    // Add handler to the topic's handler set
    const topicHandlers = this.subscriptions.get(topic)!;
    topicHandlers.add(handler);

    // Create subscription object
    const subscription: BrokerSubscription = {
      topic,
      unsubscribe: async () => {
        await this.unsubscribeHandler(topic, handler);
      },
    };

    return subscription;
  }

  /**
   * Unsubscribe from a Redis channel
   */
  async unsubscribe(topic: string): Promise<void> {
    if (this.subscriptions.has(topic)) {
      // Unsubscribe from Redis channel
      await this.subscriber.unsubscribe(topic);

      // Remove all handlers for this topic
      this.subscriptions.delete(topic);
      this.messageHandlers.delete(topic);

      // console.log(`Unsubscribed from Redis channel: ${topic}`);
    }
  }

  /**
   * Remove a specific handler from a topic
   */
  private async unsubscribeHandler(
    topic: string,
    handler: (message: BrokerMessage<T>) => void
  ): Promise<void> {
    const topicHandlers = this.subscriptions.get(topic);
    if (topicHandlers) {
      topicHandlers.delete(handler);

      // If no more handlers, unsubscribe from Redis channel
      if (topicHandlers.size === 0) {
        await this.unsubscribe(topic);
      }
    }
  }

  /**
   * Redis Pub/Sub doesn't natively support request/response pattern
   * This is a basic implementation using separate channels
   */
  async request<R = any>(
    topic: string,
    payload: T,
    timeout: number = 30000
  ): Promise<R> {
    if (!this.connected) {
      throw new Error("Redis is not connected. Call connect() first.");
    }

    return new Promise<R>(async (resolve, reject) => {
      const correlationId = this.generateCorrelationId();
      const replyTopic = `${topic}.reply.${correlationId}`;

      const timeoutId = setTimeout(() => {
        this.subscriber.unsubscribe(replyTopic);
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);

      // Subscribe to reply channel
      await this.subscriber.subscribe(replyTopic);

      const messageHandler = (chan: string, message: string) => {
        if (chan === replyTopic) {
          clearTimeout(timeoutId);
          this.subscriber.unsubscribe(replyTopic);
          this.subscriber.off("message", messageHandler);

          try {
            const parsed = JSON.parse(message);
            resolve(parsed.data);
          } catch (error) {
            reject(new Error("Invalid response format"));
          }
        }
      };

      this.subscriber.on("message", messageHandler);

      // Send request
      await this.publish(topic, {
        ...payload,
        replyTo: replyTopic,
        correlationId,
      } as any);
    });
  }

  /**
   * Check if connected to Redis
   */
  isConnected(): boolean {
    return (
      this.connected &&
      this.client.status === "ready" &&
      this.subscriber.status === "ready"
    );
  }

  /**
   * Setup subscriber message handler
   */
  private setupSubscriberHandler(): void {
    this.subscriber.on("message", async (channel: string, message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        const brokerMessage: BrokerMessage<T> = {
          data: parsedMessage.data,
          metadata: parsedMessage.metadata || {},
          ack: () => {
            // Redis Pub/Sub doesn't have native ack, but we can log it
            // console.log(`Message acknowledged for channel ${channel}`);
          },
          nack: (err?: any) => {
            console.error(`Message rejected for channel ${channel}:`, err);
            // In a more advanced implementation, you might want to
            // publish to a dead letter queue or retry mechanism
          },
        };

        // Call all handlers for this channel
        const topicHandlers = this.subscriptions.get(channel);
        if (topicHandlers) {
          for (const handler of topicHandlers) {
            try {
              handler(brokerMessage);
            } catch (error) {
              console.error(
                `Error in message handler for channel ${channel}:`,
                error
              );
              brokerMessage.nack?.(error);
            }
          }
        }
      } catch (error) {
        Logger.error(
          `Failed to process message from channel ${channel}:`,
          error
        );
      }
    });

    // Handle connection events
    this.client.on("error", (error) => {
      Logger.error("Redis client error:", error);
    });

    this.subscriber.on("error", (error) => {
      Logger.error("Redis subscriber error:", error);
    });

    this.client.on("connect", () => {
      // console.log("Redis client connected");
    });

    this.subscriber.on("connect", () => {
      // console.log("Redis subscriber connected");
    });
  }

  /**
   * Generate unique correlation ID for request/response
   */
  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get singleton instance
   */
  static getInstance<T>(options?: RedisAdapterOptions): RedisBrokerAdapter<T> {
    if (!RedisBrokerAdapter.instance) {
      RedisBrokerAdapter.instance = new RedisBrokerAdapter<T>(options);
    }
    return RedisBrokerAdapter.instance as RedisBrokerAdapter<T>;
  }

  /**
   * Get subscription count for monitoring
   */
  getSubscriptionCount(): number {
    return this.subscriptions.size;
  }

  /**
   * Get handler count for a specific topic
   */
  getHandlerCount(topic: string): number {
    return this.subscriptions.get(topic)?.size || 0;
  }
}
