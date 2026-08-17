export interface LocalizedString {
  ru: string;
  en: string;
  zh: string;
}

export interface LocationThemeInfo {
  themeId: "kievskaya" | "silver" | "noviy" | "madyar";
  styleName: string;
  styleNameI18n?: LocalizedString;
  subTitle: string;
  subTitleI18n?: LocalizedString;
  paletteDescription: string;
  paletteDescriptionI18n?: LocalizedString;
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
  nameI18n?: LocalizedString;
  shortName: string;
  shortNameI18n?: LocalizedString;
  mall?: string;
  mallI18n?: LocalizedString;
  address: string;
  addressI18n?: LocalizedString;
  landmark: string;
  landmarkI18n?: LocalizedString;
  coordinates: [number, number]; // [lat, lng]
  hours: {
    weekdays: string;
    weekends: string;
  };
  phone: string;
  phoneNote?: string;
  atmosphere: string;
  atmosphereI18n?: LocalizedString;
  features: string[];
  featuresI18n?: {
    ru: string[];
    en: string[];
    zh: string[];
  };
  image: string;
  sbtipsUrl: string;
  yandexMapUrl: string;
  gis2Url: string;
  hasKitchen: boolean;
  hasFullSeating: boolean;
  popularDrink: string;
  popularDrinkI18n?: LocalizedString;
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
  authorI18n?: LocalizedString;
  role: string;
  roleI18n?: LocalizedString;
  rating: number;
  text: string;
  textI18n?: LocalizedString;
  location: string;
  locationI18n?: LocalizedString;
  date: string;
  dateI18n?: LocalizedString;
  avatarBg: string;
  isDemo?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  titleI18n?: LocalizedString;
  summary: string;
  summaryI18n?: LocalizedString;
  date: string;
  dateI18n?: LocalizedString;
  category: "Сезонное меню" | "События" | "Обжарка" | "Спешелти" | string;
  readTime: string;
  readTimeI18n?: LocalizedString;
  image: string;
  linkText: string;
  linkTextI18n?: LocalizedString;
}

export const LOCATIONS: LocationItem[] = [
  {
    id: "kievskaya",
    name: "Флагманское кафе на Киевской",
    nameI18n: {
      ru: "Флагманское кафе на Киевской",
      en: "Flagship Café on Kievskaya",
      zh: "基辅街旗舰咖啡馆",
    },
    shortName: "Киевская",
    shortNameI18n: {
      ru: "Киевская",
      en: "Kievskaya",
      zh: "基辅街",
    },
    address: "Иркутск, угол ул. Карла Маркса и Киевской (ул. Киевская, 1)",
    addressI18n: {
      ru: "Иркутск, угол ул. Карла Маркса и Киевской (ул. Киевская, 1)",
      en: "Irkutsk, corner of Karl Marx & Kievskaya (1 Kievskaya St)",
      zh: "伊尔库茨克，卡尔马克思街与基辅街交叉口（基辅街 1 号）",
    },
    landmark: "Исторический центр, 2 минуты от сквера Кирова",
    landmarkI18n: {
      ru: "Исторический центр, 2 минуты от сквера Кирова",
      en: "Historic center, 2 mins from Kirov Square",
      zh: "历史文化核心区，距基洛夫广场 2 分钟",
    },
    coordinates: [52.2858, 104.2831],
    hours: {
      weekdays: "08:00 – 22:00",
      weekends: "09:00 – 23:00",
    },
    phone: "+7 (902) 510-44-13",
    phoneNote: "Контактный номер кофейни",
    atmosphere: "Открытая кирпичная кладка, оливковый бархат, латунные элементы, обилие дневного света, винил и книжные полки. Уютный арт-хаус в историческом центре.",
    atmosphereI18n: {
      ru: "Открытая кирпичная кладка, оливковый бархат, латунные элементы, обилие дневного света, винил и книжные полки. Уютный арт-хаус в историческом центре.",
      en: "Exposed brickwork, olive velvet, brass accents, abundance of daylight, vinyl records, and curated bookshelves. An artful sanctuary in the historic downtown.",
      zh: "裸露红砖墙、橄榄绿天鹅绒、黄铜质感与充沛自然光线，黑胶唱片与艺术书架，历史街区里的复古艺术沙龙。",
    },
    features: ["Завтраки весь день", "Фильтр-бар", "Dog-friendly", "Wi-Fi & Розетки", "Виниловый уголок"],
    featuresI18n: {
      ru: ["Завтраки весь день", "Фильтр-бар", "Dog-friendly", "Wi-Fi & Розетки", "Виниловый уголок"],
      en: ["All-Day Breakfast", "Filter Bar", "Dog-friendly", "Wi-Fi & Power Sockets", "Vinyl Music Lounge"],
      zh: ["全天候早午餐", "精品手冲手冲吧", "宠物友好 (Dog-friendly)", "高速 Wi-Fi 与充电插座", "复古黑胶音乐角"],
    },
    image: "/images/locations/kievskaya.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9882",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Киевская+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/firm/70000001034459238",
    hasKitchen: true,
    hasFullSeating: true,
    popularDrink: "Раф «Подсолнухи» с карамелью и цедрой",
    popularDrinkI18n: {
      ru: "Раф «Подсолнухи» с карамелью и цедрой",
      en: "“Sunflowers” Raf with caramel & orange zest",
      zh: "「向日葵」特调热咖啡（焦糖与橙皮香）",
    },
    theme: {
      themeId: "kievskaya",
      styleName: "Loft & Terracotta Brick",
      styleNameI18n: {
        ru: "Loft & Terracotta Brick",
        en: "Loft & Terracotta Brick",
        zh: "经典 Loft 砖红复古",
      },
      subTitle: "Дневной свет, лофт, винил и оливковый бархат",
      subTitleI18n: {
        ru: "Дневной свет, лофт, винил и оливковый бархат",
        en: "Natural daylight, loft brick, vinyl and olive velvet",
        zh: "充沛采光、Loft 砖石、黑胶唱片与橄榄绿天鹅绒",
      },
      paletteDescription: "Тёплый терракотово-бежевый, оливковый бархат, латунь и медь",
      paletteDescriptionI18n: {
        ru: "Тёплый терракотово-бежевый, оливковый бархат, латунь и медь",
        en: "Warm terracotta beige, olive velvet, brass and copper",
        zh: "暖调陶土砖红、橄榄天鹅绒、黄铜与复古铜金",
      },
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
    nameI18n: {
      ru: "Островок в ТРЦ «Сильвермолл»",
      en: "Coffee Bar at Silver Mall",
      zh: "Silver Mall 银座购物中心精致咖啡吧",
    },
    shortName: "Сильвермолл",
    shortNameI18n: {
      ru: "Сильвермолл",
      en: "Silver Mall",
      zh: "Silver Mall",
    },
    mall: "ТРЦ «Сильвермолл»",
    mallI18n: {
      ru: "ТРЦ «Сильвермолл»",
      en: "Silver Mall",
      zh: "Silver Mall 购物中心",
    },
    address: "Иркутск, ул. Сергеева, 3/5, 1 этаж",
    addressI18n: {
      ru: "Иркутск, ул. Сергеева, 3/5, 1 этаж",
      en: "Irkutsk, 3/5 Sergeeva St, 1st floor",
      zh: "伊尔库茨克，谢尔盖耶夫街 3/5 号 1 层",
    },
    landmark: "1 этаж, прямо напротив магазина Befree",
    landmarkI18n: {
      ru: "1 этаж, прямо напротив магазина Befree",
      en: "1st floor, right in front of Befree store",
      zh: "1 层，正对 Befree 专卖店",
    },
    coordinates: [52.2595, 104.2372],
    hours: {
      weekdays: "10:00 – 22:00",
      weekends: "10:00 – 22:00",
    },
    phone: "+7 (902) 510-44-11",
    phoneNote: "Островок ТРЦ «Сильвермолл»",
    atmosphere: "Светлое натуральное дерево, белые кубы-столики, сочная зелень и чистый скандинавский свет. Пространство для быстрого и эстетичного to-go.",
    atmosphereI18n: {
      ru: "Светлое натуральное дерево, белые кубы-столики, сочная зелень и чистый скандинавский свет. Пространство для быстрого и эстетичного to-go.",
      en: "Light natural oak, clean white minimalist cubes, fresh botanical greenery, and crisp Nordic light. Designed for swift and aesthetic coffee to-go.",
      zh: "北欧极简浅木、纯白立方咖啡吧台、鲜活绿植与纯净明亮光影。专为快捷且赏心悦目的 To-Go 打造。",
    },
    features: ["Быстрый сервис To-Go", "Сезонные авторские коллаборации", "Эко-стаканчики", "Свежие тарты и макаронс"],
    featuresI18n: {
      ru: ["Быстрый сервис To-Go", "Сезонные авторские коллаборации", "Эко-стаканчики", "Свежие тарты и макаронс"],
      en: ["Fast To-Go Service", "Seasonal Collaborations", "Eco-friendly Cups", "Fresh Tarts & Macarons"],
      zh: ["极速外带服务 (To-Go)", "季节性联名限定出品", "环保生物降解咖啡杯", "新鲜手作法式挞与马卡龙"],
    },
    image: "/images/locations/silver.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9880",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Сильвермолл+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/search/Vincent%20Van%20Coffee%20Сильвер",
    hasKitchen: false,
    hasFullSeating: false,
    popularDrink: "Бамбл «Цветущий миндаль» на свежем фреше",
    popularDrinkI18n: {
      ru: "Бамбл «Цветущий миндаль» на свежем фреше",
      en: "“Almond Blossom” Bumble with fresh orange juice",
      zh: "「杏仁花开」鲜榨橙汁咖啡特调 (Bumble)",
    },
    theme: {
      themeId: "silver",
      styleName: "Scandi Light & Fresh Wood",
      styleNameI18n: {
        ru: "Scandi Light & Fresh Wood",
        en: "Scandi Light & Fresh Wood",
        zh: "北欧极简原木生机",
      },
      subTitle: "Скандинавский минимализм, светлое дерево и шалфей",
      subTitleI18n: {
        ru: "Скандинавский минимализм, светлое дерево и шалфей",
        en: "Scandinavian minimalism, light wood and sage green",
        zh: "斯堪的纳维亚极简主义、浅色橡木与鼠尾草绿",
      },
      paletteDescription: "Кремовый березовый фон, шалфейно-зеленый, светлый дуб",
      paletteDescriptionI18n: {
        ru: "Кремовый березовый фон, шалфейно-зеленый, светлый дуб",
        en: "Creamy birch backdrop, sage green, light oak",
        zh: "奶油白桦背景、鼠尾草绿与温润浅橡木色",
      },
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
    nameI18n: {
      ru: "Островок в МТЦ «Новый»",
      en: "Coffee Bar at Noviy Mall",
      zh: "Noviy 潮流中心都市咖啡吧",
    },
    shortName: "МТЦ «Новый»",
    shortNameI18n: {
      ru: "МТЦ «Новый»",
      en: "Noviy Mall",
      zh: "Noviy 商场",
    },
    mall: "МТЦ «Новый»",
    mallI18n: {
      ru: "МТЦ «Новый»",
      en: "Noviy Mall",
      zh: "Noviy 购物中心",
    },
    address: "Иркутск, ул. Советская, 58/1, 1 этаж",
    addressI18n: {
      ru: "Иркутск, ул. Советская, 58/1, 1 этаж",
      en: "Irkutsk, 58/1 Sovetskaya St, 1st floor",
      zh: "伊尔库茨克，苏维埃街 58/1 号 1 层",
    },
    landmark: "1 этаж, прямо под эскалатором",
    landmarkI18n: {
      ru: "1 этаж, прямо под эскалатором",
      en: "1st floor, directly beneath the escalator",
      zh: "1 层，中央手扶梯正下方",
    },
    coordinates: [52.2816, 104.3168],
    hours: {
      weekdays: "10:00 – 22:00",
      weekends: "10:00 – 22:00",
    },
    phone: "+7 (902) 510-44-12",
    phoneNote: "Островок МТЦ «Новый»",
    atmosphere: "Графитовый потолок, золотое свечение гирлянд, стекло и зелень под эскалатором. Вечерний урбан-уют посреди торгового ритма.",
    atmosphereI18n: {
      ru: "Графитовый потолок, золотое свечение гирлянд, стекло и зелень под эскалатором. Вечерний урбан-уют посреди торгового ритма.",
      en: "Graphite ceiling, warm golden garland glow, sleek glass and emerald flora under the escalator. Urban evening coziness amidst the shopping rhythm.",
      zh: "高级石墨黑顶、温润暖金流光、通透玻璃与扶梯绿意。在繁华商场节奏中沉浸于都市静谧之美。",
    },
    features: ["To-Go формат", "Спешелти фильтр дня", "Протеиновые десерты без сахара", "Безналичная оплата за 5 секунд"],
    featuresI18n: {
      ru: ["To-Go формат", "Спешелти фильтр дня", "Протеиновые десерты без сахара", "Безналичная оплата за 5 секунд"],
      en: ["Express To-Go Bar", "Specialty Batch Brew of the Day", "Sugar-Free Protein Desserts", "Instant Contactless Pay"],
      zh: ["高效外带吧台", "每日单品精选手冲", "无糖高蛋白健康甜点", "极速闪付无需等待"],
    },
    image: "/images/locations/noviymtc.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9881",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Советская+58+Новый+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/search/Vincent%20Van%20Coffee%20Новый",
    hasKitchen: false,
    hasFullSeating: false,
    popularDrink: "Флэт Уайт на зерне Эфиопия Иргачеффе",
    popularDrinkI18n: {
      ru: "Флэт Уайт на зерне Эфиопия Иргачеффе",
      en: "Flat White with Ethiopia Yirgacheffe beans",
      zh: "埃塞俄比亚耶加雪菲 精品澳白 (Flat White)",
    },
    theme: {
      themeId: "noviy",
      styleName: "Urban Night & Garland Glow",
      styleNameI18n: {
        ru: "Urban Night & Garland Glow",
        en: "Urban Night & Garland Glow",
        zh: "都市夜幕暖金流光",
      },
      subTitle: "Графитовый урбан, тёплый золотой свет гирлянд",
      subTitleI18n: {
        ru: "Графитовый урбан, тёплый золотой свет гирлянд",
        en: "Graphite urban aesthetic, warm golden garland light",
        zh: "石墨灰都市质感、温暖金色串灯微光",
      },
      paletteDescription: "Графитовый темный холст, янтарное теплое свечение, легкий неон",
      paletteDescriptionI18n: {
        ru: "Графитовый темный холст, янтарное теплое свечение, легкий неон",
        en: "Graphite dark canvas, warm amber glow, subtle neon",
        zh: "石墨黑深色画布、暖调琥珀流光与精致霓虹",
      },
      primaryColor: "#C87010",
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
    nameI18n: {
      ru: "Арт-кафе на Красных Мадьяр",
      en: "Art Café on Krasnykh Madyar",
      zh: "红马扎尔艺术主题咖啡馆",
    },
    shortName: "Красных Мадьяр",
    shortNameI18n: {
      ru: "Красных Мадьяр",
      en: "Krasnykh Madyar",
      zh: "红马扎尔街",
    },
    address: "Иркутск, ул. Красных Мадьяр, 41",
    addressI18n: {
      ru: "Иркутск, ул. Красных Мадьяр, 41",
      en: "Irkutsk, 41 Krasnykh Madyar St",
      zh: "伊尔库茨克，红马扎尔街 41 号",
    },
    landmark: "Рядом с арт-ателье «Lasso Picasso»",
    landmarkI18n: {
      ru: "Рядом с арт-ателье «Lasso Picasso»",
      en: "Next to “Lasso Picasso” art studio",
      zh: "毗邻 Lasso Picasso 艺术工作室",
    },
    coordinates: [52.2741, 104.3015],
    hours: {
      weekdays: "08:30 – 22:00",
      weekends: "08:30 – 22:00",
    },
    phone: "+7 (902) 510-44-14",
    phoneNote: "Кафе на Красных Мадьяр",
    atmosphere: "Глубокий синий бархат, бирюзовый и розовый акрил, абстрактный line-art на стенах. Самое смелое арт-пространство сети рядом с творческим ателье.",
    atmosphereI18n: {
      ru: "Глубокий синий бархат, бирюзовый и розовый акрил, абстрактный line-art на стенах. Самое смелое арт-пространство сети рядом с творческим ателье.",
      en: "Deep midnight blue velvet, turquoise and magenta acrylics, abstract line art on the walls. The boldest avant-garde art space in the chain, neighboring a local studio.",
      zh: "深邃午夜蓝天鹅绒、青碧与洋红亚克力光影、墙面抽象线条艺术。紧邻艺术画室，最具先锋气息的艺术咖啡空间。",
    },
    features: ["Арт-экспозиции", "Кухня и выпечка", "Летняя терраса", "Каппинги зерна", "Уютные столики у окна"],
    featuresI18n: {
      ru: ["Арт-экспозиции", "Кухня и выпечка", "Летняя терраса", "Каппинги зерна", "Уютные столики у окна"],
      en: ["Art Gallery Exhibitions", "Kitchen & Pastries", "Summer Terrace", "Coffee Cupping Sessions", "Window Seating"],
      zh: ["定期当代艺术展", "全餐厨房与手作烘焙", "夏季阳光露台", "精品咖啡杯测品鉴会", "绝美沿窗观景座"],
    },
    image: "/images/locations/krasnix_madyar.webp",
    sbtipsUrl: "https://pay.sbtips.ru/9883",
    yandexMapUrl: "https://yandex.ru/maps/?text=Иркутск+Красных+Мадьяр+41+Vincent+Van+Coffee",
    gis2Url: "https://2gis.ru/irkutsk/firm/70000001034459238",
    hasKitchen: true,
    hasFullSeating: true,
    popularDrink: "Латте «Звёздная ночь» с черникой и лавандой",
    popularDrinkI18n: {
      ru: "Латте «Звёздная ночь» с черникой и лавандой",
      en: "“Starry Night” Latte with blueberry & lavender",
      zh: "「星夜」特调拿铁（高山薰衣草与野生蓝莓）",
    },
    theme: {
      themeId: "madyar",
      styleName: "Art Pop & Ink Velvet",
      styleNameI18n: {
        ru: "Art Pop & Ink Velvet",
        en: "Art Pop & Ink Velvet",
        zh: "波普艺术与墨蓝天鹅绒",
      },
      subTitle: "Тёмно-синий бархат, бирюзовый и розовый полупрозрачный акрил",
      subTitleI18n: {
        ru: "Тёмно-синий бархат, бирюзовый и розовый полупрозрачный акрил",
        en: "Midnight blue velvet, turquoise and magenta translucent acrylic",
        zh: "深蓝天鹅绒、青碧与洋红半透亚克力",
      },
      paletteDescription: "Чернильно-синий фон, неоновый циан, сочная фуксия",
      paletteDescriptionI18n: {
        ru: "Чернильно-синий фон, неоновый циан, сочная фуксия",
        en: "Ink-blue canvas, luminous cyan, vivid fuchsia",
        zh: "墨蓝色艺术画布、明亮青碧与馥郁品红",
      },
      primaryColor: "#0284C7",
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
    image: "/images/menu/sunflower-raf.webp",
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
    image: "/images/menu/starry-night.webp",
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
    image: "/images/menu/night-terrace.webp",
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
    image: "/images/menu/almond-blossom.webp",
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
    image: "/images/menu/filter.webp",
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
    image: "/images/menu/flat-white.webp",
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
    image: "/images/menu/cappuccino.webp",
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
    image: "/images/menu/espresso.webp",
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
    image: "/images/menu/matcha.webp",
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
    image: "/images/menu/baikal-tea.webp",
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
    image: "/images/menu/croissant-salmon.webp",
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
    image: "/images/menu/syrniki.webp",
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
    image: "/images/menu/brioche-benedict.webp",
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
    image: "/images/menu/tart-lemon.webp",
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
    image: "/images/menu/eclair.webp",
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
    image: "/images/menu/truffle.webp",
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
    authorI18n: {
      ru: "Гость кофейни на Киевской",
      en: "Regular Guest at Kievskaya",
      zh: "基辅街店常客",
    },
    role: "Постоянный гость (2ГИС)",
    roleI18n: {
      ru: "Постоянный гость (2ГИС)",
      en: "Verified 2GIS Review",
      zh: "2GIS 认证常客评价",
    },
    rating: 5,
    text: "Кофейня на Киевской — моё любимое место в центре. Здесь потрясающий естественный свет, запах дерева и великолепный фильтр-кофе. Спасибо бариста за заботу каждое утро!",
    textI18n: {
      ru: "Кофейня на Киевской — моё любимое место в центре. Здесь потрясающий естественный свет, запах дерева и великолепный фильтр-кофе. Спасибо бариста за заботу каждое утро!",
      en: "The café on Kievskaya is my favorite place downtown. Stunning daylight, warm scent of natural wood, and magnificent filter coffee. Thanks to the baristas for morning care!",
      zh: "基辅街店是我在市中心最爱的地方。绝美采光、原木清香与上乘手冲咖啡，感谢咖啡师每天清晨的用心照料！",
    },
    location: "Кафе на Киевской",
    locationI18n: {
      ru: "Кафе на Киевской",
      en: "Café on Kievskaya",
      zh: "基辅街店",
    },
    date: "14 мая 2026",
    dateI18n: {
      ru: "14 мая 2026",
      en: "May 14, 2026",
      zh: "2026年5月14日",
    },
    avatarBg: "from-amber-600 to-yellow-500",
    isDemo: true,
  },
  {
    id: "rev-2",
    author: "Ценитель спешелти кофе",
    authorI18n: {
      ru: "Ценитель спешелти кофе",
      en: "Specialty Coffee Aficionado",
      zh: "精品咖啡爱好者",
    },
    role: "Отзыв с Яндекс.Карт",
    roleI18n: {
      ru: "Отзыв с Яндекс.Карт",
      en: "Yandex Maps Review",
      zh: "Yandex 地图评价",
    },
    rating: 5,
    text: "Очень тонкий баланс сладости и цитруса в авторских рафах. На Красных Мадьяр классная арт-атмосфера и свежая выпечка.",
    textI18n: {
      ru: "Очень тонкий баланс сладости и цитруса в авторских рафах. На Красных Мадьяр классная арт-атмосфера и свежая выпечка.",
      en: "Exquisite balance of sweetness and citrus in signature rafs. Krasnykh Madyar has an inspiring art vibe and wonderful pastries.",
      zh: "独家特调热咖啡里的甜香与柑橘风味平衡极佳。红马扎尔店的艺术氛围与新鲜烘焙非常惊艳。",
    },
    location: "Кафе на Красных Мадьяр",
    locationI18n: {
      ru: "Кафе на Красных Мадьяр",
      en: "Café on Krasnykh Madyar",
      zh: "红马扎尔店",
    },
    date: "28 апреля 2026",
    dateI18n: {
      ru: "28 апреля 2026",
      en: "April 28, 2026",
      zh: "2026年4月28日",
    },
    avatarBg: "from-orange-600 to-amber-700",
    isDemo: true,
  },
  {
    id: "rev-3",
    author: "Elena (Tourist Guest)",
    authorI18n: {
      ru: "Elena (Турист)",
      en: "Elena (Tourist Guest)",
      zh: "Elena（旅行游客）",
    },
    role: "Отзыв из ТРЦ «Сильвермолл»",
    roleI18n: {
      ru: "Отзыв из ТРЦ «Сильвермолл»",
      en: "Silver Mall Guest Review",
      zh: "Silver Mall 门店评价",
    },
    rating: 5,
    text: "Very warm and aesthetic coffee bar in Silver Mall! Exceptional matcha latte and delicious fresh tart. Friendly service.",
    textI18n: {
      ru: "Очень тёплый и эстетичный кофе-бар в Сильвермолле! Исключительный матча латте и свежайший тарт. Очень дружелюбный сервис.",
      en: "Very warm and aesthetic coffee bar in Silver Mall! Exceptional matcha latte and delicious fresh tart. Friendly service.",
      zh: "Silver Mall 里非常温馨有艺术感的咖啡吧！抹茶拿铁口感细腻，法式挞十分新鲜，服务也很亲切。",
    },
    location: "Островок в «Сильвере»",
    locationI18n: {
      ru: "Островок в «Сильвере»",
      en: "Silver Mall Bar",
      zh: "Silver Mall 店",
    },
    date: "10 мая 2026",
    dateI18n: {
      ru: "10 мая 2026",
      en: "May 10, 2026",
      zh: "2026年5月10日",
    },
    avatarBg: "from-blue-600 to-indigo-800",
    isDemo: true,
  },
  {
    id: "rev-4",
    author: "Гость МТЦ «Новый»",
    authorI18n: {
      ru: "Гость МТЦ «Новый»",
      en: "Guest at Noviy Mall",
      zh: "Noviy 商场常客",
    },
    role: "Отзыв из 2ГИС",
    roleI18n: {
      ru: "Отзыв из 2ГИС",
      en: "2GIS Review",
      zh: "2GIS 评价",
    },
    rating: 5,
    text: "Часто забегаю в МТЦ «Новый» за двойным эспрессо. Готовят быстро, зерно всегда настроено идеально — плотное тело и никакой горечи.",
    textI18n: {
      ru: "Часто забегаю в МТЦ «Новый» за двойным эспрессо. Готовят быстро, зерно всегда настроено идеально — плотное тело и никакой горечи.",
      en: "I frequently stop by Noviy Mall for a double espresso. Fast service and dial-in extraction is consistently on point — rich body and zero bitterness.",
      zh: "经常在 Noviy 商场点双份意式浓缩。出杯迅速，萃取调校稳定，口感醇厚且无杂苦味。",
    },
    location: "Островок в «Новом»",
    locationI18n: {
      ru: "Островок в «Новом»",
      en: "Noviy Mall Bar",
      zh: "Noviy 商场店",
    },
    date: "2 мая 2026",
    dateI18n: {
      ru: "2 мая 2026",
      en: "May 2, 2026",
      zh: "2026年5月2日",
    },
    avatarBg: "from-amber-700 to-stone-800",
    isDemo: true,
  },
  {
    id: "rev-5",
    author: "Арт-сообщество Иркутска",
    authorI18n: {
      ru: "Арт-сообщество Иркутска",
      en: "Irkutsk Art Community",
      zh: "伊尔库茨克艺术社群",
    },
    role: "Отзыв с Красных Мадьяр",
    roleI18n: {
      ru: "Отзыв с Красных Мадьяр",
      en: "Krasnykh Madyar Review",
      zh: "红马扎尔店评价",
    },
    rating: 5,
    text: "Атмосфера на Красных Мадьяр вдохновляет творить. Сидишь у окна с блокнотом, играет винил, на столе латте «Звёздная ночь»...",
    textI18n: {
      ru: "Атмосфера на Красных Мадьяр вдохновляет творить. Сидишь у окна с блокнотом, играет винил, на столе латте «Звёздная ночь»...",
      en: "The ambience at Krasnykh Madyar inspires creativity. Sketching by the panoramic window, listening to vinyl, sipping “Starry Night” latte...",
      zh: "红马扎尔店的氛围让人灵感涌现。坐在沿窗位带着速写本，听着黑胶唱片，品尝「星夜」特调拿铁...",
    },
    location: "Кафе на Красных Мадьяр",
    locationI18n: {
      ru: "Кафе на Красных Мадьяр",
      en: "Café on Krasnykh Madyar",
      zh: "红马扎尔店",
    },
    date: "19 апреля 2026",
    dateI18n: {
      ru: "19 апреля 2026",
      en: "April 19, 2026",
      zh: "2026年4月19日",
    },
    avatarBg: "from-indigo-600 to-purple-800",
    isDemo: true,
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Весенняя арт-коллекция напитков: «Пробуждение в Провансе»",
    titleI18n: {
      ru: "Весенняя арт-коллекция напитков: «Пробуждение в Провансе»",
      en: "Spring Art Drink Collection: “Awakening in Provence”",
      zh: "春季艺术饮品系列：「普罗旺斯的苏醒」",
    },
    summary: "Встречайте новые авторские напитки, вдохновленные весенними этюдами: лавандово-черничный флэт, цитрусовый бамбл с розмарином и холодный крем-матча.",
    summaryI18n: {
      ru: "Встречайте новые авторские напитки, вдохновленные весенними этюдами: лавандово-черничный флэт, цитрусовый бамбл с розмарином и холодный крем-матча.",
      en: "Discover our seasonal specialty creations: Lavender-Blueberry Flat White, Rosemary Citrus Bumble, and Iced Coconut Cream Matcha.",
      zh: "探索春日艺术特调：薰衣草蓝莓澳白、迷迭香柑橘特调咖啡与生椰冰抹茶。",
    },
    date: "12 мая 2026",
    dateI18n: {
      ru: "12 мая 2026",
      en: "May 12, 2026",
      zh: "2026年5月12日",
    },
    category: "Сезонное меню",
    readTime: "2 мин чтения",
    readTimeI18n: {
      ru: "2 мин чтения",
      en: "2 min read",
      zh: "2 分钟阅读",
    },
    image: "/images/menu/news-spring.webp",
    linkText: "Попробовать в кофейнях",
    linkTextI18n: {
      ru: "Попробовать в кофейнях",
      en: "Try at our cafés",
      zh: "前往门店品鉴",
    },
  },
  {
    id: "news-2",
    title: "Спешелти микролот свежего урожая: Эфиопия Гуджи",
    titleI18n: {
      ru: "Спешелти микролот свежего урожая: Эфиопия Гуджи",
      en: "Fresh Specialty Microlot: Ethiopia Guji Natural",
      zh: "最新产季精品微批次生豆：埃塞俄比亚 古吉日晒",
    },
    summary: "Партия свежего урожая спешелти кофе. Во вкусе: спелое манго, темный ром, маракуйя и жасмин. Доступен в фильтр-баре.",
    summaryI18n: {
      ru: "Партия свежего урожая спешелти кофе. Во вкусе: спелое манго, темный ром, маракуйя и жасмин. Доступен в фильтр-баре.",
      en: "Direct single-origin harvest with vibrant notes of ripe mango, aged rum, passion fruit, and delicate jasmine. Brewed on the filter bar.",
      zh: "新鲜产季直采微批次，风味展现成熟芒果、陈酿朗姆、百香果与茉莉花香。全门店手冲吧台供应。",
    },
    date: "25 апреля 2026",
    dateI18n: {
      ru: "25 апреля 2026",
      en: "April 25, 2026",
      zh: "2026年4月25日",
    },
    category: "Спешелти",
    readTime: "3 мин чтения",
    readTimeI18n: {
      ru: "3 мин чтения",
      en: "3 min read",
      zh: "3 分钟阅读",
    },
    image: "/images/menu/news-beans.webp",
    linkText: "Подробнее о зерне",
    linkTextI18n: {
      ru: "Подробнее о зерне",
      en: "More about origin beans",
      zh: "了解咖啡豆详情",
    },
  },
  {
    id: "news-3",
    title: "Открытый каппинг и арт-вечер на Красных Мадьяр",
    titleI18n: {
      ru: "Открытый каппинг и арт-вечер на Красных Мадьяр",
      en: "Open Cupping Session & Art Evening on Krasnykh Madyar",
      zh: "红马扎尔店公开杯测品鉴会与水彩艺术之夜",
    },
    summary: "Учимся различать дескрипторы спешелти кофе вместе с шеф-бариста и создаем кофейную графику акварелью. Вход свободный по регистрации.",
    summaryI18n: {
      ru: "Учимся различать дескрипторы спешелти кофе вместе с шеф-бариста и создаем кофейную графику акварелью. Вход свободный по регистрации.",
      en: "Learn sensory coffee descriptors with our head barista and paint coffee watercolor sketches. Free admission with registration.",
      zh: "与主理咖啡师一同探索精品咖啡风味轮，并用水彩与浓缩液创作咖啡艺术画作。预约免费入场。",
    },
    date: "18 апреля 2026",
    dateI18n: {
      ru: "18 апреля 2026",
      en: "April 18, 2026",
      zh: "2026年4月18日",
    },
    category: "События",
    readTime: "1 мин чтения",
    readTimeI18n: {
      ru: "1 мин чтения",
      en: "1 min read",
      zh: "1 分钟阅读",
    },
    image: "/images/menu/news-cupping.webp",
    linkText: "Записаться на встречу",
    linkTextI18n: {
      ru: "Записаться на встречу",
      en: "Register for event",
      zh: "预约活动名额",
    },
  },
];

export const LOYALTY_TIERS = [
  {
    id: "aquarelle",
    name: "Акварель",
    nameI18n: {
      ru: "Акварель",
      en: "Aquarelle / Watercolor",
      zh: "水彩卡 (Aquarelle)",
    },
    cashback: 5,
    spendThreshold: 0,
    tagline: "Первый шаг в мир арт-кофе",
    taglineI18n: {
      ru: "Первый шаг в мир арт-кофе",
      en: "First step into the world of artful coffee",
      zh: "开启艺术咖啡生活的第一步",
    },
    perks: [
      "5% кэшбэк бонусами с каждой покупки",
      "Приветственные 100 бонусов при регистрации",
      "Подарок и +500 бонусов в день рождения",
      "Электронная карта в Apple / Google Wallet",
    ],
    perksI18n: {
      ru: [
        "5% кэшбэк бонусами с каждой покупки",
        "Приветственные 100 бонусов при регистрации",
        "Подарок и +500 бонусов в день рождения",
        "Электронная карта в Apple / Google Wallet",
      ],
      en: [
        "5% cashback points on every purchase",
        "Welcome bonus of 100 points upon signup",
        "Birthday drink gift + 500 bonus points",
        "Digital card in Apple / Google Wallet",
      ],
      zh: [
        "每笔消费享 5% 积分返现",
        "注册即送 100 点迎新积分",
        "生日专属免费特饮与 +500 积分奖励",
        "支持添加至 Apple / Google 钱包",
      ],
    },
    cardGradient: "from-[#2A211B] via-[#1C1613] to-[#120F0D]",
    badgeBorder: "border-amber-700/40 text-amber-300",
  },
  {
    id: "pastel",
    name: "Пастель",
    nameI18n: {
      ru: "Пастель",
      en: "Pastel",
      zh: "粉彩卡 (Pastel)",
    },
    cashback: 7,
    spendThreshold: 5000,
    tagline: "Для ценителей ежедневных ритуалов",
    taglineI18n: {
      ru: "Для ценителей ежедневных ритуалов",
      en: "For connoisseurs of daily coffee rituals",
      zh: "献给每日咖啡生活鉴赏家",
    },
    perks: [
      "7% кэшбэк на все напитки и десерты",
      "Бесплатная замена молока на растительное (кокос, миндаль, овсяное)",
      "Приоритетный предзаказ To-Go без очереди",
      "Приглашения на закрытые сезонные дегустации",
    ],
    perksI18n: {
      ru: [
        "7% кэшбэк на все напитки и десерты",
        "Бесплатная замена молока на растительное (кокос, миндаль, овсяное)",
        "Приоритетный предзаказ To-Go без очереди",
        "Приглашения на закрытые сезонные дегустации",
      ],
      en: [
        "7% cashback on all drinks and desserts",
        "Free plant-based milk upgrades (coconut, almond, oat)",
        "Priority queue-free To-Go pre-ordering",
        "Exclusive invitations to private tastings",
      ],
      zh: [
        "全品类饮品与甜点享 7% 积分返现",
        "免费升级植物奶（燕麦奶、椰奶、杏仁奶）",
        "享优先极速外带无须排队",
        "独家受邀参与私享季度新品品鉴会",
      ],
    },
    cardGradient: "from-[#3D2C1E] via-[#2A1D13] to-[#1A120B]",
    badgeBorder: "border-amber-500/60 text-amber-200",
  },
  {
    id: "oil",
    name: "Масло / Gold",
    nameI18n: {
      ru: "Масло / Gold",
      en: "Oil Painting / Gold",
      zh: "油画金卡 (Oil / Gold)",
    },
    cashback: 10,
    spendThreshold: 15000,
    tagline: "Высший клуб ценителей искусства",
    taglineI18n: {
      ru: "Высший клуб ценителей искусства",
      en: "Premier circle of true art & coffee patrons",
      zh: "凡高艺术咖啡至尊俱乐部",
    },
    perks: [
      "10% максимальный кэшбэк на весь чек",
      "Каждый 7-й утренний кофе в подарок",
      "Персональный доступ к редким спешелти микролотам зерна",
      "Бесплатный вход на каппинги и арт-мастерклассы",
      "Эксклюзивный фирменный мерч ко дню рождения",
    ],
    perksI18n: {
      ru: [
        "10% максимальный кэшбэк на весь чек",
        "Каждый 7-й утренний кофе в подарок",
        "Персональный доступ к редким спешелти микролотам зерна",
        "Бесплатный вход на каппинги и арт-мастерклассы",
        "Эксклюзивный фирменный мерч ко дню рождения",
      ],
      en: [
        "10% maximum cashback across the entire bill",
        "Every 7th morning coffee complimentary",
        "Exclusive reserve access to rare single-origin microlots",
        "Free admission to cuppings and watercolor masterclasses",
        "Signature custom merchandise on your birthday",
      ],
      zh: [
        "全单享最高 10% 顶格积分返现",
        "每第 7 杯晨间咖啡尊享免单礼遇",
        "优先品鉴限量珍稀庄园单品微批次生豆",
        "免费参加专业杯测会与水彩艺术大师班",
        "生日尊享定制品牌限量艺术周边礼盒",
      ],
    },
    cardGradient: "from-[#593E1F] via-[#352514] to-[#1F150B]",
    badgeBorder: "border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.25)]",
  },
];

export const TASTE_NOTES_I18N: Record<string, { en: string; zh: string }> = {
  // Signature drinks descriptors
  "Сливочная нуга": { en: "Creamy nougat", zh: "奶油牛轧糖" },
  "Теплая цедра": { en: "Warm citrus zest", zh: "温润柑橘皮" },
  "Обжаренные семечки": { en: "Toasted sunflower seeds", zh: "烘烤葵花籽" },
  "Карамель": { en: "Caramel", zh: "焦糖" },
  "Лесные ягоды": { en: "Wild forest berries", zh: "野生浆果" },
  "Лаванда": { en: "Lavender", zh: "高山薰衣草" },
  "Горная лаванда": { en: "Mountain lavender", zh: "高山薰衣草" },
  "Горький шоколад": { en: "Dark cocoa", zh: "醇黑巧克力" },
  "Черничный конфитюр": { en: "Blueberry confiture", zh: "蓝莓果酱" },
  "Черничное пюре": { en: "Blueberry puree", zh: "蓝莓果茸" },
  "Тёмный шоколад 72%": { en: "72% Dark chocolate", zh: "72% 黑巧克力" },
  "Пряный кардамон": { en: "Spiced cardamom", zh: "芳香豆蔻" },
  "Миндаль": { en: "Almond", zh: "杏仁" },
  "Морская соль": { en: "Sea salt", zh: "海盐" },
  "Марципан": { en: "Marzipan", zh: "杏仁膏" },
  "Флёрдоранж": { en: "Orange blossom", zh: "橙花香" },
  "Нежная пена": { en: "Silky microfoam", zh: "细腻微奶泡" },
  "Спелое яблоко": { en: "Ripe apple", zh: "成熟苹果" },
  
  // Classic coffee descriptors
  "Жасмин": { en: "Jasmine", zh: "茉莉花" },
  "Красный персик": { en: "Red peach", zh: "红桃" },
  "Бергамот": { en: "Bergamot", zh: "佛手柑" },
  "Мёд": { en: "Raw honey", zh: "纯蜂蜜" },
  "Таежный мед": { en: "Taiga honey", zh: "针叶林野蜜" },
  "Красная смородина": { en: "Red currant", zh: "红醋栗" },
  "Грецкий орех": { en: "Walnut", zh: "核桃" },
  "Молочный шоколад": { en: "Milk chocolate", zh: "牛奶巧克力" },
  "Фундук": { en: "Hazelnut", zh: "榛子" },
  "Тростниковый сахар": { en: "Cane sugar", zh: "蔗糖" },
  "Темный трюфель": { en: "Dark truffle", zh: "黑松露风味" },
  "Сушеная вишня": { en: "Dried cherry", zh: "樱桃干" },
  "Какао": { en: "Cocoa", zh: "天然可可" },
  "Тёмное какао": { en: "Dark raw cocoa", zh: "生黑可可" },
  "Плотное тело": { en: "Full body", zh: "醇厚体感" },
  "Сливочная текстура": { en: "Creamy texture", zh: "奶油般丝滑" },
  "Двойной ристретто": { en: "Double ristretto", zh: "双份精粹" },
  "Двойной эспрессо": { en: "Double espresso", zh: "双份浓缩" },
  "Мягкий эспрессо": { en: "Smooth espresso", zh: "柔顺浓缩" },
  "Свежая обжарка": { en: "Fresh roast", zh: "新鲜自烘" },
  "Эфиопия Иргачеффе": { en: "Ethiopia Yirgacheffe", zh: "耶加雪菲" },
  "Колумбия Супремо": { en: "Colombia Supremo", zh: "哥伦比亚慧兰" },
  
  // Tea & Matcha descriptors
  "Свежая зелень": { en: "Fresh botanical greenery", zh: "清新茶绿" },
  "Умами": { en: "Umami", zh: "鲜美回甘 (Umami)" },
  "Сладкие сливки": { en: "Sweet cream", zh: "甜奶油" },
  "Фисташка": { en: "Pistachio", zh: "开心果" },
  "Жареная фисташка": { en: "Roasted pistachio", zh: "烘烤开心果" },
  "Хвоя и можжевельник": { en: "Pine needle & juniper", zh: "松针与杜松" },
  "Сочная облепиха": { en: "Juicy sea buckthorn", zh: "鲜美沙棘" },
  "Травяная свежесть": { en: "Herbal freshness", zh: "草本清新" },
  "Травянистая свежесть": { en: "Fresh botanical notes", zh: "草本清新甘甜" },
  "Байкальские травы": { en: "Baikal herbs", zh: "贝加尔草本" },
  "Саган-дайля": { en: "Sagan Dalya", zh: "香青兰草本" },
  "Чабрец": { en: "Thyme", zh: "百里香" },
  "Мята": { en: "Mint", zh: "薄荷" },
  "Японская матча": { en: "Uji matcha", zh: "宇治抹茶" },
  "Церемониальная матча": { en: "Ceremonial matcha", zh: "特级仪式抹茶" },
  "Кокосовые сливки": { en: "Coconut cream", zh: "椰浆" },
  "Овсяное молоко": { en: "Oat milk", zh: "燕麦奶" },

  // Kitchen & Breakfast descriptors
  "Сливочное масло": { en: "Creamy butter", zh: "天然黄油" },
  "Нежный лосось": { en: "Tender salmon", zh: "鲜嫩三文鱼" },
  "Лосось слабой соли": { en: "Cured salmon", zh: "轻腌三文鱼" },
  "Свежий огурец": { en: "Crisp cucumber", zh: "清脆黄瓜" },
  "Крем-чиз": { en: "Cream cheese", zh: "奶油奶酪" },
  "Сливочный крем-чиз": { en: "Cream cheese", zh: "乳酪奶油芝士" },
  "Нежный творог": { en: "Tender cottage cheese", zh: "细腻农场奶酪" },
  "Фермерский творог": { en: "Farm cottage cheese", zh: "农场高质奶酪" },
  "Домашняя сметана": { en: "Homemade sour cream", zh: "自制酸奶油" },
  "Малиновый конфитюр": { en: "Raspberry jam", zh: "覆盆子果酱" },
  "Соленая карамель": { en: "Salted caramel", zh: "海盐焦糖" },
  "Ваниль": { en: "Madagascar vanilla", zh: "香草" },
  "Сливочная бриошь": { en: "Buttery brioche", zh: "黄油布里欧修" },
  "Жидкий желток": { en: "Runny yolk", zh: "流心蛋黄" },
  "Хрустящий бекон": { en: "Crispy bacon", zh: "香脆培根" },
  "Лимонный соус": { en: "Lemon hollandaise", zh: "柠檬荷兰汁" },
  
  // Desserts descriptors
  "Яркий лимон": { en: "Zesty lemon", zh: "鲜爽柠檬" },
  "Пряный базилик": { en: "Aromatic basil", zh: "芳香罗勒" },
  "Хрустящее тесто": { en: "Crispy tart pastry", zh: "酥脆挞皮" },
  "Сладкая меренга": { en: "Sweet meringue", zh: "甜美蛋白霜" },
  "Ягодная кислинка": { en: "Berry tanginess", zh: "浆果微酸" },
  "Заварное тесто": { en: "Choux pastry", zh: "法式泡芙" },
  "Лесной орех": { en: "Hazelnut", zh: "森林榛果" },
  "Бархатистая текстура": { en: "Velvety texture", zh: "丝绒质感" },
  "Французская мука": { en: "French flour", zh: "法式小麦粉" },
  "Хрустящая корочка": { en: "Crispy crust", zh: "酥脆外层" },
  "Миндальный крем франжипан": { en: "Frangipane almond cream", zh: "杏仁奶油馅" },
  "Лепестки миндаля": { en: "Flaked almonds", zh: "杏仁片" },
  "Золотистая корочка": { en: "Golden crust", zh: "金黄外壳" },
  "Кедровые орехи": { en: "Pine nuts", zh: "松子" },
  "Смола": { en: "Cedar resin", zh: "雪松香" },
  "Свежий апельсиновый фреш": { en: "Fresh orange juice", zh: "鲜榨橙汁" },
  "Миндальный сироп": { en: "Almond syrup", zh: "杏仁糖浆" },
  "Жёлтая слива": { en: "Yellow plum", zh: "黄李" },
  "Манго": { en: "Mango", zh: "芒果" },
  "Тропические фрукты": { en: "Tropical fruits", zh: "热带水果" },
  "Сладкая выпечка": { en: "Sweet pastry", zh: "烘焙甜香" },
  "Шелковистая пена": { en: "Silky foam", zh: "丝滑奶泡" },
  "Цедра апельсина": { en: "Orange zest", zh: "橙皮" },
  "Сливки": { en: "Cream", zh: "奶油" },
};

export const getLocalizedTasteNote = (note: string, lang: "ru" | "en" | "zh"): string => {
  if (lang === "ru") return note;
  return TASTE_NOTES_I18N[note]?.[lang] || note;
};

export const formatVolume = (vol: string, lang: "ru" | "en" | "zh"): string => {
  if (lang === "ru") return vol;
  if (lang === "zh") {
    return vol.replace(/мл/g, "毫升").replace(/г/g, "克");
  }
  return vol.replace(/мл/g, "ml").replace(/г/g, "g");
};

