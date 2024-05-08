import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";
import { deleteFromCloudinary } from "@/helpers/Upload";

export async function POST(req: Request) {
  const user = await req.json();
  console.log(user.urlsAndPublicIds)
  // console.log(req)
  const session = await getServerSession(authOptions);
  let Image = "";
  let ImagePublicId = "";
  try {
    if (session?.user.email === user.useremail) {
      await dbConnect();
      const User = await UserModel.findOne({ email: user.useremail });
      if (!User) {
        return Response.json({
          success: false,
          massage: "User not found",
        });
      }
      // console.log(User)
      if (User && user.urlsAndPublicIds) {
        user.urlsAndPublicIds.map(
          (item: { public_id: string; url: any }) => (
            (Image = item.url), (ImagePublicId = item.public_id)
          )
        );
        if (User.imgPublicId) {
          // console.log('public id:-', User.imgPublicId)
          const response = await deleteFromCloudinary(User.imgPublicId);
          // console.log('delete response',response);
        }

        const updatedata = await UserModel.updateOne(
          { _id: new mongoose.Types.ObjectId(User._id) },
          {
            $set: {
              username: user.data.username,
              name: user.data.name,
              bio: user.data.bio,
              image: Image,
              imgPublicId: ImagePublicId,
            },
          }
        );
        return Response.json({
          success: true,
          message: "profile updated",
        });
      } else if (User && !(user.urlsAndPublicIds)) {
        const updatedata = await UserModel.updateOne(
          { _id: new mongoose.Types.ObjectId(User._id) },
          {
            $set: {
              username: user.data.username,
              name: user.data.name,
              bio: user.data.bio,
            },
          }
        );
        return Response.json({
          success: true,
          message: "profile updated",
        });
      }
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
