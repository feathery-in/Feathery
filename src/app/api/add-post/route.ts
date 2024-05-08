

import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";
import PostModel from "@/models/Post.model";

export async function POST(req: Request) {
  const user = await req.json();
  // console.log(user.urlsAndPublicIds)
  console.log(user)
  const session = await getServerSession(authOptions);
  try {
    if (session?.user.email === user.useremail) {
      await dbConnect();
      const newpost=await PostModel.create({

        title:user.data.title,
        description:user.data.description,
        img:user.urlsAndPublicIds,
      })
      console.log('new post',newpost)
      return Response.json({
        success:true,
        message:'Post added '
    })
      
    }
  } catch (error: any) {
    // const delresponse = await deleteFromCloudinary(ImagePublicId);
    // console.log('session',session)
    console.log("error during updating profile", error);

    return Response.json({
      success: false,
      message: "Error during Updating image",
    });
  }
}
