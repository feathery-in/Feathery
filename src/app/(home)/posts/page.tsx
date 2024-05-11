"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import aryan from "../../../../public/aryan-thakor.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faShare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/data/message.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";

const posts = [
  {
    id: 1,
    author: "Aryan",
    role: "Web Developer",
    content: "This is post 1 content.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 92372,
  },
  {
    id: 2,
    author: "John Doe",
    role: "Designer",
    content: "This is post 2 content.",
    image:
      "https://plus.unsplash.com/premium_photo-1714675739730-65a1203d6bda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D",
    likes: 50000,
  },
  {
    id: 3,
    author: "John Doe",
    role: "Designer",
    content: "This is post 2 content.",
    image:
      "https://plus.unsplash.com/premium_photo-1714675739730-65a1203d6bda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D",
    likes: 50000,
  },
  {
    id: 4,
    author: "John Doe",
    role: "Designer",
    content: "This is post 2 content.",
    image:
      "https://plus.unsplash.com/premium_photo-1714675739730-65a1203d6bda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D",
    likes: 50000,
  },
];

export default function postList() {
  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await axios.get(`/api/get-all-post`);
        console.log(response);
      } catch (error: any) {}
    };
    getAllPost();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex justify-center mb-4">
          <div className="bg-[#f1f1f1] dark:bg-[#000] dark:shadow-[0_0_4px_0_rgba(255,255,255,0.4)] dark:border-none shadow-lg border rounded-sm max-w-lg">
            <div className="flex items-center px-4 py-3">
              <Image src={aryan} className="h-8 w-8 rounded-full" alt="" />
              <div className="ml-3">
                <span className="text-sm font-semibold antialiased block leading-tight">
                  {post.author}
                </span>
                <span className="text-primary text-xs block">{post.role}</span>
              </div>
            </div>
            <div className="dark:text-white px-4 text-sm mb-2">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${post.id}`}>
                  <AccordionTrigger>{post.content}</AccordionTrigger>
                  <AccordionContent>
                    {/* Content of accordion */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Carousel className="w-full max-w-lg md:max-w-xl">
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem>
                    <Card>
                      <img src={post.image} />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-5">
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faShare} />
                <FontAwesomeIcon icon={faComment} />
              </div>
              <div className="flex"></div>
            </div>
            <div className="font-semibold text-sm mx-4 mt-2 mb-4">
              {post.likes} likes
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
