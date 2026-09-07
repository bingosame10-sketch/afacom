import React, { useEffect, useState } from 'react';

interface BannerProps {
  images?: string[];
}

export const Banner: React.FC<BannerProps> = ({ images = [] }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const displayImages = images.filter(Boolean).slice(0, 3);

  if (displayImages.length === 0) return null;

  return (
    <section className="w-full bg-[#FDFCFB] py-4 border-b border-[#E5E2DE]">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayImages.map((imgUrl, idx) => {
            return (
              <div
                key={idx}
                className="h-48 sm:h-64 border border-[#E5E2DE] overflow-hidden rounded-sm relative group bg-gray-100"
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={`Bannière ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-gray-400">
                    Image {idx + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};