
import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    location: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },

    category: {
      type: String,
      default: "attraction"
    },

    description: String,
    image: String,

    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    reviewsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attraction", attractionSchema, "attractions");