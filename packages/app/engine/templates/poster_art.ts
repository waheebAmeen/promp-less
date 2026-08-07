export const poster_artPrompts = {
  // 1. التفرع الأول: سينمائي ودرامي (Cinematic & Blockbuster)
  cinematic_blockbuster: {
    id: 'poster_cinematic',
    title: 'سينمائي ودرامي (Cinematic & Blockbuster)',
    description: 'بوسترات أفلام احترافية ذات طابع ملحمي وتكوين بصري ضخم',
    template: `Cinematic blockbuster movie poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, dramatic lighting, high production value, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "فيلم هوليودي ضخم", label_en: "Hollywood Blockbuster", value: "blockbuster movie key art style, dramatic scale" },
          { label_ar: "دراما نفسية غامضة", label_en: "Psychological Thriller", value: "moody thriller art style, deep shadows, cinematic atmosphere" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "بطل العمل في المنتصف", label_en: "Central Hero", value: "towering central hero subject with symmetric visual hierarchy" },
          { label_ar: "مونتاج تداخل الشخصيات", label_en: "Layered Montage", value: "cinematic montage layout with blended double exposure elements" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "تيل وأورانج (سينمائي)", label_en: "Teal & Amber", value: "deep cyan teal and glowing amber orange contrast" },
          { label_ar: "أحمر وأسود درامي", label_en: "Dramatic Red & Black", value: "intense crimson red and obsidian black palette" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "طباعة نظيفة عالية الجودة", label_en: "Clean Gloss Print", value: "ultra clean glossy print quality, sharp edges" },
          { label_ar: "حبيبات سينمائية (Film Grain)", label_en: "Film Grain", value: "heavy film grain, subtle cinematic texture" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "عرض سينمائي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: تقني وسايبربانك (Tech & Cyberpunk)
  tech_cyberpunk: {
    id: 'poster_cyberpunk',
    title: 'تقني وسايبربانك (Tech & Cyberpunk)',
    description: 'تصاميم مستقبلية تعتمد على أضواء النيون والخطوط الجرافيكية الحادة',
    template: `Futuristic cyberpunk graphic poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, high-tech aesthetic, neon glow, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "ريترو سايبربانك (Synthwave)", label_en: "Synthwave Retro", value: "retro 1980s synthwave aesthetic, neon vector lineart" },
          { label_ar: "مستقبلي حديث", label_en: "Ultra Modern Tech", value: "clean futuristic tech aesthetic, glowing interfaces" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "إطار هندسي وشبكي", label_en: "Geometric Grid", value: "structured grid layout with sharp geometric framing" },
          { label_ar: "ديناميكي مائل", label_en: "Dynamic Diagonal", value: "bold diagonal framing lines, high-speed movement" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "نيون بنفسجي وأزرق", label_en: "Neon Purple & Blue", value: "vibrant neon purple and electric blue energy" },
          { label_ar: "أخضر ماتركس ونيون", label_en: "Matrix Green & Neon", value: "glowing matrix green and dark industrial grey" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "لمعان رقمي (Digital Gloss)", label_en: "Digital Gloss", value: "smooth digital surface, glowing highlights" },
          { label_ar: "تداخل جليتش (Glitch Effect)", label_en: "Glitch Finish", value: "digital glitch distortion and data noise texture" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر طويل (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: مينيماليزم وفن حديث (Minimalist & Modern)
  minimalist_modern: {
    id: 'poster_minimalist',
    title: 'مينيماليزم وفن حديث (Minimalist & Modern)',
    description: 'تصاميم بسيطة، أنيقة، تعتمد على المساحات الفارغة والأشكال الهندسية',
    template: `Swiss minimalist graphic design poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, clean, sophisticated, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "نمط سويسري (Swiss Design)", label_en: "Swiss Style", value: "Swiss minimalist graphic design, bold typography" },
          { label_ar: "تجريد هندسي", label_en: "Geometric Abstract", value: "abstract geometric Bauhaus influenced design" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "مساحات سلبية (Negative Space)", label_en: "Negative Space", value: "extensive use of negative space, balanced layout" },
          { label_ar: "مركزية دقيقة", label_en: "Centralized Minimal", value: "centered iconic single focal point" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "أبيض وأسود مطلق", label_en: "Absolute B&W", value: "pure black and white monochrome contrast" },
          { label_ar: "باستيل هادئ", label_en: "Soft Pastel", value: "muted soft pastel color palette" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "ورق مطفي (Matte Paper)", label_en: "Matte Paper", value: "premium matte paper finish, soft surface" },
          { label_ar: "سطح ناعم ونقي", label_en: "Smooth Clean", value: "ultra smooth vector-like clean finish" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "مربع إنستغرام (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: فنتازيا ملحمية (Dark Fantasy)
  dark_fantasy: {
    id: 'poster_fantasy',
    title: 'فنتازيا ملحمية (Dark Fantasy)',
    description: 'بوسترات تعتمد على الرسم الزيتي، التفاصيل الدقيقة، والأجواء الأسطورية',
    template: `Epic dark fantasy oil painting poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, intricate detail, atmospheric, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "رسم زيتي كلاسيكي", label_en: "Classical Oil Painting", value: "rich textured classical oil painting style" },
          { label_ar: "فانتازيا مظلمة حديثة", label_en: "Modern Dark Fantasy", value: "dark fantasy concept art style, highly detailed" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "مشهد ملحمي واسع", label_en: "Epic Landscape", value: "wide epic composition with distant horizon" },
          { label_ar: "شخصية مهيمنة (Hero Focus)", label_en: "Hero Focus", value: "dramatic portrait framing of a mythical figure" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "ذهبي ورمادي فحمي", label_en: "Gold & Charcoal", value: "metallic gold accents on dark charcoal background" },
          { label_ar: "أزرق بارد ودموي", label_en: "Cold Blue & Blood Red", value: "icy blue atmosphere with intense crimson details" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "لوحة زيتية خشنة", label_en: "Rough Canvas", value: "canvas weave texture and heavy brushstrokes" },
          { label_ar: "تأثير عتيق (Distressed)", label_en: "Distressed Vintage", value: "weathered texture with cracks and age marks" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "سينمائي واسع (21:9)", label_en: "Cinematic (21:9)", value: "21:9" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: بوب آرت وكوميكس (Pop Art & Comic)
  pop_art_comic: {
    id: 'poster_pop_art',
    title: 'بوب آرت وكوميكس (Pop Art & Comic)',
    description: 'تصاميم جريئة، ملونة، تعتمد على نمط نقط "الهالفتون" والرسومات الكرتونية',
    template: `Bold halftone dot pop art comic poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, vibrant, energetic, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "كوميكس قديم", label_en: "Vintage Comic", value: "1960s vintage comic book art style" },
          { label_ar: "بوب آرت معاصر", label_en: "Modern Pop Art", value: "contemporary bold pop art illustration" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "توزيع إطارات (Panels)", label_en: "Comic Panel Layout", value: "graphic multi-panel comic book layout" },
          { label_ar: "شخصية أكشن مركزية", label_en: "Action Hero Focus", value: "central action-pose hero with graphic impact" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "ألوان أساسية صارخة", label_en: "Primary Colors", value: "bold cyan, magenta, and yellow palette" },
          { label_ar: "ألوان سي إم واي كيه (CMYK)", label_en: "CMYK Print Style", value: "classic CMYK printing color palette" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "نقط الهالفتون (Halftone)", label_en: "Halftone Dots", value: "visible retro halftone dot printing pattern" },
          { label_ar: "ورق قديم مطوي", label_en: "Folded Paper", value: "subtle vintage paper creases and distress" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "غلاف مجلة (1:1)", label_en: "Magazine Cover (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: فني كلاسيكي عتيق (Vintage & Retro)
  vintage_retro: {
    id: 'poster_vintage',
    title: 'فني كلاسيكي عتيق (Vintage & Retro)',
    description: 'تصاميم تستحضر جماليات الماضي من خلال تأثيرات الورق والطباعة القديمة',
    template: `Vintage screenprint poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, nostalgic aesthetic, authentic retro, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني",
        title_en: "Art Style",
        type: "select",
        options: [
          { label_ar: "طباعة سكرين (Screenprint)", label_en: "Screenprint", value: "retro hand-pulled screenprint graphic art" },
          { label_ar: "إعلانات قديمة (Retro Ad)", label_en: "Vintage Advertisement", value: "1950s advertising poster illustration" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "تخطيط تيبوغرافي", label_en: "Typography Focused", value: "bold typography-led design layout" },
          { label_ar: "تكوين إعلاني متوازن", label_en: "Balanced Ad Layout", value: "classic balanced advertisement poster framing" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "ألوان باهتة (Muted Tones)", label_en: "Muted Vintage", value: "faded desaturated vintage color palette" },
          { label_ar: "سيبيـا ودافئ", label_en: "Sepia & Warm", value: "sepia tone and warm aged paper colors" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "الملمس",
        title_en: "Texture",
        type: "select",
        options: [
          { label_ar: "ورق قديم مهترئ", label_en: "Aged Distressed Paper", value: "heavy paper grain with fold creases and aging" },
          { label_ar: "طباعة خشنة", label_en: "Rough Print", value: "rough texture with ink imperfections" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  }
};