import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";
import PostModel from "@/models/Post.model";

export async function POST(req: Request) {
  const user = await req.json();
  // console.log(user.urlsAndPublicIds)
  // console.log('user data ',user.useremail)
  const session = await getServerSession(authOptions);
  // console.log("session is:-", session);
  if (session === null) {
    return Response.json({
      success: "false",
      message: "go to login first ",
    });
  }
  if (!session.user._id) {
    try {
      if (session?.user.email === user.useremail && session.user._id) {
        await dbConnect();
        const newpost = await PostModel.create({
          admin: session.user._id,
          title: user.data.title,
          description: user.data.description,
          img: user.urlsAndPublicIds,
        });
        // console.log('new post',newpost)
        return Response.json({
          success: true,
          message: "Post added successfully ",
        });
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
  return Response.json({
    success: false,
    message: "Error User is not Authenticated go to login first ",
  });
}
