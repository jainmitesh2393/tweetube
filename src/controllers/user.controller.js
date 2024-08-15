import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    //get user details from fontend

    const {fullName,email,username,password}=req.body
    console.log("email:",email)

    //validation
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    //check if user already exists: username and email

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
    //check for images,check for avatar


    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLoaclPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }


    // upload them to cloudinary

    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage=uploadOnCloudinary(coverImageLoaclPath)

    if(!avatar){
        throw new ApiError(400,"Avatar field is available")
    }
    //create user object 

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    
    //remove password and refresh token field from response

    const createdUser=User.findById(user._id).select(
        "-password -refreshToken"
    )
    //check for user creation
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }
    //return res

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered")
    )


})

export default registerUser