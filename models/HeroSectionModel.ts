import mongoose, { Schema, Document, Model } from "mongoose";


export interface IHeroSetion extends Document {
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


const heroSectionSchema: Schema<IHeroSetion> = new Schema(
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


export const HeroSectionModel: Model<IHeroSetion> =
  mongoose.models.HeroSectionModel ||
  mongoose.model<IHeroSetion>("HeroSectionModel", heroSectionSchema);
