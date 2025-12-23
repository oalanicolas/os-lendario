import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Icon } from './icon';

interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
}

const Carousel = ({ children, className }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className={cn('group relative', className)}>
      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        onScroll={checkScroll}
      >
        {children}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-border bg-background/80 opacity-0 shadow-md backdrop-blur-sm transition-opacity disabled:opacity-0 group-hover:opacity-100',
          !canScrollLeft && 'hidden'
        )}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <Icon name="angle-left" size="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          'absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-border bg-background/80 opacity-0 shadow-md backdrop-blur-sm transition-opacity disabled:opacity-0 group-hover:opacity-100',
          !canScrollRight && 'hidden'
        )}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <Icon name="angle-right" size="size-4" />
      </Button>
    </div>
  );
};

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-w-[80%] snap-center md:min-w-[45%] lg:min-w-[30%]', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CarouselItem.displayName = 'CarouselItem';

export { Carousel, CarouselItem };
