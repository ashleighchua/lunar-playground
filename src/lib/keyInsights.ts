// Key Insights for each section of the Birth Report
// Each section gets one memorable, actionable insight

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
                  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

// Operating System Key Insights (Sun-Moon combinations)
export const operatingSystemInsights: Record<string, Record<string, string>> = {
  Aries: {
    Aries: "Your inner and outer selves speak the same language—direct action. The challenge is knowing when to pause.",
    Taurus: "You charge forward, but your heart needs time to process. Honor both the spark and the settling.",
    Gemini: "Your instinct to act meets a mind that wants to explore every angle first. Let curiosity inform your courage.",
    Cancer: "Behind your warrior exterior lives someone who deeply needs emotional safety. Both are true.",
    Leo: "You have double fire energy—use it to inspire others, not just to win personal battles.",
    Virgo: "Your bold impulses get filtered through careful analysis. Trust that your precision enhances your power.",
    Libra: "You want to charge ahead but also keep the peace. The tension between these builds your diplomatic strength.",
    Scorpio: "Your directness is fueled by deep emotional intensity. Channel this for transformation, not just conquest.",
    Sagittarius: "Action and philosophy merge in you. Your best moves come when you're fighting for meaning.",
    Capricorn: "Impulsive energy meets long-term thinking. Your ambition has both urgency and staying power.",
    Aquarius: "You pioneer for the collective, not just yourself. Your rebellious energy serves bigger causes.",
    Pisces: "Your warrior spirit is guided by intuition. Trust the softer voice—it knows where to strike.",
  },
  Taurus: {
    Aries: "Your steady nature houses an impatient heart. Learning to act from calm urgency is your edge.",
    Taurus: "You embody consistency through and through. Your challenge is staying open to necessary change.",
    Gemini: "Grounded body, restless mind. Your stability allows you to explore without losing yourself.",
    Cancer: "Double earth-and-water energy makes you the ultimate nurturer. Don't forget to receive care too.",
    Leo: "You build beautiful things but need them to be seen. Let your work shine without losing its soul.",
    Virgo: "Practicality is your superpower. Watch that perfectionism doesn't slow your natural gifts.",
    Libra: "You appreciate beauty deeply and create harmony naturally. Share this gift, don't hoard it.",
    Scorpio: "Beneath your calm surface runs very deep water. Your emotional intensity is the source of your power.",
    Sagittarius: "You want both roots and wings. You can have them—just not always at the same time.",
    Capricorn: "You're building something that will last generations. Remember to enjoy it along the way.",
    Aquarius: "Tradition meets innovation in you. You're uniquely able to bridge the old and new.",
    Pisces: "Your grounded presence is a sanctuary for others. Protect your energy with the same care.",
  },
  Gemini: {
    Aries: "Quick mind, quick to act. Your speed is a gift—just occasionally check where you're running.",
    Taurus: "Your mind races but your heart needs stability. Give yourself both stimulation and sanctuary.",
    Gemini: "You're mentally agile in every direction. Focus isn't your problem—choosing is.",
    Cancer: "You think fast but feel deep. Your emotional intelligence makes your communication profound.",
    Leo: "Your ideas demand an audience. Share generously, and let others contribute to your vision.",
    Virgo: "Double Mercury gives you exceptional analytical gifts. Use them to help, not just to critique.",
    Libra: "You see all sides naturally. Your balanced perspective is needed—share your view more often.",
    Scorpio: "Curious mind, probing heart. You can go deeper than most—don't stay on the surface.",
    Sagittarius: "You gather information; you seek meaning. Together, they make you a natural teacher.",
    Capricorn: "Ideas need structure to become real. You have both—build something with your thoughts.",
    Aquarius: "You're wired for innovation. Your unconventional thinking isn't a bug, it's your purpose.",
    Pisces: "Logical and intuitive, analytical and imaginative. Let both halves of your brain lead.",
  },
  Cancer: {
    Aries: "Soft interior, fierce protector. Your vulnerability is what makes your courage meaningful.",
    Taurus: "You create safety through both emotion and material security. Both forms of care matter.",
    Gemini: "Deep feelings, active mind. Talking about emotions isn't the same as processing them.",
    Cancer: "You feel everything twice as intensely. Your emotional depth is a gift and a responsibility.",
    Leo: "You nurture others into their best selves. Don't forget you deserve the same spotlight.",
    Virgo: "You care through doing. Remember that your presence alone is also a gift.",
    Libra: "Harmony and home are your twin anchors. Create beauty in your inner life too.",
    Scorpio: "Your emotional intensity runs deep as the ocean. Trust your feelings—they know things.",
    Sagittarius: "Homebody heart, wandering soul. You can carry home with you wherever you explore.",
    Capricorn: "You protect through providing. Let yourself also protect through presence and softness.",
    Aquarius: "You care deeply but need emotional space. Both closeness and freedom are valid needs.",
    Pisces: "You're a double water sign—emotionally attuned to everything. Strong boundaries are self-care.",
  },
  Leo: {
    Aries: "You're built to lead and to inspire action. Make sure your cause is worthy of your fire.",
    Taurus: "You shine brightest when creating something lasting. Your legacy matters—choose it wisely.",
    Gemini: "Your light attracts many conversations. Use your platform to elevate others' voices too.",
    Cancer: "You lead with heart. Your warmth draws people in—keep that tender center protected.",
    Leo: "You're here to radiate. The challenge is remembering that others need light too.",
    Virgo: "Your desire to shine meets a need for perfection. You're impressive when you stop performing.",
    Libra: "You light up every room and leave it more beautiful. Give from overflow, not obligation.",
    Scorpio: "Your presence is magnetic and intense. Use your influence for transformation, not just attention.",
    Sagittarius: "You're meant to inspire big visions. Share your optimism—the world needs your fire.",
    Capricorn: "You want recognition for real achievements. Build something worthy, then own your success.",
    Aquarius: "You shine for the collective. Your individual brilliance serves something larger than yourself.",
    Pisces: "Your creativity has no bounds. Ground your visions enough to share them with others.",
  },
  Virgo: {
    Aries: "Your precision meets impulsive energy. Quick action informed by careful thought is your sweet spot.",
    Taurus: "You're built for practical mastery. Your standards are high because you know what's possible.",
    Gemini: "Your analytical mind is exceptional. Direct it toward solutions, not just problems.",
    Cancer: "You show love through service. Remember that your care is enough, even when imperfect.",
    Leo: "You perfect your craft but hesitate to show it. Your work deserves to be seen.",
    Virgo: "You notice everything that could be better. Notice also what's already working.",
    Libra: "You seek perfection in balance and beauty. Good enough is sometimes actually perfect.",
    Scorpio: "You analyze deeply and see through illusions. Use your discernment to heal, not just diagnose.",
    Sagittarius: "Details and big picture both matter to you. You can hold both—that's your gift.",
    Capricorn: "You're built for excellence and achievement. Don't mistake productivity for worth.",
    Aquarius: "You improve systems and question conventions. Your practical idealism changes things.",
    Pisces: "Your opposite sign lives in you too—precision and flow, analysis and intuition. Honor both.",
  },
  Libra: {
    Aries: "You seek harmony but carry a warrior heart. Sometimes peace requires taking a stand.",
    Taurus: "Beauty and comfort are your languages. Share your aesthetic gifts without hesitation.",
    Gemini: "You weigh all perspectives with intellectual grace. Eventually, though, you must choose.",
    Cancer: "Harmony in relationships is your foundation. Make sure you include yourself in that care.",
    Leo: "You bring beauty and light wherever you go. Let your presence be enough.",
    Virgo: "You perfect your way to balance. Sometimes the scale needs to tip to find center.",
    Libra: "You're designed for partnership and balance. Don't lose yourself in seeking harmony.",
    Scorpio: "Beneath your diplomatic surface runs intense feeling. Let some of that depth show.",
    Sagittarius: "You believe in justice and truth. Share your philosophy without needing everyone to agree.",
    Capricorn: "You build harmonious structures. Your relationships and your work both need this skill.",
    Aquarius: "You balance personal relationships and collective ideals. Both spheres need your fairness.",
    Pisces: "You bring grace to everything you touch. Ground your idealism in sustainable practices.",
  },
  Scorpio: {
    Aries: "You transform through direct action. Your courage to face darkness makes you a powerful healer.",
    Taurus: "Your intensity needs physical grounding. Your body is a resource for your emotional work.",
    Gemini: "You probe deep but communicate on the surface. Let your true depth into your conversations.",
    Cancer: "You feel with incredible intensity. This depth is your gift—don't numb it away.",
    Leo: "Your presence is undeniably powerful. Use your magnetism for transformation, not just attention.",
    Virgo: "You analyze the shadows with precision. Your discernment helps others heal their blind spots.",
    Libra: "You seek balance but know life includes darkness. Your honesty about this helps others too.",
    Scorpio: "You're designed for depth and transformation. The intensity that scares others is your home.",
    Sagittarius: "You seek truth at the depths and the heights. Your philosophy has earned its darkness.",
    Capricorn: "Your ambition is powered by emotional intensity. Build your empire with soul, not just strategy.",
    Aquarius: "You transform systems and revolutionize the collective. Your intensity serves the bigger picture.",
    Pisces: "You're fluent in the language of the unconscious. Trust your intuition—it's reading the depths.",
  },
  Sagittarius: {
    Aries: "You're pure fire, seeking truth through action. Temper your rush with occasional reflection.",
    Taurus: "Your quest for meaning needs material grounding. Philosophy becomes real through practice.",
    Gemini: "You gather facts to build meaning. Your opposite sign keeps your theories honest.",
    Cancer: "Your wandering spirit needs a home base. Emotional security fuels your adventures.",
    Leo: "You're born to inspire and lead toward meaning. Share your vision generously.",
    Virgo: "Big visions meet practical minds. Your idealism works when grounded in reality.",
    Libra: "You seek truth and fairness in equal measure. Share your philosophy with grace.",
    Scorpio: "Your optimism has looked into the dark and still believes. This is authentic hope.",
    Sagittarius: "You're designed for expansion and meaning-making. Don't let wandering become avoidance.",
    Capricorn: "Your visions deserve structure. Build systems that can carry your philosophy forward.",
    Aquarius: "You're a natural philosopher of progress. Your idealism serves the collective future.",
    Pisces: "You seek both knowledge and transcendence. Let your spirituality inform your philosophy.",
  },
  Capricorn: {
    Aries: "Your ambition has urgency. Use that fire to start things, then let patience finish them.",
    Taurus: "You're built for lasting achievement. Trust the slow build—it compounds over time.",
    Gemini: "Your strategic mind gathers information efficiently. Put your intelligence toward your long game.",
    Cancer: "Behind your ambitious exterior is someone who cares deeply. Let people see that too.",
    Leo: "You build to be recognized. Make sure your achievements reflect what actually matters to you.",
    Virgo: "Your standards for yourself are exceptional. Apply the same care to your self-compassion.",
    Libra: "You create harmonious structures. Your relationships benefit from your building skills too.",
    Scorpio: "Your ambition is powered by deep intensity. The combination makes you formidable.",
    Sagittarius: "You climb toward meaning. Your achievements need purpose to feel satisfying.",
    Capricorn: "You're designed for mastery and legacy. Remember that the journey is part of the achievement.",
    Aquarius: "You build for the future and the collective. Traditional methods can serve innovative goals.",
    Pisces: "Your practical side serves your dreamier nature. Let intuition guide what you build.",
  },
  Aquarius: {
    Aries: "You're a revolutionary in action. Your independence serves the collective, not just yourself.",
    Taurus: "You innovate from a stable base. Your unconventional ideas work because they're grounded.",
    Gemini: "Your mind moves faster than most can follow. Slow down enough to bring others along.",
    Cancer: "You care deeply about humanity but need emotional distance. Both are valid needs.",
    Leo: "Your brilliance deserves attention. Use your platform for the bigger causes you serve.",
    Virgo: "You improve systems with analytical precision. Your practical idealism creates real change.",
    Libra: "You seek fairness on a global scale. Start with the relationships right in front of you.",
    Scorpio: "Your vision for transformation is intense and far-reaching. Trust its depth.",
    Sagittarius: "You philosophize about the future. Your optimism for humanity is needed.",
    Capricorn: "You build innovative structures. Traditional forms can house revolutionary content.",
    Aquarius: "You're designed to think differently. Your uniqueness is a contribution, not a flaw.",
    Pisces: "You envision collective healing. Ground your visions enough to make them happen.",
  },
  Pisces: {
    Aries: "Your dreams have fire behind them. Let your intuition guide your courageous action.",
    Taurus: "Your imagination needs earthly expression. Create tangible beauty from your visions.",
    Gemini: "You're fluid and adaptable in thought. Trust your intuition as much as your analysis.",
    Cancer: "You're emotionally attuned to everything. Strong boundaries are an act of self-love.",
    Leo: "Your creativity knows no bounds. Share your unique vision—the world needs your art.",
    Virgo: "Your opposite sign grounds your dreams. Practical steps make your visions real.",
    Libra: "You bring grace and beauty to everything. Your aesthetic sensitivity is a gift.",
    Scorpio: "You feel the full depth of existence. Your emotional courage helps others face their depths.",
    Sagittarius: "You seek transcendence and meaning. Your spirituality is your philosophy.",
    Capricorn: "Your dreams deserve structure. Build the containers that can hold your vision.",
    Aquarius: "You dream of collective healing. Your compassion serves something larger than yourself.",
    Pisces: "You're designed to flow, intuit, and transcend. Ground yourself enough to be of service.",
  },
};

// Core Drives Key Insights (based on Mercury placement)
export const coreDrivesInsights: Record<ZodiacSign, string> = {
  Aries: "You think at the speed of action. Your best ideas come when you're already moving.",
  Taurus: "You think methodically and thoroughly. Your slowness to decide is actually wisdom.",
  Gemini: "Your mind is your superpower. Feed it with variety, but give it time to synthesize.",
  Cancer: "Your thinking is guided by feeling. Trust the logic of your emotional intelligence.",
  Leo: "You think in terms of story and impact. Your ideas want to be shared.",
  Virgo: "Your analytical mind catches what others miss. Use it to solve, not just to critique.",
  Libra: "You naturally see all sides. This is a gift—don't let it become paralysis.",
  Scorpio: "You think deeply and see through surfaces. Your perception is a tool for truth.",
  Sagittarius: "Your mind ranges wide, seeking meaning. Connect the dots others can't see.",
  Capricorn: "You think strategically about the long game. Your planning is an asset.",
  Aquarius: "You think differently by design. Your unconventional ideas are contributions.",
  Pisces: "Your intuition informs your thinking. Trust the knowing that comes before logic.",
};

// Emotional Pattern Key Insights (based on Moon placement)
export const emotionalPatternInsights: Record<ZodiacSign, string> = {
  Aries: "You process emotions through action. Movement helps you feel; stillness can be uncomfortable.",
  Taurus: "You need time to process feelings. Your slow emotional rhythm is wisdom, not avoidance.",
  Gemini: "You think about feelings rather than feel them directly. Both paths to understanding are valid.",
  Cancer: "You feel everything deeply. Your emotional sensitivity is your greatest strength when honored.",
  Leo: "Your emotions want expression and witness. Sharing how you feel isn't weakness—it's courage.",
  Virgo: "You analyze your emotions carefully. Sometimes feelings just need to be felt, not fixed.",
  Libra: "You seek emotional equilibrium. Remember that all feelings, including difficult ones, are welcome.",
  Scorpio: "You feel with extraordinary intensity. This depth is a gift—don't try to make yourself smaller.",
  Sagittarius: "You process emotions through meaning-making. Finding the lesson helps you move forward.",
  Capricorn: "You may delay emotions for productivity. Schedule time for the feelings you're postponing.",
  Aquarius: "You observe your emotions from a distance. This perspective helps, but don't forget to feel.",
  Pisces: "You absorb emotions from everywhere. Regular boundaries aren't walls—they're survival.",
};

// Relationship Blueprint Key Insights (based on Venus/Moon)
export const relationshipInsights: Record<ZodiacSign, string> = {
  Aries: "You love through action and initiative. Remember that presence is also a form of love.",
  Taurus: "You show love through consistency and care. Your loyalty is a gift—give it where it's valued.",
  Gemini: "You connect through conversation and curiosity. Deep listening is as important as smart talking.",
  Cancer: "You love through nurturing and protection. Let yourself receive the same care you give.",
  Leo: "You love generously and want love returned visibly. Ask for what you need; hints aren't enough.",
  Virgo: "You show love through service and improvement. Sometimes love just wants to be accepted.",
  Libra: "You create harmony in relationships naturally. Make sure you're not erasing yourself to do it.",
  Scorpio: "You love with total intensity or not at all. This depth is a gift; choose worthy recipients.",
  Sagittarius: "You need freedom in love. The right relationship gives you roots and wings.",
  Capricorn: "You show love through commitment and building. Let yourself also receive without earning it.",
  Aquarius: "You love with a need for independence. The right person will appreciate your uniqueness.",
  Pisces: "You love unconditionally and merge with partners. Strong boundaries protect your gift.",
};

// Work & Impact Key Insights (based on Sun)
export const workInsights: Record<ZodiacSign, string> = {
  Aries: "You're built to start things and lead the charge. Make sure you have finishers on your team.",
  Taurus: "You build things that last through patient persistence. Trust your timeline.",
  Gemini: "You're meant to communicate, connect, and share ideas. Variety isn't distraction—it's fuel.",
  Cancer: "You create safe spaces for others to thrive. Your care is leadership.",
  Leo: "You're here to shine and inspire. Your visibility serves others—don't dim yourself.",
  Virgo: "You improve everything you touch. Apply your standards with compassion, especially to yourself.",
  Libra: "You create harmony and beauty wherever you work. This is impact, not just aesthetics.",
  Scorpio: "You transform whatever you touch. Your intensity is a gift to environments that can hold it.",
  Sagittarius: "You're here to expand horizons and share wisdom. Teaching in any form is your purpose.",
  Capricorn: "You build structures that outlast you. This long game is your contribution.",
  Aquarius: "You're here to innovate and improve systems. Your different thinking is needed.",
  Pisces: "You bring creativity and compassion to your work. These soft skills create hard results.",
};

// Shadow & Growth Key Insights (based on Sun)
export const shadowInsights: Record<ZodiacSign, string> = {
  Aries: "Your shadow emerges as aggression or impatience. The trigger is usually feeling held back or dismissed.",
  Taurus: "Your shadow shows up as stubbornness or materialism. The trigger is usually feeling insecure.",
  Gemini: "Your shadow appears as scattered energy or superficiality. The trigger is usually boredom or anxiety.",
  Cancer: "Your shadow emerges as moodiness or manipulation. The trigger is usually feeling unsafe or unneeded.",
  Leo: "Your shadow shows up as arrogance or attention-seeking. The trigger is usually feeling unseen.",
  Virgo: "Your shadow appears as criticism or perfectionism. The trigger is usually anxiety about not being enough.",
  Libra: "Your shadow emerges as people-pleasing or indecision. The trigger is usually fear of conflict or rejection.",
  Scorpio: "Your shadow shows up as control or vengefulness. The trigger is usually feeling betrayed or powerless.",
  Sagittarius: "Your shadow appears as recklessness or preachiness. The trigger is usually feeling constrained.",
  Capricorn: "Your shadow emerges as coldness or workaholism. The trigger is usually fear of failure or inadequacy.",
  Aquarius: "Your shadow shows up as detachment or contrarianism. The trigger is usually feeling misunderstood.",
  Pisces: "Your shadow appears as escapism or victimhood. The trigger is usually feeling overwhelmed by reality.",
};

// Practical Takeaways Key Insight (synthesized)
export function getTakeawaysInsight(sunSign: string, moonSign: string | null): string {
  const sun = sunSign as ZodiacSign;

  if (!moonSign) {
    return `Your core work is living authentically as a ${sunSign}. Lean into your natural strengths while staying aware of your growth edges.`;
  }

  const moon = moonSign as ZodiacSign;

  // Generate based on element compatibility
  const sunElement = getElement(sun);
  const moonElement = getElement(moon);

  if (sunElement === moonElement) {
    return `Your Sun and Moon speak the same elemental language. This inner harmony is your foundation—use it to anchor you when life gets complex.`;
  }

  const compatible: Record<string, string[]> = {
    Fire: ['Fire', 'Air'],
    Earth: ['Earth', 'Water'],
    Air: ['Air', 'Fire'],
    Water: ['Water', 'Earth'],
  };

  if (compatible[sunElement]?.includes(moonElement)) {
    return `Your inner and outer selves support each other naturally. When you're aligned, you move through the world with ease—notice what that alignment feels like.`;
  }

  return `Your inner world and outer expression create productive tension. This isn't a problem to solve—it's a range to inhabit. You contain more than most.`;
}

function getElement(sign: ZodiacSign): string {
  const elements: Record<ZodiacSign, string> = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
  };
  return elements[sign];
}
