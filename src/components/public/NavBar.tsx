"use client";
import { useState } from "react";
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

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { CircleUser, Leaf, Menu, UserCircle } from "lucide-react";
import { ModeToggle } from "@/components/public/mde-toggel";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
  const session = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky overflow-hidden border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex gap-1">

            <Link
              href="/"
              className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"
            >
            <FontAwesomeIcon icon={faFeatherPointed} size="xl" className="-mr-1 cursor-pointer"/>
              {/* <div className="fa-solid fa-feather-pointed dark:text-white text-lg"></div> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Feathery
              </span>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  {/* <span className="sr-only">Menu Icon</span> */}
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Feathery
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                    Login
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
                </nav>
              </SheetContent>
            </Sheet>
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
                <Button onClick={() => signOut()}
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
                          src={session.data.user.image!}
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                      <Link
                        href={`/${
                          session.data.user.username ||
                          session.data.user.email?.split("@")[0]
                        }`}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
