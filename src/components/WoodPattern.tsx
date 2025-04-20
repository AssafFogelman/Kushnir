import { useEffect, useRef } from 'react';

interface WoodPatternProps {
  className?: string;
}

const WoodPattern = ({ className = '' }: WoodPatternProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/wood-texture.jpg';

    img.onload = () => {
      if (containerRef.current) {
        containerRef.current.classList.add('loaded');
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`wood-pattern w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default WoodPattern;
