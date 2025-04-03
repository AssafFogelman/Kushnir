import { useEffect, useRef } from "react";

type AriaLivePoliteness = "off" | "polite" | "assertive";

interface UseAriaLiveOptions {
  politeness?: AriaLivePoliteness;
  message?: string;
}

export const useAriaLive = ({
  politeness = "polite",
  message = "",
}: UseAriaLiveOptions = {}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!liveRegionRef.current) return;

    const liveRegion = liveRegionRef.current;
    liveRegion.setAttribute("aria-live", politeness);
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-atomic", "true");

    if (message) {
      liveRegion.textContent = message;
    }
  }, [politeness, message]);

  const announce = (newMessage: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = newMessage;
    }
  };

  return {
    liveRegionRef,
    announce,
  };
};
