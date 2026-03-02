'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Search, X, Loader2 } from 'lucide-react';
import { searchCitiesAPI, POPULAR_CITIES, type City } from '@/lib/cities';
import { cn } from '@/lib/utils';

interface CitySelectProps {
  value: string;
  onChange: (city: City | null) => void;
  placeholder?: string;
  className?: string;
}

export function CitySelect({
  value,
  onChange,
  placeholder = "Type a city name...",
  className,
}: CitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 1) {
      setResults(POPULAR_CITIES);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const cities = await searchCitiesAPI(searchQuery);
      setResults(cities.length > 0 ? cities : []);
      setHighlightedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search when query changes (with debounce)
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length === 0 && isOpen) {
      // Show popular cities when empty
      setResults(POPULAR_CITIES);
      setIsLoading(false);
    } else if (query.length >= 1) {
      setIsLoading(true);
      // Debounce API calls by 300ms
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      setResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, isOpen, performSearch]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[highlightedIndex]) {
          selectCity(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const selectCity = (city: City) => {
    onChange(city);
    setQuery('');
    setIsOpen(false);
  };

  const clearSelection = () => {
    onChange(null);
    setQuery('');
    inputRef.current?.focus();
  };

  // Highlight matching text in results
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <span className="font-semibold text-[#2D2640]">
          {text.slice(index, index + searchQuery.length)}
        </span>
        {text.slice(index + searchQuery.length)}
      </>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Input */}
      <div className="relative">
        {value ? (
          // Selected value display
          <div
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-3 pr-16 border border-[#2D2640]/10 rounded-lg bg-white text-[#2D2640] cursor-pointer"
          >
            <span className="truncate block">{value}</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="p-1 hover:bg-[#2D2640]/5 rounded"
              >
                <X className="w-4 h-4 text-[#7B7394]" />
              </button>
              <ChevronDown className={cn(
                "w-4 h-4 text-[#7B7394] transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </div>
        ) : (
          // Search input
          <>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7394]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full px-4 py-3 pl-10 pr-10 border border-[#2D2640]/10 rounded-lg bg-white text-[#2D2640] placeholder:text-[#7B7394]/50 focus:outline-none focus:border-[#FF8FA3]/50 transition-colors"
            />
            {isLoading ? (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7394] animate-spin" />
            ) : (
              <ChevronDown
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7394] transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            )}
          </>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#F0EBF8] border border-[#2D2640]/10 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {value && (
            <div className="p-2 border-b border-[#2D2640]/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7394]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for another city..."
                  className="w-full px-3 py-2 pl-9 text-sm border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30"
                  autoFocus
                />
                {isLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7394] animate-spin" />
                )}
              </div>
            </div>
          )}

          {!query && results.length > 0 && (
            <div className="px-3 py-2 text-xs text-[#7B7394] bg-[#2D2640]/5 border-b border-[#2D2640]/10">
              Popular cities (type to search all)
            </div>
          )}

          {isLoading && results.length === 0 ? (
            <div className="px-4 py-6 text-center text-[#7B7394] text-sm flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching cities...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-[#7B7394] text-sm">
              {query.length === 0
                ? "Type a city name to search"
                : "No cities found. Try a different spelling."}
            </div>
          ) : (
            <ul role="listbox">
              {results.map((city, index) => (
                <li
                  key={`${city.value}-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onClick={() => selectCity(city)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "px-4 py-2.5 cursor-pointer text-sm border-b border-[#2D2640]/5 last:border-0",
                    index === highlightedIndex
                      ? "bg-[#2D2640]/10 text-[#2D2640]"
                      : "text-[#7B7394] hover:bg-[#2D2640]/5"
                  )}
                >
                  {highlightMatch(city.label, query)}
                </li>
              ))}
            </ul>
          )}

          {query && results.length > 0 && (
            <div className="px-3 py-2 text-xs text-[#7B7394] bg-[#2D2640]/5 border-t border-[#2D2640]/10 text-center">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
