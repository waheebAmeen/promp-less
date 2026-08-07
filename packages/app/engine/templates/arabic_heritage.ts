export const arabic_heritagePrompts = {
  // 1. التفرع الأول: فروسية وأصالة (Equestrian & Heritage)
  equestrian_heritage: {
    id: 'heritage_equestrian',
    title: 'فروسية وأصالة (Equestrian & Heritage)',
    description: 'مشاهد سينمائية تحتفي بالخيل العربية الأصيلة، الصحراء، والأزياء التقليدية العريقة',
    template: `Cinematic epic artwork of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, masterpiece, highly detailed, 8k resolution --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع الفروسية والأصالة",
        title_en: "Equestrian Theme",
        type: "select",
        options: [
          { label_ar: "فرسان الخيل العربية الأصيلة على الكثبان", label_en: "Purebred Horse Riders", value: "majestic Arabian purebred horse rider in desert dunes, flowing traditional bisht" },
          { label_ar: "موكب الهجن التقليدي في الصحراء", label_en: "Traditional Camel Caravan", value: "historic Bedouin camel caravan traversing majestic golden sand dunes at sunset" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "تضاريس الصحراء الكبرى وتراث العلا", label_en: "AlUla & Desert Canyons", value: "ancient majestic sandstone mountains of AlUla, vast desert horizon" },
          { label_ar: "واحة نخل طينية عريقة", label_en: "Traditional Oasis", value: "sun-baked mudbrick architecture, lush green date palm oasis" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة وأجواء المشهد",
        title_en: "Lighting & Atmosphere",
        type: "select",
        options: [
          { label_ar: "غروب صحراوي ذهبي ومثير", label_en: "Golden Desert Sunset", value: "dramatic golden hour sunset over endless desert dunes, warm orange glow" },
          { label_ar: "غبار الذهب المتطاير في الرياح الصحراوية", label_en: "Desert Dust & Golden Light", value: "cinematic dust particles catching warm sunbeams in the desert wind" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "تفاصيل فنية متميزة",
        title_en: "Art Details",
        type: "select",
        options: [
          { label_ar: "زخارف عربية تراثية دقيقة", label_en: "Traditional Motifs", value: "intricate traditional Arabian geometric patterns and saddle details" },
          { label_ar: "واقعية سينمائية فائقة النقاوة", label_en: "Pure Cinematic", value: "pure cinematic visual depth and ultra-realistic textures" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض جداً (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: ألف ليلة وليلة وفنتازيا (Arabian Nights Fantasy)
  arabian_nights: {
    id: 'heritage_nights',
    title: 'ألف ليلة وليلة (Arabian Nights)',
    description: 'عوالم سحرية مستوحاة من الحكايات الشرقية القديمة، الفوانيس المتوهجة، والقصور الأسطورية',
    template: `Magical Arabian Nights fantasy artwork of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, enchanting mythic atmosphere, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع الفنتازيا السحرية",
        title_en: "Fantasy Theme",
        type: "select",
        options: [
          { label_ar: "قصر شرقي أسطوري مع فوانيس مضيئة", label_en: "Mythical Palace & Lanterns", value: "mythical Arabian fantasy scene, glowing magical lanterns and starlight" },
          { label_ar: "سجاد طائر وبساطة السحر الشرقي", label_en: "Magical Elements", value: "enchanted night sky over old Baghdad, floating magical lights and treasures" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "النمط المعماري السحري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "قباب وقصور الأندلس وفاس", label_en: "Andalusian Domes", value: "intricate Moorish arches, majestic domes, and mosaic tilework" },
          { label_ar: "أبراج مراقبة قديمة ومتاهات حجرية", label_en: "Ancient Stone Towers", value: "ancient labyrinthine stone alleys and carved wooden balconies" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة وأجواء الليل الساحر",
        title_en: "Lighting Atmosphere",
        type: "select",
        options: [
          { label_ar: "ليل صحراوي مجري ونجوم متلألئة", label_en: "Starlit Night Sky", value: "clear desert night sky filled with Milky Way galaxy stars, moonlit sand" },
          { label_ar: "توهج فوانيس دافئ وساحر (Amber Glow)", label_en: "Warm Lantern Glow", value: "warm amber lantern lighting casting intricate shadows on stone walls" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "تطريز ولمسات ذهبية",
        title_en: "Gold & Lapis Details",
        type: "select",
        options: [
          { label_ar: "تزويق بالذهب واللازورد الملكي", label_en: "Gold & Lapis Lazuli", value: "royal lapis lazuli blue and gold leaf decorative accents" },
          { label_ar: "نقوش خطية منقوشة على الجدران", label_en: "Carved Inscriptions", value: "subtle carved classical Arabic script inscriptions on architectural stone" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "بورتريه طولي (9:16)", label_en: "Vertical Story (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: المعمار العربي الحديث ومستقبل نيوم (Neo-Arabian Futurism)
  neo_arabian_futurism: {
    id: 'heritage_futurism',
    title: 'مستقبل نيوم والمعمار المعاصر (Neo-Arabian)',
    description: 'دمج الهوية العربية العريقة مع التقنيات المستقبلية المتقدمة وناطحات السحاب الذهبية',
    template: `Futuristic neo-Arabian sci-fi artwork of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, sleek advanced tech, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "الطابع المستقبلي",
        title_en: "Futuristic Theme",
        type: "select",
        options: [
          { label_ar: "مدينة ضخمة ذكية وسط الصحراء (مثل ذا لاين)", label_en: "Smart Desert Megacity", value: "futuristic neo-Arabian megacity, sleek golden architectural towers blending with sand" },
          { label_ar: "مركبات طائرة فوق واحات مستقبلية", label_en: "Flying Craft & Oasis", value: "advanced futuristic oasis with holographic displays and sleek flying transport" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "التصميم المعماري الابتكاري",
        title_en: "Innovative Architecture",
        type: "select",
        options: [
          { label_ar: "زجاج حديث منقوش بذهب ومشربية ذكية", label_en: "Smart Gold Mashrabiya", value: "hyper-modern glass skyscraper with gold automated mashrabiya lattice facade" },
          { label_ar: "هياكل هندسية منحنية من التيتانيوم", label_en: "Titanium Curves", value: "futuristic organic curves inspired by Islamic geometry built with advanced metals" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "الإضاءة والتوهج التقني",
        title_en: "Tech Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة غروب متداخلة مع أضواء نيون ذهبية", label_en: "Golden Sunset & Neon", value: "futuristic golden hour sunset glowing against sleek glass and glowing holographic interfaces" },
          { label_ar: "أفق ليلي مع أضواء ليزرية زرقاء وذهبية", label_en: "Night Skyline Lasers", value: "advanced glowing smart city night skyline with elegant blue and gold energy lines" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "الخطوط واللمسات الرقمية",
        title_en: "Digital Calligraphy",
        type: "select",
        options: [
          { label_ar: "خط كوفي معاصر مضيء بالهولوجرام", label_en: "Holographic Kufic", value: "subtle floating 3D holographic golden Arabic Kufic calligraphic motifs" },
          { label_ar: "واجهات زجاجية بنقوش رقمية أنيقة", label_en: "Digital Patterns", value: "clean high-tech aesthetic without intrusive text" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض جداً (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: المجالس والضيافة العربية الملكية (Royal Majlis & Hospitality)
  royal_majlis: {
    id: 'heritage_majlis',
    title: 'المجلس والضيافة الملكية (Royal Majlis)',
    description: 'فخامة المجالس العربية التقليدية، دلال القهوة العريقة، والسجاد اليدوي الفاخر',
    template: `Opulent royal Arabian majlis interior artwork of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, luxurious craftsmanship, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع الضيافة والمجلس",
        title_en: "Majlis Theme",
        type: "select",
        options: [
          { label_ar: "مجلس عربي ملكي مع دلال قهوة وفنجان بيالة", label_en: "Royal Majlis & Coffee", value: "opulent Arabian royal majlis, hand-woven carpets and traditional brass coffee pots (dallah)" },
          { label_ar: "استقبال الضيوف الأصيل وتوزيع البخور", label_en: "Welcoming & Oudh", value: "luxurious traditional hospitality scene, burning oghud incense and aromatic smoke" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "ديكور جدران المجلس والأقواس",
        title_en: "Majlis Architecture",
        type: "select",
        options: [
          { label_ar: "أقواس مزخرفة بالنقوش الإسلامية الخشبية", label_en: "Carved Wood Arches", value: "intricate hand-carved wooden Islamic arches and gypsum wall panels" },
          { label_ar: "أعمدة رخامية مزدانة بماء الذهب", label_en: "Gold Inlaid Marble", value: "polished marble columns with subtle gold leaf geometric inlays" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة المجلس الدافئة",
        title_en: "Warm Majlis Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة دافئة من ثريات كريستال وفوانيس نحاسية", label_en: "Warm Crystal Chandeliers", value: "warm ambient lighting from grand brass chandeliers and wall sconces" },
          { label_ar: "ضوء شمس ناعم يتسلل عبر المشربية", label_en: "Mashrabiya Sunbeams", value: "soft natural daylight filtering through wooden mashrabiya creating patterned light" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "آيات قرآنية أو أبيات شعرية بالخط العربي",
        title_en: "Calligraphic Panels",
        type: "select",
        options: [
          { label_ar: "لوحة جدارية بخط الثُلث والذهب الخالص", label_en: "Thuluth Gold Calligraphy", value: "magnificent wall panel featuring classic Thuluth Arabic calligraphy in gold leaf" },
          { label_ar: "نقوش تراثية منسوجة على السجاد والمخدات", label_en: "Woven Heritage Patterns", value: "rich traditional Sadu woven textile patterns on cushions and seating" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "بورتريه طولي (9:16)", label_en: "Vertical Story (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: الفنون والحرف اليدوية التراثية (Traditional Crafts & Art)
  traditional_crafts: {
    id: 'heritage_crafts',
    title: 'الحرف والفنون اليدوية (Traditional Crafts)',
    description: 'توثيق جماليات الحرف اليدوية الشرقية، النسيج، الفخار، وتشكيل المعادن التراثية',
    template: `Masterpiece artisan craft artwork of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, highly detailed textures, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع الحرفة اليدوية",
        title_en: "Craft Theme",
        type: "select",
        options: [
          { label_ar: "حرفي ينسج السدو أو السجاد اليدوي", label_en: "Sadu Weaver Artisan", value: "master artisan hands weaving traditional colorful Sadu patterns on old loom" },
          { label_ar: "صائغ ينقش الفضة والسيوف والخناجر التقليدية", label_en: "Silversmith & Daggers", value: "traditional silversmith carving intricate details on an authentic Arabian dagger (janbiya)" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "طبيعة ورشة العمل والبيئة",
        title_en: "Workshop Environment",
        type: "select",
        options: [
          { label_ar: "سوق أو دكان تقليدي قديم (قيصرية أو سوق شعبي)", label_en: "Traditional Souk Market", value: "historic authentic souk market background with hanging brass lanterns and pottery" },
          { label_ar: "بيت طيني تراثي بضيائه الخافت", label_en: "Clay House Workshop", value: "rustic clay workshop interior with natural wooden tools and clay pots" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة تسلط الضوء على تفاصيل الحرفة",
        title_en: "Detail-Focused Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة جانبية درامية تبرز ملمس الخيوط والمعادن", label_en: "Dramatic Side Lighting", value: "dramatic side key lighting highlighting artisan texture, thread details, and metal sheen" },
          { label_ar: "ضوء دافئ مسلط من مصباح ورشة محلي", label_en: "Workshop Spotlight", value: "focused warm spotlight on artisan hands creating intricate handcrafted art" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "عناصر جمالية وزخرفية مكملة",
        title_en: "Decorative Accents",
        type: "select",
        options: [
          { label_ar: "زخارف نباتية وهندسية عربية محيطة", label_en: "Arabesque Accents", value: "surrounded by authentic brass plates and intricate arabesque metalwork" },
          { label_ar: "طابع فني واقعي نقي بدون نصوص", label_en: "Pure Art Focus", value: "pure documentary artistic visual focus without overlays" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع تفصيلي (1:1)", label_en: "Square Detail (1:1)", value: "1:1" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: خط عربي وفن تجريدي (Arabic Calligraphy & Abstract Art)
  arabic_calligraphy_art: {
    id: 'heritage_calligraphy',
    title: 'فن الخط العربي المعاصر (Arabic Calligraphy Art)',
    description: 'لوحات فنية تجريدية ومعاصرة تتخذ من جماليات الحروف العربية والخط الكوفي والثُلث أساساً لها',
    template: `Contemporary abstract Arabic calligraphy art piece of \${idea}, \${arabianTheme}, \${architecturalStyle}, \${lightingAtmosphere}, \${calligraphyDetails}, gallery exhibition quality, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع العمل الفني الخطّي",
        title_en: "Calligraphy Theme",
        type: "select",
        options: [
          { label_ar: "تكوين تجريدي لحروف عربية متداخلة بانسجام", label_en: "Abstract Interwoven Letters", value: "abstract contemporary composition of flowing Arabic letterforms curving gracefully" },
          { label_ar: "خط كوفي هندسي ضخم بتدرجات فنية", label_en: "Geometric Kufic Art", value: "large-scale geometric Kufic script artwork with rich textured background" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "الخلفية والملمس الفني (Canvas Background)",
        title_en: "Canvas Background",
        type: "select",
        options: [
          { label_ar: "قماش لوحة زيتية بخشونة وألوان جدارية (Texture)", label_en: "Raw Canvas Texture", value: "heavy textured canvas background with layers of mixed media and earthy pigments" },
          { label_ar: "خلفية رخامية فاخرة مع عروق ذهبية", label_en: "Marble & Gold Veins", value: "luxurious dark marble slab background with glowing gold veining" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة المعارض الفنية (Gallery Lighting)",
        title_en: "Gallery Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة متحفية مسلطة تبرز لمعان الذهب والبارز", label_en: "Museum Spotlight", value: "professional art gallery spotlight casting soft shadows and highlighting 3D metallic leaf" },
          { label_ar: "إضاءة محيطية هادئة وراقية", label_en: "Ambient Soft Light", value: "soft ambient gallery lighting creating an ethereal and meditative mood" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "تفاصيل خامات الذهب واللازورد",
        title_en: "Gold & Material Details",
        type: "select",
        options: [
          { label_ar: "نقوش ذهب خالص وبصمات ألوان بارزة", label_en: "Pure Gold Leaf Accents", value: "glistening pure gold leaf script with embossed 3D sculptural ink texture" },
          { label_ar: "ألوان تركوازية ولازوردية عميقة متداخلة", label_en: "Deep Lapis & Turquoise", value: "rich deep lapis lazuli blue and turquoise pigment splatters with metallic gold" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع فني (1:1)", label_en: "Square Art (1:1)", value: "1:1" },
          { label_ar: "لوحة عمودية فنية (2:3)", label_en: "Vertical Art Canvas (2:3)", value: "2:3" }
        ]
      }
    ]
  }
};