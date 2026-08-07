export const productsPrompts = {
  // 1. التفرع الأول: منتجات تقنية وأجهزة ذكية (Apple Style Minimalist)
  tech_minimalist: {
    id: 'products_tech_minimalist',
    title: 'منتجات تقنية (أبل ستايل)',
    description: 'تصوير إعلاني نقي وبسيط، إضاءة استوديو ناعمة، وخلفية موحدة تبرز فخامة الجهاز',
    template: `Clean minimalist tech product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, Apple style, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "بسيط ونظيف (Minimalist Apple Style)", label_en: "Minimalist", value: "clean minimalist product photography, Apple style" },
          { label_ar: "مظهر مستقبلي تقني", label_en: "Futuristic Tech", value: "futuristic tech gadget presentation style" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "استوديو رمادي فاتح نقي", label_en: "Light Gray Studio", value: "solid light gray neutral studio background" },
          { label_ar: "منصة عرض هندسية عائمة (Podium)", label_en: "Floating Podium", value: "standing on a geometric floating white podium" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة ناعمة بدون ظلال قوية", label_en: "Soft Diffused", value: "soft diffused studio lighting, no harsh shadows" },
          { label_ar: "إضاءة خلفية تبرز حواف الجهاز", label_en: "Backlit Glowing", value: "elegant backlighting, glowing crisp edges" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "لقطة بطل عينية (Hero Shot)", label_en: "Hero Eye Level", value: "eye level tech hero shot" },
          { label_ar: "لقطة زاوية منخفضة بطولية", label_en: "Low Angle Heroic", value: "low angle, making the tech product look majestic" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "رندر Octane فائق الواقعية", label_en: "Octane Render", value: "rendered in Octane, photorealistic, 8k" },
          { label_ar: "تتبع الأشعة (Ray Tracing)", label_en: "Ray Tracing", value: "hyper realistic ray tracing, realistic metallic reflections" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع متوازن (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: منتجات فاخرة وعطور (Luxury & Perfume)
  luxury_marble: {
    id: 'products_luxury_marble',
    title: 'منتجات فاخرة وعطور (رخام)',
    description: 'إعلانات عطور وساعات فاخرة، أسطح رخامية، وإنعكاسات ضوئية ساحرة',
    template: `Luxury high-end commercial product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, elegant gold and glass reflections, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "فاخر وراقي جداً (Luxury High-End)", label_en: "Luxury", value: "luxury high-end commercial style, elegant and prestigious" },
          { label_ar: "كلاسيكي هادئ", label_en: "Classic Elegant", value: "classic timeless luxury advertising style" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "سطح رخام أسود فاخر مع عروق ذهبية", label_en: "Black Marble", value: "placed on a dark luxury marble surface with golden veins" },
          { label_ar: "رخام أبيض ناصع راقي", label_en: "White Marble", value: "placed on a pristine white luxury marble slab" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة درامية عالية التباين", label_en: "Dramatic Lighting", value: "high-contrast dramatic lighting, sharp golden highlights" },
          { label_ar: "إضاءة خلفية دافئة ونبيلة", label_en: "Warm Backlit", value: "warm backlighting, glowing glass textures" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "لقطة مقربة للتفاصيل والزجاج (Macro)", label_en: "Macro Close-up", value: "extreme close-up on product details and liquid reflections" },
          { label_ar: "زاوية عينية ملكية", label_en: "Royal Eye Level", value: "eye level prestigious hero shot" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "واقعي فوتوغرافي استوديو فاخر", label_en: "Pro Studio", value: "professional luxury studio photography, flawless grade" },
          { label_ar: "تتبع الأشعة وانعكاسات زجاجية", label_en: "Ray Tracing", value: "hyper realistic ray tracing, crystal glass reflections" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه إعلاني (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: منتجات ديناميكية وسوائل متطايرة (Splash & Action)
  dynamic_splash: {
    id: 'products_dynamic_splash',
    title: 'منتجات ديناميكية وسوائل (Action)',
    description: 'تصوير المشروبات والمكملات مع تطاير قطرات الماء أو الفواكه بحركة سينمائية',
    template: `Dynamic action commercial product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, high speed water splash, droplets in mid-air, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "ديناميكي مع حركة وتطاير (Action Splash)", label_en: "Dynamic Action", value: "dynamic action shot, intense splashes and movement" },
          { label_ar: "منعش وطاقوي", label_en: "Refreshing Energy", value: "refreshing energetic commercial style" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "استوديو مبلل ومنعش مع رذاذ الماء", label_en: "Wet Studio", value: "wet studio background with atmospheric mist and droplets" },
          { label_ar: "خلفية لونية متدرجة ومنعشة", label_en: "Gradient Studio", value: "vibrant color gradient studio background matching product vibe" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة استوديو سريعة وحادة (High-Speed)", label_en: "High-Speed Light", value: "high-speed freeze-action lighting, sparkling water droplets" },
          { label_ar: "إضاءة خلفية ساطعة عبر السائل", label_en: "Backlit Liquid", value: "bright backlighting illuminating fluid transparency" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "لقطة عينية حركية مباشرة", label_en: "Dynamic Eye Level", value: "eye level action hero shot capturing the splash peak" },
          { label_ar: "زاوية منخفضة درامية", label_en: "Low Angle", value: "low angle dynamic shot making the product pop out of water" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "رندر تفصيلي للسوائل (Octane/Fluid)", label_en: "Fluid Render", value: "advanced fluid simulation render, Octane, photorealistic 8k" },
          { label_ar: "فوتوغرافي تجاري عالي السرعة", label_en: "High-Speed Photo", value: "high-speed commercial photography finish" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: منتجات طبيعية وعضوية (Organic & Eco-Friendly)
  organic_nature: {
    id: 'products_organic_nature',
    title: 'منتجات طبيعية وعضوية (Eco)',
    description: 'منتجات العناية والأغذية وسط الطبيعة، أخشاب، أوراق شجر، وضوء شمس دافئ',
    template: `Organic natural eco-friendly product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, surrounded by natural elements, sunlight, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "طبيعي وعضوي مستدام (Organic Eco)", label_en: "Organic Eco", value: "organic natural product staging, eco-friendly green vibe" },
          { label_ar: "صحي وريفي نقي", label_en: "Rustic Pure", value: "pure rustic natural commercial aesthetic" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "سطح خشبي طبيعي مع أوراق شجر", label_en: "Wood & Leaves", value: "placed on a textured wooden surface surrounded by fresh green leaves" },
          { label_ar: "طبيعة خارجية ضوء شمس ناعم", label_en: "Outdoor Nature", value: "set in a serene outdoor nature environment with soft bokeh flora" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "ضوء الشمس الذهبي عبر الأشجار (Dappled)", label_en: "Dappled Sunlight", value: "warm dappled sunlight filtering through leaves, natural shadows" },
          { label_ar: "إضاءة ناعمة ودافئة الصباح", label_en: "Morning Soft Light", value: "soft warm morning natural light" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "عين الطائر فوق الطاولة (Top Down Flat Lay)", label_en: "Top Down", value: "flat lay top down perspective with natural ingredients around" },
          { label_ar: "لقطة عينية هادئة بين النباتات", label_en: "Eye Level Nature", value: "eye level organic hero shot" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "تصوير طبيعي فوتوغرافي واقعي", label_en: "Photorealistic Nature", value: "professional nature studio photography, high resolution" },
          { label_ar: "رندر ثلاثي الأبعاد فائق الواقعية", label_en: "Hyper 3D Render", value: "hyper-realistic 3D render, natural textures, 8k" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع متوازن (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "بورتريه (4:5)", label_en: "Portrait (4:5)", value: "4:5" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: إضاءة نيون ومستقبلية (Cyberpunk & Neon RGB)
  neon_cyberpunk: {
    id: 'products_neon_cyberpunk',
    title: 'منتجات بإضاءة نيون وريفي (Cyberpunk)',
    description: 'منتجات عصرية شبيهة بألعاب الفيديو، إضاءة RGB نيون، وأجواء ليلية مستقبلية',
    template: `Vibrant futuristic cyberpunk product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, neon glow, dark futuristic atmosphere, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "سايبربانك وجيمينج (Gaming/Cyberpunk)", label_en: "Cyberpunk Gaming", value: "futuristic gaming tech setup, cyberpunk commercial style" },
          { label_ar: "إضاءة نيون أرجوانية وزرقاء صاخبة", label_en: "Neon Cyber", value: "vibrant neon lit commercial aesthetic" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "أسطح معدنية داكنة مع إضاءة نيون", label_en: "Dark Metal & Neon", value: "dark brushed metal surface with glowing neon grid lines" },
          { label_ar: "خلفية مدينة مستقبلية ضبابية", label_en: "Blurry Sci-Fi City", value: "blurry futuristic cyberpunk city night background" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة نيون RGB مزيجة (أزرق ووردي)", label_en: "RGB Neon Glow", value: "vibrant RGB pink and cyan neon lighting, glowing highlights" },
          { label_ar: "إضاءة حافة ليزرية (Laser Edge)", label_en: "Laser Edge", value: "sharp laser edge lighting, high contrast cyber glow" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "زاوية منخفضة بطولية مستقبلية", label_en: "Heroic Low Angle", value: "low angle hero shot making the product look epic" },
          { label_ar: "لقطة مقربة على تفاصيل الإضاءة", label_en: "Macro Neon", value: "extreme close-up on glowing product details and textures" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "رندر Octane بإضاءة نيون متطورة", label_en: "Octane Cyber", value: "rendered in Octane, cyberpunk lighting, ray tracing, 8k" },
          { label_ar: "رندر ثلاثي الأبعاد فائق التباين", label_en: "High-Contrast 3D", value: "high-contrast 3D render, futuristic color grading" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "عرضي سينمائي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: تصوير مسطح وأزياء وعطور (Top Down Flat Lay)
  flat_lay_studio: {
    id: 'products_flat_lay',
    title: 'تصوير مسطح متناسق (Flat Lay)',
    description: 'ترتيب فني من الأعلى للمنتجات مع إكسسوارات متناسقة، مثالي لمستحضرات التجميل والموضة',
    template: `Professional flat lay top down commercial product photography of \${idea}, \${style}, \${background}, \${lighting}, \${shotType}, \${rendering}, perfectly arranged aesthetic elements, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "جمالي متناسق (Aesthetic Flat Lay)", label_en: "Aesthetic", value: "aesthetic lifestyle flat lay product staging" },
          { label_ar: "أنيق وبسيط لمستحضرات التجميل", label_en: "Cosmetic Clean", value: "clean cosmetic brand flat lay style" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "خلفية ورقية ناعمة بلون باستر", label_en: "Pastel Paper", value: "soft pastel colored paper background texture" },
          { label_ar: "رخام أبيض هادئ مع تفاصيل", label_en: "White Marble Flat", value: "clean white marble flat surface" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة ناعمة متساوية (Flat Soft)", label_en: "Flat Soft", value: "even soft studio illumination, shadowless clean look" },
          { label_ar: "ضوء نافذة جانبي ناعم ودافئ", label_en: "Soft Window Light", value: "gentle directional window light casting soft subtle shadows" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "منظور عين الطائر الكامل (Top Down 90°)", label_en: "Top Down 90deg", value: "direct top down 90-degree flat lay perspective" },
          { label_ar: "زاوية مائلة قليلاً (Isometric Flat Lay)", label_en: "Isometric Angle", value: "slightly angled isometric product arrangement" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "استوديو فوتوغرافي تجاري نقي", label_en: "Commercial Studio", value: "professional commercial studio photography, crisp and bright" },
          { label_ar: "رندر ثلاثي الأبعاد عالي الدقة", label_en: "High-Res 3D", value: "high-resolution 3D product render, flawless finish" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع متوازن (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "بورتريه (4:5)", label_en: "Portrait (4:5)", value: "4:5" }
        ]
      }
    ]
  }
};