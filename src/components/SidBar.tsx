"use client"
import {
  Home,
  LineChart,
  Newspaper,
  Settings,
  Users2
} from "lucide-react";
import Link from "next/link";
import NavBar from "./NavBar";
import Upload from "./Upload";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useSession } from "next-auth/react";
  
  export default function SidBar() {
    const session =useSession()
    return (
      <>
      {session.status==='authenticated'&& session.data.user ?(
      <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 mt-14 sm:py-5">
            <NavBar/>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Newspaper className="h-5 w-5" />
                  <span className="sr-only">Post</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Post</TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Newspaper className="h-5 w-5" />
                  <span className="sr-only">Artical</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Artical</TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Upload/>
                  <span className="sr-only">Upload</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Upload</TooltipContent>
            </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
      </>):(null)}
        
      </>
    );
  }
  