// Rest & Recharge content based on Moon sign (emotional needs) and element

export const restStyle: Record<string, string> = {
  Aries: `You recharge through movement and action, not passive rest. Sitting still when you're depleted often makes it worse. You need to burn off the stagnant energy before you can truly relax.

Your kind of rest looks like: a hard workout, a spontaneous adventure, starting a new project that excites you. It's active recovery, not stillness.`,

  Taurus: `You recharge through sensory comfort and slow rhythms. Your body needs to feel safe and nourished before your nervous system can settle. Rushing your rest defeats the purpose.

Your kind of rest looks like: good food, soft textures, nature, familiar surroundings. It's about returning to your body and reminding it that the world is okay.`,

  Gemini: `You recharge through mental stimulation and social connection, but the right kind. Draining conversations exhaust you; curious ones restore you. You need to feel mentally engaged, not checked out.

Your kind of rest looks like: light reading, interesting podcasts, texting friends, learning something new. Complete mental silence isn't rest for you. It's boredom.`,

  Cancer: `You recharge through emotional safety and nurturing. You need to feel held, whether by people, places, or rituals. Your nervous system settles when your heart feels protected.

Your kind of rest looks like: time with close loved ones, being at home, comfort food, nostalgic activities. It's about returning to what feels like emotional home.`,

  Leo: `You recharge through joy, creativity, and feeling appreciated. Depletion for you often looks like invisibility. You've been giving without receiving. You need to feel valued, not just productive.

Your kind of rest looks like: creative play, quality time with people who adore you, activities that make you feel alive. It's about reconnecting with what brings you genuine happiness.`,

  Virgo: `You recharge through order and useful activity, but gentler than usual. Complete stillness often increases your anxiety. You need to feel like you're tending to something, just at a slower pace.

Your kind of rest looks like: organizing a small space, gentle routines, being in nature, helping someone you care about. It's purposeful but unhurried.`,

  Libra: `You recharge through beauty, harmony, and connection. Discord depletes you at a cellular level. You need to be surrounded by aesthetic peace and relational ease.

Your kind of rest looks like: beautiful environments, quality time with harmonious people, art, music, anything that restores your sense that the world can be lovely.`,

  Scorpio: `You recharge through solitude and depth. Surface-level rest doesn't reach you. You need time alone to process, to feel without performing, to let your intensity settle.

Your kind of rest looks like: privacy, deep conversations (or deep silence), psychological processing, being near water. It's about returning to your depths.`,

  Sagittarius: `You recharge through expansion and meaning. Feeling trapped is more exhausting than activity. You need to remember that life has possibility, that you're not stuck, that there's more.

Your kind of rest looks like: travel (even mental travel), learning something that expands your worldview, time outdoors, philosophical conversations. It's about reconnecting with wonder.`,

  Capricorn: `You recharge through accomplishment and structure, but different from work. You need to feel capable and effective, but in service of yourself rather than external demands.

Your kind of rest looks like: personal projects that show progress, physical activity with visible results, planning something you're excited about. Passive rest often just makes you restless.`,

  Aquarius: `You recharge through space and intellectual freedom. Feeling obligated or emotionally demanded-of is exhausting. You need room to be yourself without explanation.

Your kind of rest looks like: solitary pursuits, unconventional activities, time with friends who don't need you to perform, engaging with ideas. It's about freedom from expectation.`,

  Pisces: `You recharge through transcendence and boundary dissolution, in healthy ways. You need to step out of ordinary reality for a while, to let your edges soften, to remember you're part of something larger.

Your kind of rest looks like: sleep, meditation, music, water, creative flow states, spiritual practice. It's about temporarily releasing the burden of being a separate self.`,
};

export const depletionSigns: Record<string, string[]> = {
  Aries: [
    "Everything feels like an obstacle",
    "You're irritable about minor frustrations",
    "You feel trapped or stagnant",
    "Your usual enthusiasm feels forced",
  ],
  Taurus: [
    "Small changes feel threatening",
    "You're clinging harder than usual",
    "Physical tension that won't release",
    "Overindulgence without enjoyment",
  ],
  Gemini: [
    "Your mind won't settle but nothing interests you",
    "Conversations feel like work",
    "You're scattered but not productive",
    "Everything feels boring and overwhelming simultaneously",
  ],
  Cancer: [
    "Everything feels personal",
    "You're withdrawing but not refilling",
    "Emotional sensitivity is off the charts",
    "You're nurturing everyone except yourself",
  ],
  Leo: [
    "You feel invisible even in a crowd",
    "Creative spark feels absent",
    "You're performing but not receiving",
    "Praise doesn't land the way it should",
  ],
  Virgo: [
    "Your inner critic is relentless",
    "Everything feels messy and out of control",
    "Small imperfections are unbearable",
    "Helping others feels like obligation, not service",
  ],
  Libra: [
    "Every decision feels impossible",
    "Conflict feels catastrophic",
    "You're people-pleasing past your limits",
    "Beauty isn't reaching you",
  ],
  Scorpio: [
    "Everything feels like a threat",
    "Trust is harder than usual",
    "You're brooding without processing",
    "Intensity without purpose",
  ],
  Sagittarius: [
    "Life feels small and pointless",
    "Optimism is replaced by cynicism",
    "You're restless but can't identify what you want",
    "Freedom feels like isolation",
  ],
  Capricorn: [
    "Work feels meaningless but you can't stop",
    "You're pushing but not progressing",
    "Self-criticism is louder than self-compassion",
    "Success doesn't satisfy",
  ],
  Aquarius: [
    "People feel draining, even good ones",
    "Your usual detachment becomes disconnection",
    "Ideas feel empty",
    "You're going through motions without conviction",
  ],
  Pisces: [
    "Boundaries are impossible to maintain",
    "You're absorbing everyone's emotions",
    "Escapism isn't working",
    "The world feels too harsh, too real",
  ],
};

export const quickResets: Record<string, string[]> = {
  Aries: [
    "10-minute high-intensity movement",
    "Step outside and walk fast",
    "Do one quick, decisive thing",
    "Put on music that makes you want to move",
  ],
  Taurus: [
    "Touch something with a texture you love",
    "Eat something nourishing, slowly",
    "Step outside and feel your feet on the ground",
    "Five minutes of complete stillness",
  ],
  Gemini: [
    "Text someone who makes you laugh",
    "Watch a short, interesting video",
    "Write a quick brain dump",
    "Change your physical environment",
  ],
  Cancer: [
    "Contact someone who feels like home",
    "Look at photos that make you feel loved",
    "Make yourself a warm drink",
    "Do something nurturing for future-you",
  ],
  Leo: [
    "Do something purely for joy, not productivity",
    "Reach out to someone who truly sees you",
    "Create something small, just for you",
    "Celebrate a small win you've been ignoring",
  ],
  Virgo: [
    "Tidy one small area completely",
    "Make a short list and cross one thing off",
    "Do something helpful that's actually easy",
    "Spend five minutes in nature",
  ],
  Libra: [
    "Look at something beautiful for two minutes",
    "Put on music that feels harmonious",
    "Have a pleasant, low-stakes conversation",
    "Adjust one thing in your environment",
  ],
  Scorpio: [
    "Give yourself permission to feel without fixing",
    "Write down what you're actually feeling",
    "Take a shower or be near water",
    "Sit in silence without agenda",
  ],
  Sagittarius: [
    "Watch or read something that expands your mind",
    "Plan (just plan) something adventurous",
    "Go outside and look at the sky",
    "Text someone who makes you feel free",
  ],
  Capricorn: [
    "Complete one small, satisfying task",
    "Make progress on a personal goal",
    "Physical exercise with visible effort",
    "Acknowledge something you've accomplished",
  ],
  Aquarius: [
    "Give yourself permission to not respond",
    "Engage with an idea that interests you",
    "Do something unexpected, just because",
    "Connect with a friend who doesn't need anything",
  ],
  Pisces: [
    "Listen to music that moves you",
    "Spend time near water, real or imagined",
    "Give yourself permission to daydream",
    "Do something creative with no outcome in mind",
  ],
};

export const deepRestNeeds: Record<string, string> = {
  Aries: "When truly depleted, you need extended time for physical recovery plus something to genuinely look forward to. Rest alone isn't enough. You need rest WITH anticipation.",
  Taurus: "When truly depleted, you need to return to basics: sleep, food, comfort, nature. Strip away everything non-essential and let your body remember it's safe.",
  Gemini: "When truly depleted, you need both mental stimulation AND permission to not figure anything out. Interesting inputs, no required outputs.",
  Cancer: "When truly depleted, you need to feel held, by people, rituals, or places that have proven safe. This is not the time to push your comfort zone.",
  Leo: "When truly depleted, you need genuine recognition from people whose opinions matter, plus creative play with no audience. Both isolation and performance worsen it.",
  Virgo: "When truly depleted, you need order around you (not perfection, just manageable order) and radical self-compassion. Ease the inner critic first.",
  Libra: "When truly depleted, you need beauty and harmony without effort, environments and people who are already peaceful. You can't create balance when you have none.",
  Scorpio: "When truly depleted, you need significant solitude for emotional processing, plus at least one person who can hold space for your full intensity without flinching.",
  Sagittarius: "When truly depleted, you need to reconnect with meaning. Not productivity, meaning. What makes life worth living for you? Return there.",
  Capricorn: "When truly depleted, you need to remember that your worth isn't tied to achievement. Rest is not laziness; it's maintenance on the machine that does the achieving.",
  Aquarius: "When truly depleted, you need extended freedom from expectation: social, emotional, practical. Space to exist without being anything for anyone.",
  Pisces: "When truly depleted, you need boundaries (yes, really) plus transcendent experiences. Protect yourself from absorbing more while releasing what you've already absorbed.",
};

export const restMistakes: Record<string, string> = {
  Aries: "Trying to rest by sitting still when you actually need active recovery. Your version of rest has movement in it.",
  Taurus: "Pushing through discomfort instead of honoring your body's need for genuine comfort. Stubbornness isn't strength when you're depleted.",
  Gemini: "Mindless scrolling that overstimulates without satisfying. You need mental engagement, not just mental activity.",
  Cancer: "Isolating when you actually need connection, or connecting with people who drain rather than fill you.",
  Leo: "Performing rest for others instead of actually resting. No one needs to see you 'self-caring.' Just care for yourself.",
  Virgo: "Turning rest into another task to optimize. Sometimes rest is messy. Sometimes good enough is good enough.",
  Libra: "Prioritizing others' rest over your own, or avoiding rest because it requires making choices for yourself.",
  Scorpio: "Brooding instead of processing, or isolating so long you lose perspective. Depth requires occasional surfacing.",
  Sagittarius: "Escaping instead of restoring. Travel, substances, endless content: if it's running from rather than returning to, it's not rest.",
  Capricorn: "Telling yourself you'll rest 'after this next thing.' There's always a next thing. Rest is not a reward; it's a requirement.",
  Aquarius: "Intellectualizing your need for rest instead of actually resting. Understanding why you're tired doesn't make you less tired.",
  Pisces: "Using rest as escape from reality rather than restoration for reality. You have to come back eventually.",
};
