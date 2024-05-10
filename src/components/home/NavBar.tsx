"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
export default function NavBar() {
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");
  const session = useSession();
  return (
    <>
      <nav className="bg-[#c8ccd2] shadow-xl dark:bg-[#181818] z-50 fixed w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          {/* <a className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"> */}
          <Link
            href="/"
            className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-feather-pointed dark:text-white text-lg"></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Feathery</span>
          </Link>

          <div className="hidden w-full md:block md:w-auto " id="navbar-default">
            <ul className="font-medium flex p-4 md:p-0 rounded-lg dark:text-[#bbbcbd] max-md:bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse -mb-2 max-md:dark:bg-[#000]">
              <li>
                <a className="min-w-[77px] flex flex-col gap-1 items-center cursor-pointer rounded md:bg-transparent md:p-0 dark:text-[#b5b3b3]" aria-current="page" data-collapse-toggle="navbar-default">
                  <i className="fa fa-house text-2xl"></i>
                  <span className="text-[0.75rem]">Home</span>
                </a>
              </li>
              <li>
                <a className="min-w-[77px] flex flex-col gap-1 items-center cursor-pointer rounded md:bg-transparent md:p-0 " aria-current="page" data-collapse-toggle="navbar-default">
                <i className="fa fa-solid fa-plus text-2xl"></i>
                  <span className="text-[0.75rem]">Post</span>
                </a>
              </li>
              <li>
                <a className="min-w-[77px] flex flex-col gap-1 items-center cursor-pointer rounded md:bg-transparent md:p-0 " aria-current="page" data-collapse-toggle="navbar-default">
                <i className="fa-solid fa-users text-2xl"></i>
                  <span className="text-[0.75rem]">Connections</span>
                </a>
              </li>
              <li>
                <a className="min-w-[77px] flex flex-col gap-1 items-center cursor-pointer rounded md:bg-transparent md:p-0 " aria-current="page" data-collapse-toggle="navbar-default">
                <i className="fa-regular fa-comment text-2xl"></i>
                  <span className="text-[0.75rem]">Messages</span>
                </a>
              </li>
              <li>
                <a className="min-w-[77px] flex flex-col gap-1 items-center cursor-pointer rounded md:bg-transparent md:p-0 " aria-current="page" data-collapse-toggle="navbar-default">
                <i className="fa fa-regular fa-bell text-2xl"></i>
                <span className="text-[0.75rem]">Notifications</span>
                </a>
              </li>


            </ul>
          </div>
          <DropdownMenu>


            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
              >
                <>
                  <Avatar>
                    <AvatarImage
                      src={image}
                      alt={session.data?.user.name!}
                    />
                    <AvatarFallback>
                      {session.data?.user
                        .name!.split(" ")
                        .map((chunk) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {session.status === "authenticated" && (
                <>
                  <DropdownMenuItem>
                    <Link href={`/${username}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

    </>
  );
}
