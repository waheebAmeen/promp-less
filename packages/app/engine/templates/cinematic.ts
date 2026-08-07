export const cinematicPrompts = {
  // 1. التفرع الأول: ملحمة خيالية / فانتسي
  epic_fantasy: {
    id: 'cinematic_epic_fantasy',
    title: 'ملحمي وخيالي (Epic Fantasy)',
    description: 'مناظر واسعة وعوالم خيالية ساحرة بجودة سينمائية فائقة',
    template: `Epic cinematic fantasy shot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, magical atmosphere, filmed on \${camera}, hyper-detailed, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "تكوين المشهد الخيالي",
        title_en: "Fantasy Composition",
        type: "select",
        options: [
          { label_ar: "لقطة واسعة لقلعة عملاقة", label_en: "Massive Castle Wide Shot", value: "grand wide angle view of an ancient mystical fortress" },
          { label_ar: "غابة سحرية مظلمة", label_en: "Dark Magic Forest", value: "deep enchanted forest with glowing flora" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة السحرية",
        title_en: "Magical Lighting",
        type: "select",
        options: [
          { label_ar: "توهج سحري أزرق وبنفسجي", label_en: "Mystical Blue Glow", value: "glowing magical blue and purple particle lighting" },
          { label_ar: "شمس غروب درامية خلفية", label_en: "Dramatic Sunset Backlight", value: "fiery sunset casting long dramatic shadows" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين السينمائي",
        title_en: "Color Grading",
        type: "select",
        options: [
          { label_ar: "ألوان سينمائية غنية ودافئة", label_en: "Warm Epic Tones", value: "rich golden and deep teal cinematic fantasy grading" },
          { label_ar: "ألوان باردة ومظلمة", label_en: "Dark Moody Tones", value: "desaturated cold mysterious fantasy tones" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "Arri Alexa LF", label_en: "Arri Alexa LF", value: "shot on Arri Alexa LF" },
          { label_ar: "IMAX 70mm", label_en: "IMAX 70mm", value: "IMAX 70mm film format" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي واسع (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: سايبربانك ومستقبلي
  cyberpunk: {
    id: 'cinematic_cyberpunk',
    title: 'سايبربانك ومستقبلي (Cyberpunk)',
    description: 'مدن مستقبلية ممطرة، إضاءات نيون ساطعة، وأجواء تكنولوجية',
    template: `Cyberpunk futuristic cinematic shot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, wet streets, reflections, filmed on \${camera}, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "التكوين الحضري",
        title_en: "Urban Composition",
        type: "select",
        options: [
          { label_ar: "شارع ضيق مزدحم بالنيون", label_en: "Crowded Neon Street", value: "dense futuristic city street filled with holographic billboards" },
          { label_ar: "منظور علوي لناطحات سحاب", label_en: "Skyscraper High Angle", value: "dramatic high angle looking down a mega-city canyon" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة النيون",
        title_en: "Neon Lighting",
        type: "select",
        options: [
          { label_ar: "أضواء نيون وردية وزرقاء", label_en: "Pink and Blue Neon", value: "vibrant pink and cyan neon glow reflecting on wet pavement" },
          { label_ar: "إضاءة ليزر صناعية حادة", label_en: "Sharp Laser Lights", value: "harsh industrial laser lighting and volumetric haze" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين",
        title_en: "Color Grading",
        type: "select",
        options: [
          { label_ar: "تباين عالي نيون ساخن", label_en: "High Contrast Neon", value: "high contrast neon cyberpunk color grading" },
          { label_ar: "أزرق داكن ومعدني", label_en: "Dark Metallic Blue", value: "dark moody cyber blue and metallic tones" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "RED V-Raptor 8K", label_en: "RED V-Raptor 8K", value: "shot on RED V-Raptor 8K" },
          { label_ar: "Panavision Anamorphic", label_en: "Panavision", value: "Panavision anamorphic lenses" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: درامي واقعي (Drama)
  dramatic_realism: {
    id: 'cinematic_dramatic',
    title: 'درامي واقعي (Dramatic Realism)',
    description: 'لقطات شخصيات قوية، تعبيرات عميقة، وإضاءة استوديو سينمائية',
    template: `Dramatic cinematic portrait shot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, micro-details, highly emotional, filmed on \${camera}, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "التكوين واللقطة",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "لقطة مقربة للوجه (Close-up)", label_en: "Close-up Portrait", value: "extreme close-up portrait focusing on intense facial expressions" },
          { label_ar: "لقطة متوسطة تعبيرية", label_en: "Medium Shot", value: "medium cinematic framing showing body language" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة الدرامية",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة ريمبراندت الظلال", label_en: "Rembrandt Lighting", value: "classic Rembrandt lighting with deep shadows on one side" },
          { label_ar: "إضاءة ناعمة جانبية", label_en: "Soft Side Light", value: "soft diffused window light illumination" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين السينمائي",
        title_en: "Color Grading",
        type: "select",
        options: [
          { label_ar: "ألوان طبيعية دافئة", label_en: "Natural Warm Tones", value: "natural skin tones with warm cinematic grading" },
          { label_ar: "أبيض وأسود فاخر", label_en: "Luxury B&W", value: "high-contrast cinematic black and white" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "Arri Alexa 65", label_en: "Arri Alexa 65", value: "shot on Arri Alexa 65" },
          { label_ar: "عدسة 85mm بريم", label_en: "85mm Prime Lens", value: "85mm prime lens with creamy bokeh" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "عمودي للهواتف (9:16)", label_en: "Vertical (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: رعب وغموض (Horror & Mystery)
  horror_mystery: {
    id: 'cinematic_horror',
    title: 'رعب وغموض (Horror & Mystery)',
    description: 'أجواء مظلمة، ضباب كثيف، وإضاءة خافتة مثيرة للتوتر',
    template: `Dark cinematic horror thriller shot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, eerie fog, suspenseful atmosphere, filmed on \${camera}, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "تكوين المشهد",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "ممر مظلم مرعب", label_en: "Creepy Dark Corridor", value: "narrow dark corridor disappearing into deep shadows" },
          { label_ar: "غابة مظلمة وضبابية", label_en: "Foggy Dark Woods", value: "eerie forest filled with thick creepy fog" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة المرعبة",
        title_en: "Horror Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء مصباح يدوي ضعيف ومرتعش", label_en: "Flickering Flashlight", value: "dim flickering flashlight beam cutting through total darkness" },
          { label_ar: "ضوء قمر أزرق باهت", label_en: "Pale Moonlight", value: "cold pale moonlight casting long distorted shadows" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين والجو",
        title_en: "Color Grading",
        type: "select",
        options: [
          { label_ar: "ألوان باهتة ومخيفة (Desaturated)", label_en: "Desaturated Creepy Tones", value: "desaturated sickly green and grey horror color grading" },
          { label_ar: "أسود داكن مع تباين قاسي", label_en: "Pitch Black Contrast", value: "high-contrast pitch black noir horror tones" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "RED Monstro VV", label_en: "RED Monstro", value: "shot on RED Monstro VV" },
          { label_ar: "عدسة واسعة مشوهة 18mm", label_en: "18mm Distorted Wide", value: "18mm wide lens with subtle edge distortion" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "قياسي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: وثائقي طبيعي (Documentary)
  documentary: {
    id: 'cinematic_documentary',
    title: 'وثائقي طبيعي (Documentary)',
    description: 'واقعي، إضاءة شمس طبيعية، وتفاصيل نقية مطابقة لـ National Geographic',
    template: `National Geographic style cinematic documentary shot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, hyper-realistic nature, pristine details, filmed on \${camera}, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "التكوين الوثائقي",
        title_en: "Composition",
        type: "select",
        options: [
          { label_ar: "لقطة طبيعية واسعة مفتوحة", label_en: "Wide Nature Landscape", value: "epic wide-angle landscape shot capturing vast wilderness" },
          { label_ar: "لقطة مقربة تفصيلية (Macro)", label_en: "Macro Detail Shot", value: "extreme macro wildlife or environmental detail shot" }
        ]
      },
      {
        id: "lighting",
        title_ar: "ضوء الشمس الطبيعي",
        title_en: "Natural Sunlight",
        type: "select",
        options: [
          { label_ar: "ساعة ذهبية دافئة (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour natural sunlight filtering through atmosphere" },
          { label_ar: "ضوء النهار الساطع والقياسي", label_en: "Bright Daylight", value: "crisp bright natural daylight with clear visibility" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين الطبيعي",
        title_en: "Natural Colors",
        type: "select",
        options: [
          { label_ar: "ألوان الطبيعة الحقيقية والزاهية", label_en: "Vibrant Natural Palette", value: "true-to-life vibrant natural earth tones and lush greens" },
          { label_ar: "ألوان سينمائية هادئة وواقعية", label_en: "Subtle Realistic Tones", value: "subtle cinematic documentary color grading" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "Sony FX9 / Cinema Camera", label_en: "Sony FX9", value: "shot on Sony FX9 professional cinema camera" },
          { label_ar: "عدسة تقريب طبيعية 200mm", label_en: "200mm Telephoto", value: "200mm telephoto wildlife lens" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "سينمائي واسع (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: خيال علمي فضاء (Sci-Fi Space)
  sci_fi_space: {
    id: 'cinematic_scifi',
    title: 'خيال علمي وفضاء (Sci-Fi Space)',
    description: 'مركبات فضائية ضخمة، كواكب بعيدة، وأضواء ليزرية تكنولوجية',
    template: `Hard sci-fi space cinematic mastershot of \${idea}, \${composition}, \${lighting}, \${colorGrading}, futuristic technology, cosmic atmosphere, filmed on \${camera}, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "composition",
        title_ar: "التكوين الفضائي",
        title_en: "Space Composition",
        type: "select",
        options: [
          { label_ar: "سفينة فضائية عملاقة في الفضاء", label_en: "Giant Spaceship", value: "massive interstellar spaceship floating against deep starfield" },
          { label_ar: "قاعدة فضائية على كوكب آخر", label_en: "Alien Planet Base", value: "futuristic science outpost on a desolate alien planet surface" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة الكون والفضاء",
        title_en: "Cosmic Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء نجم بعيد ساطع وحاد", label_en: "Harsh Star Light", value: "harsh direct stellar illumination and deep space shadows" },
          { label_ar: "توهج لوحات التحكم والمحركات", label_en: "Engine & Panel Glow", value: "vibrant blue engine thruster glow and holographic console lights" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "التلوين الفضائي",
        title_en: "Sci-Fi Color Grading",
        type: "select",
        options: [
          { label_ar: "أزرق فضائي داكن ونجومي", label_en: "Deep Cosmic Blue", value: "deep cosmic blue and star-dusted dark space tones" },
          { label_ar: "فضي معدني مع توهج برتقالي", label_en: "Metallic Silver & Orange", value: "brushed metallic silver with fiery atmospheric contrast" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera",
        type: "select",
        options: [
          { label_ar: "IMAX Space Rig", label_en: "IMAX Space Rig", value: "shot on IMAX space-grade cinema rig" },
          { label_ar: "RED V-Raptor 8K", label_en: "RED V-Raptor", value: "shot on RED V-Raptor 8K" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي واسع جداً (21:9)", label_en: "Ultra-Wide Anamorphic (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة قياسية (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  }
};