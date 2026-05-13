
import mongoose from "mongoose";

const attractionReviewSchema = new mongoose.Schema(
  {
    attractionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
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
  },
  { timestamps: true }
);

const AttractionReview = mongoose.model(
  "AttractionReview",
  attractionReviewSchema
);

export default AttractionReview;