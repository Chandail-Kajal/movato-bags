import mongoose, { Schema } from "mongoose";

const heroSchema = new mongoose.Schema({
    imageurl:String,
    primaryText:String,
    captionText:String,
    primaryButtonText:String,
    primaryButtonLink:String,
    secondaryButtonText:String,
    secondaryButtonLink:String,
    sortOrder:{
        type:Number,
        default:0,

    },
    isActive:Boolean,
},
{
    timestamps:true,

}
)
export const heroModel = mongoose.model("HeroModel",heroSchema)