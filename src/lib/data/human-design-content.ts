/**
 * Human Design Content Data
 * Descriptions, meanings, and guidance for all Human Design components.
 */

export interface HDTypeContent {
  type: string;
  strategy: string;
  aura: string;
  theme: string; // Not-self theme
  signature: string; // Signature when aligned
  percentage: string; // % of population
  overview: string;
  strengths: string;
  challenges: string;
  career: string;
  relationships: string;
}

export interface HDCenterContent {
  name: string;
  theme: string;
  definedMeaning: string;
  undefinedMeaning: string;
}

export interface HDAuthorityContent {
  name: string;
  description: string;
  howToUse: string;
}

// --- Type Content ---

export const typeContent: Record<string, HDTypeContent> = {
  Manifestor: {
    type: 'Manifestor',
    strategy: 'To Inform',
    aura: 'Closed and repelling',
    theme: 'Anger',
    signature: 'Peace',
    percentage: '~9% of population',
    overview:
      'Manifestors are the initiators of the Human Design system. You are here to make things happen, to set things in motion, and to impact the world around you. Unlike other types, you do not need to wait for external cues before acting. Your energy is powerful and self-contained, capable of initiating new cycles and creating change without needing permission or validation from others.\n\nYour aura is closed and repelling -- not in a negative sense, but as a natural protective mechanism that gives you the independence to act freely. People may feel a sense of awe or even intimidation around you, because your energy field communicates that you are not here to be controlled or managed. You are the spark that lights the fire, the force that breaks through stagnation and opens new pathways for others to follow.',
    strengths:
      'You possess a rare and powerful ability to initiate action without waiting for external validation. Your independence is genuine -- you have the internal resources to bring visions into reality through sheer force of will. You are courageous, decisive, and capable of catalyzing massive change. When aligned with your strategy, you move through the world with a peaceful confidence that inspires others to step into their own power.',
    challenges:
      'Your greatest challenge is learning to inform others before you act. Because your energy is so self-contained, you may forget that your actions impact those around you. When you fail to inform, you encounter resistance, which triggers your not-self theme of anger. You may also struggle with feeling controlled or restricted by others, leading to isolation. Learning that informing is not asking permission but rather a courtesy that reduces friction is key to your alignment.',
    career:
      'You excel in roles where you can initiate, lead, and create without excessive oversight. Entrepreneurship, creative direction, leadership positions, consulting, and any role that values bold action and independent thinking suits you well. You work best in short, intense bursts rather than sustained, routine effort. Delegate the maintenance and follow-through to others while you focus on what you do best: starting things.',
    relationships:
      'In relationships, you need a partner who respects your independence and does not try to control or manage you. You are loyal and protective, but you need space to move freely. Your strategy of informing is especially important in intimate relationships -- letting your partner know what you are about to do prevents misunderstandings and builds trust. The right partner will appreciate your power without trying to contain it.',
  },
  Generator: {
    type: 'Generator',
    strategy: 'To Respond',
    aura: 'Open and enveloping',
    theme: 'Frustration',
    signature: 'Satisfaction',
    percentage: '~37% of population',
    overview:
      'Generators are the life force of the planet, the builders and sustainers of civilization. You have a defined Sacral center, which gives you a consistent, renewable source of energy -- but only when that energy is engaged with work and activities that genuinely light you up. When you are doing what you love, your energy is virtually inexhaustible. When you are forcing yourself through tasks that do not resonate, you feel drained and frustrated.\n\nYour aura is open and enveloping, drawing life and opportunities toward you. This is why your strategy is to respond rather than initiate. The universe sends you things to respond to -- people, situations, opportunities -- and your Sacral center gives you a clear gut response: an enthusiastic "uh-huh" (yes) or a contracting "unh-unh" (no). Trusting this response is the key to living a satisfying life.',
    strengths:
      'Your sustainable life force energy is your greatest gift. When engaged with the right work, you can produce at extraordinary levels for extended periods without burning out. You have a magnetic quality that draws the right opportunities to you. Your gut responses are remarkably accurate when you learn to trust them. You are the backbone of any team or community, bringing dedication, persistence, and a deep capacity for mastery.',
    challenges:
      'Your primary challenge is learning to wait to respond rather than initiating from the mind. Society conditions Generators to "go out and make it happen," but this leads to frustration and exhaustion. You may also struggle with quitting things that no longer serve you, staying in jobs or relationships out of obligation rather than genuine Sacral response. Learning to honor your gut feelings -- even when they contradict logic -- is essential to your wellbeing.',
    career:
      'You thrive in work that you genuinely love and that engages your Sacral energy. Mastery is your path -- you are designed to become deeply skilled in your chosen field through sustained, passionate engagement. The specific field matters less than your response to it. Pay attention to what makes your Sacral light up and pursue that, regardless of external expectations. You are at your best when your work feels like play.',
    relationships:
      'In relationships, you are warm, loyal, and deeply committed. Your open aura naturally draws people to you, and your Sacral energy creates a warm, inviting presence. You need a partner who understands your need to follow your gut responses and who does not pressure you into commitments that do not feel right. The key to relationship satisfaction is the same as in all areas of your life: respond honestly to what feels right, and have the courage to say no to what does not.',
  },
  'Manifesting Generator': {
    type: 'Manifesting Generator',
    strategy: 'To Respond',
    aura: 'Open and enveloping',
    theme: 'Frustration and Anger',
    signature: 'Satisfaction and Peace',
    percentage: '~33% of population',
    overview:
      'Manifesting Generators are a hybrid type that combines the sustainable energy of the Generator with the initiating power of the Manifestor. You have a defined Sacral center with a motor connection to your Throat, giving you the ability to both generate and manifest. You are designed to be multi-passionate, fast-moving, and highly efficient -- often finding shortcuts and more effective ways of doing things that others miss entirely.\n\nYour process is not linear. You may start something, skip steps, circle back, abandon one approach for another, and somehow arrive at the result faster than anyone expected. This is not a flaw -- it is your design. You are here to demonstrate that efficiency and mastery can coexist with variety and speed. Your challenge is trusting this non-linear process and not forcing yourself into conventional step-by-step approaches.',
    strengths:
      'You combine the sustainable energy of the Generator with the initiating speed of the Manifestor. You are incredibly efficient, often completing tasks in a fraction of the time others require. Your multi-passionate nature allows you to develop skills across multiple domains, and your ability to find shortcuts and better methods makes you invaluable in any endeavor. You bring an infectious energy and enthusiasm to everything you engage with.',
    challenges:
      'Like Generators, you must wait to respond rather than initiate from the mind. Like Manifestors, you benefit from informing others before you act. Your biggest challenge may be societal pressure to specialize and follow a linear path -- your nature is to juggle multiple interests and skip steps, which can look chaotic to others. You may also struggle with starting many things and finishing few, or with moving so fast that you leave others behind. Learning to trust your non-linear process while still honoring your commitments is your growth edge.',
    career:
      'You excel in fast-paced, varied environments where your multi-passionate nature and efficiency are valued. You may have multiple careers simultaneously or shift between fields throughout your life -- this is by design, not a lack of focus. Entrepreneurship, creative industries, technology, consulting, and any role that rewards speed, innovation, and versatility suits you well. You perform best when you have the freedom to approach tasks in your own way.',
    relationships:
      'You bring excitement, energy, and variety to your relationships. You need a partner who can keep up with your pace and who appreciates your need for multiple interests and activities. Your partner must understand that your speed and multi-tasking are not signs of disinterest but expressions of your natural design. Communication is essential -- informing your partner about your plans and shifts prevents misunderstandings.',
  },
  Projector: {
    type: 'Projector',
    strategy: 'Wait for the Invitation',
    aura: 'Focused and absorbing',
    theme: 'Bitterness',
    signature: 'Success',
    percentage: '~20% of population',
    overview:
      'Projectors are the guides, managers, and directors of the Human Design system. You do not have the consistent energy of Generators or the initiating power of Manifestors. Instead, you possess something equally valuable: the ability to see deeply into others, to understand how energy works, and to guide people and systems toward greater efficiency and alignment.\n\nYour aura is focused and absorbing -- when you give someone your attention, you penetrate to their core. This is why you are so effective at guiding others: you can see what they cannot see about themselves. However, this focused attention must be invited. When you offer guidance without being asked, it is often met with resistance. When you wait for the invitation, your wisdom is received as the gift it truly is.',
    strengths:
      'Your ability to see into the core of people and systems is your superpower. You are a natural strategist, advisor, and manager. You can identify inefficiencies and optimize processes in ways that others simply cannot. When recognized and invited, your guidance has the power to transform individuals, teams, and organizations. You possess a wisdom that comes from observation rather than doing, giving you a perspective that active types often lack.',
    challenges:
      'Your greatest challenge is waiting for recognition and invitation. Society rewards action and initiative, which can make Projectors feel invisible or undervalued. You may overwork yourself trying to keep up with Generators, leading to burnout and bitterness. Learning that your value lies in your wisdom rather than your productivity is essential. You must also guard against giving unsolicited advice, which depletes your energy and alienates others.',
    career:
      'You are designed for roles that involve guiding, managing, and advising rather than sustaining physical labor. Management, consulting, coaching, teaching, therapy, human resources, project management, and strategic planning are natural fits. You work best in shorter, focused bursts rather than long hours. The key is finding environments where your insights are recognized and valued. When you are in the right role, you achieve remarkable success with relatively little effort.',
    relationships:
      'In relationships, you need to be truly seen and recognized for who you are. You thrive with partners who value your insights and who invite your guidance rather than dismissing it. You are deeply perceptive in relationships, often understanding your partner better than they understand themselves. Your challenge is patience -- waiting for the right relationship invitation rather than pursuing connections out of fear of being alone. The right partnership will feel like being truly recognized for the first time.',
  },
  Reflector: {
    type: 'Reflector',
    strategy: 'Wait a Lunar Cycle',
    aura: 'Resistant and sampling',
    theme: 'Disappointment',
    signature: 'Surprise',
    percentage: '~1% of population',
    overview:
      'Reflectors are the rarest type in Human Design, with no defined centers at all. You are completely open to the energies around you, making you an extraordinarily sensitive mirror of your environment. You literally reflect the health and state of the communities and people around you. When your environment is healthy and aligned, you feel wonderful. When it is not, you absorb that dysfunction and feel it deeply.\n\nYour openness is not a weakness -- it is a profound gift. You have the unique ability to sample and experience every type of energy, giving you a wisdom about human nature that no other type possesses. Your strategy of waiting a full lunar cycle before making major decisions honors the fact that you experience the world through constantly shifting energies. What feels right on Monday may feel completely different by Thursday, and you need the full cycle to gain clarity.',
    strengths:
      'Your complete openness gives you an unparalleled ability to read people and environments. You can sense the health of a community, organization, or relationship with remarkable accuracy. You experience the full spectrum of human energy, giving you a wisdom and empathy that is truly rare. When you are in the right environment, you reflect its best qualities back and amplify them. You are the ultimate barometer of collective wellbeing.',
    challenges:
      'Your openness means you are profoundly affected by your environment. Being in the wrong place with the wrong people can be deeply damaging to your wellbeing. You may struggle with identity, as you experience so many different energies that it can be hard to know which ones are truly yours. Decision-making can be challenging because your experience changes constantly. Learning to wait the full lunar cycle and to prioritize your environment above all else is essential to your health and happiness.',
    career:
      'You need to be extremely selective about your work environment, as it will shape your entire experience. You excel in roles where you can evaluate, assess, and reflect -- quality assurance, organizational health consulting, community leadership, counseling, and mediation. You often serve as the "canary in the coal mine" for organizations, sensing dysfunction before others can articulate it. Your work environment matters more than your job title.',
    relationships:
      'In relationships, you are a mirror for your partner, reflecting both their best and most challenging qualities. You need a partner who provides a healthy, stable energy for you to reflect. You may find that you feel like a different person with different partners, which is natural for your design. Take your time with major relationship decisions -- waiting a lunar cycle before committing ensures you are seeing the full picture rather than being swept up in someone else\'s energy.',
  },
};

// --- Center Content ---

export const centerContent: Record<string, HDCenterContent> = {
  Head: {
    name: 'Head Center',
    theme: 'Inspiration & Mental Pressure',
    definedMeaning:
      'You have a consistent source of mental inspiration and pressure to think about the big questions of life. You are naturally drawn to contemplation, philosophical inquiry, and the pursuit of understanding. Your mind generates questions and inspirations in a reliable, consistent way. You may feel a constant mental buzz that drives you to seek answers and understanding.',
    undefinedMeaning:
      'You are open to being inspired by a wide variety of sources and may feel mental pressure from your environment to think about things that are not truly important to you. You can be easily distracted by other people\'s questions and mental preoccupations. Learning to discern which questions are truly yours and which you have absorbed from others is key. You do not need to answer every question that enters your mind.',
  },
  Ajna: {
    name: 'Ajna Center',
    theme: 'Conceptualization & Mental Certainty',
    definedMeaning:
      'You have a consistent way of processing and conceptualizing information. Your thinking style is fixed and reliable, giving you mental certainty about your perspectives. You process information through a particular lens -- whether logical, abstract, or experiential -- and this consistency is your strength. Others may rely on you for your clear, consistent viewpoint.',
    undefinedMeaning:
      'You have the gift of mental flexibility. You can see things from multiple perspectives and think in ways that are not fixed to any single approach. However, you may feel pressure to appear certain when you are not, or to hold onto opinions that are not truly yours. Embrace your ability to say "I\'m not sure" and to change your mind. Your open mind is a gift, not a weakness.',
  },
  Throat: {
    name: 'Throat Center',
    theme: 'Communication & Manifestation',
    definedMeaning:
      'You have a consistent and reliable voice. Communication comes naturally to you, and you have a fixed way of expressing yourself that others can depend on. You are designed to speak, act, and manifest in the world. Your Throat center is the gateway through which your inner truth becomes outer reality. You likely have a distinctive speaking style or voice quality.',
    undefinedMeaning:
      'You may feel pressure to speak and be heard, sometimes talking too much or at the wrong times to get attention. You are designed to be flexible in your communication, adapting to different audiences and contexts. The key is to wait for the right moment to speak rather than forcing your voice. When you speak at the right time, your words carry surprising power and impact.',
  },
  G: {
    name: 'G Center (Self/Identity)',
    theme: 'Identity, Direction & Love',
    definedMeaning:
      'You have a fixed sense of identity and direction in life. You know who you are and where you are going, even if you cannot always articulate it. Your sense of self remains stable regardless of your environment or the people around you. You naturally attract the right people and opportunities because your identity signal is clear and consistent. You are a reliable compass for others.',
    undefinedMeaning:
      'Your sense of identity and direction is fluid, changing based on your environment and the people around you. This is not instability -- it is a design feature that allows you to experience many different identities and life directions. You are deeply influenced by place, and finding the right physical environment is essential for your wellbeing. You may feel lost at times, but this openness gives you the ability to understand identity in ways that fixed types cannot.',
  },
  Heart: {
    name: 'Heart Center (Will/Ego)',
    theme: 'Willpower, Value & Worth',
    definedMeaning:
      'You have consistent access to willpower and a reliable sense of your own value and worth. You can make and keep promises, set prices for your work, and compete when necessary. Your ego force is a powerful tool for getting things done. You naturally understand the material world of value exchange and can assert your worth with confidence. Rest is essential to recharge your will.',
    undefinedMeaning:
      'You do not have consistent access to willpower, and making promises or commitments that require sustained will can be challenging. You may struggle with issues of self-worth, either overcompensating by trying to prove yourself or undervaluing your contributions. The key is to stop trying to prove your worth and instead recognize that your value is inherent. Avoid making promises based on willpower you do not consistently have.',
  },
  Sacral: {
    name: 'Sacral Center',
    theme: 'Life Force, Sexuality & Work Energy',
    definedMeaning:
      'You have a powerful, sustainable life force energy that is designed for work and creation. Your Sacral center is like an internal generator that produces energy when engaged with the right activities. You have clear gut responses -- an enthusiastic pull toward what is correct for you and a contraction away from what is not. Honor these responses. Your energy is designed to be used up each day, so engage fully with what lights you up.',
    undefinedMeaning:
      'You do not have your own consistent life force energy and are not designed for sustained work in the traditional sense. You amplify the Sacral energy of others, which can feel exhilarating but also exhausting if you do not know when to step away. You may push past your natural limits because you are borrowing energy, leading to burnout. Learning to work in focused bursts and rest deeply is essential. You are not lazy -- you are simply designed to work differently.',
  },
  'Solar Plexus': {
    name: 'Solar Plexus Center (Emotional)',
    theme: 'Emotions, Feelings & Desire',
    definedMeaning:
      'You experience a consistent emotional wave that moves between highs and lows. This is not mood disorder -- it is your natural emotional rhythm. Your feelings are powerful and reliable sources of information, but clarity never comes in the moment. You must ride the full wave before making important decisions. When you learn to wait through your emotional cycle, your decisions are deeply wise and grounded in emotional truth.',
    undefinedMeaning:
      'You are emotionally open, absorbing and amplifying the feelings of those around you. You can experience others\' emotions more intensely than they do themselves, which gives you great empathy but can also be overwhelming. You may avoid confrontation or emotionally charged situations to avoid discomfort. Learning to recognize which emotions are yours and which you have absorbed is essential. Your openness is a gift of emotional wisdom when properly understood.',
  },
  Spleen: {
    name: 'Spleen Center',
    theme: 'Intuition, Health & Survival',
    definedMeaning:
      'You have a consistent and reliable intuitive sense -- a quiet inner knowing that alerts you to what is safe and what is not. Your Splenic awareness operates in the moment, giving you spontaneous insights about health, timing, and survival. You have a natural immune resilience and an instinct for self-preservation. Trust your in-the-moment intuitive hits, even when they do not make logical sense.',
    undefinedMeaning:
      'Your intuition is not consistent, and you may hold onto things, people, or situations longer than is healthy because you lack the spontaneous knowing of when to let go. You amplify others\' fears and survival instincts, which can make you overly cautious or anxious. You may also be more susceptible to environmental health influences. Learning to let go of what no longer serves you -- rather than clinging out of fear -- is a central theme of your growth.',
  },
  Root: {
    name: 'Root Center',
    theme: 'Adrenaline, Pressure & Drive',
    definedMeaning:
      'You have a consistent internal pressure and drive that fuels your actions. You handle stress and pressure in a reliable way, and you have your own natural pace that does not need to match anyone else\'s. Your Root energy gives you the fuel to start things and push through challenges. You may feel a constant, low-level hum of energy that keeps you moving. Learning to use this pressure productively rather than frantically is key.',
    undefinedMeaning:
      'You absorb and amplify the stress and pressure of those around you, which can make you feel constantly rushed or under pressure to "get things done." You may turn small tasks into urgent crises or feel a frantic need to complete everything as quickly as possible. The key is recognizing that this pressure is not yours. You can learn to observe it without being driven by it, finding your own natural pace that honors your energy.',
  },
};

// --- Authority Content ---

export const authorityContent: Record<string, HDAuthorityContent> = {
  'Emotional Authority': {
    name: 'Emotional Authority',
    description:
      'Your decision-making authority comes from your emotional wave. You have a defined Solar Plexus center, which means you experience a consistent emotional cycle that moves between highs and lows. This wave is your most reliable guide for making decisions, but it requires patience.',
    howToUse:
      'Never make important decisions in the heat of an emotional high or the depths of an emotional low. Instead, wait through at least one full emotional cycle before committing to major choices. Notice how you feel about the decision at different points in your wave. Clarity comes over time, not in a single moment. When you feel a sense of calm knowing across your emotional spectrum, you have found your truth. This may take hours, days, or even weeks for significant decisions.',
  },
  'Sacral Authority': {
    name: 'Sacral Authority',
    description:
      'Your decision-making authority comes from your Sacral center -- your gut response. You have a defined Sacral without a defined Solar Plexus, which means your gut feelings are your most immediate and reliable guide. Your Sacral communicates through physical sensations: a pulling forward or expansion for "yes" and a contraction or turning away for "no."',
    howToUse:
      'Pay attention to your immediate gut response to things. When someone asks you a yes-or-no question, notice what your body does before your mind has time to analyze. A Sacral "yes" often feels like a rising energy, excitement, or physical pull toward something. A Sacral "no" feels like a sinking, contraction, or flat disinterest. The key is to respond in the moment rather than overthinking. Ask friends to pose yes-or-no questions to help you practice hearing your Sacral voice.',
  },
  'Splenic Authority': {
    name: 'Splenic Authority',
    description:
      'Your decision-making authority comes from your Spleen -- your body\'s survival intelligence and in-the-moment intuition. You have a defined Spleen without a defined Solar Plexus or Sacral, which means you receive spontaneous intuitive hits that are remarkably accurate but fleeting.',
    howToUse:
      'Your Splenic awareness speaks only once, in the moment, and it speaks quietly. It is a subtle knowing, a physical sensation, or a quiet "yes" or "no" that arises spontaneously. The challenge is that your mind may try to override these intuitive hits with logic or analysis. Trust your first instinct. If something feels off, honor that feeling even if you cannot explain it. Your Splenic authority is designed for in-the-moment decisions -- do not wait or overthink, or you may lose the signal.',
  },
  'Ego Authority': {
    name: 'Ego Authority',
    description:
      'Your decision-making authority comes from your Heart (Will/Ego) center. This is a rare authority that is found only in certain Projectors and Manifestors. Your willpower and sense of personal desire are your most reliable decision-making tools.',
    howToUse:
      'Ask yourself: "Do I really want this? Is my heart in it?" Your Ego authority makes decisions based on what you truly desire and what serves your self-interest in the highest sense. This is not selfishness -- it is honoring that your will is your most reliable compass. If you can make and keep a promise about something, it is right for you. If your heart is not in it, no amount of logic will make it work. Listen to what you want, not what you think you should want.',
  },
  'Self-Projected Authority': {
    name: 'Self-Projected Authority',
    description:
      'Your decision-making authority comes from your G (Self/Identity) center. This authority is unique to Projectors and involves hearing your truth through your own voice. Your identity and sense of direction are your most reliable guides.',
    howToUse:
      'Talk through your decisions with trusted friends or advisors -- not for their advice, but to hear yourself speak. As you discuss your options out loud, pay attention to which direction feels most aligned with your sense of identity and purpose. Your truth becomes clear through the act of self-expression. Ask yourself: "Does this feel like me? Does this align with my direction?" When a decision resonates with your core identity, you will feel a sense of recognition and rightness.',
  },
  'Mental/None Authority': {
    name: 'Mental/None Authority',
    description:
      'You have no inner authority in the traditional sense, which means your decision-making process involves your environment and the people around you. This is typically found in Reflectors and some Projectors. Your openness is your guide.',
    howToUse:
      'Discuss your decisions with different people in different environments. Pay attention to how you feel in various settings and with various people when considering your options. Your clarity comes from outside-in rather than inside-out. For Reflectors specifically, wait a full lunar cycle (approximately 28 days) before making major decisions. Notice how your perspective shifts throughout the month. The right decision will reveal itself through the process of time and environmental reflection.',
  },
};

// --- Profile Content ---

export const profileContent: Record<string, { name: string; description: string }> = {
  '1/3': {
    name: 'Investigator / Martyr',
    description:
      'You build your life on a foundation of deep investigation and hands-on trial and error. Line 1 drives you to research thoroughly and build a solid foundation of knowledge before committing to anything. Line 3 ensures that you learn through direct experience -- including experiences that do not work out. Your life is a process of discovering what is true through both study and lived experimentation. You are resilient, resourceful, and deeply knowledgeable, with a practical wisdom earned through real-world testing.',
  },
  '1/4': {
    name: 'Investigator / Opportunist',
    description:
      'You combine deep foundational knowledge with a gift for networking and community connection. Line 1 drives you to understand things thoroughly from the ground up, while Line 4 gives you the ability to share your discoveries through your personal network. You are a trusted authority within your circles because you have done the research and you communicate your findings with warmth and reliability. Your opportunities come through people who know and trust you.',
  },
  '2/4': {
    name: 'Hermit / Opportunist',
    description:
      'You have a natural, innate talent that you may not fully recognize in yourself, combined with a strong connection to your social network. Line 2 gives you gifts that come so naturally that you may take them for granted -- you need others to call them out and recognize them. Line 4 connects you to your community and ensures that your talents find their audience through personal relationships. You alternate between needing solitude to recharge and engaging actively with your network.',
  },
  '2/5': {
    name: 'Hermit / Heretic',
    description:
      'You possess innate, natural talents that others project great expectations onto. Line 2 gives you abilities that come effortlessly, almost unconsciously, while Line 5 means that others see you as someone who can solve their problems. This combination creates a dynamic where people are drawn to your natural gifts and expect you to deliver practical solutions. You need periods of retreat and solitude, but the world keeps calling you out to share your talents.',
  },
  '3/5': {
    name: 'Martyr / Heretic',
    description:
      'You are a resilient experimenter who learns through trial and error and who others look to for practical, revolutionary solutions. Line 3 ensures that your life is full of direct experiences -- some successful, some not -- that give you unparalleled practical wisdom. Line 5 means that others project their hopes onto you, expecting you to have the answers to their problems. Your authority comes from having actually lived through the challenges you speak about.',
  },
  '3/6': {
    name: 'Martyr / Role Model',
    description:
      'Your life unfolds in three distinct phases. In the first phase (birth to approximately age 30), Line 3 dominates, and you learn through intense trial-and-error experimentation. In the second phase (approximately 30-50), you step back onto the "roof" to observe and process what you have learned. In the third phase (after approximately 50), Line 6 emerges fully, and you become a living example and role model for others. Your wisdom is earned through direct experience and matured through reflection.',
  },
  '4/6': {
    name: 'Opportunist / Role Model',
    description:
      'You are a community-oriented individual destined to become a role model through the quality of your relationships and lived experience. Line 4 gives you a strong foundation in your personal network -- your opportunities and influence flow through the people you know. Line 6 unfolds over three life phases, with your early years involving trial and error, your middle years spent observing from a higher perspective, and your later years lived as an authentic example for others.',
  },
  '4/1': {
    name: 'Opportunist / Investigator',
    description:
      'You combine a strong social foundation with a need for deep, thorough investigation. Line 4 means your life is anchored in your personal network and close relationships. Line 1 drives you to build a solid foundation of knowledge and understanding. You are the person in your community who has "done the homework" -- your friends and colleagues trust your expertise because they know how thorough you are. You share your knowledge through your network, and your network provides the platform for your influence.',
  },
  '5/1': {
    name: 'Heretic / Investigator',
    description:
      'You are a practical problem-solver whose authority is built on thorough investigation and research. Line 5 means that others project expectations onto you, seeing you as someone who can deliver universal solutions to their problems. Line 1 ensures that you have the deep foundational knowledge to back up those expectations. You are at your most powerful when you have done your research and can offer practical, well-grounded solutions. Your reputation depends on delivering real results.',
  },
  '5/2': {
    name: 'Heretic / Hermit',
    description:
      'You carry the projection field of someone who can solve problems for others, combined with natural, innate talents that require periods of withdrawal to sustain. Line 5 means the world sees you as a potential savior or solution-provider, which can be both empowering and exhausting. Line 2 gives you natural gifts that you may not fully appreciate but that others recognize and call out. You need significant alone time to recharge, even as the world keeps demanding your attention.',
  },
  '6/2': {
    name: 'Role Model / Hermit',
    description:
      'You are destined to become a living example for others, with natural talents that emerge most fully in your later years. Line 6 unfolds over three life phases: experimentation and trial-and-error (to about age 30), observation and reflection from the "rooftop" (30-50), and authentic role modeling (after 50). Line 2 gives you innate gifts that operate almost unconsciously -- others see your talent before you do. Your life is a journey toward becoming a natural, authentic example of how to live well.',
  },
  '6/3': {
    name: 'Role Model / Martyr',
    description:
      'You are an eternal experimenter whose life experiences eventually crystallize into profound wisdom and role model energy. Line 6 takes you through three phases of life, while Line 3 ensures that every phase involves direct, hands-on experimentation. Your early life is especially intense with trial-and-error experiences. Your middle years bring some respite as you climb onto the "roof" to observe, though Line 3 never lets you fully disengage from experimentation. In your later years, your hard-won wisdom makes you a deeply authentic and credible role model.',
  },
};
