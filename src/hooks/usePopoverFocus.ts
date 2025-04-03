import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const usePopoverFocus = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;

    const popover = popoverRef.current;
    const trigger = triggerRef.current;
    const focusableElements = popover.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD_KEYS.ESCAPE:
          e.preventDefault();
          setIsOpen(false);
          trigger?.focus();
          break;
        case KEYBOARD_KEYS.TAB:
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
          break;
        default:
          break;
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (
        !popover.contains(e.relatedTarget as Node) &&
        !trigger?.contains(e.relatedTarget as Node)
      ) {
        setIsOpen(false);
      }
    };

    popover.addEventListener("keydown", handleKeyDown);
    popover.addEventListener("focusout", handleFocusOut);
    firstFocusableElement?.focus();

    return () => {
      popover.removeEventListener("keydown", handleKeyDown);
      popover.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen]);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  return {
    popoverRef,
    triggerRef,
    isOpen,
    openPopover,
    closePopover,
  };
};
