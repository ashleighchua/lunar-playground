/**
 * Integrative interpretations for the "Work and Impact Style" card
 * Generates prose that shows how work motivation, authority, and burnout actually operate
 * Based on Sun sign (primary)
 */

// What motivates beyond money by Sun sign
export const workMotivation: Record<string, string> = {
  Aries: `You're motivated by challenge, initiation, and being first.

Work needs to test you, move quickly, and let you lead. Repetition without stakes drains you quickly, even if the role looks stable or successful.

You lose motivation when effort stops translating into visible progress.`,

  Taurus: `You're motivated by building something real, tangible, and lasting.

Work needs to produce results you can see and touch. Abstract metrics and constant pivoting drain you quickly, even if the role offers excitement.

You lose motivation when effort doesn't accumulate into something substantial.`,

  Gemini: `You're motivated by variety, learning, and intellectual stimulation.

Work needs to engage your curiosity and let you explore multiple angles. Repetition without novelty drains you quickly, even if the role is stable.

You lose motivation when effort stops teaching you something new.`,

  Cancer: `You're motivated by care, meaning, and emotional connection.

Work needs to matter to people you can see and feel. Abstract corporate goals without human impact drain you quickly, even if the role pays well.

You lose motivation when effort stops feeling like contribution.`,

  Leo: `You're motivated by recognition, creativity, and making your mark.

Work needs to showcase your talents and let you shine. Invisible contributions without acknowledgment drain you quickly, even if the role is important.

You lose motivation when effort stops being seen.`,

  Virgo: `You're motivated by improvement, usefulness, and getting things right.

Work needs to produce quality and solve real problems. Sloppy standards and "good enough" cultures drain you quickly, even if the role offers freedom.

You lose motivation when effort stops making things better.`,

  Libra: `You're motivated by harmony, fairness, and collaborative creation.

Work needs to feel balanced and relationally meaningful. Conflict-heavy environments and isolated roles drain you quickly, even if the role offers autonomy.

You lose motivation when effort stops feeling collaborative.`,

  Scorpio: `You're motivated by depth, transformation, and uncovering what's hidden.

Work needs to mean something and go beyond surface-level. Shallow roles and political games drain you quickly, even if the role offers status.

You lose motivation when effort stops revealing truth.`,

  Sagittarius: `You're motivated by meaning, growth, and expanding possibility.

Work needs to align with your beliefs and offer room to explore. Rigid constraints and narrow scope drain you quickly, even if the role is secure.

You lose motivation when effort stops connecting to purpose.`,

  Capricorn: `You're motivated by mastery, achievement, and building lasting impact.

Work needs to reward sustained effort and let you climb toward something. Quick wins without depth drain you quickly, even if the role looks successful.

You lose motivation when effort stops compounding into something substantial.`,

  Aquarius: `You're motivated by improvement, innovation, and contributing to something that actually matters.

Work needs to stimulate your thinking and give you room to question, reframe, and see the bigger picture. Repetition without purpose drains you quickly, even if the role looks stable or successful.

You tend to lose motivation when effort stops translating into meaning.`,

  Pisces: `You're motivated by meaning, compassion, and creative expression.

Work needs to feel spiritually or emotionally aligned. Purely transactional environments drain you quickly, even if the role offers stability.

You lose motivation when effort stops feeling connected to something larger.`,
};

// How ambition actually shows up by Sun sign
export const ambitionStyle: Record<string, string> = {
  Aries: `Your ambition is direct and competitive.

You're drawn to work that lets you win, lead, and prove yourself. You want to be first, not just present. Traditional paths work fine if they move fast enough.

You tend to lose interest when there's nothing left to conquer.`,

  Taurus: `Your ambition is slow and accumulative.

You're drawn to work that builds wealth, security, and tangible assets over time. Quick wins matter less than lasting results.

You tend to lose interest when instability prevents building.`,

  Gemini: `Your ambition is versatile and intellectual.

You're drawn to work that uses your mind, communication skills, and ability to connect dots. Being known as smart matters more than being known as powerful.

You tend to lose interest when work becomes routine.`,

  Cancer: `Your ambition is protective and nurturing.

You're drawn to work that lets you care for others, build security, and create emotional value. Success means having enough to share and protect.

You tend to lose interest when work lacks heart.`,

  Leo: `Your ambition is creative and visibility-oriented.

You're drawn to work that showcases your talents and puts you center stage. Being recognised for who you are matters more than titles alone.

You tend to lose interest when your contributions go unnoticed.`,

  Virgo: `Your ambition is service-oriented and perfection-driven.

You're drawn to work that lets you improve systems, solve problems, and be genuinely useful. Excellence matters more than visibility.

You tend to lose interest when standards are abandoned.`,

  Libra: `Your ambition is relational and aesthetic.

You're drawn to work that creates beauty, balance, and connection. Success means harmonious outcomes and respected partnerships.

You tend to lose interest when work becomes ugly or unfair.`,

  Scorpio: `Your ambition is intense and transformative.

You're drawn to work that gives you power, depth, and the ability to change things fundamentally. Surface success without real impact feels hollow.

You tend to lose interest when work becomes superficial.`,

  Sagittarius: `Your ambition is expansive and meaning-driven.

You're drawn to work that aligns with your beliefs and expands your horizons. Traditional paths feel restrictive unless they lead somewhere meaningful.

You tend to lose interest when growth stops.`,

  Capricorn: `Your ambition is strategic and long-term.

You're drawn to work that rewards discipline, builds authority, and creates legacy. You're willing to climb slowly if the summit is worth it.

You tend to lose interest when effort isn't respected.`,

  Aquarius: `Your ambition isn't about climbing ladders. It's about impact.

You're drawn to work that allows autonomy, experimentation, and intellectual challenge. Traditional paths can feel restrictive, not because you reject structure, but because you want freedom to think differently within it.

You tend to lose motivation when effort stops translating into meaning.`,

  Pisces: `Your ambition is creative and spiritually aligned.

You're drawn to work that expresses imagination, serves others, or connects to transcendent purpose. Purely material success feels empty.

You tend to lose interest when work becomes soulless.`,
};

// Relationship with authority by Sun sign
export const authorityRelationship: Record<string, string> = {
  Aries: `You don't respond well to authority that slows you down or holds you back.

You respect leaders who act decisively and let you act decisively. Micromanagement triggers rebellion. When given autonomy, you excel.

Your frustration with authority shows up as impatience and direct challenge.`,

  Taurus: `You don't respond well to authority that creates instability or changes direction constantly.

You respect leaders who are reliable, competent, and keep their word. Chaos triggers withdrawal. When given consistency, you deliver.

Your frustration with authority shows up as passive resistance and stubbornness.`,

  Gemini: `You don't respond well to authority that limits your thinking or communication.

You respect leaders who are intellectually engaging and open to ideas. Rigidity triggers boredom. When given mental freedom, you innovate.

Your frustration with authority shows up as disengagement and talking around problems.`,

  Cancer: `You don't respond well to authority that ignores emotional reality or treats people as resources.

You respect leaders who genuinely care about their teams. Coldness triggers self-protection. When emotionally safe, you give loyalty.

Your frustration with authority shows up as quiet withdrawal and emotional distance.`,

  Leo: `You don't respond well to authority that fails to recognise your contributions.

You respect leaders who see talent and give credit generously. Being overlooked triggers drama or withdrawal. When appreciated, you shine.

Your frustration with authority shows up as wounded pride and competitive energy.`,

  Virgo: `You don't respond well to authority that accepts mediocrity or lacks competence.

You respect leaders who maintain high standards and know their craft. Sloppiness triggers criticism. When standards are met, you serve gladly.

Your frustration with authority shows up as critique and anxiety.`,

  Libra: `You don't respond well to authority that creates conflict or treats people unfairly.

You respect leaders who maintain harmony and make balanced decisions. Injustice triggers passive resistance. When treated fairly, you collaborate.

Your frustration with authority shows up as agreeable withdrawal and private resentment.`,

  Scorpio: `You don't respond well to authority that lacks depth or plays political games.

You respect leaders who are genuine, powerful, and trustworthy. Manipulation triggers investigation and eventual betrayal. When you trust leadership, you're fiercely loyal.

Your frustration with authority shows up as strategic resistance and quiet power moves.`,

  Sagittarius: `You don't respond well to authority that constrains freedom or dismisses meaning.

You respect leaders who have vision and give room to explore. Rigidity triggers restlessness. When given purpose and space, you inspire.

Your frustration with authority shows up as philosophical challenge and escape attempts.`,

  Capricorn: `You don't respond well to authority that hasn't earned respect or promotes incompetence.

You respect leaders who've climbed through merit and maintain standards. Politics without substance triggers contempt. When you respect leadership, you support it completely.

Your frustration with authority shows up as quietly building your own path.`,

  Aquarius: `You don't respond well to authority based purely on hierarchy.

You respect competence, clarity, and vision. When leadership lacks substance, you may comply outwardly while disengaging internally. When leadership is thoughtful, you give loyalty and initiative freely.

Your frustration with authority often shows up as quiet resistance rather than open conflict.`,

  Pisces: `You don't respond well to authority that lacks compassion or ignores intuition.

You respect leaders who lead with empathy and vision. Harsh pragmatism triggers escape. When spiritually aligned, you serve devotedly.

Your frustration with authority shows up as passive non-compliance and daydreaming.`,
};

// Where best work happens by Sun sign
export const bestWorkEnvironment: Record<string, string> = {
  Aries: `You thrive in environments that reward initiative and tolerate risk.

Autonomy matters, but so does competition. You work best when there's something to win and room to lead. When you're trusted to move fast, your output is remarkable.`,

  Taurus: `You thrive in environments that value quality and allow steady progress.

Stability matters, but so does tangible reward. You work best when outcomes are clear and effort accumulates. When you're trusted to build, your output is lasting.`,

  Gemini: `You thrive in environments that value ideas and communication.

Variety matters, but so does intellectual exchange. You work best with people who think quickly and share freely. When you're trusted to explore, your output is innovative.`,

  Cancer: `You thrive in environments that feel emotionally safe and personally meaningful.

Connection matters, but so does security. You work best when you care about the people and purpose. When you feel belonging, your output is devoted.`,

  Leo: `You thrive in environments that celebrate creativity and recognise contribution.

Visibility matters, but so does creative freedom. You work best when your talents are showcased and appreciated. When you're in the spotlight, your output is inspiring.`,

  Virgo: `You thrive in environments that value excellence and continuous improvement.

Standards matter, but so does usefulness. You work best when quality is expected and effort matters. When you're trusted to refine, your output is impeccable.`,

  Libra: `You thrive in environments that value collaboration and aesthetic quality.

Harmony matters, but so does fairness. You work best with people who respect partnership and create beauty. When you're trusted to balance, your output is elegant.`,

  Scorpio: `You thrive in environments that allow depth and transformation.

Trust matters, but so does intensity. You work best when you can go beneath the surface and create real change. When you're trusted with power, your output is transformative.`,

  Sagittarius: `You thrive in environments that value vision and allow exploration.

Freedom matters, but so does meaning. You work best when work connects to purpose and allows growth. When you're trusted to explore, your output is expansive.`,

  Capricorn: `You thrive in environments that reward merit and allow advancement.

Structure matters, but so does recognition of effort. You work best when hard work leads somewhere. When you're trusted with responsibility, your output is substantial.`,

  Aquarius: `You thrive in environments that value ideas, perspective, and progress.

Autonomy matters, but so does intellectual exchange. You work best with people who challenge assumptions rather than enforce them. When you're trusted to think and contribute, your output improves noticeably.`,

  Pisces: `You thrive in environments that allow creativity and emotional expression.

Meaning matters, but so does compassion. You work best when work feels spiritually aligned. When you're trusted to create, your output is inspired.`,
};

// How burnout actually develops by Sun sign
export const burnoutPattern: Record<string, string> = {
  Aries: `Burnout doesn't usually come from too much work.

It builds when:
• your initiative is blocked
• challenges disappear
• you're forced to wait without purpose

The early signs are subtle: irritability, picking fights, or sudden disinterest in things you used to care about. Left unaddressed, this turns into exhaustion and cynicism.`,

  Taurus: `Burnout doesn't usually come from hard work alone.

It builds when:
• instability prevents accumulation
• comfort is constantly disrupted
• effort doesn't produce lasting results

The early signs are subtle: stubbornness, physical neglect, or holding onto things that no longer serve you. Left unaddressed, this turns into depletion and stagnation.`,

  Gemini: `Burnout doesn't usually come from too much activity.

It builds when:
• mental stimulation disappears
• communication is ignored
• you're trapped in repetition

The early signs are subtle: restlessness, superficiality, or talking without saying anything. Left unaddressed, this turns into scattered anxiety and disconnection.`,

  Cancer: `Burnout doesn't usually come from caring too much.

It builds when:
• emotional safety disappears
• your care isn't reciprocated
• you're forced to perform without feeling

The early signs are subtle: moodiness, withdrawal, or caring for others while neglecting yourself. Left unaddressed, this turns into protective isolation.`,

  Leo: `Burnout doesn't usually come from working too hard.

It builds when:
• recognition disappears
• creativity is stifled
• your contributions go unseen

The early signs are subtle: performing without feeling, seeking attention in destructive ways, or dramatic withdrawal. Left unaddressed, this turns into wounded pride and depression.`,

  Virgo: `Burnout doesn't usually come from high standards.

It builds when:
• standards are abandoned by others
• your efforts don't improve anything
• perfection is demanded but never acknowledged

The early signs are subtle: hypercriticism, anxiety, or physical symptoms instead of emotions. Left unaddressed, this turns into depleted service and martyrdom.`,

  Libra: `Burnout doesn't usually come from too much relating.

It builds when:
• harmony requires constant sacrifice
• fairness is impossible
• conflict becomes unavoidable

The early signs are subtle: indecision, passive aggression, or agreeing while resenting. Left unaddressed, this turns into identity confusion and relationship exhaustion.`,

  Scorpio: `Burnout doesn't usually come from intensity.

It builds when:
• trust is repeatedly broken
• depth is dismissed
• you're forced into surface-level existence

The early signs are subtle: suspicion, withdrawal, or holding grudges that serve no purpose. Left unaddressed, this turns into isolation and bitterness.`,

  Sagittarius: `Burnout doesn't usually come from too much adventure.

It builds when:
• freedom is constrained
• meaning disappears
• growth becomes impossible

The early signs are subtle: restlessness, preachiness, or running from commitment. Left unaddressed, this turns into aimless escape and shallow optimism.`,

  Capricorn: `Burnout doesn't usually come from hard work.

It builds when:
• effort isn't rewarded
• structure crumbles
• success feels hollow

The early signs are subtle: workaholism, emotional coldness, or measuring worth only by achievement. Left unaddressed, this turns into depression disguised as discipline.`,

  Aquarius: `Burnout doesn't usually come from overwork alone.

It builds when:
• your thinking is constrained
• your contribution feels ignored
• conformity is rewarded over curiosity

The early signs are subtle: cynicism, emotional detachment, contrarian impulses, or a sense of alienation. Left unaddressed, this turns into nervous system fatigue rather than dramatic collapse.`,

  Pisces: `Burnout doesn't usually come from feeling too much.

It builds when:
• boundaries are constantly violated
• compassion isn't returned
• the world feels too harsh

The early signs are subtle: escapism, victimhood, or losing yourself in others' needs. Left unaddressed, this turns into dissolution and spiritual exhaustion.`,
};

// Check-in moment by Sun sign
export const workCheckIn: Record<string, string> = {
  Aries: `If you find yourself picking fights or bored by everything, burnout is likely already underway.

That's the cue to find a new challenge before the restlessness becomes destructive.`,

  Taurus: `If you find yourself holding on to things that no longer serve you, burnout is likely already underway.

That's the cue to build something new before the stagnation becomes permanent.`,

  Gemini: `If you find yourself talking without saying anything meaningful, burnout is likely already underway.

That's the cue to find new stimulation before the restlessness becomes anxiety.`,

  Cancer: `If you find yourself caring for everyone except yourself, burnout is likely already underway.

That's the cue to receive care before the giving becomes depleting.`,

  Leo: `If you find yourself performing without feeling, burnout is likely already underway.

That's the cue to reconnect with genuine expression before the performance becomes emptiness.`,

  Virgo: `If you find yourself criticising everything including yourself, burnout is likely already underway.

That's the cue to accept imperfection before the standards become self-destruction.`,

  Libra: `If you find yourself agreeing while quietly resenting, burnout is likely already underway.

That's the cue to honour your own needs before the balance becomes self-erasure.`,

  Scorpio: `If you find yourself suspicious of everyone and trusting no one, burnout is likely already underway.

That's the cue to release control before the intensity becomes isolation.`,

  Sagittarius: `If you find yourself running from everything without running toward anything, burnout is likely already underway.

That's the cue to find meaning before the freedom becomes escape.`,

  Capricorn: `If you find yourself achieving without feeling, burnout is likely already underway.

That's the cue to reconnect with purpose before the discipline becomes depression.`,

  Aquarius: `If you find yourself questioning everything but caring about nothing, burnout is likely already underway.

That's the cue to restore meaning before reducing effort.`,

  Pisces: `If you find yourself lost in fantasy or drowning in others' emotions, burnout is likely already underway.

That's the cue to find your edges before the compassion becomes dissolution.`,
};
