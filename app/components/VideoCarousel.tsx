import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../utils";
import gsap from "gsap";
import playImg from "../../public/assets/play.svg";
import pauseImg from "../../public/assets/pause.svg";
import replayImg from "../../public/assets/replay.svg";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoCarousel() {
  const videoRef = useRef<(HTMLVideoElement | null)[]>(Array.from({ length: hightlightsSlides.length }, () => null));
  const videoSpanRef = useRef<any[]>([]);
  const videoDivRef = useRef<any[]>([]);
  

  const [video, setVideo] = useState({
    isEnd: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<any[]>([]);

  const { videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    if (videoRef.current[videoId]) {
      if (isPlaying) {
        videoRef.current[videoId]?.play();
      } else {
        videoRef.current[videoId]?.pause();
      }
    }
  }, [isPlaying, videoId]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(-${100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    videoRef.current.forEach((video, index) => {
      if (video) {
        ScrollTrigger.create({
          trigger: video,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            if (!isPlaying) {
              setVideo((prevVideo) => ({
                ...prevVideo,
                isPlaying: true,
              }));
            }
          },
          onLeaveBack: () => {
            if (isPlaying) {
              setVideo((prevVideo) => ({
                ...prevVideo,
                isPlaying: false,
              }));
            }
          },
        });
      }
    });
  }, [videoId]);

  useEffect(() => {
    videoRef.current.forEach((video, index) => {
      if (video && isPlaying) {
        video.play();
      }
    });
  }, [isPlaying]);

  const handleLoadedMetaData = (index: number, e: any) => {
    setLoadedData((prevData) => [...prevData, e]);
  };

  const handleProcess = (type: string, i: number) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;
      case "video-rest":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
          isPlaying: true,
        }));
        break;
      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      case "next":
        setVideo((prevVideo) => ({
          ...prevVideo,
          videoId: (prevVideo.videoId + 1) % hightlightsSlides.length,
          isPlaying: true,
        }));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <video
                  id={`video-${index}`}
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el: HTMLVideoElement | null) => {
                    videoRef.current[index] = el;
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                  onEnded={() => {
                    handleProcess("video-end", index);
                  }}
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none h-full w-full object-cover`}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, index) => (
                  <p
                    key={index}
                    className="text-white md:text-2xl text-xl font-medium"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center mt-10">
        <div className="flex items-center justify-center py-5 px-7 bg-gray-800 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => (
            <span
              key={index}
              ref={(el) => {
                videoDivRef.current[index] = el;
              }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => handleProcess("next", index)}
            >
              <span
                ref={(el) => {
                  videoSpanRef.current[index] = el;
                }}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              handleProcess(isLastVideo ? "video-rest" : "play", 0)
            }
          />
        </button>
      </div>
    </>
  );
}
