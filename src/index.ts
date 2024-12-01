import express, { Request, Response } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import errorHandling from "./middlewares/errorHandling";
import taskRoutes from "./routes/taskroutes";
import tagRoutes from "./routes/tagroutes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to to-do-list API!");
});

app.get("/api", (req: Request, res: Response) => {
  res.json({
    taskRoute: [
      {
        method: "GET",
        route: "/api/v1/tasks",
      },
      {
        method: "POST",
        route: "/api/v1/tasks",
      },
      {
        method: "PUT",
        route: "/api/v1/tasks/:id",
      },
      {
        method: "DELETE",
        route: "/api/v1/tasks/:id",
      },
    ],
    tagRoute: [
      {
        method: "GET",
        route: "/api/v1/tags",
      },
      {
        method: "POST",
        route: "/api/v1/tags",
      },
      {
        method: "DELETE",
        route: "/api/v1/tags/:id"
      }
    ],
  });
});

app.use("/api/v1", taskRoutes);
app.use("/api/v1", tagRoutes);

app.use(errorHandling);

const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
mongoose
  .connect(mongo_uri)
  .then(() => console.log("Database connected."))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
