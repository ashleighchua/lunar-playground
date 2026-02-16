/**
 * Integrative interpretations for the "Operating System" card
 * Generates prose that synthesizes Sun, Moon, and Rising together
 * WITHOUT using element/astrology mechanics language
 */

// Core orientation by Sun sign - what you orient toward
export const sunOrientation: Record<string, string> = {
  Aries: "You orient toward action, initiation, and forward movement. You're motivated by challenge, independence, and the feeling of beginning something new. Meaning comes from doing, not waiting.",
  Taurus: "You orient toward stability, quality, and tangible results. You're motivated by building something real, by comfort, and by the slow accumulation of what matters. Meaning comes from what lasts.",
  Gemini: "You orient toward ideas, connections, and variety. You're motivated by curiosity, communication, and the constant exchange of information. Meaning comes from understanding and being understood.",
  Cancer: "You orient toward nurturing, protection, and emotional security. You're motivated by belonging, care, and creating safe spaces. Meaning comes from connection and being needed.",
  Leo: "You orient toward expression, recognition, and creative contribution. You're motivated by authenticity, appreciation, and the desire to make your mark. Meaning comes from being seen for who you truly are.",
  Virgo: "You orient toward improvement, service, and practical refinement. You're motivated by usefulness, mastery, and making things work better. Meaning comes from contribution and competence.",
  Libra: "You orient toward harmony, partnership, and balance. You're motivated by fairness, beauty, and genuine connection. Meaning comes from relationship and creating equilibrium.",
  Scorpio: "You orient toward depth, truth, and transformation. You're motivated by intensity, authentic connection, and understanding what lies beneath. Meaning comes from what's real, not what's comfortable.",
  Sagittarius: "You orient toward meaning, expansion, and possibility. You're motivated by growth, freedom, and the search for larger truths. Meaning comes from the journey itself.",
  Capricorn: "You orient toward achievement, structure, and lasting impact. You're motivated by mastery, responsibility, and building something that endures. Meaning comes from earned success.",
  Aquarius: "You orient toward ideas, systems, and possibilities. You're motivated by improvement and seeing beyond what already exists. Meaning comes from perspective and contribution, not just personal validation.",
  Pisces: "You orient toward connection, compassion, and transcendence. You're motivated by beauty, meaning, and the invisible threads that connect everything. Meaning comes from something larger than the individual self.",
};

// Emotional processing by Moon sign - how you feel and process
export const moonProcessing: Record<string, string> = {
  Aries: "Emotionally, you process through action and direct expression. Feelings move through you quickly and demand immediate acknowledgment. Sitting with unresolved emotion feels unbearable. You'd rather fight, move, or solve than linger.",
  Taurus: "Emotionally, you seek stability, comfort, and predictability. You process feelings slowly, through the body, through routine. Change unsettles you not because you're rigid, but because your emotional system needs time to recalibrate.",
  Gemini: "Emotionally, you process through talking, thinking, and analyzing. Feelings become real when you can name them and discuss them. Silence makes you restless; understanding makes you calm.",
  Cancer: "Emotionally, you feel everything deeply and remember what you've felt. You process through nurturing, through memory, through creating safety. Your emotional life is vast, rich, and sometimes overwhelming.",
  Leo: "Emotionally, you need to be seen, valued, and appreciated. You process through expression and recognition. When you're loved well, you're generous and warm. When you feel invisible, everything dims.",
  Virgo: "Emotionally, you process through analysis, order, and practical action. Feelings can feel messy and unpredictable, so you try to make sense of them. You often show care through doing rather than saying.",
  Libra: "Emotionally, you seek balance, harmony, and mutual understanding. You process feelings through conversation and reflection. Conflict unsettles you not because you're fragile, but because it disrupts equilibrium.",
  Scorpio: "Emotionally, you feel with intensity and depth that most people never access. You process through transformation, through sitting with what's uncomfortable until it changes you. Trust is everything; betrayal is unforgivable.",
  Sagittarius: "Emotionally, you seek meaning, perspective, and room to breathe. You process by zooming out, by finding the lesson, by moving toward something better. Heavy feelings make you restless; understanding brings relief.",
  Capricorn: "Emotionally, you're reserved, controlled, and private. You process through structure, through accomplishment, through taking responsibility. Vulnerability feels risky, so you often lead with competence instead.",
  Aquarius: "Emotionally, you process from a slight distance, observing your feelings as much as experiencing them. You seek understanding through ideas and patterns. Intense emotional demands can feel overwhelming.",
  Pisces: "Emotionally, you absorb everything, your own feelings and everyone else's. You process through imagination, through compassion, through dissolving boundaries. This makes you deeply empathic and sometimes lost.",
};

// Social presentation by Rising sign - how others meet you
export const risingPresentation: Record<string, string> = {
  Aries: "To others, you come across as direct, energetic, and ready to engage. You meet life head-on, often leading with action rather than deliberation. There's an immediacy to your presence that others find either invigorating or intense.",
  Taurus: "To others, you come across as calm, steady, and grounded. You meet life at your own pace, with a quiet reliability that puts people at ease. There's a solidity to your presence that suggests you won't be easily moved.",
  Gemini: "To others, you come across as curious, quick, and versatile. You meet life with questions and connections, adapting easily to new situations. There's a lightness to your presence that makes you easy to approach.",
  Cancer: "To others, you come across as nurturing, sensitive, and protective. You meet life by reading the emotional atmosphere first. There's a softness to your presence that invites others to open up.",
  Leo: "To others, you come across as warm, confident, and naturally visible. You meet life with presence and personal style. There's a radiance to you that draws attention, whether you seek it or not.",
  Virgo: "To others, you come across as observant, helpful, and put-together. You meet life by noticing details and looking for how to be useful. There's a quiet competence to your presence that others trust.",
  Libra: "To others, you come across as graceful, diplomatic, and socially attuned. You meet life through relationship and aesthetic awareness. There's an elegance to your presence that smooths interactions.",
  Scorpio: "To others, you come across as intense, perceptive, and private. You meet life by assessing what's beneath the surface. There's a depth to your presence that intrigues some and unsettles others.",
  Sagittarius: "To others, you come across as open, curious, and forward-looking. You meet life with optimism and a sense that things can expand or make sense if explored honestly.",
  Capricorn: "To others, you come across as serious, capable, and composed. You meet life with maturity and strategic awareness. There's an authority to your presence that commands quiet respect.",
  Aquarius: "To others, you come across as unique, independent, and slightly detached. You meet life on your own terms, questioning what others accept without thought. There's something unconventional about your presence.",
  Pisces: "To others, you come across as gentle, intuitive, and somewhat elusive. You meet life through feeling and imagination. There's a dreamy quality to your presence that others find hard to pin down.",
};

// Processing styles by sign - used internally, no element language exposed
type ProcessingStyle = 'thinking' | 'feeling' | 'doing' | 'grounding';

function getProcessingStyle(sign: string): ProcessingStyle {
  const thinking = ['Gemini', 'Libra', 'Aquarius'];
  const feeling = ['Cancer', 'Scorpio', 'Pisces'];
  const doing = ['Aries', 'Leo', 'Sagittarius'];
  if (thinking.includes(sign)) return 'thinking';
  if (feeling.includes(sign)) return 'feeling';
  if (doing.includes(sign)) return 'doing';
  return 'grounding';
}

// How the three placements work together - NO element language
export function generateIntegration(sunSign: string, moonSign: string | null, risingSign: string | null): string {
  if (!moonSign || !risingSign) {
    return getIntegrationWithoutMoonRising(sunSign);
  }

  const sunStyle = getProcessingStyle(sunSign);
  const moonStyle = getProcessingStyle(moonSign);
  const risingStyle = getProcessingStyle(risingSign);

  // All same style - coherent
  if (sunStyle === moonStyle && moonStyle === risingStyle) {
    return getCoherentIntegration(sunSign, moonSign, risingSign, sunStyle);
  }

  // Two match, one different - dominant with contrast
  if (sunStyle === moonStyle || sunStyle === risingStyle || moonStyle === risingStyle) {
    return getDominantIntegration(sunSign, moonSign, risingSign, sunStyle, moonStyle, risingStyle);
  }

  // All different - complex
  return getComplexIntegration(sunSign, moonSign, risingSign, sunStyle, moonStyle, risingStyle);
}

function getIntegrationWithoutMoonRising(sunSign: string): string {
  const style = getProcessingStyle(sunSign);
  const descriptions: Record<ProcessingStyle, string> = {
    thinking: `You move through life led by understanding, perspective, and ideas. Without birth time, we can't see the full picture of how your emotional world and social presentation interact with this mental orientation.`,
    feeling: `You move through life led by intuition, emotional depth, and sensitivity. Without birth time, we can't see the full picture of how your emotional world and social presentation interact with this feeling-centered core.`,
    doing: `You move through life led by action, expression, and forward momentum. Without birth time, we can't see the full picture of how your emotional world and social presentation interact with this active core.`,
    grounding: `You move through life led by practicality, stability, and tangible results. Without birth time, we can't see the full picture of how your emotional world and social presentation interact with this grounded core.`,
  };
  return descriptions[style];
}

function getCoherentIntegration(sun: string, moon: string, rising: string, style: ProcessingStyle): string {
  const descriptions: Record<ProcessingStyle, string> = {
    thinking: `You move through life led by understanding, perspective, and dialogue. Internally, you prefer to think things through. Externally, you present as curious and engaged. This creates coherence. You know who you are and rarely feel pulled in conflicting directions. The challenge is staying connected to feeling when thinking comes so naturally.`,
    feeling: `You move through life led by intuition, emotional depth, and sensitivity. Internally and externally, you navigate through feeling first. This creates coherence. You trust your instincts and rarely disconnect from your emotional reality. The challenge is knowing where you end and others begin.`,
    doing: `You move through life led by action, expression, and momentum. Internally, you want to move. Externally, you appear ready to engage. This creates coherence. You know who you are and act on it. The challenge is pausing long enough to let others catch up.`,
    grounding: `You move through life led by practicality, patience, and tangible results. Internally and externally, you value what's real and lasting. This creates coherence. You're reliable and grounded. The challenge is trusting what can't be measured or built.`,
  };
  return descriptions[style];
}

function getDominantIntegration(sun: string, moon: string, rising: string, sunStyle: ProcessingStyle, moonStyle: ProcessingStyle, risingStyle: ProcessingStyle): string {
  // Find the dominant and outlier
  let dominant: ProcessingStyle;
  let outlierStyle: ProcessingStyle;
  let outlierArea: string;

  if (sunStyle === moonStyle) {
    dominant = sunStyle;
    outlierStyle = risingStyle;
    outlierArea = "how you present to others";
  } else if (sunStyle === risingStyle) {
    dominant = sunStyle;
    outlierStyle = moonStyle;
    outlierArea = "your emotional life";
  } else {
    dominant = moonStyle;
    outlierStyle = sunStyle;
    outlierArea = "your core identity";
  }

  return generateDominantText(dominant, outlierStyle, outlierArea);
}

function generateDominantText(dominant: ProcessingStyle, outlier: ProcessingStyle, outlierArea: string): string {
  const dominantDescriptions: Record<ProcessingStyle, string> = {
    thinking: "You move through life led by understanding, perspective, and dialogue",
    feeling: "You move through life led by intuition, depth, and emotional awareness",
    doing: "You move through life led by action, expression, and momentum",
    grounding: "You move through life led by practicality, patience, and building",
  };

  const outlierContributions: Record<ProcessingStyle, Partial<Record<ProcessingStyle, string>>> = {
    thinking: {
      feeling: `But ${outlierArea} brings emotional depth that your mental orientation doesn't always make space for. Sometimes the heart knows what the mind hasn't articulated yet.`,
      doing: `But ${outlierArea} wants action where analysis might suffice. This creates productive urgency that can cut through overthinking.`,
      grounding: `But ${outlierArea} wants tangible results, not just understanding. Ideas need to become real to feel complete.`,
    },
    feeling: {
      thinking: `But ${outlierArea} processes through ideas and perspective. You can observe your feelings as well as feel them.`,
      doing: `But ${outlierArea} wants expression and action. Your feelings have force behind them.`,
      grounding: `But ${outlierArea} grounds your sensitivity in practical reality. Feeling becomes doing becomes structure.`,
    },
    doing: {
      thinking: `But ${outlierArea} wants to understand before acting. Sometimes thinking and doing compete for priority.`,
      feeling: `But ${outlierArea} runs deeper than your momentum suggests. There's emotional complexity beneath the directness.`,
      grounding: `But ${outlierArea} wants stability and foundation. You can't always run at full speed.`,
    },
    grounding: {
      thinking: `But ${outlierArea} lives in ideas and possibilities. You think about what you're building as much as you build it.`,
      feeling: `But ${outlierArea} feels more than your steady exterior suggests. There's emotional depth beneath the practicality.`,
      doing: `But ${outlierArea} craves movement and expression. You can feel restless within your own stability.`,
    },
  };

  const contrast = outlierContributions[dominant][outlier] || "";

  return `${dominantDescriptions[dominant]}, while presenting yourself with openness and engagement.

Internally, you prefer to process things ${dominant === 'thinking' ? 'mentally' : dominant === 'feeling' ? 'emotionally' : dominant === 'doing' ? 'through action' : 'practically'}. ${contrast}

This contrast can create tension at times, but it also provides balance, a way to break out of your default mode when something different is needed.`;
}

function getComplexIntegration(sun: string, moon: string, rising: string, sunStyle: ProcessingStyle, moonStyle: ProcessingStyle, risingStyle: ProcessingStyle): string {
  const styleDescriptions: Record<ProcessingStyle, string> = {
    thinking: "understanding and perspective",
    feeling: "intuition and emotional depth",
    doing: "action and momentum",
    grounding: "practicality and stability",
  };

  return `You move through life led by ${styleDescriptions[sunStyle]}, while your emotional world operates through ${styleDescriptions[moonStyle]}, and you present to others with ${styleDescriptions[risingStyle]}.

These don't always speak the same language, which means you're complex, capable of different modes depending on context. Sometimes you might feel like different versions of yourself exist in different settings.

This isn't fragmentation. It's range. You have access to multiple ways of being, and the challenge is integration rather than choosing one.`;
}

// Central tension generator - NO element language
export function generateCentralTension(sunSign: string, moonSign: string | null, risingSign: string | null): string {
  if (!moonSign) {
    return getTensionFromSun(sunSign);
  }

  const sunStyle = getProcessingStyle(sunSign);
  const moonStyle = getProcessingStyle(moonSign);

  // Thinking sun + feeling moon
  if (sunStyle === 'thinking' && moonStyle === 'feeling') {
    return "You value emotional connection, but you're often more fluent in ideas than intimacy. This can look like staying thoughtful and reasonable when what's actually needed is presence, messiness, or emotional risk. You don't avoid feelings, but you prefer to understand them before sitting fully inside them.";
  }

  // Thinking sun + thinking moon
  if (sunStyle === 'thinking' && moonStyle === 'thinking') {
    return "You value connection and understanding, but you can linger in analysis. This can look like explaining feelings instead of sitting with them, or keeping conversation going to avoid the quiet moments where emotions surface. You're not emotionally distant. You're processing in real time.";
  }

  // Doing sun + feeling moon
  if (sunStyle === 'doing' && moonStyle === 'feeling') {
    return "You project confidence and momentum, but underneath you feel more than you show. This can look like charging ahead while privately processing complex emotions alone. You're not as simple as you appear. There's depth beneath the directness that others might miss.";
  }

  // Doing sun + grounding moon
  if (sunStyle === 'doing' && moonStyle === 'grounding') {
    return "You want to move fast, but you need stability to feel secure. This can create stop-start patterns, bursts of action followed by the need to consolidate. You're not indecisive, but you're learning to balance initiative with foundation.";
  }

  // Grounding sun + doing moon
  if (sunStyle === 'grounding' && moonStyle === 'doing') {
    return "You build carefully, but emotionally you crave excitement and recognition. This can look like maintaining a steady exterior while feeling restless or underappreciated inside. You're more passionate than your practical surface suggests.";
  }

  // Grounding sun + thinking moon
  if (sunStyle === 'grounding' && moonStyle === 'thinking') {
    return "You value tangible results, but your emotional life lives in ideas and connection. This can create tension between doing and thinking, between what's practical and what's interesting. You're grounded but not simple.";
  }

  // Feeling sun + doing moon
  if (sunStyle === 'feeling' && moonStyle === 'doing') {
    return "You feel deeply, but you express with intensity that can surprise people expecting softness. This can look like emotional reactions that seem disproportionate to the trigger. You're not overreacting. You're feeling at full volume.";
  }

  // Feeling sun + thinking moon
  if (sunStyle === 'feeling' && moonStyle === 'thinking') {
    return "You're deeply intuitive, but you process emotionally through thinking and talking. This can look like analyzing your way through feelings rather than surrendering to them. You're not detached. You just need to understand.";
  }

  // Same style - internal coherence tension
  if (sunStyle === moonStyle) {
    return getSameStyleTension(sunStyle);
  }

  return getGenericTension(sunSign, moonSign);
}

function getTensionFromSun(sunSign: string): string {
  const tensions: Record<string, string> = {
    Aries: "You want to move forward, but life keeps asking you to consider others' pace. The tension is between independence and connection.",
    Taurus: "You want stability, but growth requires change. The tension is between security and evolution.",
    Gemini: "You want to know everything, but depth requires focus. The tension is between breadth and commitment.",
    Cancer: "You want to protect and nurture, but others need space to make their own mistakes. The tension is between care and control.",
    Leo: "You want to be seen and appreciated, but authentic expression doesn't always get applause. The tension is between recognition and integrity.",
    Virgo: "You want to improve everything, but perfection is impossible. The tension is between standards and acceptance.",
    Libra: "You want harmony, but authentic relationships include conflict. The tension is between peace and truth.",
    Scorpio: "You want depth and truth, but vulnerability requires trust that hasn't been tested. The tension is between intimacy and self-protection.",
    Sagittarius: "You want freedom and meaning, but some meaning only comes from commitment. The tension is between expansion and depth.",
    Capricorn: "You want achievement and respect, but worth isn't earned through accomplishment alone. The tension is between doing and being.",
    Aquarius: "You want to improve things, but change requires engaging with how things feel, not just how they work. The tension is between ideas and intimacy.",
    Pisces: "You want to merge and transcend, but you're also an individual with needs. The tension is between dissolution and self-definition.",
  };
  return tensions[sunSign] || "The tension is between who you are and who you're becoming.";
}

function getSameStyleTension(style: ProcessingStyle): string {
  const tensions: Record<ProcessingStyle, string> = {
    thinking: "All that mental clarity creates perspective but can become detachment. The tension is learning to land in your body, to feel without analyzing, to trust that presence doesn't require understanding.",
    feeling: "All that emotional depth creates sensitivity but can become overwhelm. The tension is learning where you end and others begin, trusting that boundaries don't diminish connection.",
    doing: "All that momentum creates coherence but can become intensity. The tension is learning to pause, to let others catch up, to trust that your spark won't go out if you slow down.",
    grounding: "All that stability creates reliability but can become rigidity. The tension is learning to trust change, to let go of what no longer serves, to believe that your foundation will hold through transition.",
  };
  return tensions[style];
}

function getGenericTension(sunSign: string, moonSign: string): string {
  return `Your ${sunSign} core wants one thing, while your ${moonSign} emotional needs want another. This isn't a problem to solve. It's a conversation to keep having. The tension keeps you growing.`;
}

// Day to day patterns - NO element language
export function generateDayToDay(sunSign: string, moonSign: string | null): string {
  if (!moonSign) {
    return getDayToDayFromSun(sunSign);
  }

  const sunStyle = getProcessingStyle(sunSign);
  const moonStyle = getProcessingStyle(moonSign);

  const patterns: string[] = [];

  // Thinking-influenced patterns
  if (sunStyle === 'thinking' || moonStyle === 'thinking') {
    patterns.push("Conversations feel safer than silence");
    patterns.push("Clarity arrives faster than emotional certainty");
  }

  // Feeling-influenced patterns
  if (sunStyle === 'feeling' || moonStyle === 'feeling') {
    patterns.push("You absorb others' moods without realizing it");
    patterns.push("Alone time isn't optional. It's how you process");
  }

  // Doing-influenced patterns
  if (sunStyle === 'doing' || moonStyle === 'doing') {
    patterns.push("Waiting feels harder than acting, even when action isn't needed");
    patterns.push("You start more things than you finish");
  }

  // Grounding-influenced patterns
  if (sunStyle === 'grounding' || moonStyle === 'grounding') {
    patterns.push("You need to see progress to feel okay");
    patterns.push("Change takes longer to accept than others expect");
  }

  // Add contrast pattern if styles differ
  if (sunStyle !== moonStyle) {
    patterns.push(getContrastPattern(sunStyle, moonStyle));
  }

  return patterns.slice(0, 4).join("\n• ");
}

function getDayToDayFromSun(sunSign: string): string {
  const patterns: Record<string, string> = {
    Aries: "Impatience surfaces when things move too slowly\n• You'd rather do something wrong than wait to do it right\n• Boredom feels more unbearable than difficulty",
    Taurus: "You resist change even when you know it's needed\n• Physical comfort affects your mood more than you admit\n• Rushing makes everything worse",
    Gemini: "Your mind runs faster than your circumstances allow\n• You need to talk through things to know what you think\n• Boredom is the enemy, not difficulty",
    Cancer: "You take care of others before yourself without noticing\n• The past lives vividly in your present\n• Home isn't just a place. It's a feeling you carry",
    Leo: "You notice when you're not appreciated\n• Creating something feels better than consuming something\n• You perform even when no one's watching",
    Virgo: "You notice flaws before you notice strengths\n• 'Good enough' doesn't feel good enough\n• Helping others feels easier than accepting help",
    Libra: "You keep the peace at your own expense\n• Decisions feel harder than they should\n• Conflict affects you more than you show",
    Scorpio: "You notice what people aren't saying\n• Trust takes longer to build than others realize\n• You remember everything, especially betrayal",
    Sagittarius: "Routine feels like slow death\n• You overpromise because possibility feels more real than limitation\n• Staying put is harder than moving",
    Capricorn: "Rest feels earned, not given\n• You measure your day by what you accomplished\n• Vulnerability feels like weakness even when it isn't",
    Aquarius: "You feel more comfortable with groups than individuals\n• You question things others accept without thought\n• Emotional intensity makes you step back",
    Pisces: "You absorb emotions that aren't yours\n• Fantasy and reality blend together\n• Boundaries require conscious effort",
  };
  return patterns[sunSign] || "Pay attention to what drains you and what restores you.";
}

function getContrastPattern(sunStyle: ProcessingStyle, moonStyle: ProcessingStyle): string {
  const patterns: Record<ProcessingStyle, Partial<Record<ProcessingStyle, string>>> = {
    thinking: {
      feeling: "You stay engaged mentally while something remains unfelt",
      doing: "You think through things that want to be acted on immediately",
      grounding: "You have ideas that haven't found practical form yet",
    },
    feeling: {
      thinking: "You analyze feelings as a way of managing them",
      doing: "Your feelings come out more intensely than you intend",
      grounding: "You feel deeply but ground it in practical response",
    },
    doing: {
      thinking: "You act on ideas before fully thinking them through",
      feeling: "You appear confident while feeling more complicated underneath",
      grounding: "You start things before you've prepared for them",
    },
    grounding: {
      thinking: "You want to build while your mind wants to explore",
      feeling: "You maintain composure while feeling more than you show",
      doing: "You feel restless within your own stability",
    },
  };
  return patterns[sunStyle]?.[moonStyle] || "You navigate between different ways of being";
}

// Balance statement - NO element language
export function generateBalanceStatement(sunSign: string, moonSign: string | null, risingSign: string | null): string {
  if (!moonSign || !risingSign) {
    return getBalanceFromSun(sunSign);
  }

  const sunStyle = getProcessingStyle(sunSign);
  const moonStyle = getProcessingStyle(moonSign);

  // Generate based on style combinations
  if (sunStyle === 'thinking') {
    if (moonStyle === 'feeling') return "When balanced, this operating system makes you insightful, fair-minded, and emotionally intelligent. When strained, it can create emotional distance without you intending to pull away.";
    if (moonStyle === 'doing') return "When balanced, this operating system makes you visionary, quick, and inspiring. When strained, it can scatter your energy across too many directions.";
    if (moonStyle === 'grounding') return "When balanced, this operating system makes you thoughtful, practical, and grounded in ideas that work. When strained, it can make you overthink simple things.";
    return "When balanced, this operating system makes you perceptive, articulate, and mentally agile. When strained, it pulls you too far into your head.";
  }

  if (sunStyle === 'doing') {
    if (moonStyle === 'feeling') return "When balanced, this operating system makes you passionate, intuitive, and deeply felt. When strained, it can create intensity that overwhelms yourself and others.";
    if (moonStyle === 'thinking') return "When balanced, this operating system makes you dynamic, inspiring, and intellectually engaged. When strained, it can make you impulsive or scattered.";
    if (moonStyle === 'grounding') return "When balanced, this operating system makes you capable, driven, and able to turn vision into reality. When strained, it can create frustration when progress feels too slow.";
    return "When balanced, this operating system makes you confident, warm, and energizing to be around. When strained, it can burn too hot too fast.";
  }

  if (sunStyle === 'grounding') {
    if (moonStyle === 'feeling') return "When balanced, this operating system makes you reliable, emotionally intelligent, and capable of building things that matter. When strained, it can make you hold on too long to what needs to change.";
    if (moonStyle === 'doing') return "When balanced, this operating system makes you capable, passionate, and able to sustain effort on what matters. When strained, it can create internal conflict between stability and adventure.";
    if (moonStyle === 'thinking') return "When balanced, this operating system makes you practical, thoughtful, and able to ground ideas in reality. When strained, it can make you either too rigid or too theoretical.";
    return "When balanced, this operating system makes you steady, trustworthy, and effective. When strained, it can make you resistant to necessary change.";
  }

  // Feeling sun
  if (moonStyle === 'doing') return "When balanced, this operating system makes you emotionally courageous, intuitive, and passionately engaged. When strained, it can create emotional volatility.";
  if (moonStyle === 'thinking') return "When balanced, this operating system makes you empathic, perceptive, and able to articulate deep feelings. When strained, it can make you analyze feelings instead of feeling them.";
  if (moonStyle === 'grounding') return "When balanced, this operating system makes you nurturing, practical, and able to create emotional safety with structure. When strained, it can make you overprotective or stuck.";
  return "When balanced, this operating system makes you deeply intuitive, emotionally intelligent, and compassionate. When strained, it can blur boundaries and overwhelm.";
}

function getBalanceFromSun(sunSign: string): string {
  const balances: Record<string, string> = {
    Aries: "When balanced, you're courageous, honest, and energizing. When strained, you can be impulsive or insensitive to others' pace.",
    Taurus: "When balanced, you're steady, reliable, and deeply present. When strained, you can be stubborn or resistant to necessary change.",
    Gemini: "When balanced, you're curious, adaptable, and intellectually alive. When strained, you can be scattered or emotionally evasive.",
    Cancer: "When balanced, you're nurturing, intuitive, and emotionally intelligent. When strained, you can be moody or overly protective.",
    Leo: "When balanced, you're generous, warm, and creatively expressed. When strained, you can be attention-seeking or prideful.",
    Virgo: "When balanced, you're helpful, precise, and genuinely useful. When strained, you can be critical or anxiously perfectionist.",
    Libra: "When balanced, you're graceful, fair, and relationship-oriented. When strained, you can be indecisive or people-pleasing.",
    Scorpio: "When balanced, you're perceptive, loyal, and emotionally brave. When strained, you can be controlling or secretive.",
    Sagittarius: "When balanced, you're optimistic, wise, and adventure-seeking. When strained, you can be preachy or commitment-averse.",
    Capricorn: "When balanced, you're capable, respected, and quietly powerful. When strained, you can be cold or work-obsessed.",
    Aquarius: "When balanced, you're innovative, principled, and genuinely helpful. When strained, you can be detached or contrarian.",
    Pisces: "When balanced, you're compassionate, creative, and spiritually attuned. When strained, you can be escapist or boundary-less.",
  };
  return balances[sunSign] || "Balance comes from accepting all parts of yourself.";
}

// Report framing - NO element language
export function generateReportFraming(sunSign: string, moonSign: string | null): string {
  if (!moonSign) {
    return `This report will explore how your nature expresses itself across different life areas: relationships, work, stress, growth.`;
  }

  const sunStyle = getProcessingStyle(sunSign);
  const moonStyle = getProcessingStyle(moonSign);

  if (sunStyle === 'thinking' && moonStyle === 'feeling') {
    return "This report will keep returning to that balance point: how to stay emotionally present without giving up your independence or perspective.";
  }

  if (sunStyle === 'thinking' && moonStyle === 'thinking') {
    return "This report will keep returning to that balance point: how to stay connected to feeling without losing your clarity of thought.";
  }

  if (sunStyle === 'doing' && moonStyle === 'feeling') {
    return "This report will keep returning to that balance point: how to honor your emotional depth without dampening your momentum.";
  }

  if (sunStyle === 'doing' && moonStyle === 'grounding') {
    return "This report will keep returning to that balance point: how to maintain your foundation without losing your spark.";
  }

  if (sunStyle === 'grounding' && moonStyle === 'doing') {
    return "This report will keep returning to that balance point: how to stay grounded without becoming stuck.";
  }

  if (sunStyle === 'feeling' && moonStyle === 'thinking') {
    return "This report will keep returning to that balance point: how to honor your intuition while making sense of what you feel.";
  }

  return `This report will keep returning to that balance point: how to integrate who you are with what you need.`;
}
