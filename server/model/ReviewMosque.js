
import mongoose from "mongoose";

const ReviewMosqueSchema = new mongoose.Schema({
  mosqueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mosque",
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

const ReviewMosque = mongoose.model("mosqueReviews", ReviewMosqueSchema);

export default ReviewMosque;