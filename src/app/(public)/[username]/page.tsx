"use client";
import { Artical } from "@/components/profile/articel";
import Follower from "@/components/profile/follower";
import Post from "@/components/profile/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
interface getUserResponse{
  name:string,
  username:string,
  
}

export default function PublicProfile({ params }: any) {
  const [rsponsedat,setResponseData]=React.useState<any>(null)
  const router = useRouter();
  const session = useSession();
  // console.log(session);
  useEffect(() => {
    const getPorfile = async () => {
      try {
        const response = await axios.get(
          `/api/get-user-profile-username?username=${params.username}`
        );
        // console.log('response is :-',response.data.userDetails)
        
        
        if (response.data.success) {
          setResponseData(response.data.userDetails)
        }
        // console.log('response is:-',response)
      } catch (error: any) {
        console.log("error durig geting profile image", error);
      }
    };
    getPorfile();
  }, [params.username]);

  // console.log(rsponsedat?.followers.length)
  
  return (
    <>
    {rsponsedat!=null?(<>
    
    <div className="w-full  flex justify-center bg-[#c9ced3] dark:bg-black dark:text-white min-h-[100vh] h-[100%] ">
        <div className="w-full h-full flex justify-center">
          <div className=" mt-12 pb-20 max-w-[800px] w-[100%]">
            <div className="p-4 profile-section grid grid-cols-[auto,1fr] gap-4 w-[100%] h-auto border-b : border-black max-sm:pb-5">
              <div className="min-w-max max-sm:-m-5 max-sm:mt-1 p-4 max-md:w-32 flex flex-col items-center ">
                <Avatar className="max-md:h-20 max-md:w-20 h-40 w-40 rounded-full border-4 object-cover mx-auto md:mx-0 bg-white"
>
                  <AvatarImage src={rsponsedat?.image!}alt={rsponsedat?.username!}/>
                  <AvatarFallback>
                    AK
                  </AvatarFallback>
                </Avatar>
                {/* <Image
                  className="max-md:h-20 max-md:w-20 h-40 w-40 rounded-full border-4 object-cover border-white mx-auto md:mx-0 bg-white"
                  src=""
                  alt="Profile Image"
                ></Image> */}
                {/* <!-- <img className="max-md:h-20 max-md:w-20 h-40 w-40 rounded-full border-4 border-white mx-auto md:mx-0" src="{{user.profileImage}}" alt="Profile Image"> --> */}
                <button className="bg-[#f1f1f1] dark:bg-[#212121] font-medium max-sm:text-sm px-3 py-1 w-full mt-2 rounded-md md:hidden">
                  Edit
                </button>
                <button className="text-white font-medium max-sm:text-sm py-1 w-full mt-2 rounded-md md:hidden bg-blue-500">
                  Follow
                </button>
                <button className="bg-[#f1f1f1] dark:bg-[#212121] font-medium  max-sm:text-sm py-1 w-full mt-2 rounded-md md:hidden">
                  Unfollow
                </button>
                {/* <!-- <button className="bg-[#f1f1f1] dark:bg-[#212121]  font-medium  max-sm:text-sm px-3 py-1 w-full mt-2 rounded-md md:hidden" *ngIf="user._id !== loginUser.userId ">Message</button> --> */}
              </div>
              <div className="w-full p-4 max-sm:pl-0 col-span-2 md:col-span-1 col-start-2 grid">
                <div className="row-start-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h3 className="font-bold text-xl mb-2 mt-2">{rsponsedat?.name}</h3>
                      <Image className="w-6 h-6 ml-2" src="" alt=""></Image>
                    </div>
                    <div className="flex">
                      {/* <!-- <button className="bg-blue-500 text-white px-4 py-1 rounded-md max-md:hidden" *ngIf="user._id !== loginUser.userId " (click)="followUser(user._id)">Follow</button> --> */}
                      {/* <button className="bg-blue-500 text-white px-4 py-1 rounded-md max-md:hidden">
                        Follow
                      </button>
                      <button className="bg-[#f1f1f1] dark:bg-[#212121] dark:text-white px-4 py-1 rounded-md max-md:hidden">
                        Unfollow
                      </button> */}
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-md max-md:hidden">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-5 md:mt-4 max-sm:w-[80%]">
                    <div>
                      <span className="max-sm:text-sm text-center dark:font-thin">
                        <strong>Followers</strong>
                        <p>{rsponsedat?.followers.length}</p>{" "}
                      </span>
                    </div>
                    <div>
                      <span className="max-sm:text-sm text-center dark:font-thin">
                        <strong>Following</strong>
                        <p>{rsponsedat?.following.length}</p>{" "}
                      </span>
                    </div>
                    <div>
                      <span className="max-sm:text-sm text-center dark:font-thin">
                        <strong>Articles</strong> <p>{}</p>{" "}
                      </span>
                    </div>
                    {/* <!-- Add more profile details here --> */}
                  </div>
                </div>

                <div className="row-start-2 col-start-1">
                  <div className="mt-4 max-sm:col-span-3 max-sm:col-start-1 max-sm:row-start-2">
                    {/* <!-- Media query to move the description below on smaller screens --> */}

                    {/* <a > 100 && !showFullBio" className="text-blue-500 cursor-pointer" (click)="showFullBio = true">See More</a> */}
                    <a className="text-blue-500 cursor-pointer">See Less</a>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="profile-tabs text-sm font-medium text-center text-gray-500 border-b border-transparent ">
          <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                  <a className="inline-block p-4 active rounded-t-lg hover:text-blue-600 "
                    [className.border-b-2]="selectedTab == 'posts'"
                    [className.text-blue-600]="selectedTab == 'posts'"
                     [className.border-blue-600]="selectedTab == 'posts'"
                     (click)="selectedTab = 'posts'">Posts</a>
              </li>
              <li className="me-2">
                  <a className="inline-block p-4 hover:text-blue-600 rounded-t-lg "
                     [className.border-b-2]="selectedTab == 'articles'"
                     [className.text-blue-600]="selectedTab == 'articles'"
                     [className.border-blue-600]="selectedTab === 'articles'"
                     (click)="selectedTab = 'articles'">Articles</a>
                     
              </li>
              <li className="me-2">
                  <a className="inline-block p-4 rounded-t-lg hover:text-blue-600 "
                      [className.border-b-2]="selectedTab == 'communities'"
                     [className.text-blue-600]="selectedTab == 'communities'"
                     [className.border-blue-600]="selectedTab == 'communities'"
                     (click)="selectedTab = 'communities'">Communities</a>
              </li>
              
          </ul>
        </div> */}

            {/* <div className="mt-8 mb-[100px]">
          <!-- <div style="display: flex; justify-content: center; align-items: center; height:100%;">
              <img src="https://aryan1982.github.io/Feathery-client/assets/icons/spinner2.gif" alt="loading" className="h-10">
          </div> -->
          
          <!-- Article list -->
          <app-article-list [allArticles]="allArticles"></app-article-list>
          
          <!-- not in use -->

          
        </div> */}

            {/* <!-- Add other sections as needed --> */}
            <Tabs defaultValue="post" className="">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">
                  About
                  {/* <Link href={`/${params.username}/post`}>Post</Link> */}
                </TabsTrigger>
                <TabsTrigger value="post">
                  Posts
                  {/* <Link href={`/${params.username}/post`}>Post</Link> */}
                </TabsTrigger>
                <TabsTrigger value="artical">
                  {" "}
                  {/* <Link href={`/${params.username}/artical`}>Artical</Link> */}
                  Articles
                </TabsTrigger>
                <TabsTrigger value="short">
                  {/* <Link href={`/${params.username}/short`}>Short</Link> */}
                  Projects
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[570px]">
                <TabsContent value="post">
                  <Post />
                </TabsContent>
                <TabsContent value="artical">
                  <Artical />
                </TabsContent>
                <TabsContent value="short"></TabsContent>
                <TabsContent value="follower">
                  <Follower />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>
    </>):(<><div className="text-center font-bold text-3xl m-auto">User with "{params.username}" usernaem not found </div></>)}
      {/* <!-- <div  className="w-full  flex justify-center bg-[#c9ced3]" style="min-height: 100vh; height: 100%;"> --> */}
      

      {/* <!-- Main modal --> */}
    </>
  );
}
