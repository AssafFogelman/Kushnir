import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useTooltipFocus = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const trigger = triggerRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.ESCAPE) {
        e.preventDefault();
        setIsVisible(false);
        trigger?.focus();
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (
        !tooltip.contains(e.relatedTarget as Node) &&
        !trigger?.contains(e.relatedTarget as Node)
      ) {
        setIsVisible(false);
      }
    };

    tooltip.addEventListener("keydown", handleKeyDown);
    tooltip.addEventListener("focusout", handleFocusOut);

    return () => {
      tooltip.removeEventListener("keydown", handleKeyDown);
      tooltip.removeEventListener("focusout", handleFocusOut);
    };
  }, [isVisible]);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return {
    tooltipRef,
    triggerRef,
    isVisible,
    showTooltip,
    hideTooltip,
  };
};
