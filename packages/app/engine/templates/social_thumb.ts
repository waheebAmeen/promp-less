export const social_thumbPrompts = {
  // 1. التفرع الأول: مصغرات التحدي والمفاجأة (Shock & Challenge)
  shock_challenge: {
    id: 'social_thumb_shock_challenge',
    title: 'تحدي ومفاجأة (Shock & Challenge)',
    description: 'مصغرات يوتيوب عالية التفاعل تعتمد على تعبيرات الصدمة، الألوان الحادة، وجذب الانتباه الفوري',
    template: `Eye-catching click-worthy YouTube thumbnail graphic of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, hyper-detailed, high visual contrast, 8k resolution, trending viral composition --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية الرئيسية",
        title_en: "Main Subject Expression",
        type: "select",
        options: [
          { label_ar: "صدمة ومفاجأة قوية جداً", label_en: "Shocked & Surprised", value: "shocked expressive facial reaction, wide open eyes, mouth open in disbelief" },
          { label_ar: "صراخ وحماس جنوني", label_en: "Hype Scream", value: "excited yelling expression, high energy facial emotion" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "انفجار ألوان وجسيمات ضوئية متطايرة", label_en: "Color Burst Sparks", value: "glowing neon background with flying embers and light sparks" },
          { label_ar: "انقسام خلفية عالي التباين (قبل وبعد)", label_en: "Split Contrast", value: "half glowing blue half fiery orange high contrast background" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أصفر فاقع وأزرق نيون (أعلى نسبة نقر CTR)", label_en: "Vibrant Yellow & Blue", value: "electric yellow highlights against rich deep blue theme" },
          { label_ar: "أحمر ناري وذهب لامع", label_en: "Fiery Red & Gold", value: "intense fiery red energy flames and metallic gold glow" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "توهج حواف حاد وقوي (Rim Glow)", label_en: "Sharp Edge Rim Light", value: "intense glowing rim light outlining the subject silhouette sharply" },
          { label_ar: "شرارات كهربائية وبرق محيط", label_en: "Electric Lightning", value: "subtle electric lightning tendrils and sparks around the subject" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب قياسية (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "فيديو قصير / ريلز (9:16)", label_en: "Shorts / Reels (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: البرمجة والتقنية (Coding & Tech)
  coding_tech: {
    id: 'social_thumb_coding_tech',
    title: 'تقنية وبرمجة (Tech & Coding)',
    description: 'مخصص لفيديوهات البرمجة، الشاشات المضيئة، وأكواد الأخطاء أو التحديات التقنية',
    template: `Tech & programming YouTube thumbnail of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, hacker vibe, futuristic UI screens, 8k resolution --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية التقنية",
        title_en: "Tech Expression",
        type: "select",
        options: [
          { label_ar: "تركيز عميق مع لمسة ذكاء", label_en: "Deep Focus", value: "focused programmer expression looking intently at code screens" },
          { label_ar: "ابتسامة نجاح بعد حل مشكلة برمجية", label_en: "Success Smirk", value: "satisfied confident smile pointing at a successful code build" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "شاشات متعددة بأكواد برمجية مضيئة", label_en: "Multi Monitor Code", value: "futuristic multi-monitor setup displaying glowing matrix code and terminals" },
          { label_ar: "غرفة إضاءة آر جي بي مظلمة (Dark RGB Setup)", label_en: "Dark RGB Room", value: "dark gamer room with glowing purple and cyan RGB ambient lighting" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أخضر ماتركس وسایبر تكنولوجي", label_en: "Matrix Green & Dark", value: "glowing matrix green and neon cyan against dark cyber background" },
          { label_ar: "أزرق ونيون بنفسجي (Cyberpunk)", label_en: "Cyber Purple & Cyan", value: "ultra vibrant magenta purple and cyan neon style" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "انعكاس ألوان الشاشات على الوجه", label_en: "Screen Reflection Glow", value: "face illuminated by bright reflective code text glow from screens" },
          { label_ar: "إضاءة حواف سايبر نيون", label_en: "Cyber Rim Light", value: "sharp cyan and magenta neon rim lighting on shoulders and face" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "منشور إضافي (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: الألعاب والترفيه (Gaming & Streaming)
  gaming_streaming: {
    id: 'social_thumb_gaming',
    title: 'ألعاب وبثوث (Gaming & Stream)',
    description: 'مصغرات حماسية خاصة بعالم الألعاب، البث المباشر، وتأثيرات الهاردكور',
    template: `High energy gaming streaming thumbnail of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, esports vibe, epic action, 8k resolution --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية الحماسي",
        title_en: "Gamer Expression",
        type: "select",
        options: [
          { label_ar: "صراخ حماسي وسماعة ألعاب رأسية", label_en: "Hype Headset Scream", value: "gamer wearing pro headset, shouting in extreme excitement or rage" },
          { label_ar: "تركيز تكتيكي قتالي شديد", label_en: "Tactical Focus", value: "intense competitive gaming focus, biting lip, leaning forward" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "معركة حماسية مشتعلة وانفجارات", label_en: "Epic Battle Explosions", value: "chaotic epic gaming battlefield with explosions and smoke" },
          { label_ar: "استوديو بث مباشر احترافي مع مايك", label_en: "Pro Streamer Desk", value: "pro streaming room with RGB panels, microphone, and neon signs" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أحمر دموي وبرتقالي ناري", label_en: "Blood Red & Flame", value: "aggressive fiery red and blazing orange neon gaming palette" },
          { label_ar: "نيون أزرق وفوشيا صارخ", label_en: "Neon Blue & Fuchsia", value: "vibrant neon blue and hot fuchsia esports color scheme" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "توهج نيون جانبي قوي للألعاب", label_en: "RGB Gamer Glow", value: "dynamic multi-color RGB lighting bouncing off headphones and face" },
          { label_ar: "شرارات انفجار وانعكاسات نارية", label_en: "Explosive Sparks", value: "glowing sparks and embers flying across the camera lens" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "ريلز وتيك توك (9:16)", label_en: "Reels / TikTok (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: المال والأعمال والبودكاست (Finance & Podcast)
  finance_podcast: {
    id: 'social_thumb_finance_podcast',
    title: 'مال وأعمال وبودكاست (Finance & Podcast)',
    description: 'مصغرات احترافية للبودكاست، مقابلات، والثروة، تتميز بالثقة والهدوء الجذاب',
    template: `Professional business podcast thumbnail of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, corporate wealth, high production value, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية",
        title_en: "Subject Expression",
        type: "select",
        options: [
          { label_ar: "ابتسامة ثقة واثقة وذراعان متقاطعتان", label_en: "Confident Smirk", value: "confident charismatic smile, arms crossed, powerful professional vibe" },
          { label_ar: "تعبير نقاش واهتمام عميق (بودكاست)", label_en: "Engaged Discussion", value: "engaging conversational expression, speaking to microphone passionately" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "استوديو بودكاست خشبي فاخر بإضاءة دافئة", label_en: "Luxury Podcast Studio", value: "luxury acoustic wooden podcast studio background with soft blur bokeh" },
          { label_ar: "مكتبة مالية أو أفق مدينة ضبابي", label_en: "Finance Skyline", value: "luxurious modern office with blurred skyscraper background and wealth motifs" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أخضر دولارات وذهبي داكن فخم", label_en: "Emerald Green & Gold", value: "rich emerald green and luxurious dark gold tones" },
          { label_ar: "أزرق كحلي رسمي مع إضاءة دافئة", label_en: "Executive Navy & Warm", value: "professional navy blue palette accented with warm amber light" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "إضاءة استوديو ناعمة واحترافية (Soft Studio)", label_en: "Soft Studio Light", value: "soft cinematic key light with professional studio falloff" },
          { label_ar: "توهج ذهبي خفيف وخلفية بوكيه ناعمة", label_en: "Gold Bokeh Glow", value: "warm golden backlight with soft luxury background bokeh" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "مربع إنستغرام (1:1)", label_en: "Instagram Post (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: الغموض والجريمة والقصص (Mystery & Storytelling)
  mystery_story: {
    id: 'social_thumb_mystery_story',
    title: 'قصص وغموض (Mystery & True Crime)',
    description: 'مخصص لفيديوهات القصص الغامضة، الوثائقيات، وجرائم التحقيق المثيرة',
    template: `Cinematic mystery and true crime YouTube thumbnail of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, dark atmospheric thriller, dramatic storytelling, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية",
        title_en: "Subject Expression",
        type: "select",
        options: [
          { label_ar: "غموض وتوجس مع ظل درامي على نصف الوجه", label_en: "Intense Mystery", value: "intense curious gaze, dramatic shadow cutting across half the face" },
          { label_ar: "نظرة ترقب وتحذير مباشر للمشاهد", label_en: "Warning Gaze", value: "suspicious serious expression looking directly into the camera lens" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "مسرح جريمة مظلم مع شريط تحقيق ومطر", label_en: "Crime Scene Rain", value: "dark moody crime scene background with police tape and rain streaks" },
          { label_ar: "غرفة تحقيق مظلمة بضوء مصباح متأرجح", label_en: "Dark Interrogation", value: "dark interrogation room with a swinging single overhead bulb and smoke" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أزرق داكن ليلي ودموي خفيف", label_en: "Dark Blue & Crimson", value: "desaturated dark cinematic blue and ominous crimson red tones" },
          { label_ar: "أبيض وأسود مع لمسة لونية بارزة (Noir)", label_en: "Noir High Contrast", value: "dramatic noir black and white style with high contrast amber highlights" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "إضاءة مصباح متأرجح قوية وحادة (Chiaroscuro)", label_en: "Swinging Bulb Light", value: "harsh single-source spotlight creating deep mysterious shadows" },
          { label_ar: "ضوء طوارئ شرطة أحمر وأزرق خافت", label_en: "Police Siren Flashes", value: "faint flashing red and blue police emergency lights in background" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "سينمائي واسع (21:9)", label_en: "Cinematic (21:9)", value: "21:9" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: التعليم والشروحات (Education & Tutorials)
  education_tutorial: {
    id: 'social_thumb_education',
    title: 'شروحات وتعليم (Tutorials & Tips)',
    description: 'مصغرات خاصة بالشروحات التعليمية، النصائح، وكيفية فعل الأشياء بسهولة',
    template: `Engaging educational tutorial YouTube thumbnail of \${idea}, \${subjectExpression}, \${backgroundStyle}, \${colorTheme}, \${lightingEffect}, clear, professional, high CTR click-bait style, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية",
        title_en: "Subject Expression",
        type: "select",
        options: [
          { label_ar: "إشارة الإصبع نحو الحل أو الفكرة بابتسامة", label_en: "Pointing Solution", value: "friendly charismatic smile, pointing finger towards viewer or floating tip box" },
          { label_ar: "تعبير إلقاء نظرة حماسية وكشف السر", label_en: "Eureka Moment", value: "lightbulb eureka moment expression, pointing up excitedly" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "سبورة ذكية أو خلفية تفاعلية مع أيقونات", label_en: "Digital Whiteboard", value: "clean modern educational studio background with floating glowing UI icons" },
          { label_ar: "غرفة مكتب مرتبة ونظيفة ومضيئة", label_en: "Clean Bright Office", value: "bright, clean modern minimalist workspace background with indoor plants" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أزرق تعليمي وأصفر برتقالي ساطع", label_en: "Blue & Bright Orange", value: "trustworthy academic blue combined with high-attention bright orange" },
          { label_ar: "تركواز وأبيض ناصع حديث", label_en: "Teal & Clean White", value: "vibrant modern teal and clean white educational palette" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "إضاءة ناصعة ونظيفة (Clean Bright Key Light)", label_en: "Clean Bright Light", value: "bright, even studio key lighting with friendly warm fill" },
          { label_ar: "توهج ناعم يبرز الشخصية عن الخلفية", label_en: "Soft Separation Glow", value: "subtle soft white rim light separating subject cleanly from background" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "فيديو قصير (9:16)", label_en: "Shorts (9:16)", value: "9:16" }
        ]
      }
    ]
  }
};