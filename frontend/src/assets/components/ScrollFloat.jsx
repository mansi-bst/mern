import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  className = "",
  animationDuration = 1.5,
  ease = "power3.out",
  scrollStart = "top 90%",
  scrollEnd = "top 55%",
  stagger = 0.025,
  as: Tag = "div",
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";

    return text.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const chars = element.querySelectorAll(".char");

    const animation = gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: animationDuration,
        ease,
        stagger,
        overwrite: "auto",

        scrollTrigger: {
          trigger: element,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.8,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <Tag
      ref={containerRef}
      className={`scroll-float ${className}`}
    >
      {splitText}
    </Tag>
  );
};

export default ScrollFloat;