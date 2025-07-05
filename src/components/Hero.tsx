"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useState, useEffect } from "react";
import Link from "next/link";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const AdvancedTypewriter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentAction, setCurrentAction] = useState<"typing" | "deleting">(
    "typing"
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["Type", "Delete", "Repeat"];
  const typingDelay = 100;
  const deletingDelay = 50;
  const pauseBetweenWords = 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentAction === "typing") {
      if (displayedText.length < words[currentWordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText(
            words[currentWordIndex].substring(0, displayedText.length + 1)
          );
        }, typingDelay);
      } else {
        timeout = setTimeout(() => {
          setCurrentAction("deleting");
        }, pauseBetweenWords);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(
            displayedText.substring(0, displayedText.length - 1)
          );
        }, deletingDelay);
      } else {
        const nextWordIndex = (currentWordIndex + 1) % words.length;
        setCurrentWordIndex(nextWordIndex);
        setCurrentAction("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentAction, currentWordIndex]);

  return (
    <div className="text-center w-full">
      {/* Versi 1: Ukuran maksimal dengan viewport units */}
      <span className="text-[20vw] md:text-[15vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple leading-none">
        {displayedText}
      </span>
      <span className="text-[20vw] md:text-[15vw] animate-pulse text-white leading-none">
        |
      </span>

      {/* Versi 2: Alternatif dengan ukuran fixed lebih besar */}
      {/* <span className="text-[10rem] md:text-[15rem] font-black text-white leading-none">
        {displayedText}
      </span>
      <span className="text-[10rem] md:text-[15rem] animate-pulse text-white leading-none">|</span> */}
    </div>
  );
};

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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
        <img
          src="/img/hero.jpg"
          alt="Background"
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoad={() => setLoading(false)}
        />

        <div className="absolute left-0 top-0 z-20 size-full bg-black bg-opacity-40"></div>

        {/* Container yang lebih besar untuk typewriter */}
        <div className="absolute left-1/2 top-1/2 z-40 w-full -translate-x-1/2 -translate-y-1/2 transform px-4">
          <AdvancedTypewriter />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-primary-green">
          <b>per</b>fect i<b>t</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h2 className="special-font hero-heading text-primary-green">
              Crea<b>t</b>e
            </h2>
            {/* Paragraf - Pindah ke bawah saat mobile */}
            <div className="md:hidden mb-20 absolute bottom-20 left-0 right-0 text-center px-4">
              <p className="font-robert-bold text-lg text-blue-100">
                Documentor simplifies the creation, editing,
                <br />
                and sharing of documents,
                <br />
                both personally and as a team.
              </p>
            </div>
            <p className="hidden md:block mb-20 pl-24 font-robert-bold text-lg md:text-xl text-blue-100">
              Documentor simplifies the creation, editing,
              <br />
              and sharing of documents,
              <br />
              both personally and as a team.
            </p>

            <div className="mt-16 md:mt-0">
              {" "}
              {/* Tambahan margin-top di mobile */}
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
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>per</b>fect i<b>t</b>
      </h1>
    </div>
  );
};

export default Hero;
