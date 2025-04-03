import { useEffect } from "react";
import { KEYBOARD_KEYS } from "@/lib/accessibility";

type KeyCombo = string[];
type Callback = () => void;

interface UseKeyboardShortcutOptions {
  keys: KeyCombo;
  callback: Callback;
  enabled?: boolean;
}

export const useKeyboardShortcut = ({
  keys,
  callback,
  enabled = true,
}: UseKeyboardShortcutOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.add(e.key);

      if (keys.every((key) => pressedKeys.has(key))) {
        e.preventDefault();
        callback();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.key);
    };

    const handleBlur = () => {
      pressedKeys.clear();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [keys, callback, enabled]);
};
