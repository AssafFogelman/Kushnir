import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useDialogFocus = (isOpen: boolean) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const [titleId, setTitleId] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
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
          // Handle dialog close
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

    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    dialog.addEventListener("keydown", handleKeyDown);
    firstFocusableElement?.focus();

    // Set ARIA attributes
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    if (titleId) {
      dialog.setAttribute("aria-labelledby", titleId);
    }

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
      lastFocusedElementRef.current?.focus();
      dialog.removeAttribute("aria-labelledby");
    };
  }, [isOpen, titleId]);

  return {
    dialogRef,
    setTitleId,
  };
};
