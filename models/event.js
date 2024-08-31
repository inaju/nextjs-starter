import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: { type: String, unique: true, dropDups: true, },
    eventMode: { type: String, },
    eventCode: { type: String, },
    eventId: { type: String, },
    eventOrganizer: { type: String, },
    userId: { type: String, },
    description: { type: String, },
    time: { type: String, },
    date: { type: String, },
    meridem: { type: String, },
    imageUrl: { type: String, },
    url: { type: String, },
    qrcode: { type: String, },
    likedByUsers: { type: Array, },
    noOfAttendees: { type: Number, },
    attendees: { type: Array, },
    otherData: { type: Array, },
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose?.models?.EventModel || mongoose?.model("EventModel", eventSchema);