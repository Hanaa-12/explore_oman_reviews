
import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },

  location: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },

  category: { type: String, default: "restaurant" },
  description: { type: String },
  image: { type: String },

  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

const Restaurant = mongoose.model("restaurants", RestaurantSchema);

export default Restaurant;