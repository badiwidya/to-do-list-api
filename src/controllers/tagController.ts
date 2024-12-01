import { Request, Response, NextFunction } from "express";
import { Tags } from "../models/Tags";

class TagController {
  public async createTags(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const newTask = req.body;
      await Tags.create(newTask);
      res.status(201).json({ message: "Tag added successfully." });
    } catch (err) {
      next(err);
    }
  }

  public async getTags(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const tags = await Tags.find();
      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  }

  public async deleteTags(req: Request, res: Response, next: NextFunction): Promise<any | void> {
    try {
      const { id } = req.params;
      const tags = await Tags.findByIdAndDelete(id);
      if (!tags) {
        return res.status(400).json({ message: "Tag not found." });
      }
      res.status(200).json({ message: "Tag deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
}

export default TagController;
