import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'
import { emailValidation } from "@/schemas/signInSchema";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
const UserEmailQuerySchema=z.object({
    useremail:emailValidation
})

export async function GET(req:Request){
    const session= await getServerSession(authOptions)
    
    await dbConnect()
    try {
        const {searchParams} =new URL(req.url)
        const queryParam={
            useremail:searchParams.get('email')
        }
        // validate with zod
        const result=UserEmailQuerySchema.safeParse(queryParam)
        // console.log(result)
        if(!result.success){
            const useremailErrors=result.error.format().useremail?._errors ||[]
            return Response.json({
                message:useremailErrors?.length>0?useremailErrors.join(', '):'Invalid Query Parameters',
                success:false
            },{status:400})
        }
        const {useremail}=result.data
        // const useremail='anand@gmila.com'
        // const useremail='anantkumar012002@gmail.com'
        // console.log(useremail)
        const user = await UserModel.findOne({ email:useremail });
        // console.log(user)
        const userDetails=await UserModel.aggregate([
            {
                $match:{
                    email:useremail
               }
            },
            {
                $lookup:{
                    from:"subscription",
                    localField:"_id",
                    foreignField:"follower",
                    as:"follower"
                }
            },
            {
                $lookup:{
                    from:"subscription",
                    localField:"_id",
                    foreignField:"following",
                    as:"following"
                }
            },
            {
                $addFields:{
                    followerCount:{
                        size:"$follower"
                    },
                    followingCount:{
                        $size:"$following"
                    },
                    isfollow:{
                        $cond:{
                            if:{$in:[session?.user._id?.toString(),"$follower.following"]},
                            then:true,
                            else:false
                        }
                    }
                }
            },
            {
                $project:{
                    fullname:1,
                    usernaem:1,
                    followerCount:1,
                    followingCount:1,
                    isfollow:1,
                    image:1,
                    email:1,
                }
            }
        ])
        if(!userDetails.length){
            return Response.json({
                success:false,
                message:'User Not found'
            },{status:201})
        }

        // console.log(userDetails)
        return Response.json({
            success:true,
            userDetails,
            message:'user find success full'
        },{status:201})
    } catch (error:any) {
        console.error("Error during finding user ",error)
        return Response.json({
            success:false,
            message:"Error during finding user"
        },{status:500})
    }
}