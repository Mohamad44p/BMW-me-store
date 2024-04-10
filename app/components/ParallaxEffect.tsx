import Picture1 from "../../public/assets/Bmwblackbg.jpg";
import Picture2 from "../../public/assets/Bmw2.png";
import Picture3 from "../../public/assets/carreplcemnt3.jpg";
import Picture4 from "../../public/assets/car4.jpg";
import Picture5 from "../../public/assets/car5.jpg";
import Picture6 from "../../public/assets/car6.jpg";
import Picture7 from "../../public/assets/car7.jpg";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function ParallaxEffect() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#parllextext", {
      y: -50,
      opacity: 1,
      duration: 1,
      delay: 2,
      scrollTrigger: {
        trigger: "#parllextext",
        start: "bottom bottom",
        end: "top 10%",
        scrub: 1,
      },
      ease: "power1.out",
    });
  }, []);

  return (
    <div ref={container} className="container ml-32 my-24">
      <h1 id="parllextext" className="text-center ml-16 text-xl opacity-0">
        Explore The Newest Collection{" "}
      </h1>
      <div className="sticky">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className="el">
              <div className="imageContainer">
                <Image src={src} fill alt="image" placeholder="blur" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
