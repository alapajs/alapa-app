import {
  Router,
  Request,
  Response,
  ResourcefulController,
  Params,
  OpenApiPath,
  OpenApiOperation,
  OpenApiPathMethod,
} from "alapa";

const indexRoute = new Router();

indexRoute.get("/", async (req: Request, res: Response) => {
  res.render("index");
});

indexRoute.view("/view", "index");

class UserController implements ResourcefulController {
  // public docPrefix = "my-doc-prefix";
  // static docPrefix = "my-doc-prefix-static";
  printEndpoint(req: Request) {
    return {
      message: req.method + " " + req.url + " " + "Called Successfully",
    };
  }
  @OpenApiOperation({
    summary: "Get all users",
    description: "Returns all users",
    parameters: [
      {
        in: "query",
        name: "limit",
        schema: {
          type: "integer",
          minimum: 1,
        },
        description: "Limit the number of results",
      },
      {
        in: "query",
        name: "sort",
        schema: {
          type: "string",
          enum: ["asc", "desc"],
        },
        description: "Sort the results in ascending or descending order",
      },
    ],
    responses: {
      200: {
        description: "All users",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                },
                required: ["id", "name"],
              },
            },
          },
        },
      },
    },
  })
  create(req: Request, res: Response) {
    return res.json(this.printEndpoint(req));
  }

  @OpenApiOperation({
    summary: "Update a user",
    description: "Updates a user",
    parameters: [
      {
        in: "path",
        name: "user",
        schema: {
          type: "integer",
        },
        description: "The user ID",
      },
    ],
    responses: {
      200: {
        description: "User updated",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
              },
              required: ["id", "name"],
            },
          },
        },
      },
    },
  })
  edit(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }
  index(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }
  show(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }
  @OpenApiOperation({
    parameters: [
      {
        in: "path",
        name: "user",
        schema: {
          type: "integer",
        },
        description: "The user ID",
      },
    ],
  })
  @Params("type")
  store(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }

  @OpenApiPathMethod({
    get: {
      summary: "Show a user",
      description: "Shows a user",
      parameters: [
        {
          in: "path",
          name: "user",
          schema: {
            type: "integer",
          },
          description: "The user ID",
        },
      ],
      responses: {
        200: {
          description: "User retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                },
                required: ["id", "name"],
              },
            },
          },
        },
      },
    },
  })
  update(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }
  destroy(req: Request, res: Response) {
    res.send(this.printEndpoint(req));
  }
}

indexRoute.resource("users", UserController);

export class MyRoutes {
  @OpenApiOperation({
    summary: "My custom route",
    description: "My custom route",
  })
  deleteMyData(req: Request, res: Response) {
    res.send("My custom route" + req.url);
  }
}

indexRoute.controller(MyRoutes);
// indexRoute.get("my-route-at", "MyRoutes@index");

export default indexRoute;
