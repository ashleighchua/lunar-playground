/**
 * Astronomical calculations for birth chart
 * Uses simplified algorithms for moon and rising sign calculation
 */

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed' },
  { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable' },
  { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal' },
  { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable' },
  { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed' },
  { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable' },
];

// Context-specific descriptions for each sign placement
const sunSignDescriptions: Record<string, string> = {
  Aries: "Your core identity is forged in fire. You're here to initiate, to lead, to be first. There's a pioneering spirit in you that refuses to wait for permission. You learn by doing, sometimes leaping before you look, but that courage is exactly what allows you to begin things others only dream about. Your life force is strong, direct, and unapologetically bold.",
  Taurus: "Your essence is rooted in the physical world: beauty, comfort, stability, and the slow cultivation of what matters. You're here to build things that last, to show others that patience is its own kind of power. Reliability isn't boring to you; it's a form of love. You understand that the best things take time.",
  Gemini: "Your spirit is curious, restless, endlessly hungry for new information and connections. You're here to learn, communicate, and weave ideas together in ways others can't see. Versatility is your gift. You contain multitudes and see no reason to be just one thing. Life is a conversation, and you want to have all of it.",
  Cancer: "Your identity is tied to nurturing, protecting, and creating emotional safety, for yourself and those you love. You feel the undercurrents that others miss. Home isn't just a place for you; it's a feeling you carry and create. Your sensitivity is your strength, allowing you to care deeply in a world that often forgets how.",
  Leo: "You're here to shine, create, and inspire. There's a natural radiance to your presence that draws others in. Generosity flows from you easily, and you want everyone to feel as alive as you do. Your need for recognition isn't vanity; it's the honest desire to be seen for who you truly are. When you lead with your heart, you light up rooms.",
  Virgo: "Your purpose is refinement: taking what exists and making it better, clearer, more useful. You notice what others overlook and find satisfaction in solving problems others didn't know they had. Service isn't beneath you; it's how you express love. Your analytical mind is a gift, though learning to quiet your inner critic is part of your journey.",
  Libra: "You're here to create harmony, beauty, and balance. Relationships are your laboratory. You understand yourself through others and genuinely need partnership to feel complete. Fairness matters deeply to you, sometimes to the point of indecision. Your gift is seeing all sides, even when it makes choosing harder.",
  Scorpio: "Your identity runs deep. You're here to transform: yourself, situations, sometimes the people around you. Surface-level existence doesn't interest you; you want truth, even when it's uncomfortable. There's an intensity to your presence that some find magnetic and others find unsettling. You're not afraid of the dark, because you know that's where the real treasure is buried.",
  Sagittarius: "Your spirit is expansive, optimistic, and perpetually aimed at the horizon. You're here to explore: places, ideas, philosophies, possibilities. Freedom isn't a luxury for you; it's oxygen. You teach others that life is an adventure meant to be embraced, that meaning is found in the journey itself.",
  Capricorn: "You're here to build, achieve, and leave something lasting behind. There's an old soul quality to you, a quiet determination that plays the long game. You understand that real success requires discipline, patience, and sometimes doing the unglamorous work. Your ambition isn't about ego. It's about proving what's possible through sustained effort.",
  Aquarius: "Your identity is tied to the collective, to progress, to what could be rather than what is. You're here to innovate and challenge the status quo. Independence matters fiercely to you, and you need space to think your own thoughts and be your own person. You care deeply about humanity, sometimes more easily than individuals.",
  Pisces: "Your essence is boundless, empathic, and connected to something larger than the material world. You're here to dream, to heal, to remind others of the magic that exists beneath everyday life. Boundaries can be challenging because you feel everything so deeply. Your imagination is a doorway, and your compassion is medicine.",
};

const moonSignDescriptions: Record<string, string> = {
  Aries: "Emotionally, you need action. Sitting with feelings isn't your style. You'd rather do something about them. Your emotional responses are quick, honest, and sometimes impulsive. You process through movement and confrontation rather than reflection. When you're upset, everyone knows it. When you're over it, you're genuinely over it. You need independence even in your closest relationships.",
  Taurus: "Your emotional world craves stability, comfort, and sensory pleasure. You process feelings slowly and need time to adjust to change. Once you've committed emotionally, you're deeply loyal, sometimes to a fault. Physical comfort soothes you: good food, soft textures, beautiful surroundings. Your emotional nature is patient, but push too hard and your stubborn side emerges with force.",
  Gemini: "You process emotions through talking, thinking, and analyzing. Feelings that can't be articulated make you restless. You need mental stimulation even in emotional matters, and boredom is harder for you than sadness. Your moods can shift quickly, and you might intellectualize feelings rather than fully experiencing them. Communication is how you connect and feel safe.",
  Cancer: "Your emotional depths are vast. You feel everything, your own pain and others', with remarkable intensity. Home and family aren't abstract concepts; they're emotional necessities. You remember how things felt long after others have moved on. Nurturing comes naturally, but you must learn to let others care for you too. Your intuition is uncanny; trust it.",
  Leo: "You need to be seen and appreciated emotionally. Recognition isn't vanity. It's how you know you matter. Your feelings are dramatic and generous; when you love, you love completely. Pride can make it hard to admit hurt, but beneath that confident exterior is someone who deeply needs warmth and validation. You bring sunshine to emotional connections.",
  Virgo: "You process emotions through analysis and often express care through practical help. Feelings can feel messy and unpredictable, so you try to make sense of them. You're harder on yourself emotionally than anyone else could be. Learning to accept imperfection, in yourself and others, is part of your growth. Your love language is often acts of service.",
  Libra: "Emotional harmony is essential to your wellbeing. Conflict genuinely distresses you, and you'll go far to maintain peace, sometimes too far. You need partnership to feel emotionally balanced and may struggle with decisions when alone. Your feelings are refined, romantic, and deeply tied to your relationships. Beauty and aesthetics affect your mood more than most realize.",
  Scorpio: "Your emotional world runs deeper than most people will ever know. You feel everything intensely: love, loss, loyalty, betrayal, and you don't do surface-level connections. Trust is earned slowly, but once given, your devotion is absolute. You need emotional honesty and can sense deception instantly. Transformation is your emotional superpower; you're endlessly capable of rising from the ashes.",
  Sagittarius: "Emotionally, you need freedom and space to explore. Heavy feelings can make you restless; your instinct is to seek meaning or escape rather than dwell. Optimism is your emotional default, which serves you well but can sometimes mean avoiding necessary processing. You need a partner who gives you room to roam while still being your home base.",
  Capricorn: "Your emotional nature is reserved, controlled, and deeply private. Feelings are processed internally, often slowly, and you're uncomfortable with emotional displays, your own or others'. Beneath that composed exterior is someone who feels profoundly but learned early that vulnerability wasn't safe. Achievement is tied to your emotional security. With time, you learn to let trusted people in.",
  Aquarius: "You experience emotions from a slight distance, observing them as much as feeling them. Intense emotional demands can feel overwhelming, and you need space to process in your own way. You care deeply about humanity and causes, though individual emotional intimacy requires more effort. Your emotional nature is unconventional; you love in your own unique way.",
  Pisces: "Your emotional world has no boundaries. You absorb feelings like a sponge, often unsure which emotions are yours and which belong to others. This makes you incredibly compassionate but also easily overwhelmed. You need solitude to discharge emotional energy. Dreams, music, art, and spirituality are essential outlets. Your capacity for unconditional love is rare and profound.",
};

const risingSignDescriptions: Record<string, string> = {
  Aries: "You enter rooms with energy. People see you as confident, direct, maybe even intimidating before they know you. First impressions suggest someone who knows what they want and isn't afraid to go after it. You appear more competitive and assertive than you might actually feel inside. Your presence says: 'I'm here, and I'm ready.'",
  Taurus: "You come across as calm, grounded, and perhaps a bit reserved until people get to know you. There's something steady and reassuring about your presence. People might assume you're more traditional or stubborn than you are. You appear reliable and unhurried, someone who can't be rushed. Beauty and quality in your appearance matter to you.",
  Gemini: "You appear curious, chatty, and mentally quick. People see you as versatile and interesting, someone who can talk about anything. First impressions might suggest you're more scattered or superficial than you actually are. Your presence is youthful and adaptable. You seem approachable, witty, and always ready with a question or observation.",
  Cancer: "You come across as nurturing, approachable, and perhaps a bit guarded initially. There's a softness to your presence that makes people want to open up to you. You might appear more traditional or family-oriented than you are inside. Your face is expressive; your emotions show whether you want them to or not. People sense your depth.",
  Leo: "You radiate warmth and presence. People notice you when you enter a room. There's something magnetic about your energy. You appear confident, generous, and perhaps more dramatic than you feel inside. First impressions suggest someone creative and proud. Your appearance matters to you; you understand the power of presentation.",
  Virgo: "You come across as put-together, observant, and perhaps a bit reserved. People see you as competent and detail-oriented, someone who has their life in order. You might appear more critical or perfectionist than you actually are. Your presence is modest but precise. People sense they can rely on you to notice what others miss.",
  Libra: "You appear graceful, charming, and socially skilled. People see you as pleasant and easy to be around. You know how to make others comfortable. Your sense of style and aesthetics shows in how you present yourself. First impressions suggest someone diplomatic and relationship-oriented. You might seem more indecisive than you are.",
  Scorpio: "Your presence is intense. People notice something penetrating about your gaze or demeanor. You appear mysterious, private, and perhaps more intimidating than you intend. First impressions suggest depth and complexity; people sense there's much more beneath the surface. You don't reveal yourself easily, and that creates intrigue.",
  Sagittarius: "You enter rooms with warmth and infectious enthusiasm that puts people at ease. You appear open, honest, and perhaps a bit restless, always looking toward the next horizon. People see you as adventurous and philosophical, someone who asks big questions. Your presence suggests possibility and optimism. You might seem more carefree than you actually are.",
  Capricorn: "You come across as mature, composed, and perhaps reserved or serious initially. People see you as competent and ambitious, someone who has clear goals. First impressions suggest reliability and authority beyond your years. You might appear more traditional or stern than you feel inside. Your presence commands quiet respect.",
  Aquarius: "You appear unique, independent, and slightly detached, like you're observing the world from your own perspective. People see you as unconventional and intellectual, someone who thinks differently. First impressions suggest friendliness but also a certain distance. You seem like someone who doesn't follow crowds.",
  Pisces: "You come across as gentle, dreamy, and perhaps a bit elusive. There's something otherworldly about your presence that people find hard to pin down. First impressions suggest creativity and sensitivity. You might appear more passive or uncertain than you actually are. People sense your compassion and imagination immediately.",
};

// Generic fallback descriptions
const signDescriptions: Record<string, string> = {
  Aries: 'Bold, direct, and unafraid to begin. The initiator who forges new paths.',
  Taurus: 'Steady, sensual, and deeply rooted. The builder who values stability.',
  Gemini: 'Curious, adaptable, and quick-minded. The communicator who connects ideas.',
  Cancer: 'Protective, intuitive, and emotionally deep. The nurturer who creates home.',
  Leo: 'Generous, creative, and naturally radiant. The performer who inspires.',
  Virgo: 'Precise, helpful, and quietly devoted. The analyst who refines.',
  Libra: 'Graceful, fair-minded, and relationship-oriented. The harmonizer who balances.',
  Scorpio: 'Intense, perceptive, and unafraid of depth. The transformer who sees truth.',
  Sagittarius: 'Optimistic, philosophical, and freedom-seeking. The explorer who expands.',
  Capricorn: 'Ambitious, disciplined, and quietly determined. The achiever who builds.',
  Aquarius: 'Independent, innovative, and humanitarian. The visionary who revolutionizes.',
  Pisces: 'Empathic, imaginative, and spiritually attuned. The dreamer who transcends.',
};

// Mercury descriptions - how you think and communicate
const mercurySignDescriptions: Record<string, string> = {
  Aries: "Your mind moves fast and wants to get to the point. You think in straight lines, speak directly, and have little patience for drawn-out explanations. You're quick to form opinions and quick to voice them. Your communication style is bold and sometimes blunt. You'd rather be honest than diplomatic.",
  Taurus: "Your thinking is deliberate, practical, and grounded. You take time to process information thoroughly before forming conclusions. Once you've decided something, you're not easily swayed. Your communication style is steady and reliable. You say what you mean and mean what you say.",
  Gemini: "Your mind is endlessly curious and remarkably versatile. You can hold multiple perspectives simultaneously and shift between ideas with ease. Information energises you. Your communication is quick, witty, and wide-ranging. You can talk to anyone about almost anything.",
  Cancer: "Your thinking is intuitive and emotionally influenced. You remember how things felt as much as what happened. Your mind holds onto the past and processes through personal connection. Communication tends to be indirect. You sense what others need to hear.",
  Leo: "Your thinking is creative, confident, and presentation-aware. You like ideas that are bold and worth sharing. Your communication has flair. You tell stories, not just facts. You think about how things sound and how they'll land.",
  Virgo: "Your mind is analytical, detail-oriented, and constantly refining. You notice what others miss and can break complex problems into solvable parts. Communication is precise. You choose words carefully and may edit yourself frequently.",
  Libra: "Your thinking naturally weighs multiple perspectives. You see all sides of an argument, which aids diplomacy but can slow decision-making. Communication is tactful and considerate. You think about how your words affect others.",
  Scorpio: "Your mind goes deep rather than wide. You're drawn to hidden meanings, unspoken dynamics, and what's really going on. Your thinking is probing and strategic. Communication is purposeful. You share selectively.",
  Sagittarius: "Your thinking is expansive, seeking the big picture and larger meaning. Details bore you; principles interest you. You learn by exploring ideas from many sources. Communication is enthusiastic, honest, and sometimes tactless.",
  Capricorn: "Your mind is practical, strategic, and focused on real-world application. You think about what works and what can be built. Communication is measured and authoritative. You speak when you have something worth saying.",
  Aquarius: "Your thinking is independent, innovative, and often unconventional. You see patterns others miss and enjoy ideas that challenge norms. Communication is intellectual and sometimes detached. You prefer logic to emotional appeals.",
  Pisces: "Your thinking is intuitive, imaginative, and non-linear. You absorb information through impression as much as analysis. Your mind wanders productively through associations. Communication flows poetically. You speak in images and feelings.",
};

// Venus descriptions - how you love and what you value
const venusSignDescriptions: Record<string, string> = {
  Aries: "You fall fast and pursue directly. In love, you want excitement, passion, and a sense of conquest. You're attracted to confidence and independence. You value authenticity over politeness. When you want something, you go after it, in love and in life.",
  Taurus: "You love steadily, sensually, and with remarkable patience. Physical affection and quality time matter deeply. You're attracted to reliability and good taste. You value comfort, beauty, and things that last. Loyalty is everything.",
  Gemini: "You need mental connection to feel romantic attraction. Boredom kills love faster than conflict. You're attracted to wit, versatility, and good conversation. You value freedom within partnership. Love should be fun and interesting.",
  Cancer: "You love protectively and need to feel emotionally safe before opening up. Nurturing is your love language. You're attracted to those who feel like home. You value emotional availability and commitment. Family matters deeply.",
  Leo: "You love generously, dramatically, and with your whole heart. Romance should feel special and celebratory. You're attracted to confidence and creativity. You value being appreciated and adored. Love should feel like a grand adventure.",
  Virgo: "You show love through acts of service and attention to detail. Romance is practical as much as emotional. You're attracted to competence and self-improvement. You value effort and devotion. Love is demonstrated through actions, not words.",
  Libra: "You're built for partnership and feel incomplete without it. Harmony, beauty, and fairness in relationships matter deeply. You're attracted to grace, charm, and aesthetic sensibility. You value balance and mutual consideration.",
  Scorpio: "You love with intensity, depth, and fierce loyalty. Surface-level connection doesn't interest you. You want all or nothing. You're attracted to mystery and emotional courage. You value honesty and transformative intimacy. Trust is sacred.",
  Sagittarius: "You need freedom within love and find it in shared adventures and growth. You're attracted to optimism, intelligence, and enthusiasm. You value honesty over tact. Love should expand your world, not shrink it.",
  Capricorn: "You take love seriously and build it like you build everything else, with patience and long-term vision. You're attracted to ambition, competence, and maturity. You value commitment and reliability. Love is demonstrated through loyalty and effort.",
  Aquarius: "You need intellectual connection and space for individuality within partnership. You're attracted to uniqueness, intelligence, and independence. You value friendship as the foundation of romance. Love should honour who you each are.",
  Pisces: "You love unconditionally, idealistically, and with boundless compassion. You're attracted to sensitivity, creativity, and depth. You value emotional connection and transcendent moments. Love is a spiritual experience for you.",
};

// Mars descriptions - how you assert, pursue goals, and handle conflict
const marsSignDescriptions: Record<string, string> = {
  Aries: "Your drive is direct, competitive, and immediate. You go after what you want without hesitation and prefer action to planning. Conflict doesn't scare you. You face it head-on and move past it quickly. You work in bursts of intense energy.",
  Taurus: "Your drive is steady, patient, and remarkably persistent. You don't rush. You build momentum gradually and keep going long after others have stopped. Conflict is something you'd rather avoid, but when pushed too far, your anger is formidable.",
  Gemini: "Your drive is versatile and mentally oriented. You pursue goals through strategy, communication, and keeping options open. Conflict is handled verbally. You argue with words and wit. You work on multiple things simultaneously.",
  Cancer: "Your drive is emotionally fueled and protective. You're motivated by security and care for loved ones. Conflict makes you defensive and indirect. You retreat before you attack. You work hardest when emotionally invested.",
  Leo: "Your drive is creative, proud, and visibility-seeking. You want your efforts to be seen and appreciated. Conflict engages your pride. You need to win, but ideally with grace. You work best when inspired and recognised.",
  Virgo: "Your drive is detailed, efficient, and improvement-focused. You pursue goals through careful planning and systematic effort. Conflict makes you critical and anxious. You work methodically and can maintain effort indefinitely.",
  Libra: "Your drive is partnership-oriented and harmony-seeking. You pursue goals through collaboration and diplomacy. Conflict disturbs you. You'll avoid it if possible and seek fair resolution when you can't. You work best with others.",
  Scorpio: "Your drive is intense, strategic, and relentless when activated. You pursue goals with laser focus and don't back down. Conflict brings out your most formidable side, and you can hold grudges. You work with sustained intensity.",
  Sagittarius: "Your drive is enthusiastic, freedom-seeking, and meaning-oriented. You pursue goals that align with your beliefs and values. Conflict is handled directly and then quickly forgotten. You work in passionate bursts.",
  Capricorn: "Your drive is ambitious, disciplined, and strategically patient. You pursue long-term goals with remarkable determination. Conflict is handled carefully. You prefer winning through persistence. You work extremely hard.",
  Aquarius: "Your drive is independent and often oriented toward causes larger than yourself. You pursue goals in your own unconventional way. Conflict is approached intellectually. You want to be right, not just to win. You work in unpredictable patterns.",
  Pisces: "Your drive is subtle, inspired, and often passive until activated by meaning or compassion. You pursue goals through intuition and flow. Conflict drains you. You'd rather escape than fight. You work when the mood strikes.",
};

// Saturn descriptions - where pressure shapes you over time
const saturnSignDescriptions: Record<string, string> = {
  Aries: "Patience with yourself and your pace is the long lesson here. You may feel pressure to prove yourself quickly, to be first, to be independent before you're ready. Confidence around initiative and self-assertion builds slowly through experience, not declarations.",
  Taurus: "Security and self-worth are areas of slow, persistent growth. You may carry anxiety around money, stability, or whether you're building something solid enough. Real confidence in what you have and who you are develops through sustained effort, not quick wins.",
  Gemini: "Communication and intellectual confidence develop through discipline, not just natural ability. You may feel pressure around learning, speaking, or being understood. Clarity comes from doing the work, not from waiting for inspiration.",
  Cancer: "Emotional security and belonging are earned through patience with yourself. You may carry weight around family, home, or your capacity to nurture. Safety is built internally first. Walls you've constructed for protection may eventually become unnecessary.",
  Leo: "Creative confidence and the ability to be seen develop through persistent effort. You may feel pressure around visibility, recognition, or whether your contributions matter. Authentic expression comes from practice, not permission. Self-worth isn't given; it's claimed.",
  Virgo: "Competence and health are areas of focused growth. You may carry anxiety around being useful, getting things right, or maintaining order. Perfection isn't the goal. Sustainable systems and self-compassion are built through incremental progress.",
  Libra: "Relationships and fairness are areas of serious work. You may feel pressure around partnership, commitment, or balancing your needs with others'. Healthy relating is learned, not assumed. Boundaries and connection can coexist.",
  Scorpio: "Power, trust, and emotional depth are areas of intense growth. You may carry weight around vulnerability, control, or what you've lost. Transformation is your territory, but it asks for patience. What you release makes room for what you become.",
  Sagittarius: "Meaning, faith, and expansion are earned through discipline. You may feel pressure around beliefs, purpose, or whether your life is heading somewhere significant. Wisdom comes from experience, not just philosophy. Freedom deepens when it's chosen, not escaped to.",
  Capricorn: "Achievement, responsibility, and structure are your familiar territory, but also your weight. You may carry pressure around success, authority, or whether you're doing enough. Real mastery comes from sustained effort and self-recognition, not external validation alone.",
  Aquarius: "Independence, community, and vision develop through patience. You may feel pressure around belonging, being different, or whether your ideas matter. Authentic individuality is built, not declared. Connection and autonomy can coexist.",
  Pisces: "Spirituality, compassion, and boundaries are areas of slow growth. You may carry weight around faith, escapism, or whether you're too sensitive for the world. Grounded transcendence is possible. Boundaries don't diminish your capacity to feel.",
};

export interface PlanetPosition {
  name: string;
  symbol: string;
  longitude: number;
  sign: string;
  signSymbol: string;
  degree: number;
  element: string;
  quality: string;
  description: string;
}

export interface ChartData {
  sun: PlanetPosition;
  moon: PlanetPosition;
  rising: PlanetPosition | null;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
}

export interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: number;
}

/**
 * Convert longitude to zodiac sign
 * @param context - 'sun', 'moon', 'rising', 'mercury', 'venus', 'mars', 'saturn' or undefined for generic description
 */
function longitudeToSign(longitude: number, context?: 'sun' | 'moon' | 'rising' | 'mercury' | 'venus' | 'mars' | 'saturn'): PlanetPosition {
  const signIndex = Math.floor(longitude / 30) % 12;
  const degree = longitude % 30;
  const sign = zodiacSigns[signIndex];

  // Use context-specific description if available
  let description = signDescriptions[sign.name];
  if (context === 'sun') {
    description = sunSignDescriptions[sign.name];
  } else if (context === 'moon') {
    description = moonSignDescriptions[sign.name];
  } else if (context === 'rising') {
    description = risingSignDescriptions[sign.name];
  } else if (context === 'mercury') {
    description = mercurySignDescriptions[sign.name];
  } else if (context === 'venus') {
    description = venusSignDescriptions[sign.name];
  } else if (context === 'mars') {
    description = marsSignDescriptions[sign.name];
  } else if (context === 'saturn') {
    description = saturnSignDescriptions[sign.name];
  }

  return {
    name: '',
    symbol: '',
    longitude,
    sign: sign.name,
    signSymbol: sign.symbol,
    degree: Math.floor(degree),
    element: sign.element,
    quality: sign.quality,
    description,
  };
}

/**
 * Calculate Julian Day Number from date/time
 */
export function toJulianDay(year: number, month: number, day: number, hour: number): number {
  // Adjust for months January and February
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  return Math.floor(365.25 * (y + 4716)) +
         Math.floor(30.6001 * (m + 1)) +
         day + hour / 24 + b - 1524.5;
}

/**
 * Calculate Moon's ecliptic longitude using simplified algorithm
 * Based on Meeus "Astronomical Algorithms"
 */
export function calculateMoonLongitude(jd: number): number {
  // Days since J2000.0
  const T = (jd - 2451545.0) / 36525;

  // Moon's mean longitude
  const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;

  // Moon's mean anomaly
  const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;

  // Moon's argument of latitude
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T;

  // Sun's mean anomaly
  const Ms = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;

  // Moon's mean elongation
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;

  // Convert to radians
  const Lrad = L0 * Math.PI / 180;
  const Mrad = M * Math.PI / 180;
  const Frad = F * Math.PI / 180;
  const Msrad = Ms * Math.PI / 180;
  const Drad = D * Math.PI / 180;

  // Calculate main perturbations (simplified)
  let longitude = L0;
  longitude += 6.289 * Math.sin(Mrad);
  longitude += 1.274 * Math.sin(2 * Drad - Mrad);
  longitude += 0.658 * Math.sin(2 * Drad);
  longitude += 0.214 * Math.sin(2 * Mrad);
  longitude -= 0.186 * Math.sin(Msrad);
  longitude -= 0.114 * Math.sin(2 * Frad);

  // Normalize to 0-360
  longitude = longitude % 360;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Calculate Rising Sign (Ascendant) using accurate algorithm
 * Based on standard astrological calculation methods
 */
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  // Calculate Julian centuries from J2000.0
  const T = (jd - 2451545.0) / 36525;

  // Calculate Greenwich Mean Sidereal Time (in degrees)
  // Using IAU formula
  let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
             0.000387933 * T * T - T * T * T / 38710000;

  // Normalize GMST to 0-360
  GMST = GMST % 360;
  if (GMST < 0) GMST += 360;

  // Local Sidereal Time (add geographic longitude)
  let LST = GMST + longitude;
  LST = LST % 360;
  if (LST < 0) LST += 360;

  // RAMC (Right Ascension of Midheaven) equals LST
  const RAMC = LST;

  // Convert to radians
  const ramcRad = RAMC * Math.PI / 180;
  const latRad = latitude * Math.PI / 180;

  // Obliquity of the ecliptic (more accurate formula)
  const eps = 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
  const epsRad = eps * Math.PI / 180;

  // Calculate Ascendant using the standard formula
  // ASC = atan2(-cos(RAMC), sin(eps)*tan(lat) + cos(eps)*sin(RAMC))
  const y = -Math.cos(ramcRad);
  const x = Math.sin(epsRad) * Math.tan(latRad) + Math.cos(epsRad) * Math.sin(ramcRad);

  let asc = Math.atan2(y, x) * 180 / Math.PI;

  // The atan2 result needs to be adjusted to ecliptic longitude
  // Add 180 degrees to get the correct quadrant for the ascendant
  asc = asc + 180;

  // Normalize to 0-360
  asc = asc % 360;
  if (asc < 0) asc += 360;

  return asc;
}

/**
 * Calculate birth chart using astronomical algorithms
 */
export async function calculateChart(birthData: BirthData): Promise<ChartData | null> {
  try {
    // Convert local time to UTC
    const utcHour = birthData.hour + birthData.minute / 60 - birthData.timezone;

    // Calculate Julian Day
    const jd = toJulianDay(birthData.year, birthData.month, birthData.day, utcHour);

    // Calculate Moon position
    const moonLongitude = calculateMoonLongitude(jd);
    const moonSign = longitudeToSign(moonLongitude, 'moon');
    const moon: PlanetPosition = {
      ...moonSign,
      name: 'Moon',
      symbol: '☽',
    };

    // Calculate Ascendant (Rising sign)
    let rising: PlanetPosition | null = null;
    if (birthData.latitude && birthData.longitude) {
      const ascLongitude = calculateAscendant(jd, birthData.latitude, birthData.longitude);
      const ascSign = longitudeToSign(ascLongitude, 'rising');
      rising = {
        ...ascSign,
        name: 'Rising',
        symbol: '↑',
      };
    }

    // Calculate Sun position
    const sunLongitude = calculateSunLongitude(jd);
    const sunSign = longitudeToSign(sunLongitude, 'sun');
    const sun: PlanetPosition = {
      ...sunSign,
      name: 'Sun',
      symbol: '☉',
    };

    // Calculate Mercury position
    const mercuryLongitude = calculateMercuryLongitude(jd);
    const mercurySign = longitudeToSign(mercuryLongitude, 'mercury');
    const mercury: PlanetPosition = {
      ...mercurySign,
      name: 'Mercury',
      symbol: '☿',
    };

    // Calculate Venus position
    const venusLongitude = calculateVenusLongitude(jd);
    const venusSign = longitudeToSign(venusLongitude, 'venus');
    const venus: PlanetPosition = {
      ...venusSign,
      name: 'Venus',
      symbol: '♀',
    };

    // Calculate Mars position
    const marsLongitude = calculateMarsLongitude(jd);
    const marsSign = longitudeToSign(marsLongitude, 'mars');
    const mars: PlanetPosition = {
      ...marsSign,
      name: 'Mars',
      symbol: '♂',
    };

    // Calculate Saturn position
    const saturnLongitude = calculateSaturnLongitude(jd);
    const saturnSign = longitudeToSign(saturnLongitude, 'saturn');
    const saturn: PlanetPosition = {
      ...saturnSign,
      name: 'Saturn',
      symbol: '♄',
    };

    // Calculate Jupiter position
    const jupiterLongitude = calculateJupiterLongitude(jd);
    const jupiterSign = longitudeToSign(jupiterLongitude);
    const jupiter: PlanetPosition = {
      ...jupiterSign,
      name: 'Jupiter',
      symbol: '♃',
    };

    return {
      sun,
      moon,
      rising,
      mercury,
      venus,
      mars,
      jupiter,
      saturn,
    };
  } catch (error) {
    console.error('Error calculating chart:', error);
    return null;
  }
}

/**
 * Calculate Sun's ecliptic longitude
 */
export function calculateSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Mean longitude of the Sun
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;

  // Mean anomaly of the Sun
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = M * Math.PI / 180;

  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
            0.000289 * Math.sin(3 * Mrad);

  // Sun's true longitude
  let longitude = L0 + C;

  // Normalize to 0-360
  longitude = longitude % 360;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Helper to normalize angle to 0-360
 */
function normalizeAngle(angle: number): number {
  let result = angle % 360;
  if (result < 0) result += 360;
  return result;
}

/**
 * Helper to calculate Earth's heliocentric position
 */
function getEarthHeliocentricPosition(jd: number): { x: number; y: number; r: number; lon: number } {
  const sunLon = calculateSunLongitude(jd);
  const earthLon = normalizeAngle(sunLon + 180);

  const T = (jd - 2451545.0) / 36525;
  const Me = normalizeAngle(357.52911 + 35999.05029 * T);
  const MeRad = Me * Math.PI / 180;
  const ee = 0.016709;
  const re = 1.0 * (1 - ee * ee) / (1 + ee * Math.cos(MeRad));

  const earthLonRad = earthLon * Math.PI / 180;
  return {
    x: re * Math.cos(earthLonRad),
    y: re * Math.sin(earthLonRad),
    r: re,
    lon: earthLon
  };
}

/**
 * Calculate Mercury's GEOCENTRIC ecliptic longitude
 */
export function calculateMercuryLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Mercury's heliocentric position
  const L = normalizeAngle(252.2509 + 149474.0722 * T);
  const M = normalizeAngle(174.7948 + 149472.5153 * T);
  const Mrad = M * Math.PI / 180;
  const C = 23.4400 * Math.sin(Mrad) + 2.9818 * Math.sin(2 * Mrad) + 0.5255 * Math.sin(3 * Mrad);
  const mercuryHelioLon = normalizeAngle(L + C);

  // Mercury's orbital radius
  const em = 0.205630;
  const am = 0.387098;
  const rm = am * (1 - em * em) / (1 + em * Math.cos(Mrad));

  // Convert to rectangular
  const mercuryHelioRad = mercuryHelioLon * Math.PI / 180;
  const xm = rm * Math.cos(mercuryHelioRad);
  const ym = rm * Math.sin(mercuryHelioRad);

  // Earth's position
  const earth = getEarthHeliocentricPosition(jd);

  // Geocentric position
  const xg = xm - earth.x;
  const yg = ym - earth.y;

  // Geocentric longitude
  let longitude = Math.atan2(yg, xg) * 180 / Math.PI;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Calculate Venus's GEOCENTRIC ecliptic longitude
 */
export function calculateVenusLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Venus's heliocentric position
  const L = normalizeAngle(181.9798 + 58519.2130 * T);
  const M = normalizeAngle(50.4161 + 58517.8039 * T);
  const Mrad = M * Math.PI / 180;
  const C = 0.7758 * Math.sin(Mrad) + 0.0033 * Math.sin(2 * Mrad);
  const venusHelioLon = normalizeAngle(L + C);

  // Venus's orbital radius
  const ev = 0.006773;
  const av = 0.723332;
  const rv = av * (1 - ev * ev) / (1 + ev * Math.cos(Mrad));

  // Convert to rectangular
  const venusHelioRad = venusHelioLon * Math.PI / 180;
  const xv = rv * Math.cos(venusHelioRad);
  const yv = rv * Math.sin(venusHelioRad);

  // Earth's position
  const earth = getEarthHeliocentricPosition(jd);

  // Geocentric position
  const xg = xv - earth.x;
  const yg = yv - earth.y;

  // Geocentric longitude
  let longitude = Math.atan2(yg, xg) * 180 / Math.PI;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Calculate Mars's GEOCENTRIC ecliptic longitude
 */
export function calculateMarsLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Mars's heliocentric position
  const L = normalizeAngle(355.4330 + 19141.6964 * T);
  const M = normalizeAngle(19.3730 + 19139.8585 * T);
  const Mrad = M * Math.PI / 180;
  const C = 10.6912 * Math.sin(Mrad) + 0.6228 * Math.sin(2 * Mrad) + 0.0503 * Math.sin(3 * Mrad);
  const marsHelioLon = normalizeAngle(L + C);

  // Mars's orbital radius
  const ema = 0.093394;
  const ama = 1.523679;
  const rma = ama * (1 - ema * ema) / (1 + ema * Math.cos(Mrad));

  // Convert to rectangular
  const marsHelioRad = marsHelioLon * Math.PI / 180;
  const xma = rma * Math.cos(marsHelioRad);
  const yma = rma * Math.sin(marsHelioRad);

  // Earth's position
  const earth = getEarthHeliocentricPosition(jd);

  // Geocentric position
  const xg = xma - earth.x;
  const yg = yma - earth.y;

  // Geocentric longitude
  let longitude = Math.atan2(yg, xg) * 180 / Math.PI;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Calculate Jupiter's GEOCENTRIC ecliptic longitude
 */
export function calculateJupiterLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Jupiter's heliocentric position
  const L = normalizeAngle(34.3515 + 3034.9057 * T);
  const M = normalizeAngle(19.8950 + 3034.6982 * T);
  const Mrad = M * Math.PI / 180;
  const C = 5.5549 * Math.sin(Mrad) + 0.1683 * Math.sin(2 * Mrad) + 0.0071 * Math.sin(3 * Mrad);

  // Saturn perturbation on Jupiter
  const Ms = normalizeAngle(317.0207 + 1222.1138 * T);
  const MsRad = Ms * Math.PI / 180;
  const Cs = 0.3 * Math.sin(MsRad);

  const jupiterHelioLon = normalizeAngle(L + C + Cs);

  // Jupiter's orbital radius
  const ej = 0.048498;
  const aj = 5.20260;
  const rj = aj * (1 - ej * ej) / (1 + ej * Math.cos(Mrad));

  // Convert to rectangular
  const jupiterHelioRad = jupiterHelioLon * Math.PI / 180;
  const xj = rj * Math.cos(jupiterHelioRad);
  const yj = rj * Math.sin(jupiterHelioRad);

  // Earth's position
  const earth = getEarthHeliocentricPosition(jd);

  // Geocentric position
  const xg = xj - earth.x;
  const yg = yj - earth.y;

  // Geocentric longitude
  let longitude = Math.atan2(yg, xg) * 180 / Math.PI;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Calculate Saturn's GEOCENTRIC ecliptic longitude
 */
export function calculateSaturnLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Saturn's heliocentric position
  const L = normalizeAngle(50.0774 + 1223.5110 * T);
  const M = normalizeAngle(317.0207 + 1222.1138 * T);
  const Mrad = M * Math.PI / 180;
  const C = 6.4000 * Math.sin(Mrad) + 0.2300 * Math.sin(2 * Mrad);

  // Jupiter perturbation
  const Mj = normalizeAngle(20.020 + 3034.906 * T);
  const MjRad = Mj * Math.PI / 180;
  const Cj = 0.8 * Math.sin(MjRad);

  const saturnHelioLon = normalizeAngle(L + C + Cj);

  // Saturn's orbital radius
  const es = 0.054151;
  const as = 9.554909;
  const rs = as * (1 - es * es) / (1 + es * Math.cos(Mrad));

  // Convert to rectangular
  const saturnHelioRad = saturnHelioLon * Math.PI / 180;
  const xs = rs * Math.cos(saturnHelioRad);
  const ys = rs * Math.sin(saturnHelioRad);

  // Earth's position
  const earth = getEarthHeliocentricPosition(jd);

  // Geocentric position
  const xg = xs - earth.x;
  const yg = ys - earth.y;

  // Geocentric longitude
  let longitude = Math.atan2(yg, xg) * 180 / Math.PI;
  if (longitude < 0) longitude += 360;

  return longitude;
}

/**
 * Get timezone offset from location (simplified - assumes standard time)
 * For accurate results, you'd want to use a timezone API
 */
export function estimateTimezone(longitude: number): number {
  // Rough estimate: 15 degrees = 1 hour
  return Math.round(longitude / 15);
}
