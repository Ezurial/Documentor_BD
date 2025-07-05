"use client";

import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #DCF166, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative text-blue-200 z-20">Available Now</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="feature" className="bg-primary-blue pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Outstanding Features
        </p>
        <p className="max-w-xl font-circular-web text-lg text-blue-50 opacity-50">
          The Toolkit provides ready-to-use templates and automatic formatting
          tools for professional documents, Collaboration enables real-time
          editing with character-by-character change tracking, AI Chatbot helps
          write and revise content instantly, Comment Discussion facilitates
          structured feedback within documents, and Tagging with Notification
          ensures team members are always up to date with real-time mentions and
          alerts, all integrated into a single platform for a seamless workflow.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/fonts.mp4"
          title={
            <span className="bg-gradient-to-r from-primary-green to-blue-500 bg-clip-text text-transparent">
              tool <b>k</b>it
            </span>
          }
          description=""
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/chat_Bot.mp4"
            title={
              <span className="bg-gradient-to-r from-primary-green to-blue-500 bg-clip-text text-transparent">
                chat b<b>o</b>t
              </span>
            }
            description=""
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <div className="relative h-full">
            <div className="relative h-full">
              {/* Video */}
              <BentoCard
                src="videos/kolaborasi.mp4"
                title={
                  <span className="bg-gradient-to-r from-primary-green to-blue-500 bg-clip-text text-transparent">
                    {" "}
                    {/* Force black color */}coll<b>a</b>b
                  </span>
                }
                description={
                  <span className="!text-black">
                    {" "}
                    {/* Force black color */}
                  </span>
                }
                isComingSoon
              />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/diskusi.mp4"
            title={
              <span className="bg-gradient-to-r from-primary-green to-blue-500 bg-clip-text text-transparent">
                {" "}
                {/* Force black color */}discu<b>s</b>si<b>o</b>n
              </span>
            }
            description=""
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-primary-green -300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/tagging.mp4"
            title={
              <span className="bg-gradient-to-r from-primary-green to-blue-500 bg-clip-text text-transparent">
                {" "}
                {/* Force black color */}tag<b>g</b>i<b>n</b>g
              </span>
            }
            description=""
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
