import express from "express";
import { createNote, deleteNote, getNotes } from "../controllers/noteController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getNotes);
router.post("/", verifyToken, createNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
