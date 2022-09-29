import bcrypt from "bcrypt";
import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  birth: {
    year: String,
    month: String,
    date: String,
  },
  gender: { type: String },
  socialOnly: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  // this := userSchema 또는 create되는 User
  // console.log(this.password);
  this.password = await bcrypt.hash(this.password, 5); // 5번 해싱
  // console.log(this.password);
});

// User 모델 (이름: "User", 스키마: userSchema)
const User = mongoose.model("User", userSchema);

export default User;
