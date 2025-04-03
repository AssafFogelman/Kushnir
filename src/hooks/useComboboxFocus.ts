import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

export const useComboboxFocus = () => {
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isOpen || !comboboxRef.current) return;

    const combobox = comboboxRef.current;
    const input = inputRef.current;
    const listbox = listboxRef.current;
    const options = Array.from(
      listbox?.querySelectorAll('[role="option"]') || []
    ) as HTMLElement[];

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          if (activeIndex < options.length - 1) {
            setActiveIndex(activeIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }
          break;
        case KEYBOARD_KEYS.ENTER:
          e.preventDefault();
          if (activeIndex >= 0) {
            options[activeIndex].click();
            setIsOpen(false);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          e.preventDefault();
          setIsOpen(false);
          input?.focus();
          break;
        case KEYBOARD_KEYS.TAB:
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    const handleInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setInputValue(target.value);
      setActiveIndex(-1);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!combobox.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    input?.addEventListener("keydown", handleKeyDown);
    input?.addEventListener("change", handleInputChange);
    document.addEventListener("click", handleClickOutside);

    // Update ARIA attributes
    combobox.setAttribute("role", "combobox");
    combobox.setAttribute("aria-expanded", isOpen.toString());
    combobox.setAttribute("aria-haspopup", "listbox");
    input?.setAttribute("aria-autocomplete", "list");
    input?.setAttribute("aria-controls", "combobox-listbox");
    listbox?.setAttribute("id", "combobox-listbox");
    listbox?.setAttribute("role", "listbox");

    options.forEach((option, index) => {
      option.setAttribute("aria-selected", (index === activeIndex).toString());
    });

    return () => {
      input?.removeEventListener("keydown", handleKeyDown);
      input?.removeEventListener("change", handleInputChange);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, activeIndex]);

  return {
    comboboxRef,
    inputRef,
    listboxRef,
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    inputValue,
    setInputValue,
  };
};
