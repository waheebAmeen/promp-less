export const architecturePrompts = {
  // 1. التفرع الأول: العمارة الحديثة والبسيطة (Modern Minimalist)
  modern_minimalist: {
    id: 'architecture_modern_minimalist',
    title: 'عمارة حديثة وبسيطة (Modern)',
    description: 'تصاميم معمارية هندسية نظيفة، خطوط مستقيمة، وواجهات زجاجية واسعة',
    template: `Modern minimalist architectural photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, clean lines, architectural digest, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "مودرن بسيط (Clean Minimalist)", label_en: "Modern Minimalist", value: "modern minimalist architecture, clean geometric lines" },
          { label_ar: "نيو مبرتاليزم (Neointernational)", label_en: "Neo-Modern", value: "neo-modern structural architecture style" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "حي حضري راقي ومرتب", label_en: "Upscale Urban", value: "located in an upscale clean modern urban neighborhood" },
          { label_ar: "منحدر جبلي هادئ", label_en: "Hillside", value: "perched on a serene modernist hillside cliff" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "ساعة الغروب الذهبية (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour sunset lighting, long architectural shadows" },
          { label_ar: "ضوء ناصع ونهار صافٍ", label_en: "Clear Daylight", value: "bright crisp daylight, clear blue sky" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور خارجي واسع (Exterior Hero)", label_en: "Exterior Hero", value: "exterior architectural hero shot, wide angle" },
          { label_ar: "منظور الزاوية الديناميكي", label_en: "Corner Perspective", value: "dynamic corner perspective highlighting volume" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "زجاج ممتد من الأرض للسقف وفولاذ", label_en: "Glass & Steel", value: "dominated by floor-to-ceiling glass and polished steel frames" },
          { label_ar: "خرسانة بيضاء ناعمة وزجاج", label_en: "White Concrete", value: "smooth white architectural concrete and large glass panels" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي واسع (21:9)", label_en: "Cinematic (21:9)", value: "21:9" },
          { label_ar: "عرضي قياسي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: العمارة المستقبلية والعضوية (Futuristic & Zaha Style)
  futuristic_organic: {
    id: 'architecture_futuristic_organic',
    title: 'عمارة مستقبلية وعضوية (Futuristic)',
    description: 'خطوط منحنية، تصاميم سائلة جريئة مستوحاة من أعمال زها حديد',
    template: `Futuristic organic architectural photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, fluid curves, parametric design, high resolution, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "مستقبلي عضوي بارامتري (Zaha Hadid Style)", label_en: "Parametric Organic", value: "futuristic organic architecture, parametric design, Zaha Hadid style" },
          { label_ar: "تكنو-مستقبلي خيالي (Sci-Fi)", label_en: "Sci-Fi Futuristic", value: "advanced sci-fi futuristic megastructure architecture" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "مدينة متروبوليس مستقبلية متطورة", label_en: "Futuristic Metropolis", value: "located in a hyper-advanced futuristic metropolitan city" },
          { label_ar: "واحة صحراوية مستقبلية", label_en: "Futuristic Desert Oasis", value: "set in a high-tech futuristic desert landscape" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "وقت الغسق واللون الأزرق (Blue Hour)", label_en: "Blue Hour", value: "cool blue hour twilight lighting with integrated building glows" },
          { label_ar: "إضاءة ليلية سينمائية مع إضاءات مدمجة", label_en: "Night Illuminated", value: "dramatic night illumination highlighting curved facades" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "لقطة درامية من زاوية منخفضة للأعلى", label_en: "Low Angle Hero", value: "heroic low angle looking up at sweeping curves" },
          { label_ar: "لقطة علوية بدرون (Aerial Drone)", label_en: "Aerial Drone", value: "sweeping aerial drone photography, showing master plan" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "ألواح ألومنيوم منحنية بيضاء وزجاج مظلل", label_en: "White Composite Panels", value: "seamless white curved composite panels and tinted curved glass" },
          { label_ar: "بوليمرات متقدمة وسطح معدني عاكس", label_en: "Reflective Polymers", value: "reflective metallic polymers and glowing structural veins" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" },
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: العمارة الإسلامية الحديثة (Modern Islamic)
  modern_islamic: {
    id: 'architecture_modern_islamic',
    title: 'عمارة إسلامية حديثة (Modern Islamic)',
    description: 'مزج التراث الإسلامي والأقواس والزخارف الهندسية مع التكنولوجيا والبناء المعماري الحديث',
    template: `Modern Islamic architectural photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, intricate geometric mashrabiya patterns, grand scale, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "إسلامي حديث ومعاصر (Modern Islamic)", label_en: "Modern Islamic", value: "modern Islamic architecture, intricate geometric Mashrabiya patterns" },
          { label_ar: "عمارة عربية فاخرة جديدة", label_en: "Contemporary Arabic", value: "contemporary luxury Arabic architectural design" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "قلب مدينة عربية حديثة", label_en: "Modern Arab City", value: "located in a prestigious modern Gulf metropolis center" },
          { label_ar: "واحة نخيل وفناء خارجي هادئ", label_en: "Palm Oasis Courtyard", value: "surrounded by serene palm trees and reflecting water courtyards" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "شمس الظهيرة الساطعة وظلال المشربية", label_en: "High Noon Mashrabiya", value: "bright sunlight casting intricate geometric shadows through screens" },
          { label_ar: "ساعة الغروب الدافئة (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour lighting reflecting off stone and arches" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور خارجي مهيب (Grand Exterior)", label_en: "Grand Exterior", value: "grand architectural exterior hero shot, symmetrical balance" },
          { label_ar: "فناء داخلي مع انعكاسات مائية", label_en: "Courtyard View", value: "centered courtyard view focusing on archways and reflection pools" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "الحجر الرملي الفاخر ومشربيات خشبية وبرونزية", label_en: "Sandstone & Bronze", value: "luxurious sandstone, carved bronze mashrabiya, and white marble" },
          { label_ar: "رخام أبيض وتفاصيل ذهبية هندسية", label_en: "White Marble & Gold", value: "polished white marble with gold geometric trims" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: العمارة الوحشية والخرسانية (Brutalist)
  brutalist: {
    id: 'architecture_brutalist',
    title: 'عمارة خرسانية وحشية (Brutalist)',
    description: 'كتل خرسانية ضخمة، ملمس خام قوي، وتصاميم معمارية جريئة ومهيبة',
    template: `Brutalist architectural photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, raw exposed concrete, monumental forms, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "وحشي خرساني خام (Brutalist)", label_en: "Brutalist", value: "brutalist architecture, raw exposed concrete, massive geometric forms" },
          { label_ar: "حداثة هيكلية ثقيلة", label_en: "Heavy Structural", value: "monumental heavy structural modernist architectural style" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "بيئة حضرية درامية وواسعة", label_en: "Urban Brutal", value: "set in a dramatic, minimalist urban plaza" },
          { label_ar: "طبيعة صخرية وعرة قاحلة", label_en: "Rugged Cliff", value: "built directly into a rugged rocky cliffside" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة عالية التباين ودرامية (High Contrast)", label_en: "Dramatic Hard Light", value: "harsh high-contrast sunlight, deep architectural shadows" },
          { label_ar: "سماء غائمة درامية (Overcast)", label_en: "Overcast Moody", value: "moody overcast lighting, emphasizing raw concrete textures" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور سفلي مهيب يعكس الضخامة", label_en: "Monolithic Low Angle", value: "low angle hero shot making the structure look monumental and heavy" },
          { label_ar: "زاوية هندسية صارمة", label_en: "Strict Geometric", value: "strict symmetrical architectural perspective" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "خرسانة مسلحة خام بآثار الأخشاب", label_en: "Raw Board-Formed Concrete", value: "raw board-formed textured concrete surfaces" },
          { label_ar: "خرسانة ملساء داكنة وفولاذ أسود", label_en: "Dark Concrete & Steel", value: "smooth dark architectural concrete and blackened steel" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" },
          { label_ar: "ستاندرد (4:3)", label_en: "Standard (4:3)", value: "4:3" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: التصميم الداخلي الفاخر (Luxury Interior)
  luxury_interior: {
    id: 'architecture_luxury_interior',
    title: 'تصميم داخلي فاخر (Interior)',
    description: 'ديكورات داخلية واسعة، أثاث راقي، إضاءة مخفية، وتشطيبات من الرخام والخشب الطبيعي',
    template: `Luxurious interior design architectural photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, spacious layout, high-end furniture, architectural digest, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "مودرن فاخر (Modern Luxury)", label_en: "Modern Luxury", value: "modern luxury interior design style, elegant and warm" },
          { label_ar: "بنتهاوس معاصر راقي", label_en: "Contemporary Penthouse", value: "high-end contemporary penthouse interior style" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "مطل على أفق مدينة في الليل", label_en: "City Skyline View", value: "overlooking a glittering panoramic city skyline through glass" },
          { label_ar: "مطل على شاطئ بحر هادئ", label_en: "Ocean View", value: "overlooking a calm blue ocean through floor-to-ceiling windows" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة مخفية دافئة وضوء نهار ناعم", label_en: "Warm Ambient & Soft Light", value: "soft natural daylight mixed with warm ambient recessed LED lighting" },
          { label_ar: "ساعة الغسق الداخلية الدافئة", label_en: "Twilight Warmth", value: "warm interior illumination during twilight blue hour" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور داخلي واسع ومفتوح (Wide Interior)", label_en: "Wide Interior", value: "spacious wide-angle interior hero shot" },
          { label_ar: "زاوية معيشة مقربة وأنيقة", label_en: "Living Corner", value: "elegant corner perspective of a designer seating area" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "خشب جوز طبيعي ورخام إيطالي فاخر", label_en: "Walnut Wood & Italian Marble", value: "rich walnut wood wall panels, Italian white marble floors, and velvet" },
          { label_ar: "نحاس، زجاج، وأقمشة فاخرة", label_en: "Brass & Glass", value: "brushed brass accents, glass elements, and premium textures" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: عمارة الطبيعة والبيئة (Eco-Friendly & Nature)
  eco_nature: {
    id: 'architecture_eco_nature',
    title: 'عمارة بيئية وسط الطبيعة (Eco-Architecture)',
    description: 'مبانٍ مستدامة متناغمة مع الغابات والبحيرات، تستخدم الخشب الطبيعي والنباتات',
    template: `Eco-friendly sustainable architecture photography of \${idea}, \${style}, \${environment}, \${lighting}, \${view}, \${material}, nestled in nature, biophilic design, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "عمارة بيئية مستدامة (Biophilic Design)", label_en: "Biophilic Eco", value: "sustainable biophilic architecture, seamlessly blending with nature" },
          { label_ar: "كبائن عصرية وسط الغابة", label_en: "Modern Forest Cabin", value: "modern luxury cabin architectural style" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "غابة خضراء كثيفة وأشجار عالية", label_en: "Dense Green Forest", value: "nestled deep inside a lush green pine and fern forest" },
          { label_ar: "على ضفاف بحيرة جبلية صافية", label_en: "Mountain Lake", value: "overlooking a calm crystal clear mountain lake with reflection" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء الشمس المتسلل عبر الأشجار (Dappled)", label_en: "Dappled Sunlight", value: "warm dappled sunlight filtering through forest canopy" },
          { label_ar: "إضاءة دافئة تنبعث من النوافذ ليلاً", label_en: "Warm Window Glow", value: "cozy warm interior lights glowing through glass into the forest at dusk" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور خارجي متناغم مع الطبيعة", label_en: "Nature Exterior Hero", value: "exterior hero shot integrated organically into the landscape" },
          { label_ar: "لقطة زاوية واسعة وسط الأشجار", label_en: "Wide Forest View", value: "wide angle perspective showing the structure embraced by trees" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "أخشاب طبيعية معالجة وزجاج واسع", label_en: "Natural Timber & Glass", value: "natural weathered timber, stone foundations, and large glass windows" },
          { label_ar: "حجر طبيعي وأسقف خضراء نباتية", label_en: "Stone & Green Roof", value: "natural stacked stone walls and living green planted roofs" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" }
        ]
      }
    ]
  }
};