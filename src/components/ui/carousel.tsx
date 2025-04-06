import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ARIA_LABELS, KEYBOARD_KEYS } from '@/lib/accessibility';

interface CarouselProps {
  images: string[];
  className?: string;
}

const Carousel = ({ images, className }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case KEYBOARD_KEYS.ARROW_LEFT:
        e.preventDefault();
        prevImage();
        break;
      case KEYBOARD_KEYS.ARROW_RIGHT:
        e.preventDefault();
        nextImage();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn('relative w-full', className)}
      role='region'
      aria-label={ARIA_LABELS.products.image}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className='relative aspect-square overflow-hidden rounded-lg'>
        <img
          src={images[currentIndex]}
          alt={`${ARIA_LABELS.products.image} ${currentIndex + 1} מתוך ${images.length}`}
          className='h-full w-full object-cover'
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label={ARIA_LABELS.buttons.previous}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label={ARIA_LABELS.buttons.next}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`${ARIA_LABELS.products.image} ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
