export type ProgramCategory = 'all' | 'education' | 'relief' | 'community';
export type GalleryCategory = 'all' | 'education' | 'relief' | 'skills' | 'official';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface ProgramItem {
  id: string;
  numberLabel: string;
  title: string;
  category: Exclude<ProgramCategory, 'all'>;
  categoryLabel: string;
  shortDescription: string;
  details: string[];
  targetGroup: string;
  imageSrc: string;
  imageWebp?: string;
  imageAlt: string;
}

export interface VerifiedFactItem {
  id: string;
  valueLabel: string;
  title: string;
  description: string;
  verificationSource: string;
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  src: string;
  webpSrc?: string;
  fallbackSrc?: string;
  alt: string;
  dateNote: string;
}

export interface NewsArticleItem {
  id: string;
  title: string;
  dateLabel: string;
  categoryLabel: string;
  authorNote?: string;
  summary: string;
  fullText: string[];
  imageSrc: string;
  imageWebp?: string;
  imageAlt: string;
}

export interface SupportChannel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionType: 'copy-phone' | 'whatsapp' | 'visit-hq';
  actionLabel: string;
  contactValue?: string;
  verificationNote: string;
}

export interface InquiryFormInput {
  fullName: string;
  phone: string;
  email?: string;
  topic: 'donation' | 'dar-riyad' | 'volunteer' | 'general';
  selectedProgramTitle?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export const CHARITY_INFO = {
  name: 'جمعية ذات أثر للأعمال الخيرية',
  englishName: 'Dat Athar Charity Association',
  heroHeadline: 'نصنع الأثر... ونبني الإنسان بالعلم والقيم',
  slogan: 'نبني الإنسان بالعلم والقيم.. ونصنع الأثر بالعطاء',
  registrationText: 'مشهرة بقرار قيد رقم (8014) بتاريخ 19/3/2026',
  registrationNumber: '8014',
  registrationDate: '19/3/2026',
  address: 'مقر الجمعية: الأقواز - الصف - محافظة الجيزة',
  detailedAddress: 'قرية الأقواز - بجوار سنترال أبو شافعي - مركز الصف - محافظة الجيزة',
  shortLocation: 'الأقواز - الصف - محافظة الجيزة',
  chairperson: 'الحاجة فاطمة صابر',
  chairpersonRole: 'رئيس مجلس إدارة جمعية ذات أثر للأعمال الخيرية',
  darName: 'دار رياض الصالحين لتحفيظ القرآن الكريم وتأسيس الأطفال',
  officialPhone: '01111815006',
  whatsappNumberIntl: '201111815006',
  facebookUrl: 'https://m.facebook.com/dhat.athr.819935/',
  googleMapsUrl: 'https://maps.app.goo.gl/oec7XmbFGwUxNAgF6',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=J7CR%2B48C,+El-Saf,+Giza+Governorate&hl=ar&z=16&output=embed',
  logoSrc: '/assets/aistudio/image_7d0347f0.png',
  logoWebp: '/logo.webp',
  logoMarkSrc: '/logo-mark.png',
  logoMarkWebp: '/logo-mark.webp',
  shortTitle: 'جمعية ذات أثر',
  shortDescriptor: 'للأعمال الخيرية',
  heroImage: '/image_07ecb0.jpg',
  heroImageWebp: '/hero_representative.webp',
  heroImageFallback: '/assets/aistudio/image_233bc8ff.png',
  activitiesImage: '/image_07ec7a.jpg',
  activitiesImageWebp: '/newspaper_report.webp',
  activitiesImageFallback: '/assets/aistudio/image_c900575a.png',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'الرئيسية', href: '#top' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'programs', label: 'برامجنا', href: '#programs' },
  { id: 'activities', label: 'أنشطتنا', href: '#impact' },
  { id: 'gallery', label: 'معرض الصور', href: '#gallery' },
  { id: 'news', label: 'الأخبار', href: '#news' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'education-values',
    title: 'البناء بالعلم والقيم',
    description:
      'نؤمن بأن بناء الإنسان يبدأ من تنشئة الطفل على القيم الدينية والأخلاقية الأصيلة جنباً إلى جنب مع التأسيس العلمي المتقن.',
  },
  {
    id: 'human-dignity',
    title: 'حفظ الكرامة الإنسانية',
    description:
      'نقدم كافة مبادرات الدعم الغذائي والاجتماعي ومعارض الملابس الخيرية للأسر الأولى بالرعاية بكل مودة واحترام.',
  },
  {
    id: 'social-solidarity',
    title: 'التكافل والتراحم المجتمعي',
    description:
      'نسعى إلى ترسيخ روح التعاون والتكافل بين أبناء قرية الأقواز والقرى المجاورة لتخفيف الأعباء المعيشية عن الأسر المحتاجة.',
  },
  {
    id: 'transparency',
    title: 'الشفافية والعمل المؤسسي الموثق',
    description:
      'تعمل الجمعية تحت مظلة قانونية رسمية مشهرة بقرار قيد رقم (8014) بتاريخ 19/3/2026، وتوثق أنشطتها الميدانية بوضوح.',
  },
];

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'quran-arabic-dar',
    numberLabel: '01',
    title: 'دار رياض الصالحين لتحفيظ القرآن واللغة العربية',
    category: 'education',
    categoryLabel: 'القرآن الكريم والعلوم الشرعية',
    shortDescription:
      'من خلال دار رياض الصالحين، نقدم برامج متكاملة لتحفيظ القرآن الكريم وتعليم أحكام التجويد والعلوم الشرعية وتأسيس اللغة العربية.',
    details: [
      'تحفيظ القرآن الكريم ومراجعته بأسلوب تربوي محبب للنشء',
      'تعليم العلوم الشرعية المبسطة وغرس الآداب والقيم الإسلامية',
      'تعليم الصلاة والعبادات اليومية العملية في بيئة تربوية آمنة',
    ],
    targetGroup: 'الأطفال والنشء بقرية الأقواز والقرى المجاورة',
    imageSrc: '/assets/activities/dar_riyad.jpg',
    imageWebp: '/assets/activities/dar_riyad.webp',
    imageAlt: 'لوحة دار رياض الصالحين التابعة لجمعية ذات أثر للأعمال الخيرية بقرية الأقواز',
  },
  {
    id: 'early-childhood-education',
    numberLabel: '02',
    title: 'الأنشطة التعليمية والتربوية وتأسيس الأطفال',
    category: 'education',
    categoryLabel: 'التأسيس العلمي والتربوي',
    shortDescription:
      'برنامج تربوي وتعليمي متكامل يبدأ من سن ثلاث سنوات ونصف لإعداد جيل واعٍ يجمع بين التفوق العلمي والأخلاق الحميدة.',
    details: [
      'استقبال الأطفال بدايةً من سن 3 سنوات ونصف تحت إشراف معلمين مؤهلين',
      'تأسيس قوي في القراءة والكتابة باللغة العربية والحساب (الرياضيات)',
      'تأسيس اللغة الإنجليزية (ABC) بأساليب تربوية حديثة وتوفير وجبات صحية متوازنة',
    ],
    targetGroup: 'الأطفال من سن 3.5 سنوات',
    imageSrc: '/assets/activities/tajweed_course.jpg',
    imageWebp: '/assets/activities/tajweed_course.webp',
    imageAlt: 'جانب من الحصص التعليمية ودورة أحكام تجويد القرآن الكريم بمقر الجمعية',
  },
  {
    id: 'skills-calligraphy',
    numberLabel: '03',
    title: 'تنمية المهارات والدورات التدريبية المتخصصة',
    category: 'community',
    categoryLabel: 'تنمية المهارات والمجتمع',
    shortDescription:
      'تنظيم دورات متخصصة مثل دورة الخط العربي ودورة أحكام تجويد القرآن الكريم للارتقاء بمهارات أبناء المجتمع.',
    details: [
      'دورة الخط العربي لتحسين الكتابة وتنمية الذائقة الفنية للطلاب',
      'دورة أحكام تجويد القرآن الكريم لإتقان التلاوة الصحيحة',
      'أنشطة تثقيفية وتربوية تستهدف بناء شخصية متوازنة للنشء والشباب',
    ],
    targetGroup: 'طلاب المدارس وأبناء المجتمع المحلي',
    imageSrc: '/assets/activities/calligraphy.jpg',
    imageWebp: '/assets/activities/calligraphy.webp',
    imageAlt: 'صورة جماعية للمشاركين في دورة الخط العربي بجمعية ذات أثر للأعمال الخيرية',
  },
  {
    id: 'food-assistance',
    numberLabel: '04',
    title: 'المساعدات الغذائية وتوزيع الوجبات الساخنة',
    category: 'relief',
    categoryLabel: 'الإطعام والأمن الغذائي',
    shortDescription:
      'تجهيز وتوزيع الشنط الغذائية المتكاملة والوجبات الساخنة المطهية بشكل دوري لدعم الأسر الأولى بالرعاية.',
    details: [
      'تجهيز وتوزيع شنط المواد الغذائية الأساسية للأسر المستحقة',
      'إعداد وتوزيع الوجبات الساخنة الطازجة في المبادرات المجتمعية والمواسم',
      'توفير وجبات غذائية صحية ومتوازنة للأطفال الملتحقين بدار رياض الصالحين',
    ],
    targetGroup: 'الأسر الأولى بالرعاية والأطفال',
    imageSrc: '/assets/activities/hot_meals.jpg',
    imageWebp: '/assets/activities/hot_meals.webp',
    imageAlt: 'تجهيز وتوزيع الوجبات الساخنة ضمن مبادرات جمعية ذات أثر للأعمال الخيرية',
  },
  {
    id: 'family-support-bags',
    numberLabel: '05',
    title: 'دعم الأسر المحتاجة والتكافل الاجتماعي',
    category: 'relief',
    categoryLabel: 'رعاية الأسر المستحقة',
    shortDescription:
      'توزيع الشنط الغذائية، والوجبات الساخنة، وإقامة معارض الملابس الخيرية لتخفيف الأعباء المعيشية عن الأسر.',
    details: [
      'حملات ميدانية مستمرة للوصول إلى الأسر الأكثر احتياجاً بقرية الأقواز',
      'توفير الدعم الغذائي والعيني الموسمي لتعزيز التكافل والتراحم',
      'دراسة احتياجات الأسر وتلبيتها بما يحفظ كرامة المواطن',
    ],
    targetGroup: 'الأسر الأكثر احتياجاً بقرية الأقواز والصف',
    imageSrc: '/assets/activities/food_bags.jpg',
    imageWebp: '/assets/activities/food_bags.webp',
    imageAlt: 'شنط المواد الغذائية المجهزة للتوزيع بجمعية ذات أثر للأعمال الخيرية',
  },
  {
    id: 'charity-clothing-fairs',
    numberLabel: '06',
    title: 'معارض الملابس الخيرية للأسر الأولى بالرعاية',
    category: 'community',
    categoryLabel: 'المعارض والمبادرات الخيرية',
    shortDescription:
      'إقامة معارض الملابس الخيرية المنظمة لتوفير احتياجات الأسر والأطفال من الكساء اللائق وتخفيف الأعباء المالية.',
    details: [
      'تنظيم معارض ملابس خيرية دورية داخل مقر الجمعية بقرية الأقواز',
      'توفير ملابس متنوعة تناسب مختلف الأعمار للأسر الأولى بالرعاية',
      'استقبال التبرعات العينية من الملابس الجديدة والمميزة وتجهيزها للمستفيدين',
    ],
    targetGroup: 'الأسر المستحقة وأبناؤهم',
    imageSrc: '/assets/activities/clothing_fair.jpg',
    imageWebp: '/assets/activities/clothing_fair.webp',
    imageAlt: 'جانب من معرض الملابس الخيري الذي نظمته جمعية ذات أثر للأعمال الخيرية',
  },
];

export const VERIFIED_IMPACT_FACTS: VerifiedFactItem[] = [
  {
    id: 'official-reg',
    valueLabel: '8014',
    title: 'قرار القيد والإشهار الرسمي',
    description:
      'جمعية أهلية مشهرة رسمياً بقرار قيد رقم (8014) بتاريخ 19/3/2026 وتعمل وفق القوانين المنظمة للعمل الأهلي بمصر.',
    verificationSource: 'موثق باللوحة الرسمية للجمعية والتقرير الصحفي',
  },
  {
    id: 'early-age',
    valueLabel: '3.5 سنوات',
    title: 'بداية التأسيس التربوي بدار رياض الصالحين',
    description:
      'تستقبل الدار الأطفال من سن ثلاث سنوات ونصف لتحفيظ القرآن الكريم وتأسيس العربي والحساب والإنجليزي (ABC).',
    verificationSource: 'برنامج دار رياض الصالحين الموثق بقرية الأقواز',
  },
  {
    id: 'core-pillars',
    valueLabel: '6 مبادرات',
    title: 'محاور العمل الخيري والتربوي الفعلي',
    description:
      'تشمل: تحفيظ القرآن، التأسيس العلمي، دورة الخط العربي، دورة التجويد، توزيع الشنط الغذائية والوجبات الساخنة، ومعرض الملابس.',
    verificationSource: 'موثق بالصور الميدانية من أنشطة الجمعية',
  },
  {
    id: 'geographic-scope',
    valueLabel: 'الأقواز · الصف',
    title: 'النطاق الميداني لخدمات الجمعية',
    description:
      'تخدم الجمعية أهالي قرية الأقواز والمناطق المجاورة بمركز الصف في محافظة الجيزة من مقرها بجوار سنترال أبو شافعي.',
    verificationSource: 'المقر الرسمي للجمعية بمحافظة الجيزة',
  },
];

export const GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'photo-banner-rep',
    title: 'رئيس مجلس الإدارة أمام اللوحة الرسمية للجمعية',
    caption:
      'الحاجة فاطمة صابر، رئيس مجلس إدارة جمعية ذات أثر للأعمال الخيرية، أمام البانر الرسمي الموثق لقرار الإشهار رقم (8014) بتاريخ 19/3/2026.',
    category: 'official',
    categoryLabel: 'التوثيق الرسمي',
    src: CHARITY_INFO.heroImage,
    webpSrc: CHARITY_INFO.heroImageWebp,
    fallbackSrc: CHARITY_INFO.heroImageFallback,
    alt: 'الحاجة فاطمة صابر رئيس مجلس إدارة جمعية ذات أثر للأعمال الخيرية أمام اللوحة الرسمية للجمعية',
    dateNote: 'مارس 2026',
  },
  {
    id: 'photo-calligraphy',
    title: 'دورة الخط العربي لتنمية مهارات النشء',
    caption:
      'صورة جماعية لأبناء قرية الأقواز المشاركين في دورة الخط العربي التدريبية التي نظمتها الجمعية للارتقاء بمهارات الطلاب.',
    category: 'skills',
    categoryLabel: 'تنمية المهارات',
    src: '/assets/activities/calligraphy.jpg',
    webpSrc: '/assets/activities/calligraphy.webp',
    alt: 'الطلاب المشاركون في دورة الخط العربي بجمعية ذات أثر للأعمال الخيرية',
    dateNote: 'أنشطة تنمية المهارات',
  },
  {
    id: 'photo-clothing-fair',
    title: 'معرض الملابس الخيري للأسر الأولى بالرعاية',
    caption:
      'إقامة معرض الملابس الخيري بمقر الجمعية لتوفير الكساء اللائق وتخفيف الأعباء المعيشية عن الأسر المستحقة.',
    category: 'relief',
    categoryLabel: 'الإطعام والتكافل',
    src: '/assets/activities/clothing_fair.jpg',
    webpSrc: '/assets/activities/clothing_fair.webp',
    alt: 'معرض الملابس الخيري بجمعية ذات أثر للأعمال الخيرية',
    dateNote: 'مبادرات التكافل الاجتماعي',
  },
  {
    id: 'photo-tajweed',
    title: 'دورة أحكام تجويد القرآن الكريم والفصول التعليمية',
    caption:
      'جانب من الحصص التربوية ودورة أحكام تجويد القرآن الكريم داخل فصول الجمعية بقرية الأقواز بإشراف كوادر متخصصة.',
    category: 'education',
    categoryLabel: 'التعليم والقرآن',
    src: '/assets/activities/tajweed_course.jpg',
    webpSrc: '/assets/activities/tajweed_course.webp',
    alt: 'معلمة تشرح دورة أحكام تجويد القرآن الكريم للأطفال بجمعية ذات أثر',
    dateNote: 'دار رياض الصالحين',
  },
  {
    id: 'photo-hot-meals',
    title: 'حملة تجهيز وتوزيع الوجبات الساخنة',
    caption:
      'تجهيز وتعبئة الوجبات الغذائية الساخنة لتوزيعها على الأسر الأولى بالرعاية ضمن مبادرات الإطعام الخيري.',
    category: 'relief',
    categoryLabel: 'الإطعام والتكافل',
    src: '/assets/activities/hot_meals.jpg',
    webpSrc: '/assets/activities/hot_meals.webp',
    alt: 'الوجبات الساخنة المجهزة للتوزيع بجمعية ذات أثر للأعمال الخيرية',
    dateNote: 'مبادرات الإطعام',
  },
  {
    id: 'photo-food-bags',
    title: 'توزيع شنط المواد الغذائية للأسر المستحقة',
    caption:
      'اصطفاف شنط المواد الغذائية الأساسية المجهزة داخل مقر الجمعية تمهيداً لتوزيعها على الأسر الأكثر احتياجاً.',
    category: 'relief',
    categoryLabel: 'الإطعام والتكافل',
    src: '/assets/activities/food_bags.jpg',
    webpSrc: '/assets/activities/food_bags.webp',
    alt: 'شنط المواد الغذائية المجهزة للتوزيع أمام لوحة جمعية ذات أثر للأعمال الخيرية',
    dateNote: 'حملات الدعم الغذائي',
  },
];

export const NEWS_ARTICLES: NewsArticleItem[] = [
  {
    id: 'news-newspaper-feature',
    title: 'جمعية ذات أثر للأعمال الخيرية.. نموذج للعمل الخيري والتربوي المتكامل بقرية الأقواز',
    dateLabel: 'تغطية صحفية موثقة · 2026',
    categoryLabel: 'تقرير صحفي',
    authorNote: 'كتبت: فاطمة فتحي غوينم',
    summary:
      'تقرير صحفي موسع يستعرض جهود جمعية ذات أثر للأعمال الخيرية برئاسة الحاجة فاطمة صابر في خدمة المجتمع من خلال التعليم في دار رياض الصالحين ومبادرات الإطعام والكساء.',
    fullText: [
      'تواصل جمعية ذات أثر للأعمال الخيرية برئاسة الحاجة فاطمة صابر أداء رسالتها المجتمعية والإنسانية من خلال تنفيذ العديد من المبادرات والبرامج التعليمية والخيرية التي تستهدف تنمية الإنسان، ودعم الأسر الأولى بالرعاية، وترسيخ القيم الدينية والأخلاقية لدى النشء.',
      'وفي إطار جهودها المستمرة، أنشأت الجمعية دار «رياض الصالحين» بقرية الأقواز بجوار سنترال أبو شافعي، لتكون صرحاً تربوياً وتعليمياً يهدف إلى إعداد جيل واعٍ يجمع بين العلم والأخلاق، ويوفر بيئة تعليمية آمنة تساعد الأطفال على النمو السليم في مختلف الجوانب العلمية والتربوية.',
      'وأكدت الحاجة فاطمة صابر، رئيس مجلس إدارة جمعية ذات أثر للأعمال الخيرية، أن الجمعية تؤمن بأن بناء الإنسان يبدأ من بناء الطفل، وأن الاستثمار الحقيقي يكمن في تنشئة أجيال تتمسك بالقيم الدينية والأخلاقية إلى جانب التميز العلمي.',
    ],
    imageSrc: CHARITY_INFO.activitiesImage,
    imageWebp: CHARITY_INFO.activitiesImageWebp,
    imageAlt: 'التقرير الصحفي المنشور حول أنشطة جمعية ذات أثر للأعمال الخيرية',
  },
  {
    id: 'news-dar-riyad',
    title: 'دار رياض الصالحين تستقبل الأطفال من سن 3 سنوات ونصف ببرنامج تعليمي وتربوي شامل',
    dateLabel: 'العام الدراسي · 2026',
    categoryLabel: 'الأنشطة التعليمية',
    summary:
      'برنامج متكامل يشمل تحفيظ القرآن الكريم، العلوم الشرعية، وتأسيس اللغة العربية والرياضيات واللغة الإنجليزية (ABC) مع توفير وجبات صحية متوازنة للأطفال.',
    fullText: [
      'تقدم دار رياض الصالحين التابعة لجمعية ذات أثر للأعمال الخيرية برنامجاً متكاملاً يبدأ من سن ثلاث سنوات ونصف، ويشمل تحفيظ القرآن الكريم، والعلوم الشرعية، وتأسيس اللغة العربية، وتأسيس الرياضيات، وتأسيس اللغة الإنجليزية (ABC) داخل بيئة إسلامية تهتم بتعليم الصلاة والعبادات وغرس الآداب والقيم.',
      'كما تعتمد الدار على أساليب تربوية حديثة يشرف عليها متخصصون في التربية والتعليم، وتوفر وجبات غذائية صحية ومتوازنة للأطفال بما يحقق النمو السليم، ليكون المكان بمثابة البيت الثاني للطفل بقرية الأقواز بجوار سنترال أبو شافعي.',
    ],
    imageSrc: '/assets/activities/dar_riyad.jpg',
    imageWebp: '/assets/activities/dar_riyad.webp',
    imageAlt: 'إعلان وبرامج دار رياض الصالحين بقرية الأقواز',
  },
  {
    id: 'news-courses-relief',
    title: 'تنظيم دورتي الخط العربي وأحكام التجويد بالتزامن مع حملات الشنط الغذائية والوجبات الساخنة',
    dateLabel: 'مبادرات ميدانية · 2026',
    categoryLabel: 'تنمية المهارات والتكافل',
    summary:
      'الجمعية تجمع بين تنمية مهارات الأبناء عبر دورات الخط العربي والتجويد وبين تخفيف الأعباء عن الأسر من خلال توزيع الشنط الغذائية والوجبات الساخنة ومعرض الملابس.',
    fullText: [
      'نظمت جمعية ذات أثر للأعمال الخيرية عدداً من الدورات التدريبية المتخصصة لأبناء المجتمع، من بينها دورة أحكام تجويد القرآن الكريم ودورة الخط العربي بإشراف معلمين مؤهلين.',
      'وإلى جانب الدور التعليمي، نفذت الجمعية حملات موسعة لتوزيع شنط المواد الغذائية، وتوزيع الوجبات الساخنة، وإقامة معرض للملابس الخيرية لصالح الأسر الأولى بالرعاية بقرية الأقواز والمناطق المجاورة بمركز الصف.',
    ],
    imageSrc: '/assets/activities/calligraphy.jpg',
    imageWebp: '/assets/activities/calligraphy.webp',
    imageAlt: 'المشاركون في دورة الخط العربي بجمعية ذات أثر للأعمال الخيرية',
  },
];

export const VERIFIED_SUPPORT_CHANNELS: SupportChannel[] = [
  {
    id: 'whatsapp-direct',
    title: 'التنسيق المباشر عبر الهاتف أو واتساب الرسمي',
    subtitle: 'للتبرع المالي أو العيني وكفالة طلاب العلم',
    description:
      'تواصل مباشرةً مع إدارة الجمعية عبر الرقم الرسمي الموثق للاستفسار عن أوجه المساهمة المتاحة وتنسيق التبرع المباشر لدعم أنشطة الجمعية ودار رياض الصالحين.',
    actionType: 'whatsapp',
    actionLabel: 'تواصل عبر واتساب الرسمي',
    contactValue: CHARITY_INFO.officialPhone,
    verificationNote: 'الرقم الرسمي الموثق للجمعية ودار رياض الصالحين: 01111815006',
  },
  {
    id: 'visit-headquarters',
    title: 'المساهمة المباشرة بمقر الجمعية في الأقواز',
    subtitle: 'تبرعات نقدية وعينية بموجب إيصالات رسمية',
    description:
      'يسعدنا استقبال مساهماتكم النقدية أو العينية (سلع غذائية، ملابس للمعارض الخيرية، مستلزمات تعليمية) مباشرةً في مقر الجمعية بقرية الأقواز بجوار سنترال أبو شافعي.',
    actionType: 'visit-hq',
    actionLabel: 'الموقع على خرائط جوجل',
    contactValue: CHARITY_INFO.detailedAddress,
    verificationNote: 'مشهرة بقرار قيد رقم (8014) بتاريخ 19/3/2026',
  },
  {
    id: 'copy-official-phone',
    title: 'نسخ رقم التواصل الرسمي للجمعية',
    subtitle: 'للاتصال الهاتفي المباشر أو التنسيق الميداني',
    description:
      'يمكنك نسخ رقم الهاتف الرسمي للجمعية للتواصل الهاتفي المباشر مع القائمين على الجمعية أو المشاركة بالتطوع في تجهيز وتوزيع المساعدات.',
    actionType: 'copy-phone',
    actionLabel: 'نسخ الرقم الرسمي (01111815006)',
    contactValue: CHARITY_INFO.officialPhone,
    verificationNote: 'الأقواز - مركز الصف - محافظة الجيزة',
  },
];

export function filterPrograms(
  programs: ProgramItem[],
  category: ProgramCategory
): ProgramItem[] {
  if (category === 'all') {
    return programs;
  }
  return programs.filter((item) => item.category === category);
}

export function filterGalleryPhotos(
  photos: GalleryPhotoItem[],
  category: GalleryCategory
): GalleryPhotoItem[] {
  if (category === 'all') {
    return photos;
  }
  return photos.filter((photo) => photo.category === category);
}

export function buildWhatsAppUrl(
  phoneIntl: string,
  customMessage?: string
): string {
  const digitsOnly = phoneIntl.replace(/[^\d]/g, '');
  const message =
    customMessage && customMessage.trim().length > 0
      ? customMessage.trim()
      : 'السلام عليكم ورحمة الله وبركاته، أتواصل معكم من خلال الموقع الإلكتروني لجمعية ذات أثر للأعمال الخيرية للاستفسار والمساهمة.';
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

export function validateInquiryForm(input: InquiryFormInput): ValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName || trimmedName.length < 3) {
    errors.fullName = 'يرجى إدخال الاسم بالكامل (3 أحرف على الأقل).';
  }

  const cleanPhone = input.phone.replace(/\s+/g, '');
  if (!cleanPhone || !/^(\+?20|0)?1[0125]\d{8}$/.test(cleanPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً (مثال: 01012345678).';
  }

  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email = 'يرجى إدخال بريد إلكتروني صحيح أو ترك الحقل فارغاً.';
    }
  }

  const trimmedMsg = input.message.trim();
  if (!trimmedMsg || trimmedMsg.length < 8) {
    errors.message = 'يرجى كتابة تفاصيل الرسالة أو نوع المساهمة (8 أحرف على الأقل).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function shouldShowScrollToTop(
  scrollY: number,
  heroBottomOffset: number
): boolean {
  if (heroBottomOffset <= 0) {
    return false;
  }
  return scrollY > heroBottomOffset;
}

