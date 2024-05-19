import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Check, Lightbulb, Linkedin } from "lucide-react";
import { Badge } from "../ui/badge";
import hiralShah from "../public/img/landing-page-people/hiral-shah.jpg";
import piyushPatel from "../public/img/landing-page-people/piyush-patel.png";
import darshilParikh from "../public/img/landing-page-people/darshil-parikh.png";
import Image from "next/image";
export default function HeroCard(){
    return(
        <>
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[650px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <Image
            alt=""
            src={darshilParikh}
          >

            </Image>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Darshil Parikh</CardTitle>
            <CardDescription>Web Designer</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Platform much needed.</CardContent>
        <CardFooter>
          <div>
            <a
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Team */}
      <Card className="absolute -right-[28px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
            src={hiralShah}
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover">
          </Image>
          
          <CardTitle className="text-center">Hiral Shah</CardTitle>
          <CardDescription className="font-normal text-primary">
            IOT Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
          Feathery is a good platform for expressing my achivements&sbquo; get other&prime;s opinions thru comments&sbquo; find people I can work with and solve my problems{"."}I love the idea behind the paltform!
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              href="https://github.com/RHS-HIRAL"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/hiralshah0308"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/rhs-hiral"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[250px] left-[0px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
          src={piyushPatel}
          alt="user avatar"
          className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          >

          </Image>
          <CardTitle className="text-center">Piyush Patel</CardTitle>
          <CardDescription className="font-normal text-primary">
            Founder&sbquo; Pintube.com
          </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
          <p>
          It&prime;s the ultimate space for transparency and collaboration in our continuous journey of growth.
          </p>
        </CardContent>

        <CardFooter>
          <div className="flex justify-center w-full">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[30px] -bottom-[100px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <Lightbulb />
          </div>
          <div>
            <CardTitle>Learn in public</CardTitle>
            <CardDescription className="text-md mt-2">
            Share your learning journey openly&sbquo; connect with fellow learners&sbquo; and grow together in a supportive community focused on knowledge sharing and personal development.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
        </>
    )
}