"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useRef, useState } from "react";
import Link from "next/link";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoReady = () => {
    console.log("Video ready — removing loading screen");
    setLoading(false);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={videoRef}
          src="/videos/Hero-main.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onCanPlayThrough={handleVideoReady}
        />

        {/* Overlay Hitam Transparan */}
        <div className="absolute left-0 top-0 z-20 size-full bg-black bg-opacity-40"></div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-primary-green">
          <b>per</b>fect i<b>t</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h2 className="special-font hero-heading text-primary-green">
              Crea<b>t</b>e
            </h2>

            <p className="mb-5 pl-24 font-robert-bold text-lg md:text-xl text-blue-100">
              Documentor simplifies the creation, editing,
              <br /> and sharing of documents,
              <br /> both personally and as a team.
            </p>

            <Link href="/home">
              <Button
                id="try-it"
                title="Try It Now!"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 transition duration-300 flex-center gap-1 ml-24"
              />
            </Link>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>per</b>fect i<b>t</b>
      </h1>
    </div>
  );
};

export default Hero;
