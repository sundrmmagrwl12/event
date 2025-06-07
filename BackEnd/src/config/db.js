import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");
    }
    catch(err){
        console.log("error in mongodb connection",err.message);
        process.exit(1);
    }
}

export default connectDb;