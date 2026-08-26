'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { type City } from '@/lib/cities';
import { isValidDate } from '@/lib/utils';

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
          <label htmlFor="birthdate" className="block text-sm text-[#655E78] mb-2">Date of birth</label>
          <input
            type="date"
            id="birthdate"
            required
            value={formData.birthdate}
            onChange={(e) => { setFormData({ ...formData, birthdate: e.target.value }); setDateError(null); }}
            className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors ${
              formData.birthdate ? 'text-[#2D2640]' : 'text-[#655E78]'
            } ${dateError ? 'border-red-400' : 'border-[#2D2640]/10 focus:border-[#2D2640]/30'}`}
          />
          {dateError && <p className="mt-2 text-sm text-red-500">{dateError}</p>}
        </div>

        <div>
          <label htmlFor="birthtime" className="block text-sm text-[#655E78] mb-2">
            Time of birth {compact && <span className="text-[#655E78]">(optional)</span>}
          </label>
          <input
            type="time"
            id="birthtime"
            value={formData.birthtime}
            onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
            className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors ${
              formData.birthtime ? 'text-[#2D2640]' : 'text-[#655E78]'
            }`}
          />
          {!compact && <p className="mt-2 text-xs text-[#655E78]">For most accurate results. If unknown, some sections will be limited.</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#655E78] mb-2">Place of birth</label>
        <CitySelect
          value={selectedCity?.label || ''}
          onChange={(city) => setSelectedCity(city)}
          placeholder="Search for a city..."
        />
      </div>

      <div className={compact ? '' : 'pt-2'}>
        <label htmlFor="email" className="block text-sm text-[#655E78] mb-2">
          Email <span className="text-[#655E78]">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640] placeholder:text-[#655E78]"
        />
        {!compact && <p className="mt-2 text-xs text-[#655E78]">We&apos;ll email you a copy of your report</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-4 disabled:opacity-50"
      >
        {isSubmitting ? 'Loading...' : 'Generate my report'}
      </button>
    </form>
  );
}
