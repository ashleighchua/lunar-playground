/**
 * Gold-standard transit content for daily return hook
 * Designed for personal friction, not accuracy
 * Each sign gets: felt experience, stakes, single anchor, single question
 */

// How the day actually feels - visceral, not technical
export const feltExperience: Record<string, string> = {
  Aries: `You're likely to feel a push today. Things that were fine yesterday may suddenly feel too slow, too careful, or just wrong. The urge to act is stronger than usual, and patience feels like a waste of energy.

This isn't impatience as a character flaw. It's the emotional weather right now.`,

  Taurus: `You're likely to feel the need for stillness today. Change may feel more unsettling than usual, even small disruptions to routine. The body wants comfort, and the mind wants to stay where things are known.

This isn't stubbornness. It's the emotional weather right now.`,

  Gemini: `You're likely to feel scattered today. Your attention wants to go in multiple directions, and staying on one topic takes more effort than usual. Conversations feel more appealing than solitude.

This isn't distraction as a problem. It's the emotional weather right now.`,

  Cancer: `You're likely to feel more permeable today. Other people's moods may land harder, and your own feelings may be closer to the surface than usual. The past might feel more present.

This isn't over-sensitivity. It's the emotional weather right now.`,

  Leo: `You're likely to feel the need to be seen today. Work that goes unacknowledged may sting more than usual, and the desire for appreciation feels stronger. Creative expression wants an outlet.

This isn't vanity. It's the emotional weather right now.`,

  Virgo: `You're likely to notice what's wrong today. Imperfections that you normally tolerate may become harder to ignore, and the urge to fix or improve things feels stronger than usual.

This isn't criticism as a habit. It's the emotional weather right now.`,

  Libra: `You're likely to feel the weight of imbalance today. Unfairness or conflict that you usually navigate gracefully may feel more distressing. The pull toward harmony is stronger.

This isn't people-pleasing. It's the emotional weather right now.`,

  Scorpio: `You're likely to feel things more intensely today. Surface-level interactions may feel unsatisfying, and the desire for depth or truth feels stronger than usual. What's hidden wants attention.

This isn't being dramatic. It's the emotional weather right now.`,

  Sagittarius: `You're likely to feel restless today. Routine may feel confining, and the desire for something bigger—meaning, adventure, possibility—is stronger than usual. The horizon pulls.

This isn't escapism. It's the emotional weather right now.`,

  Capricorn: `You're likely to feel the pressure of responsibility today. What needs to be done may feel heavier than usual, and the gap between where you are and where you want to be may feel more acute.

This isn't workaholism. It's the emotional weather right now.`,

  Aquarius: `You're likely to feel the need for distance today. Emotional demands from others may feel more draining than usual, and the desire for mental space feels stronger. Conventional expectations may chafe.

This isn't coldness. It's the emotional weather right now.`,

  Pisces: `You're likely to feel the boundaries blur today. Where you end and others begin may be less clear, and emotions—yours or absorbed from elsewhere—may be harder to trace to their source.

This isn't weakness. It's the emotional weather right now.`,
};

// What's more likely today (stakes-based, not just "good for")
export const morelikelyToday: Record<string, string[]> = {
  Aries: [
    'Starting something you have been postponing',
    'Speaking more directly than usual',
    'Quick decisions that feel right in the moment',
    'Physical energy that needs an outlet',
  ],
  Taurus: [
    'Comfort-seeking that actually restores you',
    'Appreciation for what you already have',
    'Slower decisions that hold up better over time',
    'Noticing beauty in ordinary things',
  ],
  Gemini: [
    'Conversations that open unexpected doors',
    'Connections between ideas you had not seen before',
    'Interest in learning something new',
    'Social energy that wants expression',
  ],
  Cancer: [
    'Intuitive reads that turn out to be accurate',
    'Memories surfacing that want attention',
    'Care that flows naturally toward others',
    'Need for home and familiar comfort',
  ],
  Leo: [
    'Creative impulses that want expression',
    'Warmth that draws others toward you',
    'Recognition of what you have been building',
    'Joy in being genuinely yourself',
  ],
  Virgo: [
    'Seeing what could be improved and how',
    'Satisfaction from solving small problems',
    'Practical help that actually makes a difference',
    'Attention to health or routine',
  ],
  Libra: [
    'Finding the middle ground in disagreements',
    'Noticing when relationships need attention',
    'Aesthetic sensitivity that improves your surroundings',
    'Diplomatic instincts that serve everyone',
  ],
  Scorpio: [
    'Insight into what is really going on',
    'Conversations that go deeper than usual',
    'Release of something you have been holding',
    'Trust-building through honesty',
  ],
  Sagittarius: [
    'Perspective that makes problems feel smaller',
    'Enthusiasm that lifts other people',
    'Meaning emerging from difficulty',
    'Plans that expand what feels possible',
  ],
  Capricorn: [
    'Progress on things that actually matter',
    'Satisfaction from handling responsibilities',
    'Long-term thinking that serves future you',
    'Recognition for sustained effort',
  ],
  Aquarius: [
    'Clarity that comes from stepping back',
    'Ideas that challenge assumptions',
    'Connection through shared interests',
    'Freedom from expectations you did not choose',
  ],
  Pisces: [
    'Compassion that changes the room',
    'Creative or spiritual insight',
    'Dreams or intuition worth paying attention to',
    'Healing through acceptance',
  ],
};

// What to watch for (with consequence, not just caution)
export const watchForToday: Record<string, string[]> = {
  Aries: [
    'Reactions that land harder than you intended',
    'Decisions made too fast to account for others',
    'Frustration that needs an outlet before it finds the wrong one',
  ],
  Taurus: [
    'Resistance to change that is actually needed',
    'Comfort-seeking that numbs rather than restores',
    'Holding on past the point of usefulness',
  ],
  Gemini: [
    'Talking through emotions instead of feeling them',
    'Starting things without finishing what is open',
    'Mental activity that substitutes for presence',
  ],
  Cancer: [
    'Absorbing emotions that are not yours to carry',
    'Moodiness that confuses the people around you',
    'Caring for others while neglecting yourself',
  ],
  Leo: [
    'Taking inattention as personal rejection',
    'Performing when authentic expression would serve better',
    'Pride that blocks receiving the help you need',
  ],
  Virgo: [
    'Criticism that lands as judgment instead of help',
    'Perfectionism that delays what is good enough',
    'Anxiety that masquerades as productivity',
  ],
  Libra: [
    'Agreeing to things you will later resent',
    'Avoiding necessary conflict in favour of peace',
    'Losing your own position while seeing everyone else\'s',
  ],
  Scorpio: [
    'Intensity that overwhelms the people you care about',
    'Suspicion that erodes trust it is trying to protect',
    'Depth-seeking that dismisses what is simple',
  ],
  Sagittarius: [
    'Honesty that lands as bluntness',
    'Restlessness that prevents being present',
    'Optimism that skips over what needs to be felt',
  ],
  Capricorn: [
    'Work that substitutes for connection',
    'Standards that become self-punishment',
    'Responsibility that crowds out rest',
  ],
  Aquarius: [
    'Distance that reads as disinterest',
    'Ideas that override relationships',
    'Independence that becomes isolation',
  ],
  Pisces: [
    'Boundaries dissolving without you noticing',
    'Escapism that postpones what needs facing',
    'Compassion that depletes instead of connects',
  ],
};

// Single anchor for the day (one thing, not a list)
export const todayAnchor: Record<string, string> = {
  Aries: `If you feel the push to act, let yourself—but pause for one breath before speaking in frustration. That breath will not slow you down. It will land you better.`,

  Taurus: `If the world feels too fast today, you are allowed to move at your own pace. One small pleasure, fully enjoyed, will do more than rushing through several.`,

  Gemini: `If your mind is moving faster than your surroundings, that is fine. But find one conversation today that goes past small talk. That will settle something.`,

  Cancer: `If you are feeling more than usual, that is information, not a problem. But check: is this feeling yours? That question alone will restore some ground.`,

  Leo: `If you need to be seen today, create something worth seeing. That will satisfy the urge better than waiting for recognition that may not come on schedule.`,

  Virgo: `If you notice everything that is wrong today, pick one thing to actually fix. The rest can wait. Completion will do more for you than comprehensive criticism.`,

  Libra: `If you are tempted to smooth things over, ask first: is this peace for everyone, or peace to avoid discomfort? That distinction matters today.`,

  Scorpio: `If everything feels intense today, trust it—but pick your depth wisely. Not every surface needs piercing. Some things can stay light and still be real.`,

  Sagittarius: `If you feel confined today, make one plan for something to look forward to. The container is temporary. The anticipation will help.`,

  Capricorn: `If the pressure feels heavy today, remember: not everything is urgent. Pick the one thing that actually matters and let the rest be tomorrow's problem.`,

  Aquarius: `If you need distance today, take it—but stay reachable for the people who matter. You can think clearly and stay connected. They are not opposites.`,

  Pisces: `If the boundaries feel blurry today, find one small way to locate yourself. Your own body. Your own breath. The distinction between feeling for someone and feeling instead of them.`,
};

// Single reflection question (not multiple prompts)
export const todayQuestion: Record<string, string> = {
  Aries: `What am I moving toward, and what am I just moving away from?`,
  Taurus: `What am I holding because it is right, and what am I holding because letting go is uncomfortable?`,
  Gemini: `What am I thinking about to avoid feeling?`,
  Cancer: `What do I need that I have been giving to everyone else?`,
  Leo: `What would I create today if no one were watching?`,
  Virgo: `What would be good enough right now?`,
  Libra: `What do I actually want, underneath what I think I should want?`,
  Scorpio: `What would change if I trusted what I already know?`,
  Sagittarius: `What am I running toward, and what am I running from?`,
  Capricorn: `What matters more: being productive, or being present?`,
  Aquarius: `What would happen if I let someone in today?`,
  Pisces: `Which of these feelings are actually mine?`,
};

// Contrastive tomorrow preview (shows shift, not just info)
export const tomorrowContrast: Record<string, Record<string, string>> = {
  // From sign -> To sign: what shifts
  Aries: {
    Taurus: `Tomorrow slows down. The urgency you feel today will ease, replaced by a pull toward comfort and steadiness. What feels pressing now may feel less so by morning.`,
    Gemini: `Tomorrow scatters differently. The focused drive of today gives way to mental activity in multiple directions. Energy stays high but becomes more curious than direct.`,
    default: `Tomorrow the pace shifts. What feels urgent today will settle into something different.`,
  },
  Taurus: {
    Gemini: `Tomorrow speeds up. The stillness you need today will give way to mental restlessness and the desire for variety. Let yourself be slow now while you can.`,
    Aries: `Tomorrow pushes forward. The calm you feel today will shift into something more action-oriented. Rest now; motion comes soon.`,
    default: `Tomorrow the rhythm changes. What feels stable today will give way to something new.`,
  },
  Gemini: {
    Cancer: `Tomorrow goes inward. The social energy of today will turn toward home, feeling, and the need for safety. Let yourself be light now; depth comes next.`,
    Taurus: `Tomorrow grounds. The mental activity of today will slow into something more sensory and still. Talk now; the body takes over tomorrow.`,
    default: `Tomorrow the focus shifts. What is scattered today will gather differently.`,
  },
  Cancer: {
    Leo: `Tomorrow lights up. The inward focus of today will turn toward expression and visibility. Feel what you need to feel now; tomorrow wants to be seen.`,
    Gemini: `Tomorrow lifts. The emotional depth of today will give way to mental activity and social energy. Nurture yourself now; lightness returns soon.`,
    default: `Tomorrow the mood shifts. What feels tender today will feel different by morning.`,
  },
  Leo: {
    Virgo: `Tomorrow gets practical. The creative, expressive energy of today will turn toward improvement and detail. Shine now; tomorrow wants to be useful.`,
    Cancer: `Tomorrow softens. The warmth and visibility of today will turn inward toward home and feeling. Express yourself now; the heart closes in tomorrow.`,
    default: `Tomorrow the energy shifts. What wants to be seen today will settle into something quieter.`,
  },
  Virgo: {
    Libra: `Tomorrow relates. The focus on improvement and detail will shift toward balance and connection. Fix what you can now; tomorrow wants harmony.`,
    Leo: `Tomorrow warms up. The analytical energy of today will give way to something more expressive and visible. Work now; play comes next.`,
    default: `Tomorrow the attention shifts. What needs fixing today will matter less by morning.`,
  },
  Libra: {
    Scorpio: `Tomorrow deepens. The diplomatic balance of today will give way to intensity and the desire for truth. Keep the peace now; depth comes soon.`,
    Virgo: `Tomorrow gets precise. The relationship focus of today will shift toward improvement and practical matters. Connect now; details matter tomorrow.`,
    default: `Tomorrow the balance shifts. What feels harmonious today will give way to something different.`,
  },
  Scorpio: {
    Sagittarius: `Tomorrow expands. The intensity and depth of today will lift into something lighter and more adventurous. Go deep now; the horizon opens tomorrow.`,
    Libra: `Tomorrow lightens. The emotional weight of today will shift toward balance and social grace. Feel what is real now; surface connection returns soon.`,
    default: `Tomorrow the intensity shifts. What feels urgent and deep today will release into something else.`,
  },
  Sagittarius: {
    Capricorn: `Tomorrow gets serious. The expansive optimism of today will shift toward responsibility and structure. Dream now; reality takes over tomorrow.`,
    Scorpio: `Tomorrow deepens. The lightness and movement of today will turn inward toward intensity. Run free now; depth claims the next day.`,
    default: `Tomorrow the scope shifts. What feels possible today will narrow into something more specific.`,
  },
  Capricorn: {
    Aquarius: `Tomorrow detaches. The focused responsibility of today will shift toward mental freedom and unconventional thinking. Build now; ideas take over tomorrow.`,
    Sagittarius: `Tomorrow expands. The weight of responsibility today will lift into something more adventurous and optimistic. Work now; meaning comes next.`,
    default: `Tomorrow the pressure shifts. What feels heavy today will release into something different.`,
  },
  Aquarius: {
    Pisces: `Tomorrow dissolves. The mental clarity of today will give way to something more feeling and less boundaried. Think clearly now; emotion floods in tomorrow.`,
    Capricorn: `Tomorrow structures. The freedom of today will shift toward responsibility and concrete goals. Be unconventional now; reality returns soon.`,
    default: `Tomorrow the distance shifts. What feels clear today will become less distinct.`,
  },
  Pisces: {
    Aries: `Tomorrow acts. The receptive, boundary-less quality of today will shift into something direct and action-oriented. Feel now; the push comes tomorrow.`,
    Aquarius: `Tomorrow clears. The emotional porousness of today will give way to mental distance and perspective. Stay soft now; clarity returns soon.`,
    default: `Tomorrow the edges return. What feels merged today will become more distinct.`,
  },
};

// Self-blame remover (one sentence that normalizes)
export const notYourFault: Record<string, string> = {
  Aries: `If you feel more impatient than usual, that is the weather, not a character flaw.`,
  Taurus: `If change feels harder than usual, that is the weather, not resistance.`,
  Gemini: `If you cannot focus, that is the weather, not failure.`,
  Cancer: `If you are feeling everything, that is the weather, not weakness.`,
  Leo: `If you need more attention than usual, that is the weather, not vanity.`,
  Virgo: `If you are being hard on yourself, that is the weather, not the truth.`,
  Libra: `If you cannot decide, that is the weather, not indecision.`,
  Scorpio: `If things feel more intense than usual, that is the weather, not drama.`,
  Sagittarius: `If you cannot settle, that is the weather, not restlessness.`,
  Capricorn: `If you feel the pressure more than usual, that is the weather, not inadequacy.`,
  Aquarius: `If you need distance, that is the weather, not coldness.`,
  Pisces: `If your boundaries are blurring, that is the weather, not failure.`,
};

// Moon phase as felt experience (not technical)
export const moonPhaseFelt: Record<string, { name: string; feeling: string }> = {
  'New Moon': {
    name: 'New Moon',
    feeling: `The sky is dark and so is the path forward. This is not a time for clarity—it is a time for beginning anyway. Plant something without knowing exactly how it will grow.`,
  },
  'Waxing Crescent': {
    name: 'Waxing Crescent',
    feeling: `Something is building that you cannot fully see yet. Energy is slowly becoming available for what you started. Trust the direction even if the destination is unclear.`,
  },
  'First Quarter': {
    name: 'First Quarter',
    feeling: `The first resistance arrives. What you started is meeting the world and the world is pushing back. This tension is not failure—it is the natural shape of growth.`,
  },
  'Waxing Gibbous': {
    name: 'Waxing Gibbous',
    feeling: `Momentum is building and refinement is needed. What you have been working on is almost ready to show itself. Small adjustments matter more than big changes now.`,
  },
  'Full Moon': {
    name: 'Full Moon',
    feeling: `Everything is illuminated, including what you might prefer stayed hidden. This is culmination and clarity, sometimes celebration, sometimes reckoning. What has been building is now visible.`,
  },
  'Waning Gibbous': {
    name: 'Waning Gibbous',
    feeling: `The peak has passed and something wants to be shared or released. This is a time for gratitude, teaching, or giving away what you have learned. Generosity feels natural.`,
  },
  'Third Quarter': {
    name: 'Third Quarter',
    feeling: `What no longer serves is becoming clear. This is a releasing phase—old patterns, completed projects, beliefs that have run their course. Let go before the next cycle begins.`,
  },
  'Waning Crescent': {
    name: 'Waning Crescent',
    feeling: `The energy is turning inward. Rest is not optional; it is preparation. The old cycle is ending and the new one has not yet begun. Be gentle with yourself.`,
  },
};

// Get moon phase felt experience from phase name
export function getMoonPhaseFelt(phaseName: string): { name: string; feeling: string } {
  // Map common phase names to our keys
  const phaseMap: Record<string, string> = {
    'New Moon': 'New Moon',
    'Waxing Crescent': 'Waxing Crescent',
    'First Quarter': 'First Quarter',
    'Waxing Gibbous': 'Waxing Gibbous',
    'Full Moon': 'Full Moon',
    'Waning Gibbous': 'Waning Gibbous',
    'Third Quarter': 'Third Quarter',
    'Last Quarter': 'Third Quarter',
    'Waning Crescent': 'Waning Crescent',
  };

  const key = phaseMap[phaseName] || 'New Moon';
  return moonPhaseFelt[key];
}

// Get tomorrow's contrast text
export function getTomorrowContrast(todaySign: string, tomorrowSign: string): string {
  if (todaySign === tomorrowSign) {
    return `The moon stays in ${todaySign} tomorrow. What you feel today continues—no shift needed, just more of the same rhythm.`;
  }

  const signContrasts = tomorrowContrast[todaySign];
  if (signContrasts && signContrasts[tomorrowSign]) {
    return signContrasts[tomorrowSign];
  }

  return signContrasts?.default || `Tomorrow the energy shifts as the moon moves into ${tomorrowSign}. What feels true today will feel different by morning.`;
}

// ============================================
// WEEKLY CONTENT - Orientation, not description
// ============================================

// Daily card: what the day is for, and what misfires
export const dailyRole: Record<string, { purpose: string; misfire: string; takeaway: string }> = {
  Aries: {
    purpose: `A high-momentum day that wants movement and decisiveness.`,
    misfire: `This energy is best used to start, initiate, or clear inertia. It's less patient with nuance. Push too hard emotionally and conflict escalates quickly.`,
    takeaway: `Use it to act, not to resolve.`,
  },
  Taurus: {
    purpose: `A stabilising day that rewards slowness and consistency.`,
    misfire: `This is a day to maintain, not accelerate. Progress comes through care, repetition, and comfort. Forcing urgency here leads to resistance or fatigue.`,
    takeaway: `Let things take the time they need.`,
  },
  Gemini: {
    purpose: `A mentally active day that favours connection and curiosity.`,
    misfire: `Good for gathering information, conversation, and exploration. Less ideal for decisions that require emotional depth or commitment.`,
    takeaway: `Collect inputs. Decide later.`,
  },
  Cancer: {
    purpose: `An emotionally receptive day that deepens feeling and intuition.`,
    misfire: `Good for nurturing, processing, and tending to what matters. Less ideal for objectivity or pushing through discomfort. Sensitivity is heightened.`,
    takeaway: `Feel first. Analyse later.`,
  },
  Leo: {
    purpose: `An expressive day that wants visibility and creative output.`,
    misfire: `Good for creating, connecting, and being seen. Less ideal for humble tasks or situations requiring you to blend in. Recognition matters more than usual.`,
    takeaway: `Shine where it counts.`,
  },
  Virgo: {
    purpose: `A detail-oriented day that supports improvement and refinement.`,
    misfire: `Good for organising, analysing, and solving problems. Less ideal for big-picture thinking or accepting imperfection. Criticism can spike.`,
    takeaway: `Fix what matters. Leave the rest.`,
  },
  Libra: {
    purpose: `A relationship-focused day that favours harmony and balance.`,
    misfire: `Good for connecting, negotiating, and creating beauty. Less ideal for solo decisions or necessary conflict. The pull toward others is strong.`,
    takeaway: `Collaborate, but keep your center.`,
  },
  Scorpio: {
    purpose: `An intense day that favours depth and transformation.`,
    misfire: `Good for honest conversations, research, and releasing what's stuck. Less ideal for lightness or casual interaction. Everything feels weightier.`,
    takeaway: `Go deep where it matters.`,
  },
  Sagittarius: {
    purpose: `An expansive day that supports vision and adventure.`,
    misfire: `Good for planning, exploring, and finding meaning. Less ideal for routine tasks or situations requiring patience. Restlessness can build.`,
    takeaway: `Dream big. Handle details tomorrow.`,
  },
  Capricorn: {
    purpose: `A structured day that rewards discipline and responsibility.`,
    misfire: `Good for work, planning, and taking on obligations. Less ideal for spontaneity or emotional vulnerability. The pressure to achieve is strong.`,
    takeaway: `Build something that lasts.`,
  },
  Aquarius: {
    purpose: `A mentally free day that supports innovation and perspective.`,
    misfire: `Good for ideas, independence, and questioning assumptions. Less ideal for emotional intimacy or conventional expectations. Distance can creep in.`,
    takeaway: `Think differently. Stay connected.`,
  },
  Pisces: {
    purpose: `A fluid day that supports creativity and compassion.`,
    misfire: `Good for imagination, empathy, and spiritual connection. Less ideal for firm boundaries or practical decisions. Reality can blur.`,
    takeaway: `Trust your intuition. Keep your edges.`,
  },
};

// Activities by sign - one physical, one mental, one relational
export const dailyActivities: Record<string, string[]> = {
  Aries: ['Physical exercise', 'Starting new projects', 'Direct conversations'],
  Taurus: ['Cooking or gardening', 'Financial planning', 'Quality time together'],
  Gemini: ['Writing or journaling', 'Reading or learning', 'Conversations or messages'],
  Cancer: ['Comfort rituals', 'Memory work', 'Family connection'],
  Leo: ['Creative expression', 'Self-presentation', 'Generous gestures'],
  Virgo: ['Organising space', 'Problem-solving', 'Acts of service'],
  Libra: ['Aesthetic creation', 'Decision-making', 'Relationship tending'],
  Scorpio: ['Physical release', 'Research or investigation', 'Deep conversations'],
  Sagittarius: ['Outdoor movement', 'Learning something new', 'Philosophical discussion'],
  Capricorn: ['Structured work', 'Goal planning', 'Mentoring or being mentored'],
  Aquarius: ['Breaking routine', 'Innovative thinking', 'Community connection'],
  Pisces: ['Rest or meditation', 'Creative work', 'Compassionate listening'],
};

// Element energy descriptions for weekly themes
export const elementGuidance: Record<string, string> = {
  Fire: `Fire energy supports action and courage. This is momentum for starting, speaking up, and moving forward. Less patient with deliberation.`,
  Earth: `Earth energy supports building and maintaining. This is momentum for practical matters, tangible results, and steady progress. Less interested in abstraction.`,
  Air: `Air energy supports thinking and connecting. This is momentum for ideas, communication, and social exchange. Less grounded in physical reality.`,
  Water: `Water energy supports feeling and intuition. This is momentum for emotional processing, creativity, and spiritual depth. Less focused on logic.`,
};

// Moon phase arc guidance (weekly context)
export const phaseArcGuidance: Record<string, string> = {
  waxing: `The moon is waxing, building toward fullness. Energy is expanding outward. This week supports growth, action, and manifestation. Momentum is available for what you want to build.`,
  full: `The full moon illuminates the middle of the week. This is culmination energy—what you have been building becomes visible. Good for completion, clarity, and sometimes release.`,
  waning: `The moon is waning, turning attention inward. This is a week for adjusting, releasing, and preparing rather than launching something new. Momentum comes from refinement, not expansion.`,
  new: `The new moon falls this week, marking a reset. This is seeding energy—good for setting intentions and beginning quietly. Don't expect immediate visibility.`,
};

// Weekly anchor questions by dominant element
export const weeklyQuestion: Record<string, string> = {
  Fire: `What deserves momentum right now, and what needs patience?`,
  Earth: `What can I build this week, and what should I let settle?`,
  Air: `What ideas need attention, and what conversations am I avoiding?`,
  Water: `What needs to be felt this week, and what needs to wait?`,
  mixed: `What deserves momentum right now, and what needs patience?`,
};

// Generate weekly orientation paragraph
export function generateWeeklyOrientation(weekSigns: string[]): string {
  if (weekSigns.length === 0) return '';

  // Determine the week's arc based on sign sequence
  const elements = weekSigns.map(sign => {
    const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(sign);
    const earthSign = ['Taurus', 'Virgo', 'Capricorn'].includes(sign);
    const airSign = ['Gemini', 'Libra', 'Aquarius'].includes(sign);
    if (fireSign) return 'Fire';
    if (earthSign) return 'Earth';
    if (airSign) return 'Air';
    return 'Water';
  });

  const firstElement = elements[0];
  const lastElement = elements[elements.length - 1];

  // Count element dominance
  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  elements.forEach(el => elementCounts[el]++);
  const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0][0];

  // Build narrative based on shift
  const shiftDescriptions: Record<string, Record<string, string>> = {
    Fire: {
      Fire: `This week stays active throughout—energy for action is consistently available.`,
      Earth: `This week begins with urgency and action, then gradually slows into grounding and consolidation.`,
      Air: `This week begins with momentum and shifts toward mental processing and communication.`,
      Water: `This week begins with action and gradually turns inward toward feeling and reflection.`,
    },
    Earth: {
      Fire: `This week begins slowly and builds toward action and momentum.`,
      Earth: `This week stays grounded throughout—steady progress is the theme.`,
      Air: `This week begins with practicality and shifts toward ideas and connection.`,
      Water: `This week begins with stability and gradually deepens into emotional territory.`,
    },
    Air: {
      Fire: `This week begins with ideas and shifts toward action and initiative.`,
      Earth: `This week begins with mental activity and gradually grounds into practical matters.`,
      Air: `This week stays mentally active throughout—good for processing and connecting.`,
      Water: `This week begins with thinking and shifts toward feeling and intuition.`,
    },
    Water: {
      Fire: `This week begins inward and gradually builds toward action and expression.`,
      Earth: `This week begins with feeling and shifts toward grounding and practical matters.`,
      Air: `This week begins with emotion and lifts toward mental clarity and communication.`,
      Water: `This week stays emotionally attuned throughout—depth is consistently available.`,
    },
  };

  const shiftDescription = shiftDescriptions[firstElement]?.[lastElement] ||
    `This week moves through different energies—stay flexible with your pace.`;

  const paceAdvice = firstElement === lastElement
    ? `The rhythm is consistent, so you can plan accordingly.`
    : `If you try to move at one pace all week, tension is likely. Let the rhythm shift.`;

  return `${shiftDescription} ${paceAdvice}`;
}

// Generate element focus guidance for the week
export function generateElementFocus(weekSigns: string[]): string {
  const elements = weekSigns.map(sign => {
    const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(sign);
    const earthSign = ['Taurus', 'Virgo', 'Capricorn'].includes(sign);
    const airSign = ['Gemini', 'Libra', 'Aquarius'].includes(sign);
    if (fireSign) return 'Fire';
    if (earthSign) return 'Earth';
    if (airSign) return 'Air';
    return 'Water';
  });

  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  elements.forEach(el => elementCounts[el]++);

  const sorted = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0];
  const secondary = sorted[1];

  if (dominant[1] === secondary[1]) {
    // Mixed week
    return `This week balances ${dominant[0].toLowerCase()} and ${secondary[0].toLowerCase()} energy. Expect shifts between ${dominant[0] === 'Fire' || dominant[0] === 'Air' ? 'outward' : 'inward'} and ${secondary[0] === 'Fire' || secondary[0] === 'Air' ? 'outward' : 'inward'} focus.`;
  }

  const elementAdvice: Record<string, string> = {
    Fire: `Fire energy dominates this week. Action, initiative, and expression are supported. Patience may be harder to access.`,
    Earth: `Earth energy dominates this week. Practical matters, building, and tangible results are supported. Abstract thinking may feel harder.`,
    Air: `Air energy dominates this week. Ideas, communication, and mental processing are supported. Staying grounded may take effort.`,
    Water: `Water energy dominates this week. Feeling, intuition, and emotional depth are supported. Objectivity may be harder to maintain.`,
  };

  return elementAdvice[dominant[0]];
}

// Get the weekly anchor question based on dominant element
export function getWeeklyQuestion(weekSigns: string[]): string {
  const elements = weekSigns.map(sign => {
    const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(sign);
    const earthSign = ['Taurus', 'Virgo', 'Capricorn'].includes(sign);
    const airSign = ['Gemini', 'Libra', 'Aquarius'].includes(sign);
    if (fireSign) return 'Fire';
    if (earthSign) return 'Earth';
    if (airSign) return 'Air';
    return 'Water';
  });

  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  elements.forEach(el => elementCounts[el]++);

  const sorted = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];

  return weeklyQuestion[dominant] || weeklyQuestion.mixed;
}

// Get moon phase arc guidance
export function getPhaseArcGuidance(phaseName: string): string {
  if (phaseName === 'New Moon') return phaseArcGuidance.new;
  if (phaseName === 'Full Moon') return phaseArcGuidance.full;
  if (phaseName.includes('Waxing')) return phaseArcGuidance.waxing;
  return phaseArcGuidance.waning;
}
