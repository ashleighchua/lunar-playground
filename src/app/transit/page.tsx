'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { getCurrentMoonPhase } from '@/lib/moon';
import {
  feltExperience,
  morelikelyToday,
  watchForToday,
  todayAnchor,
  todayQuestion,
  notYourFault,
  getMoonPhaseFelt,
  getTomorrowContrast,
  dailyRole,
  dailyActivities,
  generateWeeklyOrientation,
  generateElementFocus,
  getWeeklyQuestion,
  getPhaseArcGuidance,
} from '@/lib/transitContent';

// Moon sign symbols for display
const moonSignSymbols: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

// Legacy data for week view (keeping element/activities for that context)
const moonSignTransits: Record<string, {
  element: string;
  quality: string;
  symbol: string;
  energy: string;
  emotionalTone: string;
  bestFor: string[];
  watchFor: string[];
  selfCareRecommendations: string[];
  journalPrompts: string[];
  activities: string[];
}> = {
  Aries: {
    element: 'Fire',
    quality: 'Cardinal',
    symbol: '♈',
    energy: 'The moon in Aries brings a surge of initiative and directness. Emotions run hot and fast, wanting immediate expression rather than patient processing. This is action-oriented energy that pushes you to start things, speak up, and move forward.',
    emotionalTone: 'Impatient, bold, honest. You may feel more easily frustrated but also more courageous. Quick reactions, quick recovery. The need for independence feels stronger.',
    bestFor: [
      'Starting new projects or initiatives',
      'Having honest, direct conversations',
      'Physical exercise and movement',
      'Making decisions you have been postponing',
      'Taking the first step on something that scares you'
    ],
    watchFor: [
      'Impulsive reactions you might regret',
      'Unnecessary conflicts from being too blunt',
      'Restlessness disguised as boredom',
      'Pushing too hard without considering others'
    ],
    selfCareRecommendations: [
      'Channel excess energy through vigorous exercise',
      'Give yourself permission to be direct without being harsh',
      'Take solo time if you feel irritable',
      'Do something competitive or challenging'
    ],
    journalPrompts: [
      'What have I been avoiding that needs my courage?',
      'Where am I holding back when I should be leading?',
      'What would I start today if I knew I could not fail?'
    ],
    activities: [
      'High-intensity workout',
      'Starting a new habit',
      'Clearing your to-do list',
      'Having a difficult conversation'
    ]
  },
  Taurus: {
    element: 'Earth',
    quality: 'Fixed',
    symbol: '♉',
    energy: 'The moon in Taurus slows everything down in the best way. This is grounding, stabilising energy that asks you to pause and appreciate what you have. Comfort matters. Beauty matters. Taking your time matters.',
    emotionalTone: 'Calm, steady, perhaps stubborn. You may feel more resistant to change but also more content with simplicity. Sensory experiences hit differently. Patience comes easier.',
    bestFor: [
      'Financial planning and practical matters',
      'Self-care rituals and physical comfort',
      'Cooking, gardening, or working with your hands',
      'Consolidating progress rather than starting new',
      'Enjoying simple pleasures without guilt'
    ],
    watchFor: [
      'Resistance to necessary change',
      'Overindulgence in food, spending, or comfort',
      'Stubbornness mistaken for conviction',
      'Moving too slowly when action is needed'
    ],
    selfCareRecommendations: [
      'Treat yourself to good food or a beautiful environment',
      'Spend time in nature or with plants',
      'Physical touch: massage, warm baths, soft textures',
      'Work with your hands on something tangible'
    ],
    journalPrompts: [
      'What do I already have that I am not appreciating?',
      'Where am I resisting change that would actually help me?',
      'What does security really mean to me right now?'
    ],
    activities: [
      'Cooking a nourishing meal',
      'Organising your finances',
      'Gardening or plant care',
      'Creating something beautiful'
    ]
  },
  Gemini: {
    element: 'Air',
    quality: 'Mutable',
    symbol: '♊',
    energy: 'The moon in Gemini quickens the mind. Ideas flow, conversations spark, and curiosity pulls you in multiple directions. This is mentally active energy that wants to learn, connect, and communicate.',
    emotionalTone: 'Curious, scattered, sociable. Feelings might be processed through talking or writing rather than sitting with them. You may feel restless if under-stimulated. Mood shifts quickly.',
    bestFor: [
      'Writing, journaling, or any form of communication',
      'Learning something new or researching',
      'Socialising and catching up with people',
      'Multitasking and handling variety',
      'Short trips or exploring your neighbourhood'
    ],
    watchFor: [
      'Overthinking or intellectualising emotions',
      'Spreading yourself too thin',
      'Gossip or speaking without thinking',
      'Difficulty focusing on one thing'
    ],
    selfCareRecommendations: [
      'Write out your thoughts without editing',
      'Have stimulating conversations',
      'Read, listen to podcasts, or learn something',
      'Change your environment even briefly'
    ],
    journalPrompts: [
      'What have I been curious about but not explored?',
      'Who do I need to reconnect with?',
      'What ideas have I been sitting on that want expression?'
    ],
    activities: [
      'Journaling or free writing',
      'Calling or messaging friends',
      'Reading or learning',
      'Exploring somewhere new'
    ]
  },
  Cancer: {
    element: 'Water',
    quality: 'Cardinal',
    symbol: '♋',
    energy: 'The moon is at home in Cancer, amplifying emotional sensitivity and the need for security. This is nurturing energy that pulls you toward home, family, and whatever makes you feel safe. Feelings run deep.',
    emotionalTone: 'Sensitive, nurturing, possibly moody. You may feel things more intensely and need more comfort than usual. The past might surface. Intuition strengthens.',
    bestFor: [
      'Spending time with family or close loved ones',
      'Creating comfort in your home environment',
      'Cooking, nesting, or domestic activities',
      'Processing emotions and old memories',
      'Nurturing yourself and others'
    ],
    watchFor: [
      'Moodiness or taking things too personally',
      'Retreating into your shell when you need connection',
      'Dwelling on the past unproductively',
      'Emotional eating or comfort-seeking that does not serve you'
    ],
    selfCareRecommendations: [
      'Create a cosy, safe environment',
      'Connect with family or people who feel like home',
      'Allow yourself to feel without judgement',
      'Water activities: baths, swimming, being near water'
    ],
    journalPrompts: [
      'What do I need to feel emotionally safe right now?',
      'What from my past is asking for attention or healing?',
      'How can I better nurture myself?'
    ],
    activities: [
      'Cooking comfort food',
      'Calling family members',
      'Decluttering or improving your home',
      'Looking through old photos or memories'
    ]
  },
  Leo: {
    element: 'Fire',
    quality: 'Fixed',
    symbol: '♌',
    energy: 'The moon in Leo wants to shine. This is warm, generous, expressive energy that craves recognition and creative outlet. Drama can amplify, but so does joy. The heart leads.',
    emotionalTone: 'Warm, proud, dramatic. You may need more attention and appreciation than usual. Generosity flows easily. Creative urges strengthen. Taking things personally is more likely.',
    bestFor: [
      'Creative projects and self-expression',
      'Socialising, entertaining, or being seen',
      'Romance and heartfelt connection',
      'Leadership and stepping into the spotlight',
      'Celebrating yourself and others'
    ],
    watchFor: [
      'Pride getting in the way of resolution',
      'Seeking external validation excessively',
      'Dramatic reactions to small slights',
      'Overshadowing others when they need space'
    ],
    selfCareRecommendations: [
      'Do something creative without worrying about the result',
      'Dress up or present yourself in a way that feels good',
      'Give and receive genuine compliments',
      'Play, laugh, and embrace joy'
    ],
    journalPrompts: [
      'What wants to be expressed through me right now?',
      'Where am I hiding when I could be shining?',
      'What would bring me genuine joy today?'
    ],
    activities: [
      'Creative projects',
      'Social gatherings',
      'Self-expression through appearance',
      'Generous acts for others'
    ]
  },
  Virgo: {
    element: 'Earth',
    quality: 'Mutable',
    symbol: '♍',
    energy: 'The moon in Virgo brings attention to detail and the desire to be useful. This is analytical, service-oriented energy that finds satisfaction in improvement and practical help. Order feels good.',
    emotionalTone: 'Analytical, helpful, possibly anxious. You may feel more critical of yourself and others. The urge to fix, organise, or improve strengthens. Perfectionism can spike.',
    bestFor: [
      'Organising, cleaning, and creating order',
      'Health routines and self-improvement',
      'Detailed work requiring precision',
      'Helping others in practical ways',
      'Analysing problems and finding solutions'
    ],
    watchFor: [
      'Excessive self-criticism',
      'Nitpicking or being overly critical of others',
      'Anxiety about imperfection',
      'Missing the forest for the trees'
    ],
    selfCareRecommendations: [
      'Create order in your physical environment',
      'Do something health-conscious',
      'Complete small tasks for the satisfaction',
      'Practice self-compassion when critical thoughts arise'
    ],
    journalPrompts: [
      'What small improvement would make a real difference?',
      'Where am I being too hard on myself?',
      'How can I be of service without depleting myself?'
    ],
    activities: [
      'Organising or decluttering',
      'Health-focused activities',
      'Detailed work or crafts',
      'Acts of practical service'
    ]
  },
  Libra: {
    element: 'Air',
    quality: 'Cardinal',
    symbol: '♎',
    energy: 'The moon in Libra craves harmony and connection. This is diplomatic, relationship-focused energy that seeks balance and beauty. Partnerships matter more. Conflict feels more distressing.',
    emotionalTone: 'Harmonious, indecisive, relationship-oriented. You may find it harder to know what you want independent of others. The desire for peace and fairness intensifies. Aesthetics affect mood.',
    bestFor: [
      'Relationship conversations and connection',
      'Creating beauty in your environment',
      'Collaboration and partnership activities',
      'Social events and cultural experiences',
      'Finding compromise and balance'
    ],
    watchFor: [
      'People-pleasing at your own expense',
      'Indecision from seeing all sides',
      'Avoiding necessary conflict',
      'Depending too much on others for emotional stability'
    ],
    selfCareRecommendations: [
      'Surround yourself with beauty',
      'Spend quality time with a partner or close friend',
      'Visit a gallery, listen to music, or enjoy art',
      'Practice making small decisions independently'
    ],
    journalPrompts: [
      'What do I actually want, separate from what others want?',
      'Where do I need to set a boundary for better balance?',
      'What relationship needs my attention right now?'
    ],
    activities: [
      'Quality time with partners',
      'Art or cultural experiences',
      'Creating aesthetic beauty',
      'Relationship maintenance'
    ]
  },
  Scorpio: {
    element: 'Water',
    quality: 'Fixed',
    symbol: '♏',
    energy: 'The moon in Scorpio intensifies everything. This is deep, transformative energy that pulls you toward truth, intimacy, and what lies beneath the surface. Nothing feels casual. Emotions have weight.',
    emotionalTone: 'Intense, perceptive, possibly suspicious. You may feel things more deeply and want to understand what is really going on. Privacy needs increase. Superficiality becomes intolerable.',
    bestFor: [
      'Deep conversations and emotional intimacy',
      'Research and investigation',
      'Psychological work and self-examination',
      'Releasing what no longer serves you',
      'Financial matters and shared resources'
    ],
    watchFor: [
      'Obsessive thinking or jealousy',
      'Power struggles in relationships',
      'Holding grudges or being secretive',
      'Intensity that overwhelms yourself or others'
    ],
    selfCareRecommendations: [
      'Allow yourself to feel deeply without acting on everything',
      'Engage in psychological or spiritual work',
      'Honour your need for privacy',
      'Practice letting go of something you are gripping'
    ],
    journalPrompts: [
      'What truth am I avoiding?',
      'What am I ready to let die so something new can be born?',
      'Where am I giving away my power?'
    ],
    activities: [
      'Deep conversations',
      'Therapy or self-reflection',
      'Research or investigation',
      'Clearing out what is no longer needed'
    ]
  },
  Sagittarius: {
    element: 'Fire',
    quality: 'Mutable',
    symbol: '♐',
    energy: 'The moon in Sagittarius expands the emotional horizon. This is optimistic, adventure-seeking energy that wants meaning, freedom, and new experiences. Restlessness can set in if you feel confined.',
    emotionalTone: 'Optimistic, restless, philosophical. You may feel the urge to escape routine or seek bigger meaning. Honesty feels more important than diplomacy. The future calls louder than the present.',
    bestFor: [
      'Travel or planning adventures',
      'Learning, teaching, or philosophical discussion',
      'Expanding your horizons in any way',
      'Optimistic planning and big-picture thinking',
      'Physical activity outdoors'
    ],
    watchFor: [
      'Escapism instead of addressing real issues',
      'Bluntness that hurts others',
      'Overcommitting or promising too much',
      'Restlessness that prevents presence'
    ],
    selfCareRecommendations: [
      'Get outside and move your body',
      'Plan something to look forward to',
      'Learn something that expands your worldview',
      'Give yourself permission to dream big'
    ],
    journalPrompts: [
      'What adventure is calling me?',
      'What belief or assumption needs questioning?',
      'Where do I feel confined and what would freedom look like?'
    ],
    activities: [
      'Outdoor activities',
      'Travel or trip planning',
      'Learning something new',
      'Philosophical discussions'
    ]
  },
  Capricorn: {
    element: 'Earth',
    quality: 'Cardinal',
    symbol: '♑',
    energy: 'The moon in Capricorn brings a serious, goal-oriented tone. This is disciplined, ambitious energy focused on achievement and responsibility. Emotions may feel restrained, but determination strengthens.',
    emotionalTone: 'Reserved, ambitious, responsible. You may feel more focused on duties and long-term goals. Emotional expression can feel harder. The need to be productive intensifies.',
    bestFor: [
      'Career and professional matters',
      'Setting and working toward goals',
      'Taking responsibility and handling obligations',
      'Long-term planning and strategy',
      'Building something that lasts'
    ],
    watchFor: [
      'Suppressing emotions for productivity',
      'Being too hard on yourself',
      'Workaholism or neglecting rest',
      'Pessimism or seeing only obstacles'
    ],
    selfCareRecommendations: [
      'Accomplish something meaningful',
      'Structure your day in a way that feels good',
      'Allow rest to be productive',
      'Acknowledge your achievements'
    ],
    journalPrompts: [
      'What am I building and is it what I actually want?',
      'Where am I being too hard on myself?',
      'What responsibility can I release or delegate?'
    ],
    activities: [
      'Career planning',
      'Goal setting',
      'Handling responsibilities',
      'Structured productivity'
    ]
  },
  Aquarius: {
    element: 'Air',
    quality: 'Fixed',
    symbol: '♒',
    energy: 'The moon in Aquarius creates emotional distance that can be either liberating or detaching. This is unconventional, humanitarian energy that values independence and thinks about the bigger picture.',
    emotionalTone: 'Detached, independent, idealistic. You may feel more comfortable observing emotions than being swept up in them. The need for space increases. Conventional expectations feel constraining.',
    bestFor: [
      'Community involvement or social causes',
      'Innovation and unconventional thinking',
      'Friendship and group activities',
      'Technology and future planning',
      'Breaking free from limiting patterns'
    ],
    watchFor: [
      'Emotional detachment when connection is needed',
      'Contrarianism for its own sake',
      'Prioritising ideals over individual relationships',
      'Alienating others with unconventionality'
    ],
    selfCareRecommendations: [
      'Connect with friends or community',
      'Engage with a cause you care about',
      'Allow yourself to be different',
      'Take space without guilt'
    ],
    journalPrompts: [
      'What convention am I following that does not serve me?',
      'How can I contribute to something larger than myself?',
      'Where do I need more freedom?'
    ],
    activities: [
      'Community or group activities',
      'Working on causes you care about',
      'Connecting with friends',
      'Innovative or unconventional projects'
    ]
  },
  Pisces: {
    element: 'Water',
    quality: 'Mutable',
    symbol: '♓',
    energy: 'The moon in Pisces dissolves boundaries. This is dreamy, intuitive, deeply empathic energy that connects you to the collective unconscious. Sensitivity heightens. The veil between worlds thins.',
    emotionalTone: 'Sensitive, intuitive, possibly escapist. You may absorb others emotions more easily. Dreams may be vivid. The desire to transcend ordinary reality strengthens.',
    bestFor: [
      'Creative and artistic work',
      'Spiritual practices and meditation',
      'Compassionate service to others',
      'Rest, sleep, and dreamwork',
      'Intuitive decision-making'
    ],
    watchFor: [
      'Escapism through substances, media, or fantasy',
      'Absorbing others emotions as your own',
      'Difficulty with boundaries',
      'Confusion or lack of grounding'
    ],
    selfCareRecommendations: [
      'Create or engage with art and music',
      'Meditate or practice spiritual rituals',
      'Spend time near water',
      'Get extra sleep and pay attention to dreams'
    ],
    journalPrompts: [
      'What is my intuition telling me that my mind is ignoring?',
      'What do I need to release or surrender?',
      'How can I serve others without losing myself?'
    ],
    activities: [
      'Creative expression',
      'Meditation or spiritual practice',
      'Rest and dreamwork',
      'Acts of compassion'
    ]
  }
};

// Calculate approximate moon sign for a given date
// The moon moves through each sign roughly every 2.5 days
function getMoonSign(date: Date): string {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  // Reference: January 1, 2025 00:00 UTC the moon was in Cancer (approximately)
  const referenceDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));
  const referenceSignIndex = 3; // Cancer

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceReference = (date.getTime() - referenceDate.getTime()) / msPerDay;

  // Moon takes ~27.3 days to complete the zodiac
  // So it spends ~2.27 days in each sign
  const daysPerSign = 27.3 / 12;
  const signOffset = Math.floor(daysSinceReference / daysPerSign);

  const currentSignIndex = (referenceSignIndex + signOffset) % 12;
  return signs[currentSignIndex >= 0 ? currentSignIndex : currentSignIndex + 12];
}

// Get the week's moon sign transitions
function getWeekTransits(startDate: Date): { date: Date; sign: string; dayName: string }[] {
  const transits = [];
  let lastSign = '';

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const sign = getMoonSign(date);
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });

    if (sign !== lastSign) {
      transits.push({ date, sign, dayName });
      lastSign = sign;
    }
  }

  return transits;
}

export default function TransitPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');

  const today = new Date();
  const moonPhase = getCurrentMoonPhase();
  const currentMoonSign = getMoonSign(today);
  const transitData = moonSignTransits[currentMoonSign];
  const weekTransits = getWeekTransits(today);

  // Get tomorrow's moon sign
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowMoonSign = getMoonSign(tomorrow);
  const tomorrowTransitData = moonSignTransits[tomorrowMoonSign];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="transit" />

      <main className="flex-1 flex flex-col">
        {/* Tab Navigation - First */}
        <section className="container-editorial pt-6 pb-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'today'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'bg-transparent border border-[#2A2A2A]/20 text-[#2A2A2A] hover:border-[#2A2A2A]/40'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'week'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'bg-transparent border border-[#2A2A2A]/20 text-[#2A2A2A] hover:border-[#2A2A2A]/40'
              }`}
            >
              This Week
            </button>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {activeTab === 'today' && (
          <>
            {/* Hero - Moon Phase Centered */}
            <section className="container-editorial pt-6 pb-6 md:pt-8 md:pb-8">
              <div className="text-center">
                <p className="text-sm text-[#6B6B6B] tracking-wide mb-4">
                  {today.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <div className="flex justify-center mb-4">
                  <span className="text-8xl md:text-9xl" style={{ filter: 'saturate(0.3) brightness(1.1)' }}>
                    {moonPhase.emoji}
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-2">
                  {getMoonPhaseFelt(moonPhase.name).name}
                </h1>
                <p className="text-[#6B6B6B] leading-relaxed max-w-lg mx-auto">
                  {getMoonPhaseFelt(moonPhase.name).feeling}
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>

            {/* How Today Feels */}
            <section className="container-editorial py-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl text-[#6B6B6B]">{moonSignSymbols[currentMoonSign]}</span>
                <h2 className="font-serif text-xl text-[#2A2A2A]">Moon in {currentMoonSign}</h2>
              </div>
              <p className="text-[#2A2A2A] leading-relaxed whitespace-pre-line">
                {feltExperience[currentMoonSign]}
              </p>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>

            {/* More Likely / Watch For - Equal height boxes */}
            <section className="container-editorial py-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border border-[#2A2A2A]/5 flex flex-col">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-4">More likely today</h3>
                  <ul className="space-y-2.5 flex-1">
                    {morelikelyToday[currentMoonSign].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#9CB896] mt-0.5">+</span>
                        <span className="text-[#6B6B6B] text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#2A2A2A]/5 flex flex-col">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-4">Watch for</h3>
                  <ul className="space-y-2.5 flex-1">
                    {watchForToday[currentMoonSign].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#B8A090] mt-0.5">·</span>
                        <span className="text-[#6B6B6B] text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>

            {/* Single Anchor */}
            <section className="container-editorial py-6 md:py-8">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-6">One thing today</h2>
              <p className="text-[#2A2A2A] leading-relaxed whitespace-pre-line">
                {todayAnchor[currentMoonSign]}
              </p>
              <p className="text-[#6B6B6B] text-sm mt-6 italic">
                {notYourFault[currentMoonSign]}
              </p>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>

            {/* Question + Tomorrow - Equal boxes side by side */}
            <section className="container-editorial py-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-[#2A2A2A]/5 flex flex-col">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-4">Question for today</h3>
                  <p className="text-[#2A2A2A] leading-relaxed italic flex-1">
                    &ldquo;{todayQuestion[currentMoonSign]}&rdquo;
                  </p>
                </div>
                <div className="bg-[#F5F0EB] rounded-xl p-6 flex flex-col">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-4">Tomorrow</h3>
                  {tomorrowMoonSign !== currentMoonSign && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl text-[#6B6B6B]">{moonSignSymbols[tomorrowMoonSign]}</span>
                      <span className="text-sm text-[#2A2A2A]">Moon in {tomorrowMoonSign}</span>
                    </div>
                  )}
                  <p className="text-[#6B6B6B] leading-relaxed flex-1">
                    {getTomorrowContrast(currentMoonSign, tomorrowMoonSign)}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'week' && (
          <>
            {/* Weekly Orientation */}
            <section className="container-editorial py-6 md:py-8">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">This week&apos;s moon journey</h2>
              <div className="bg-[#F5F0EB] rounded-xl p-6 mb-8">
                <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">This week at a glance</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  {generateWeeklyOrientation(weekTransits.map(t => t.sign))}
                </p>
              </div>

              {/* Daily Cards */}
              <div className="space-y-4">
                {weekTransits.map((transit, i) => {
                  const signData = moonSignTransits[transit.sign];
                  const roleData = dailyRole[transit.sign];
                  const activities = dailyActivities[transit.sign];
                  const isToday = transit.date.toDateString() === today.toDateString();
                  return (
                    <div
                      key={i}
                      className={`rounded-xl p-6 border ${
                        isToday
                          ? 'bg-white border-[#B8A090]'
                          : 'bg-white border-[#2A2A2A]/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl text-[#6B6B6B]">{moonSignSymbols[transit.sign]}</span>
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A]">
                              Moon in {transit.sign}
                              {isToday && <span className="text-[#B8A090] text-sm ml-2">(Today)</span>}
                            </h3>
                            <p className="text-sm text-[#6B6B6B]">
                              {transit.dayName}, {transit.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-[#6B6B6B] bg-[#F5F0EB] px-3 py-1 rounded-full">
                          {signData.element}
                        </span>
                      </div>

                      {/* Purpose */}
                      <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                        {roleData?.purpose || signData.energy.split('.')[0] + '.'}
                      </p>

                      {/* Misfire warning */}
                      <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                        {roleData?.misfire || ''}
                      </p>

                      {/* Takeaway */}
                      {roleData?.takeaway && (
                        <p className="text-[#2A2A2A] text-sm font-medium mb-4 italic">
                          {roleData.takeaway}
                        </p>
                      )}

                      {/* Activities */}
                      <div className="flex flex-wrap gap-2">
                        {(activities || signData.activities.slice(0, 3)).map((activity, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 bg-[#F5F0EB] text-[#6B6B6B] text-xs rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Weekly Themes as Guidance */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>
            <section className="container-editorial py-6 md:py-8">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-6">Weekly themes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-[#2A2A2A]/5">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Elements in focus</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">
                    {generateElementFocus(weekTransits.map(t => t.sign))}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-[#2A2A2A]/5">
                  <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Moon phase arc</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">
                    {getPhaseArcGuidance(moonPhase.name)}
                  </p>
                </div>
              </div>
            </section>

            {/* Weekly Anchor Question */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>
            <section className="container-editorial py-6 md:py-8">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">A question to carry this week</h2>
              <div className="bg-white rounded-xl p-8 border border-[#2A2A2A]/5">
                <p className="text-[#2A2A2A] text-lg leading-relaxed italic">
                  &ldquo;{getWeeklyQuestion(weekTransits.map(t => t.sign))}&rdquo;
                </p>
              </div>
            </section>
          </>
        )}

        {/* Spacer to push footer down */}
        <div className="flex-1" />

        {/* Disclaimer */}
        <section className="container-editorial py-6">
          <p className="text-xs text-[#6B6B6B]/60 text-center">
            This is for reflection, not prediction. Take what resonates and leave what doesn&apos;t.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
