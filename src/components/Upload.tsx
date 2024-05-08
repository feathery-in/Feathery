import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

export default function Upload(){
    return(
        <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <PlusCircle/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Add New</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/account/add-post'}>New Post</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/account/add-article'}>New Artical</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/account/add-video'}>New Vodeo</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/'}>Go to Landing Page</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        
        </>
    )
}