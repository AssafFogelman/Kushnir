import { useEffect, useRef } from "react";

export const useScreenReaderAnnouncement = () => {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!announcementRef.current) return;

    const announcement = announcementRef.current;
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.position = "absolute";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.padding = "0";
    announcement.style.margin = "-1px";
    announcement.style.overflow = "hidden";
    announcement.style.clip = "rect(0, 0, 0, 0)";
    announcement.style.whiteSpace = "nowrap";
    announcement.style.border = "0";

    document.body.appendChild(announcement);

    return () => {
      document.body.removeChild(announcement);
    };
  }, []);

  const announce = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
    }
  };

  return {
    announcementRef,
    announce,
  };
};
