import { WeddingDetails, WishMessage } from '../types';

// Calculate target date 26 days ahead from reference
const calculateTargetDate = (daysAhead: number = 26) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  date.setHours(20, 0, 0, 0); // 8:00 PM
  return date;
};

const targetWeddingDate = calculateTargetDate(26);

// Format Arabic date string
const getArabicDateString = (date: Date) => {
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return 'الخميس، 24 سبتمبر 2026';
  }
};

export const defaultWeddingDetails: WeddingDetails = {
  groomName: 'محمد',
  brideName: 'ولاء',
  title: 'حفل زفاف مبارك',
  quranicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  introMessage: 'بمشاعر تفيض حبًا وسعادة، نتشرف بدعوتكم لمشاركتنا فرحتنا الكبرى وتتويج قصة حبنا في ليلة العمر',
  daysRemaining: 26,
  targetDateIso: targetWeddingDate.toISOString(),
  displayDateArabic: getArabicDateString(targetWeddingDate),
  eventTime: 'الساعة 8:00 مساءً',
  venueName: 'قاعة رويال بالاس الفندقية',
  venueCity: 'القاهرة، جمهورية مصر العربية',
  venueAddress: 'الطريق الدائري، مجمع القاعات الكبرى، التجمع',
  googleMapsUrl: 'https://maps.google.com/?q=Royal+Palace+Wedding+Hall',
  youtubeVideoId: 'JXAP2nChOjM',
  whatsappContactNumber: '201000000000',
  dressCodeText: 'ملابس سهرة أنيقة وراقية (Formal & Elegant Evening Wear)',
  coupleImage: '/wedding_couple.jpg',
};

export const ceremonyTimeline = [
  {
    time: '08:00 م',
    title: 'استقبال الضيوف الكرام',
    description: 'الترحيب بالأهل والأصدقاء وتناول المشروبات الترحيبية الفاخرة',
    icon: 'Sparkles',
  },
  {
    time: '09:00 م',
    title: 'الزفة ودخول العروسين',
    description: 'لحظة دخول محمد وولاء وسط أجواء من البهجة والزغاريد والألعاب النارية الخفيفة',
    icon: 'Crown',
  },
  {
    time: '10:00 م',
    title: 'تقطيع كعكة الزفاف',
    description: 'فقرة التورتة والتقاط أجمل الصور التذكارية مع الحضور',
    icon: 'Cake',
  },
  {
    time: '11:00 م',
    title: 'بوفيه العشاء الفاخر والاحتفال',
    description: 'مأدبة العشاء ومواصلة فقرات الفرح والأغاني',
    icon: 'Utensils',
  },
];

export const initialWishes: WishMessage[] = [
  {
    id: '1',
    name: 'د. أحمد ومروة',
    relation: 'أصدقاء العائلة',
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة يا محمد ويا ولاء! ألف ألف مبروك لأجمل عروسين ❤️✨',
    likes: 24,
    timestamp: 'منذ ساعتين',
  },
  {
    id: '2',
    name: 'م. حسام خليل',
    relation: 'صديق العريس',
    message: 'ألف مبروك يا أجدع عريس! ربنا يتمم لكما على ألف خير ويسعد أيامكم ويرزقكم الذرية الصالحة 💍🌹',
    likes: 18,
    timestamp: 'منذ 4 ساعات',
  },
  {
    id: '3',
    name: 'سارة عبد الرحمن',
    relation: 'صديقة العروسة',
    message: 'لولولوليييي يا قمرنا ولاء! أحلى وأرق عروسة في الدنيا، ربنا يجعل كل أيامكم أفراح ومودة 👰❤️🎉',
    likes: 31,
    timestamp: 'منذ 6 ساعات',
  },
];
