'use client';

import type { Destination } from '@/lib/travel';

interface WorldMapProps {
  destination: Destination;
  className?: string;
}

export function WorldMap({ destination, className = '' }: WorldMapProps) {
  // Convert lat/lng to x/y percentage on the map
  // Simple equirectangular projection
  const latLngToPercent = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const dest = latLngToPercent(destination.lat, destination.lng);

  return (
    <div className={`relative ${className}`}>
      {/* World map SVG as background */}
      <div className="relative w-full" style={{ paddingBottom: '58.5%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/world-map.svg"
          alt="World map"
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ filter: 'grayscale(100%)' }}
        />

        {/* Destination marker overlay */}
        <div
          className="absolute"
          style={{
            left: `${dest.x}%`,
            top: `${dest.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer pulse ring - animated */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full border border-[#2A2A2A]/20 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </div>
          {/* Middle ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-[#2A2A2A]/40" />
          </div>
          {/* Inner dot */}
          <div className="w-3 h-3 rounded-full bg-[#2A2A2A]" />
        </div>
      </div>

      {/* City label */}
      <div
        className="absolute text-sm font-serif text-[#2A2A2A] bg-[#FAF7F2]/95 px-3 py-1 rounded border border-[#2A2A2A]/10 whitespace-nowrap"
        style={{
          left: `${dest.x}%`,
          top: `${dest.y + 4}%`,
          transform: 'translateX(-50%)',
        }}
      >
        {destination.city}
      </div>
    </div>
  );
}
