import React from "react";
import Image from "next/image";
import aryan from "../public/img/landing-page-people/aryan-thakor.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faShare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/data/message.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
export default function Post() {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-secondary border rounded-sm max-w-lg">
          <div className="flex items-center px-4 py-3">
            <Image src={aryan} className="h-8 w-8 rounded-full" alt=""></Image>
            <img
              className="h-8 w-8 rounded-full"
              src="https://media.licdn.com/dms/image/D4D03AQGMjM-4kcLgOw/profile-displayphoto-shrink_200_200/0/1695286110800?e=1720051200&v=beta&t=44pywbf2xq34Bp85l-HZz9cM7x_V6JRxSEvTRGY5tKU"
            />
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">
                Aryan
              </span>
              <span className="text-primary text-xs block">Web Developer</span>
            </div>
          </div>
          <div className="dark:text-white px-4 text-sm mb-2">
            <Accordion  type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>this is </AccordionTrigger>
                <AccordionContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis mollitia, tempora distinctio deleniti quos autem dicta. Officiis cupiditate deserunt incidunt. Nihil eaque architecto cumque dolores facere et esse. Earum error explicabo officiis vero quo placeat fuga dolore necessitatibus harum, quos nobis voluptate laborum esse excepturi, sapiente veniam, odit tenetur ipsa incidunt recusandae expedita? Accusantium eum quia ut et similique quidem blanditiis, vel a ex corporis totam cum cumque dicta ipsum possimus! Ipsa enim blanditiis architecto omnis veritatis vitae excepturi ut distinctio consequatur tempora repellendus officia reprehenderit maxime, ea, unde, soluta quas earum! Doloremque voluptates doloribus asperiores numquam dignissimos natus.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full max-w-lg md:max-w-xl"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="">
                  <Card>
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
            92,372 likes
          </div>
        </div>
      </div>
    </>
  );
}
