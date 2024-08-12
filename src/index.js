import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path: "/Users/mitesh/Desktop/projects/tweetube/.env", // Make sure this path is correct
});

connectDB()   //coz connectDB is in async so .then and .catch
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed:",err);
    
})

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
