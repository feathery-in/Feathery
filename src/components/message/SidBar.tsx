"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import CHatUserList from "./chat-user-list";
import UserChatNav from "./user-chat-nav";
interface UserData {
  id: string;
  participants: [];
  username: string;
  fullname: string;
  participantsId: string;
  email: string;
}
export default function SidBar() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      
      <div className="hidden md:block">
        <div className=" grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className=" w-72 border-r bg-muted/40 ">
            <div className="flex  h-full max-h-screen flex-col gap-2">
              <UserChatNav />
              <Separator />
              <CHatUserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
