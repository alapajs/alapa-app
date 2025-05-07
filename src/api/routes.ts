import { Request, Router, Response } from "alapa";
import { Users } from "../models/user";
import { PostController } from "./controller";
const apiRoutes = new Router();

apiRoutes.post("/user", (req: Request, res: Response) => {
  res.api({
    status: "success",
    message: "User created successfully",
    data: {
      id: 1,
      email: "test@example.com",
      role: "user",
    },
  });
});
apiRoutes.controller("posts", PostController);
apiRoutes.get("/users", async (req: Request, res: Response) => {
  const users = Users.find();
  res.api({
    status: "success",
    data: users,
    message: "Users retrieved successfully",
  });
});

export default apiRoutes;
