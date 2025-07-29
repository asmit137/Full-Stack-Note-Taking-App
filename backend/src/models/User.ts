import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  dateOfBirth: Date,
  otp: String,
  otpExpires: Date,
  googleId: String,
});


export default mongoose.model("Userdeloite", userSchema);
