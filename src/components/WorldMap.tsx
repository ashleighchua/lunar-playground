'use client';

import type { Destination } from '@/lib/travel';

interface WorldMapProps {
  destination: Destination;
  className?: string;
}

export function WorldMap({ destination, className = '' }: WorldMapProps) {
  // OpenStreetMap embed URL with coordinates
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${destination.lng - 0.15},${destination.lat - 0.1},${destination.lng + 0.15},${destination.lat + 0.1}&layer=mapnik&marker=${destination.lat},${destination.lng}`;

  return (
    <div className={`relative ${className}`}>
      {/* Map container */}
      <div className="relative w-full overflow-hidden rounded-lg border border-[#2D2640]/10" style={{ paddingBottom: '50%' }}>
        {/* OpenStreetMap iframe */}
        <iframe
          src={mapUrl}
          className="absolute inset-0 w-full h-full"
          style={{
            border: 0,
            filter: 'saturate(0.7) contrast(0.95)',
          }}
          loading="lazy"
          title={`Map of ${destination.city}`}
        />

        {/* Coordinates overlay */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/80 rounded text-xs text-[#655E78] font-mono">
          {destination.lat.toFixed(2)}°{destination.lat >= 0 ? 'N' : 'S'}, {destination.lng.toFixed(2)}°{destination.lng >= 0 ? 'E' : 'W'}
        </div>
      </div>
    </div>
  );
}
