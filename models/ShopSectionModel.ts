import mongoose from "mongoose";

const shopSectionSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    buttonTitle: {
      type: String,
      trim: true,
    },

    caption: {
      type: String,
      trim: true,
    },

    categoryType: {
      type: String,
      enum: ["size", "collection", "trip"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ShopSectionModel =
  mongoose.models.ShopSectionModel ||
  mongoose.model("ShopSectionModel", shopSectionSchema);