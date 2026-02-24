import {
  Controller,
  DatabaseConnection,
  OpenApiOperation,
  Request,
  Response,
} from "alapa";
// import { redisClient } from "../../service/redis";
import os from "os";

export class HealthController extends Controller {
  @OpenApiOperation({
    description: "Check server health",
    summary: "Check server health",

    responses: {
      200: {
        description: "Server is running",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
                data: {
                  type: "object",
                  properties: {
                    updated_at: {
                      type: "string",
                    },
                    uptime: {
                      type: "number",
                    },
                    memoryUsage: {
                      type: "object",
                    },
                    cpuUsage: {
                      type: "object",
                    },
                    version: {
                      type: "string",
                    },
                    platform: {
                      type: "string",
                    },
                    release: {
                      type: "string",
                    },
                    pid: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  getLive(req: Request, res: Response) {
    try {
      // Basic sanity checks
      const uptime = process.uptime();
      const memory = process.memoryUsage();
      // const memoryLimitMb = 1024;
      // const rssMb = memory.rss / 1024 / 1024;

      // if (rssMb > memoryLimitMb) {
      //   return res.status(500).json({
      //     status: "error",
      //     message: "Memory threshold exceeded",
      //   });
      // }

      return res.status(200).json({
        status: "success",
        message: "Application is alive",
        data: {
          updated_at: new Date().toISOString(),
          uptime: Math.floor(uptime),
          memory: {
            rss: memory.rss,
            heapUsed: memory.heapUsed,
            heapTotal: memory.heapTotal,
          },
          pid: process.pid,
          platform: os.platform(),
          node_version: process.version,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Application unhealthy",
      });
    }
  }

  @OpenApiOperation({
    description: "Check server readiness",
    summary: "Check server readiness",
    responses: {
      200: {
        description: "Server is ready",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
                data: {
                  type: "object",
                  properties: {
                    updated_at: {
                      type: "string",
                    },
                    uptime: {
                      type: "number",
                    },
                    memoryUsage: {
                      type: "object",
                    },
                    cpuUsage: {
                      type: "object",
                    },
                    version: {
                      type: "string",
                    },
                    platform: {
                      type: "string",
                    },
                    release: {
                      type: "string",
                    },
                    pid: {
                      type: "number",
                    },
                    database: {
                      type: "boolean",
                    },
                    redis: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getReady(req: Request, res: Response) {
    try {
      // --- DATABASE CHECK ---
      // Run a lightweight query with a timeout
      const dbPromise = DatabaseConnection.query("SELECT 1");
      const dbTimeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 2000),
      );
      await Promise.race([dbPromise, dbTimeout]);

      // --- REDIS CHECK ---
      //   const redisPromise = redisClient.ping();
      //   const redisTimeout = new Promise((_, reject) =>
      //     setTimeout(() => reject(new Error("Redis timeout")), 2000),
      //   );
      //   await Promise.race([redisPromise, redisTimeout]);

      // If both succeed, return ready
      return res.status(200).json({
        status: "success",
        message: "Application is ready",
        data: {
          updated_at: new Date().toISOString(),
          uptime: Math.floor(process.uptime()),
          pid: process.pid,
          memoryUsage: process.memoryUsage(),
          database: true,
          redis: true,
        },
      });
    } catch (error) {
      // If either DB or Redis fails
      return res.status(503).json({
        status: "error",
        message: `Not ready: ${(error as Error).message}`,
        data: {
          updated_at: new Date().toISOString(),
          uptime: Math.floor(process.uptime()),
          pid: process.pid,
          memoryUsage: process.memoryUsage(),
          database: DatabaseConnection.isInitialized, // best guess
          redis: false,
        },
      });
    }
  }
}
