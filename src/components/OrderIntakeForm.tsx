'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import { type City } from '@/lib/cities';
import { isValidDate } from '@/lib/utils';
import { THEME_LABELS, type ThemeName } from '@/lib/astrocartography/themes';
import { MOTIVATION_LABELS, type RelocationMotivation } from '@/lib/reportGeneration/orderInput';

const THEME_OPTIONS = Object.keys(THEME_LABELS) as ThemeName[];
const MOTIVATION_OPTIONS = Object.keys(MOTIVATION_LABELS) as RelocationMotivation[];
const MAX_THEMES = 3;
const MAX_MOTIVATIONS = 3;
const MAX_DESTINATION_CITIES = 3;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface OrderIntakeFormProps {
  sessionId: string;
}

export function OrderIntakeForm({ sessionId }: OrderIntakeFormProps) {
  const router = useRouter();
  const [client, setClient] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [themes, setThemes] = useState<ThemeName[]>([]);
  const [motivations, setMotivations] = useState<RelocationMotivation[]>([]);
  const [knowsCities, setKnowsCities] = useState(false);
  const [destinationCities, setDestinationCities] = useState<(City | null)[]>([null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleTheme(theme: ThemeName) {
    setThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : prev.length < MAX_THEMES ? [...prev, theme] : prev
    );
  }

  function toggleMotivation(motivation: RelocationMotivation) {
    setMotivations((prev) =>
      prev.includes(motivation)
        ? prev.filter((m) => m !== motivation)
        : prev.length < MAX_MOTIVATIONS
          ? [...prev, motivation]
          : prev
    );
  }

  function updateDestinationCity(index: number, city: City | null) {
    setDestinationCities((prev) => prev.map((c, i) => (i === index ? city : c)));
  }

  function addDestinationCity() {
    setDestinationCities((prev) => (prev.length < MAX_DESTINATION_CITIES ? [...prev, null] : prev));
  }

  function removeDestinationCity(index: number) {
    setDestinationCities((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidDate(birthdate)) {
      setDateError('Please enter a valid birth date');
      return;
    }
    setDateError(null);

    if (!client.trim()) {
      setError('Tell us what name to use in your reading.');
      return;
    }
    if (!birthtime) {
      setError('We need your exact birth time to calculate your houses and relocation lines accurately.');
      return;
    }
    if (!selectedCity) {
      setError('Add your place of birth.');
      return;
    }
    if (themes.length === 0) {
      setError('Pick at least one thing you want this reading to focus on.');
      return;
    }

    const chosenCities = destinationCities.filter((c): c is City => c !== null);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          client: client.trim(),
          birth: {
            date: birthdate,
            time: birthtime,
            lat: selectedCity.lat,
            lon: selectedCity.lng,
            placeLabel: selectedCity.label,
          },
          themes,
          motivations: motivations.length > 0 ? motivations : undefined,
          destinationCities:
            knowsCities && chosenCities.length > 0
              ? chosenCities.map((c) => ({ name: c.label, country: c.country || '', lat: c.lat, lon: c.lng }))
              : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong submitting your details.');
      }

      router.push('/order-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong submitting your details.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="client" className="block text-sm text-[#655E78] mb-2">
          What name should we use for you?
        </label>
        <input
          id="client"
          type="text"
          required
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640] placeholder:text-[#655E78]/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthdate" className="block text-sm text-[#655E78] mb-2">
            Date of birth
          </label>
          <input
            type="date"
            id="birthdate"
            required
            value={birthdate}
            onChange={(e) => {
              setBirthdate(e.target.value);
              setDateError(null);
            }}
            className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors text-[#2D2640] ${
              dateError ? 'border-red-400' : 'border-[#2D2640]/10 focus:border-[#2D2640]/30'
            }`}
          />
          {dateError && <p className="mt-2 text-sm text-red-500">{dateError}</p>}
        </div>
        <div>
          <label htmlFor="birthtime" className="block text-sm text-[#655E78] mb-2">
            Time of birth
          </label>
          <input
            type="time"
            id="birthtime"
            required
            value={birthtime}
            onChange={(e) => setBirthtime(e.target.value)}
            className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640]"
          />
          <p className="mt-2 text-xs text-[#655E78]">Check your birth certificate. We need this to get your houses right.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#655E78] mb-2">Place of birth</label>
        <CitySelect value={selectedCity?.label || ''} onChange={setSelectedCity} placeholder="Search for a city..." />
      </div>

      <div>
        <label className="block text-sm text-[#655E78] mb-2">What do you want this reading to focus on? (up to {MAX_THEMES})</label>
        <div className="flex flex-wrap gap-2">
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => toggleTheme(theme)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                themes.includes(theme)
                  ? 'bg-[#2D2640] text-[#F0EBF8] border-[#2D2640]'
                  : 'border-[#2D2640]/15 text-[#655E78] hover:border-[#2D2640]/30'
              }`}
            >
              {THEME_LABELS[theme]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#655E78] mb-2">
          What&apos;s bringing you to this? <span className="text-[#655E78]/60">(optional, up to {MAX_MOTIVATIONS})</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MOTIVATION_OPTIONS.map((motivation) => (
            <button
              key={motivation}
              type="button"
              onClick={() => toggleMotivation(motivation)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                motivations.includes(motivation)
                  ? 'bg-[#2D2640] text-[#F0EBF8] border-[#2D2640]'
                  : 'border-[#2D2640]/15 text-[#655E78] hover:border-[#2D2640]/30'
              }`}
            >
              {capitalize(MOTIVATION_LABELS[motivation])}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm text-[#655E78] mb-3">
          <input type="checkbox" checked={knowsCities} onChange={(e) => setKnowsCities(e.target.checked)} className="rounded" />
          I already have specific cities in mind
        </label>
        {!knowsCities && (
          <p className="text-xs text-[#655E78]">
            Leave this off and we&apos;ll rank the best-matching cities for you based on what you picked above.
          </p>
        )}
        {knowsCities && (
          <div className="space-y-3">
            {destinationCities.map((city, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1">
                  <CitySelect value={city?.label || ''} onChange={(c) => updateDestinationCity(i, c)} placeholder="Search for a city..." />
                </div>
                {destinationCities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDestinationCity(i)}
                    className="px-3 py-3 text-[#655E78] hover:text-[#2D2640]"
                    aria-label="Remove city"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {destinationCities.length < MAX_DESTINATION_CITIES && (
              <button type="button" onClick={addDestinationCity} className="text-sm text-[#2D2640] underline">
                + Add another city
              </button>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Start my reading'}
      </button>
    </form>
  );
}
