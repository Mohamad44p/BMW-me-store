"use client";
import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import ParallaxEffect from "../components/ParallaxEffect";
import Highlights from "../components/Highlights";
import VideoCarousel from "../components/VideoCarousel";
import Footer from "../components/Footer";
import Features from "../components/Features";

const Home = () => {
  const [videoSrc, setVideoSrc] = useState("/assets/BMW.mp4");

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
    gsap.to("#hero-video", {
      y: 0,
      duration: 1,
      ease: "power1.out",
    });
  }, []);

  return (
    <>
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title mb-4">
          BMW M4 G82
        </p>
        <div className="w-[900px]">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            id="hero-video"
            loop
            style={{ transform: "translateY(100%)" }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <Link
          href="/Shop"
          className="px-5 py-2 rounded-3xl bg-slate-600 my-5 hover:bg-transparent border border-transparent hover:border hover:text-blue hover:border-blue-500"
        >
          Buy
        </Link>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
    <ParallaxEffect/>
    <Highlights/>
    <Features/>
    <Footer/>
    </>
  );
};

export default Home;
