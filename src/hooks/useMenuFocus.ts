import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useMenuFocus = (isOpen: boolean) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const items = Array.from(
      menu.querySelectorAll('[role="menuitem"]')
    ) as HTMLElement[];

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
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
          // Handle menu close
          break;
        case KEYBOARD_KEYS.HOME:
          e.preventDefault();
          setActiveIndex(0);
          break;
        case KEYBOARD_KEYS.END:
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
        default:
          // Handle type-ahead
          const key = e.key.toLowerCase();
          const index = items.findIndex((item) =>
            item.textContent?.toLowerCase().startsWith(key)
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
          break;
      }
    };

    menu.addEventListener("keydown", handleKeyDown);

    return () => {
      menu.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  return {
    menuRef,
    triggerRef,
    activeIndex,
    setActiveIndex,
  };
};
