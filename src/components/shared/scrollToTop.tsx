"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowBigUp } from "lucide-react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const halfwayPoint = window.innerHeight / 2;
      if (window.scrollY > halfwayPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scroll() {
    window.scrollTo(0, 0);
  }

  return (
    isVisible && (
      <Button
        size="icon"
        variant="secondary"
        onClick={scroll}
        className="fixed bottom-2 left-2 z-[150] border w-[150px]"
      >
        Scroll To Top
        <ArrowBigUp className="h-6 w-6" />
      </Button>
    )
  );
}

export default ScrollToTop;
