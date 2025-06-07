import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "sports",
        "music",
        "art",
        "technology",
        "food",
        "education",
        "health",
        "business",
        "travel",
        "other",
      ],
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);


export default Event;
