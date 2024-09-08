"use client";
import { useEffect, useRef } from "react";

export default function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}

export function getInitials(name: string) {
  const words = name?.split(" ");
  const initials = words?.map((word) => word[0])?.join("");
  return initials?.toUpperCase();
}

export const levels = [
  { key: "foundationI", name: "Foundation I" },
  { key: "foundationII", name: "Foundation II" },
  { key: "intermediateI", name: "Intermediate I" },
  { key: "intermediateII", name: "Intermediate II" },
  { key: "finalI", name: "Final I" },
  { key: "finalII", name: "Final II" },
];

export const getCurrentLevel = (data: any) => {
  for (let level of levels) {
    if (!data[level.key]) {
      return level.name; // Return the first level that's false
    }
  }
  return "All Levels Completed"; // If all levels are true
};

export const getLevelStatus = (data: any) => {
  let currentLevel = "All Levels Completed";
  let levelsLeft = 0;
  let paidLevels = 0;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];

    // Check for the current level (the first false value)
    if (!data[level.key] && currentLevel === "All Levels Completed") {
      currentLevel = level.name;
    }

    // Count how many levels are still false (not completed)
    if (!data[level.key]) {
      levelsLeft++;
    }

    // Count how many levels are paid (true)
    if (data[level.key]) {
      paidLevels++;
    }
  }

  return { currentLevel, levelsLeft, paidLevels };
};
