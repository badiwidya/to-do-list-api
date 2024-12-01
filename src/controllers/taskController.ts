import { Request, Response, NextFunction } from "express";
import { Tasks, TaskStatus } from "../models/Tasks";
import { ITags } from "../models/Tags";

class TaskController {
  public async getTask(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const tasks = await Tasks.find().populate<{ tags: ITags[] }>({ path: "tags", select: "name description", model: "Tags" });
      const taskCount = await Tasks.countDocuments();
      res.status(200).json({ count: taskCount, tasks });
    } catch (err) {
      next(err);
    }
  }

  public async createTask(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const { name, tags, status, deadline } = req.body;
      if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        return res.status(400).json({ message: "Status must be any of: " + Object.values(TaskStatus).join(" or ") });
      }
      const newTask = {
        name,
        tags,
        status,
        deadline,
      };
      await Tasks.create(newTask);
      res.status(201).json({ message: "Task added successfully." });
    } catch (err) {
      next(err);
    }
  }

  public async editTask(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const { name, tags, status, deadline } = req.body;
      const { id } = req.params;
      if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        return res.status(400).json({ message: "Status must be any | void of" + TaskStatus });
      }
      const updatedData = {
        name,
        tags,
        status,
        deadline,
      };
      const updateTask = await Tasks.findByIdAndUpdate(id, updatedData);
      if (!updateTask) {
        return res.status(404).json({ message: "Task not found." });
      }
      res.status(200).json({ message: "Task updated successfully.", updateTask });
    } catch (err) {
      next(err);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const { id } = req.params;
      const deleteTask = await Tasks.findByIdAndDelete(id);
      if (!deleteTask) {
        return res.status(404).json({ message: "Task not found." });
      }
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
}

export default TaskController;
