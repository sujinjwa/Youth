import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});

// User 모델 (이름: "User", 스키마: userSchema)
const User = mongoose.model("User", userSchema);

export default User;
