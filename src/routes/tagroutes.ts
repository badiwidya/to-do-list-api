import { Router } from "express";
import TagController from "../controllers/tagController";
const tagController = new TagController();

const router = Router();

router.get("/tags", tagController.getTags);
router.post("/tags", tagController.createTags);
router.delete("/tags/:id", tagController.deleteTags);

export default router;
