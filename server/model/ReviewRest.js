
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true
  },

  averageRating: {
    type: Number,
    default: 0
  },

  reviewsCount: {
    type: Number,
    default: 0
  },

  name: String,
  comment: String,
  rating: Number,

  image: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Review = mongoose.model("reviews", ReviewSchema);

export default Review;