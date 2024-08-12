import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.static("public"))

app.use(express.urlencoded({extended:true,limit:"16kb"}))   //for url data

app.use(express.json({limit:"16kb"}))   //for json data

app.use(cookieParser()) // can use cookies and do crud operations on them



export {app}