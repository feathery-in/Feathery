import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import aryanThakor from "./img/landing-page-people/aryan-thakor.jpg";
import anant from "./img/landing-page-people/anant.jpg";
import jenish from "./img/landing-page-people/jenish-patel.jpeg";
import harsh from "./img/landing-page-people/harsh-shukla.png";
import vipra from "./img/landing-page-people/vipra-dave.jpg";
import rutvi from "./img/landing-page-people/rutvi-shah.jpg";

interface TeamProps {
  imageUrl: any;
  name: string;
  position: string;
  content:string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: aryanThakor,
    name: "Aryan Thakor",
    position: "Founder",
    content:"Building Feathery.in",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/aryan-thakor/" },
      {
        name: "Github",
        url: "https://www.github.com/aryan1982",
      },
    ],
  },
  {
    imageUrl: anant,
    name: "Anant",
    position: "Backend Developer",
    content:"Building Feathery.in",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/the-anant" },
      {
        name: "Github",
        url: "https://github.com/the-anant",
      },
    ],
  },
  {
    imageUrl: harsh,
    name: "Harsh Shukla",
    position: "Contributor",
    content:"Lets build future together!",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/devloperhs/" },
      {
        name: "Github",
        url: "https://github.com/devloperhs14",
      },
    ],
  },
  {
    imageUrl: jenish,
    name: "Jenish Patel",
    position: "UI / UX Designer",
    content:"Building Feathery.in",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/jenishpatel05/" },
      {
        name: "Github",
        url: "https://github.com/Jenishxp",
      },
    ],
  },
  {
    imageUrl: vipra,
    name: "Vipra Dave",
    position: "Social Media Lead and Designer",
    content:"Seize the day",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/vipra-dave/" },
      {
        name: "Github",
        url: "https://github.com/vipradave",
      },
    ],
  },
  {
    imageUrl: rutvi,
    name: "Rutvi Shah",
    position: "Content Writer and Designer",
    content:"Keep creating!",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/rutvishah22/" },
      {
        name: "Github",
        url: "https://github.com/rutvishah22",
      },
    ],
  },
];

export default function Team() {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      
      case "Github":
        return <Github size="20" />;
    }
  };

  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
          Our Dedicated{" "}
        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-extrabold">
        Crew
        </span>
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        {" "}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks, content }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <Image
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover">
                </Image>
                <CardTitle className="text-center mb-3">{name}</CardTitle>
                <CardDescription className="text-primary mt-">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{content}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
