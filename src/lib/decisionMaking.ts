// Decision Making content based on Mercury (how you process) and Sun (core identity)

export const decisionStyle: Record<string, string> = {
  Aries: `You decide fast and trust your gut. When something feels right, you move. Deliberation feels like stalling. Your best decisions come from that initial flash of clarity, before doubt creeps in.

The challenge: sometimes that flash is impulse, not intuition. Learning to distinguish between "I want this now" and "this is actually right for me" is your growth edge.`,

  Taurus: `You decide slowly and that's not a flaw. You need to sit with options, feel them out, let your body tell you what's right. Rushing leads to regret; patience leads to choices you can stand behind for years.

The challenge: sometimes slow becomes stuck. If you've been "thinking about it" for months, that's not deliberation, that's avoidance. Notice when patience becomes procrastination.`,

  Gemini: `You decide by exploring every angle, talking it through, gathering information. You need to understand all the options before committing. Your mind works by comparison and contrast.

The challenge: analysis paralysis is real for you. At some point, more information doesn't help, it just delays. Sometimes the "wrong" choice made confidently beats the "right" choice never made.`,

  Cancer: `You decide by feeling. Logic matters, but ultimately you need to sense whether something is safe, whether it feels like home, whether it protects what you care about. Your gut knows before your mind does.

The challenge: fear can masquerade as intuition. "This doesn't feel right" sometimes means "this is unfamiliar." Learning to distinguish between genuine warning and comfort-zone protection is key.`,

  Leo: `You decide by checking whether something aligns with who you want to be. Does this choice reflect your values? Does it feel authentic? Would you be proud to stand behind it? That's your compass.

The challenge: sometimes ego gets involved. "What will people think?" can override "what do I actually want?" Your best decisions come when you're honest about your motivations.`,

  Virgo: `You decide by breaking things down, analyzing pros and cons, considering practical implications. You need to see how the pieces fit together before committing. Detail orientation is your strength.

The challenge: perfectionism can paralyze. If you're waiting for the "perfect" choice with no downsides, you'll wait forever. Good enough, acted on, beats perfect, postponed.`,

  Libra: `You decide by weighing, balancing, considering all perspectives. Fairness matters. You want choices that work for everyone involved, that create harmony rather than conflict.

The challenge: trying to please everyone means pleasing no one, including yourself. Sometimes the right choice will disappoint someone. That doesn't make it wrong.`,

  Scorpio: `You decide by going deep. Surface-level pros and cons don't satisfy you. You need to understand the underlying dynamics, the hidden implications, what's really at stake. You trust your penetrating intuition.

The challenge: sometimes you overcomplicate simple choices. Not everything has hidden layers. And sometimes the "safe" choice that protects you also keeps you stuck.`,

  Sagittarius: `You decide by asking: does this expand my world or shrink it? You're drawn to choices that open doors, create possibilities, lead to growth. Adventure calls louder than security.

The challenge: optimism can blind you to real risks. "It'll work out" isn't always true. Your best decisions balance possibility with practicality.`,

  Capricorn: `You decide by considering long-term implications. You're playing chess, not checkers, thinking three moves ahead. You want choices that build toward something, that create lasting value.

The challenge: being too strategic can disconnect you from what you actually want. Sometimes the "smart" choice isn't the right one for your soul. Allow room for the impractical.`,

  Aquarius: `You decide by stepping back and looking at the big picture. You consider unconventional options others dismiss. You're not swayed by "that's how it's always been done."

The challenge: being contrarian for its own sake isn't wisdom. Sometimes the conventional choice is conventional because it works. Rebel with reason, not just reflex.`,

  Pisces: `You decide by feeling into possibilities, sensing which path has the right energy. You're guided by something beyond logic: intuition, dreams, a knowing that's hard to articulate but impossible to ignore.

The challenge: wishful thinking can masquerade as intuition. "I want this to be true" feels similar to "this is true." Grounding your visions in reality makes them more likely to manifest.`,
};

export const decisionTriggers: Record<string, string[]> = {
  Aries: [
    "When you feel energized by the possibility",
    "When your body says 'yes' before your mind catches up",
    "When waiting feels more painful than any outcome",
  ],
  Taurus: [
    "When you can imagine living with this choice long-term",
    "When your body relaxes rather than tenses",
    "When the practical details actually work",
  ],
  Gemini: [
    "When you can articulate why this makes sense",
    "When you've talked it through and still feel good",
    "When curiosity outweighs anxiety",
  ],
  Cancer: [
    "When it feels safe in your gut, not just your head",
    "When you can picture the people you love being okay with this",
    "When it aligns with your emotional truth",
  ],
  Leo: [
    "When you'd be proud to tell people about this choice",
    "When it reflects who you really are",
    "When your heart lights up at the possibility",
  ],
  Virgo: [
    "When you've done your due diligence",
    "When the plan is clear, even if not perfect",
    "When the potential benefits outweigh the certain costs",
  ],
  Libra: [
    "When you've genuinely considered all perspectives",
    "When you can defend this choice to yourself",
    "When peace comes from deciding, not avoiding",
  ],
  Scorpio: [
    "When you trust your read on the situation",
    "When you've looked at the shadow side and accepted it",
    "When transformation feels more important than comfort",
  ],
  Sagittarius: [
    "When it opens more doors than it closes",
    "When you can see the adventure in it",
    "When it aligns with your bigger vision",
  ],
  Capricorn: [
    "When it serves your long-term goals",
    "When you can commit to seeing it through",
    "When the structure supports the ambition",
  ],
  Aquarius: [
    "When it aligns with your values, not just expectations",
    "When you've questioned the assumptions",
    "When it feels true to your authentic self",
  ],
  Pisces: [
    "When your intuition is clear, not clouded by fear or desire",
    "When the energy of the choice feels right",
    "When you can surrender the outcome while committing to the path",
  ],
};

export const decisionBlindSpots: Record<string, string> = {
  Aries: "You might miss important details in your rush to act. Slow down just enough to consider what you're not seeing.",
  Taurus: "You might cling to the familiar when change is actually needed. Ask yourself: is this stability or stagnation?",
  Gemini: "You might intellectualize away your true feelings. What does your body know that your mind is ignoring?",
  Cancer: "You might let fear veto growth. Not all discomfort is danger. Some is just the feeling of expanding.",
  Leo: "You might avoid choices that don't have an audience. What would you decide if no one was watching?",
  Virgo: "You might get lost in details and miss the forest for the trees. What matters most here, really?",
  Libra: "You might defer to others to avoid responsibility for the outcome. What do YOU want?",
  Scorpio: "You might see threats that aren't there or miss them because you're focused elsewhere. Check your paranoia calibration.",
  Sagittarius: "You might overlook practical constraints in pursuit of possibility. Freedom needs a foundation.",
  Capricorn: "You might choose duty over desire so often you forget what you actually want. Goals aren't the whole picture.",
  Aquarius: "You might dismiss emotional factors as irrational. Your feelings are data too.",
  Pisces: "You might confuse what you hope for with what is. Ground your intuition in observable reality.",
};

export const decisionReframe: Record<string, string> = {
  Aries: "A good decision isn't always a fast one, but a fast decision isn't always bad. Trust your instincts AND give them a moment to mature.",
  Taurus: "Taking your time is wisdom, not weakness. But when you know, you know, so don't let comfort keep you from commitment.",
  Gemini: "You don't need to know everything to decide well. You need to know enough, and you probably already do.",
  Cancer: "Your feelings are valid data, but they're not the only data. Safety isn't the only value worth protecting.",
  Leo: "The right choice might not be the impressive one. Authenticity trumps appearance every time.",
  Virgo: "Imperfect action beats perfect paralysis. You can course-correct, but only if you start moving.",
  Libra: "Choosing is not the same as closing doors forever. Most decisions are more reversible than they feel.",
  Scorpio: "Not every choice is life-or-death. Some things can just be... choices. Let some decisions be light.",
  Sagittarius: "Commitment isn't a cage; it's a launchpad. The best adventures require saying no to some things.",
  Capricorn: "Not every decision needs to be strategic. Sometimes the right choice is just the one that makes you come alive.",
  Aquarius: "Being different isn't always better. Sometimes the conventional path exists because it genuinely works.",
  Pisces: "Your intuition is real, but so is reality. The best decisions honor both your inner knowing and outer circumstances.",
};
