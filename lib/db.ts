import mongoose from "mongoose";

export async function connectDb (){
    return await mongoose.connect(process.env.DB_URI as string);
}