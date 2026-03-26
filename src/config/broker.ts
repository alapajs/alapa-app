import { BrokerAdapter, BrokerConfiguration } from "alapa";
import { KafkaBrokerAdapter } from "../service/broker/kafka";
import { RedisBrokerAdapter } from "../service/broker/redis";

const brokerAdapters: Record<string, new () => BrokerAdapter<any>> = {
  redis: RedisBrokerAdapter,
  kafka: KafkaBrokerAdapter,
};

const adapter = brokerAdapters[process.env.BROKER_ADAPTER || "redis"];
console.log(adapter);

export const brokerConfig: BrokerConfiguration = {
  adapter: adapter,
  host: process.env.BROKER_HOST || "localhost",
  port: Number(process.env.BROKER_PORT) || 5672,
  username: process.env.BROKER_USERNAME || "guest",
  password: process.env.BROKER_PASSWORD || "guest",
  virtualHost: process.env.BROKER_VIRTUAL_HOST || "/",
  ssl: process.env.BROKER_SSL === "true",
  enabled: process.env.BROKER_ENABLED === "true",

  url: process.env.BROKER_URL || "amqp://guest:guest@localhost:5672/",
  protocol: process.env.BROKER_PROTOCOL || "amqp",

  headers: {
    "x-custom-header": "dummy-header",
  },

  options: {
    durable: true,
    autoDelete: false,
  },

  connectionOptions: {
    reconnect: true,
    heartbeatIntervalInSeconds: 30,
  },

  socketOptions: {
    timeout: 5000,
    keepAlive: true,
  },

  authentication: {
    mechanism: "PLAIN",
  },

  retry: {
    retries: 5,
    factor: 2,
    maxTimeout: 30000,
  },

  timeout: 10000,
  prefetch: 10,
  heartbeat: 60,

  queueOptions: {
    durable: true,
    autoDelete: false,
  },

  consumerOptions: {
    noAck: false,
  },

  publisherOptions: {
    persistent: true,
  },

  replyToQueueOptions: {
    durable: false,
    autoDelete: true,
  },

  replyToQueueName: "dummy.reply.queue",
  replyToQueueRoutingKey: "dummy.routing.key",
  replyToQueueCorrelationId: "dummy-correlation-id",
  replyToQueueExpiration: 60000,
  replyToQueueTtl: 30000,
  replyToQueueDeadLetterExchange: "dead.letter.exchange",
  replyToQueueDeadLetterRoutingKey: "dead.letter.route",
  replyToQueueMaxLength: 1000,
  replyToQueueMaxLengthBytes: 1048576,
  replyToQueueMessageTtl: 120000,
};
