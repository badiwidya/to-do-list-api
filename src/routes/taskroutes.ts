import { Router } from "express";
import TaskController from "../controllers/taskController";
const taskController = new TaskController();

const router = Router();

router.get("/tasks", taskController.getTask);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.editTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
