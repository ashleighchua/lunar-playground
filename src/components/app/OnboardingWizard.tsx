'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveBirthData, setAppOnboarded } from '@/lib/birthData';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';
import { WizardStepShell } from './WizardStepShell';

const inputClasses =
  'mt-2.5 w-full box-border rounded-[14px] border border-[#F0EBF8]/20 bg-white/6 px-[18px] py-4 text-[17px] text-[#F0EBF8] outline-none';

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [place, setPlace] = useState<City | null>(null);

  const finish = () => {
    if (!birthdate) return;
    saveBirthData({
      birthdate,
      birthtime,
      birthplace: place ? { name: place.label, country: place.country ?? '', lat: place.lat, lng: place.lng } : null,
    });
    setAppOnboarded();
    router.replace('/app');
  };

  const skip = () => {
    setAppOnboarded();
    router.replace('/app');
  };

  if (step === 0) {
    return (
      <WizardStepShell
        step={0}
        totalSteps={3}
        onSkip={skip}
        glyph="☉"
        title="When were you born?"
        sub="Enter once, explore everything. Your date alone unlocks most tools."
        ctaLabel="Continue"
        onCta={() => setStep(1)}
        ctaDisabled={!birthdate}
      >
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={inputClasses}
          style={{ colorScheme: 'dark' }}
        />
      </WizardStepShell>
    );
  }

  if (step === 1) {
    return (
      <WizardStepShell
        step={1}
        totalSteps={3}
        onBack={() => setStep(0)}
        onSkip={skip}
        glyph="☾"
        title="What time?"
        sub="Optional, but recommended — it unlocks your rising sign, Human Design, and your birth chart houses."
        ctaLabel="Continue"
        onCta={() => setStep(2)}
      >
        <input
          type="time"
          value={birthtime}
          onChange={(e) => setBirthtime(e.target.value)}
          className={inputClasses}
          style={{ colorScheme: 'dark' }}
        />
      </WizardStepShell>
    );
  }

  return (
    <WizardStepShell
      step={2}
      totalSteps={3}
      onBack={() => setStep(1)}
      onSkip={skip}
      glyph="✧"
      title="And where?"
      sub="Needed for your rising sign and the Relocation Report — the one that tells you where you'd thrive."
      ctaLabel="Save & explore"
      onCta={finish}
    >
      <div className="mt-2.5">
        <CitySelect
          value={place?.label ?? ''}
          onChange={setPlace}
          placeholder="City, country"
        />
      </div>
    </WizardStepShell>
  );
}
