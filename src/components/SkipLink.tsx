import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ARIA_LABELS } from "@/lib/accessibility";

const SkipLink = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <a
      href="#main-content"
      className={cn(
        "absolute left-0 top-0 z-50 -translate-y-full bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0",
        isVisible && "focus:translate-y-0"
      )}
      aria-label={ARIA_LABELS.navigation.skipToMain}
    >
      {ARIA_LABELS.navigation.skipToMain}
    </a>
  );
};

export default SkipLink;
