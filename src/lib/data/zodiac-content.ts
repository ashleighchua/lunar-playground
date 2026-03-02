export interface ZodiacAnimalContent {
  animal: string;
  emoji: string;
  title: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  career: string[];
  wealth: string;
  love: string[];
  health: string;
  famous: string[];
}

export const zodiacContent: Record<string, ZodiacAnimalContent> = {
  Rat: {
    animal: 'Rat',
    emoji: '\uD83D\uDC00',
    title: 'The Resourceful Rat',
    overview:
      'Those born in the Year of the Rat are blessed with sharp instincts and remarkable adaptability. They possess a natural charm that draws people toward them, along with an innate ability to spot opportunities where others see only obstacles. Quick-witted and perceptive, Rats are the ultimate survivors who thrive in any environment they find themselves in.\n\nBeneath their sociable exterior lies a shrewd and calculating mind that is always several steps ahead. Rats are incredibly observant, picking up on subtle cues that others miss entirely. They value security and family above all else, and will work tirelessly to build a comfortable and prosperous life for their loved ones.',
    strengths: [
      'Exceptionally intelligent and resourceful — able to find creative solutions to the most complex problems.',
      'Natural curiosity drives them to constantly learn and grow, making them well-rounded with diverse knowledge.',
      'Excellent social skills let them navigate any situation with ease, building valuable networks for life.',
    ],
    weaknesses: [
      'Desire for security can manifest as excessive caution or hoarding tendencies.',
      'May struggle with letting go of grudges and can become overly critical of those who fall short of their standards.',
      'Somewhat secretive — preferring to keep true feelings and plans hidden from even their closest friends.',
    ],
    career: [
      'Excel in careers requiring quick thinking and strategic planning — entrepreneurship, finance, and writing.',
      'Sharp minds and attention to detail make them outstanding analysts and researchers.',
      'Natural people skills make them effective politicians, publicists, and managers.',
    ],
    wealth:
      'With their keen eye for opportunity and natural thriftiness, Rats tend to accumulate wealth steadily over time. They are excellent at spotting profitable investments and rarely make impulsive financial decisions. However, their occasional indulgence in small luxuries can add up, so maintaining a budget is essential for long-term financial health.',
    love: [
      'Devoted and passionate partners who crave deep emotional connections.',
      'Naturally charming and quite romantic when they feel secure in a relationship.',
      'Need partners who match their intellectual depth and respect their need for solitude.',
    ],
    health:
      'Rats generally enjoy good health but are prone to stress-related ailments due to their tendency to overthink and worry. Regular exercise and mindfulness practices are essential for maintaining their mental well-being. They should pay particular attention to their digestive system and nervous system, both of which are sensitive areas for this sign.',
    famous: ['William Shakespeare', 'George Washington', 'Katy Perry'],
  },

  Ox: {
    animal: 'Ox',
    emoji: '\uD83D\uDC02',
    title: 'The Steadfast Ox',
    overview:
      'The Ox is the embodiment of diligence, dependability, and quiet strength. People born under this sign approach life with unwavering determination and a methodical nature that ensures they see every task through to completion. They are the bedrock upon which great achievements are built, and their patience is virtually limitless when pursuing a worthy goal.\n\nDespite their reserved exterior, Oxen possess a rich inner world and deeply held values that guide every decision they make. They are fiercely loyal to family and tradition, and their word is their bond. An Ox may not be the loudest person in the room, but their steady presence commands respect from all who know them.',
    strengths: [
      'Extraordinarily reliable and hardworking — often setting the standard for perseverance.',
      'Natural integrity earns the trust and respect of everyone around them.',
      'Practical, grounded approach means they rarely make reckless decisions; patience lets them outlast any competition.',
    ],
    weaknesses: [
      'Stubbornness can be legendary, making it difficult to adapt when circumstances change.',
      'May become overly rigid in thinking and resistant to new ideas or unconventional methods.',
      'Reserved nature can be mistaken for coldness; may struggle to express emotions openly.',
    ],
    career: [
      'Thrive in careers rewarding consistency and long-term commitment — engineering, real estate, banking.',
      'Methodical nature makes them excellent surgeons, archaeologists, and military leaders.',
      'Can execute complex plans with precision and unwavering focus.',
    ],
    wealth:
      'Financial security is deeply important to the Ox, and they build wealth through steady, disciplined saving and conservative investments. They are not drawn to get-rich-quick schemes and prefer proven, reliable methods of growing their resources. Over time, their patience and discipline often result in substantial material comfort and security.',
    love: [
      'Profoundly loyal and devoted — express love through acts of service and unwavering support.',
      'Seek stable, long-term partnerships built on mutual respect and shared values.',
      'Deep commitment and reliability make them some of the most cherished partners in the zodiac.',
    ],
    health:
      'Oxen tend to have strong constitutions but can neglect their health due to their workaholic tendencies. They should be mindful of overexertion and make time for rest and relaxation. Joint health and cardiovascular fitness are areas that deserve particular attention, especially as they age and continue to push themselves physically.',
    famous: ['Barack Obama', 'Vincent van Gogh', 'Walt Disney'],
  },

  Tiger: {
    animal: 'Tiger',
    emoji: '\uD83D\uDC05',
    title: 'The Courageous Tiger',
    overview:
      'Tigers are born leaders who command attention the moment they enter a room. Brave, competitive, and fiercely independent, they approach life with a confidence and intensity that is both inspiring and slightly intimidating. They are natural risk-takers who thrive on challenge and refuse to be confined by convention or the expectations of others.\n\nBeneath their bold exterior, Tigers possess a generous heart and a strong sense of justice that compels them to stand up for the underdog. They are passionately protective of those they love and will fight tirelessly against any form of injustice. Their magnetic personality and indomitable spirit make them some of the most unforgettable people you will ever meet.',
    strengths: [
      'Extraordinary courage — willing to take bold action when others hesitate.',
      'Natural charisma and confidence make them compelling leaders who rally others around a shared vision.',
      'Deeply compassionate, using their strength to champion those who cannot fight for themselves.',
    ],
    weaknesses: [
      'Impulsive nature can lead to hasty decisions they later regret.',
      'Restless and impatient — struggle with tasks requiring prolonged attention to mundane details.',
      'Need for independence and control can create friction in personal and professional relationships.',
    ],
    career: [
      'Drawn to careers offering excitement and autonomy — entrepreneurship, exploration, military leadership.',
      'Excel in political roles where they can make a significant, visible impact.',
      'Bold vision suits creative fields — art, film, and design where they break new ground.',
    ],
    wealth:
      'Tigers tend to have a feast-or-famine relationship with money, as their willingness to take risks can lead to both spectacular gains and significant losses. They are generous spenders who enjoy sharing their wealth with friends and family. Building a financial safety net and seeking conservative counsel for investments can help balance their adventurous financial instincts.',
    love: [
      'Passionate and intensely romantic — bring excitement and spontaneity to relationships.',
      'Need partners who match their energy and respect their fierce independence.',
      'Once committed, they are devoted and protective — willing to move mountains for loved ones.',
    ],
    health:
      'Tigers are naturally energetic and athletic, but their tendency to push themselves to extremes can lead to burnout and injuries. They benefit from activities that channel their energy constructively, such as martial arts, hiking, or competitive sports. Managing stress through adequate rest and avoiding overcommitment is crucial for their long-term well-being.',
    famous: ['Queen Elizabeth II', 'Tom Cruise', 'Lady Gaga'],
  },

  Rabbit: {
    animal: 'Rabbit',
    emoji: '\uD83D\uDC07',
    title: 'The Graceful Rabbit',
    overview:
      'Those born in the Year of the Rabbit are among the most refined and gentle souls in the Chinese zodiac. They possess an innate elegance and a deep appreciation for beauty, harmony, and the finer things in life. Rabbits move through the world with a quiet grace that belies their sharp intelligence and keen observational skills.\n\nRabbits are natural diplomats who excel at creating peace and harmony in their surroundings. They have an almost uncanny ability to sense the emotions of others and respond with empathy and tact. While they may appear soft-spoken and reserved, they possess a quiet inner strength and determination that should never be underestimated.',
    strengths: [
      'Exceptional taste, diplomacy, and emotional intelligence.',
      'Natural ability to create harmonious environments and bring out the best in others.',
      'Keen intuition and careful attention to detail make them excellent judges of character.',
    ],
    weaknesses: [
      'Desire to avoid conflict can lead to being overly accommodating or indecisive.',
      'May struggle with confrontation and have difficulty asserting their own needs.',
      'Sensitivity can make them vulnerable to anxiety and overthinking under stress.',
    ],
    career: [
      'Flourish in careers using creativity and diplomacy — design, counseling, diplomacy, writing.',
      'Refined sensibilities draw them to fashion, interior design, and culinary arts.',
      'Appreciation for beauty and quality shines in any detail-oriented role.',
    ],
    wealth:
      'Rabbits have a conservative approach to finances that typically serves them well over the long term. They prefer stable, low-risk investments and are skilled at finding good value without overspending. Their taste for luxury can occasionally test their budget, but their natural prudence usually keeps their finances in healthy balance.',
    love: [
      'Romantic and devoted — create warm, nurturing relationships built on mutual respect.',
      'Thrive in stable, harmonious partnerships where they feel safe to be vulnerable.',
      'Attentive and thoughtful, going to great lengths to make their partner feel cherished.',
    ],
    health:
      'Rabbits tend to have sensitive constitutions and are particularly affected by their emotional environment. Stress and conflict can manifest as physical symptoms, so maintaining a peaceful lifestyle is essential for their health. Gentle exercises like yoga, tai chi, or swimming, combined with a balanced diet, help keep Rabbits in optimal condition.',
    famous: ['Albert Einstein', 'Angelina Jolie', 'Lionel Messi'],
  },

  Dragon: {
    animal: 'Dragon',
    emoji: '\uD83D\uDC09',
    title: 'The Mighty Dragon',
    overview:
      'The Dragon is the most powerful and auspicious sign in the Chinese zodiac, symbolizing strength, good fortune, and imperial authority. Those born in the Year of the Dragon are blessed with extraordinary vitality, ambition, and an almost magnetic charisma that naturally draws followers and admirers. They dream big and possess the courage and talent to turn those dreams into reality.\n\nDragons carry themselves with a regal confidence that sets them apart from the crowd. They are natural innovators who refuse to accept limitations and constantly push the boundaries of what is possible. Their enthusiasm is infectious, their energy seemingly boundless, and their vision for the future is always grand and inspiring.',
    strengths: [
      'Unmatched combination of ambition, intelligence, and charisma — natural leaders and visionaries.',
      'Fearless in the face of challenges with an extraordinary ability to inspire and motivate.',
      'Creative minds and bold problem-solving lead to breakthrough innovations.',
    ],
    weaknesses: [
      'Supreme confidence can cross into arrogance — appearing domineering or dismissive.',
      'Perfectionists who set impossibly high standards for themselves and everyone around them.',
      'Fiery temper and impatience with those who can\'t keep pace can strain relationships.',
    ],
    career: [
      'Destined for leadership — thrive as CEOs, architects, judges, and film directors.',
      'Vision and charisma make them exceptionally successful politicians and tech entrepreneurs.',
      'Shape the future on a grand scale; change entire industries.',
    ],
    wealth:
      'Dragons are naturally fortunate in financial matters, often attracting wealth and opportunity through their bold ventures and magnetic personality. They are generous with their resources and enjoy the status that comes with material success. However, their tendency toward grand gestures and ambitious projects means they should ensure they maintain solid financial reserves.',
    love: [
      'Passionate and exciting — bring intensity and adventure to relationships.',
      'Need confident, independent partners who stand as equals rather than be overshadowed.',
      'When they find their match, the relationship becomes an epic partnership of mutual admiration.',
    ],
    health:
      'Dragons generally enjoy robust health thanks to their abundant energy and positive outlook on life. However, their tendency to overwork and take on too many commitments can lead to exhaustion and stress-related conditions. Regular exercise, adequate sleep, and learning to delegate responsibilities are essential for maintaining their legendary vitality.',
    famous: ['Bruce Lee', 'John Lennon', 'Rihanna'],
  },

  Snake: {
    animal: 'Snake',
    emoji: '\uD83D\uDC0D',
    title: 'The Wise Snake',
    overview:
      'The Snake is the most enigmatic and philosophical sign of the Chinese zodiac. Those born under this sign possess a deep, intuitive wisdom that allows them to perceive truths hidden from ordinary sight. Snakes move through life with a quiet elegance and deliberate grace, carefully observing the world around them before making their move.\n\nBeneath their calm and composed exterior lies a complex mind that is constantly analyzing, strategizing, and contemplating the deeper meanings of life. Snakes are drawn to mystery, beauty, and the pursuit of knowledge. They possess a natural sophistication and allure that makes them some of the most intriguing and memorable people in any gathering.',
    strengths: [
      'Exceptional intuition and analytical abilities — navigate complex situations with ease.',
      'Naturally wise; often serve as trusted advisors to friends and colleagues.',
      'Absolute determination once focused — pursue objectives with patient persistence.',
    ],
    weaknesses: [
      'Can be overly suspicious and secretive, creating barriers in personal relationships.',
      'Tendency toward jealousy and possessiveness, especially in romantic partnerships.',
      'May resist necessary changes and miss opportunities requiring quick, decisive action.',
    ],
    career: [
      'Excel in roles requiring deep thinking — science, philosophy, psychology, investigation.',
      'Refined aesthetic sense draws them to fashion, jewelry design, and fine arts.',
      'Eye for beauty and quality produces exceptional, detail-oriented work.',
    ],
    wealth:
      'Snakes are shrewd financial managers who rarely make careless money decisions. They have an excellent instinct for investments and tend to accumulate wealth quietly and steadily over time. Their taste for luxury is balanced by their natural prudence, though they occasionally indulge in high-quality items that bring them lasting pleasure.',
    love: [
      'Deeply passionate and intensely devoted — seek profound emotional and intellectual connections.',
      'Not interested in superficial relationships; attentive and romantic when in love.',
      'Require complete trust and loyalty — betrayal is something they neither forgive nor forget.',
    ],
    health:
      'Snakes need to be particularly mindful of their tendency to internalize stress, which can lead to anxiety and digestive issues. They benefit greatly from meditation, gentle exercise, and spending time in nature. Adequate rest is essential, as Snakes can push themselves mentally to the point of exhaustion without realizing they have overextended.',
    famous: ['Mahatma Gandhi', 'Pablo Picasso', 'Taylor Swift'],
  },

  Horse: {
    animal: 'Horse',
    emoji: '\uD83D\uDC0E',
    title: 'The Spirited Horse',
    overview:
      'Those born in the Year of the Horse are among the most energetic and free-spirited individuals in the Chinese zodiac. They possess an infectious enthusiasm for life and a restless desire for adventure that keeps them constantly in motion. Horses are natural entertainers whose warmth, humor, and vivacity light up every room they enter.\n\nFreedom is the lifeblood of the Horse, and they will resist any attempt to constrain or confine them. They are fiercely independent thinkers with strong opinions and the courage to express them freely. Despite their love of independence, Horses are deeply social creatures who form strong bonds and bring tremendous energy and joy to their relationships.',
    strengths: [
      'Boundless energy, quick minds, and natural charm make them popular wherever they go.',
      'Adaptable and resourceful — think on their feet and respond to rapidly changing situations.',
      'Positive attitude and genuine enthusiasm inspire others to embrace adventure.',
    ],
    weaknesses: [
      'Restless nature can make them inconsistent — may lose interest once initial excitement fades.',
      'Impulsive decision-making, acting on emotion rather than careful analysis.',
      'Need for freedom and stimulation can make them unreliable with routine commitments.',
    ],
    career: [
      'Thrive in dynamic careers with variety and travel — journalism, sales, athletics.',
      'Natural charisma makes them outstanding performers and public speakers.',
      'Communication skills suit marketing and any role that captivates an audience.',
    ],
    wealth:
      'Horses tend to earn well thanks to their energy and versatility, but their impulsive spending habits can undermine their financial security. They enjoy spending on experiences and adventures rather than accumulating material possessions. Setting up automatic savings and working with a financial advisor can help Horses build the long-term security they need.',
    love: [
      'Passionate and exciting — bring adventure and spontaneity to relationships.',
      'Fall in love quickly and intensely, bringing full energy to the partnership.',
      'Need partners who understand their independence and provide a stable emotional anchor.',
    ],
    health:
      'Horses are naturally athletic and energetic, but their tendency to overdo everything can lead to physical exhaustion and injuries. They need to balance their active lifestyle with adequate rest and recovery time. Outdoor activities and team sports are excellent for maintaining both their physical fitness and their social well-being.',
    famous: ['Genghis Khan', 'Rembrandt', 'Paul McCartney'],
  },

  Goat: {
    animal: 'Goat',
    emoji: '\uD83D\uDC10',
    title: 'The Gentle Goat',
    overview:
      'The Goat, also known as the Sheep or Ram, is the most artistic and gentle soul in the Chinese zodiac. Those born under this sign possess a rich inner world filled with creativity, compassion, and a deep appreciation for beauty in all its forms. Goats are natural nurturers who create warmth and harmony wherever they go.\n\nDespite their gentle demeanor, Goats possess a quiet resilience and inner strength that sustains them through life\'s challenges. They are deeply empathetic individuals who feel the joys and sorrows of others as keenly as their own. Their artistic vision and emotional depth allow them to create beauty that touches the hearts of everyone who encounters it.',
    strengths: [
      'Extraordinary creativity, compassion, and emotional intelligence.',
      'Natural eye for beauty and design that elevates everything they touch.',
      'Gentle, nurturing nature creates safe spaces where others feel comfortable being authentic.',
    ],
    weaknesses: [
      'Can be overly dependent on approval and support, undermining confidence and decision-making.',
      'Tendency toward pessimism and worry, especially when facing uncertainty or conflict.',
      'Sensitive to criticism — may withdraw from situations where assertiveness is needed.',
    ],
    career: [
      'Flourish in creative and nurturing professions — art, music, design, floristry.',
      'Compassionate nature draws them to social work, counseling, and veterinary medicine.',
      'Artistic vision and empathy make a meaningful difference in the lives of others.',
    ],
    wealth:
      'Goats may experience fluctuations in their financial lives, as they prioritize experiences and beauty over strict financial planning. They benefit enormously from having a trustworthy financial partner or advisor who can help them manage their resources wisely. When supported by the right structures, Goats can achieve comfortable financial security through their creative talents.',
    love: [
      'Tender, devoted, and deeply romantic — thrive in nurturing, supportive relationships.',
      'Seek partners who appreciate their sensitivity and provide emotional security.',
      'In a loving relationship they blossom, pouring creative energy into a warm home life.',
    ],
    health:
      'Goats are sensitive to their environment and can be deeply affected by stress, negative energy, and harsh conditions. They need peaceful, beautiful surroundings to maintain their emotional and physical well-being. Gentle activities like gardening, painting, or walking in nature are particularly therapeutic, along with a consistent routine that provides stability.',
    famous: ['Michelangelo', 'Mark Twain', 'Julia Roberts'],
  },

  Monkey: {
    animal: 'Monkey',
    emoji: '\uD83D\uDC12',
    title: 'The Clever Monkey',
    overview:
      'The Monkey is the most intellectually curious and inventive sign of the Chinese zodiac. Those born in the Year of the Monkey possess a brilliant, agile mind that delights in solving puzzles, learning new skills, and finding creative shortcuts that others never thought possible. They are the eternal students of life, driven by an insatiable desire to understand how everything works.\n\nMonkeys are natural entertainers whose quick wit, playful humor, and infectious energy make them the life of any gathering. They possess a remarkable ability to read people and situations, adapting their approach with chameleon-like flexibility. Beneath their playful exterior lies a strategic mind capable of extraordinary cunning and impressive feats of intelligence.',
    strengths: [
      'Exceptional intelligence, versatility, and creative problem-solving that borders on genius.',
      'Learn new skills with astonishing speed and master complex subjects that baffle others.',
      'Natural humor and charisma make them beloved; quick thinking navigates the trickiest situations.',
    ],
    weaknesses: [
      'Restless intellect makes them easily bored — may abandon projects before completion.',
      'Considerable charm can be used to manipulate situations, eroding trust over time.',
      'Mischievous nature and love of pranks may sometimes go too far.',
    ],
    career: [
      'Excel in careers challenging their intellect — technology, science, entertainment, finance.',
      'Versatility and quick learning make them outstanding consultants and entrepreneurs.',
      'Can pivot quickly in rapidly changing markets and thrive on constant variety.',
    ],
    wealth:
      'Monkeys are clever with money and often find innovative ways to increase their income. They enjoy taking calculated financial risks and have the analytical skills to make them pay off more often than not. However, their love of novelty can lead to impulse purchases, so establishing a savings discipline early in life is important for their long-term prosperity.',
    love: [
      'Charming, playful, and intellectually stimulating — keep relationships fresh and exciting.',
      'Need partners who match their wit and keep them mentally engaged long-term.',
      'When they truly commit, they bring creativity, humor, and surprising depth of loyalty.',
    ],
    health:
      'Monkeys tend to have good overall health thanks to their active minds and bodies, but their nervous energy can lead to stress and insomnia. They benefit from activities that engage both mind and body, such as rock climbing, dance, or martial arts. Maintaining a regular sleep schedule and limiting stimulants are important for keeping their sharp minds in peak condition.',
    famous: ['Leonardo da Vinci', 'Charles Dickens', 'Will Smith'],
  },

  Rooster: {
    animal: 'Rooster',
    emoji: '\uD83D\uDC13',
    title: 'The Elegant Rooster',
    overview:
      'The Rooster is the most observant and meticulous sign of the Chinese zodiac, known for their sharp eye, impeccable standards, and unwavering honesty. Those born under this sign carry themselves with a proud, distinctive style that reflects their inner confidence and attention to detail. Roosters are early risers in both the literal and figurative sense, always ahead of the curve and prepared for whatever comes.\n\nBeneath their polished exterior, Roosters possess a deeply principled and hardworking nature that drives everything they do. They believe in doing things right the first time and hold themselves and others to extraordinarily high standards. Their straightforward honesty and willingness to speak truth to power make them respected, if sometimes controversial, figures in their communities.',
    strengths: [
      'Exceptionally organized, honest, and detail-oriented — invaluable in any endeavor.',
      'Natural confidence and charisma command attention and respect.',
      'Strong work ethic means anything they produce is of the highest quality.',
    ],
    weaknesses: [
      'Perfectionism can make them overly critical and demanding of themselves and others.',
      'Blunt honesty may unintentionally hurt more sensitive souls.',
      'Need for attention can manifest as vanity; may struggle to accept criticism gracefully.',
    ],
    career: [
      'Thrive in precision-focused careers — accounting, surgery, military, quality control.',
      'Confidence and presentation skills make them outstanding performers and newsreaders.',
      'Can represent any organization with distinction in public relations.',
    ],
    wealth:
      'Roosters are careful and strategic financial managers who track every expense and plan meticulously for the future. They are among the most financially disciplined signs in the zodiac, rarely making impulsive purchases. Their attention to detail in financial matters typically results in a comfortable and secure financial position built through consistent, careful management.',
    love: [
      'Loyal, devoted, and protective — take relationship commitments very seriously.',
      'Express love through practical actions and creating a well-organized, comfortable life.',
      'Need partners who appreciate their honesty and gently help them relax their standards.',
    ],
    health:
      'Roosters tend to maintain good health through their disciplined lifestyle and attention to diet and exercise. However, their perfectionist tendencies can create internal stress and tension that may manifest as headaches or respiratory issues. Learning to relax and accept imperfection is an important health practice for Roosters, along with activities that promote mental calm.',
    famous: ['Beyonce', 'Serena Williams', 'Matthew McConaughey'],
  },

  Dog: {
    animal: 'Dog',
    emoji: '\uD83D\uDC15',
    title: 'The Loyal Dog',
    overview:
      'The Dog is the most loyal and righteous sign of the Chinese zodiac, embodying the virtues of faithfulness, honesty, and selfless devotion. Those born in the Year of the Dog possess an unwavering moral compass and a deep commitment to justice that guides every aspect of their lives. They are the true friends and steadfast companions that everyone hopes to find but few are fortunate enough to have.\n\nDogs approach the world with a combination of warmth and watchfulness, always ready to defend their loved ones and speak up against injustice. They are unpretentious, genuine people who value substance over style and deeds over words. Their reliability and integrity make them the cornerstone of their families and communities, the ones everyone turns to in times of need.',
    strengths: [
      'Extraordinary sense of loyalty and justice — among the most trustworthy in the zodiac.',
      'Honest, reliable, and selfless — always willing to put others\' needs first.',
      'Strong moral character and protective instincts make them champions of fairness.',
    ],
    weaknesses: [
      'Strong sense of right and wrong can make them judgmental and unforgiving.',
      'Prone to worry and anxiety — often imagining worst-case scenarios.',
      'Pessimistic tendencies and difficulty trusting new people can lead to isolation.',
    ],
    career: [
      'Excel in service and justice roles — law, policing, social work, nonprofit leadership.',
      'Loyalty and reliability make them valued team members in any organization.',
      'Strong ethical standards are essential in roles involving public trust and accountability.',
    ],
    wealth:
      'Dogs are not particularly motivated by money and tend to prioritize meaningful work over financial gain. They are honest and responsible with their finances, neither extravagant nor stingy. While they may not accumulate great wealth, their careful stewardship and avoidance of risky ventures typically ensure a stable and secure financial life.',
    love: [
      'Among the most faithful and devoted partners in the entire zodiac.',
      'Seek deep, meaningful relationships built on mutual trust and shared values.',
      'Once committed, steadfast and supportive through any hardship — asking only for honesty in return.',
    ],
    health:
      'Dogs are susceptible to anxiety and stress-related health issues, as their worrying nature can take a significant toll on their well-being. Regular physical activity, especially outdoor exercise with companions, is essential for both their physical and emotional health. Developing mindfulness practices and learning to manage their tendency to worry can dramatically improve their quality of life.',
    famous: ['Winston Churchill', 'Mother Teresa', 'Michael Jackson'],
  },

  Pig: {
    animal: 'Pig',
    emoji: '\uD83D\uDC16',
    title: 'The Generous Pig',
    overview:
      'The Pig, the final sign of the Chinese zodiac cycle, is a symbol of generosity, compassion, and abundance. Those born in the Year of the Pig are blessed with a big heart, a warm spirit, and an optimistic outlook that sees the best in every person and situation. They are the peacemakers and the philanthropists, driven by a genuine desire to make the world a happier, more comfortable place for everyone.\n\nPigs approach life with a refreshing sincerity and lack of pretense that is rare in the modern world. They are honest, trusting, and deeply caring, with a natural ability to make others feel welcome and valued. Their love of the good things in life, from fine food to beautiful surroundings, reflects their appreciation for the richness of human experience.',
    strengths: [
      'Exceptional generosity, compassion, and genuine warmth that makes everyone feel valued.',
      'Honest and straightforward with a refreshing lack of pretense that builds deep trust.',
      'Optimistic and big-hearted — natural peacemakers who heal rifts and bring people together.',
    ],
    weaknesses: [
      'Trusting nature can make them vulnerable to deception and manipulation.',
      'May be overly indulgent — in food, spending, or accommodating others at their own expense.',
      'Desire to avoid conflict can lead to tolerating situations that should be confronted.',
    ],
    career: [
      'Thrive in helping professions — medicine, veterinary care, teaching, hospitality, charity work.',
      'Appreciation for quality draws them to food & beverage, interior design, and entertainment.',
      'Create experiences that delight others and make a meaningful difference.',
    ],
    wealth:
      'Pigs tend to attract good fortune financially and can earn well through their hard work and likeable nature. However, their generous spirit and love of luxury can lead to overspending if not carefully managed. Establishing clear financial boundaries and learning to say no to others\' financial requests are important skills for Pigs to develop.',
    love: [
      'Warm, sensual, and deeply devoted — pour their hearts into creating a loving home.',
      'Romantic idealists who believe in true love and give everything for the right partner.',
      'Generous and forgiving long-term companions; need partners who won\'t exploit their kindness.',
    ],
    health:
      'Pigs tend to enjoy life\'s pleasures enthusiastically, which can sometimes lead to overindulgence in food and drink. Maintaining an active lifestyle and a balanced diet are particularly important for this sign. Regular health check-ups and moderation in all things will help Pigs maintain their naturally robust constitution and enjoy a long, healthy life.',
    famous: ['Henry Ford', 'Ernest Hemingway', 'Arnold Schwarzenegger'],
  },
};
