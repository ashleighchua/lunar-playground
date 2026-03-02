export interface NumberMeaning {
  number: number;
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  career: string;
  relationships: string;
}

export const numberMeanings: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    title: 'The Leader',
    keywords: ['Independence', 'Ambition', 'Originality', 'Determination'],
    description:
      'Number 1 is the primal force from which all other numbers spring forth. You are a born pioneer with an innate drive to forge your own path. Your energy is that of the trailblazer -- someone who does not wait for permission to act, but instead creates opportunities where none existed before.\n\nPeople influenced by the number 1 carry a powerful inner fire. You possess an unwavering sense of self and a natural confidence that draws others to your vision. Your creative impulses are strong, and you have the rare ability to transform abstract ideas into concrete reality. When you commit to a goal, your focus becomes laser-sharp, and obstacles that would deter others become stepping stones in your journey.',
    strengths:
      'You excel at initiating projects and inspiring others to follow your lead. Your self-reliance is remarkable -- you trust your instincts and are willing to stand alone for what you believe in. You bring fresh perspectives and innovative solutions to every challenge. Your courage and decisiveness make you a natural authority figure.',
    challenges:
      'Your fierce independence can sometimes tip into stubbornness or an unwillingness to accept help. You may struggle with patience, wanting results immediately rather than allowing things to unfold naturally. Learning to collaborate without dominating, and to listen as actively as you speak, are key growth areas. Guard against ego-driven decisions that isolate you from valuable perspectives.',
    career:
      'You thrive in roles where you can lead, innovate, and set the direction. Entrepreneurship, executive leadership, creative direction, and any field that rewards bold initiative suits you perfectly. You perform best when given autonomy and the freedom to implement your vision without excessive bureaucratic constraints.',
    relationships:
      'In relationships, you are passionate, devoted, and protective. You need a partner who respects your independence while being strong enough to hold their own ground. You value honesty and directness in communication. Your ideal relationship is one of mutual respect between two individuals, rather than codependency. Learning to soften your assertive edge and make space for your partner\'s needs deepens your bonds immeasurably.',
  },
  2: {
    number: 2,
    title: 'The Peacemaker',
    keywords: ['Harmony', 'Diplomacy', 'Sensitivity', 'Cooperation'],
    description:
      'Number 2 embodies the principle of duality and partnership. You are the great harmonizer, gifted with an extraordinary sensitivity to the emotional currents around you. Where others see conflict, you see the possibility for resolution. Your intuition runs deep, and you possess an almost psychic ability to sense what others need before they can articulate it themselves.\n\nThose guided by the number 2 carry the energy of the moon -- reflective, nurturing, and quietly powerful. You understand that true strength often lies in gentleness, and that listening can be more transformative than speaking. Your patience and tact allow you to navigate complex social situations with grace, building bridges between opposing viewpoints and creating unity from discord.',
    strengths:
      'Your empathy is your superpower. You are an exceptional listener, mediator, and counselor. You notice subtleties that others miss entirely -- a shift in tone, an unspoken worry, the tension beneath a smile. Your ability to cooperate and compromise without losing your integrity makes you invaluable in any team. You bring beauty, balance, and emotional depth to everything you touch.',
    challenges:
      'Your sensitivity, while a gift, can also be a burden. You may absorb the emotions of those around you until you lose track of your own feelings. Indecisiveness can paralyze you when you fear that any choice might upset the balance. Learning to establish firm boundaries, to voice your own needs without guilt, and to accept that some conflict is healthy and necessary are essential parts of your growth.',
    career:
      'You flourish in roles that require collaboration, emotional intelligence, and attention to detail. Counseling, mediation, diplomacy, human resources, teaching, the healing arts, music, and any creative pursuit that involves partnership suits you beautifully. You work best in harmonious environments where teamwork is valued over competition.',
    relationships:
      'Love and partnership are central to your life purpose. You are devoted, romantic, and deeply attentive to your partner\'s needs. You crave emotional intimacy and a sense of being truly seen and understood. Your ideal relationship is a balanced partnership where both people nurture each other. Be mindful of sacrificing too much of yourself to keep the peace -- a truly loving relationship makes space for your authentic voice.',
  },
  3: {
    number: 3,
    title: 'The Communicator',
    keywords: ['Creativity', 'Expression', 'Joy', 'Inspiration'],
    description:
      'Number 3 is the number of creative self-expression and joyful communication. You are a natural storyteller, artist, and entertainer. The world lights up when you share your gifts, and your infectious enthusiasm has the power to lift spirits and open minds. Your imagination is vivid and boundless, constantly generating new ideas, images, and possibilities.\n\nPeople influenced by the number 3 carry the energy of the eternal child -- curious, playful, and full of wonder. You see beauty in the mundane and find humor in the absurd. Your warmth and charm make you magnetic in social settings, and your ability to articulate complex emotions through words, art, or performance touches others on a profound level.',
    strengths:
      'Your creative abilities are extraordinary. Whether through writing, speaking, visual art, music, or performance, you have a gift for translating the intangible into something others can feel and understand. Your optimism is genuine and contagious. You bring lightness to heavy situations and inspire others to see the world through a more colorful lens. Your social intelligence and wit make you a gifted networker and connector.',
    challenges:
      'Your abundant creative energy can scatter in too many directions, leaving brilliant projects unfinished. You may use humor or charm to deflect from deeper emotional truths you find difficult to confront. Superficiality and a tendency to avoid discomfort can prevent you from achieving the depth your talents deserve. Developing discipline, follow-through, and the courage to be vulnerable rather than merely entertaining are your greatest growth edges.',
    career:
      'You are born for the creative and communicative professions. Writing, acting, singing, public speaking, marketing, graphic design, comedy, teaching, social media, and any role that lets you inspire and entertain others through self-expression is your natural domain. You need variety and stimulation in your work -- routine drains your vitality.',
    relationships:
      'You bring romance, fun, and spontaneity to your relationships. You express love through words, gestures, and creative surprises. You need a partner who appreciates your playful nature and can keep up with your active social life. Emotional honesty is your growth area -- learn to share your fears and vulnerabilities as openly as you share your joy, and your relationships will gain the depth and intimacy you truly crave.',
  },
  4: {
    number: 4,
    title: 'The Builder',
    keywords: ['Stability', 'Discipline', 'Practicality', 'Foundation'],
    description:
      'Number 4 represents the solid foundation upon which lasting structures are built. You are the master architect of your own life, approaching every endeavor with methodical precision, unwavering discipline, and a deep respect for process. While others may chase quick results, you understand that anything worth having requires patience, planning, and persistent effort.\n\nThose guided by the number 4 carry the energy of the earth itself -- grounded, reliable, and enduring. You are the person others turn to when they need something done right, because your commitment to quality and integrity is absolute. Your practical wisdom and organizational skills transform chaos into order, and your steady presence provides a sense of security to everyone in your orbit.',
    strengths:
      'Your reliability is legendary. When you give your word, it is as solid as stone. You possess exceptional organizational abilities, attention to detail, and a work ethic that others admire deeply. You can take a complex, overwhelming project and break it into manageable steps, executing each one with care and precision. Your loyalty to those you love and your dedication to your responsibilities are among your most admirable qualities.',
    challenges:
      'Your love of structure can sometimes harden into rigidity. You may resist change even when adaptation is clearly needed, or become so focused on the rules that you miss the spirit behind them. Overwork is a genuine risk -- you can push yourself relentlessly without making time for rest, play, or spontaneity. Learning to embrace flexibility, to trust the process even when it feels messy, and to value imagination alongside logic will bring greater balance to your life.',
    career:
      'You excel in fields that reward precision, reliability, and long-term thinking. Engineering, architecture, accounting, project management, construction, law, banking, systems administration, and operations management are natural fits. You thrive in roles with clear expectations and measurable outcomes, and you build reputations that stand the test of time.',
    relationships:
      'You are a rock-steady partner -- loyal, dependable, and deeply committed. You show love through actions rather than words, building a secure and comfortable life for those you care about. You need a partner who appreciates your stability and does not mistake your reserve for emotional distance. Your growth lies in learning to express your feelings more openly, to surprise your partner with spontaneity, and to remember that love also needs play and lightness to flourish.',
  },
  5: {
    number: 5,
    title: 'The Explorer',
    keywords: ['Freedom', 'Adventure', 'Versatility', 'Change'],
    description:
      'Number 5 is the number of freedom, adventure, and the dynamic experience of being alive. You are driven by an insatiable curiosity about the world and an appetite for experience that knows no bounds. Routine is your kryptonite -- you thrive on variety, stimulation, and the thrill of the unknown. Life, for you, is meant to be tasted, explored, and lived to the fullest.\n\nPeople influenced by the number 5 carry the energy of wind and fire -- restless, transformative, and impossible to contain. You adapt quickly to new environments, pick up skills with remarkable speed, and possess a natural magnetism that draws people and opportunities to you. Your enthusiasm is infectious, and your stories and experiences make you endlessly fascinating to others.',
    strengths:
      'Your adaptability is your greatest asset. You can walk into any situation, culture, or challenge and find your footing quickly. Your courage to embrace change makes you resilient in ways that more cautious people cannot be. You are a natural communicator with a gift for languages, sales, and persuasion. Your progressive thinking and willingness to question convention often put you ahead of the curve.',
    challenges:
      'Your love of freedom can become a fear of commitment. You may scatter your considerable energy across too many pursuits, mastering none of them fully. Impulsiveness and restlessness can lead to poor decisions made in the heat of the moment. The temptation to escape through excess -- whether in substances, spending, or sensation-seeking -- is real. Learning to channel your energy with focus, to honor your commitments, and to find freedom within structure rather than always beyond it, is your essential life lesson.',
    career:
      'You need a career that offers variety, travel, and constant stimulation. Sales, marketing, journalism, travel industry, entrepreneurship, entertainment, public relations, consulting, and any field that takes you to new places and introduces you to new people will keep your spirit alive. Avoid roles that chain you to a desk or a rigid routine -- your productivity depends on your freedom.',
    relationships:
      'You are an exciting, passionate, and generous partner who brings adventure and spontaneity to your relationships. You need a partner who shares your love of freedom or at least respects it -- possessiveness and jealousy will drive you away faster than anything. Your growth lies in learning that true intimacy requires showing up consistently, that vulnerability is not a cage, and that the deepest adventures happen when you choose to go deep with one person rather than wide across many.',
  },
  6: {
    number: 6,
    title: 'The Nurturer',
    keywords: ['Responsibility', 'Love', 'Harmony', 'Service'],
    description:
      'Number 6 is the number of love, responsibility, and domestic harmony. You are the heart of your community -- the one who creates beauty, nurtures growth, and ensures that everyone around you feels cared for and supported. Your sense of duty runs deep, and you approach your responsibilities not as burdens but as expressions of love.\n\nThose guided by the number 6 carry the energy of Venus -- artistic, harmonious, and deeply attuned to beauty in all its forms. You have an innate understanding of what makes spaces, relationships, and situations feel balanced and whole. Your compassion is genuine, your commitment to family and community unwavering, and your ability to create warmth and welcome wherever you go is a rare and precious gift.',
    strengths:
      'Your capacity for love and service is extraordinary. You are a natural healer, teacher, and counselor. Your aesthetic sensibility brings beauty and harmony to everything you create. You are deeply responsible, and people trust you implicitly with their hearts, their homes, and their wellbeing. Your ability to see the best in others and to nurture their potential is one of your most powerful gifts.',
    challenges:
      'Your devotion to others can tip into self-sacrifice if you are not careful. You may neglect your own needs while tending to everyone else, leading to resentment or burnout. Perfectionism can make you overly critical -- of yourself and of those you love. You may also struggle with controlling tendencies, believing you know what is best for others. Learning to receive as gracefully as you give, to accept imperfection with compassion, and to love without conditions or expectations is your deepest work.',
    career:
      'You thrive in roles centered on care, beauty, and service. Healthcare, teaching, counseling, interior design, culinary arts, hospitality, social work, the arts, and any profession that lets you nurture and beautify the world around you is your natural calling. You often end up in leadership positions within these fields because people naturally trust your judgment and integrity.',
    relationships:
      'Love and family are the core of your existence. You are a devoted, romantic, and attentive partner who creates a home filled with warmth, beauty, and security. You need a partner who values domestic harmony as much as you do and who appreciates your many acts of love and service. Your growth lies in allowing your partner the freedom to make their own mistakes, in expressing your own needs clearly, and in remembering that the best gift you can give your loved ones is a fully nourished and joyful version of yourself.',
  },
  7: {
    number: 7,
    title: 'The Seeker',
    keywords: ['Wisdom', 'Introspection', 'Analysis', 'Spirituality'],
    description:
      'Number 7 is the number of the inner quest -- the relentless search for truth, meaning, and deeper understanding. You are a natural philosopher, researcher, and mystic. Your mind is razor-sharp, capable of penetrating beneath surface appearances to grasp the hidden patterns and principles that govern reality. You are not satisfied with easy answers or popular opinions; you must discover the truth for yourself.\n\nPeople influenced by the number 7 carry the energy of the hermit -- not out of loneliness, but out of a profound need for solitude in which to think, study, and commune with the deeper dimensions of existence. Your inner world is rich and complex, filled with questions that most people never think to ask. Your intuition is powerful, and when you learn to trust it alongside your analytical mind, your insights become truly extraordinary.',
    strengths:
      'Your intellectual depth is remarkable. You can analyze complex problems with surgical precision and see connections that others miss entirely. Your spiritual awareness gives you access to wisdom that transcends mere logic. You are a gifted researcher, writer, and teacher of esoteric or specialized subjects. Your independence of thought protects you from groupthink and allows you to arrive at genuinely original conclusions.',
    challenges:
      'Your need for solitude and introspection can become isolation. You may build walls around your heart, keeping others at a safe intellectual distance to avoid the messiness of emotional intimacy. Cynicism and skepticism, while useful tools, can harden into a reflexive dismissal of anything you cannot analyze or prove. Learning to balance your inner life with genuine human connection, to trust your heart as much as your mind, and to share your insights with warmth rather than detachment, will enrich your life beyond measure.',
    career:
      'You excel in fields that reward deep thinking, research, and specialized expertise. Science, academia, technology, psychology, philosophy, data analysis, investigative journalism, and any spiritual or metaphysical discipline suits your nature perfectly. You perform best when given the space and time to dive deep into a subject, and you produce your finest work in quiet, focused environments.',
    relationships:
      'You approach love thoughtfully and selectively. You are not one to rush into relationships -- you need to trust deeply before you open up. Once committed, you are a loyal and profoundly insightful partner. You need a companion who respects your need for solitude, who stimulates your mind, and who does not demand constant emotional availability. Your growth lies in learning to be present in your body and emotions, to express affection openly, and to let yourself be fully known by another person.',
  },
  8: {
    number: 8,
    title: 'The Powerhouse',
    keywords: ['Authority', 'Abundance', 'Achievement', 'Mastery'],
    description:
      'Number 8 is the number of material mastery, personal power, and karmic balance. You are here to learn the responsible use of power, wealth, and influence. Your ambition is immense, your drive relentless, and your ability to manifest goals in the material world is unmatched. You think big, plan strategically, and execute with the precision of a master chess player.\n\nPeople influenced by the number 8 carry the energy of the cosmic balance -- represented by the infinity symbol, your number turned on its side. You understand instinctively that power and responsibility are inseparable, and that true abundance flows to those who create value for others. Your journey involves mastering the delicate balance between material achievement and spiritual integrity, between ambition and compassion.',
    strengths:
      'Your business acumen and organizational genius are formidable. You have an innate understanding of money, power, and systems that allows you to build empires from nothing. Your resilience is extraordinary -- you have the ability to recover from setbacks that would break others. You command natural authority and respect. Your vision is grand, your courage unshakeable, and your capacity for hard work seemingly limitless.',
    challenges:
      'The shadow side of your power can manifest as materialism, workaholism, or a tendency to measure your worth solely by your achievements and possessions. You may struggle with control issues, difficulty delegating, or an unconscious belief that vulnerability equals weakness. Financial extremes -- both feast and famine -- may mark your journey until you learn the deeper lessons of abundance. Your essential growth lies in understanding that true power serves others, that money is energy rather than identity, and that your most lasting legacy will be measured in lives touched rather than zeros in a bank account.',
    career:
      'You are built for positions of authority and influence. Business ownership, corporate leadership, finance, investment, real estate, law, politics, and any field where strategic vision and the ability to manage large operations are valued will allow your talents to flourish. You are at your best when building something of lasting significance.',
    relationships:
      'You bring strength, stability, and ambition to your relationships. You are a provider and protector who works tirelessly to give your loved ones the best life possible. You need a partner who is strong, independent, and supportive of your goals -- someone who sees your tenderness beneath the tough exterior. Your growth lies in making time for love alongside work, in showing vulnerability to your partner, and in understanding that emotional generosity is the most valuable currency in any relationship.',
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    keywords: ['Compassion', 'Wisdom', 'Idealism', 'Completion'],
    description:
      'Number 9 is the number of universal love, wisdom, and completion. You are an old soul who carries the accumulated wisdom of all the numbers that came before. Your vision extends far beyond personal concerns -- you are moved by the suffering and beauty of the human condition as a whole. You are here to serve a purpose greater than yourself, and your deepest fulfillment comes from giving, healing, and inspiring others.\n\nPeople influenced by the number 9 carry the energy of the sage and the philanthropist. You have experienced much in your journey, and this depth of experience has given you a compassion that is both fierce and tender. You see the interconnectedness of all things and understand that the highest form of self-realization comes through selfless service. Your artistic sensibility is refined, your emotional intelligence profound, and your capacity for forgiveness and letting go unmatched.',
    strengths:
      'Your compassion knows no boundaries. You have a remarkable ability to understand and empathize with people from all walks of life and all corners of the world. Your creative talents are often extraordinary, infused with emotional depth and universal themes. You are a natural teacher, healer, and leader who inspires others through the power of your example. Your generosity -- of spirit, time, and resources -- enriches everyone it touches.',
    challenges:
      'Your idealism can lead to disappointment when reality falls short of your vision. You may struggle with letting go of the past, carrying old wounds and unresolved relationships longer than serves you. Your tendency to give selflessly can become martyrdom if you do not learn to receive. You may also grapple with a sense of loss or endings throughout your life, as the 9 energy is intimately connected with completion and release. Learning to accept imperfection, to set boundaries on your generosity, and to trust that endings are also beginnings is your essential life work.',
    career:
      'You are drawn to work that serves humanity. The arts, philanthropy, humanitarian organizations, teaching, healthcare, counseling, environmental work, social justice, international development, and any career that allows you to make a meaningful difference in the world is your calling. Your creative gifts often find their fullest expression when channeled toward a cause larger than yourself.',
    relationships:
      'You love deeply and unconditionally. You are a romantic who sees the divine in your partner and who gives generously of yourself. You need a companion who shares your idealism and who understands that your heart belongs partly to the world. Possessive or small-minded partners will suffocate you. Your growth lies in balancing your universal love with the specific, daily acts of intimacy that sustain a partnership, and in learning to receive love as gracefully as you give it.',
  },
  11: {
    number: 11,
    title: 'The Visionary',
    keywords: ['Intuition', 'Illumination', 'Inspiration', 'Idealism'],
    description:
      'Master Number 11 is the most intuitive of all numbers, carrying a frequency of spiritual illumination and visionary insight. You are a channel between the seen and unseen worlds, gifted with an extraordinary sensitivity to energy, emotion, and the subtle currents of consciousness. Your presence is electric -- people feel something shift when you walk into a room, even if they cannot name what it is.\n\nAs a master number, 11 carries both immense potential and immense pressure. You are here to inspire humanity through your vision, your creativity, and your spiritual awareness. You have access to insights and truths that most people can only glimpse in their deepest moments of clarity. The challenge is learning to ground this ethereal energy into practical, tangible contributions that serve the world.',
    strengths:
      'Your intuition borders on the supernatural. You sense truths that bypass logical analysis entirely. Your creative vision is inspired and often ahead of its time. You have a charismatic presence that naturally draws followers and collaborators. Your idealism, when channeled constructively, has the power to shift paradigms and transform collective consciousness. You are a natural healer, artist, and spiritual teacher.',
    challenges:
      'The intensity of your sensitivity can be overwhelming. You may experience anxiety, nervous tension, or periods of spiritual crisis as you struggle to integrate your heightened awareness with everyday reality. Self-doubt can plague you despite your extraordinary gifts, because the gap between your vision and your current reality feels impossibly wide. You may oscillate between grandiose confidence and paralyzing insecurity. Learning to ground yourself through daily practices, to be patient with your own human limitations, and to channel your inspiration into consistent action is your essential path.',
    career:
      'You are suited for roles that allow you to inspire, illuminate, and transform. Spiritual leadership, the arts, psychology, counseling, motivational speaking, filmmaking, music, writing, energy healing, and any platform that amplifies your visionary message is your natural stage. You often find success in unconventional or pioneering fields.',
    relationships:
      'You love with an intensity that can be both beautiful and overwhelming. You crave a soul-deep connection and are rarely satisfied with surface-level romance. You need a partner who can match your emotional depth and who is comfortable with the spiritual dimensions of intimacy. Your growth lies in accepting your partner as a human being rather than an ideal, in communicating your needs without assuming your partner can read your mind, and in finding peace within yourself so that your relationships become sources of joy rather than desperate attempts to feel whole.',
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    keywords: ['Vision', 'Manifestation', 'Legacy', 'Mastery'],
    description:
      'Master Number 22 is the most powerful number in numerology -- the Master Builder who turns visionary dreams into concrete reality on a grand scale. You carry the inspired intuition of the 11 combined with the practical discipline of the 4, creating a rare alchemy of vision and execution. You are here to build something of lasting significance that serves not just yourself, but humanity as a whole.\n\nThe energy of 22 is monumental. You think in terms of systems, institutions, and legacies. Where others see limitations, you see blueprints for transformation. Your potential for achievement is extraordinary, but so is the pressure you place on yourself. You are not interested in small gestures or temporary solutions -- everything you create is meant to endure and to elevate the human condition.',
    strengths:
      'Your ability to combine visionary thinking with practical execution is virtually unmatched. You can conceptualize complex systems and then build them, step by methodical step. Your leadership is both inspiring and grounded. You possess the charisma to rally others around your vision and the discipline to see projects through to completion. Your work has the potential to create lasting, systemic change in the world.',
    challenges:
      'The weight of your potential can become crushing if you are not careful. You may feel perpetually inadequate, as if nothing you accomplish ever matches the scope of your inner vision. Perfectionism, workaholism, and burnout are real dangers. You may also struggle with the burden of responsibility that comes with leading large-scale endeavors. Your growth lies in learning to celebrate incremental progress, to delegate without losing faith, to rest without guilt, and to trust that you do not have to build the entire cathedral alone.',
    career:
      'You are destined for large-scale leadership and creation. Architecture, international business, politics, large-scale philanthropy, technology innovation, urban planning, institutional reform, and any role where you can design and implement systems that serve millions is your natural domain. You are the founder, the CEO, the visionary architect of organizations that outlive their creators.',
    relationships:
      'You bring an extraordinary depth of commitment and vision to your relationships. You are a devoted partner who provides stability, inspiration, and a sense of shared purpose. You need someone who understands the demands of your mission and who supports your ambitions while holding you accountable to your humanity. Your growth lies in being fully present with your partner even when your mind is designing the future, in expressing tenderness alongside strength, and in remembering that your most important legacy is the love you build at home.',
  },
  33: {
    number: 33,
    title: 'The Master Teacher',
    keywords: ['Compassion', 'Healing', 'Devotion', 'Upliftment'],
    description:
      'Master Number 33 is the rarest and most spiritually evolved of the master numbers -- the Master Teacher whose life purpose is to uplift humanity through unconditional love, healing, and selfless service. You carry the creative joy of the 3 doubled and amplified, combined with the nurturing wisdom of the 6. Your very presence has the power to heal, inspire, and awaken others to their highest potential.\n\nThe energy of 33 is profoundly compassionate. You feel the suffering of the world in your own heart, and you are driven by an irresistible calling to ease that suffering in whatever way you can. You teach not through lecturing but through living -- your example of love, courage, and devotion becomes the lesson. Throughout history, the most revered spiritual teachers and healers have carried this vibration.',
    strengths:
      'Your capacity for love is boundless and your desire to serve is utterly sincere. You are a gifted healer, teacher, and counselor whose mere presence comforts and inspires. Your creative abilities are infused with a spiritual quality that touches the deepest parts of the human soul. You have the rare gift of seeing the divine spark in every person, no matter how dimmed it may appear. Your courage in the face of suffering and your willingness to sacrifice for others are genuinely heroic.',
    challenges:
      'The spiritual demands of the 33 path can feel overwhelming. You may take on the suffering of others to an extent that damages your own health and wellbeing. The gap between the ideal of unconditional love and the messy reality of human relationships can cause you profound pain. You may struggle with martyrdom, with an inability to set boundaries, or with a sense that nothing you do is ever enough. Your essential growth lies in learning that you cannot pour from an empty cup, that self-care is not selfishness, that even the Master Teacher must sometimes be the student, and that your greatest service begins with treating yourself with the same compassion you so freely offer the world.',
    career:
      'You are called to the highest forms of service and teaching. Spiritual leadership, healing arts, education, counseling, humanitarian work, the arts, and any vocation that allows you to nurture the spiritual growth of others is your sacred calling. Many with this number find their way to roles where they influence culture, consciousness, or community on a profound level. Your work is rarely about personal gain -- it is about lifting others up.',
    relationships:
      'You love with a devotion that borders on the sacred. You give everything of yourself to those you love, often placing their needs far above your own. You need a partner who recognizes the depth of your love and who helps you remember to direct some of that extraordinary compassion inward. Your growth lies in accepting that you are worthy of the same unconditional love you offer others, in allowing yourself to be cared for, and in building a relationship that is a sanctuary of mutual nourishment rather than a stage for one-sided sacrifice.',
  },
};
