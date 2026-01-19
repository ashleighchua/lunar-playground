// Self-Reflection Questions for each section of the Birth Report
// These prompts encourage deeper engagement with the insights

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
                  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

// Operating System Reflection Questions
export const operatingSystemQuestions: Record<ZodiacSign, string[]> = {
  Aries: [
    "When was the last time you acted on an impulse that turned out to be exactly right?",
    "What happens in your body when someone asks you to slow down or wait?",
    "How do you balance your need for independence with your desire for connection?",
  ],
  Taurus: [
    "What does genuine security feel like in your body?",
    "When has your resistance to change actually protected something important?",
    "How do you distinguish between healthy stability and stuck-ness?",
  ],
  Gemini: [
    "What topics can you explore endlessly without losing interest?",
    "When does your curiosity serve you, and when does it scatter your energy?",
    "How do you feel when you're forced to commit to just one option?",
  ],
  Cancer: [
    "Where do you feel most at home, and what makes it feel that way?",
    "How do you know when you're nurturing others versus avoiding your own needs?",
    "What does it take for you to feel truly safe with someone?",
  ],
  Leo: [
    "What kind of recognition actually feeds your soul?",
    "When has sharing your light helped others find theirs?",
    "How do you feel when no one is watching?",
  ],
  Virgo: [
    "What's something you've improved that you're quietly proud of?",
    "When does your attention to detail help, and when does it hold you back?",
    "How do you treat yourself when you don't meet your own standards?",
  ],
  Libra: [
    "What's a belief you hold that you're willing to stand by, even if others disagree?",
    "How do you know when you're seeking harmony versus avoiding conflict?",
    "When was the last time you chose yourself over keeping the peace?",
  ],
  Scorpio: [
    "What's a truth about yourself that took courage to accept?",
    "How do you know when to trust someone with your depth?",
    "When has letting go transformed something in your life?",
  ],
  Sagittarius: [
    "What question has driven much of your life journey?",
    "How do you balance your need for freedom with your commitments?",
    "When has an adventure taught you something you couldn't learn any other way?",
  ],
  Capricorn: [
    "What achievement would feel meaningful even if no one else noticed?",
    "How do you know when discipline serves you versus depletes you?",
    "What would you build if you knew you couldn't fail?",
  ],
  Aquarius: [
    "What makes you feel like you truly belong?",
    "How do you balance being different with being connected?",
    "What change do you want to see that you're uniquely positioned to contribute to?",
  ],
  Pisces: [
    "How do you distinguish between your feelings and those you've absorbed from others?",
    "What does healthy escapism look like for you?",
    "When has your intuition guided you somewhere logic couldn't?",
  ],
};

// Emotional Pattern Reflection Questions
export const emotionalPatternQuestions: Record<ZodiacSign, string[]> = {
  Aries: [
    "What physical sensations do you notice when anger or frustration is building?",
    "How do you return to calm after an emotional surge?",
  ],
  Taurus: [
    "What helps you process a feeling you're not ready to act on yet?",
    "How do you know when you're holding onto an emotion past its usefulness?",
  ],
  Gemini: [
    "When do you need to think through an emotion versus simply feel it?",
    "What helps you stay present when feelings become uncomfortable?",
  ],
  Cancer: [
    "How do you protect your emotional energy without shutting down?",
    "What does it feel like when you finally release an emotion you've been holding?",
  ],
  Leo: [
    "How do you express difficult emotions without performing them?",
    "What does it feel like to be emotionally seen by someone you trust?",
  ],
  Virgo: [
    "When has analyzing an emotion helped you understand it? When has it kept you from feeling it?",
    "What does emotional 'good enough' look like for you?",
  ],
  Libra: [
    "How do you give yourself permission to feel emotions that seem unfair or unbalanced?",
    "What happens when you stop trying to smooth over a difficult feeling?",
  ],
  Scorpio: [
    "How do you know when to dive deeper into an emotion versus when to surface?",
    "What has your intensity taught you that nothing else could?",
  ],
  Sagittarius: [
    "How do you sit with difficult emotions instead of escaping into optimism?",
    "What's an emotion you've learned to find meaning in?",
  ],
  Capricorn: [
    "Where do your postponed emotions tend to show up eventually?",
    "What would it mean to let yourself feel without first being productive?",
  ],
  Aquarius: [
    "What helps you bridge the gap between understanding an emotion and actually feeling it?",
    "When has emotional distance served you? When has it cost you?",
  ],
  Pisces: [
    "How do you know which emotions are yours?",
    "What practices help you clear emotional energy that isn't yours to carry?",
  ],
};

// Relationship Reflection Questions
export const relationshipQuestions: Record<ZodiacSign, string[]> = {
  Aries: [
    "How do you show up for someone without trying to fix their problems?",
    "What does partnership look like when you're both leading?",
  ],
  Taurus: [
    "How do you stay open to change in a long-term relationship?",
    "What does it take for you to feel truly provided for?",
  ],
  Gemini: [
    "How do you maintain connection when conversation alone isn't enough?",
    "What does commitment feel like in your body?",
  ],
  Cancer: [
    "How do you ask for nurturing without feeling like a burden?",
    "What boundaries protect your relationships rather than limit them?",
  ],
  Leo: [
    "How do you shine in a relationship without overshadowing your partner?",
    "What does it look like when love isn't being performed?",
  ],
  Virgo: [
    "How do you show love without trying to improve your partner?",
    "What would it mean to be accepted exactly as you are?",
  ],
  Libra: [
    "How do you voice disagreement without threatening the relationship?",
    "What does it look like to be fully yourself in partnership?",
  ],
  Scorpio: [
    "How do you trust incrementally instead of all-or-nothing?",
    "What does healthy vulnerability feel like for you?",
  ],
  Sagittarius: [
    "How do you stay present in a relationship when the horizon calls?",
    "What does freedom look like within commitment?",
  ],
  Capricorn: [
    "How do you let someone care for you without earning it?",
    "What does emotional presence look like when productivity isn't the goal?",
  ],
  Aquarius: [
    "How do you balance intimacy with your need for space?",
    "What does belonging feel like in your closest relationships?",
  ],
  Pisces: [
    "How do you love someone without losing yourself?",
    "What does a healthy boundary feel like (versus a wall or a door)?",
  ],
};

// Work & Impact Reflection Questions
export const workQuestions: Record<ZodiacSign, string[]> = {
  Aries: [
    "What kind of work makes you feel most alive?",
    "How do you sustain momentum on projects that take longer than your initial enthusiasm?",
  ],
  Taurus: [
    "What's worth building that would take years of patient effort?",
    "How do you know when persistence becomes stubbornness?",
  ],
  Gemini: [
    "How do you create depth in your work while honoring your need for variety?",
    "What would it look like to integrate your many interests?",
  ],
  Cancer: [
    "What impact would feel like home to you?",
    "How do you protect your work from becoming a way to be needed?",
  ],
  Leo: [
    "What work would you do even if you received no recognition?",
    "How does your leadership style change when you're confident versus seeking validation?",
  ],
  Virgo: [
    "What would 'good enough' look like in your most important work?",
    "How do you celebrate completion when there's always more to improve?",
  ],
  Libra: [
    "What cause or creation deserves your full commitment?",
    "How do you make decisive moves when multiple paths seem equally valid?",
  ],
  Scorpio: [
    "What work allows you to go deep without depleting yourself?",
    "How do you channel your intensity productively when the environment doesn't match it?",
  ],
  Sagittarius: [
    "What wisdom have you earned that's worth teaching?",
    "How do you ground your big visions in sustainable action?",
  ],
  Capricorn: [
    "What would you pursue if success were guaranteed?",
    "How do you rest without feeling like you're falling behind?",
  ],
  Aquarius: [
    "What systems need changing that you're uniquely positioned to address?",
    "How do you balance innovation with implementation?",
  ],
  Pisces: [
    "What work lets you contribute without losing your boundaries?",
    "How do you translate your creative visions into tangible impact?",
  ],
};

// Shadow & Growth Reflection Questions
export const shadowQuestions: Record<ZodiacSign, string[]> = {
  Aries: [
    "What triggers your aggression, and what need is actually underneath it?",
    "When has slowing down revealed something important?",
  ],
  Taurus: [
    "What are you holding onto that no longer serves you?",
    "When has change led somewhere better than stability could have?",
  ],
  Gemini: [
    "What are you avoiding by staying busy or distracted?",
    "What would it mean to go deep instead of wide?",
  ],
  Cancer: [
    "When does nurturing others become a way to avoid your own needs?",
    "What would it mean to receive care without feeling obligated to return it immediately?",
  ],
  Leo: [
    "What happens when you don't get the recognition you hoped for?",
    "When has your light been about others, not about being seen?",
  ],
  Virgo: [
    "What would self-compassion look like when you fall short?",
    "When has imperfection led somewhere useful?",
  ],
  Libra: [
    "What conflict are you avoiding that actually needs to happen?",
    "When has choosing a side led to deeper connection?",
  ],
  Scorpio: [
    "What are you protecting by maintaining control?",
    "When has surrender led somewhere powerful?",
  ],
  Sagittarius: [
    "What truth are you avoiding by staying in motion?",
    "When has staying somewhere taught you more than leaving?",
  ],
  Capricorn: [
    "What would you do if achievement weren't the goal?",
    "When has showing vulnerability led to real connection?",
  ],
  Aquarius: [
    "What are you protecting by staying detached?",
    "When has being ordinary led to genuine belonging?",
  ],
  Pisces: [
    "What reality are you escaping from, and what does it need from you?",
    "When has saying no led to deeper yes?",
  ],
};
