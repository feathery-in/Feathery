import Statistics  from "./Statistics";
import pilot from "../public/img/pilot.png";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          {/* <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          ></Image> */}
          <div className="bg-green-0 flex flex-col text-center ">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl  font-bold inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7]  text-transparent bg-clip-text">
                <span className="">
                  About{" "}
                </span>
                Us
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                
              Welcome to Feathery&sbquo;where we believe in learning together out in the open{'.'} We think that when you share what you&prime;re learning&sbquo; it helps you grow and inspires others too{'.'} Our platform makes it easy for you to show your progress&sbquo; connect with others&sbquo; and learn new things together{'.'} Come join us as we make learning fun and accessible for everyone{'.'}
              </p>
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
