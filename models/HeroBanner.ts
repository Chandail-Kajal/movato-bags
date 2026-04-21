import mongoose, { Schema, Document, Model } from "mongoose";


export interface IHeroBanner extends Document {
  image: string;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}


const HeroBannerSchema: Schema<IHeroBanner> = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    primaryBtn: {
      type: String,
      required: true,
    },
    secondaryBtn: {
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
  },
  {
    timestamps: true,
  }
);


const HeroBanner: Model<IHeroBanner> =
  mongoose.models.HeroBanner ||
  mongoose.model<IHeroBanner>("HeroBanner", HeroBannerSchema);

export default HeroBanner;