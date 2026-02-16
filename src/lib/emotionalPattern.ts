/**
 * Integrative interpretations for the "Emotional Pattern in Motion" card
 * Generates prose that shows the emotional loop, cost, and signals
 * Based on Moon sign (primary) with Sun sign influence
 */

// Emotional rhythm modes - used internally
type EmotionalMode = 'balance' | 'intensity' | 'action' | 'stability' | 'analysis';

function getEmotionalMode(sign: string): EmotionalMode {
  const balance = ['Libra', 'Pisces'];
  const intensity = ['Scorpio', 'Cancer'];
  const action = ['Aries', 'Leo', 'Sagittarius'];
  const stability = ['Taurus', 'Capricorn'];
  const analysis = ['Gemini', 'Virgo', 'Aquarius'];
  if (balance.includes(sign)) return 'balance';
  if (intensity.includes(sign)) return 'intensity';
  if (action.includes(sign)) return 'action';
  if (stability.includes(sign)) return 'stability';
  return 'analysis';
}

// Default emotional rhythm by Moon sign
export const defaultRhythm: Record<string, string> = {
  Aries: `You process emotions through movement and action. When feelings arise, your first instinct is to do something about them.

You're not avoiding emotion. You're converting it into momentum.

This makes you responsive and honest, but it can mean feelings get discharged before they're fully understood.`,

  Taurus: `You process emotions slowly and through the body. When feelings arise, you need time, comfort, and stability before you can respond.

You're not being stubborn. You're being thorough.

This makes you reliable and grounded, but it can mean you hold onto feelings longer than serves you.`,

  Gemini: `You process emotions through thinking and talking. When feelings arise, you want to understand them, name them, and discuss them.

You're not intellectualising. You're making sense of experience.

This makes you articulate and adaptable, but it can mean feelings get analysed before they're fully felt.`,

  Cancer: `You process emotions through memory and connection. When feelings arise, they resonate with everything you've felt before.

You're not being dramatic. You're feeling the full weight.

This makes you deeply empathic, but it can mean past feelings get confused with present ones.`,

  Leo: `You process emotions through expression and recognition. When feelings arise, you need them witnessed and validated.

You're not seeking attention. You're seeking acknowledgment.

This makes you warm and generous, but it can mean unexpressed feelings feel like rejection.`,

  Virgo: `You process emotions through analysis and practical response. When feelings arise, you want to understand what caused them and what to do about them.

You're not being cold. You're trying to be useful.

This makes you helpful and reliable, but it can mean you serve others' feelings while neglecting your own.`,

  Libra: `You instinctively try to keep things balanced. When emotions threaten harmony, you soften, delay, or translate them into something more manageable.

You're not avoiding feeling. You're trying to prevent unnecessary disruption.

This makes you thoughtful and considerate, but it can blur the line between your feelings and the emotional atmosphere around you.`,

  Scorpio: `You process emotions through depth and transformation. When feelings arise, you want to understand their source and their meaning.

You're not being intense. You're being thorough.

This makes you perceptive and loyal, but it can mean you hold feelings until they've been fully processed, which takes time.`,

  Sagittarius: `You process emotions through meaning and movement. When feelings arise, you want to understand what they teach and then move forward.

You're not avoiding depth. You're seeking perspective.

This makes you optimistic and resilient, but it can mean uncomfortable feelings get reframed before they're fully experienced.`,

  Capricorn: `You process emotions through control and accomplishment. When feelings arise, you contain them until you can respond appropriately.

You're not being cold. You're being responsible.

This makes you dependable and composed, but it can mean emotions only surface when you're exhausted or off-guard.`,

  Aquarius: `You process emotions from a slight distance. When feelings arise, you observe them as much as experience them.

You're not being detached. You're being objective.

This makes you calm in crisis, but it can mean you intellectualise feelings rather than letting them move through you.`,

  Pisces: `You process emotions through absorption and release. When feelings arise, you feel them fully, yours and everyone else's.

You're not being oversensitive. You're being permeable.

This makes you deeply compassionate, but it can mean you lose track of which feelings are actually yours.`,
};

// Pattern under pressure by Moon sign
export const underPressure: Record<string, string> = {
  Aries: `When emotional intensity rises, your first move is to act.

You confront what's bothering you, discharge the energy, and move on. This keeps things from festering.

The risk is acting before you've understood what you feel. Speed can look like dismissiveness, even when it's not.`,

  Taurus: `When emotional intensity rises, your first move is to stabilise.

You retreat to comfort, slow down, and wait for the storm to pass. This keeps you grounded.

The risk is that waiting can become avoiding. Stability can calcify into stubbornness if feelings never get addressed.`,

  Gemini: `When emotional intensity rises, your first move is to analyse.

You talk through what's happening, gather perspectives, and try to understand. This keeps things manageable.

The risk is that talking can replace feeling. Understanding the emotion isn't the same as experiencing it.`,

  Cancer: `When emotional intensity rises, your first move is to protect.

You withdraw, create safety, and nurture yourself or others. This keeps the emotional core intact.

The risk is that protection can become isolation. Past wounds can colour present situations unfairly.`,

  Leo: `When emotional intensity rises, your first move is to express.

You need your feelings witnessed, acknowledged, and honoured. This keeps you connected to yourself.

The risk is that expression can become performance. If no one sees your pain, it can feel like it doesn't count.`,

  Virgo: `When emotional intensity rises, your first move is to fix.

You look for what caused the feeling and what can be done about it. This keeps you useful.

The risk is that fixing can become avoiding. Some feelings don't have solutions. They just need to be felt.`,

  Libra: `When emotional intensity rises or conflict feels imminent, your first move is to step back mentally.

You analyse what's happening, look for fairness, and search for the most reasonable path forward. This keeps things calm and contained in the moment.

Over time, however, unexpressed feelings can accumulate. What stays unspoken doesn't disappear. It settles quietly in the background.`,

  Scorpio: `When emotional intensity rises, your first move is to go deeper.

You want to understand the root, the pattern, the real issue beneath the surface. This keeps you honest.

The risk is that depth can become rumination. Some feelings don't need excavation. They just need release.`,

  Sagittarius: `When emotional intensity rises, your first move is to zoom out.

You look for the lesson, the silver lining, the bigger picture. This keeps you hopeful.

The risk is that perspective can become bypass. Not every feeling needs meaning. Some just need acknowledgment.`,

  Capricorn: `When emotional intensity rises, your first move is to contain.

You put feelings aside until there's time to address them properly. This keeps you functional.

The risk is that proper time never comes. Contained emotions don't disappear. They accumulate interest.`,

  Aquarius: `When emotional intensity rises, your first move is to observe.

You step back, analyse the pattern, and try to understand it rationally. This keeps you calm.

The risk is that observation can become distance. Some feelings need to be felt from inside, not studied from outside.`,

  Pisces: `When emotional intensity rises, your first move is to merge or escape.

You absorb everything or find a way to dissolve the boundaries entirely. This keeps you connected.

The risk is losing yourself. Without clear boundaries, your feelings and others' become indistinguishable.`,
};

// Cost of over-regulation by Moon sign
export const regulationCost: Record<string, string> = {
  Aries: `Because you're skilled at emotional action, you may not notice when you're bypassing important feelings.

You can move through emotions so quickly that you never sit with discomfort long enough to learn from it. This often shows up as repeating the same emotional patterns without understanding why.`,

  Taurus: `Because you're skilled at emotional stability, you may not notice when you're stuck.

You can hold steady through anything, but holding can become clinging. This often shows up as delayed grief or anger that surfaces years later.`,

  Gemini: `Because you're skilled at emotional understanding, you may not notice when you're thinking instead of feeling.

You can explain your emotions perfectly while remaining disconnected from them. This often shows up as surprise when feelings finally break through the analysis.`,

  Cancer: `Because you're skilled at emotional depth, you may not notice when the past is running the present.

You can feel everything so vividly that old wounds stay fresh. This often shows up as disproportionate reactions, feeling more than the current situation warrants.`,

  Leo: `Because you're skilled at emotional expression, you may not notice when you're performing instead of feeling.

You can show emotion without actually processing it. This often shows up as feeling empty after dramatic expression, like the feeling was released but not resolved.`,

  Virgo: `Because you're skilled at emotional management, you may not notice when you're overworking your own feelings.

You can analyse and improve and serve until you've lost track of what you actually need. This often shows up as resentment disguised as helpfulness.`,

  Libra: `Because you're skilled at emotional balance, you may not notice when you're carrying more than your share.

You can become responsible for maintaining peace while losing touch with what you actually feel. This often shows up as emotional fatigue rather than visible conflict.`,

  Scorpio: `Because you're skilled at emotional intensity, you may not notice when you're holding too tightly.

You can process so thoroughly that you never actually let go. This often shows up as grudges that feel like principles, or grief that becomes identity.`,

  Sagittarius: `Because you're skilled at emotional perspective, you may not notice when you're avoiding depth.

You can find meaning so quickly that you never sit with meaninglessness. This often shows up as a vague restlessness, knowing something's unfinished but not what.`,

  Capricorn: `Because you're skilled at emotional control, you may not notice when containment has become suppression.

You can function through anything, but function isn't feeling. This often shows up as emotional eruptions that surprise you, or physical symptoms instead of feelings.`,

  Aquarius: `Because you're skilled at emotional objectivity, you may not notice when distance has become disconnection.

You can observe your feelings so well that you forget to actually have them. This often shows up as confusion about what you want or need.`,

  Pisces: `Because you're skilled at emotional absorption, you may not notice when you've lost your center.

You can feel for everyone so completely that your own feelings become unclear. This often shows up as exhaustion with no obvious cause, or emotions that don't quite fit your life.`,
};

// How to return to balance by Moon sign
export const returnToBalance: Record<string, string> = {
  Aries: `You restore yourself through movement, challenge, and fresh starts.

Physical activity helps you reset. Projects that engage your initiative feel replenishing. Solitude isn't natural for you, but brief pauses between actions can help feelings catch up.

What matters is leaving space between action and reaction.`,

  Taurus: `You restore yourself through comfort, beauty, and sensory pleasure.

Physical presence in pleasant surroundings helps you reset. Good food, natural settings, and unhurried time feel replenishing.

What matters is distinguishing between comfort that restores and comfort that numbs.`,

  Gemini: `You restore yourself through conversation, variety, and mental stimulation.

Talking things through helps you reset. New information, different perspectives, and social connection feel replenishing.

What matters is eventually letting conversation lead to feeling, not just understanding.`,

  Cancer: `You restore yourself through nurturing, memory, and emotional connection.

Being cared for (or caring for others) helps you reset. Familiar places, loved ones, and emotional acknowledgment feel replenishing.

What matters is letting current feelings exist without comparing them to past ones.`,

  Leo: `You restore yourself through creativity, recognition, and play.

Making something helps you reset. Appreciation, fun, and spaces where you can be fully yourself feel replenishing.

What matters is creating for expression, not just for response.`,

  Virgo: `You restore yourself through order, usefulness, and practical accomplishment.

Completing tasks helps you reset. Clean spaces, solved problems, and service feel replenishing.

What matters is including yourself in the care you give others.`,

  Libra: `You restore yourself through ideas, friendship, and freedom.

Mental stimulation helps you reset. Time with people who don't demand emotional performance feels replenishing. Space is not avoidance for you. It's regulation.

What matters is choosing space intentionally, not using it to postpone feeling indefinitely.`,

  Scorpio: `You restore yourself through depth, truth, and emotional honesty.

Real conversation helps you reset. People who can handle intensity, privacy, and transformative experiences feel replenishing.

What matters is knowing when to release rather than continue processing.`,

  Sagittarius: `You restore yourself through adventure, meaning, and expansion.

New experiences help you reset. Learning, travel, and conversations about ideas feel replenishing. Freedom to move and explore is essential.

What matters is eventually landing somewhere, not just moving.`,

  Capricorn: `You restore yourself through accomplishment, structure, and recognition of effort.

Completing meaningful work helps you reset. Clear progress, competent action, and earned rest feel replenishing.

What matters is recognising that rest doesn't have to be earned. Sometimes it just has to be taken.`,

  Aquarius: `You restore yourself through ideas, community, and independence.

Intellectual engagement helps you reset. Time with like-minded people, pursuing causes, and space for your own thoughts feel replenishing.

What matters is eventually bringing the feelings back from the observation deck to the body.`,

  Pisces: `You restore yourself through solitude, creativity, and spiritual practice.

Time alone helps you reset. Art, music, water, and anything that dissolves ordinary boundaries feel replenishing.

What matters is having enough structure to return from dissolution to daily life.`,
};

// Signal to notice by Moon sign
export const signalToNotice: Record<string, string> = {
  Aries: `If you feel restless but can't identify what you want, or irritated without a clear target, this pattern is likely active.

That's the moment to pause before the next action. Not to stop, but to check what's driving the movement.`,

  Taurus: `If you feel stuck but can't identify what's holding you, or attached to things that no longer serve you, this pattern is likely active.

That's the moment to ask whether stability has become stagnation.`,

  Gemini: `If you feel busy but vaguely unsatisfied, or knowledgeable but emotionally unclear, this pattern is likely active.

That's the moment to stop explaining and start feeling.`,

  Cancer: `If you feel overwhelmed by emotions that don't quite match the present situation, or protective of wounds that should have healed, this pattern is likely active.

That's the moment to ask: is this now, or is this then?`,

  Leo: `If you feel unseen despite being visible, or empty after emotional expression, this pattern is likely active.

That's the moment to ask whether the feeling was processed or just performed.`,

  Virgo: `If you feel useful but depleted, or critical of yourself for having needs, this pattern is likely active.

That's the moment to apply the same care to yourself that you give to others.`,

  Libra: `If you feel calm but vaguely dissatisfied, or connected but slightly drained, this pattern is likely active.

That's the moment to check in with yourself before smoothing things over again.`,

  Scorpio: `If you feel that you're holding something you can't release, or that understanding hasn't led to peace, this pattern is likely active.

That's the moment to ask whether more depth is needed, or whether it's time to simply let go.`,

  Sagittarius: `If you feel restless without direction, or optimistic but hollow, this pattern is likely active.

That's the moment to ask what you're running toward, or what you're running from.`,

  Capricorn: `If you feel functional but empty, or accomplished but unmoved, this pattern is likely active.

That's the moment to ask whether the feelings are contained or just buried.`,

  Aquarius: `If you feel clear but disconnected, or rational but somehow off, this pattern is likely active.

That's the moment to stop observing your feelings and start feeling them.`,

  Pisces: `If you feel everything but can't identify what's yours, or tired without obvious cause, this pattern is likely active.

That's the moment to find your edges before you dissolve further.`,
};
