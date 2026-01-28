'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { type City } from '@/lib/cities';

function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

interface BirthDataFormProps {
  className?: string;
  compact?: boolean;
}

export function BirthDataForm({ className = '', compact = false }: BirthDataFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ birthdate: '', birthtime: '' });
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = loadBirthData();
    if (savedData) {
      setFormData({
        birthdate: savedData.birthdate || '',
        birthtime: savedData.birthtime || '',
      });
      if (savedData.birthplace) {
        setSelectedCity({
          label: savedData.birthplace.name,
          country: savedData.birthplace.country,
          lat: savedData.birthplace.lat,
          lng: savedData.birthplace.lng,
        } as City);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(formData.birthdate)) {
      setDateError('Please enter a valid birth date');
      return;
    }

    setDateError(null);
    setIsSubmitting(true);

    // Save form data to localStorage
    saveBirthData({
      birthdate: formData.birthdate,
      birthtime: formData.birthtime,
      birthplace: selectedCity ? {
        name: selectedCity.label,
        country: selectedCity.country || '',
        lat: selectedCity.lat,
        lng: selectedCity.lng,
      } : null,
    });

    // Store email in sessionStorage for the report page to use
    if (userEmail) {
      sessionStorage.setItem('userEmail', userEmail);
    }

    // Navigate to birth report page
    router.push('/birth-report?generate=true');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className={compact ? 'grid grid-cols-2 gap-4' : ''}>
        <div>
          <label htmlFor="birthdate" className="block text-sm text-[#6B6B6B] mb-2">Date of birth</label>
          <input
            type="date"
            id="birthdate"
            required
            value={formData.birthdate}
            onChange={(e) => { setFormData({ ...formData, birthdate: e.target.value }); setDateError(null); }}
            className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors ${
              formData.birthdate ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/60'
            } ${dateError ? 'border-red-400' : 'border-[#2A2A2A]/10 focus:border-[#2A2A2A]/30'}`}
          />
          {dateError && <p className="mt-2 text-sm text-red-500">{dateError}</p>}
        </div>

        <div>
          <label htmlFor="birthtime" className="block text-sm text-[#6B6B6B] mb-2">
            Time of birth {compact && <span className="text-[#6B6B6B]/60">(optional)</span>}
          </label>
          <input
            type="time"
            id="birthtime"
            value={formData.birthtime}
            onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
            className={`w-full px-4 py-3 border border-[#2A2A2A]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors ${
              formData.birthtime ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/60'
            }`}
          />
          {!compact && <p className="mt-2 text-xs text-[#6B6B6B]">For most accurate results. If unknown, some sections will be limited.</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#6B6B6B] mb-2">Place of birth</label>
        <CitySelect
          value={selectedCity?.label || ''}
          onChange={(city) => setSelectedCity(city)}
          placeholder="Search for a city..."
        />
      </div>

      <div className={compact ? '' : 'pt-2'}>
        <label htmlFor="email" className="block text-sm text-[#6B6B6B] mb-2">
          Email <span className="text-[#6B6B6B]/60">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-[#2A2A2A]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors text-[#2A2A2A] placeholder:text-[#6B6B6B]/40"
        />
        {!compact && <p className="mt-2 text-xs text-[#6B6B6B]">We&apos;ll email you a copy of your report</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors mt-4 disabled:opacity-50"
      >
        {isSubmitting ? 'Loading...' : 'Generate my report'}
      </button>
    </form>
  );
}
