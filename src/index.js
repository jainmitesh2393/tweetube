import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "/Users/mitesh/Desktop/projects/tweetube/.env", // Make sure this path is correct
});

connectDB();

/*
import express from "express"
const app=express()
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error:",error)
        throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App running on : ${process.env.PORT}`)

        })
    } catch (error) {
        console.log("Error:",error)
        throw error
    }
})()
*/
