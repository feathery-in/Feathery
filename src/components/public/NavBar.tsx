"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { CircleUser} from "lucide-react";
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
          const response = await axios.get(
            `/api/get-user-profile-email?email=${session.data.user.email}`
          );
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
            <Link
              href="/"
              className="cursor-pointer flex items-center space-x-2 rtl:space-x-reverse"
            >
              <i className="fa-solid fa-feather-pointed dark:text-white text-lg"></i>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Feathery</span>

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
                <DropdownMenuSeparator />
                {session.status === "authenticated" && (
                  <>
                    <DropdownMenuItem>
                      <Link href={`/${username}`}>Profile</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
              </>
            )}
          </div>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

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
                    Get Started
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {session.status === "unauthenticated" && (
                    <CircleUser className="h-5 w-5" />
                  )}
                  {session.status === "authenticated" && (
                    <>
                      <Avatar>
                        <AvatarImage
                          src={image}
                          alt={session.data.user.name!}
                        />
                        <AvatarFallback>
                          {session.data.user
                            .name!.split(" ")
                            .map((chunk) => chunk[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </>
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                {session.status === "unauthenticated" && (
                  <>
                    <DropdownMenuItem>
                      <Link href={"/sign-in"}>Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={"/sign-up"}>Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {session.status === "authenticated" && (
                  <>
                    <DropdownMenuItem>
                      <Link href={`/${username}`}>Profile</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <ModeToggle /> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}