import { useGSAP } from "@gsap/react";
import { anmateFeatures } from "../utils/anmation";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Features() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });

    anmateFeatures("#features_title", { y: 0, opacity: 1 }, {});
    anmateFeatures(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );
    anmateFeatures(
      ".g_text",
      { y: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
      {}
    );
  }, []);
  return (
    <section className="h-full common-padding bg-black/55 relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1
            id="features_title"
            className="text-gray-500 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
          >
            Explore the features
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl">BMW M3 G80</h2>
            <h2 className="text-5xl lg:text-7xl">THE NEW BMW M3 CS</h2>
          </div>
          <div className="flex flex-col items-center justify-center sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                preload="none"
                muted
                autoPlay
                loop
                ref={videoRef}
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
              >
                <source src="/assets/videos/Bmwm3video2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <Image
                    src="/assets/BMWimg3.png"
                    alt="Bmw Car Image"
                    width={1980}
                    height={1080}
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <Image
                    src="/assets/BMWimage4.jpg"
                    alt="Bmw Car Image"
                    width={1980}
                    height={1080}
                    className="feature-video g_grow"
                  />
                </div>
              </div>
              <div className="feature-text-container">
                <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-gray-600 max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                    BMW M3 G80 is a high-performance version of the BMW 3 <br />
                    <span className="text-white">
                      The BMW M3 G80 is a New BMW M3 CS and it is a high , that
                      is a high-performance version of the BMW 3 Series
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className=" text-gray-600 max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                    BMW M3 G80 is a high-performance version of the BMW 3 <br />
                    <span className="text-white">
                      The BMW M3 G80 is a New BMW M3 CS and it is a high , that
                      is a high-performance version of the BMW 3 Series
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
