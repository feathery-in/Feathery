import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";
import PostModel from "@/models/Post.model";

export async function GET(req:Request){
    await dbConnect()
    const session=await getServerSession(authOptions)
    const user:User=session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:'user not Authenticated'
        },{status:404})
    }
    const userId=new mongoose.Types.ObjectId(user._id);
    try {
        const user=await PostModel.aggregate([
            {$match:{id:userId}},
            {$unwind:"$posts"},
            {$sort:{'posts.createAt':-1}},
            {$group:{_id:"$_id",posts:{$push:'$posts'}}}
        ])
        console.log(user)
        if(!user||user.length==0){
            return Response.json({
                success:false,
                message:'User not Found'
            },{status:401})
        }
        return Response.json({
            success:false,
            message:user[0].messages
        },{status:200})
    } catch (error:any) {
        return Response.json({
            success:false,
            message:'Error during verificatio otp'
        },{status:500})
    }
}