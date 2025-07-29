import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Userdeloite" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notedeloite", noteSchema);
