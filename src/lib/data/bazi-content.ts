// ============================================================
// BaZi Content.Day Master descriptions, element info, and patterns
// ============================================================

export interface DayMasterContent {
  stem: string;
  element: string;
  yinYang: string;
  metaphor: string;
  overview: string;
  personality: string;
  career: string;
  relationships: string;
}

export interface ElementContent {
  name: string;
  color: string;
  emoji: string;
  qualities: string;
}

// ============================================================
// Day Master Content (10 Heavenly Stems)
// ============================================================

export const dayMasterContent: Record<string, DayMasterContent> = {
  Jia: {
    stem: 'Jia',
    element: 'Wood',
    yinYang: 'Yang',
    metaphor: 'Like a towering tree reaching for the sky',
    overview:
      'Jia Wood is the great tree of the forest. Tall, upright, and unyielding. You are a natural leader with strong principles and a desire to grow toward the light. Your character is firm, straightforward, and ambitious. Like the mighty oak, you stand strong through storms and provide shelter to others.',
    personality:
      'You are principled, determined, and fiercely independent. Others admire your integrity and sense of justice. You have a pioneering spirit and prefer to lead rather than follow. Your honesty can sometimes come across as blunt, but people value your authenticity. You thrive on challenges and are at your best when working toward meaningful goals. Stubbornness can be your blind spot. Learning to bend with the wind rather than resist it is your growth edge.',
    career:
      'Born to lead and build, you excel in roles requiring vision and decisive action. Management, entrepreneurship, law, politics, education, and architecture are natural fits. You have the tenacity to start projects from scratch and see them through. Your sense of responsibility makes you a trusted authority figure. Avoid roles that are too rigid or repetitive; you need room to grow.',
    relationships:
      'In love, you are loyal and protective, much like the great tree that shelters those beneath its canopy. You value stability and sincerity in a partner. You can be slow to open up emotionally, preferring to express care through actions rather than words. A partner who appreciates your strength while gently encouraging vulnerability will bring out the best in you. Avoid power struggles. True intimacy requires equality.',
  },
  Yi: {
    stem: 'Yi',
    element: 'Wood',
    yinYang: 'Yin',
    metaphor: 'Like a graceful vine winding around the trellis',
    overview:
      'Yi Wood is the delicate flower and winding vine. Flexible, elegant, and deeply adaptive. Where Jia Wood stands rigid, you flow around obstacles with grace. Your beauty lies in your gentleness, creativity, and remarkable ability to connect with others. You may appear soft on the surface, but your roots run surprisingly deep.',
    personality:
      'You are kind, artistic, and emotionally perceptive. Your adaptability is your greatest gift. You can read a room in seconds and adjust accordingly. People feel at ease around you, drawn by your warmth and empathy. You have a keen aesthetic sense and appreciate beauty in all its forms. However, your desire to please can sometimes lead you to compromise too much. Learning to stand firm on your core values, even when it feels uncomfortable, is essential for your personal power.',
    career:
      'Creative fields are your playground. Design, art, fashion, music, writing, counseling, and diplomacy all suit you well. You excel in collaborative environments where your interpersonal skills shine. Your ability to mediate and bring people together makes you invaluable in team settings. Public relations, event planning, and human resources are also strong fits. Avoid harsh, cutthroat environments that crush your spirit.',
    relationships:
      'Romance comes naturally to you. You are tender, attentive, and emotionally generous. You crave deep emotional connection and reciprocity. Your ideal partner sees your gentleness as strength, not weakness. You tend to wrap yourself around your loved ones like a vine, which can feel suffocating if boundaries are not maintained. Give your partner space to breathe, and ensure you maintain your own identity within the relationship.',
  },
  Bing: {
    stem: 'Bing',
    element: 'Fire',
    yinYang: 'Yang',
    metaphor: 'Like the radiant sun illuminating the world',
    overview:
      'Bing Fire is the great sun. Warm, generous, and impossible to ignore. Your presence lights up every room you enter. You radiate optimism, enthusiasm, and a contagious joy for life. Like the sun, you shine equally on everyone, offering warmth without discrimination. Your energy is expansive and your heart is open.',
    personality:
      'You are charismatic, passionate, and genuinely warm-hearted. People are naturally drawn to your bright energy and generous spirit. You wear your heart on your sleeve and are not afraid to express your emotions. Your optimism is inspiring, though it can sometimes border on naivety. You have a strong sense of justice and will speak up for those who cannot speak for themselves. Your challenge is learning that you cannot illuminate everyone. Some shadows exist for a reason.',
    career:
      'The spotlight suits you. Entertainment, media, marketing, public speaking, teaching, and politics are your natural stages. You thrive in roles where you can inspire and motivate others. Your enthusiasm makes you an excellent salesperson and brand ambassador. Leadership positions that involve vision-casting and team rallying play to your strengths. Avoid solitary or behind-the-scenes work that dims your light.',
    relationships:
      'In love, you are passionate, romantic, and extraordinarily giving. You love grand gestures and making your partner feel special. Your warmth can make anyone feel like the center of the universe. However, your attention can be scattered. Like the sun, you shine on many, which can cause jealousy. A partner who is secure and confident will thrive with you. Learn to focus your warmth on those who truly matter rather than spreading it too thin.',
  },
  Ding: {
    stem: 'Ding',
    element: 'Fire',
    yinYang: 'Yin',
    metaphor: 'Like a flickering candle lighting the darkness',
    overview:
      'Ding Fire is the candlelight, the hearth fire, the gentle flame that guides travelers home. Where Bing Fire blazes indiscriminately, you burn with focused intensity and quiet brilliance. You are the thinker, the strategist, the one who illuminates complex ideas with clarity. Your warmth is intimate rather than expansive.',
    personality:
      'You are intelligent, perceptive, and quietly passionate. You have an inner fire that fuels deep focus and remarkable insight. People are often surprised by the intensity hidden beneath your calm exterior. You are thoughtful and considerate, preferring quality over quantity in all things. Relationships, work, and experiences. You can be moody and sensitive, and your emotions burn hot even when your surface appears cool. Learning to regulate your inner flame without extinguishing it is your lifelong journey.',
    career:
      'Intellectual and creative pursuits suit you perfectly. Research, writing, counseling, psychology, philosophy, fine arts, and technology are excellent paths. You excel at roles requiring deep analysis and emotional intelligence. Your ability to see through complexity makes you an outstanding advisor or consultant. You work best in calm, focused environments where you can go deep rather than wide.',
    relationships:
      'You are devoted, intuitive, and deeply romantic in a quiet, meaningful way. You prefer intimate dinners over grand parties, handwritten letters over flashy gifts. Your emotional depth makes you an incredibly attentive and understanding partner. However, you can become possessive or anxious when you feel insecure. A partner who provides consistent reassurance and values depth over surface will help you feel safe to fully open your heart.',
  },
  Wu: {
    stem: 'Wu',
    element: 'Earth',
    yinYang: 'Yang',
    metaphor: 'Like a great mountain, solid and immovable',
    overview:
      'Wu Earth is the mountain. Majestic, dependable, and unshakable. You are the foundation upon which others build their lives. Your character is defined by reliability, patience, and a deep sense of responsibility. Like the mountain that has stood for millennia, you offer stability in a chaotic world. People come to you for strength and grounding.',
    personality:
      'You are steady, trustworthy, and incredibly patient. Your word is your bond, and you rarely make promises you cannot keep. You have a quiet confidence that does not need external validation. You are practical and grounded, preferring concrete plans over abstract theories. Your generosity is legendary. You will give the shirt off your back without being asked. However, you can be stubborn to a fault and resistant to change. Learning to embrace transformation rather than resist it will unlock new dimensions of growth.',
    career:
      'Stability-oriented fields call to you. Real estate, banking, agriculture, management, government, and large-scale project management are natural fits. You are excellent at building systems and structures that stand the test of time. Your patience and reliability make you an outstanding mentor and institutional leader. You may not rise as quickly as others, but your ascent is steady and permanent.',
    relationships:
      'In love, you are the rock. Loyal, protective, and endlessly patient, you offer a sense of security that few can match. You show love through consistent actions rather than dramatic gestures. You are deeply traditional and value commitment and family. Your challenge is emotional expression. You may bottle up feelings, assuming your actions speak loudly enough. A partner who gently encourages emotional openness will help balance your practical nature with deeper intimacy.',
  },
  Ji: {
    stem: 'Ji',
    element: 'Earth',
    yinYang: 'Yin',
    metaphor: 'Like fertile garden soil nurturing all seeds',
    overview:
      'Ji Earth is the garden soil. Soft, fertile, and endlessly nurturing. Where Wu Earth is the mountain, you are the field that quietly sustains life. Your nature is accommodating and inclusive; you accept all things into yourself and transform them into something beautiful. You are the caretaker, the nurturer, the quiet force that makes growth possible.',
    personality:
      'You are nurturing, detail-oriented, and remarkably perceptive. You notice things others miss. The subtle shift in someone\'s mood, the unspoken need, the overlooked detail. Your empathy runs deep, and you have a natural gift for making people feel cared for. You are modest and prefer to support from behind the scenes rather than seek the spotlight. However, your accommodating nature can lead to overextension. Learning to set boundaries without guilt is essential for your wellbeing.',
    career:
      'Service-oriented and detail-focused roles suit you best. Healthcare, nutrition, education, human resources, social work, farming, and hospitality are excellent paths. You excel at any role that involves caring for others or managing intricate details. Your organizational skills and patience make you invaluable in project coordination. You work best in supportive, harmonious environments where your contributions are acknowledged.',
    relationships:
      'You are the ultimate nurturer in love. Attentive, patient, and selflessly devoted. You show love through care: cooking meals, remembering preferences, anticipating needs. You create a warm, safe home environment that others crave. Your challenge is that you may give too much and neglect your own needs. A partner who actively reciprocates your care and ensures you are also nurtured will create a balanced, thriving partnership.',
  },
  Geng: {
    stem: 'Geng',
    element: 'Metal',
    yinYang: 'Yang',
    metaphor: 'Like a mighty sword forged in fire',
    overview:
      'Geng Metal is the unsheathed sword. Sharp, direct, and unapologetically powerful. You cut through deception and confusion with remarkable clarity. Your character is defined by courage, decisiveness, and an unwavering sense of justice. Like the blade that must be tempered in fire, your greatest strengths often emerge from your most challenging experiences.',
    personality:
      'You are bold, principled, and fiercely loyal. You say what you mean and mean what you say. Others may find your directness intimidating, but those who know you well value your honesty above all else. You have a strong competitive streak and thrive under pressure. Your sense of justice is absolute. You cannot tolerate dishonesty or injustice. However, your sharpness can wound those close to you. Learning to temper your blade with compassion and gentleness is your path to mastery.',
    career:
      'You excel in competitive, high-stakes environments. Law, military, surgery, engineering, finance, and martial arts are natural fits. You are outstanding in crisis management and any role requiring quick, decisive action. Your leadership style is commanding and efficient. Entrepreneurship appeals to you because you can forge your own path. Avoid passive or overly bureaucratic environments that dull your edge.',
    relationships:
      'In love, you are intensely loyal and protective. You may not be the most romantic in words, but your actions speak volumes. You would fight battles for those you love. You value honesty and directness in a partner and have zero tolerance for deception. Your challenge is softening your edges at home. A partner who is strong enough to stand beside you, yet tender enough to call forth your vulnerability, is your ideal match.',
  },
  Xin: {
    stem: 'Xin',
    element: 'Metal',
    yinYang: 'Yin',
    metaphor: 'Like a precious gem, refined and radiant',
    overview:
      'Xin Metal is the polished jewel. Beautiful, refined, and exquisitely detailed. Where Geng Metal is the raw sword, you are the diamond that has been cut and shaped to perfection. Your nature values beauty, precision, and elegance in all things. You have high standards and a keen eye for quality that sets you apart.',
    personality:
      'You are elegant, detail-oriented, and aesthetically sensitive. You have impeccable taste and a natural sense of style that others admire. Your mind is sharp and analytical, capable of seeing fine distinctions that others overlook. You are articulate and expressive, with a gift for communication. However, your high standards can make you critical. Of yourself and others. Perfectionism can become a prison if left unchecked. Learning to embrace imperfection and find beauty in the raw and unpolished is your growth edge.',
    career:
      'Precision and beauty-oriented fields are your domain. Jewelry design, fashion, beauty, finance, accounting, editing, music, and luxury brands all suit you well. You excel in roles requiring meticulous attention to detail and aesthetic judgment. Your communication skills make you effective in public relations, negotiation, and diplomacy. You are drawn to quality over quantity and prefer prestigious, refined work environments.',
    relationships:
      'You bring sophistication and depth to your romantic life. You are thoughtful, romantic, and appreciate the finer aspects of partnership. Shared tastes, intellectual connection, and mutual refinement. You express love with elegance: thoughtful gifts, beautiful experiences, and articulate words. Your challenge is that you can be overly critical or emotionally guarded. A partner who appreciates your depth and is patient with your need for emotional safety will unlock your most beautiful qualities.',
  },
  Ren: {
    stem: 'Ren',
    element: 'Water',
    yinYang: 'Yang',
    metaphor: 'Like the vast ocean, boundless and ever-flowing',
    overview:
      'Ren Water is the great ocean. Vast, powerful, and infinitely deep. Your mind is expansive, your vision is grand, and your ambitions know no bounds. Like the ocean that connects all continents, you have an extraordinary ability to bring diverse people and ideas together. You flow around obstacles with intelligence and persistence, always finding a way forward.',
    personality:
      'You are visionary, philosophical, and remarkably intelligent. Your mind works on multiple levels simultaneously, processing information with breadth and speed that others struggle to match. You are adaptable and resourceful, comfortable with ambiguity and change. Your generosity is oceanic. You give freely without keeping score. However, your vastness can make it difficult to focus. You may scatter your energy across too many projects or interests. Learning to channel your enormous potential into specific goals is the key to your greatest achievements.',
    career:
      'You are suited for roles requiring big-picture thinking and strategic vision. International business, consulting, philosophy, diplomacy, technology, travel, and logistics are excellent paths. You thrive in dynamic environments with variety and intellectual stimulation. Your ability to see connections others miss makes you an outstanding strategist and innovator. Entrepreneurship on a grand scale appeals to you. Avoid narrow, routine-bound positions that limit your flow.',
    relationships:
      'In love, you are generous, adventurous, and intellectually engaging. You need a partner who can match your depth and keep up with your ever-flowing mind. You value freedom within partnership and need space to explore and grow. Your challenge is emotional depth. Your vastness can make you seem emotionally unavailable. A partner who is patient, emotionally grounded, and adventurous will thrive alongside your boundless nature.',
  },
  Gui: {
    stem: 'Gui',
    element: 'Water',
    yinYang: 'Yin',
    metaphor: 'Like a gentle rain nourishing the earth',
    overview:
      'Gui Water is the gentle rain, the morning dew, the quiet stream that nourishes everything it touches. Where Ren Water is the ocean, you are the rain that brings life to the parched earth. Your nature is subtle, intuitive, and profoundly connected to the emotional currents of those around you. You may be quiet, but your influence is pervasive and life-giving.',
    personality:
      'You are intuitive, sensitive, and extraordinarily empathic. You feel the emotions of others as if they were your own, making you a natural healer and counselor. Your imagination is vivid and your inner world is rich with meaning. You are gentle, contemplative, and often spiritually inclined. You process the world through feeling rather than logic. However, your sensitivity can be overwhelming. You may absorb too much negativity from your environment or struggle with indecisiveness. Learning to protect your energy and trust your intuitive wisdom is essential for your wellbeing.',
    career:
      'Healing, creative, and intuitive fields call to you. Psychology, counseling, spiritual guidance, art, music, writing, nursing, and research are natural paths. You excel in roles that require emotional intelligence, creativity, and the ability to sense what lies beneath the surface. Your quiet perceptiveness makes you an outstanding researcher and analyst. You work best in calm, supportive environments that honor your sensitivity.',
    relationships:
      'You are the most emotionally attuned of all the day masters. In love, you offer profound understanding, tenderness, and spiritual connection. You desire a soul-deep bond and are not interested in superficial relationships. You express love through emotional presence, gentle touch, and intuitive understanding of your partner\'s needs. Your challenge is protecting your heart from being overwhelmed. A partner who is emotionally safe, consistent, and respectful of your sensitivity will bring out your most beautiful qualities.',
  },
};

// ============================================================
// Element Content
// ============================================================

export const elementContent: Record<string, ElementContent> = {
  Wood: {
    name: 'Wood',
    color: '#5C7A60',
    emoji: '\uD83C\uDF3F',
    qualities: 'Growth, flexibility, creativity, kindness, vision. Wood energy represents new beginnings, expansion, and the drive to push upward and outward. It governs the liver and gallbladder, and is associated with spring, the direction East, and the color green.',
  },
  Fire: {
    name: 'Fire',
    color: '#A85560',
    emoji: '\uD83D\uDD25',
    qualities: 'Passion, warmth, joy, expression, transformation. Fire energy represents illumination, enthusiasm, and the power to inspire. It governs the heart and small intestine, and is associated with summer, the direction South, and the colors red and pink.',
  },
  Earth: {
    name: 'Earth',
    color: '#A68D4A',
    emoji: '\u26F0\uFE0F',
    qualities: 'Stability, nourishment, trust, patience, grounding. Earth energy represents the center, the foundation upon which all else is built. It governs the spleen and stomach, and is associated with late summer, the center direction, and the colors yellow and brown.',
  },
  Metal: {
    name: 'Metal',
    color: '#6E7085',
    emoji: '\u2699\uFE0F',
    qualities: 'Precision, discipline, clarity, righteousness, refinement. Metal energy represents structure, boundaries, and the ability to discern value. It governs the lungs and large intestine, and is associated with autumn, the direction West, and the colors white and gold.',
  },
  Water: {
    name: 'Water',
    color: '#4E6A85',
    emoji: '\uD83C\uDF0A',
    qualities: 'Wisdom, intuition, adaptability, depth, flow. Water energy represents the unconscious, the hidden depths, and the ability to find a path through any obstacle. It governs the kidneys and bladder, and is associated with winter, the direction North, and the colors black and blue.',
  },
};

// ============================================================
// Pattern Descriptions
// ============================================================

export const patternDescriptions: Record<string, string> = {
  'Scholarly Pattern':
    'The Scholarly Pattern (Shi Shen / Shang Guan) indicates a brilliant, creative mind with exceptional talent for self-expression. You have a natural gift for learning, teaching, and artistic creation. Your intelligence is paired with a desire to share your knowledge and vision with the world. This pattern favors careers in education, writing, the arts, and innovation. You think independently and are not afraid to challenge conventions.',

  'Wealth Pattern':
    'The Wealth Pattern (Zheng Cai / Pian Cai) indicates a natural talent for generating and managing resources. You have excellent financial instincts and the drive to build material security. This pattern favors careers in business, finance, real estate, and trade. You are practical, goal-oriented, and willing to work hard for tangible results. Relationships with others are often a key driver of your success.',

  'Resource Pattern':
    'The Resource Pattern (Zheng Yin / Pian Yin) indicates strong support from mentors, knowledge, and tradition. You are blessed with access to wisdom, education, and nurturing influences. This pattern favors careers in academia, research, traditional medicine, and cultural preservation. You have a deep respect for learning and are often a lifelong student. Your connection to heritage and legacy is a source of strength.',

  'Authority Pattern':
    'The Authority Pattern (Zheng Guan / Qi Sha) indicates natural discipline, structure, and the ability to wield power responsibly. You have a strong sense of duty and the capacity to lead through organizational skill and moral authority. This pattern favors careers in government, law enforcement, the military, and corporate management. You thrive in structured environments where rules and order are valued.',

  'Companion Pattern':
    'The Companion Pattern (Bi Jian / Jie Cai) indicates strong self-reliance, independence, and an entrepreneurial spirit. You draw strength from your own resources and are comfortable standing on your own. This pattern favors careers in competitive fields, entrepreneurship, sports, and any domain where individual effort is rewarded. You are resilient, self-motivated, and naturally competitive.',

  'Dominant Pattern':
    'The Dominant Pattern emerges when the Day Master is extremely strong with heavy self-element energy. You possess overwhelming personal power and an iron will. This can manifest as extraordinary determination and leadership ability, but requires careful channeling. You are at your best when you find worthy outlets for your immense energy. Grand projects, bold ventures, and transformative endeavors.',

  'Follow Pattern':
    'The Follow Pattern emerges when the Day Master is extremely weak and surrounded by overwhelming external forces. Rather than fighting against the tide, your strength lies in flowing with the dominant energies around you. This pattern often indicates exceptional adaptability and the ability to thrive by aligning with powerful trends, organizations, or individuals. Your flexibility is your greatest asset.',

  'Hurting Officer Pattern':
    'The Hurting Officer Pattern indicates fierce independence, sharp intellect, and a rebellious creative spirit. You challenge authority naturally and have a gift for seeing flaws in existing systems. This pattern favors careers in innovation, reform, investigative journalism, and creative disruption. You are most fulfilled when breaking new ground and questioning the status quo.',

  'Seven Killings Pattern':
    'The Seven Killings Pattern (Qi Sha) indicates tremendous courage, intensity, and the ability to thrive under extreme pressure. You are a warrior at heart, drawn to high-stakes situations where others would falter. This pattern favors careers in emergency services, the military, competitive sports, high-risk entrepreneurship, and crisis management. Your intensity is both your weapon and your challenge.',

  'Indirect Resource Pattern':
    'The Indirect Resource Pattern (Pian Yin) indicates deep intuition, unconventional wisdom, and an affinity for esoteric knowledge. You learn through non-traditional channels and often possess insights that others find mysterious or profound. This pattern favors careers in alternative healing, metaphysics, research into the unknown, and creative fields that require accessing the subconscious mind.',
};
