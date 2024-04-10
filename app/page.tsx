"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useRouter();
  const [canvasVisible, setCanvasVisible] = useState(true);

  useEffect(() => {
    const canvas = document.getElementById("canvas3d") as HTMLCanvasElement;
    if (!canvas) return;

    const app = new Application(canvas);
    app.load("https://prod.spline.design/zXB5BiNw-gN4FcJc/scene.splinecode");
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!canvasVisible) {
      timeoutId = setTimeout(() => {
        navigate.push("/home");
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [canvasVisible, navigate]);

  const handleClick = () => {
    const canvas1 = document.getElementById("canvas3d") as HTMLCanvasElement;
    const canvas2 = document.getElementById("canvas3d2") as HTMLCanvasElement;

    if (canvas1 && canvas2) {
      gsap.to(canvas1, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          setCanvasVisible(false);
          const app = new Application(canvas2);
          app.load(
            "https://prod.spline.design/ZVxXz7GS8pUl6G-5/scene.splinecode"
          );
          gsap.from(canvas2, { duration: 0.5, opacity: 0 });
        },
      });
    }
  };

  return (
    <>
      <Suspense fallback={<div>Coming...</div>}>
        <div className="flex justify-center items-center h-screen w-full bg-black overflow-x-hidden">
          {canvasVisible && (
            <canvas
              onClick={handleClick}
              id="canvas3d"
              style={{ opacity: 1 }}
            />
          )}
          <canvas id="canvas3d2" />
        </div>
      </Suspense>
    </>
  );
}
