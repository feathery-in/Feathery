"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
interface IMsgDataTypes {
  id: string;
  content: string;
  participantsId: string;
  fullname: string;
  time: string;
}
interface UserData {
  id: string;
  content: string;
  participantsId: string;
  fullname: string;
  time: string;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  const [messagedata, setMessageData] = useState<UserData[]>([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  // connection sockit io


  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      constent: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    debugger
    const msgData: IMsgDataTypes = {
      id: roomId,
      participantsId: username,
      content: data.constent,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      fullname: session.data?.user.fullname!,
    };
    //   await socket.emit("join_room",roomId);
    await socket.emit("send_msg", msgData);
    console.log("start sendign request");
    axios
      .post(`/api/chat/send-message`, { chatroomId: roomId, msgData })
      .then((response) => {
        // console.log("Response:", response);
      });
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      // console.log("saving message in user state start");
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  useEffect(() => {
    // console.log('line 39 ')
    if (session.status === "authenticated") {
      console.log("clickd", roomId);
      axios
        .get(`/api/chat/get-all-messages?chatroomid=${roomId}`)
        .then((response) => {
          // console.log("response get all message ", response);
          // console.log("Response:", response.data.participate);
          const participatedetail = response.data.participate.map(
            (participatedetail: {
              imag: any;
              fullname: string;
              username: string;
            }) => ({})
          );
          const Messages = response.data.messages.map(
            (Messages: { chat: any; sender: any; content: any }) => ({
              id: Messages.chat,
              content: Messages.content,
              participantsId: Messages.sender._id,
            })
          );
          setMessageData(Messages);
        });
    }
  }, [roomId,session.status]);
  console.log('sendind chat data ', chat)
  return (
    <>
      <ScrollArea className="">
        <div className="min-w-[100vh] p-10 bg-black">
          {messagedata || chat ? (
            <>
              {messagedata.map((item) => (
                <>
                  <div key={item.id}>
                    <div>
                      {session.data?.user._id === item.participantsId && (
                        <div>
                          <div className="flex items-start justify-end  gap-2.5">
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-right">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">{item.fullname}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">11:46</span>
                              </div>
                              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p className="text-sm font-normal text-gray-900 dark:text-white text-right">{item.content}</p>
                              </div>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">Delivered</span>
                            </div>
                            <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {session.data?.user._id !== item.participantsId && (
                        <div>
                          <div className="w-full flex items-start  gap-2.5">
                            <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.fullname}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                              </div>
                              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p className="text-sm font-normal text-gray-900 dark:text-white ">{item.content}</p>
                              </div>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))}
              {chat.map((item) => (
                <>
                  <div key={item.id}>
                    <div>
                      {session.data?.user._id === item.participantsId && (

                        <div>
                          <div className="flex items-start justify-end  gap-2.5">
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-right">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">{item.fullname}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">11:46</span>
                              </div>
                              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p className="text-sm font-normal text-gray-900 dark:text-white text-right">{item.content}</p>
                              </div>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">Delivered</span>
                            </div>
                            <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                          </div>
                        </div>
                        // <div classNameName="  text-right p-1">{item.content}</div>
                      )}
                    </div>
                    <div>
                      {session.data?.user._id !== item.participantsId && (
                        <div>
                          <div className="w-full flex items-start  gap-2.5">
                            <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.fullname}</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                              </div>
                              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p className="text-sm font-normal text-gray-900 dark:text-white ">{item.content}</p>
                              </div>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <div>No Message Foud</div>
            </>
          )}
        </div>
      </ScrollArea>
      <div className="flex-1" />
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
          <label  className="sr-only">Your message</label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 20 18">
                      <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                  </svg>
                  <span className="sr-only">Upload image</span>
              </button>
              <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                  </svg>
                  <span className="sr-only">Add emoji</span>
              </button>
              
              <textarea id="message" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                  <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                  <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" fill="currentColor" viewBox="0 0 18 20">
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                  </svg>
                  <span className="sr-only">Send message</span>
              </button>
          </div>
      </form>

      {/* <Form {...form}>
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="constent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <>
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </>
        </form>
      </Form> */}

      {/* <div className={style.chat_div}>
                <div className={style.chat_border}>
                    <div style={{ marginBottom: "1rem" }}>
                        <p>
                            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
                        </p>
                    </div>
                    <div>
                        {chat.map(({ roomId, user, msg, time }, key) => (
                            <div
                                key={key}
                                className={
                                    user == username
                                        ? style.chatProfileRight
                                        : style.chatProfileLeft
                                }
                            >
                                <span
                                    className={style.chatProfileSpan}
                                    style={{ textAlign: user == username ? "right" : "left" }}
                                >
                                    {user.charAt(0)}
                                </span>
                                <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                                    {msg}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div>
                        <form onSubmit={(e) => sendData(e)}>
                            <input
                                className={style.chat_input}
                                type="text"
                                value={currentMsg}
                                placeholder="Type your message.."
                                onChange={(e) => setCurrentMsg(e.target.value)}
                            />
                            <button className={style.chat_button}>Send</button>
                        </form>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default ChatPage;
