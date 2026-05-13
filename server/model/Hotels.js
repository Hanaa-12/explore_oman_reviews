
import mongoose from "mongoose";

const HotelsSchema = new mongoose.Schema({
  name: { type: String, required: true },

  location: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },

  category: { type: String, default: "hotel" },
  description: { type: String },
  image: { type: String },

  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

const Hotels = mongoose.model("Hotels", HotelsSchema, "Hotels");

export default Hotels;