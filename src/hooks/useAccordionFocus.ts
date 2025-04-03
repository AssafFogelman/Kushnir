import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useAccordionFocus = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!accordionRef.current) return;

    const accordion = accordionRef.current;
    const headers = Array.from(
      accordion.querySelectorAll('[role="button"]')
    ) as HTMLElement[];

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = headers.indexOf(e.target as HTMLElement);

      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          if (currentIndex < headers.length - 1) {
            headers[currentIndex + 1].focus();
          }
          break;
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          if (currentIndex > 0) {
            headers[currentIndex - 1].focus();
          }
          break;
        case KEYBOARD_KEYS.HOME:
          e.preventDefault();
          headers[0].focus();
          break;
        case KEYBOARD_KEYS.END:
          e.preventDefault();
          headers[headers.length - 1].focus();
          break;
        case KEYBOARD_KEYS.ENTER:
        case KEYBOARD_KEYS.SPACE:
          e.preventDefault();
          const newExpandedItems = new Set(expandedItems);
          if (expandedItems.has(currentIndex)) {
            newExpandedItems.delete(currentIndex);
          } else {
            newExpandedItems.add(currentIndex);
          }
          setExpandedItems(newExpandedItems);
          break;
        default:
          break;
      }
    };

    headers.forEach((header) => {
      header.addEventListener("keydown", handleKeyDown);
    });

    // Update ARIA attributes
    headers.forEach((header, index) => {
      const isExpanded = expandedItems.has(index);
      header.setAttribute("aria-expanded", isExpanded.toString());
      header.setAttribute("aria-controls", `accordion-panel-${index}`);
    });

    return () => {
      headers.forEach((header) => {
        header.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [expandedItems]);

  return {
    accordionRef,
    expandedItems,
    setExpandedItems,
  };
};
