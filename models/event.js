import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: { type: String, unique: true, dropDups: true, },
    eventMode: { type: String, },
    description: { type: String, },
    time: { type: String, },
    date: { type: String, },
    meridem: { type: String, },
    imageUrl: { type: String, },
    url: { type: String, },
    qrcode: { type: String, },
    eventId: { type: String, },
    likedByUsers: { type: Array, },
    noOfAttendees: { type: Number, },
    otherData: { type: Array, },
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose.models.EventModel || mongoose.model("EventModel", eventSchema);

// {
//     "name": "Stripedc conf",
//     "eventMode": "in-person",
//     "date": "2024-08-28T23:00:00.000Z",
//     "description": "df",
//     "time": "11:00",
//     "meridem": "PM",
//     "uimage": {},
//     "imageUrl": "https://i.ibb.co/WGLbp90/9d456c890f5b.png"
// }
