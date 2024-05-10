import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { emailValidation } from "@/schemas/signInSchema";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import PostModel from "@/models/Post.model";
import mongoose from "mongoose";
import {getMongoosePaginationOptions} from '@/helpers/PaginationOptions'
const UserEmailQuerySchema = z.object({
  useremail: emailValidation,
});

const postCommonAggregation = (req: Request) => {
  return [
    {
      $lookup: {
        from: "",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "sociallikes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "sociallikes",
        localField: "_id",
        foreignField: "postId",
        as: "isLiked",
        pipeline: [
          {
            $match: {
              likedBy: new mongoose.Types.ObjectId(req.user?._id),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "socialbookmarks",
        localField: "_id",
        foreignField: "postId",
        as: "isBookmarked",
        pipeline: [
          {
            $match: {
              bookmarkedBy: new mongoose.Types.ObjectId(req.user?._id),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "socialprofiles",
        localField: "author",
        foreignField: "owner",
        as: "author",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "account",
              pipeline: [
                {
                  $project: {
                    avatar: 1,
                    email: 1,
                    username: 1,
                  },
                },
              ],
            },
          },
          { $addFields: { account: { $first: "$account" } } },
        ],
      },
    },
    {
      $addFields: {
        author: { $first: "$author" },
        likes: { $size: "$likes" },
        comments: { $size: "$comments" },
        isLiked: {
          $cond: {
            if: {
              $gte: [
                {
                  // if the isLiked key has document in it
                  $size: "$isLiked",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },
        isBookmarked: {
          $cond: {
            if: {
              $gte: [
                {
                  // if the isBookmarked key has document in it
                  $size: "$isBookmarked",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
  ];
};

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  console.log(searchParams)

  // const { page = 1, limit = 10 } = searchParams;
  if(session===null){
    return Response.json({
      success:false,
      message:"user is not login"
    })
  }
try {
    const postAggregation = PostModel.aggregate([...postCommonAggregation(session?.user._id?.toString())]);
    await dbConnect();
    
    const posts = await PostModel.aggregatePaginate(
      postAggregation,
      getMongoosePaginationOptions({
        customLabels: {
          totalDocs: "totalPosts",
          docs: "posts",
        },
      })
    );
    return Response.json({
      success:'true',
      message:"post fached successflly",
      posts
    })
} catch (error:any) {
  console.log('error during fatching all post',error)
  return Response.json({
    success:false,
    message:"error during fatching post"
  })
}
}
