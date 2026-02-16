/**
 * Integrative interpretations for the "Relationship Blueprint" card
 * Generates prose that shows the pattern, the cost, and what helps
 * Based on Moon sign (primary) with Venus sign influence
 */

// What you need to feel safe by Moon sign
export const safetyNeeds: Record<string, string> = {
  Aries: `You feel safest in relationships that are direct, honest, and alive.

Stagnation feels more threatening than conflict. You need a partner who can handle your energy without trying to calm it down. Challenge keeps you engaged; predictability can feel like suffocation.`,

  Taurus: `You feel safest in relationships that are stable, reliable, and physically present.

Change feels threatening until you've had time to process it. You need consistency, comfort, and someone who shows up the same way over time. Quality matters more than excitement.`,

  Gemini: `You feel safest in relationships that are mentally stimulating and communicatively open.

Silence feels more threatening than disagreement. You need conversation, variety, and someone who keeps you interested. Boredom is the real relationship killer for you.`,

  Cancer: `You feel safest in relationships that are emotionally attuned and reliably nurturing.

Emotional unavailability feels more threatening than conflict. You need someone who understands your moods, honours your need for closeness, and treats your feelings as valid. Home is a feeling, not just a place.`,

  Leo: `You feel safest in relationships that are appreciative, loyal, and generously expressed.

Being ignored feels more threatening than disagreement. You need recognition, warmth, and someone who makes you feel special. Love should feel celebratory, not just functional.`,

  Virgo: `You feel safest in relationships that are thoughtful, reliable, and actively improving.

Carelessness feels more threatening than imperfection. You need effort, attention to detail, and someone who notices what you do. Devotion is expressed through action, not just words.`,

  Libra: `You feel safest in relationships that are fair, balanced, and mutually considerate.

Harmony matters to you, not because you fear conflict, but because imbalance feels destabilising. Beauty, care, and thoughtful exchange help you relax into connection.`,

  Scorpio: `You feel safest in relationships that are deeply honest and fully committed.

Surface-level connection feels more threatening than intensity. You need trust that's been tested, loyalty that's been proven, and someone brave enough for real intimacy. Half-measures don't work for you.`,

  Sagittarius: `You feel safest in relationships that allow freedom and encourage growth.

Confinement feels more threatening than distance. You need space to be yourself, room to explore, and someone who shares your enthusiasm for what's possible. Love should expand your world, not shrink it.`,

  Capricorn: `You feel safest in relationships that are serious, committed, and building toward something.

Instability feels more threatening than emotional reserve. You need reliability, shared goals, and someone who takes the relationship as seriously as you do. Love is demonstrated through consistency and effort.`,

  Aquarius: `You feel safest in relationships that honour your independence and respect your mind.

Possessiveness feels more threatening than distance. You need space for your own thoughts, intellectual respect, and someone who doesn't try to make you more conventional. Friendship is the foundation.`,

  Pisces: `You feel safest in relationships that are emotionally deep and spiritually connected.

Harsh practicality feels more threatening than intensity. You need empathy, imagination, and someone who can meet you in the emotional depths. Love should feel transcendent, not transactional.`,
};

// How you show love by Moon sign
export const showingLove: Record<string, string> = {
  Aries: `You express care through action and protection.

You show up when it matters, defend the people you love, and demonstrate commitment through what you do rather than what you say. Partners feel energised and protected, though they may wish for more verbal tenderness.`,

  Taurus: `You express care through presence and consistency.

You show up reliably, create comfort, and demonstrate commitment through sustained attention. Partners feel secure and valued, though they may need to adjust to your slower pace of emotional expression.`,

  Gemini: `You express care through conversation and mental engagement.

You show interest, ask questions, and stay curious about your partner's inner world. Partners feel heard and stimulated, though they may sometimes want less talk and more feeling.`,

  Cancer: `You express care through nurturing and emotional attunement.

You anticipate needs, create safety, and remember everything that matters to the people you love. Partners feel deeply cared for, though they may sometimes feel overwhelmed by your emotional intensity.`,

  Leo: `You express care through generosity and celebration.

You make partners feel special, create memorable experiences, and love with your whole heart. Partners feel adored and inspired, though they may need to give you recognition in return.`,

  Virgo: `You express care through attentiveness and effort.

You notice what improves the relationship and work toward it quietly. Partners feel supported and valued, even if you don't always verbalise your depth of feeling.`,

  Libra: `You express care through attentiveness and effort.

You notice what improves the relationship and work toward it quietly. Your love often shows up as consistency rather than intensity. Partners tend to feel valued and supported, even if you don't always verbalise your depth of feeling.`,

  Scorpio: `You express care through loyalty and emotional depth.

Once committed, you're completely devoted. You protect fiercely, remember everything, and transform alongside your partner. Partners feel profoundly known, though they must earn this intensity through trust.`,

  Sagittarius: `You express care through enthusiasm and shared adventure.

You include partners in your explorations, share your vision, and keep the relationship moving forward. Partners feel inspired and free, though they may sometimes want more emotional anchoring.`,

  Capricorn: `You express care through commitment and practical support.

You show up reliably, build toward shared goals, and demonstrate devotion through sustained effort. Partners feel secure and respected, though they may wish for more emotional spontaneity.`,

  Aquarius: `You express care through acceptance and intellectual engagement.

You honour your partner's individuality, offer unique perspectives, and stay curious about who they're becoming. Partners feel respected and free, though they may sometimes want more emotional warmth.`,

  Pisces: `You express care through empathy and unconditional acceptance.

You feel what your partner feels, offer compassion without judgment, and love without conditions. Partners feel deeply understood, though they may need to help you maintain boundaries.`,
};

// Pattern that causes misunderstanding by Moon sign
export const misunderstandingPattern: Record<string, string> = {
  Aries: `Because you value directness, you may express frustration before processing it.

Quick reactions can be misread as aggression. Independence can be mistaken for lack of commitment. Your honesty may land harshly when softness was needed.

The real issue is not lack of care, but timing.`,

  Taurus: `Because you value stability, you may resist change even when it's needed.

Steadiness can be misread as stubbornness. Patience can be mistaken for passivity. Your need for time may frustrate partners who want quicker resolution.

The real issue is not inflexibility, but different timelines.`,

  Gemini: `Because you value communication, you may talk when listening is needed.

Curiosity can be misread as superficiality. Adaptability can be mistaken for inconsistency. Your comfort with change may unsettle partners who need more stability.

The real issue is not lack of depth, but different processing speeds.`,

  Cancer: `Because you value emotional security, you may interpret distance as rejection.

Protectiveness can be misread as possessiveness. Memory can be mistaken for grudge-holding. Your emotional needs may overwhelm partners who process differently.

The real issue is not neediness, but different emotional languages.`,

  Leo: `Because you value recognition, you may interpret inattention as lack of love.

Expressiveness can be misread as drama. Need for appreciation can be mistaken for vanity. Your warmth may overwhelm partners who express love more quietly.

The real issue is not attention-seeking, but different love languages.`,

  Virgo: `Because you value improvement, you may express care through criticism.

Helpfulness can be misread as judgment. Attention to flaws can be mistaken for dissatisfaction. Your high standards may make partners feel they're never quite enough.

The real issue is not criticism, but misdirected care.`,

  Libra: `Because you value peace, you may delay expressing dissatisfaction.

Peacemaking can be misread as emotional distance. Thoughtfulness can be mistaken for indecision. Your openness to others may appear like disloyalty when it's actually empathy.

The real issue is not lack of commitment, but delayed honesty.`,

  Scorpio: `Because you value depth, you may interpret lightness as avoidance.

Intensity can be misread as heaviness. Privacy can be mistaken for secrecy. Your need for emotional truth may exhaust partners who process more lightly.

The real issue is not intensity, but different depths.`,

  Sagittarius: `Because you value freedom, you may interpret closeness as confinement.

Independence can be misread as emotional unavailability. Optimism can be mistaken for dismissiveness. Your need for space may hurt partners who need more presence.

The real issue is not lack of commitment, but different proximity needs.`,

  Capricorn: `Because you value achievement, you may prioritise work over relationship.

Reserve can be misread as coldness. Practicality can be mistaken for lack of romance. Your emotional containment may leave partners feeling shut out.

The real issue is not lack of feeling, but difficulty expressing it.`,

  Aquarius: `Because you value independence, you may maintain distance even in intimacy.

Objectivity can be misread as emotional unavailability. Need for space can be mistaken for lack of investment. Your unconventional approach may confuse partners who want traditional assurance.

The real issue is not lack of love, but different intimacy styles.`,

  Pisces: `Because you value connection, you may lose yourself in relationships.

Empathy can be misread as having no opinions. Adaptability can be mistaken for weakness. Your boundary issues may burden partners with responsibility they didn't ask for.

The real issue is not lack of self, but difficulty maintaining edges.`,
};

// Where relationships strain by Moon sign
export const relationshipStrain: Record<string, string> = {
  Aries: `You can run ahead while your partner is still processing.

When your pace isn't matched, frustration builds. You may interpret slowness as lack of enthusiasm. By the time you've moved on, your partner is just catching up.

The strain shows up as feeling alone even when together, like you're always waiting.`,

  Taurus: `You can hold onto patterns long past their usefulness.

When change is needed, you resist. You may interpret push for growth as threat to stability. By the time you're ready to move, opportunities may have passed.

The strain shows up as stuckness disguised as loyalty.`,

  Gemini: `You can stay on the surface while seeming fully engaged.

When depth is needed, you may deflect with conversation. You may interpret emotional intensity as demand. By the time you've finished processing, your partner may have needed action.

The strain shows up as disconnection despite constant communication.`,

  Cancer: `You can make current relationships carry the weight of past ones.

When hurt happens, it activates old wounds. You may interpret present distance as historical abandonment. By the time you've sorted past from present, damage may be done.

The strain shows up as fighting shadows instead of actual issues.`,

  Leo: `You can need more appreciation than partners naturally give.

When recognition is lacking, you may withdraw or perform louder. You may interpret inattention as active rejection. By the time you've expressed your hurt, it may have become accusation.

The strain shows up as feeling undervalued despite being loved.`,

  Virgo: `You can try to fix things that don't need fixing.

When imperfection is present, you focus on improvement. You may interpret acceptance of flaws as lack of standards. By the time you've finished improving, spontaneity may have died.

The strain shows up as relationships that work perfectly but feel lifeless.`,

  Libra: `You can stay connected on the surface while slowly disconnecting internally.

When your needs are repeatedly adjusted for the sake of balance, resentment may build quietly. By the time it surfaces, it can surprise both you and your partner.

The strain shows up as sudden distance in previously harmonious relationships.`,

  Scorpio: `You can test loyalty in ways that damage trust.

When vulnerability feels risky, you may create tests. You may interpret normal distance as betrayal. By the time trust is proven, the testing may have eroded it.

The strain shows up as intensity that protects against the intimacy it seeks.`,

  Sagittarius: `You can need more freedom than closeness allows.

When routine sets in, you may feel trapped. You may interpret partnership needs as confinement. By the time you've found balance, you may have pushed too far away.

The strain shows up as restlessness in relationships that others would find satisfying.`,

  Capricorn: `You can prioritise the relationship structure over the relationship feeling.

When emotions need expression, you may default to function. You may interpret emotional needs as weakness. By the time feelings surface, they've been compressed into something harder to address.

The strain shows up as dutiful relationships that lack warmth.`,

  Aquarius: `You can need more independence than intimacy permits.

When closeness increases, you may create distance. You may interpret emotional demands as control. By the time you've protected your space, you may have hurt the people closest to you.

The strain shows up as isolation within partnership.`,

  Pisces: `You can lose yourself so completely that you disappear from the relationship.

When fusion happens, your own needs become unclear. You may interpret boundary-setting as rejection. By the time you find yourself again, the relationship may have been built around someone you're not.

The strain shows up as resentment without clear cause.`,
};

// What actually helps by Moon sign
export const whatHelps: Record<string, string> = {
  Aries: `Relationships work best when they can hold your energy without trying to calm it.

Partners who have their own strong center, who can push back without breaking, who see your directness as honesty rather than aggression. Space to move, freedom to lead, and trust that independence doesn't mean disconnection.`,

  Taurus: `Relationships work best when they offer stability without stagnation.

Partners who value consistency, who understand that trust builds slowly, who don't mistake your pace for lack of passion. Comfort matters, but so does growth, just on your timeline.`,

  Gemini: `Relationships work best when they stay interesting without becoming chaotic.

Partners who enjoy conversation, who can match your mental energy, who don't interpret your need for variety as lack of commitment. Stimulation matters, but so does depth when you're ready to go there.`,

  Cancer: `Relationships work best when emotional safety is prioritised.

Partners who are emotionally available, who don't dismiss your feelings as excessive, who understand that your depth is a feature not a bug. Security matters, but so does letting you nurture without becoming responsible for everything.`,

  Leo: `Relationships work best when appreciation flows freely in both directions.

Partners who see you clearly, who don't withhold recognition, who understand that your need to be seen is legitimate. Warmth matters, but so does room for your partner's spotlight.`,

  Virgo: `Relationships work best when effort is mutual and improvement is welcome.

Partners who appreciate your attention, who don't interpret helpfulness as criticism, who can meet your standards while helping you soften them. Devotion matters, but so does accepting imperfection, including your own.`,

  Libra: `Relationships work best when disagreement is allowed without threatening connection.

Partners who can hold their own position while staying kind give you room to be honest sooner. Beauty matters, but so does truth. Balance improves when you don't carry it alone.`,

  Scorpio: `Relationships work best when depth is matched and trust is earned.

Partners who aren't afraid of intensity, who can prove reliability over time, who understand that your loyalty is worth the investment. Truth matters, but so does knowing when to surface for air.`,

  Sagittarius: `Relationships work best when freedom and closeness coexist.

Partners who have their own adventures, who don't interpret your need for space as rejection, who can match your optimism while grounding your excess. Growth matters, but so does staying long enough to build something.`,

  Capricorn: `Relationships work best when they're building toward something meaningful.

Partners who take commitment seriously, who understand that your reserve isn't coldness, who can wait for your emotional expression rather than demanding it on their timeline. Achievement matters, but so does letting love be its own accomplishment.`,

  Aquarius: `Relationships work best when individuality is honoured within connection.

Partners who have their own minds, who don't interpret your need for space as rejection, who can engage intellectually while making room for emotion. Independence matters, but so does letting people in far enough to matter.`,

  Pisces: `Relationships work best when empathy flows both ways and boundaries are gently maintained.

Partners who can receive as well as give, who help you stay distinct without feeling abandoned, who understand that your sensitivity is strength not weakness. Connection matters, but so does keeping enough of yourself to remain connected.`,
};

// Question to return to by Moon sign
export const returnQuestion: Record<string, string> = {
  Aries: `"Am I fighting for the relationship, or just fighting?"

That distinction keeps your energy constructive rather than destructive.`,

  Taurus: `"Am I holding on because it's right, or because change is hard?"

That distinction keeps your loyalty from becoming stubbornness.`,

  Gemini: `"Am I talking to connect, or talking to avoid connecting?"

That distinction keeps your communication meaningful rather than defensive.`,

  Cancer: `"Am I responding to what's happening now, or what happened before?"

That distinction keeps your emotional responses proportionate and fair.`,

  Leo: `"Do I need to be seen, or do I need to see myself?"

That distinction keeps your need for recognition from becoming dependency.`,

  Virgo: `"Am I helping because they need it, or because I need to?"

That distinction keeps your service from becoming control.`,

  Libra: `"Am I being fair to the relationship, or fair to myself right now?"

That distinction changes everything for you.`,

  Scorpio: `"Am I protecting the relationship, or testing it?"

That distinction keeps your intensity from destroying what it's trying to preserve.`,

  Sagittarius: `"Am I seeking freedom, or avoiding commitment?"

That distinction keeps your independence from becoming escape.`,

  Capricorn: `"Am I building the relationship, or just maintaining it?"

That distinction keeps your commitment from becoming obligation.`,

  Aquarius: `"Am I maintaining healthy space, or creating unnecessary distance?"

That distinction keeps your independence from becoming isolation.`,

  Pisces: `"Am I feeling for them, or feeling instead of them?"

That distinction keeps your empathy from becoming enmeshment.`,
};
