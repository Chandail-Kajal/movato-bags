import mongoose from "mongoose";

const ShopYourLuggageSchema = new mongoose.Schema({
    imageurl:String,
    
    isActive:Boolean,
},
{
    timestamps:true,

}
)
export const shopModel = mongoose.model("HeroModel",ShopYourLuggageSchema)