import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: { type: String, unique: true, dropDups: true, },
    like: Number,
    user: { type: Object, },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel = mongoose.models.QuestionModel || mongoose.model("QuestionModel", questionSchema);
