import { useEffect, useRef } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useDropdownFocus = (isOpen: boolean) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    const dropdown = dropdownRef.current;
    const items = Array.from(
      dropdown.querySelectorAll('[role="option"]')
    ) as HTMLElement[];

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
          break;
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case KEYBOARD_KEYS.ENTER:
        case KEYBOARD_KEYS.SPACE:
          e.preventDefault();
          if (activeIndex >= 0) {
            items[activeIndex].click();
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          e.preventDefault();
          // Handle dropdown close
          break;
        default:
          break;
      }
    };

    dropdown.addEventListener("keydown", handleKeyDown);

    return () => {
      dropdown.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  return {
    dropdownRef,
    activeIndex,
    setActiveIndex,
  };
};
