/**
 * Integrative interpretations for the "Shadow and Growth Edge" card
 * Generates prose that shows the loop: trigger → response → relief → cost
 * Based on Sun sign with Moon sign influence
 */

// The recurring friction by Sun sign
export const recurringFriction: Record<string, string> = {
  Aries: `When life asks for patience, collaboration, or sustained presence, you tend to push harder.

You don't avoid difficulty. You charge at it.
You don't ignore problems. You attack them.

This works well until something requires you to wait, yield, or let others lead.`,

  Taurus: `When life asks for flexibility, change, or letting go, you tend to hold tighter.

You don't avoid commitment. You deepen it.
You don't reject stability. You cling to it.

This works well until something requires you to release, adapt, or move on.`,

  Gemini: `When life asks for depth, commitment, or sustained presence, you tend to keep moving.

You don't avoid engagement. You diversify it.
You don't reject connection. You multiply it.

This works well until something requires you to stay, deepen, or choose one thing.`,

  Cancer: `When life asks for independence, emotional boundaries, or letting others struggle, you tend to absorb more.

You don't avoid feeling. You feel everything.
You don't reject closeness. You merge.

This works well until something requires you to separate your needs from others'.`,

  Leo: `When life asks for humility, invisibility, or supporting someone else's spotlight, you tend to seek recognition.

You don't avoid contribution. You want it seen.
You don't reject others. You need acknowledgment.

This works well until something requires you to serve without applause.`,

  Virgo: `When life asks for acceptance, messiness, or good enough, you tend to improve.

You don't avoid standards. You raise them.
You don't reject help. You prefer to give it.

This works well until something requires you to accept imperfection without fixing it.`,

  Libra: `When life asks for emotional closeness, vulnerability, or sustained presence, you tend to move into your head.

You don't shut down. You analyse.
You don't avoid connection. You manage it.

This works well until something requires you to stay with discomfort rather than make sense of it.`,

  Scorpio: `When life asks for lightness, trust, or letting things go, you tend to go deeper.

You don't avoid intensity. You seek it.
You don't reject vulnerability. You test it thoroughly.

This works well until something requires you to release, forgive, or trust without proof.`,

  Sagittarius: `When life asks for commitment, routine, or staying with discomfort, you tend to seek escape.

You don't avoid meaning. You chase it.
You don't reject depth. You want it on your terms.

This works well until something requires you to stay, deepen, or accept limitation.`,

  Capricorn: `When life asks for vulnerability, emotional expression, or surrender, you tend to work harder.

You don't avoid responsibility. You take more.
You don't reject feeling. You contain it.

This works well until something requires you to be held rather than holding.`,

  Aquarius: `When life asks for emotional intimacy, personal vulnerability, or sustained presence, you tend to think.

You don't avoid people. You observe them.
You don't reject connection. You intellectualise it.

This works well until something requires you to feel rather than understand.`,

  Pisces: `When life asks for boundaries, structure, or individual assertion, you tend to merge or escape.

You don't avoid connection. You dissolve into it.
You don't reject reality. You transcend it.

This works well until something requires you to stand firm and stay distinct.`,
};

// The pattern in motion - trigger, move, relief, cost
export const patternInMotion: Record<string, string> = {
  Aries: `**Trigger**
Slowness, obstacles, or being told to wait.

**Automatic move**
You push harder, act faster, or force resolution through sheer will.

**Short-term relief**
Things move. You feel powerful. The obstacle is addressed.

**Long-term cost**
Relationships strain from your pace. Subtlety gets lost. You may win battles while losing what matters.

This is not impatience. It's self-protection through action.`,

  Taurus: `**Trigger**
Instability, sudden change, or pressure to let go.

**Automatic move**
You hold tighter, slow down, or refuse to engage until things settle.

**Short-term relief**
You feel grounded. Nothing is lost. Stability is maintained.

**Long-term cost**
Opportunities pass. Stagnation sets in. You may preserve things that needed to die.

This is not stubbornness. It's self-protection through stability.`,

  Gemini: `**Trigger**
Boredom, emotional intensity, or pressure to commit to one path.

**Automatic move**
You shift focus, start something new, or intellectualise the feeling.

**Short-term relief**
Interest returns. You feel lighter. Options stay open.

**Long-term cost**
Depth never develops. Relationships feel shallow. You may know many things without mastering anything.

This is not flakiness. It's self-protection through movement.`,

  Cancer: `**Trigger**
Emotional distance, rejection, or sensing someone you love needs help.

**Automatic move**
You nurture more, absorb their feelings, or create closeness through caretaking.

**Short-term relief**
Connection feels restored. You feel needed. Safety returns.

**Long-term cost**
Your own needs disappear. Resentment builds. You may lose yourself in loving others.

This is not weakness. It's self-protection through care.`,

  Leo: `**Trigger**
Being overlooked, unappreciated, or having your contributions ignored.

**Automatic move**
You perform louder, seek recognition elsewhere, or withdraw dramatically.

**Short-term relief**
Attention returns. You feel seen. Your worth is confirmed.

**Long-term cost**
Relationships become transactional. Praise becomes addictive. You may shine without feeling real.

This is not vanity. It's self-protection through visibility.`,

  Virgo: `**Trigger**
Chaos, incompetence, or something that clearly needs fixing.

**Automatic move**
You analyse, criticise, or take over to make things right.

**Short-term relief**
Quality improves. You feel useful. Order is restored.

**Long-term cost**
Others feel judged. Spontaneity dies. You may perfect things that didn't need perfecting.

This is not criticism. It's self-protection through control.`,

  Libra: `**Trigger**
Emotional intensity, relational uncertainty, or pressure to conform to expectations that don't feel aligned.

**Automatic move**
You step back mentally. You explain, rationalise, or reframe. You aim to restore balance through understanding rather than feeling.

**Short-term relief**
Things stay calm. You feel composed. No one is overwhelmed.

**Long-term cost**
Distance quietly grows. Needs go unspoken. You may feel unseen despite being deeply thoughtful and considerate.

This is not avoidance. It's self-protection through clarity.`,

  Scorpio: `**Trigger**
Betrayal, deception, or sensing something hidden.

**Automatic move**
You investigate deeper, test loyalty, or withdraw to protect yourself.

**Short-term relief**
Truth is uncovered. You feel powerful. Nothing surprises you.

**Long-term cost**
Trust becomes impossible. Intensity pushes people away. You may protect yourself into isolation.

This is not paranoia. It's self-protection through vigilance.`,

  Sagittarius: `**Trigger**
Confinement, routine, or being asked to commit without escape routes.

**Automatic move**
You seek meaning elsewhere, reframe the situation optimistically, or plan your exit.

**Short-term relief**
Hope returns. Freedom feels possible. The constraint loosens.

**Long-term cost**
Depth never develops. Commitments erode. You may pursue meaning without ever catching it.

This is not irresponsibility. It's self-protection through possibility.`,

  Capricorn: `**Trigger**
Vulnerability, failure, or being seen as incompetent.

**Automatic move**
You work harder, take more control, or achieve your way through the feeling.

**Short-term relief**
Competence is proven. You feel worthy. The vulnerability passes.

**Long-term cost**
Feelings stay buried. Rest becomes impossible. You may build empires while feeling empty.

This is not coldness. It's self-protection through achievement.`,

  Aquarius: `**Trigger**
Emotional pressure, conformity demands, or situations requiring personal vulnerability.

**Automatic move**
You think about it instead of feeling it. You seek perspective rather than presence.

**Short-term relief**
Things stay clear. You feel composed. Overwhelm is avoided.

**Long-term cost**
Intimacy stays shallow. Understanding replaces connection. You may be deeply thoughtful but emotionally absent.

This is not detachment. It's self-protection through objectivity.`,

  Pisces: `**Trigger**
Harshness, conflict, or being asked to assert yourself firmly.

**Automatic move**
You absorb, adapt, or escape into imagination, substances, or spiritual bypass.

**Short-term relief**
Conflict dissolves. You feel at peace. Boundaries blur comfortably.

**Long-term cost**
Your needs vanish. Reality becomes optional. You may transcend what needed to be faced.

This is not weakness. It's self-protection through dissolution.`,
};

// The internal contradiction by Sun sign
export const internalContradiction: Record<string, string> = {
  Aries: `You want to win, but you also want to be loved for who you are beyond winning.
You need independence, but you also need someone to witness your victories.

To others, this can look like aggression or selfishness.
Internally, it feels like trying to be strong while secretly hoping someone will fight for you.`,

  Taurus: `You want security, but you also want to feel alive and desired.
You need stability, but you also fear that stability might mean stagnation.

To others, this can look like stubbornness or materialism.
Internally, it feels like trying to hold on while wondering if you should let go.`,

  Gemini: `You want connection, but you also need freedom to explore.
You need stimulation, but you also crave something that lasts.

To others, this can look like fickleness or superficiality.
Internally, it feels like wanting depth while fearing what depth might demand.`,

  Cancer: `You want to nurture, but you also want to be nurtured.
You need closeness, but you also fear being consumed by it.

To others, this can look like clinginess or emotional manipulation.
Internally, it feels like giving everything while hoping someone will finally see your needs.`,

  Leo: `You want authentic recognition, but you also fear that you're performing instead of being.
You need appreciation, but you also want to matter beyond what you do.

To others, this can look like attention-seeking or pride.
Internally, it feels like shining outward while wondering if anyone sees the real you.`,

  Virgo: `You want to be useful, but you also want to be valued beyond usefulness.
You need to improve things, but you also fear you'll never be good enough.

To others, this can look like criticism or perfectionism.
Internally, it feels like serving endlessly while hoping someone will finally serve you.`,

  Libra: `You want meaningful connection, but not at the cost of autonomy.
You care deeply, but you need space to process before you can stay present.

To others, this can look like detachment.
Internally, it feels like trying to hold two truths at once.`,

  Scorpio: `You want deep intimacy, but you also need to protect yourself from betrayal.
You need to trust, but you also need to test that trust repeatedly.

To others, this can look like intensity or control.
Internally, it feels like wanting to merge while being terrified of what merging might cost.`,

  Sagittarius: `You want freedom, but you also want meaning that lasts.
You need expansion, but you also fear missing out on depth.

To others, this can look like commitment-phobia or restlessness.
Internally, it feels like running toward everything while wondering if you should stay.`,

  Capricorn: `You want achievement, but you also want to be loved for who you are beyond achievement.
You need to be respected, but you also fear that respect is all you have.

To others, this can look like coldness or workaholism.
Internally, it feels like building constantly while wondering if any of it actually matters.`,

  Aquarius: `You want to belong, but not at the cost of individuality.
You care about humanity, but struggle with individual emotional demands.

To others, this can look like coldness or aloofness.
Internally, it feels like caring deeply while standing slightly apart.`,

  Pisces: `You want to merge, but you also need to exist as a separate self.
You need connection, but you also fear losing yourself in it.

To others, this can look like victimhood or escapism.
Internally, it feels like dissolving into everything while desperately searching for your edges.`,
};

// The blind spot to watch by Sun sign
export const blindSpot: Record<string, string> = {
  Aries: `You may not notice when your directness has become aggression.

Independence can masquerade as dismissiveness.
Strength can become inability to receive.

The cost usually shows up as relationships that can't survive your pace, or victories that feel hollow.`,

  Taurus: `You may not notice when stability has become stagnation.

Reliability can masquerade as rigidity.
Loyalty can become attachment to what no longer serves.

The cost usually shows up as missed opportunities or relationships that outgrew you.`,

  Gemini: `You may not notice when curiosity has become avoidance.

Versatility can masquerade as lack of commitment.
Lightness can become inability to stay.

The cost usually shows up as shallow connections or knowledge without wisdom.`,

  Cancer: `You may not notice when nurturing has become control.

Care can masquerade as manipulation.
Sensitivity can become inability to let others struggle.

The cost usually shows up as relationships where you're needed but not known.`,

  Leo: `You may not notice when confidence has become performance.

Generosity can masquerade as expectation.
Warmth can become dependence on applause.

The cost usually shows up as recognition that never quite fills the emptiness.`,

  Virgo: `You may not notice when helpfulness has become criticism.

Standards can masquerade as judgment.
Service can become inability to receive.

The cost usually shows up as exhaustion and relationships where you give but don't get.`,

  Libra: `You may not notice when harmony is maintained by self-silencing.

People-pleasing can masquerade as fairness.
Intellectual clarity can replace emotional honesty.

The cost usually shows up later as quiet resentment or a sense that something is missing, even when things look "fine".`,

  Scorpio: `You may not notice when depth has become obsession.

Loyalty can masquerade as possession.
Intensity can become inability to let go.

The cost usually shows up as isolation or relationships that suffocate under your vigilance.`,

  Sagittarius: `You may not notice when freedom has become escape.

Optimism can masquerade as denial.
Growth can become inability to stay.

The cost usually shows up as a trail of unfinished things and unfulfilled promises.`,

  Capricorn: `You may not notice when discipline has become self-punishment.

Responsibility can masquerade as control.
Achievement can become inability to rest.

The cost usually shows up as success that feels empty or relationships sacrificed for accomplishment.`,

  Aquarius: `You may not notice when objectivity has become disconnection.

Independence can masquerade as inability to need.
Thinking can replace feeling entirely.

The cost usually shows up as intellectual clarity paired with emotional loneliness.`,

  Pisces: `You may not notice when compassion has become self-abandonment.

Empathy can masquerade as having no needs.
Spirituality can become escape from reality.

The cost usually shows up as lost sense of self or relationships where you disappear.`,
};

// What growth actually looks like by Sun sign
export const growthInPractice: Record<string, string> = {
  Aries: `Growth doesn't mean becoming less direct or less driven.

It looks like:
• pausing before acting when the situation requires it
• letting others lead without feeling diminished
• receiving care as readily as you give action

Strength deepens when you can be still without feeling powerless.`,

  Taurus: `Growth doesn't mean becoming unstable or giving up what you've built.

It looks like:
• releasing what no longer serves, even when it's comfortable
• trusting change can lead somewhere good
• receiving love beyond material expression

Security deepens when you can let go without losing yourself.`,

  Gemini: `Growth doesn't mean becoming boring or intellectually limited.

It looks like:
• staying with one thing long enough to master it
• feeling without explaining
• being present in silence

Intelligence deepens when you can be still without being bored.`,

  Cancer: `Growth doesn't mean becoming less caring or emotionally available.

It looks like:
• letting others struggle without rescuing
• receiving care as readily as you give it
• maintaining your needs alongside others'

Love deepens when you can care without merging.`,

  Leo: `Growth doesn't mean becoming invisible or playing small.

It looks like:
• shining without needing applause
• supporting others' spotlight without feeling diminished
• knowing your worth beyond what you produce

Radiance deepens when it comes from inside rather than from recognition.`,

  Virgo: `Growth doesn't mean accepting mediocrity or lowering standards.

It looks like:
• accepting imperfection without fixing it
• receiving help as readily as giving it
• being valued beyond usefulness

Service deepens when you serve yourself too.`,

  Libra: `Growth doesn't mean becoming more emotional or less independent.

It looks like:
• staying in the conversation instead of explaining it
• naming a feeling without resolving it
• allowing mild tension without rushing to smooth it over

Connection deepens when you let presence come before understanding.`,

  Scorpio: `Growth doesn't mean becoming shallow or giving up depth.

It looks like:
• trusting without extensive testing
• releasing without complete understanding
• forgiving without forgetting

Intimacy deepens when you can let go without losing yourself.`,

  Sagittarius: `Growth doesn't mean giving up freedom or becoming boring.

It looks like:
• staying with discomfort instead of reframing it
• committing without escape routes
• finding meaning in depth, not just breadth

Wisdom deepens when you can stay somewhere long enough to learn.`,

  Capricorn: `Growth doesn't mean becoming irresponsible or giving up achievement.

It looks like:
• resting without earning it
• being vulnerable without it feeling like weakness
• receiving without reciprocating immediately

Strength deepens when you can be held rather than always holding.`,

  Aquarius: `Growth doesn't mean becoming conformist or giving up your perspective.

It looks like:
• feeling without needing to understand first
• being present without observing
• letting someone in without analysing what that means

Connection deepens when you let presence come before objectivity.`,

  Pisces: `Growth doesn't mean becoming rigid or losing your sensitivity.

It looks like:
• maintaining boundaries without guilt
• staying present in reality without escape
• asserting your needs as valid

Compassion deepens when you include yourself in it.`,
};

// Card relevance cue by Sun sign
export const relevanceCue: Record<string, string> = {
  Aries: `This card will matter most when you're winning but feeling empty, or when your strength starts to isolate you.

That's usually the cue.`,

  Taurus: `This card will matter most when you're stable but stuck, or when holding on starts to cost more than letting go.

That's usually the cue.`,

  Gemini: `This card will matter most when you're busy but unfulfilled, or when variety starts to feel like avoidance.

That's usually the cue.`,

  Cancer: `This card will matter most when you're caring for everyone but yourself, or when closeness starts to feel like loss of self.

That's usually the cue.`,

  Leo: `This card will matter most when recognition no longer fills the emptiness, or when performing starts to feel more real than being.

That's usually the cue.`,

  Virgo: `This card will matter most when you're useful but depleted, or when improvement starts to feel like self-punishment.

That's usually the cue.`,

  Libra: `This card will matter most when life feels calm on the surface, but subtly unsatisfying underneath.

That's usually the cue.`,

  Scorpio: `This card will matter most when intensity starts to isolate you, or when depth becomes a way to avoid moving forward.

That's usually the cue.`,

  Sagittarius: `This card will matter most when freedom starts to feel like running, or when meaning stays just out of reach.

That's usually the cue.`,

  Capricorn: `This card will matter most when success starts to feel hollow, or when discipline becomes a way to avoid feeling.

That's usually the cue.`,

  Aquarius: `This card will matter most when understanding doesn't translate to connection, or when clarity leaves you feeling alone.

That's usually the cue.`,

  Pisces: `This card will matter most when compassion leaves you empty, or when transcendence becomes a way to avoid reality.

That's usually the cue.`,
};
