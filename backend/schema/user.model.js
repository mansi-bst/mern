import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    UserName:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        default:null
    },
    Contact:{
        type:Number,
        default:null
    }

},{timestamps:true})


export const User=mongoose.model("User",userSchema)