import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    "name": { type: String, },
    "email": { type: String, },
    "image": { type: String, },
    "emailVerified": { type: Boolean, },

  },
  {
    timestamps: true,
  }
);

export const users = mongoose.models.users || mongoose.model("users", userSchema);
