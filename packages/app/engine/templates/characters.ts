export const charactersPrompts = {
  // 1. التفرع الأول: شخصية سينمائية واقعية (Cinematic Realistic)
  cinematic_realistic: {
    id: 'characters_cinematic',
    title: 'شخصية سينمائية واقعية',
    description: 'لقطة درامية كاملة، إضاءة هوليوودية، وتفاصيل بصرية فائقة الواقعية',
    template: `Cinematic full body shot of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, anamorphic lens flare, movie still, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "ethnicity",
        title_ar: "العرق / الملامح",
        title_en: "Ethnicity / Features",
        type: "select",
        options: [
          { label_ar: "ملامح عربية أصيلة", label_en: "Arabic Features", value: "Middle Eastern Arabic features, strong jawline" },
          { label_ar: "ملامح عالمية متنوعة", label_en: "Global Cinematic", value: "striking international cinematic features" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "بدلة رسمية فاخرة مصممة خصيصاً", label_en: "Bespoke Suit", value: "wearing a bespoke luxury tailored suit" },
          { label_ar: "أزياء سفر ومغامرة درامية", label_en: "Adventure Gear", value: "wearing weathered cinematic adventure clothing" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "نظرة جادة وحادة (Intense)", label_en: "Intense Gaze", value: "intense serious gaze, powerful cinematic expression" },
          { label_ar: "ابتسامة واثقة هادئة", label_en: "Confident Smile", value: "subtle confident smile, looking at camera" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "شارع ضبابي بليلة ممطرة", label_en: "Rainy Street", value: "in a moody rain-slicked city street at night with bokeh" },
          { label_ar: "مكتب تنفيذي راقي بإطلالة", label_en: "Executive Office", value: "in a high-end luxury executive corporate office overlooking skyline" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "واقعي جداً بـ Unreal Engine 5", label_en: "Photorealistic UE5", value: "unreal engine 5 render, photorealistic, path tracing" },
          { label_ar: "مظهر فيلم سينمائي 35mm", label_en: "35mm Film Still", value: "shot on 35mm film, Arri Alexa camera style" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه طولي (9:16)", label_en: "Portrait (9:16)", value: "9:16" },
          { label_ar: "سينمائي عريض (16:9)", label_en: "Cinematic Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: شخصية سايبربانك ومستقبلية (Cyberpunk & Sci-Fi)
  cyberpunk_tech: {
    id: 'characters_cyberpunk',
    title: 'سايبربانك ومستقبلي (Sci-Fi)',
    description: 'أزياء تقنية مستقبلية، إضاءة نيون صاخبة، ومدن خيال علمي',
    template: `Full body cyberpunk futuristic character shot of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, cybernetic enhancements, neon glow, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "ethnicity",
        title_ar: "العرق / الملامح",
        title_en: "Ethnicity / Features",
        type: "select",
        options: [
          { label_ar: "ملامح آسيوية بلمسات سيبيرانية", label_en: "Asian Cyber", value: "East Asian features with subtle cybernetic implants" },
          { label_ar: "ملامح عالمية حادة", label_en: "Sharp Global", value: "striking sharp futuristic features" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "تكتيكال سايبربانك (Techwear)", label_en: "Techwear", value: "wearing futuristic cyberpunk techwear with glowing straps" },
          { label_ar: "معطف جلدي مستقبلي مع أضواء", label_en: "Neon Leather Coat", value: "wearing a high-tech leather coat embedded with LED lines" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "نظرة حاسمة ومتمردة", label_en: "Rebellious Gaze", value: "rebellious fierce expression, glowing eye optics" },
          { label_ar: "هدوء آلي بارد", label_en: "Cold Calm", value: "stoic expression, emotionless digital gaze" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "مدينة نيون سايبربانك صاخبة", label_en: "Neon City", value: "in a futuristic cyberpunk Tokyo street with holographic signs" },
          { label_ar: "مختبر تقني متطور سري", label_en: "Tech Lab", value: "inside a high-tech dark sci-fi laboratory" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "رسم رقمي مفصل (Concept Art)", label_en: "Concept Art", value: "masterpiece digital concept art, cyberpunk aesthetic" },
          { label_ar: "رندر ثلاثي الأبعاد فائق الواقعية", label_en: "Hyper 3D", value: "octane render, ray tracing, futuristic lighting" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "طولي كامل (2:3)", label_en: "Tall (2:3)", value: "2:3" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: شخصية كرتونية 3D (Pixar / Disney Style)
  animated_3d: {
    id: 'characters_pixar_3d',
    title: 'شخصية رسوم متحركة 3D (ديزني)',
    description: 'تصميم شخصيات كرتونية محبوبة، ملامح تعبيرية ناعمة، وإضاءة ديزني الساحرة',
    template: `Full body stylized 3D character design of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, Disney Pixar style, soft subsurface scattering, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "ethnicity",
        title_ar: "الطابع / الملامح",
        title_en: "Character Vibe",
        type: "select",
        options: [
          { label_ar: "طابع عربي كرتوني لطيف", label_en: "Cute Arabic Vibe", value: "charming friendly animated features, warm smile" },
          { label_ar: "مجهرية عالمية كرتونية", label_en: "Global Animated", value: "expressive vibrant animated facial features" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "ملابس مغامرة ملونة أنيقة", label_en: "Adventure Outfit", value: "wearing stylish colorful animated adventure clothes" },
          { label_ar: "زي تقليدي كرتوني فخم", label_en: "Traditional Animated", value: "wearing a stylized traditional outfit with rich textures" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "ابتسامة عريضة ومشرقة", label_en: "Bright Smile", value: "big joyful smile, sparkling expressive eyes" },
          { label_ar: "نظرة حماسية ومندهشة", label_en: "Excited/Awe", value: "expression of excitement and wonder, wide eyes" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "عالم خيالي ساحر وملون", label_en: "Magical World", value: "in a whimsical magical colorful fantasy world background" },
          { label_ar: "استوديو كرتوني ناعم وبسيط", label_en: "Soft Studio", value: "clean soft studio background with warm bokeh" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "أنيميشن ديزني وبكسار (Pixar)", label_en: "Disney Pixar", value: "stylized 3D character design, Disney Pixar style renderer" },
          { label_ar: "رسم كرتوني ناعم مع إضاءة دافئة", label_en: "Soft 3D Render", value: "claymation touch, soft clay render style" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع متوازن (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "طولي (9:16)", label_en: "Portrait (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: شخصية أنمي ياباني فاخر (High-End Anime)
  anime_style: {
    id: 'characters_anime',
    title: 'شخصية أنمي ياباني (مكوتو شينكاي)',
    description: 'إضاءة سماء ساحرة، عيون لامعة، ورسم أنمي احترافي وعالي الجودة',
    template: `Full body detailed anime illustration of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, Makoto Shinkai style, vibrant colors, masterpiece, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "ethnicity",
        title_ar: "الملامح والستايل",
        title_en: "Anime Features",
        type: "select",
        options: [
          { label_ar: "ملامح أنمي بملامح شرقية مميزة", label_en: "Anime Stylized", value: "detailed anime character features, beautiful detailed hair" },
          { label_ar: "شخصية بطل درامي (Protagonist)", label_en: "Anime Hero", value: "heroic anime character design, dynamic hair strands" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "زي مدرسة يابانية أو عصرية أنيقة", label_en: "School/Modern", value: "wearing stylish modern anime casual attire" },
          { label_ar: "زي مقاتل فانتازيا أسطوري", label_en: "Fantasy Armor", value: "wearing intricate fantasy anime warrior clothing" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "نظرة حالمة نحو السماء", label_en: "Dreamy Gaze", value: "dreamy emotional expression, looking up at the sky" },
          { label_ar: "نظرة حازمة وثابتة", label_en: "Determined", value: "determined focused anime expression" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "سماء سحابية ساحرة عند الغروب", label_en: "Cloudy Sky Sunset", value: "stunning background with dramatic clouds and sunset light, Shinkai style" },
          { label_ar: "شارع طوكيو هادئ وجميل", label_en: "Tokyo Street", value: "aesthetic clean Tokyo street background with cherry blossoms" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "أسلوب Makoto Shinkai الساحر", label_en: "Shinkai Aesthetic", value: "Makoto Shinkai style, hyper luminous background, vibrant colors" },
          { label_ar: "أنمي سينمائي نظيف وعالي التباين", label_en: "Clean Cinematic Anime", value: "modern high-end digital anime cel shading, crisp lines" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "طولي (9:16)", label_en: "Portrait (9:16)", value: "9:16" },
          { label_ar: "عريض (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: شخصية تجارية وأزياء فاخرة (Commercial Editorial)
  commercial_editorial: {
    id: 'characters_editorial',
    title: 'شخصية أزياء وتجاري فاخر',
    description: 'جلسة تصوير عارضي أزياء مجلات فوغ العالمية، إضاءة استوديو راقية ونظيفة',
    template: `Full body high-end fashion editorial commercial shot of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, Vogue magazine style, flawless finish, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "ethnicity",
        title_ar: "العرق / الملامح",
        title_en: "Ethnicity / Features",
        type: "select",
        options: [
          { label_ar: "ملامح عربية عالمية لعرض الأزياء", label_en: "Arabic Model", value: "high-fashion Middle Eastern model features" },
          { label_ar: "ملامح عارضين دوليين عالميين", label_en: "Global High Fashion", value: "striking international runway model features" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "أزياء مصممين عالميين راقية (Luxury)", label_en: "Designer Wear", value: "wearing avant-garde high-end designer clothing" },
          { label_ar: "معطف ولباس كلاسيكي راقي", label_en: "Classic Luxury", value: "wearing sophisticated luxury minimalist winter coat" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "نظرة عارضي أزياء هادئة وباردة", label_en: "High Fashion Stare", value: "cool neutral high-fashion stare, professional model look" },
          { label_ar: "ابتسامة خفيفة وراقية جداً", label_en: "Subtle Elegance", value: "subtle elegant classy smile" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "استوديو أبيض نقي وواضح", label_en: "Pure White Studio", value: "minimalist clean white photo studio background" },
          { label_ar: "شارع أوروبي راقي وفخم", label_en: "European Street", value: "standing on a sophisticated Parisian luxury street" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "إضاءة استوديو تجارية احترافية", label_en: "Studio Strobe", value: "professional fashion strobe lighting, crisp details" },
          { label_ar: "مظهر مجلة فخم مع تعديل راقي", label_en: "Editorial Grade", value: "high-end editorial color grade and retouch finish" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "طولي لمجلات الأزياء (4:5)", label_en: "Editorial Portrait (4:5)", value: "4:5" },
          { label_ar: "طولي كامل (9:16)", label_en: "Full Portrait (9:16)", value: "9:16" }
        ]
      }
    ]
  }
};