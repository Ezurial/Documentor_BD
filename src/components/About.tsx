"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.fromTo(
      ".mask-clip-path",
      {
        width: "280px",
        borderRadius: "20px",
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      }
    );
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Documentor
        </p>

        <AnimatedTitle
          title="get starte<b>d</b> with <br /> document<b>o</b>r"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>About Documentor</p>
          <p className="text-gray-500">
            Real-time document collaboration tool for teams. Write, edit, and
            get feedback in one place, without the hassle of sending files back
            and forth.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/targets.svg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
