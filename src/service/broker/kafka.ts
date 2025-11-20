// kafka.adapter.ts
import {
  Kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  logLevel,
  SASLOptions,
} from "kafkajs";
import { BrokerAdapter, BrokerMessage, BrokerSubscription, ENV } from "alapa";
import { USER_BROKER_TOPICS } from "./topics";

export interface KafkaAdapterOptions {
  clientId?: string;
  brokers: string[];
  groupId?: string;
  ssl?: boolean;
  sasl?: {
    mechanism: "plain" | "scram-sha-256" | "scram-sha-512";
    username: string;
    password: string;
  };
}

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
  // ssl: true,
  // sasl: {
  //   mechanism: "scram-sha-256", // ✅ must be one of: "plain" | "scram-sha-256" | "scram-sha-512"
  //   username: "kafka-user",
  //   password: "kafka-pass",
  // },
  logLevel: logLevel.INFO,
});
const mechanism = process.env.KAFKA_MECHANISM as
  | "plain"
  | "scram-sha-256"
  | "scram-sha-512";

export class KafkaBrokerAdapter<T = any> extends BrokerAdapter<T> {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private connected = false;
  private subscriptions = new Map<string, boolean>();

  readonly adapterName: string = "kafka";

  constructor(private options?: KafkaAdapterOptions) {
    super();
    const sasl: SASLOptions = {
      mechanism:
        (process.env.KAFKA_MECHANISM as
          | "plain"
          | "scram-sha-256"
          | "scram-sha-512") || "plain",
      username: process.env.KAFKA_USERNAME || "",
      password: process.env.KAFKA_PASSWORD || "",
    };

    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || "kulskit-app",
      brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
      // ssl: true,
      // sasl,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: options?.groupId || "default-group",
    });
  }

  /**
   * Connect producer and consumer
   */
  async connect(): Promise<void> {
    if (this.connected) return;
    await this.producer.connect();
    await this.consumer.connect();
    this.connected = true;
    this.ensureTopicsOnDev();
  }

  /**
   * Disconnect all connections gracefully
   */
  async disconnect(): Promise<void> {
    await Promise.all([this.producer.disconnect(), this.consumer.disconnect()]);
    this.connected = false;
  }

  /**
   * Publish a message to a Kafka topic
   */
  async publish(topic: string, message: T): Promise<void> {
    if (!this.connected) throw new Error("Kafka is not connected.");
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  /**
   * Subscribe to a Kafka topic
   */
  async subscribe(
    topic: string,
    handler: (message: BrokerMessage<T>) => Promise<void> | void
  ): Promise<BrokerSubscription> {
    if (!this.connected) throw new Error("Kafka is not connected.");

    // Subscribe only once per topic
    if (!this.subscriptions.has(topic)) {
      await this.consumer.subscribe({ topic, fromBeginning: false });
      this.subscriptions.set(topic, true);
    }

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (!message.value) return;

        const data = JSON.parse(message.value.toString()) as T;
        const brokerMessage: BrokerMessage<T> = { data };
        try {
          await handler(brokerMessage);
          brokerMessage.ack?.(); // optional ack if handler supports it
        } catch (err) {
          brokerMessage.nack?.(err);
        }
      },
    });

    return {
      topic,
      unsubscribe: () => this.unsubscribe(topic),
    };
  }

  /**
   * Unsubscribe from a Kafka topic
   */
  async unsubscribe(topic: string): Promise<void> {
    // KafkaJS doesn't support unsubscribing a single topic dynamically
    // We can mark it inactive or recreate a consumer later if needed
    this.subscriptions.delete(topic);
  }

  /**
   * Kafka doesn't natively support RPC patterns,
   * but this placeholder keeps your API consistent.
   */
  async request<R = any>(
    topic: string,
    payload: T,
    timeout?: number
  ): Promise<R> {
    await this.publish(topic, payload);
    throw new Error("Kafka request/response is not implemented.");
  }

  /**
   * Return connection status
   */
  isConnected(): boolean {
    return this.connected;
  }

  async createTopics(...topics: string[]): Promise<void> {
    const admin = this.kafka.admin();
    await admin.connect();

    if (!this.connected) throw new Error("Kafka not connected");

    const existingTopics = await admin.listTopics();
    const missingTopics = topics.filter((t) => !existingTopics.includes(t));

    if (missingTopics.length === 0) {
      await admin.disconnect();
      return;
    }

    await admin.createTopics({
      topics: missingTopics.map((t) => ({
        topic: t,
        numPartitions: 3,
        replicationFactor: 1,
      })),
    });

    await admin.disconnect();
  }

  private ensureTopicsOnDev() {
    if (ENV == "development") {
      const usersTopics = Object.values(USER_BROKER_TOPICS);
      this.createTopics(...usersTopics);
    }
  }
}
