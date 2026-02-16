/**
 * Integrative interpretations for the "Core Drives" card
 * Generates prose that synthesizes Mercury, Venus, Mars, and Saturn together
 * WITHOUT using element/astrology mechanics language
 */

// Processing modes by sign - used internally for pattern matching
type DriveMode = 'depth' | 'speed' | 'stability' | 'flow';

function getDriveMode(sign: string): DriveMode {
  const depth = ['Scorpio', 'Cancer', 'Capricorn', 'Virgo'];
  const speed = ['Aries', 'Gemini', 'Sagittarius', 'Leo'];
  const stability = ['Taurus', 'Aquarius'];
  if (depth.includes(sign)) return 'depth';
  if (speed.includes(sign)) return 'speed';
  if (stability.includes(sign)) return 'stability';
  return 'flow'; // Libra, Pisces
}

// Mercury - how you think
export const mercuryThinking: Record<string, string> = {
  Aries: "Your mind moves fast and wants conclusions quickly. You reach decisions before others have finished explaining the problem. Patience with long explanations runs thin. You'd rather be wrong and course-correct than wait for certainty.",
  Taurus: "Your mind moves deliberately. You think things through at your own pace, and you don't rush decisions. Once you've landed somewhere, you're not easily swayed. You value practicality over cleverness.",
  Gemini: "Your mind is restless and hungry. You collect information the way some people collect objects, voraciously and widely. You think by talking, by exploring, by connecting dots others haven't noticed.",
  Cancer: "Your mind holds onto things. Memory is vivid and emotional. You think through feeling, often knowing the answer before you can explain why. Your intuition about people is unusually accurate.",
  Leo: "Your mind gravitates toward what's worth sharing. You think in stories, in narratives that make sense of experience. Ideas that can't be expressed don't interest you as much as ideas that move people.",
  Virgo: "Your mind notices everything, especially what's wrong or incomplete. You break problems into parts, fix each piece, and reassemble them better. You're harder on your own thinking than anyone else.",
  Libra: "Your mind sees all sides. You weigh perspectives naturally, which makes you fair but can slow decisions. You think through dialogue, and hearing what others think helps you know what you think.",
  Scorpio: "Your mind naturally looks beneath the surface. You're alert to motives, power dynamics, and what's left unsaid. Surface explanations rarely satisfy you. This gives you strategic insight, but it can also make it hard to switch off.",
  Sagittarius: "Your mind reaches for meaning. You're less interested in details than in what they add up to. Big-picture thinking comes naturally; patience with specifics takes effort.",
  Capricorn: "Your mind is practical and strategic. You think about what works, what lasts, what can actually be built. You're skeptical of ideas that can't survive contact with reality.",
  Aquarius: "Your mind works differently than most. You see patterns others miss, question things others accept, and arrive at conclusions through unconventional paths. You trust logic over tradition.",
  Pisces: "Your mind absorbs more than it analyzes. You think in images, feelings, impressions. Structure isn't your first language, but imagination gives you access to ideas that linear thinkers miss.",
};

// Venus - how you connect and commit
export const venusConnecting: Record<string, string> = {
  Aries: "You approach connection with directness and intensity. You fall hard and pursue openly. Trust is built through honesty and action, not patience. Once interested, you don't wait.",
  Taurus: "You approach connection seriously and steadily. You build trust through consistency, presence, and shared comfort rather than intensity or drama. You don't rush intimacy. You test reliability.",
  Gemini: "You approach connection through curiosity and conversation. You need mental engagement to feel close. Boredom is more threatening to intimacy than conflict. You stay interested by staying interested.",
  Cancer: "You approach connection through care and emotional attunement. You create safety before you open up. Trust is built through feeling understood, not through grand gestures.",
  Leo: "You approach connection with warmth and generosity. You want to be appreciated for who you are, not just what you do. Trust is built through recognition and loyalty.",
  Virgo: "You approach connection through attention and effort. You show care by noticing details and solving problems. Trust is built through reliability, not intensity. Vulnerability may arrive later than others expect.",
  Libra: "You approach connection through partnership and balance. You feel incomplete without someone to share with. Trust is built through fairness and mutual consideration.",
  Scorpio: "You approach connection with depth and full commitment. You don't do surface-level. Trust is built slowly and tested thoroughly. Once invested, you're fiercely loyal. Betrayal is unforgivable.",
  Sagittarius: "You approach connection with openness and adventure. You need freedom even within closeness. Trust is built through honesty and shared growth, not possession.",
  Capricorn: "You approach connection seriously and deliberately. You build trust through consistency, effort, and shared direction rather than emotional display. Once invested, you're steady and loyal. The cost is that vulnerability may arrive later than others expect.",
  Aquarius: "You approach connection through friendship and intellectual respect. You need space for individuality within partnership. Trust is built through understanding, not fusion.",
  Pisces: "You approach connection through empathy and imagination. You love unconditionally, sometimes to your own detriment. Trust is built through emotional resonance and acceptance.",
};

// Mars - how you act and assert
export const marsActing: Record<string, string> = {
  Aries: "You move through action directly and immediately. When you want something, you go after it. Conflict doesn't scare you. You'd rather have a fight than let tension simmer. You work in bursts of intensity.",
  Taurus: "You move through action slowly and persistently. You're not easily provoked, but when you are, you're formidable. Your strength is endurance. You win by outlasting, not outrunning.",
  Gemini: "You move through action quickly and adaptively. You fight with words and ideas more than force. When blocked, you find another route. Multiple projects running simultaneously feel natural.",
  Cancer: "You move through action protectively. Your energy rises when someone you love is threatened. Conflict makes you defensive first, aggressive second. You work hardest for what you care about most.",
  Leo: "You move through action with confidence and flair. You want your efforts noticed and appreciated. Conflict engages your dignity. You need to win, but prefer to do so generously.",
  Virgo: "You move through action carefully and methodically. You improve things by refining them. You notice flaws quickly and feel responsible for fixing them. Under stress, this precision can turn inward as self-criticism or outward as quiet frustration.",
  Libra: "You move through action diplomatically and collaboratively. You prefer to achieve through partnership than competition. Conflict disturbs you, and you'll avoid it unless fairness is at stake.",
  Scorpio: "You move through action with intensity and full commitment. When you decide something matters, you pursue it with laser focus. Conflict doesn't rattle you. You can wait for the right moment.",
  Sagittarius: "You move through action optimistically and enthusiastically. You're motivated by meaning and possibility. Conflict is handled directly and then forgotten. You work on what inspires you.",
  Capricorn: "You move through action strategically and with discipline. You play the long game. Conflict is handled carefully, and you prefer to win through persistence and positioning. You work extremely hard.",
  Aquarius: "You move through action independently and unconventionally. You're motivated by ideas and ideals. Conflict is approached intellectually. You want to be right, not just victorious.",
  Pisces: "You move through action intuitively and passively until something truly matters. You're motivated by meaning and feeling. Conflict drains you, and you'd rather flow around obstacles than fight through them.",
};

// Saturn - where pressure shapes you over time
export const saturnPressure: Record<string, string> = {
  Aries: "Independence, initiative, and self-assertion are long-term themes. You may have learned early that your impulses needed controlling, or that being first wasn't always safe. Confidence in your own agency builds slowly through experience, not declarations.",
  Taurus: "Security, worth, and what you have are long-term themes. You may carry anxiety about stability or whether what you're building is solid enough. Self-worth develops through sustained effort, not quick wins.",
  Gemini: "Communication and being understood are long-term themes. You may have felt that your ideas needed proving, or that clarity didn't come easily. Confidence in your voice builds through discipline, not just talent.",
  Cancer: "Belonging, family, and emotional security are long-term themes. You may have learned early that safety wasn't guaranteed, or that nurturing came with conditions. Building inner security takes time.",
  Leo: "Visibility, creativity, and self-expression are long-term themes. You may have felt that recognition needed earning, or that being seen meant being judged. Confidence in your creative authority builds through persistent work.",
  Virgo: "Competence, usefulness, and getting things right are long-term themes. You may carry perfectionism that's more burden than gift. Real competence is built incrementally, and self-criticism eventually softens.",
  Libra: "Relationships, fairness, and balance are long-term themes. You may have learned that harmony required effort, or that partnership came with responsibilities. Healthy relating is learned through experience.",
  Scorpio: "Trust, power, and emotional intensity are long-term themes. You may have learned early that vulnerability had consequences, or that control was necessary for survival. Genuine intimacy builds slowly.",
  Sagittarius: "Meaning, beliefs, and freedom are long-term themes. You may have felt that wisdom needed earning, or that your opinions required defending. Confidence in what you believe builds through experience, not argument.",
  Capricorn: "Achievement, responsibility, and authority are long-term themes. You may feel the weight of expectation more than most. Real mastery comes through sustained effort, and you may need to learn that rest is earned just by being.",
  Aquarius: "Belonging, individuality, and contribution are long-term themes. You may have learned early that being different required effort or restraint. Confidence here is built through lived experience, not self-declaration. When it arrives, it's earned and durable, but the process can feel slow.",
  Pisces: "Faith, boundaries, and the line between self and other are long-term themes. You may have felt that your sensitivity was a liability, or that the world required thicker skin. Grounded compassion develops over time.",
};

// Generate the underlying pattern - the throughline
export function generateUnderlyingPattern(
  mercurySign: string | null,
  venusSign: string | null,
  marsSign: string | null,
  saturnSign: string | null
): string {
  if (!mercurySign || !venusSign || !marsSign) {
    return "With complete birth data, we can identify the underlying pattern that connects how you think, connect, act, and grow.";
  }

  const mercuryMode = getDriveMode(mercurySign);
  const venusMode = getDriveMode(venusSign);
  const marsMode = getDriveMode(marsSign);
  const saturnMode = saturnSign ? getDriveMode(saturnSign) : null;

  // Count mode frequencies
  const modes = [mercuryMode, venusMode, marsMode];
  if (saturnMode) modes.push(saturnMode);

  const modeCounts: Record<DriveMode, number> = { depth: 0, speed: 0, stability: 0, flow: 0 };
  modes.forEach(m => modeCounts[m]++);

  // Find dominant mode(s)
  const maxCount = Math.max(...Object.values(modeCounts));
  const dominantModes = Object.entries(modeCounts)
    .filter(([, count]) => count === maxCount)
    .map(([mode]) => mode as DriveMode);

  // Single dominant mode
  if (dominantModes.length === 1 && maxCount >= 3) {
    return getDominantPatternText(dominantModes[0]);
  }

  // Two dominant modes or mixed
  if (dominantModes.length === 2 || maxCount === 2) {
    return getMixedPatternText(mercuryMode, venusMode, marsMode, saturnMode);
  }

  // All different - complex
  return getComplexPatternText();
}

function getDominantPatternText(mode: DriveMode): string {
  const patterns: Record<DriveMode, string> = {
    depth: `You are wired for depth, commitment, precision, and responsibility.

You don't skim life. You investigate it, invest in it, and work at it. Once something matters to you, you engage fully and expect it to hold weight over time.

This creates strength, but also a high internal bar.`,
    speed: `You are wired for movement, expression, and forward momentum.

You don't wait for perfect conditions. You act, adjust, and keep going. Ideas become actions quickly, and stagnation feels worse than making mistakes.

This creates energy and initiative, but also impatience with slower processes.`,
    stability: `You are wired for consistency, independence, and building what lasts.

You don't chase novelty for its own sake. You value what's proven, what's reliable, what you can count on. Change comes when there's a good reason for it.

This creates dependability, but also resistance when flexibility might serve you.`,
    flow: `You are wired for harmony, adaptation, and reading the room.

You don't force things. You adjust, balance, and find the path of least resistance. Relationships and context matter more than rigid plans.

This creates grace and responsiveness, but also uncertainty about your own center.`,
  };
  return patterns[mode];
}

function getMixedPatternText(mercury: DriveMode, venus: DriveMode, mars: DriveMode, saturn: DriveMode | null): string {
  // Depth + Speed combination
  if ((mercury === 'depth' || venus === 'depth') && (mars === 'speed' || mercury === 'speed')) {
    return `You are wired for both depth and momentum.

You think carefully and connect seriously, but you also need movement and action. This creates productive tension because you want things to matter and you want them to move.

When aligned, this makes you effective and purposeful. When misaligned, you may rush what needs time or overthink what needs action.`;
  }

  // Depth + Stability
  if ((mercury === 'depth' || venus === 'depth') && (mars === 'stability' || venus === 'stability')) {
    return `You are wired for depth, consistency, and building what lasts.

You don't take things lightly. Your thinking, your connections, and your efforts all carry weight. You invest seriously and expect returns over time.

This creates reliability and substance, but also pressure to maintain what you've built.`;
  }

  // Speed + Flow
  if ((mercury === 'speed' || mars === 'speed') && (venus === 'flow' || mercury === 'flow')) {
    return `You are wired for movement, adaptation, and responsive engagement.

You think quickly, connect easily, and adjust naturally. Rigidity feels wrong; responsiveness feels right.

This creates versatility and social fluency, but also a need for enough structure to channel your energy.`;
  }

  // Default mixed
  return `You are wired for different modes depending on the domain.

How you think, connect, and act don't all follow the same rhythm. This isn't inconsistency. It's range. You have access to multiple gears depending on what the situation requires.

The work is knowing which mode serves which moment.`;
}

function getComplexPatternText(): string {
  return `Your drives operate in different modes across different areas.

How you think, how you connect, how you act, and how you grow under pressure each follow their own logic. This isn't fragmentation. It's complexity. You have access to multiple approaches depending on context.

The work is integration: knowing when each mode serves you and when they're in tension.`;
}

// Generate how drives interact - aligned vs misaligned
export function generateDrivesInteraction(
  mercurySign: string | null,
  venusSign: string | null,
  marsSign: string | null,
  saturnSign: string | null
): string {
  if (!mercurySign || !venusSign || !marsSign) {
    return "With complete birth data, we can show how your thinking, connecting, and acting styles reinforce or challenge each other.";
  }

  const mercuryMode = getDriveMode(mercurySign);
  const venusMode = getDriveMode(venusSign);
  const marsMode = getDriveMode(marsSign);

  // All same mode
  if (mercuryMode === venusMode && venusMode === marsMode) {
    return getCoherentInteraction(mercuryMode);
  }

  // Two match
  if (mercuryMode === venusMode || mercuryMode === marsMode || venusMode === marsMode) {
    return getPartialInteraction(mercuryMode, venusMode, marsMode);
  }

  // All different
  return getComplexInteraction(mercuryMode, venusMode, marsMode);
}

function getCoherentInteraction(mode: DriveMode): string {
  const interactions: Record<DriveMode, string> = {
    depth: `Your depth of thought, seriousness in connection, and precision in action all reinforce each other.

When aligned, you're focused, dependable, and quietly formidable.
When misaligned, you may overthink, hold back emotionally, and demand too much from yourself at once.`,
    speed: `Your quick thinking, direct connecting, and active pursuing all reinforce each other.

When aligned, you're energizing, decisive, and inspiring to be around.
When misaligned, you may scatter your attention, move past feelings too quickly, and start more than you finish.`,
    stability: `Your steady thinking, consistent connecting, and patient acting all reinforce each other.

When aligned, you're reliable, trustworthy, and able to build things that last.
When misaligned, you may resist necessary changes, hold onto what no longer serves, and mistake stubbornness for strength.`,
    flow: `Your adaptive thinking, harmonious connecting, and responsive acting all reinforce each other.

When aligned, you're graceful, perceptive, and able to navigate complex situations with ease.
When misaligned, you may lose your center, accommodate too much, and struggle to know what you actually want.`,
  };
  return interactions[mode];
}

function getPartialInteraction(mercury: DriveMode, venus: DriveMode, mars: DriveMode): string {
  // Mercury and Venus match
  if (mercury === venus) {
    return `Your thinking and connecting share a rhythm, while your action style operates differently.

When aligned, this gives you both internal coherence and the ability to shift gears when needed.
When misaligned, you may think and feel one way but act another, creating confusion for yourself and others.`;
  }

  // Mercury and Mars match
  if (mercury === mars) {
    return `Your thinking and acting share a rhythm, while how you connect operates differently.

When aligned, you're effective and decisive, with relationships that balance your drive.
When misaligned, you may move faster in work than in love, or vice versa, creating imbalance.`;
  }

  // Venus and Mars match
  return `Your connecting and acting share a rhythm, while how you think operates differently.

When aligned, your relationships and pursuits feel natural together, with thinking that provides useful contrast.
When misaligned, you may know what you want but overthink, or act on impulse before you've thought it through.`;
}

function getComplexInteraction(mercury: DriveMode, venus: DriveMode, mars: DriveMode): string {
  return `Your thinking, connecting, and acting each follow different rhythms.

When aligned, this gives you remarkable range. You can adapt your approach to what each situation requires.
When misaligned, you may feel pulled in different directions, uncertain which mode to trust.

The work is learning when each mode serves you and when they're competing for priority.`;
}

// Generate what supports alignment
export function generateAlignmentSupport(
  mercurySign: string | null,
  venusSign: string | null,
  marsSign: string | null,
  saturnSign: string | null
): string[] {
  if (!mercurySign || !venusSign || !marsSign) {
    return ["Complete birth data reveals what helps your drives work together."];
  }

  const tips: string[] = [];
  const mercuryMode = getDriveMode(mercurySign);
  const venusMode = getDriveMode(venusSign);
  const marsMode = getDriveMode(marsSign);

  // Depth-related tips
  if (mercuryMode === 'depth' || venusMode === 'depth' || marsMode === 'depth') {
    tips.push("allowing depth without constant intensity");
  }

  // Speed-related tips
  if (mercuryMode === 'speed' || venusMode === 'speed' || marsMode === 'speed') {
    tips.push("channeling momentum without scattering");
  }

  // Stability-related tips
  if (mercuryMode === 'stability' || venusMode === 'stability' || marsMode === 'stability') {
    tips.push("maintaining consistency without rigidity");
  }

  // Flow-related tips
  if (mercuryMode === 'flow' || venusMode === 'flow' || marsMode === 'flow') {
    tips.push("staying responsive without losing your center");
  }

  // Add relationship between effort and ease
  if (venusMode === 'depth' || marsMode === 'depth') {
    tips.push("letting commitment exist without perfection");
  }

  // Add self-pressure awareness
  if (mercuryMode === 'depth' && marsMode === 'depth') {
    tips.push("recognising when effort has crossed into self-pressure");
  }

  return tips;
}

// Generate closing strength statement
export function generateStrengthStatement(
  mercurySign: string | null,
  venusSign: string | null,
  marsSign: string | null,
  saturnSign: string | null
): string {
  if (!mercurySign || !venusSign || !marsSign) {
    return "Your strength emerges from how these drives work together.";
  }

  const mercuryMode = getDriveMode(mercurySign);
  const venusMode = getDriveMode(venusSign);
  const marsMode = getDriveMode(marsSign);

  // Dominant depth
  if ([mercuryMode, venusMode, marsMode].filter(m => m === 'depth').length >= 2) {
    return "Your strength is not speed or ease. It's sustained, meaningful progress.";
  }

  // Dominant speed
  if ([mercuryMode, venusMode, marsMode].filter(m => m === 'speed').length >= 2) {
    return "Your strength is not patience or caution. It's initiative and the courage to begin.";
  }

  // Dominant stability
  if ([mercuryMode, venusMode, marsMode].filter(m => m === 'stability').length >= 2) {
    return "Your strength is not adaptability or speed. It's reliability and the ability to build.";
  }

  // Dominant flow
  if ([mercuryMode, venusMode, marsMode].filter(m => m === 'flow').length >= 2) {
    return "Your strength is not force or persistence. It's responsiveness and the ability to navigate.";
  }

  // Mixed
  return "Your strength is range: the ability to draw from different modes as situations require.";
}
