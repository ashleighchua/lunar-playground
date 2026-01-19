// Practical "This Week" anchors for the Takeaways section
// Actionable micro-experiments tied to each sign

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
                  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PracticalAnchor {
  tryThis: string;
  notice: string;
  microExperiment: string;
}

export const practicalAnchors: Record<ZodiacSign, PracticalAnchor> = {
  Aries: {
    tryThis: "Before your next impulse to act, pause for three breaths. Notice what shifts.",
    notice: "When do you feel most alive? Track the moments this week.",
    microExperiment: "Start one small thing you've been putting off. Just the first step—today.",
  },
  Taurus: {
    tryThis: "Identify one area where you're resisting change. Ask: what am I protecting?",
    notice: "Notice what brings you genuine comfort versus numbing comfort.",
    microExperiment: "Try something slightly different in your routine today and observe your reaction.",
  },
  Gemini: {
    tryThis: "Pick one conversation this week to go deeper than you normally would.",
    notice: "When does your mind feel scattered? What triggered it?",
    microExperiment: "Spend 15 minutes focused on just one thing—no task-switching.",
  },
  Cancer: {
    tryThis: "Ask someone for help with something small. Notice how it feels.",
    notice: "Track when you're nurturing others vs. nurturing yourself this week.",
    microExperiment: "Create a small moment of coziness just for you today.",
  },
  Leo: {
    tryThis: "Celebrate someone else's win genuinely and notice how it feels.",
    notice: "When do you seek external validation vs. feel internally satisfied?",
    microExperiment: "Do something creative with zero intention to share it.",
  },
  Virgo: {
    tryThis: "Complete something at 80% quality on purpose. Notice your discomfort.",
    notice: "When does your inner critic get loudest? What's it responding to?",
    microExperiment: "Praise yourself for three things you did well today—imperfect counts.",
  },
  Libra: {
    tryThis: "Make a decision within 60 seconds. Notice what comes up.",
    notice: "Track moments this week when you adjusted yourself to keep the peace.",
    microExperiment: "Express a preference clearly, even when you could 'go either way.'",
  },
  Scorpio: {
    tryThis: "Share something vulnerable with someone you trust—even something small.",
    notice: "When do you feel the urge to control? What's underneath it?",
    microExperiment: "Let something be imperfectly resolved and see what happens.",
  },
  Sagittarius: {
    tryThis: "Fully commit to something local instead of dreaming about somewhere else.",
    notice: "When does optimism help you, and when does it help you avoid?",
    microExperiment: "Ask someone a genuine question and listen without forming your response.",
  },
  Capricorn: {
    tryThis: "Do something unproductive on purpose. Just for pleasure.",
    notice: "When do you judge yourself for resting? What belief is there?",
    microExperiment: "Acknowledge one way you're already enough, before achieving anything else.",
  },
  Aquarius: {
    tryThis: "Let yourself be emotionally affected by someone. Stay present with it.",
    notice: "When do you intellectualize to avoid feeling?",
    microExperiment: "Connect with one person individually instead of thinking about 'people' generally.",
  },
  Pisces: {
    tryThis: "Set one small boundary and hold it, even when it feels uncomfortable.",
    notice: "Whose emotions are you carrying that aren't yours?",
    microExperiment: "Ground yourself: name 5 things you can see, 4 you can hear, 3 you can touch.",
  },
};

// Generate a contextual "when you notice" prompt
export function getNoticePrompt(sunSign: string, moonSign: string | null): string {
  const sun = sunSign as ZodiacSign;
  const anchor = practicalAnchors[sun];

  if (!moonSign) {
    return anchor.notice;
  }

  // Create a more nuanced prompt combining sun and moon
  const moonAnchor = practicalAnchors[moonSign as ZodiacSign];

  return `${anchor.notice} Also notice: ${moonAnchor.notice.toLowerCase()}`;
}
