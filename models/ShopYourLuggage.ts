import mongoose from "mongoose";

const ShopYourLuggageSchema = new mongoose.Schema({
    image:String,
    order:Number,
    isActive:Boolean,
},
{
    timestamps:true,

}
)
export const shopModel = mongoose.model("HeroModel",ShopYourLuggageSchema)
