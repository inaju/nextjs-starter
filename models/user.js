import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        title: { type: String, unique: true, dropDups: true, },
        like: Number,
        userId: { type: String, },
    },
    {
        timestamps: true,
    }
);

export const QuestionModel = mongoose.models.QuestionModel || mongoose.model("QuestionModel", userSchema);
