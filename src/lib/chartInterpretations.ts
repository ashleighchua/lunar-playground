/**
 * Comprehensive chart interpretation data following the 8-section report structure
 * Based on psychological astrology principles - reflective, not predictive
 */

// ============================================
// SECTION 1: OVERVIEW DASHBOARD DATA
// ============================================

export const sunSignOverview: Record<string, {
  coreExpression: string;
  lifeApproach: string;
}> = {
  Aries: {
    coreExpression: "Identity through action and initiation",
    lifeApproach: "Tends to move through life with directness and urgency, preferring to act first and adjust later. Often drawn to beginnings more than maintenance."
  },
  Taurus: {
    coreExpression: "Identity through stability and sensory experience",
    lifeApproach: "Tends to move through life at a deliberate pace, building security through patience and persistence. Often seeks tangible results and lasting foundations."
  },
  Gemini: {
    coreExpression: "Identity through ideas and connection",
    lifeApproach: "Tends to move through life by gathering information and making connections. Often processes experience through language and thrives on variety."
  },
  Cancer: {
    coreExpression: "Identity through nurturing and emotional security",
    lifeApproach: "Tends to move through life by creating safety for self and others. Often processes experience through feeling and memory."
  },
  Leo: {
    coreExpression: "Identity through creative self-expression",
    lifeApproach: "Tends to move through life seeking authentic expression and recognition. Often drawn to situations where personal contribution is visible and valued."
  },
  Virgo: {
    coreExpression: "Identity through service and refinement",
    lifeApproach: "Tends to move through life by analysing and improving. Often finds meaning through being useful and solving practical problems."
  },
  Libra: {
    coreExpression: "Identity through relationship and balance",
    lifeApproach: "Tends to move through life in partnership, seeking harmony and fairness. Often processes experience through dialogue and comparison."
  },
  Scorpio: {
    coreExpression: "Identity through depth and transformation",
    lifeApproach: "Tends to move through life by probing beneath surfaces and engaging with intensity. Often drawn to what is hidden or unspoken."
  },
  Sagittarius: {
    coreExpression: "Identity through meaning and expansion",
    lifeApproach: "Tends to move through life seeking broader horizons and larger truths. Often restless without growth, adventure, or philosophical engagement."
  },
  Capricorn: {
    coreExpression: "Identity through achievement and structure",
    lifeApproach: "Tends to move through life with strategic patience, building toward long-term goals. Often takes responsibility seriously and respects earned authority."
  },
  Aquarius: {
    coreExpression: "Identity through innovation and collective concern",
    lifeApproach: "Tends to move through life questioning conventions and thinking in systems. Often more comfortable with ideas than emotional intimacy."
  },
  Pisces: {
    coreExpression: "Identity through connection to something larger",
    lifeApproach: "Tends to move through life with permeable boundaries, absorbing atmosphere and emotion. Often drawn to creative, spiritual, or healing work."
  }
};

export const moonSignOverview: Record<string, {
  emotionalStyle: string;
  innerNeeds: string;
}> = {
  Aries: {
    emotionalStyle: "Quick, direct emotional responses",
    innerNeeds: "Needs action and autonomy to feel emotionally settled. Processes feelings through movement and immediate expression."
  },
  Taurus: {
    emotionalStyle: "Steady, slow-to-change emotional patterns",
    innerNeeds: "Needs physical comfort and predictability to feel secure. Processes feelings through the body and sensory experience."
  },
  Gemini: {
    emotionalStyle: "Mentally active emotional processing",
    innerNeeds: "Needs conversation and mental stimulation to feel connected. Processes feelings through talking and analysis."
  },
  Cancer: {
    emotionalStyle: "Deep, memory-rich emotional life",
    innerNeeds: "Needs emotional safety and belonging to feel at home. Processes feelings through nurturing and being nurtured."
  },
  Leo: {
    emotionalStyle: "Warm, expressive emotional nature",
    innerNeeds: "Needs appreciation and creative outlet to feel valued. Processes feelings through self-expression and play."
  },
  Virgo: {
    emotionalStyle: "Analytical, service-oriented emotional patterns",
    innerNeeds: "Needs order and usefulness to feel calm. Processes feelings through problem-solving and helping."
  },
  Libra: {
    emotionalStyle: "Relational, harmony-seeking emotional nature",
    innerNeeds: "Needs partnership and aesthetic beauty to feel balanced. Processes feelings through dialogue and fairness."
  },
  Scorpio: {
    emotionalStyle: "Intense, private emotional depths",
    innerNeeds: "Needs trust and emotional honesty to feel safe. Processes feelings through transformation and control."
  },
  Sagittarius: {
    emotionalStyle: "Optimistic, meaning-seeking emotional patterns",
    innerNeeds: "Needs freedom and perspective to feel emotionally healthy. Processes feelings through philosophy and adventure."
  },
  Capricorn: {
    emotionalStyle: "Controlled, achievement-oriented emotional expression",
    innerNeeds: "Needs structure and accomplishment to feel worthy. Processes feelings through productivity and responsibility."
  },
  Aquarius: {
    emotionalStyle: "Detached, intellectualised emotional patterns",
    innerNeeds: "Needs independence and intellectual connection to feel understood. Processes feelings through ideas and friendship."
  },
  Pisces: {
    emotionalStyle: "Boundaryless, absorptive emotional sensitivity",
    innerNeeds: "Needs creative or spiritual outlet to feel whole. Processes feelings through imagination and compassion."
  }
};

export const risingSignOverview: Record<string, {
  firstImpression: string;
  lifeApproachStyle: string;
}> = {
  Aries: {
    firstImpression: "Comes across as direct, energetic, and ready to engage",
    lifeApproachStyle: "Approaches new situations by taking initiative. Tends to lead with action rather than deliberation."
  },
  Taurus: {
    firstImpression: "Comes across as calm, reliable, and grounded",
    lifeApproachStyle: "Approaches new situations with patience and pragmatism. Tends to assess before committing."
  },
  Gemini: {
    firstImpression: "Comes across as curious, adaptable, and communicative",
    lifeApproachStyle: "Approaches new situations through questions and connection. Tends to engage mentally first."
  },
  Cancer: {
    firstImpression: "Comes across as caring, protective, and sensitive",
    lifeApproachStyle: "Approaches new situations by reading emotional atmosphere. Tends to create safety before opening up."
  },
  Leo: {
    firstImpression: "Comes across as confident, warm, and noticeable",
    lifeApproachStyle: "Approaches new situations with self-assurance. Tends to naturally become a focal point."
  },
  Virgo: {
    firstImpression: "Comes across as observant, helpful, and precise",
    lifeApproachStyle: "Approaches new situations by analysing details. Tends to look for how to be useful."
  },
  Libra: {
    firstImpression: "Comes across as charming, diplomatic, and socially graceful",
    lifeApproachStyle: "Approaches new situations through relationship. Tends to seek partnership and consensus."
  },
  Scorpio: {
    firstImpression: "Comes across as intense, perceptive, and private",
    lifeApproachStyle: "Approaches new situations by observing from depth. Tends to assess power dynamics and hidden agendas."
  },
  Sagittarius: {
    firstImpression: "Comes across as enthusiastic, open, and philosophical",
    lifeApproachStyle: "Approaches new situations with optimism and curiosity. Tends to see possibility rather than limitation."
  },
  Capricorn: {
    firstImpression: "Comes across as serious, capable, and composed",
    lifeApproachStyle: "Approaches new situations strategically. Tends to consider long-term implications."
  },
  Aquarius: {
    firstImpression: "Comes across as unique, intellectual, and somewhat detached",
    lifeApproachStyle: "Approaches new situations with fresh perspective. Tends to question assumptions."
  },
  Pisces: {
    firstImpression: "Comes across as gentle, intuitive, and somewhat dreamy",
    lifeApproachStyle: "Approaches new situations through feeling and intuition. Tends to absorb atmosphere before acting."
  }
};

// Core themes by element
export const elementThemes: Record<string, string[]> = {
  Fire: [
    "Identity and self-expression tend to be central concerns",
    "Energy often moves outward, toward action and impact",
    "Inspiration and enthusiasm are important motivators"
  ],
  Earth: [
    "Practicality and tangible results tend to matter greatly",
    "Security and stability are often underlying concerns",
    "Patience and persistence are natural strengths"
  ],
  Air: [
    "Ideas and communication tend to be primary modes of engagement",
    "Objectivity and perspective are often valued",
    "Connection through intellect comes more naturally than through emotion"
  ],
  Water: [
    "Emotional depth and intuition tend to guide decisions",
    "Connection and belonging are often underlying needs",
    "Sensitivity to atmosphere and unspoken dynamics is heightened"
  ]
};

// ============================================
// SECTION 2: PERSONALITY ARCHITECTURE
// ============================================

export const personalityArchitecture: Record<string, {
  coreMotivation: string;
  emotionalRegulation: string;
  decisionMaking: string;
  underPressure: string;
  recharging: string;
}> = {
  Aries: {
    coreMotivation: "Driven by the need to initiate, to prove capability through action, and to maintain a sense of personal agency. Achievement matters less than the feeling of forward movement.",
    emotionalRegulation: "Tends to discharge emotion through activity. Sitting with feelings can feel unbearable; action provides relief. Anger surfaces quickly but often dissipates just as fast. May struggle with sustained emotional processing.",
    decisionMaking: "Decides quickly, often from instinct rather than analysis. Trusts gut reactions. May make choices before fully considering consequences, preferring to adjust course rather than delay action.",
    underPressure: "Initial response is often to fight or push harder. May become more impulsive or irritable. Tends to want to solve problems immediately rather than waiting for clarity.",
    recharging: "Restores energy through physical activity, competition, or starting something new. Needs autonomy and space to move at their own pace. Boredom drains more than effort."
  },
  Taurus: {
    coreMotivation: "Driven by the need for security, comfort, and tangible results. Values what can be built, touched, and relied upon. Motivated by stability more than novelty.",
    emotionalRegulation: "Tends toward emotional steadiness, though can be slow to recognise feelings until they've accumulated. May resist acknowledging distress until it becomes physical. Stability comes through routine.",
    decisionMaking: "Decides slowly and deliberately. Needs time to assess, consider, and feel into choices. Resistant to being rushed. Once decided, rarely reverses course.",
    underPressure: "Initial response is often to dig in and resist change. May become more stubborn or withdrawn. Tends to seek comfort and familiar ground when stressed.",
    recharging: "Restores energy through sensory pleasure, nature, and unhurried time. Needs physical comfort and predictability. Chaos and uncertainty are depleting."
  },
  Gemini: {
    coreMotivation: "Driven by curiosity and the need to understand, connect, and communicate. Information is energising. Motivated by variety and mental stimulation more than singular focus.",
    emotionalRegulation: "Tends to process emotion through talking or writing. May intellectualise feelings rather than sitting with them. Mood can shift quickly. Mental activity can be both coping mechanism and avoidance.",
    decisionMaking: "Decides by gathering information and considering multiple angles. Can struggle with commitment when options remain open. May change mind as new data arrives.",
    underPressure: "Initial response is often mental activity—analysing, researching, talking. May become scattered or anxious. Tends to seek stimulation or distraction when overwhelmed.",
    recharging: "Restores energy through conversation, learning, and variety. Needs mental engagement and social connection. Monotony and isolation are draining."
  },
  Cancer: {
    coreMotivation: "Driven by the need to nurture and be nurtured, to create emotional security, and to belong. Home and family (biological or chosen) are central concerns.",
    emotionalRegulation: "Feels deeply and remembers emotionally. May absorb others' feelings as their own. Retreats into protective shell when hurt. Needs safe space to process without judgement.",
    decisionMaking: "Decides through feeling and intuition. Past experience heavily influences present choices. May struggle to separate own needs from others' expectations.",
    underPressure: "Initial response is often retreat or caretaking. May become moody or withdraw. Tends to seek familiar comfort and trusted people when stressed.",
    recharging: "Restores energy through emotional connection, home environment, and nurturing activities. Needs to feel safe and belonging. Exposure without protection is depleting."
  },
  Leo: {
    coreMotivation: "Driven by the need for authentic self-expression, recognition, and creative contribution. Wants to matter, to be seen, and to inspire. Motivated by appreciation more than mere success.",
    emotionalRegulation: "Expresses emotion dramatically and openly. May struggle when feelings conflict with desired self-image. Pride can prevent acknowledging vulnerability. Needs audience for emotional processing.",
    decisionMaking: "Decides from the heart, based on what feels right and authentic. Personal values matter more than logic alone. Seeks choices that allow self-expression.",
    underPressure: "Initial response is often to take charge or perform confidence. May become more dramatic or controlling. Tends to seek validation when stressed.",
    recharging: "Restores energy through creative activity, appreciation, and play. Needs to feel special and valued. Being overlooked or criticised is particularly draining."
  },
  Virgo: {
    coreMotivation: "Driven by the need to be useful, to improve things, and to serve something larger than self. Finds meaning through practical contribution and skillful work.",
    emotionalRegulation: "Tends to analyse feelings rather than simply feel them. May express distress through physical symptoms or increased criticism. Order and productivity can be calming.",
    decisionMaking: "Decides through careful analysis of details and practical considerations. May over-research or become paralysed by imperfection. Seeks the most efficient or correct choice.",
    underPressure: "Initial response is often increased activity or criticism (of self or others). May become anxious or fixated on details. Tends to seek control through organisation.",
    recharging: "Restores energy through useful activity, health routines, and quiet order. Needs to feel productive and competent. Chaos and criticism are depleting."
  },
  Libra: {
    coreMotivation: "Driven by the need for harmony, partnership, and beauty. Seeks balance in all things and finds identity partly through relationship. Fairness and aesthetics matter deeply.",
    emotionalRegulation: "Tends to balance or suppress emotions that might create conflict. May struggle to identify own feelings separate from others'. Seeks equilibrium through relationship.",
    decisionMaking: "Decides by weighing all perspectives and seeking consensus. May struggle with choices that please self at others' expense. Can become paralysed by seeing all sides.",
    underPressure: "Initial response is often to seek peace or avoid conflict. May become indecisive or people-pleasing. Tends to look for partnership or mediation when stressed.",
    recharging: "Restores energy through beauty, harmony, and companionship. Needs aesthetic pleasure and balanced relating. Conflict and ugliness are draining."
  },
  Scorpio: {
    coreMotivation: "Driven by the need for depth, truth, and transformation. Seeks to understand what lies beneath and to experience life intensely. Power and control are often underlying concerns.",
    emotionalRegulation: "Feels intensely but reveals selectively. May control emotional expression while experiencing profound inner turbulence. Transformation often comes through crisis.",
    decisionMaking: "Decides through deep intuition and assessment of underlying dynamics. Considers what isn't being said. May test situations before committing.",
    underPressure: "Initial response is often to intensify focus or withdraw for strategic assessment. May become controlling or suspicious. Tends to seek power or retreat when stressed.",
    recharging: "Restores energy through depth, solitude, and meaningful intimacy. Needs privacy and trusted connection. Superficiality and exposure are draining."
  },
  Sagittarius: {
    coreMotivation: "Driven by the need for meaning, freedom, and expansion. Seeks truth and broader perspective. Motivated by possibility and growth more than security.",
    emotionalRegulation: "Tends to philosophise feelings or seek meaning in them. May avoid difficult emotions through optimism or escapism. Restless when confined.",
    decisionMaking: "Decides based on what expands possibility and aligns with beliefs. May overlook practical details in favour of vision. Seeks the choice with most freedom.",
    underPressure: "Initial response is often to seek escape, perspective, or meaning. May become preachy or restless. Tends to want to move—physically or mentally—when stressed.",
    recharging: "Restores energy through adventure, learning, and philosophical engagement. Needs freedom and horizon. Confinement and meaninglessness are draining."
  },
  Capricorn: {
    coreMotivation: "Driven by the need to achieve, build lasting structures, and earn respect through competence. Takes the long view. Motivated by mastery and legacy more than quick wins.",
    emotionalRegulation: "Tends to control or suppress emotional expression. May experience feelings as obstacles to productivity. Achievement can substitute for emotional processing.",
    decisionMaking: "Decides strategically, considering long-term consequences and practical realities. Respects tradition and proven methods. Seeks the choice that builds toward goals.",
    underPressure: "Initial response is often to work harder or take more control. May become cold or pessimistic. Tends to isolate and focus on duty when stressed.",
    recharging: "Restores energy through accomplishment, structure, and earned rest. Needs to feel productive and respected. Chaos and perceived failure are draining."
  },
  Aquarius: {
    coreMotivation: "Driven by the need for independence, intellectual stimulation, and contribution to collective progress. Seeks to understand systems and improve them. Motivated by ideas more than personal gain.",
    emotionalRegulation: "Tends to intellectualise or detach from intense feelings. May observe emotions from distance rather than inhabiting them. Connection through ideas feels safer than emotional intimacy.",
    decisionMaking: "Decides based on principle and logic rather than personal feeling. Considers systemic implications. May prioritise the unconventional choice.",
    underPressure: "Initial response is often to detach and analyse. May become more contrarian or emotionally distant. Tends to seek space and intellectual engagement when stressed.",
    recharging: "Restores energy through ideas, friendship, and freedom. Needs intellectual stimulation and autonomy. Emotional demands and conformity are draining."
  },
  Pisces: {
    coreMotivation: "Driven by the need for transcendence, compassion, and creative or spiritual expression. Seeks connection to something larger than individual self. Motivated by meaning and beauty.",
    emotionalRegulation: "Absorbs feelings readily—own and others'. May struggle with boundaries between self and environment. Creative or spiritual practice can be essential for processing.",
    decisionMaking: "Decides through intuition and feeling. May struggle with practical realities or firm boundaries. Seeks the choice that feels right at a soul level.",
    underPressure: "Initial response is often to escape, merge, or sacrifice. May become confused or avoidant. Tends to seek solitude, art, or spiritual practice when stressed.",
    recharging: "Restores energy through creativity, spirituality, and gentle solitude. Needs beauty and meaning. Harshness and too much reality are draining."
  }
};

// ============================================
// SECTION 3: EMOTIONAL & RELATIONSHIP PATTERNS
// ============================================

export const relationshipPatterns: Record<string, {
  needsToFeelSafe: string;
  givesLove: string;
  commonMisunderstandings: string;
  unconsciousPatterns: string;
  whatActuallyHelps: string;
}> = {
  Aries: {
    needsToFeelSafe: "Needs honesty, directness, and space for independence. Feels unsafe when controlled or when conflict is avoided. Requires partners who can handle their intensity without retreating.",
    givesLove: "Shows love through action, protection, and enthusiasm. Will fight for and with loved ones. Expresses care by doing rather than saying.",
    commonMisunderstandings: "Directness can be mistaken for aggression. Need for independence can seem like lack of commitment. Quick anger may obscure deeper feelings.",
    unconsciousPatterns: "May create conflict to feel alive in relationships. Can choose partners who need rescuing. May leave before being left.",
    whatActuallyHelps: "Partners who maintain their own strength and identity. Direct communication without passive aggression. Space to cool down after conflict. Being met with equal energy."
  },
  Taurus: {
    needsToFeelSafe: "Needs consistency, physical affection, and demonstrated reliability over time. Feels unsafe with unpredictability or pressure to change. Requires patience during slow trust-building.",
    givesLove: "Shows love through steadfast presence, physical care, and creating comfort. Provides stability and practical support. Expresses care through sensory gestures.",
    commonMisunderstandings: "Steadiness can be mistaken for lack of passion. Resistance to change can seem like stubbornness. Slow processing may appear dismissive.",
    unconsciousPatterns: "May stay in relationships past their time. Can equate love with possession. May resist growth that threatens security.",
    whatActuallyHelps: "Predictability and follow-through on promises. Physical presence and touch. Not being rushed into decisions. Appreciation for their reliability."
  },
  Gemini: {
    needsToFeelSafe: "Needs mental stimulation, variety, and freedom to communicate openly. Feels unsafe when bored or when conversation is shut down. Requires intellectual engagement.",
    givesLove: "Shows love through attention, conversation, and curiosity about partners. Keeps things interesting. Expresses care through words and shared ideas.",
    commonMisunderstandings: "Lightness can be mistaken for superficiality. Need for variety can seem like inconsistency. Intellectual approach may appear emotionally detached.",
    unconsciousPatterns: "May keep relationships at intellectual distance. Can create drama to avoid boredom. May struggle with emotional depth that can't be talked through.",
    whatActuallyHelps: "Partners who are endlessly interesting and keep growing. Freedom to have outside friendships. Playfulness without possessiveness. Patience with their changeability."
  },
  Cancer: {
    needsToFeelSafe: "Needs emotional availability, nurturing, and sense of home together. Feels unsafe when rejected or when emotions are dismissed. Requires demonstrated care over time.",
    givesLove: "Shows love through nurturing, remembering, and creating emotional safety. Anticipates needs. Expresses care through feeding, protecting, and home-making.",
    commonMisunderstandings: "Sensitivity can be mistaken for fragility. Need for closeness can seem like clinginess. Moodiness may obscure consistent underlying love.",
    unconsciousPatterns: "May mother partners inappropriately. Can use guilt or withdrawal to control. May choose unavailable partners who recreate early wounds.",
    whatActuallyHelps: "Emotional responsiveness and presence. Respect for their need to retreat sometimes. Not dismissing their feelings as irrational. Creating home together."
  },
  Leo: {
    needsToFeelSafe: "Needs appreciation, loyalty, and attention. Feels unsafe when ignored or criticised publicly. Requires partners who can genuinely admire them.",
    givesLove: "Shows love through generosity, loyalty, and celebration of partners. Makes loved ones feel special. Expresses care through grand gestures and devoted attention.",
    commonMisunderstandings: "Need for attention can be mistaken for neediness. Confidence can seem like arrogance. Dramatic expression may be dismissed as performance.",
    unconsciousPatterns: "May choose partners who reflect well on them. Can become controlling when pride is threatened. May compete with rather than support partners.",
    whatActuallyHelps: "Genuine appreciation for who they are. Loyalty during difficult times. Partners with their own light who can share spotlight. Being made to feel special."
  },
  Virgo: {
    needsToFeelSafe: "Needs competence, reliability, and meaningful usefulness in relationship. Feels unsafe with chaos or when criticised unfairly. Requires order and health-conscious living.",
    givesLove: "Shows love through acts of service, attention to detail, and practical help. Notices and tends to needs. Expresses care by improving and fixing.",
    commonMisunderstandings: "Service can be mistaken for lack of passion. Criticism may be intended helpfully but land harshly. Attention to flaws can obscure appreciation.",
    unconsciousPatterns: "May serve to avoid intimacy. Can become critical when anxious. May choose partners who need fixing.",
    whatActuallyHelps: "Appreciation for their efforts without expectation they'll never stop. Partners who take care of their health and space. Patience with their worry. Acknowledging their competence."
  },
  Libra: {
    needsToFeelSafe: "Needs harmony, fairness, and genuine partnership. Feels unsafe with conflict or ugliness. Requires beauty in the relationship and balanced exchange.",
    givesLove: "Shows love through consideration, compromise, and creating beauty together. Makes partners feel valued. Expresses care through attention to relationship quality.",
    commonMisunderstandings: "Peacemaking can be mistaken for lack of authenticity. Indecision can seem like lack of commitment. Attention to others may appear disloyal.",
    unconsciousPatterns: "May lose self in relationships. Can avoid necessary conflict until it explodes. May keep score of fairness obsessively.",
    whatActuallyHelps: "Partners who can hold their own position while remaining kind. Beautiful shared environment. Balanced give and take. Permission to disagree without relationship threat."
  },
  Scorpio: {
    needsToFeelSafe: "Needs depth, loyalty, and complete honesty. Feels unsafe with superficiality or betrayal. Requires privacy respected and intensity matched.",
    givesLove: "Shows love through fierce loyalty, emotional depth, and transformative intimacy. Protects with intensity. Expresses care through committed presence in dark times.",
    commonMisunderstandings: "Intensity can be mistaken for possessiveness. Privacy needs can seem like secrecy. Testing behaviour may push partners away.",
    unconsciousPatterns: "May test partners' loyalty to destruction. Can create power struggles. May choose unavailable partners to avoid vulnerability.",
    whatActuallyHelps: "Partners who can handle intensity without being overwhelmed. Consistent honesty even when difficult. Respecting their need for privacy. Never betraying their trust."
  },
  Sagittarius: {
    needsToFeelSafe: "Needs freedom, honesty, and shared adventure. Feels unsafe when confined or when truth is hidden. Requires space for independent exploration.",
    givesLove: "Shows love through enthusiasm, adventure, and expanding partners' horizons. Inspires growth. Expresses care through honesty and including partners in explorations.",
    commonMisunderstandings: "Need for freedom can be mistaken for lack of commitment. Bluntness can seem unkind. Restlessness may appear as dissatisfaction with partner.",
    unconsciousPatterns: "May leave before being trapped. Can idealise distant options over present reality. May use philosophy to avoid emotional depth.",
    whatActuallyHelps: "Partners with their own interests and adventures. Freedom without possessiveness. Shared growth and exploration. Honest communication even when uncomfortable."
  },
  Capricorn: {
    needsToFeelSafe: "Needs respect, reliability, and shared ambition. Feels unsafe with instability or lack of direction. Requires partners who take life seriously.",
    givesLove: "Shows love through commitment, practical support, and building together. Provides stability. Expresses care through achievement and protection.",
    commonMisunderstandings: "Reserve can be mistaken for coldness. Focus on work can seem like neglect. Practical love may not feel romantic enough.",
    unconsciousPatterns: "May choose partners based on status rather than feeling. Can withhold emotion as control. May prioritise achievement over connection.",
    whatActuallyHelps: "Partners who respect their ambition and support their goals. Patience with their emotional reserve. Structured quality time. Recognition of their efforts."
  },
  Aquarius: {
    needsToFeelSafe: "Needs intellectual connection, independence, and acceptance of their uniqueness. Feels unsafe with emotional demands or pressure to conform. Requires mental stimulation.",
    givesLove: "Shows love through friendship, intellectual engagement, and acceptance. Supports partners' individuality. Expresses care through ideas and loyal friendship.",
    commonMisunderstandings: "Detachment can be mistaken for lack of caring. Need for space can seem like rejection. Unconventional approach may not feel romantic enough.",
    unconsciousPatterns: "May intellectualise feelings to avoid them. Can prioritise causes over close relationships. May choose emotional distance over vulnerable connection.",
    whatActuallyHelps: "Partners who have their own intellectual life and don't need constant emotional reassurance. Space without abandonment. Friendship as foundation. Acceptance of their quirks."
  },
  Pisces: {
    needsToFeelSafe: "Needs gentleness, spiritual or creative connection, and emotional acceptance. Feels unsafe with harshness or emotional unavailability. Requires partners who can hold space for their sensitivity.",
    givesLove: "Shows love through devotion, empathy, and merging. Feels partners' feelings. Expresses care through sacrifice and unconditional acceptance.",
    commonMisunderstandings: "Merging can be mistaken for lack of boundaries. Idealism can seem like unrealistic expectations. Sensitivity may appear as weakness.",
    unconsciousPatterns: "May lose self in partners. Can idealise partners to avoid seeing reality. May sacrifice self to point of resentment or escape.",
    whatActuallyHelps: "Partners who protect their sensitivity without exploiting it. Gentle honesty. Creative or spiritual shared life. Help with practical boundaries."
  }
};

// ============================================
// SECTION 4: WORK, PURPOSE & DRIVE
// ============================================

export const workAndPurpose: Record<string, {
  motivationBeyondMoney: string;
  ambitionStyle: string;
  authorityRelationship: string;
  thriveEnvironment: string;
  burnoutWarnings: string;
}> = {
  Aries: {
    motivationBeyondMoney: "Motivated by challenge, autonomy, and the feeling of forward momentum. Needs to believe in what they're doing and to see direct impact from effort.",
    ambitionStyle: "Ambitious in bursts—passionate about new challenges, less interested in maintaining what's already built. Competes most with self. Needs to feel pioneering.",
    authorityRelationship: "Struggles with authority that feels arbitrary or controlling. Respects competence and action. Works best with autonomy and clear goals.",
    thriveEnvironment: "Thrives in fast-paced environments with clear challenges and room for initiative. Needs variety and the freedom to take action without excessive approval-seeking.",
    burnoutWarnings: "Burns out from boredom faster than overwork. Warning signs: irritability without cause, starting fights, inability to finish anything, physical restlessness."
  },
  Taurus: {
    motivationBeyondMoney: "Motivated by stability, quality, and tangible outcomes. Needs to build something real and lasting. Values comfort and beauty in work environment.",
    ambitionStyle: "Ambitious in a steady, long-term way. Builds methodically rather than racing. More interested in security than glory. Patient about timeline.",
    authorityRelationship: "Accepts reasonable authority without difficulty. Respects tradition and proven methods. Resistant when pushed to change too quickly.",
    thriveEnvironment: "Thrives in stable environments with clear expectations and pleasant surroundings. Needs adequate time for quality work and minimal chaos.",
    burnoutWarnings: "Burns out from instability and being rushed. Warning signs: physical exhaustion, stubborn resistance to everything, overindulgence, withdrawal."
  },
  Gemini: {
    motivationBeyondMoney: "Motivated by learning, variety, and communication. Needs mental stimulation and the chance to use verbal or written skills. Boredom is the enemy.",
    ambitionStyle: "Ambitious for knowledge and influence through ideas. May pursue multiple paths simultaneously. More interested in being interesting than climbing hierarchy.",
    authorityRelationship: "Questions authority naturally but not confrontationally. Respects intelligence and flexibility. Chafes under rigid rules.",
    thriveEnvironment: "Thrives in varied environments with intellectual stimulation and social interaction. Needs flexibility, multiple projects, and freedom to communicate.",
    burnoutWarnings: "Burns out from monotony and isolation. Warning signs: scattered thinking, inability to focus, gossip and negativity, physical anxiety."
  },
  Cancer: {
    motivationBeyondMoney: "Motivated by feeling useful and creating security for self and others. Needs emotional meaning in work and connection with people served.",
    ambitionStyle: "Ambitious for security and the ability to nurture. May sacrifice recognition for stability. Builds protective structures for self and team.",
    authorityRelationship: "Responds to authority that feels parental and protective. Struggles with cold or unsupportive leadership. Gives loyalty when cared for.",
    thriveEnvironment: "Thrives in supportive environments that feel like family. Needs emotional safety and meaningful work. Appreciates recognition but needs security more.",
    burnoutWarnings: "Burns out from emotional depletion and feeling unappreciated. Warning signs: moodiness, withdrawal, resentment, physical stomach issues, caretaking to point of exhaustion."
  },
  Leo: {
    motivationBeyondMoney: "Motivated by creative expression, recognition, and the feeling of making a difference. Needs to feel proud of work and to be acknowledged for contribution.",
    ambitionStyle: "Ambitious for recognition and creative leadership. Wants to be best at something. May struggle in roles without visibility.",
    authorityRelationship: "Respects authority that respects them. Needs to feel valued by leadership. Can struggle when not given sufficient recognition.",
    thriveEnvironment: "Thrives in environments that appreciate and showcase their contribution. Needs creative freedom and visibility. Appreciates generous leadership.",
    burnoutWarnings: "Burns out from lack of recognition and creative suppression. Warning signs: dramatic complaints, attention-seeking behaviour, loss of motivation, heart-related stress."
  },
  Virgo: {
    motivationBeyondMoney: "Motivated by excellence, usefulness, and meaningful improvement. Needs to feel competent and to see tangible results from efforts. Quality matters more than quantity.",
    ambitionStyle: "Ambitious for mastery and indispensability. May avoid visibility while being essential. Earns advancement through competence rather than politics.",
    authorityRelationship: "Respects competent authority and clear expectations. Critical of leadership that doesn't meet standards. Works well with structure.",
    thriveEnvironment: "Thrives in organised environments where quality is valued and competence recognised. Needs clear expectations and the ability to improve processes.",
    burnoutWarnings: "Burns out from perfectionism and feeling unappreciated for efforts. Warning signs: excessive criticism, physical health issues, anxiety, martyrdom."
  },
  Libra: {
    motivationBeyondMoney: "Motivated by harmony, beauty, and positive impact on relationships. Needs pleasant work environment and sense of fairness. Values collaboration.",
    ambitionStyle: "Ambitious for partnership success and aesthetic achievement. May struggle with competitive environments. Advances through relationships and diplomacy.",
    authorityRelationship: "Works well with fair authority and struggles with favouritism. Needs respectful communication. May avoid conflict with difficult bosses too long.",
    thriveEnvironment: "Thrives in harmonious environments with collaboration and aesthetic quality. Needs fairness, pleasant colleagues, and balanced workload.",
    burnoutWarnings: "Burns out from conflict and unfairness. Warning signs: indecision paralysis, passive aggressive behaviour, relationship focus over work, physical stress from suppressed conflict."
  },
  Scorpio: {
    motivationBeyondMoney: "Motivated by depth, meaning, and transformative impact. Needs to feel work matters profoundly. Values influence and understanding hidden dynamics.",
    ambitionStyle: "Ambitious for power and profound influence. Plays long game strategically. May not reveal extent of ambition. Aims for positions of control.",
    authorityRelationship: "Assesses authority's real power and integrity carefully. Respects strength and despises weakness or dishonesty. Loyal to worthy leaders, dangerous enemy to unworthy ones.",
    thriveEnvironment: "Thrives in environments with depth, meaning, and some element of investigation or transformation. Needs privacy, trust, and real stakes.",
    burnoutWarnings: "Burns out from powerlessness and betrayal. Warning signs: obsessive focus, paranoid thinking, withdrawal, manipulative behaviour, exhaustion from intensity."
  },
  Sagittarius: {
    motivationBeyondMoney: "Motivated by meaning, growth, and freedom. Needs to believe work contributes to something larger. Values learning and expanded horizons.",
    ambitionStyle: "Ambitious for impact and adventure rather than status. May resist conventional paths. Seeks roles with freedom and vision.",
    authorityRelationship: "Struggles with restrictive or small-minded authority. Respects visionary leadership. Needs autonomy and trust.",
    thriveEnvironment: "Thrives in environments with purpose, variety, and freedom. Needs room to grow and explore. Values ethics and big-picture thinking.",
    burnoutWarnings: "Burns out from confinement and meaninglessness. Warning signs: restlessness, preachiness, escapism, irresponsibility, physical need to flee."
  },
  Capricorn: {
    motivationBeyondMoney: "Motivated by achievement, respect, and building something lasting. Needs to feel work contributes to long-term success. Values competence and results.",
    ambitionStyle: "Highly ambitious in traditional sense—wants advancement, recognition, and increasing responsibility. Plays long game patiently. Takes strategic approach.",
    authorityRelationship: "Respects legitimate authority and earned position. Aims to become authority. Works within structures effectively.",
    thriveEnvironment: "Thrives in structured environments with clear hierarchy and paths to advancement. Needs responsibility and recognition for competence.",
    burnoutWarnings: "Burns out from overwork and insufficient recognition. Warning signs: cold withdrawal, excessive control, physical stiffness, depression, loss of work-life boundary."
  },
  Aquarius: {
    motivationBeyondMoney: "Motivated by innovation, improvement, and contribution to collective progress. Needs intellectual stimulation and freedom to think differently.",
    ambitionStyle: "Ambitious for impact and innovation rather than conventional success. May reject traditional paths. Seeks roles with autonomy and intellectual challenge.",
    authorityRelationship: "Questions authority by default. Respects competence and vision, not mere position. Works best with unusual latitude.",
    thriveEnvironment: "Thrives in innovative environments with intellectual freedom and progressive values. Needs autonomy and colleagues who think differently.",
    burnoutWarnings: "Burns out from conformity pressure and intellectual stagnation. Warning signs: contrarian behaviour, emotional detachment, alienation, nervous system stress."
  },
  Pisces: {
    motivationBeyondMoney: "Motivated by meaning, beauty, and compassionate contribution. Needs to feel work serves something larger. Values creativity and helping others.",
    ambitionStyle: "Ambivalent about traditional ambition. May drift without clear direction. Succeeds in roles allowing creativity, healing, or spiritual dimension.",
    authorityRelationship: "Sensitive to authority's energy and integrity. May absorb or escape unhealthy dynamics rather than confronting. Needs gentle, ethical leadership.",
    thriveEnvironment: "Thrives in gentle environments with meaning, creativity, and minimal harsh competition. Needs flexibility and permission to work in own way.",
    burnoutWarnings: "Burns out from harsh environments and boundary violations. Warning signs: escapism, confusion, physical exhaustion, martyrdom, loss of self in work."
  }
};

// ============================================
// SECTION 5: STRESS, SHADOW & GROWTH ZONES
// ============================================

export const shadowAndGrowth: Record<string, {
  frictionPoints: string;
  internalContradictions: string;
  emotionalBlindSpots: string;
  copingMechanisms: string;
  whatGrowthLooksLike: string;
}> = {
  Aries: {
    frictionPoints: "Friction tends to appear around patience, follow-through, and consideration of others' pace. May create conflict where none exists. Struggles when forced to wait or collaborate.",
    internalContradictions: "Needs independence but also wants to matter to others. Wants to win but may not actually enjoy winning. Appears confident but may act from deep insecurity.",
    emotionalBlindSpots: "May not recognise how aggression affects others. Can miss the value of patience and process. May overlook emotional nuance in pursuit of action.",
    copingMechanisms: "Tends to cope through action, competition, or anger. May use conflict to avoid vulnerability. Physical activity is healthy outlet; aggression is the shadow version.",
    whatGrowthLooksLike: "Growth involves developing patience without losing fire. Learning to collaborate without feeling diminished. Finding courage to be vulnerable, not just strong."
  },
  Taurus: {
    frictionPoints: "Friction tends to appear around change, flexibility, and attachment. May resist necessary transformation. Struggles when security is threatened or pace is forced.",
    internalContradictions: "Values stability but may create stagnation. Wants comfort but comfort zone can become prison. Appears unshakeable but may be deeply anxious about change.",
    emotionalBlindSpots: "May not recognise how stubbornness affects relationships. Can miss when holding on becomes hoarding. May overlook opportunities while protecting what exists.",
    copingMechanisms: "Tends to cope through comfort, routine, or acquisition. May use pleasure to avoid difficult feelings. Grounding is healthy outlet; overindulgence is shadow version.",
    whatGrowthLooksLike: "Growth involves embracing necessary change without losing stability. Learning that security comes from within, not possessions. Finding flexibility within structure."
  },
  Gemini: {
    frictionPoints: "Friction tends to appear around commitment, depth, and emotional presence. May scatter energy too widely. Struggles when required to go deep or stay still.",
    internalContradictions: "Wants connection but may avoid intimacy. Seeks truth but can manipulate with words. Appears light but may use levity to mask depth.",
    emotionalBlindSpots: "May not recognise how inconsistency affects others. Can miss emotional depth while processing intellectually. May overlook the value of single-pointed focus.",
    copingMechanisms: "Tends to cope through talking, analysis, or distraction. May use information-gathering to avoid feeling. Communication is healthy outlet; gossip and restlessness are shadow versions.",
    whatGrowthLooksLike: "Growth involves developing depth without losing breadth. Learning to stay with difficult emotions rather than talking through them. Finding meaning in commitment."
  },
  Cancer: {
    frictionPoints: "Friction tends to appear around boundaries, emotional independence, and releasing the past. May absorb others' problems as own. Struggles with necessary separations.",
    internalContradictions: "Wants closeness but may push people away when hurt. Wants to nurture but may smother. Appears soft but can be surprisingly hard when protecting self.",
    emotionalBlindSpots: "May not recognise how moodiness affects others. Can miss when nurturing becomes controlling. May overlook present because of past attachment.",
    copingMechanisms: "Tends to cope through withdrawal, nurturing others, or emotional eating. May use caretaking to avoid own needs. Emotional expression is healthy; manipulation through guilt is shadow version.",
    whatGrowthLooksLike: "Growth involves developing emotional independence without losing sensitivity. Learning to nurture self as well as others. Finding security within rather than from others."
  },
  Leo: {
    frictionPoints: "Friction tends to appear around pride, recognition, and sharing spotlight. May dominate when feeling insecure. Struggles when not appreciated or when others shine brighter.",
    internalContradictions: "Wants to be special but fears being seen as needy. Wants admiration but may not believe compliments. Appears confident but may act from deep need for validation.",
    emotionalBlindSpots: "May not recognise how need for attention affects others. Can miss when confidence becomes arrogance. May overlook others' contributions while seeking own recognition.",
    copingMechanisms: "Tends to cope through performance, creativity, or seeking attention. May use drama to avoid real vulnerability. Self-expression is healthy outlet; attention-seeking is shadow version.",
    whatGrowthLooksLike: "Growth involves developing inner validation without losing warmth. Learning to celebrate others genuinely. Finding confidence that doesn't require constant reassurance."
  },
  Virgo: {
    frictionPoints: "Friction tends to appear around perfectionism, criticism, and accepting imperfection. May nitpick when anxious. Struggles when things are messy or efforts unappreciated.",
    internalContradictions: "Wants to help but criticism can hurt. Seeks perfection but is never satisfied. Appears humble but may secretly feel superior.",
    emotionalBlindSpots: "May not recognise how criticism affects others. Can miss the big picture while focused on details. May overlook own needs while serving others.",
    copingMechanisms: "Tends to cope through analysis, work, or creating order. May use productivity to avoid feeling. Service is healthy outlet; martyrdom and criticism are shadow versions.",
    whatGrowthLooksLike: "Growth involves accepting imperfection without abandoning standards. Learning to receive as well as give. Finding worth that doesn't depend on usefulness."
  },
  Libra: {
    frictionPoints: "Friction tends to appear around decision-making, authentic expression, and tolerating conflict. May lose self in relationships. Struggles when forced to choose or displease others.",
    internalContradictions: "Wants peace but peace-keeping may create resentment. Wants partnership but may lose individual identity. Appears balanced but may be suppressing real feelings.",
    emotionalBlindSpots: "May not recognise how people-pleasing affects authenticity. Can miss own needs while focused on others'. May overlook when harmony is superficial or unhealthy.",
    copingMechanisms: "Tends to cope through relating, aesthetics, or avoiding conflict. May use pleasantness to mask real feelings. Harmony-seeking is healthy outlet; codependence is shadow version.",
    whatGrowthLooksLike: "Growth involves developing clear identity separate from relationship. Learning to tolerate necessary conflict. Finding balance that includes own needs."
  },
  Scorpio: {
    frictionPoints: "Friction tends to appear around control, trust, and letting go. May create power struggles unnecessarily. Struggles when feeling vulnerable or when secrets are exposed.",
    internalContradictions: "Wants intimacy but tests and pushes others away. Wants truth but may hide own truths. Appears controlled but may be driven by overwhelming feelings.",
    emotionalBlindSpots: "May not recognise how intensity affects others. Can miss when protection becomes paranoia. May overlook simple explanations in favour of hidden agendas.",
    copingMechanisms: "Tends to cope through control, investigation, or intensity. May use secrets to maintain power. Depth is healthy outlet; manipulation and obsession are shadow versions.",
    whatGrowthLooksLike: "Growth involves developing trust without requiring proof. Learning to be vulnerable without controlling outcome. Finding power through surrender as well as will."
  },
  Sagittarius: {
    frictionPoints: "Friction tends to appear around commitment, presence, and practical details. May escape rather than address problems. Struggles when freedom is limited or beliefs challenged.",
    internalContradictions: "Wants meaning but may avoid difficult realities. Wants freedom but may fear intimacy. Appears open but may use positivity to avoid depth.",
    emotionalBlindSpots: "May not recognise how restlessness affects others. Can miss present moment while seeking horizon. May overlook practical needs in favour of abstract ideals.",
    copingMechanisms: "Tends to cope through movement, philosophy, or optimism. May use adventure to avoid difficult feelings. Meaning-seeking is healthy outlet; escapism and preachiness are shadow versions.",
    whatGrowthLooksLike: "Growth involves developing presence without losing expansiveness. Learning to find adventure in depth as well as breadth. Finding freedom within commitment."
  },
  Capricorn: {
    frictionPoints: "Friction tends to appear around control, vulnerability, and work-life balance. May sacrifice wellbeing for achievement. Struggles when feeling unsuccessful or out of control.",
    internalContradictions: "Wants respect but may not respect self. Wants achievement but may not enjoy success. Appears strong but may be driven by fear of failure.",
    emotionalBlindSpots: "May not recognise how coldness affects relationships. Can miss emotional needs while focused on practical ones. May overlook joy in pursuit of duty.",
    copingMechanisms: "Tends to cope through work, control, or withdrawal. May use achievement to avoid feeling. Structure is healthy outlet; workaholism and rigidity are shadow versions.",
    whatGrowthLooksLike: "Growth involves developing warmth without losing competence. Learning that rest is productive. Finding worth that doesn't depend on achievement."
  },
  Aquarius: {
    frictionPoints: "Friction tends to appear around emotional intimacy, conformity, and being present with feelings. May intellectualise to avoid emotion. Struggles when required to be emotionally available.",
    internalContradictions: "Wants connection but may keep distance. Wants to help humanity but may struggle with individuals. Appears detached but may care deeply in hidden ways.",
    emotionalBlindSpots: "May not recognise how detachment affects close relationships. Can miss emotional nuance while focused on ideas. May overlook personal relationships for causes.",
    copingMechanisms: "Tends to cope through intellectualising, socialising with groups, or being contrary. May use ideas to avoid feelings. Independent thinking is healthy; alienation is shadow version.",
    whatGrowthLooksLike: "Growth involves developing intimacy without losing independence. Learning to be present emotionally without analysis. Finding connection that includes vulnerability."
  },
  Pisces: {
    frictionPoints: "Friction tends to appear around boundaries, reality, and practical matters. May lose self in others or escape into fantasy. Struggles when required to be firm or pragmatic.",
    internalContradictions: "Wants to merge but may lose identity. Wants to help but may enable dysfunction. Appears selfless but may avoid self through service.",
    emotionalBlindSpots: "May not recognise where self ends and other begins. Can miss practical realities while attuned to subtle ones. May overlook own needs while absorbing others'.",
    copingMechanisms: "Tends to cope through escape, creativity, or sacrifice. May use substances or fantasy to avoid pain. Compassion is healthy outlet; martyrdom and escapism are shadow versions.",
    whatGrowthLooksLike: "Growth involves developing boundaries without losing compassion. Learning to help without absorbing. Finding self within connection rather than losing self."
  }
};

// ============================================
// SECTION 6: TIMING & LIFE CYCLES
// ============================================

export const timingPatterns: Record<string, {
  experienceOfChange: string;
  cyclicPatterns: string;
  recurringThemes: string;
  workingWithTime: string;
}> = {
  Aries: {
    experienceOfChange: "Tends to experience change as exciting challenge or frustrating obstacle, rarely neutral. May initiate change impulsively, then struggle with consequences. Generally prefers action to waiting.",
    cyclicPatterns: "Life tends to move in cycles of intense beginning energy followed by need for new beginnings. May experience periodic crises that require starting over. Identity often transforms through action.",
    recurringThemes: "Themes of independence, courage, and anger may resurface at key life transitions. Questions about leadership, competition, and self-assertion tend to return in new forms.",
    workingWithTime: "Works best with time by embracing new cycles actively rather than resisting change. Benefits from channelling impatience into preparation. Growth comes through learning that timing has its own wisdom."
  },
  Taurus: {
    experienceOfChange: "Tends to experience change as threat to security before accepting it as opportunity. May resist transitions long after they've begun. Generally prefers stability to novelty.",
    cyclicPatterns: "Life tends to move in slow, steady cycles with periodic forced transformations. May experience crises that require releasing attachments. Growth often comes through loss that leads to deeper values.",
    recurringThemes: "Themes of security, values, and attachment may resurface at key life transitions. Questions about what truly matters, what to hold and release, tend to return.",
    workingWithTime: "Works best with time by trusting gradual processes rather than forcing change. Benefits from building flexibility into stable structures. Growth comes through accepting impermanence within permanence."
  },
  Gemini: {
    experienceOfChange: "Tends to experience change as mental stimulation and opportunity for learning. May adapt too quickly without integrating lessons. Generally enjoys variety and new information.",
    cyclicPatterns: "Life tends to move in cycles of learning, communicating, and integrating. May experience crises that require deeper commitment. Growth often comes through choosing depth over breadth.",
    recurringThemes: "Themes of communication, learning, and duality may resurface at key life transitions. Questions about truth, commitment, and integration of opposites tend to return.",
    workingWithTime: "Works best with time by using periods of change for learning and connection. Benefits from documenting insights across transitions. Growth comes through finding continuity within variety."
  },
  Cancer: {
    experienceOfChange: "Tends to experience change as emotional upheaval requiring processing and adjustment. May cling to past during transitions. Generally needs security before embracing new phases.",
    cyclicPatterns: "Life tends to move in cycles closely tied to family and emotional development. May experience crises that require leaving home or redefining family. Growth often comes through emotional release.",
    recurringThemes: "Themes of home, family, and emotional security may resurface at key life transitions. Questions about belonging, nurturing, and the past tend to return in new forms.",
    workingWithTime: "Works best with time by honouring emotional transitions rather than rushing through them. Benefits from creating new forms of home and security. Growth comes through releasing past while keeping its gifts."
  },
  Leo: {
    experienceOfChange: "Tends to experience change through the lens of identity and self-expression. May dramatise transitions or see them as personal stories. Generally needs to find creative meaning in change.",
    cyclicPatterns: "Life tends to move in cycles of creative expression and identity development. May experience crises that require ego surrender. Growth often comes through finding authentic rather than performed self.",
    recurringThemes: "Themes of creativity, recognition, and self-worth may resurface at key life transitions. Questions about authenticity, pride, and contribution tend to return.",
    workingWithTime: "Works best with time by finding the creative opportunity in each life phase. Benefits from documenting personal journey. Growth comes through discovering that identity evolves while core self remains."
  },
  Virgo: {
    experienceOfChange: "Tends to experience change through analysis and desire for improvement. May try to control transitions through planning. Generally needs to find useful role in new circumstances.",
    cyclicPatterns: "Life tends to move in cycles of service, refinement, and health. May experience crises that require accepting imperfection. Growth often comes through surrendering control.",
    recurringThemes: "Themes of service, health, and improvement may resurface at key life transitions. Questions about perfectionism, usefulness, and self-acceptance tend to return.",
    workingWithTime: "Works best with time by using transitions for practical improvement and skill development. Benefits from creating helpful routines for each phase. Growth comes through accepting natural cycles without forcing improvement."
  },
  Libra: {
    experienceOfChange: "Tends to experience change through relationship lens and search for balance. May struggle with transitions that require choosing or acting alone. Generally needs to find harmony in new circumstances.",
    cyclicPatterns: "Life tends to move in cycles closely tied to partnerships and relationship evolution. May experience crises that require finding individual identity. Growth often comes through balancing self and other.",
    recurringThemes: "Themes of relationship, balance, and fairness may resurface at key life transitions. Questions about partnership, independence, and values tend to return.",
    workingWithTime: "Works best with time by using transitions to recalibrate relationships and values. Benefits from maintaining connections across changes. Growth comes through finding inner balance that doesn't depend on external harmony."
  },
  Scorpio: {
    experienceOfChange: "Tends to experience change as death and rebirth, intensely and transformatively. May resist until crisis forces surrender. Generally emerges from transitions fundamentally altered.",
    cyclicPatterns: "Life tends to move in cycles of intensity, crisis, and regeneration. May experience dramatic endings that require complete transformation. Growth often comes through surrendering control to larger processes.",
    recurringThemes: "Themes of power, intimacy, and transformation may resurface at key life transitions. Questions about trust, control, and what must die for new life tend to return.",
    workingWithTime: "Works best with time by surrendering to transformation rather than controlling it. Benefits from trusting the death-rebirth cycle. Growth comes through releasing what's ready to go rather than holding on."
  },
  Sagittarius: {
    experienceOfChange: "Tends to experience change as adventure and opportunity for growth. May rush through transitions toward the next horizon. Generally approaches new phases with optimism and enthusiasm.",
    cyclicPatterns: "Life tends to move in cycles of expansion, exploration, and meaning-making. May experience crises that require finding depth rather than breadth. Growth often comes through committing to a path.",
    recurringThemes: "Themes of meaning, freedom, and truth may resurface at key life transitions. Questions about belief, commitment, and purpose tend to return.",
    workingWithTime: "Works best with time by embracing each phase as part of larger journey toward meaning. Benefits from finding adventure in each life chapter. Growth comes through discovering that depth can be as freeing as breadth."
  },
  Capricorn: {
    experienceOfChange: "Tends to experience change through lens of achievement and long-term planning. May try to maintain control through transitions. Generally approaches new phases strategically.",
    cyclicPatterns: "Life tends to move in cycles of building, achievement, and restructuring. May experience crises that require releasing attachment to status. Growth often comes through finding worth beyond achievement.",
    recurringThemes: "Themes of authority, achievement, and structure may resurface at key life transitions. Questions about success, responsibility, and integrity tend to return.",
    workingWithTime: "Works best with time by building structures that can evolve rather than trying to control change. Benefits from strategic patience. Growth comes through accepting that some achievements must be released for new building."
  },
  Aquarius: {
    experienceOfChange: "Tends to experience change through intellectual lens and systemic perspective. May detach emotionally from transitions. Generally approaches new phases as experiments or evolution.",
    cyclicPatterns: "Life tends to move in cycles of innovation, rebellion, and integration. May experience crises that require personal rather than collective focus. Growth often comes through connecting head and heart.",
    recurringThemes: "Themes of freedom, innovation, and belonging may resurface at key life transitions. Questions about individuality, community, and authenticity tend to return.",
    workingWithTime: "Works best with time by viewing transitions as part of larger evolution. Benefits from maintaining perspective while engaging personally. Growth comes through finding personal meaning in collective changes."
  },
  Pisces: {
    experienceOfChange: "Tends to experience change as dissolution and reformation, often confusingly. May lose sense of self during transitions. Generally needs spiritual or creative framework for understanding change.",
    cyclicPatterns: "Life tends to move in cycles of merging, loss, and spiritual development. May experience crises that require establishing boundaries. Growth often comes through finding self within transcendence.",
    recurringThemes: "Themes of surrender, creativity, and spirituality may resurface at key life transitions. Questions about boundaries, sacrifice, and meaning tend to return.",
    workingWithTime: "Works best with time by trusting the flow rather than fighting currents. Benefits from creative or spiritual practices during transitions. Growth comes through maintaining identity while allowing dissolution of what no longer serves."
  }
};

// ============================================
// SECTION 7: LOCATION & ENVIRONMENT (Based on elements)
// ============================================

export const environmentSensitivity: Record<string, {
  environmentalNeeds: string;
  heavierPlaces: string;
  lighterPlaces: string;
  relocationEffects: string;
  choosingLocations: string;
}> = {
  Fire: {
    environmentalNeeds: "Fire signs generally need environments with warmth, activity, and energy. Stagnant or cold places can dampen vitality. Benefits from climates and cities with movement and enthusiasm.",
    heavierPlaces: "May find cold, damp, or very dense urban environments draining. Places with heavy bureaucracy or slow pace can frustrate. Environments that suppress spontaneity feel confining.",
    lighterPlaces: "Often thrives in warm climates, active cities, or places with strong sports or entrepreneurial culture. Benefits from environments that allow physical expression and initiative.",
    relocationEffects: "Moving to a place that matches fire energy can increase vitality and confidence. Moving somewhere suppressive can lead to frustration, restlessness, or loss of motivation.",
    choosingLocations: "For rest: places with warmth and nature that allow activity. For work: dynamic cities with opportunity for initiative. For relationships: places with active social scenes and directness."
  },
  Earth: {
    environmentalNeeds: "Earth signs generally need environments with stability, natural beauty, and practical functionality. Chaotic or ugly places can disturb wellbeing. Benefits from solid infrastructure and sensory pleasure.",
    heavierPlaces: "May find chaotic, unstable, or purely urban environments draining. Places with extreme change or uncertainty can create anxiety. Environments without natural elements feel depleting.",
    lighterPlaces: "Often thrives in places with natural beauty, good food culture, and stable infrastructure. Benefits from environments that value quality, craftsmanship, and practical comfort.",
    relocationEffects: "Moving to a place with natural beauty and stability can increase groundedness and productivity. Moving somewhere chaotic can lead to anxiety, overwork, or physical discomfort.",
    choosingLocations: "For rest: places with nature, good food, and comfort. For work: cities with strong economies and practical opportunities. For relationships: places with loyalty, tradition, and sensory culture."
  },
  Air: {
    environmentalNeeds: "Air signs generally need environments with intellectual stimulation, social connection, and freedom of movement. Isolated or anti-intellectual places can dampen spirit. Benefits from cultural and communicative vibrancy.",
    heavierPlaces: "May find isolated, intellectually dead, or very traditional environments draining. Places with heavy emphasis on emotion over reason can overwhelm. Environments without variety feel stifling.",
    lighterPlaces: "Often thrives in cosmopolitan cities with diverse ideas and people. Benefits from environments with strong educational, cultural, or tech sectors and good public transit.",
    relocationEffects: "Moving to a place with intellectual vibrancy can increase creativity and social satisfaction. Moving somewhere isolated can lead to loneliness, boredom, or scattered thinking.",
    choosingLocations: "For rest: places with interesting but not overwhelming culture. For work: cities with knowledge economy and diverse networking. For relationships: places with social ease and intellectual culture."
  },
  Water: {
    environmentalNeeds: "Water signs generally need environments with emotional depth, privacy options, and ideally actual water nearby. Harsh or emotionally cold places can disturb wellbeing. Benefits from atmosphere and meaningful culture.",
    heavierPlaces: "May find harsh, competitive, or emotionally superficial environments draining. Places with aggressive energy or lack of privacy can overwhelm. Environments without soul feel depleting.",
    lighterPlaces: "Often thrives near bodies of water or in places with rich emotional and cultural life. Benefits from environments that allow privacy and value depth over surface success.",
    relocationEffects: "Moving to a place with emotional and aesthetic richness can increase creativity and inner peace. Moving somewhere harsh can lead to emotional depletion, withdrawal, or escapism.",
    choosingLocations: "For rest: places near water with privacy and beauty. For work: environments valuing intuition and creativity. For relationships: places with emotional authenticity and depth."
  }
};

// ============================================
// SECTION 8: PRACTICAL TAKEAWAYS
// ============================================

export const practicalTakeaways: Record<string, {
  leanInto: string[];
  watchOutFor: string[];
}> = {
  Aries: {
    leanInto: [
      "Your capacity for initiative—you can start things others won't",
      "Direct communication—honesty is a gift when delivered with care",
      "Physical activity as emotional processing",
      "The courage to act despite uncertainty",
      "Fresh starts and beginnings as renewable resources"
    ],
    watchOutFor: [
      "Acting before thinking in ways that affect others",
      "Creating conflict to feel alive when boredom strikes",
      "Abandoning projects once initial excitement fades",
      "Dismissing patience as weakness",
      "Anger that masks more vulnerable feelings"
    ]
  },
  Taurus: {
    leanInto: [
      "Your steadiness—reliability is a form of love",
      "The wisdom of patience and long-term thinking",
      "Physical and sensory ways of knowing",
      "Building things that last",
      "The value of quality over quantity"
    ],
    watchOutFor: [
      "Staying in situations too long out of fear of change",
      "Confusing stubbornness with strength",
      "Using material comfort to avoid emotional discomfort",
      "Resistance to growth that requires temporary instability",
      "Possessiveness in relationships"
    ]
  },
  Gemini: {
    leanInto: [
      "Your curiosity—it's a way of connecting with life",
      "Communication skills and ability to translate between worlds",
      "Adaptability and mental flexibility",
      "The capacity to hold multiple perspectives",
      "Making complex things accessible"
    ],
    watchOutFor: [
      "Scattering energy so widely that nothing gets deep attention",
      "Talking about feelings instead of feeling them",
      "Avoiding commitment by keeping options open indefinitely",
      "Using wit to deflect rather than connect",
      "Restlessness that prevents presence"
    ]
  },
  Cancer: {
    leanInto: [
      "Your emotional intelligence and intuition",
      "The capacity to create sanctuary for yourself and others",
      "Memory as a way of honouring what matters",
      "Nurturing that sustains genuine growth",
      "The strength in sensitivity"
    ],
    watchOutFor: [
      "Taking responsibility for others' emotions at your own expense",
      "Retreating into shell when communication would help",
      "Using guilt or withdrawal to control situations",
      "Living in the past at the expense of present",
      "Moodiness that affects others without clear communication"
    ]
  },
  Leo: {
    leanInto: [
      "Your natural warmth and generosity",
      "Creative self-expression as a way of giving",
      "The capacity to inspire and encourage others",
      "Loyalty and devotion to those you love",
      "The ability to find joy and share it"
    ],
    watchOutFor: [
      "Needing external validation to feel worthy",
      "Dramatic reactions that overshadow others' experiences",
      "Difficulty receiving criticism without taking it as personal attack",
      "Competing with people you should be supporting",
      "Pride that prevents acknowledging mistakes"
    ]
  },
  Virgo: {
    leanInto: [
      "Your ability to see what needs improvement and act on it",
      "Service as a genuine expression of care",
      "Attention to detail that others miss",
      "Practical wisdom and problem-solving ability",
      "The capacity to create order from chaos"
    ],
    watchOutFor: [
      "Perfectionism that prevents completion or satisfaction",
      "Self-criticism so constant it becomes background noise",
      "Criticising others in ways that hurt rather than help",
      "Serving to the point of martyrdom",
      "Missing the big picture while focused on details"
    ]
  },
  Libra: {
    leanInto: [
      "Your capacity for genuine partnership and collaboration",
      "Diplomatic skills that help others find common ground",
      "Aesthetic sense and ability to create beauty",
      "Seeing multiple perspectives fairly",
      "Grace under social pressure"
    ],
    watchOutFor: [
      "Losing yourself in relationship or others' expectations",
      "Avoiding necessary conflict until it becomes explosion",
      "Indecision that becomes its own decision",
      "People-pleasing that creates resentment",
      "Keeping score of fairness obsessively"
    ]
  },
  Scorpio: {
    leanInto: [
      "Your capacity for depth and meaningful intimacy",
      "Psychological insight and ability to see beneath surfaces",
      "Loyalty and devotion once trust is established",
      "The power to transform self and situations",
      "Emotional courage to face what others avoid"
    ],
    watchOutFor: [
      "Testing people to destruction to prove they'll leave",
      "Holding grudges long past their usefulness",
      "Using secrets or information as power over others",
      "Paranoid thinking that creates what it fears",
      "Intensity that overwhelms yourself and others"
    ]
  },
  Sagittarius: {
    leanInto: [
      "Your natural optimism and capacity to inspire hope",
      "The quest for meaning that gives life direction",
      "Honesty and directness in communication",
      "Enthusiasm that expands others' sense of possibility",
      "The capacity to find adventure anywhere"
    ],
    watchOutFor: [
      "Escaping rather than facing difficult realities",
      "Bluntness that wounds rather than clarifies",
      "Promising more than you can deliver",
      "Restlessness that prevents depth or commitment",
      "Preachiness about your beliefs"
    ]
  },
  Capricorn: {
    leanInto: [
      "Your capacity for long-term vision and strategic patience",
      "Reliability and integrity that earns genuine respect",
      "The ability to build structures that endure",
      "Wisdom that comes from taking responsibility",
      "Competence developed through dedicated effort"
    ],
    watchOutFor: [
      "Working to the point of missing life",
      "Emotional coldness as protection that becomes isolation",
      "Measuring worth by achievement alone",
      "Pessimism that becomes self-fulfilling",
      "Rigidity in the name of discipline"
    ]
  },
  Aquarius: {
    leanInto: [
      "Your original thinking and ability to see new possibilities",
      "Concern for collective wellbeing beyond personal interest",
      "Friendship as a genuine form of love",
      "The capacity to question assumptions others take for granted",
      "Tolerance for difference and eccentricity"
    ],
    watchOutFor: [
      "Detachment that becomes emotional unavailability",
      "Contrarianism for its own sake",
      "Prioritising abstract ideals over real relationships",
      "Intellectualising feelings to avoid experiencing them",
      "Alienating others through excessive unconventionality"
    ]
  },
  Pisces: {
    leanInto: [
      "Your profound empathy and capacity for compassion",
      "Creative and spiritual gifts that connect to something larger",
      "Intuition that perceives what logic misses",
      "The ability to accept others without judgement",
      "Imagination as a way of understanding and healing"
    ],
    watchOutFor: [
      "Losing yourself in others or in escape",
      "Sacrificing to the point of resentment or depletion",
      "Avoiding practical realities that need attention",
      "Confusion about whose feelings are whose",
      "Idealising people or situations to avoid seeing clearly"
    ]
  }
};

// Helper function to get element for a sign
export function getElement(sign: string): string {
  const fireSign = ['Aries', 'Leo', 'Sagittarius'];
  const earthSigns = ['Taurus', 'Virgo', 'Capricorn'];
  const airSigns = ['Gemini', 'Libra', 'Aquarius'];
  const waterSigns = ['Cancer', 'Scorpio', 'Pisces'];

  if (fireSign.includes(sign)) return 'Fire';
  if (earthSigns.includes(sign)) return 'Earth';
  if (airSigns.includes(sign)) return 'Air';
  if (waterSigns.includes(sign)) return 'Water';
  return 'Fire';
}

// Generate core themes based on chart
export function generateCoreThemes(sunSign: string, moonSign: string | null, risingSign: string | null): string[] {
  const themes: string[] = [];
  const elements: string[] = [getElement(sunSign)];

  if (moonSign) elements.push(getElement(moonSign));
  if (risingSign) elements.push(getElement(risingSign));

  // Count elements
  const elementCounts: Record<string, number> = {};
  elements.forEach(el => {
    elementCounts[el] = (elementCounts[el] || 0) + 1;
  });

  // Find dominant element
  const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0][0];

  // Add element-based themes
  themes.push(...elementThemes[dominantElement].slice(0, 2));

  // Add sign-specific theme
  if (sunSignOverview[sunSign]) {
    themes.push(sunSignOverview[sunSign].coreExpression);
  }

  return themes.slice(0, 3);
}

// Generate growth edges based on chart
export function generateGrowthEdges(sunSign: string, moonSign: string | null): string[] {
  const edges: string[] = [];

  if (shadowAndGrowth[sunSign]) {
    edges.push(shadowAndGrowth[sunSign].frictionPoints.split('.')[0] + '.');
  }

  if (moonSign && shadowAndGrowth[moonSign]) {
    edges.push(shadowAndGrowth[moonSign].emotionalBlindSpots.split('.')[0] + '.');
  }

  if (sunSign && personalityArchitecture[sunSign]) {
    edges.push('Learning to balance ' + personalityArchitecture[sunSign].recharging.split('.')[0].toLowerCase() + ' with other needs.');
  }

  return edges.slice(0, 3);
}
