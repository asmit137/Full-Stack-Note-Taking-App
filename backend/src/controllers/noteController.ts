import { Request, Response } from "express";
import Notedeloite from "../models/Note";

export const getNotes = async (req: any, res: Response) => {
  const notes = await Notedeloite.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
};

export const createNote = async (req: any, res: Response) => {
  const note = await Notedeloite.create({ userId: req.user.id, content: req.body.content });
  res.status(201).json(note);
};

export const deleteNote = async (req: any, res: Response) => {
  await Notedeloite.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
};
