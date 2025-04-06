import { useEffect, useRef, useState } from 'react';
import { KEYBOARD_KEYS } from '@/lib/accessibility';

export const useTabsFocus = (initialIndex = 0) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (!tabsRef.current) return;

    const tabs = tabsRef.current;
    const tabList = tabs.querySelector('[role="tablist"]');
    const tabItems = Array.from(tabs.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]')) as HTMLElement[];

    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      switch (keyboardEvent.key) {
        case KEYBOARD_KEYS.ARROW_LEFT:
          keyboardEvent.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : tabItems.length - 1));
          break;
        case KEYBOARD_KEYS.ARROW_RIGHT:
          keyboardEvent.preventDefault();
          setActiveIndex(prev => (prev < tabItems.length - 1 ? prev + 1 : 0));
          break;
        case KEYBOARD_KEYS.HOME:
          keyboardEvent.preventDefault();
          setActiveIndex(0);
          break;
        case KEYBOARD_KEYS.END:
          keyboardEvent.preventDefault();
          setActiveIndex(tabItems.length - 1);
          break;
        default:
          break;
      }
    };

    tabList?.addEventListener('keydown', handleKeyDown);

    // Update ARIA attributes
    tabItems.forEach((tab, index) => {
      tab.setAttribute('aria-selected', (index === activeIndex).toString());
      tab.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });

    tabPanels.forEach((panel, index) => {
      panel.setAttribute('aria-hidden', (index !== activeIndex).toString());
      if (index === activeIndex) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    return () => {
      tabList?.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  return {
    tabsRef,
    activeIndex,
    setActiveIndex,
  };
};
