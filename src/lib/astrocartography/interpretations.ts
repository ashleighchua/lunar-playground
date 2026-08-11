/**
 * Astrocartography Interpretations
 *
 * Contains interpretive text, key themes, and narrative visions
 * for each planet/angle combination.
 */

export interface Interpretation {
  title: string;
  short: string;
  full: string;
  themes: string[];
}

const interpretations: Record<string, Interpretation> = {
  // Sun lines
  Sun_MC: {
    title: 'Sun on Midheaven: Identity and Public Recognition',
    short: 'High visibility and recognition for who you truly are.',
    full: 'The Sun on your Midheaven means this is a place where you are highly visible. Your core identity is on display, and there is potential for recognition, leadership, and being known for who you truly are. You naturally command attention here. Career-wise, this supports stepping into authority and being seen for your contributions.',
    themes: ['Public recognition', 'Leadership', 'Career visibility'],
  },
  Sun_IC: {
    title: 'Sun on IC: Inner Foundation and Roots',
    short: 'A place for building a strong inner foundation and sense of home.',
    full: 'With the Sun on your IC, this location activates your deepest sense of self and belonging. You may feel drawn to put down roots here, create a home that truly reflects your identity, or reconnect with family heritage. This is less about external achievement and more about knowing who you are at your core.',
    themes: ['Inner foundation', 'Sense of belonging', 'Self-knowledge'],
  },
  Sun_AC: {
    title: 'Sun on Ascendant: Authentic Self-Expression',
    short: 'Your authentic self shines through in how you present yourself.',
    full: 'The Sun on your Ascendant brings vitality and authenticity to how you appear to others. You come across as confident, warm, and genuinely yourself. People are drawn to your natural radiance. This placement supports leadership, creative self-expression, and making a strong impression.',
    themes: ['Authentic expression', 'Natural confidence', 'Personal vitality'],
  },
  Sun_DC: {
    title: 'Sun on Descendant: Significant Partnerships',
    short: 'Relationships take center stage, attracting powerful partners.',
    full: 'With the Sun on your Descendant, relationships become a primary focus. You may attract partners who are confident, successful, or leadership-oriented. This is a location where significant partnerships can form and where you may define yourself through your connections with others.',
    themes: ['Powerful connections', 'Significant partners', 'Relationship growth'],
  },

  // Moon lines
  Moon_MC: {
    title: 'Moon on Midheaven: Emotional Public Image',
    short: 'Your emotional nature becomes visible in your public life.',
    full: 'The Moon on your Midheaven brings your emotional nature into your public and professional life. You may be drawn to nurturing careers or roles that involve caring for others. Your reputation may be tied to your emotional authenticity. This placement supports work in counseling, hospitality, or any field requiring emotional intelligence.',
    themes: ['Emotional intelligence', 'Nurturing career', 'Empathic leadership'],
  },
  Moon_IC: {
    title: 'Moon on IC: Emotional Homeland',
    short: 'A place that feels deeply like home to your emotional self.',
    full: 'With the Moon on your IC, this location touches the deepest part of your emotional nature. It may feel instinctively like home, activating memories, comfort, and a sense of belonging. This is an excellent place for creating a nurturing home environment and connecting with family.',
    themes: ['Emotional homeland', 'Deep comfort', 'Belonging'],
  },
  Moon_AC: {
    title: 'Moon on Ascendant: Emotional Presence',
    short: 'Your emotional nature is visible and magnetic to others.',
    full: 'With the Moon near your Ascendant line, your emotional nature is visible to others. You come across as nurturing, intuitive, and emotionally attuned. People sense your feelings easily. This can create deep connections but also vulnerability. For relationships, this placement supports emotional intimacy.',
    themes: ['Emotional magnetism', 'Intuitive presence', 'Deep connections'],
  },
  Moon_DC: {
    title: 'Moon on Descendant: Emotional Partnerships',
    short: 'Draws emotionally nurturing and intuitive partners.',
    full: 'The Moon on your Descendant enhances emotional connections in relationships. You may attract nurturing, sensitive, or family-oriented partners. Relationships here tend to be emotionally rich and instinctive. This is a place where you might find someone who truly understands your emotional needs.',
    themes: ['Emotional intimacy', 'Nurturing partners', 'Soul connections'],
  },

  // Mercury lines
  Mercury_MC: {
    title: 'Mercury on Midheaven: Communication and Career',
    short: 'Enhanced communication skills in professional settings.',
    full: 'Mercury on the Midheaven brings intellectual clarity to your career and public life. You may be drawn to communication-heavy fields: writing, teaching, media, or commerce. Your reputation may be built on your ideas and how well you articulate them. Mental agility is your professional asset here.',
    themes: ['Communication', 'Intellectual career', 'Mental clarity'],
  },
  Mercury_IC: {
    title: 'Mercury on IC: Intellectual Roots',
    short: 'A place for deep learning and intellectual reflection.',
    full: 'Mercury on your IC activates intellectual curiosity in your private life. You may find yourself reading more, studying, or engaging in deep conversations at home. This placement supports writing, learning, and processing ideas in a quiet, reflective environment. Your inner world becomes rich with thought.',
    themes: ['Deep learning', 'Reflective thinking', 'Inner dialogue'],
  },
  Mercury_AC: {
    title: 'Mercury on Ascendant: Quick-Witted Presence',
    short: 'Projects intellectual curiosity and communicative energy.',
    full: 'Mercury on your Ascendant makes you come across as articulate, curious, and mentally sharp. You naturally engage others in conversation and process information quickly. This placement supports networking, learning, and making connections. People see you as someone who is well-informed and interesting to talk to.',
    themes: ['Quick wit', 'Networking', 'Curious energy'],
  },
  Mercury_DC: {
    title: 'Mercury on Descendant: Intellectual Partnerships',
    short: 'Attracts partners through mental connection and conversation.',
    full: 'Mercury on your Descendant brings intellectual stimulation to relationships. You may attract communicative, witty, or intellectually curious partners. Relationships here are built on conversation and shared ideas. This is a place where you might connect with someone who challenges you mentally.',
    themes: ['Mental connection', 'Stimulating partners', 'Shared ideas'],
  },

  // Venus lines
  Venus_MC: {
    title: 'Venus on Midheaven: Charm and Social Success',
    short: 'Enhanced social magnetism and appreciation in public life.',
    full: 'Venus on the Midheaven tends to enhance how others perceive you socially. You may come across as more charming, warm, and magnetic here. This placement can heighten your social appeal and make it easier to draw positive attention. This energy may support romantic connection through your career, social circles, or public life.',
    themes: ['Social magnetism', 'Creative recognition', 'Grace'],
  },
  Venus_IC: {
    title: 'Venus on IC: Beautiful Home Life',
    short: 'Creates harmony and beauty in your private life and home.',
    full: 'With Venus on your IC, this location supports creating a beautiful, harmonious home life. You may be drawn to making your living space aesthetically pleasing and comfortable. Relationships with family may be more harmonious here. This is a place for cultivating pleasure and beauty in your private sphere.',
    themes: ['Harmonious home', 'Beauty & comfort', 'Inner peace'],
  },
  Venus_AC: {
    title: 'Venus on Ascendant: Personal Magnetism',
    short: 'Enhanced attractiveness and natural charm in how you present.',
    full: 'Venus on your Ascendant enhances your personal magnetism and attractiveness. You naturally come across as pleasant, charming, and aesthetically aware. People are drawn to you easily. This placement supports romance, social success, and anything requiring personal appeal.',
    themes: ['Personal magnetism', 'Natural charm', 'Aesthetic sense'],
  },
  Venus_DC: {
    title: 'Venus on Descendant: Romantic Magnetism',
    short: 'Creates receptive conditions for romantic connection.',
    full: 'Venus DC creates receptive conditions for romantic connection. You may find yourself more attractive to others and drawn to partners with artistic, affectionate qualities. This is one of the most favorable placements for love and partnership. Relationships formed here tend to be harmonious and mutually appreciative.',
    themes: ['Romantic magnetism', 'Harmonious love', 'Deep attraction'],
  },

  // Mars lines
  Mars_MC: {
    title: 'Mars on Midheaven: Drive and Ambition',
    short: 'Intense drive and ambition in career pursuits.',
    full: 'Mars on the Midheaven brings intense energy to your career and public life. You will feel driven, ambitious, and motivated to achieve. Mars here can fuel professional accomplishment through sheer force of will and action. The other side is competition: Mars MC can attract rivalry or power struggles in professional settings.',
    themes: ['Ambition', 'Career drive', 'Competitive edge'],
  },
  Mars_IC: {
    title: 'Mars on IC: Inner Fire',
    short: 'Activates deep passion and may stir family dynamics.',
    full: 'Mars on your IC activates energy in your private life and home. You may feel more restless at home, driven to improve or change your living situation. Family dynamics may be more intense or competitive. This placement provides inner drive and motivation. Channel this energy into home improvement or personal development.',
    themes: ['Inner fire', 'Transformation', 'Deep motivation'],
  },
  Mars_AC: {
    title: 'Mars on Ascendant: Dynamic Presence',
    short: 'Projects courage, energy, and assertive presence.',
    full: 'Mars on your Ascendant gives you a dynamic, assertive presence. You come across as energetic, courageous, and direct. This placement enhances physical vitality and the ability to take initiative. You may be drawn to competitive activities or leadership roles.',
    themes: ['Dynamic presence', 'Physical vitality', 'Bold initiative'],
  },
  Mars_DC: {
    title: 'Mars on Descendant: Passionate Relationships',
    short: 'Attracts passionate, assertive partners with intensity.',
    full: 'Mars on your Descendant brings passion and intensity to relationships. You may attract dynamic, assertive, or competitive partners. Relationships here tend to be energetic and stimulating but may also involve conflict. This placement can indicate passionate romance or business partnerships with driven individuals.',
    themes: ['Passionate chemistry', 'Intensity', 'Electric bonds'],
  },

  // Jupiter lines
  Jupiter_MC: {
    title: 'Jupiter on Midheaven: Career Expansion and Luck',
    short: 'One of the most favorable placements for professional growth.',
    full: 'Jupiter on the Midheaven is one of the most favorable placements for professional growth and public recognition. This energy tends to support opportunity and expansion. Your efforts may feel more amplified and rewarded here than elsewhere. Jupiter MC can support growth, optimism, and a sense of abundance in your public life.',
    themes: ['Career expansion', 'Professional luck', 'Abundance'],
  },
  Jupiter_IC: {
    title: 'Jupiter on IC: Abundant Home Life',
    short: 'Brings expansion and optimism to home and inner life.',
    full: 'Jupiter on your IC brings expansion and optimism to your home and inner life. You may feel a sense of abundance in your private sphere, with a generous, welcoming home environment. This placement supports emotional growth, philosophical reflection, and a positive family life.',
    themes: ['Abundant home', 'Emotional growth', 'Inner wisdom'],
  },
  Jupiter_AC: {
    title: 'Jupiter on Ascendant: Optimistic Presence',
    short: 'Projects warmth, generosity, and opens doors easily.',
    full: 'Jupiter on your Ascendant brings warmth, optimism, and openness to how you present yourself. Doors tend to open more easily. Others perceive you as generous and adventurous. This placement enhances your ability to make positive first impressions and attracts good fortune through your personality.',
    themes: ['Optimistic presence', 'Open doors', 'Good fortune'],
  },
  Jupiter_DC: {
    title: 'Jupiter on Descendant: Fortunate Partnerships',
    short: 'Attracts beneficial, generous partners and opportunities through others.',
    full: 'Jupiter on your Descendant brings good fortune through partnerships and relationships. You may attract generous, optimistic, or successful partners. Opportunities often come through other people. This is an excellent placement for beneficial business partnerships and relationships that expand your horizons.',
    themes: ['Fortunate partnerships', 'Generous partners', 'Lucky connections'],
  },

  // Saturn lines
  Saturn_MC: {
    title: 'Saturn on Midheaven: Disciplined Achievement',
    short: 'Builds lasting success through sustained effort and responsibility.',
    full: 'Saturn on your Midheaven brings serious, disciplined energy to your career and public life. Success here comes through sustained effort, responsibility, and time. You may be drawn to positions of authority or fields requiring expertise and dedication. This placement builds lasting achievements but requires patience. Recognition comes later but is well-earned.',
    themes: ['Disciplined achievement', 'Earned authority', 'Long-game success'],
  },
  Saturn_IC: {
    title: 'Saturn on IC: Structured Foundations',
    short: 'Creates structure and discipline in private life and home.',
    full: "Saturn on your IC brings structure and discipline to your home and inner life. You may feel drawn to create a stable, well-organized home environment. Family responsibilities may feel heavy, but you build lasting foundations. This placement supports maturation and dealing with family patterns consciously. The challenge is not letting home life feel too restrictive.",
    themes: ['Structured home', 'Lasting foundations', 'Family maturity'],
  },
  Saturn_AC: {
    title: 'Saturn on Ascendant: Serious Presence',
    short: 'Projects maturity and seriousness; requires effort in self-expression.',
    full: "Saturn on the Ascendant can feel heavy. This placement often manifests as a sense of burden, increased responsibility, or feeling like life requires more effort. You may be perceived as serious, mature, or reserved, even if that's not your natural disposition. The gift of Saturn is mastery through discipline. If you're willing to work hard and accept delayed gratification, this placement builds something lasting.",
    themes: ['Earned mastery', 'Serious presence', 'Disciplined growth'],
  },
  Saturn_DC: {
    title: 'Saturn on Descendant: Committed Partnerships',
    short: 'Attracts serious, stable partners; relationships require commitment.',
    full: 'Saturn on your Descendant adds seriousness and maturity to relationships. First impressions may be more reserved. Whatever develops here requires genuine effort. Relationships tend toward commitment rather than casual dating. You may attract older, more established, or authority-figure partners. This placement builds lasting partnerships through mutual responsibility.',
    themes: ['Committed partnership', 'Earned trust', 'Lasting bonds'],
  },

  // Uranus lines
  Uranus_MC: {
    title: 'Uranus on Midheaven: Unconventional Career',
    short: 'Brings sudden changes and innovation to career and public image.',
    full: 'Uranus on your Midheaven brings innovation, unpredictability, and originality to your career and public life. You may be drawn to unconventional careers or experience sudden changes in your professional direction. This placement supports technology, innovation, and breaking from tradition. Your public image may be that of a rebel or visionary. The challenge is instability in career matters.',
    themes: ['Unconventional career', 'Sudden change', 'Visionary image'],
  },
  Uranus_IC: {
    title: 'Uranus on IC: Restless Foundations',
    short: 'Brings sudden change and a need for independence to home and private life.',
    full: 'Uranus on your IC unsettles the usual sense of home. You may find yourself changing living situations more than expected, drawn to unconventional domestic arrangements, or simply needing more independence within your private life than tradition allows. Family patterns may shift suddenly here. The private self becomes a place of experimentation rather than routine.',
    themes: ['Restless home', 'Independence', 'Unconventional roots'],
  },
  Uranus_AC: {
    title: 'Uranus on Ascendant: Magnetic Unpredictability',
    short: 'Projects individuality, originality, and magnetic unpredictability.',
    full: "Uranus on your Ascendant projects individuality, originality, and magnetic unpredictability. Others may see you as different, ahead of your time, or hard to categorise. This placement enhances personal freedom and the courage to be authentically yourself, even when it doesn't fit convention. Change and reinvention come naturally here.",
    themes: ['Magnetic individuality', 'Personal freedom', 'Reinvention'],
  },
  Uranus_DC: {
    title: 'Uranus on Descendant: Unconventional Partnerships',
    short: 'Brings sudden change and excitement to relationships and partnerships.',
    full: "Uranus on your Descendant brings excitement, unpredictability, and a need for independence into your relationships. Partnerships here often begin suddenly and unconventionally, and the people you attract tend to be unusual, independent-minded, or resistant to being tied down. This placement favours relationships built on freedom and mutual respect for each other's individuality over traditional structure. The challenge is stability, since connections here can end as suddenly as they begin.",
    themes: ['Unconventional partners', 'Exciting connection', 'Need for freedom'],
  },

  // Neptune lines
  Neptune_MC: {
    title: 'Neptune on Midheaven: Visionary Public Image',
    short: 'Infuses your public image with creative, visionary qualities.',
    full: 'Neptune on the Midheaven can infuse your public image with creative, artistic qualities. It supports careers in imaginative fields. Others may see you as a visionary or creative professional. The challenge is keeping your public direction clear rather than diffuse.',
    themes: ['Visionary career', 'Creative recognition', 'Artistic image'],
  },
  Neptune_IC: {
    title: 'Neptune on IC: Dissolving Boundaries at Home',
    short: 'Softens boundaries around home and family, inviting spiritual reflection.',
    full: 'Neptune on your IC brings a dreamy, porous quality to your home and inner life. Boundaries between yourself and family may blur, and your sense of roots may feel more spiritual or imaginative than literal. This placement supports meditation, creative retreat, and healing work done in private, though it can also bring confusion around family history or where you truly belong. The private self becomes less about walls and more about atmosphere.',
    themes: ['Spiritual home', 'Soft boundaries', 'Inner retreat'],
  },
  Neptune_AC: {
    title: 'Neptune on Ascendant: Dreamy Presence',
    short: 'Projects artistic, mysterious, spiritually-attuned presence.',
    full: 'Neptune on your Ascendant gives you a dreamy, artistic, or spiritually-attuned presence. Others may see you as mysterious, creative, or hard to define. This placement enhances intuition and artistic expression. You naturally tune into subtle energies. The challenge is that others may project fantasies onto you or misunderstand who you really are.',
    themes: ['Dreamy presence', 'Heightened intuition', 'Artistic aura'],
  },
  Neptune_DC: {
    title: 'Neptune on Descendant: Idealized Partnerships',
    short: 'Brings a soulmate quality to relationships, with real risk of idealisation.',
    full: 'Neptune on your Descendant brings a soulmate-like, almost fated quality to relationships formed here. Partners may feel spiritually or creatively aligned with you in ways that feel meant to be. The risk is idealisation: Neptune can blur the line between who someone actually is and who you want them to be, so clarity may take longer to arrive than usual. Handled consciously, this placement supports deeply compassionate, artistic, or spiritually connected partnership.',
    themes: ['Soulmate energy', 'Creative connection', 'Idealisation risk'],
  },

  // Pluto lines
  Pluto_MC: {
    title: 'Pluto on Midheaven: Transformation & Power',
    short: 'Profound transformation in career and public image; power dynamics.',
    full: "Pluto on the Midheaven is one of the most intense placements in astrocartography. This is a location of profound transformation, particularly around career, public image, and your place in the world. Pluto demands authenticity; it strips away what's false and forces you to confront your own power. You may experience significant rises and falls, power dynamics in professional settings, or deep reinvention of your public self.",
    themes: ['Career transformation', 'Personal power', 'Public reinvention'],
  },
  Pluto_IC: {
    title: 'Pluto on IC: Deep Roots, Deep Change',
    short: 'Brings intense transformation to home, family, and your private foundations.',
    full: 'Pluto on your IC reaches into the deepest layers of your private life: family history, inherited patterns, and your sense of roots. This placement can surface buried family dynamics or ancestral material that has been waiting to be acknowledged. Home here is rarely neutral ground; it becomes a place of real psychological excavation. What gets rebuilt afterward tends to be far more solid than what was there before.',
    themes: ['Family excavation', 'Rebuilt foundations', 'Ancestral material'],
  },
  Pluto_AC: {
    title: 'Pluto on Ascendant: Intense Presence',
    short: 'Projects powerful, magnetic, transformative presence.',
    full: 'Pluto on your Ascendant gives you an intense, magnetic presence. You come across as powerful, perceptive, and somewhat mysterious. Others feel your depth. This placement enhances personal power and the ability to transform yourself and situations. You may be drawn to crisis situations or roles requiring psychological insight. The challenge is managing the intensity of how others respond to you.',
    themes: ['Magnetic intensity', 'Personal power', 'Deep perception'],
  },
  Pluto_DC: {
    title: 'Pluto on Descendant: Transformative Partnerships',
    short: 'Attracts intense, powerful partners; relationships that transform you.',
    full: "Pluto on your Descendant draws intense, powerful partnerships into your life, the kind that don't stay surface-level for long. You may attract partners who are magnetic, controlling, or deeply transformative to know, and relationships formed here tend to strip away pretence quickly. Power dynamics are often part of the territory, for better or worse. What survives this placement's intensity tends to be real.",
    themes: ['Transformative partners', 'Power dynamics', 'Real intimacy'],
  },
};

// Vision narratives per planet/angle. {city} is replaced at runtime.
const visions: Record<string, string> = {
  Sun_MC: 'Imagine arriving in {city} and feeling seen. Not just noticed, but truly recognised. Under your Sun Midheaven line, this is where your identity crystallises into something the world can understand and value.',
  Sun_IC: 'Picture a quiet evening in {city}, and for the first time in a long time, you exhale completely. Your Sun IC line activates a deep sense of home here. The kind that comes not from familiarity, but from finally recognising yourself.',
  Sun_AC: 'Walk through {city} and notice how people respond to you differently. Under your Sun Ascendant line, there\'s a warmth and confidence in how you carry yourself here that draws others in naturally.',
  Sun_DC: 'In {city}, the people around you feel more vivid, more significant. Your Sun Descendant line suggests the relationships formed here could reshape how you see yourself.',

  Moon_MC: 'Imagine {city} as the backdrop to work that actually moves you. Under your Moon Midheaven line, your emotional depth becomes your greatest professional asset. People trust you because they can feel that you care.',
  Moon_IC: 'Close your eyes and picture arriving in {city}. There\'s something in the air that feels like memory. Not of this place specifically, but of belonging. Your Moon IC line runs here, activating the deepest part of your emotional landscape.',
  Moon_AC: 'Walk through {city} and notice how open you feel. Your Moon Ascendant line heightens your emotional presence here. People sense something genuine in you, and connections form before you even try.',
  Moon_DC: 'In {city}, love could look different. Under your Moon Descendant line, you may attract partners who intuitively understand your emotional rhythms. The kind of bond that doesn\'t need to be explained.',

  Mercury_MC: 'Imagine presenting your ideas in {city}. The words come easily, the room responds. Under your Mercury Midheaven line, your intellect and communication skills become your most visible assets.',
  Mercury_IC: 'Picture a quiet desk in {city}, surrounded by books and ideas. Your Mercury IC line turns this into a place of deep intellectual reflection, where your best thinking happens in the stillness.',
  Mercury_AC: 'Walk into a conversation in {city} and feel how quickly you connect. Under your Mercury Ascendant line, you come across as sharp, curious, and genuinely interesting. People want to talk to you here.',
  Mercury_DC: 'In {city}, the conversations go deeper than expected. Your Mercury Descendant line attracts people who challenge your thinking. Relationships built on shared ideas and the thrill of mutual discovery.',

  Venus_MC: 'Picture yourself at a gathering in {city}. Something shifts. You\'re magnetic here. Under your Venus Midheaven line, there\'s a social grace to you that opens doors and creates opportunities you wouldn\'t find elsewhere.',
  Venus_IC: 'Imagine your living space in {city}. The light, the textures, the feeling of walking through the door at the end of the day. Your Venus IC line suggests this is where beauty and comfort become a daily practice.',
  Venus_AC: 'Walk through {city} and notice how the city seems to agree with you. Your Venus Ascendant line enhances your natural magnetism here. You simply shine brighter in this part of the world.',
  Venus_DC: 'In {city}, romance doesn\'t just happen. It unfolds. Under your Venus Descendant line, this is one of the most naturally receptive places on earth for you to find meaningful, lasting connection.',

  Mars_MC: 'Picture yourself in {city} with a fire in your step. Under your Mars Midheaven line, ambition here feels less like pressure and more like purpose. You\'re driven, and it builds something lasting.',
  Mars_IC: 'Imagine the energy shift when you settle into {city}. Your Mars IC line stirs something deep. A restlessness that, channelled well, becomes the fuel for genuine personal transformation.',
  Mars_AC: 'Walk through {city} and feel the difference in your stride. Under your Mars Ascendant line, you carry a dynamic energy here that people notice. Opportunities come to those who move first.',
  Mars_DC: 'In {city}, expect intensity. Your Mars Descendant line suggests relationships here run hot. Passionate, stimulating, and unforgettable. The chemistry is undeniable.',

  Jupiter_MC: 'Imagine your career in {city}: doors opening, opportunities aligning, the quiet sense that things are moving in your favour. Under your Jupiter Midheaven line, professional growth here feels almost inevitable.',
  Jupiter_IC: 'Picture coming home to {city}. A home that somehow feels bigger than its walls. Your Jupiter IC line brings expansion to your inner world. Generosity, optimism, and emotional richness become your baseline.',
  Jupiter_AC: 'Walk into any room in {city} and something shifts. Under your Jupiter Ascendant line, you carry an infectious warmth here. People trust you, doors open easily, and good fortune seems to follow.',
  Jupiter_DC: 'In {city}, the people who enter your life could change its trajectory. Your Jupiter Descendant line attracts generous, expansive partners. The kind who broaden your world simply by being in it.',
};

/**
 * Get interpretation for a planet/angle combination
 */
export function getInterpretation(planet: string, angle: string): Interpretation | null {
  const key = `${planet}_${angle}`;
  return interpretations[key] ?? null;
}

/**
 * Get vision narrative for a planet/angle/city combination
 */
export function getVision(planet: string, angle: string, cityName: string): string | null {
  const key = `${planet}_${angle}`;
  const template = visions[key];
  if (!template) return null;
  return template.replace(/\{city\}/g, cityName);
}

/**
 * Generate a natural description for an astrocartography result
 */
export function generateDescription(
  planet: string,
  angle: string,
  cityName: string,
  countryName: string
): string {
  const interp = getInterpretation(planet, angle);
  if (!interp) {
    return `Your ${planet} line passes near ${cityName}, ${countryName}. This planetary influence shapes your experience of this location in meaningful ways.`;
  }

  const angleName = {
    MC: 'Midheaven',
    IC: 'IC (Nadir)',
    AC: 'Ascendant',
    DC: 'Descendant',
  }[angle] || angle;

  return `Your ${planet} ${angleName} line runs near ${cityName}, ${countryName}. ${interp.full}`;
}
