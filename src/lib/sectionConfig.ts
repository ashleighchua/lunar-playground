export interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  accentBg: string;
  loadingMessages: string[];
  planetSymbol: string;
}

export const sectionConfigs: SectionConfig[] = [
  {
    id: 'operating-system',
    title: 'Your Operating System',
    subtitle: 'The Big Three',
    description: 'How your Sun, Moon, and Rising work together as one system.',
    accentColor: '#7A746C',
    accentBg: '#F5F3F0',
    loadingMessages: [
      'Mapping your three core lenses...',
      'Tracing the pattern between identity, emotion, and presence...',
      'Seeing how your system holds together...',
    ],
    planetSymbol: '\u2609',
  },
  {
    id: 'core-drives',
    title: 'Your Core Drives',
    subtitle: 'Mercury, Venus, Mars, Saturn',
    description: 'How you think, connect, act, and handle pressure.',
    accentColor: '#5A6B7A',
    accentBg: '#EEF3F7',
    loadingMessages: [
      'Reading your Mercury, Venus, Mars, and Saturn...',
      'Understanding how your drives interact...',
      'Finding where alignment and tension live...',
    ],
    planetSymbol: '\u263F',
  },
  {
    id: 'decision-making',
    title: 'Decision Making',
    subtitle: 'Mercury + Sun',
    description: 'Your natural style for choosing, and where it trips you up.',
    accentColor: '#6B8DAB',
    accentBg: '#EEF3F7',
    loadingMessages: [
      'Examining your decision architecture...',
      'Finding your clarity triggers and blind spots...',
      'Understanding how you choose...',
    ],
    planetSymbol: '\u263F',
  },
  {
    id: 'emotional-pattern',
    title: 'Emotional Pattern',
    subtitle: 'Moon-led',
    description: 'How you process feelings, and what happens under pressure.',
    accentColor: '#FFB88C',
    accentBg: '#F5EBE4',
    loadingMessages: [
      'Reading your emotional rhythm...',
      'Tracing your regulation pattern...',
      'Finding the signal beneath the noise...',
    ],
    planetSymbol: '\u263D',
  },
  {
    id: 'rest-recharge',
    title: 'Rest & Recharge',
    subtitle: 'Moon-led',
    description: 'What actually restores you versus what just looks like rest.',
    accentColor: '#9CB896',
    accentBg: '#EDF4ED',
    loadingMessages: [
      'Understanding what truly restores you...',
      'Finding your depletion signals...',
      'Mapping your recharge pattern...',
    ],
    planetSymbol: '\u263D',
  },
  {
    id: 'relationship-blueprint',
    title: 'Relationship Blueprint',
    subtitle: 'Moon + Venus',
    description: 'How you bond, attach, and where misunderstandings begin.',
    accentColor: '#8B6B60',
    accentBg: '#F5EBE4',
    loadingMessages: [
      'Reading your attachment pattern...',
      'Understanding how you show and receive love...',
      'Finding where connection deepens or strains...',
    ],
    planetSymbol: '\u2640',
  },
  {
    id: 'work-style',
    title: 'Work & Impact',
    subtitle: 'Sun + Saturn',
    description: 'What motivates you, how burnout develops, and your best environment.',
    accentColor: '#FF8FA3',
    accentBg: '#FDF3E3',
    loadingMessages: [
      'Understanding your work motivation...',
      'Reading your relationship with authority and ambition...',
      'Finding your impact pattern...',
    ],
    planetSymbol: '\u2644',
  },
  {
    id: 'shadow-growth',
    title: 'Shadow & Growth',
    subtitle: 'Sun-led',
    description: 'The recurring friction you carry and the path through it.',
    accentColor: '#7A746C',
    accentBg: '#F5F3F0',
    loadingMessages: [
      'Looking at what usually stays hidden...',
      'Tracing the pattern that shows up under pressure...',
      'Finding the growth edge...',
    ],
    planetSymbol: '\u25D1',
  },
  {
    id: 'takeaways',
    title: 'Practical Takeaways',
    subtitle: 'Your summary',
    description: 'Strengths to lean into, patterns to watch, and a practical reframe.',
    accentColor: '#9CB896',
    accentBg: '#EDF4ED',
    loadingMessages: [
      'Distilling your chart into daily guidance...',
      'Finding what you can use this week...',
      'Building your practical toolkit...',
    ],
    planetSymbol: '\u2726',
  },
];

export function getSectionConfig(id: string): SectionConfig | undefined {
  return sectionConfigs.find(s => s.id === id);
}
