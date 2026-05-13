import mongoose from "mongoose";

const HotelReviewSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  comment: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  averageRating: {
    type: Number,
    default: 0
  },

  reviewsCount: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const ReviewHotels = mongoose.model("HotelReview", HotelReviewSchema);

export default ReviewHotels;