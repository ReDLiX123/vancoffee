export interface LocationThemeInfo {
  themeId: "kievskaya" | "silver" | "noviy" | "madyar";
  styleName: string;
  subTitle: string;
  paletteDescription: string;
  primaryColor: string;
  accentColor: string;
  accentColor2?: string;
  bgColor: string;
  textColor: string;
  isDarkTheme: boolean;
}

export interface LocationItem {
  id: "kievskaya" | "silver" | "noviy" | "madyar";
  name: string;
  shortName: string;
  mall?: string;
  address: string;
  landmark: string;
  coordinates: [number, number]; // [lat, lng]
  hours: {
    weekdays: string;
    weekends: string;
  };
  phone: string;
  phoneNote?: string;
  atmosphere: string;
  features: string[];
  image: string;
  sbtipsUrl: string;
  yandexMapUrl: string;
  gis2Url: string;
  hasKitchen: boolean;
  hasFullSeating: boolean;
  popularDrink: string;
  theme: LocationThemeInfo;
}

export interface MenuItem {
  id: string;
  category: "signature" | "classic" | "tea_matcha" | "kitchen" | "desserts" | "seasonal";
  name: {
    ru: string;
    en: string;
    zh: string;
  };
  description: {
    ru: string;
    en: string;
    zh: string;
  };
  tasteNotes?: string[];
  volume: string;
  price: number;
  image: string;
  badge?: {
    ru: string;
    en: string;
    zh: string;
  };
  availableLocations: ("silver" | "noviy" | "kievskaya" | "madyar")[];
  nutrition: {
    calories: number; // ккал
    protein: number;  // г
    fat: number;      // г
    carbs: number;    // г
    weightG: number;  // граммы или мл
  };
  tags: ("vegan" | "sugar_free" | "nut_free" | "specialty" | "chef_pick")[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  location: string;
  date: string;
  avatarBg: string;
  isDemo?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Сезонное меню" | "События" | "Обжарка" | "Спешелти";
  readTime: string;
  image: string;
  linkText: string;
}

export const LOCATIONS: LocationItem[] = [
  {
    id: "kievskaya",
    name: "Флагманское кафе на Киевской",
    shortName: "Киевская",
    address: "Иркутск, угол ул. Карла Маркса и Киевской (ул. Киевская, 1)",
    landmark: "Исторический центр, 2 минуты от сквера Кирова",
    coordinates: [52.2858, 104.2831],
    hours: {
      weekdays: "08:00 – 22:00",
      weekends: "09:00 – 23:00",
    },
    phone: "+7 (902) 510-44-13",
    phoneNote: "Контактный номер кофейни",
    atmosphere: "Открытая кирпичная кладка, оливковый бархат, латунные элементы, обилие дневного света, винил и книжные полки. Уютный арт-хаус в историческом центре.",
    features: ["Завтраки весь день", "Фильтр-бар", "Dog-friendly", "Wi-Fi & Розетки", "Виниловый уголок"],
    image: "/images/locations/kievskaya.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9882",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Киевская+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/firm/70000001034459238",
    hasKitchen: true,
    hasFullSeating: true,
    popularDrink: "Раф «Подсолнухи» с карамелью и цедрой",
    theme: {
      themeId: "kievskaya",
      styleName: "Loft & Terracotta Brick",
      subTitle: "Дневной свет, лофт, винил и оливковый бархат",
      paletteDescription: "Тёплый терракотово-бежевый, оливковый бархат, латунь и медь",
      primaryColor: "#A84B2C",
      accentColor: "#606C38",
      accentColor2: "#DDA15E",
      bgColor: "#FAF4ED",
      textColor: "#2B2118",
      isDarkTheme: false,
    },
  },
  {
    id: "silver",
    name: "Островок в ТРЦ «Сильвермолл»",
    shortName: "Сильвермолл",
    mall: "ТРЦ «Сильвермолл»",
    address: "Иркутск, ул. Сергеева, 3/5, 1 этаж",
    landmark: "1 этаж, прямо напротив магазина Befree",
    coordinates: [52.2595, 104.2372],
    hours: {
      weekdays: "10:00 – 22:00",
      weekends: "10:00 – 22:00",
    },
    phone: "+7 (902) 510-44-11",
    phoneNote: "Островок ТРЦ «Сильвермолл»",
    atmosphere: "Светлое натуральное дерево, белые кубы-столики, сочная зелень и чистый скандинавский свет. Пространство для быстрого и эстетичного to-go.",
    features: ["Быстрый сервис To-Go", "Сезонные авторские коллаборации", "Эко-стаканчики", "Свежие тарты и макаронс"],
    image: "/images/locations/silver.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9880",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Сильвермолл+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/search/Vincent%20Van%20Coffee%20Сильвер",
    hasKitchen: false,
    hasFullSeating: false,
    popularDrink: "Бамбл «Цветущий миндаль» на свежем фреше",
    theme: {
      themeId: "silver",
      styleName: "Scandi Light & Fresh Wood",
      subTitle: "Скандинавский минимализм, светлое дерево и шалфей",
      paletteDescription: "Кремовый березовый фон, шалфейно-зеленый, светлый дуб",
      primaryColor: "#3A5A40",
      accentColor: "#588157",
      accentColor2: "#D4A373",
      bgColor: "#F7F8F4",
      textColor: "#1A251D",
      isDarkTheme: false,
    },
  },
  {
    id: "noviy",
    name: "Островок в МТЦ «Новый»",
    shortName: "МТЦ «Новый»",
    mall: "МТЦ «Новый»",
    address: "Иркутск, ул. Советская, 58/1, 1 этаж",
    landmark: "1 этаж, прямо под эскалатором",
    coordinates: [52.2816, 104.3168],
    hours: {
      weekdays: "10:00 – 22:00",
      weekends: "10:00 – 22:00",
    },
    phone: "+7 (902) 510-44-12",
    phoneNote: "Островок МТЦ «Новый»",
    atmosphere: "Графитовый потолок, золотое свечение гирлянд, стекло и зелень под эскалатором. Вечерний урбан-уют посреди торгового ритма.",
    features: ["To-Go формат", "Спешелти фильтр дня", "Протеиновые десерты без сахара", "Безналичная оплата за 5 секунд"],
    image: "/images/locations/noviymtc.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9881",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Советская+58+Новый+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/search/Vincent%20Van%20Coffee%20Новый",
    hasKitchen: false,
    hasFullSeating: false,
    popularDrink: "Флэт Уайт на зерне Эфиопия Иргачеффе",
    theme: {
      themeId: "noviy",
      styleName: "Urban Night & Garland Glow",
      subTitle: "Графитовый урбан, тёплый золотой свет гирлянд",
      paletteDescription: "Графитовый темный холст, янтарное теплое свечение, легкий неон",
      primaryColor: "#F5BE50",
      accentColor: "#E67E22",
      accentColor2: "#F39C12",
      bgColor: "#121417",
      textColor: "#FAF8F5",
      isDarkTheme: true,
    },
  },
  {
    id: "madyar",
    name: "Арт-кафе на Красных Мадьяр",
    shortName: "Красных Мадьяр",
    address: "Иркутск, ул. Красных Мадьяр, 41",
    landmark: "Рядом с арт-ателье «Lasso Picasso»",
    coordinates: [52.2741, 104.3015],
    hours: {
      weekdays: "08:30 – 22:00",
      weekends: "08:30 – 22:00",
    },
    phone: "+7 (902) 510-44-14",
    phoneNote: "Кафе на Красных Мадьяр",
    atmosphere: "Глубокий синий бархат, бирюзовый и розовый акрил, абстрактный line-art на стенах. Самое смелое арт-пространство сети рядом с творческим ателье.",
    features: ["Арт-экспозиции", "Кухня и выпечка", "Летняя терраса", "Каппинги зерна", "Уютные столики у окна"],
    image: "/images/locations/krasnix_madyar.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9883",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Красных+Мадьяр+41+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/firm/70000001034459238",
    hasKitchen: true,
    hasFullSeating: true,
    popularDrink: "Латте «Звёздная ночь» с черникой и лавандой",
    theme: {
      themeId: "madyar",
      styleName: "Art Pop & Ink Velvet",
      subTitle: "Тёмно-синий бархат, бирюзовый и розовый полупрозрачный акрил",
      paletteDescription: "Чернильно-синий фон, неоновый циан, сочная фуксия",
      primaryColor: "#00E5FF",
      accentColor: "#FF4081",
      accentColor2: "#7C4DFF",
      bgColor: "#0A1128",
      textColor: "#FFFFFF",
      isDarkTheme: true,
    },
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SIGNATURE DRINKS ---
  {
    id: "sig-sunflowers",
    category: "signature",
    name: {
      ru: "Раф «Подсолнухи»",
      en: "Sunflowers Raf",
      zh: "向日葵特调热咖啡",
    },
    description: {
      ru: "Шелковистый сливочный раф с экстрактом мадагаскарской ванили, легким сиропом из обжаренных семян подсолнуха и пудрой из цедры сицилийского апельсина.",
      en: "Velvety cream raf infused with Madagascar vanilla, toasted sunflower syrup, and Sicilian orange zest powder.",
      zh: "丝滑奶油咖啡，融入马达加斯加香草、烤葵花籽糖浆及西西里橙皮碎。",
    },
    tasteNotes: ["Сливочная нуга", "Теплая цедра", "Обжаренные семечки", "Карамель"],
    volume: "350 мл",
    price: 360,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Бестселлер",
      en: "Bestseller",
      zh: "招牌热销",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 275,
      protein: 4.8,
      fat: 16.2,
      carbs: 27.5,
      weightG: 350,
    },
    tags: ["specialty", "chef_pick"],
  },
  {
    id: "sig-starry-night",
    category: "signature",
    name: {
      ru: "Латте «Звёздная ночь»",
      en: "Starry Night Latte",
      zh: "星空薰衣草蓝莓拿铁",
    },
    description: {
      ru: "Гармония двойного шота спешелти эспрессо, таёжной дикой черники, настоя горной лаванды и мерцающей пудры натуральной спирулины.",
      en: "Double shot of specialty espresso balanced with wild taiga blueberries, mountain lavender infusion, and blue spirulina shimmer.",
      zh: "双份精品浓缩咖啡，交融西伯利亚野生蓝莓、薰衣草萃取液与天然蓝螺旋藻微光。",
    },
    tasteNotes: ["Лесные ягоды", "Лаванда", "Горький шоколад", "Черничный конфитюр"],
    volume: "350 мл",
    price: 380,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Арт-хит",
      en: "Art Favorite",
      zh: "艺术特色",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 210,
      protein: 6.2,
      fat: 7.4,
      carbs: 29.8,
      weightG: 350,
    },
    tags: ["specialty", "chef_pick"],
  },
  {
    id: "sig-night-terrace",
    category: "signature",
    name: {
      ru: "Мокко «Ночная терраса»",
      en: "Night Terrace Mocha",
      zh: "夜间咖啡馆香料摩卡",
    },
    description: {
      ru: "Плотный шоколадный мокко на 72% колумбийском какао Fino de Aroma с нотами кардамона, мускатного ореха и хлопьями розовой гималайской соли.",
      en: "Rich chocolate mocha made with 72% Colombian Fino de Aroma cocoa, cardamom, nutmeg, and pink Himalayan sea salt flakes.",
      zh: "浓郁的72%哥伦比亚可可摩卡咖啡，点缀豆蔻、肉豆蔻与粉红岩盐。",
    },
    tasteNotes: ["Тёмный шоколад 72%", "Пряный кардамон", "Миндаль", "Морская соль"],
    volume: "300 мл",
    price: 370,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Зимнее тепло",
      en: "Winter Warmth",
      zh: "浓香热饮",
    },
    availableLocations: ["kievskaya", "madyar", "silver"],
    nutrition: {
      calories: 310,
      protein: 7.5,
      fat: 14.8,
      carbs: 36.2,
      weightG: 300,
    },
    tags: ["specialty"],
  },
  {
    id: "sig-almond-blossom",
    category: "signature",
    name: {
      ru: "Капучино «Цветущий миндаль»",
      en: "Almond Blossom Cappuccino",
      zh: "盛开的杏花风味卡布奇诺",
    },
    description: {
      ru: "Воздушный капучино на домашнем миндально-овсяном молоке с тонким флёром цветков апельсина (флёрдоранж) и жареными миндальными лепестками.",
      en: "Light and airy cappuccino crafted with house-made almond-oat milk, orange blossom essence, and toasted almond flakes.",
      zh: "自制杏仁燕麦奶卡布奇诺，配以橙花水幽香与烘烤杏仁脆片。",
    },
    tasteNotes: ["Марципан", "Флёрдоранж", "Нежная пена", "Спелое яблоко"],
    volume: "250 мл",
    price: 340,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 145,
      protein: 3.8,
      fat: 5.6,
      carbs: 19.4,
      weightG: 250,
    },
    tags: ["vegan", "specialty"],
  },

  // --- CLASSIC SPECIALTY COFFEE ---
  {
    id: "cls-filter",
    category: "classic",
    name: {
      ru: "Фильтр-кофе Single Origin",
      en: "Batch Brew Filter Coffee",
      zh: "单品手冲滴滤咖啡",
    },
    description: {
      ru: "Чистая чашка свежей обжарки. Зерно недели: Эфиопия Гуджи Натуральной обработки. Яркая сочная кислотность и цветочный букет.",
      en: "Clean cup of freshly roasted specialty coffee. Grain of the week: Ethiopia Guji Natural. Vibrant juicy acidity and floral bouquet.",
      zh: "每周精选产地单品手冲。本周豆单：埃塞俄比亚古吉日晒，果香明亮，花香优雅。",
    },
    tasteNotes: ["Жасмин", "Красный персик", "Бергамот", "Мёд"],
    volume: "250 мл",
    price: 240,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Выбор бариста",
      en: "Barista's Choice",
      zh: "咖啡师推荐",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 4,
      protein: 0.3,
      fat: 0.1,
      carbs: 0.6,
      weightG: 250,
    },
    tags: ["vegan", "sugar_free", "specialty"],
  },
  {
    id: "cls-flat-white",
    category: "classic",
    name: {
      ru: "Флэт Уайт (Flat White)",
      en: "Specialty Flat White",
      zh: "澳白咖啡",
    },
    description: {
      ru: "Двойной эспрессо на зерне Кения Киямбу с тонким слоем бархатистого молока правильной температуры (62°C). Плотный кофейный баланс.",
      en: "Double espresso on Kenya Kiambu beans with a silky microfoam milk heated to optimal 62°C. Intense and balanced.",
      zh: "双份肯尼亚基安布浓缩咖啡，融合62°C细腻微奶泡，浓郁甘醇。",
    },
    tasteNotes: ["Красная смородина", "Карамель", "Грецкий орех"],
    volume: "200 мл",
    price: 290,
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 130,
      protein: 6.4,
      fat: 7.2,
      carbs: 9.8,
      weightG: 200,
    },
    tags: ["specialty"],
  },
  {
    id: "cls-cappuccino",
    category: "classic",
    name: {
      ru: "Капучино Grande",
      en: "Classic Cappuccino Grande",
      zh: "经典大杯卡布奇诺",
    },
    description: {
      ru: "Классический кофейный баланс на авторском бленде 100% арабики (Бразилия Серрадо + Колумбия Уила). Нежная мелкодисперсная пена.",
      en: "Balanced classic on our proprietary 100% Arabica blend (Brazil Cerrado + Colombia Huila) with silky dense foam.",
      zh: "100%精品阿拉比卡拼配（巴西+哥伦比亚），奶沫绵密柔顺。",
    },
    tasteNotes: ["Молочный шоколад", "Фундук", "Тростниковый сахар"],
    volume: "300 мл",
    price: 280,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 165,
      protein: 7.8,
      fat: 8.4,
      carbs: 14.2,
      weightG: 300,
    },
    tags: ["specialty"],
  },
  {
    id: "cls-espresso",
    category: "classic",
    name: {
      ru: "Двойной Эспрессо Доппио",
      en: "Doppio Espresso",
      zh: "双份意式特浓浓缩",
    },
    description: {
      ru: "Концентрированное чистое тело спешелти обжарки (18.5г закладка, 38г выход за 27 секунд). Густая тигровая крема.",
      en: "Pure concentrated extraction (18.5g dose, 38g yield in 27s). Rich golden tiger crema.",
      zh: "高萃取纯正意式浓缩（18.5克粉量，萃取38克），浓郁金黄油脂。",
    },
    tasteNotes: ["Темный трюфель", "Сушеная вишня", "Какао"],
    volume: "40 мл",
    price: 180,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 3,
      protein: 0.2,
      fat: 0.1,
      carbs: 0.4,
      weightG: 40,
    },
    tags: ["vegan", "sugar_free", "specialty"],
  },

  // --- TEA & MATCHA ---
  {
    id: "tea-ceremonial-matcha",
    category: "tea_matcha",
    name: {
      ru: "Матча Латте Удзи (Ceremonial)",
      en: "Ceremonial Uji Matcha Latte",
      zh: "日本宇治特级抹茶拿铁",
    },
    description: {
      ru: "Оригинальная церемониальная матча первого весеннего сбора из региона Удзи (Киото), взбитая бамбуковым венчиком часен на кокосовом или миндальном молоке.",
      en: "First-flush ceremonial grade matcha from Uji (Kyoto), whisked with traditional chasen on your choice of milk.",
      zh: "京都宇治头采手摘特级抹茶，竹筅传统点茶，搭配植物奶。",
    },
    tasteNotes: ["Свежая зелень", "Умами", "Сладкие сливки", "Фисташка"],
    volume: "300 мл",
    price: 350,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Киото Премиум",
      en: "Kyoto Premium",
      zh: "京都直采",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 140,
      protein: 4.2,
      fat: 5.1,
      carbs: 18.2,
      weightG: 300,
    },
    tags: ["vegan", "specialty"],
  },
  {
    id: "tea-baikal-herbs",
    category: "tea_matcha",
    name: {
      ru: "Байкальский чай с саган-дайля и облепихой",
      en: "Baikal Sagan-Dailya & Sea Buckthorn Tea",
      zh: "贝加尔湖野生沙棘与香青兰茶",
    },
    description: {
      ru: "Тонизирующий сбор сибирских трав: дикорастущий саган-дайля с Саян, протертая таёжная облепиха, сибирский тимьян и ложка горного мёда.",
      en: "Invigorating Siberian herbal infusion: wild Sagan-Dailya, crushed taiga sea buckthorn, mountain thyme, and raw honey.",
      zh: "西伯利亚原生态草本茶：萨彦岭野生香青兰、贝加尔沙棘、野百里香与高山蜜。",
    },
    tasteNotes: ["Хвоя и можжевельник", "Сочная облепиха", "Травяная свежесть", "Мёд"],
    volume: "450 мл",
    price: 320,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Сибирь",
      en: "Siberian Soul",
      zh: "西伯利亚特产",
    },
    availableLocations: ["kievskaya", "madyar", "silver", "noviy"],
    nutrition: {
      calories: 68,
      protein: 0.6,
      fat: 1.2,
      carbs: 13.8,
      weightG: 450,
    },
    tags: ["vegan", "nut_free"],
  },

  // --- KITCHEN & BREAKFASTS (Cafes only) ---
  {
    id: "ktc-croissant-salmon",
    category: "kitchen",
    name: {
      ru: "Круассан с лососем гравлакс и авокадо",
      en: "Salmon Gravlax & Avocado Croissant",
      zh: "三文鱼牛油果法式可颂",
    },
    description: {
      ru: "Хрустящий сливочный круассан из ремесленной пекарни, слабосоленый мурманский лосось, крем-чиз со свежим укропом, слайсы авокадо и микс салатов.",
      en: "Artisan buttery croissant filled with cured salmon gravlax, dill cream cheese, ripe avocado slices, and baby greens.",
      zh: "手作酥脆牛角包，夹入低盐腌制三文鱼、莳萝奶油奶酪、新鲜牛油果与嫩叶沙拉。",
    },
    tasteNotes: ["Сливочное масло", "Нежный лосось", "Свежий огурец", "Крем-чиз"],
    volume: "230 г",
    price: 490,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Шеф-завтрак",
      en: "Chef Breakfast",
      zh: "主厨早午餐",
    },
    availableLocations: ["kievskaya", "madyar"],
    nutrition: {
      calories: 460,
      protein: 21.5,
      fat: 26.4,
      carbs: 34.0,
      weightG: 230,
    },
    tags: ["chef_pick"],
  },
  {
    id: "ktc-syraniki",
    category: "kitchen",
    name: {
      ru: "Творожные сырники с соленой карамелью и ягодами",
      en: "Cottage Cheese Syrniki with Salted Caramel",
      zh: "俄式传统凝乳煎饼配海盐焦糖",
    },
    description: {
      ru: "Нежные сырники из фермерского 9% творога с запеченной золотистой корочкой, домашняя тягучая соленая карамель, сметана и свежие ягоды брусники.",
      en: "Tender farmhouse cottage cheese pancakes with a golden crust, homemade salted caramel, sour cream, and fresh wild lingonberries.",
      zh: "传统农场凝乳现煎奶酪饼，搭配自制海盐焦糖酱、酸奶油与新鲜越橘。",
    },
    tasteNotes: ["Нежный творог", "Соленая карамель", "Лесные ягоды", "Ваниль"],
    volume: "210 г",
    price: 390,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Любимое гостями",
      en: "Guest Favorite",
      zh: "人气必点",
    },
    availableLocations: ["kievskaya", "madyar"],
    nutrition: {
      calories: 380,
      protein: 24.0,
      fat: 14.5,
      carbs: 38.0,
      weightG: 210,
    },
    tags: ["chef_pick"],
  },
  {
    id: "ktc-brioche-poached",
    category: "kitchen",
    name: {
      ru: "Бриошь с яйцом пашот, беконом и голландским соусом",
      en: "Brioche Benedict with Crispy Bacon & Hollandaise",
      zh: "法式黄油面包配水波蛋与脆培根",
    },
    description: {
      ru: "Пышный теплый тост из бриоши, обжаренный бекон, фермерское яйцо пашот с жидким желтком, теплый шелковый соус голландез и микрозелень.",
      en: "Warm toasted golden brioche, crispy artisanal bacon, farm poached egg, velvety house hollandaise, and microgreens.",
      zh: "烘烤金黄的法式布里欧修面包，配以香脆培根、流心水波蛋与经典荷兰汁。",
    },
    tasteNotes: ["Сливочная бриошь", "Жидкий желток", "Хрустящий бекон", "Лимонный соус"],
    volume: "240 г",
    price: 440,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["kievskaya", "madyar"],
    nutrition: {
      calories: 520,
      protein: 19.8,
      fat: 32.6,
      carbs: 36.4,
      weightG: 240,
    },
    tags: ["chef_pick"],
  },

  // --- DESSERTS & SWEETS ---
  {
    id: "des-tart-lemon-basil",
    category: "desserts",
    name: {
      ru: "Арт-тарт «Прованский лимон & Базилик»",
      en: "Provence Lemon & Basil Art Tart",
      zh: "普罗旺斯柠檬罗勒法式甜挞",
    },
    description: {
      ru: "Песочная основа на сливочном масле с миндальной мукой, освежающий лимонный крем курд, нежный мусс из свежего зеленого базилика и обпаленная меренга.",
      en: "Almond sable crust, vibrant lemon curd, fresh green basil mousse, and torched Italian meringue.",
      zh: "杏仁黄油酥塔皮，浓郁柠檬酪，罗勒慕斯与微炙意式蛋白霜。",
    },
    tasteNotes: ["Яркий лимон", "Пряный базилик", "Хрустящее тесто", "Сладкая меренга"],
    volume: "110 г",
    price: 290,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Ремесло",
      en: "Handmade",
      zh: "手作法甜",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 290,
      protein: 4.2,
      fat: 13.8,
      carbs: 37.5,
      weightG: 110,
    },
    tags: ["nut_free"],
  },
  {
    id: "des-eclair-pistachio",
    category: "desserts",
    name: {
      ru: "Эклер «Сицилийская фисташка & Малина»",
      en: "Sicilian Pistachio & Raspberry Eclair",
      zh: "西西里开心果覆盆子闪电泡芙",
    },
    description: {
      ru: "Заварное тесто с хрустящим кракелином, шелковистый крем на 100% пасте из сицилийской фисташки и сочный центр из дикой малины.",
      en: "Choux pastry with craquelin crust, 100% Sicilian pistachio paste diplomat cream, and tangy wild raspberry center.",
      zh: "经典法式修女泡芙酥皮，填满西西里纯开心果乳酪与野生覆盆子果酱夹心。",
    },
    tasteNotes: ["Жареная фисташка", "Ягодная кислинка", "Заварное тесто"],
    volume: "95 г",
    price: 280,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 270,
      protein: 5.6,
      fat: 15.2,
      carbs: 28.0,
      weightG: 95,
    },
    tags: [],
  },
  {
    id: "des-raw-avocado-truffle",
    category: "desserts",
    name: {
      ru: "RAW-трюфель «Авокадо, фундук & мята» (Vegan, Sugar-Free)",
      en: "RAW Avocado Hazelnut Truffle (Vegan/SF)",
      zh: "无糖生酮生巧松露（纯素/无添加糖）",
    },
    description: {
      ru: "Полезный десерт без рафинированного сахара и глютена. Мадагаскарское какао, мякоть спелого авокадо, дробленый фундук и финики Меджул.",
      en: "Guilt-free dessert with zero refined sugar or gluten. Raw cocoa, ripe avocado, crushed hazelnuts, and Medjool dates.",
      zh: "无添加糖无麸质纯素甜品。生可可粉、牛油果、榛果碎与椰枣天然甜味。",
    },
    tasteNotes: ["Тёмное какао", "Лесной орех", "Бархатистая текстура"],
    volume: "50 г",
    price: 160,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
    badge: {
      ru: "Sugar Free",
      en: "Sugar Free",
      zh: "无糖健康",
    },
    availableLocations: ["silver", "noviy", "kievskaya", "madyar"],
    nutrition: {
      calories: 145,
      protein: 3.1,
      fat: 9.8,
      carbs: 11.2,
      weightG: 50,
    },
    tags: ["vegan", "sugar_free"],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Гость кофейни на Киевской",
    role: "Постоянный гость (2ГИС)",
    rating: 5,
    text: "Кофейня на Киевской — моё любимое место в центре. Здесь потрясающий естественный свет, запах дерева и великолепный фильтр-кофе. Спасибо бариста за заботу каждое утро!",
    location: "Кафе на Киевской",
    date: "14 мая 2026",
    avatarBg: "from-amber-600 to-yellow-500",
    isDemo: true,
  },
  {
    id: "rev-2",
    author: "Ценитель спешелти кофе",
    role: "Отзыв с Яндекс.Карт",
    rating: 5,
    text: "Очень тонкий баланс сладости и цитруса в авторских рафах. На Красных Мадьяр классная арт-атмосфера и свежая выпечка.",
    location: "Кафе на Красных Мадьяр",
    date: "28 апреля 2026",
    avatarBg: "from-orange-600 to-amber-700",
    isDemo: true,
  },
  {
    id: "rev-3",
    author: "Elena (Tourist Guest)",
    role: "Отзыв из ТРЦ «Сильвермолл»",
    rating: 5,
    text: "Very warm and aesthetic coffee bar in Silver Mall! Exceptional matcha latte and delicious fresh tart. Friendly service.",
    location: "Островок в «Сильвере»",
    date: "10 мая 2026",
    avatarBg: "from-blue-600 to-indigo-800",
    isDemo: true,
  },
  {
    id: "rev-4",
    author: "Гость МТЦ «Новый»",
    role: "Отзыв из 2ГИС",
    rating: 5,
    text: "Часто забегаю в МТЦ «Новый» за двойным эспрессо. Готовят быстро, зерно всегда настроено идеально — плотное тело и никакой горечи.",
    location: "Островок в «Новом»",
    date: "2 мая 2026",
    avatarBg: "from-amber-700 to-stone-800",
    isDemo: true,
  },
  {
    id: "rev-5",
    author: "Арт-сообщество Иркутска",
    role: "Отзыв с Красных Мадьяр",
    rating: 5,
    text: "Атмосфера на Красных Мадьяр вдохновляет творить. Сидишь у окна с блокнотом, играет винил, на столе латте «Звёздная ночь»...",
    location: "Кафе на Красных Мадьяр",
    date: "19 апреля 2026",
    avatarBg: "from-indigo-600 to-purple-800",
    isDemo: true,
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Весенняя арт-коллекция напитков: «Пробуждение в Провансе»",
    summary: "Встречайте новые авторские напитки, вдохновленные весенними этюдами: лавандово-черничный флэт, цитрусовый бамбл с розмарином и холодный крем-матча.",
    date: "12 мая 2026",
    category: "Сезонное меню",
    readTime: "2 мин чтения",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    linkText: "Попробовать в кофейнях",
  },
  {
    id: "news-2",
    title: "Спешелти микролот свежего урожая: Эфиопия Гуджи",
    summary: "Партия свежего урожая спешелти кофе. Во вкусе: спелое манго, темный ром, маракуйя и жасмин. Доступен в фильтр-баре.",
    date: "25 апреля 2026",
    category: "Спешелти",
    readTime: "3 мин чтения",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    linkText: "Подробнее о зерне",
  },
  {
    id: "news-3",
    title: "Открытый каппинг и арт-вечер на Красных Мадьяр",
    summary: "Учимся различать дескрипторы спешелти кофе вместе с шеф-бариста и создаем кофейную графику акварелью. Вход свободный по регистрации.",
    date: "18 апреля 2026",
    category: "События",
    readTime: "1 мин чтения",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    linkText: "Записаться на встречу",
  },
];

export const LOYALTY_TIERS = [
  {
    id: "aquarelle",
    name: "Акварель",
    cashback: 5,
    spendThreshold: 0,
    tagline: "Первый шаг в мир арт-кофе",
    perks: [
      "5% кэшбэк бонусами с каждой покупки",
      "Приветственные 100 бонусов при регистрации",
      "Подарок и +500 бонусов в день рождения",
      "Электронная карта в Apple / Google Wallet",
    ],
    cardGradient: "from-[#2A211B] via-[#1C1613] to-[#120F0D]",
    badgeBorder: "border-amber-700/40 text-amber-300",
  },
  {
    id: "pastel",
    name: "Пастель",
    cashback: 7,
    spendThreshold: 5000,
    tagline: "Для ценителей ежедневных ритуалов",
    perks: [
      "7% кэшбэк на все напитки и десерты",
      "Бесплатная замена молока на растительное (кокос, миндаль, овсяное)",
      "Приоритетный предзаказ To-Go без очереди",
      "Приглашения на закрытые сезонные дегустации",
    ],
    cardGradient: "from-[#3D2C1E] via-[#2A1D13] to-[#1A120B]",
    badgeBorder: "border-amber-500/60 text-amber-200",
  },
  {
    id: "oil",
    name: "Масло / Gold",
    cashback: 10,
    spendThreshold: 15000,
    tagline: "Высший клуб ценителей искусства",
    perks: [
      "10% максимальный кэшбэк на весь чек",
      "Каждый 7-й утренний кофе в подарок",
      "Персональный доступ к редким спешелти микролотам зерна",
      "Бесплатный вход на каппинги и арт-мастерклассы",
      "Эксклюзивный фирменный мерч ко дню рождения",
    ],
    cardGradient: "from-[#593E1F] via-[#352514] to-[#1F150B]",
    badgeBorder: "border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.25)]",
  },
];
