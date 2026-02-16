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
