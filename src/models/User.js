import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String }
  },
  { timestamps: true }
);

/**
 * @description Creates a password hash
 * @param       password
 */
UserSchema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

/**
 * @description Compares this.password to the param
 * @param       password
 * @returns     Boolean
 */
UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * @description Generates a json web token
 * @param       {payload: {id, email, name, password, avatar}}
 * @returns     String
 */
UserSchema.methods.generateJWT = function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default mongoose.model("User", UserSchema);
