"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import ChatPage from "@/helpers/socket";

import { useEffect, useState } from "react";

import React from "react";
interface UserData {
  id: string;
  content: string;
  participantsId: string;
  fullname: string;
  image: any;
}
export default function ChatRoom({ params }: any) {
  const [messagedata, setMessageData] = useState<UserData[]>([]);
  const [message, setMessage] = React.useState({
    content: "",
  });

  const [participates, setParticipates] = useState<UserData[]>([]);
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  if (!session) return null;
  const id: string = params.chatroom;
  // api call
  // console.log(id)
  // useEffect(() => {
  //   if (params) {
  //     console.log("clicked", id);
  //     axios
  //       .get(`/api/chat/get-all-messages?chatroomid=${id}`)
  //       .then((response) => {
  //         const participatedetail = response.data.participate.map(
  //           (participatedetail: {
  //             imag: any;
  //             fullname: string;
  //             username: string;
  //           }) => ({})
  //         );
  //         const Messages = response.data.messages.map(
  //           (Messages: { chat: any; sender: any; content: any }) => ({
  //             id: Messages.chat,
  //             content: Messages.content,
  //             participantsId: Messages.sender._id,
  //           })
  //         );
  //         setMessageData(Messages);
  //       });
  //   }
  // }, [id, params]);

  // console.log("message data is:-", messagedata);

  // send message

  // socket io
  let socket: any;

  socket = io("http://localhost:3001");
  socket.emit("join_room", params.chatroom);

  return (
    <>
      <div className=" grid min-h-screen ">
        <div className=" w-full border-r">
          <div className="flex  h-full w-full max-h-screen flex-col">
            <div className="min-h-14 p-4 mt-0 bg-stone-300 items-center">
              <div className="flex items-center gap-3 mx-7">
                <Avatar className="size-20">
                  <AvatarImage
                    src={session.data?.user.image!}
                    alt={session.data?.user.username}
                  />
                  <AvatarFallback>
                    {session?.data?.user
                      ?.fullname!.split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold">{session.data?.user.fullname}</span>
              </div>
            </div>
            {/* add page   */}
            <ChatPage
              socket={socket}
              roomId={params.chatroom}
              username={session.data?.user._id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
