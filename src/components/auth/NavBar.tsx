"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/public/mde-toggel";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { CircleUser, Leaf, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#howItWorks",
    label: "How it works",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];
export default function NavBar() {
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");
  const session = useSession();
  useEffect(() => {  
    // console.log('session from headers',session.data?.user.username)
    if (session.status === "authenticated") {
      const getusername = async () => {
        
        if (session.data.user.username) {
         
          setUsername(session.data.user.username);
          setImage(session.data.user.image!);
        } else {
          // console.log(session.data.user.email);
          const response = await axios.get(
            `/api/get-user-profile-email?email=${session.data.user.email}`
          );
          // console.log("user responst through email", response.data.userDetails);
          setUsername(response.data.userDetails.username);
          setImage(response.data.userDetails.image);
        }
      };
      getusername();
    }
  }, [session]);
  // console.log("username", username);
 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky overflow-hidden border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex gap-1">
            <Leaf />
            <Link
              href="/"
              className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <div className="fa-solid fa-feather-pointed dark:text-white text-lg"></div> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Feathery
              </span>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex md:hidden gap-2">
          {session.status === "unauthenticated" ? (
              <>
                <Link
                  href="/sign-in"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  Login
                </Link>
                <Link
                  href="sign-up"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                  <p className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-extrabold">
                    Join Us
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Button
                  onClick={() => signOut()}
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  Log out
                </Button>
              </>
            )}
          </div>

          {/* desktop */}
          <div className="hidden md:flex gap-2 items-center">
            {session.status === "unauthenticated" ? (
              <>
                <Link
                  href="/sign-in"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  Login
                </Link>
                <Link
                  href="sign-up"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
                  <p className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-extrabold">
                  Join Us
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Button
                  onClick={() => signOut()}
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  Log out
                </Button>
              </>
            )}

            {/* <ModeToggle /> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}