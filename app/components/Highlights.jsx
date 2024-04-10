import { useEffect, useRef } from "react";
import gsap from "gsap";

import VideoCarousel from "./VideoCarousel";
import { ChevronRight, Clapperboard } from "lucide-react";

const Highlights = () => {
  const titleRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    const titleAnimation = gsap.to(titleRef.current, { opacity: 1, y: 0 });
    
    const linkAnimations = linkRefs.current.map((link, index) =>
      gsap.to(link, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.5,
        ease: "power2.inOut"
      })
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          titleAnimation.play();
          linkAnimations[index].play();
        } else {
          titleAnimation.reverse();
          linkAnimations[index].reverse();
        }
      });
    }, { threshold: 0.2 });

    const titleRefCurrent = titleRef.current;

    observer.observe(titleRefCurrent);

    return () => {
        observer.unobserve(titleRefCurrent);
    };
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc-950"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 ref={titleRef} className="section-heading opacity-0 translate-y-20">
            Get the highlights.
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p
              ref={(el) => linkRefs.current.push(el)}
              className="link text-blue-500 hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20"
            >
              Watch the film
              <Clapperboard size={24} className="ml-2" />
            </p>
            <p
              ref={(el) => linkRefs.current.push(el)}
              className="link text-blue-500 hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20"
            >
              Watch the event
              <ChevronRight size={24} className="ml-2" />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
