"use client";
import { useState, useEffect } from "react";

interface SizeProps {
  width: number;
  height: number;
}

interface Breakpoints {
  isMobile: number;
  isTablet: number;
}

type ResizeCallback = (size: SizeProps, breakpoints: Breakpoints) => void;

function useWindowSize(
  customBreakpoints?: Breakpoints,
  onResize?: ResizeCallback
) {
  const [windowSize, setWindowSize] = useState<SizeProps>({
    width: 0,
    height: 0,
  });

  const breakpoints: Breakpoints = {
    isMobile: customBreakpoints?.isMobile || 641,
    isTablet: customBreakpoints?.isTablet || 768,
  };

  const isMobile = windowSize.width <= breakpoints.isMobile;
  const isTablet = windowSize.width <= breakpoints.isTablet;

  useEffect(() => {
    function handleResize() {
      const newWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setWindowSize(newWindowSize);

      if (onResize) {
        onResize(newWindowSize, breakpoints);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onResize]);

  return {
    ...windowSize,
    isMobile,
    isTablet,
  };
}

export default useWindowSize;
