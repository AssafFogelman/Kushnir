import { useEffect, useRef, useState } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

interface UseSliderFocusProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export const useSliderFocus = ({
  min,
  max,
  step = 1,
  defaultValue = min,
  onChange,
}: UseSliderFocusProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const thumb = slider.querySelector('[role="slider"]') as HTMLElement;

    const updateValue = (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      setValue(clampedValue);
      onChange?.(clampedValue);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_LEFT:
        case KEYBOARD_KEYS.ARROW_DOWN:
          e.preventDefault();
          updateValue(value - step);
          break;
        case KEYBOARD_KEYS.ARROW_RIGHT:
        case KEYBOARD_KEYS.ARROW_UP:
          e.preventDefault();
          updateValue(value + step);
          break;
        case KEYBOARD_KEYS.HOME:
          e.preventDefault();
          updateValue(min);
          break;
        case KEYBOARD_KEYS.END:
          e.preventDefault();
          updateValue(max);
          break;
        default:
          break;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      const rect = slider.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = min + (max - min) * percentage;
      updateValue(newValue);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const rect = slider.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = min + (max - min) * percentage;
      updateValue(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Set ARIA attributes
    slider.setAttribute("role", "slider");
    slider.setAttribute("aria-valuemin", min.toString());
    slider.setAttribute("aria-valuemax", max.toString());
    slider.setAttribute("aria-valuenow", value.toString());
    slider.setAttribute("aria-valuetext", value.toString());

    thumb?.addEventListener("keydown", handleKeyDown);
    slider.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      thumb?.removeEventListener("keydown", handleKeyDown);
      slider.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [min, max, step, value, isDragging, onChange]);

  return {
    sliderRef,
    value,
    setValue,
  };
};
