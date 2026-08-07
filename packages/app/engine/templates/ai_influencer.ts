export const ai_influencerPrompts = {
  // 1. التفرع الأول: لايف ستايل عصري (Modern Lifestyle & Café)
  lifestyle_cafe: {
    id: 'ai_influencer_lifestyle',
    title: 'لايف ستايل عصري ومقاهي (Lifestyle)',
    description: 'صور يومية عفوية في المقاهي العصرية والأماكن الأنيقة',
    template: `Authentic lifestyle photograph of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, sitting at an upscale modern café, \${cameraAngle}, \${lightingStyle}, hyper-realistic skin texture with fine pores, shot on iPhone 15 Pro, unedited raw photo --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "المظهر الشخصي",
        title_en: "Appearance",
        type: "select",
        options: [
          { label_ar: "شابة عربية بملامح جذابة", label_en: "Arab Female", value: "striking modern 24yo Arab female, hazel eyes" },
          { label_ar: "شاب عربي بملامح حادة", label_en: "Arab Male", value: "handsome 26yo Arab male, groomed beard" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "نمط الملابس",
        title_en: "Outfit",
        type: "select",
        options: [
          { label_ar: "سترة كشمير واسعة", label_en: "Oversized Sweater", value: "wearing cozy oversized cashmere sweater" },
          { label_ar: "كاجوال أنيق مع إكسسوارات", label_en: "Casual Elegant", value: "wearing stylish blazer and gold accessories" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "سيلفي كاميرا أمامية", label_en: "Front Selfie", value: "candid handheld selfie angle" },
          { label_ar: "لقطة بورتريه عفوية", label_en: "Candid Portrait", value: "medium shot, natural pose" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء شمس ناعم من النافذة", label_en: "Soft Window Light", value: "soft diffused natural window sunlight" },
          { label_ar: "إضاءة مقهى دافئة", label_en: "Warm Café Light", value: "warm ambient café lighting" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ستوري (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "منشور (4:5)", label_en: "Post (4:5)", value: "4:5" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: رياضة وصحة (Fitness & Athleisure)
  fitness_health: {
    id: 'ai_influencer_fitness',
    title: 'لياقة ونشاط (Fitness)',
    description: 'صور المؤثر في النادي الرياضي أو أثناء ممارسة نشاط بدني',
    template: `Authentic fitness photograph of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, in a professional gym environment, \${cameraAngle}, \${lightingStyle}, hyper-realistic skin texture, sweaty glow, shot on iPhone 15 Pro --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "المظهر الرياضي",
        title_en: "Fitness Appearance",
        type: "select",
        options: [
          { label_ar: "رياضي بملامح قوية", label_en: "Athletic Male", value: "fit athletic 27yo male, motivated expression" },
          { label_ar: "رياضية بملامح حيوية", label_en: "Athletic Female", value: "energetic 23yo female, ponytail, radiant" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "أزياء رياضية",
        title_en: "Athleisure",
        type: "select",
        options: [
          { label_ar: "طقم رياضي تقني حديث", label_en: "Modern Activewear", value: "wearing sleek modern high-performance activewear" },
          { label_ar: "ملابس رياضية كاجوال", label_en: "Sporty Casual", value: "wearing fitness hoodie and leggings" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "سيلفي المرآة في النادي", label_en: "Mirror Selfie", value: "mirror gym selfie" },
          { label_ar: "لقطة أثناء التمرين", label_en: "Action Shot", value: "candid shot during workout" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة نادي رياضي ساطعة", label_en: "Bright Gym Light", value: "bright cool-toned gym lighting" },
          { label_ar: "إضاءة نهارية عفوية", label_en: "Natural Daylight", value: "natural daylight from gym window" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ريلز (9:16)", label_en: "Reels (9:16)", value: "9:16" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: تراث وأصالة (Heritage & Modern Chic)
  heritage_chic: {
    id: 'ai_influencer_heritage',
    title: 'أصالة وعصرية (Heritage Chic)',
    description: 'دمج الأزياء التراثية مع لمسات عصرية في أماكن فاخرة',
    template: `Elegant portrait of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, in a luxury cultural setting, \${cameraAngle}, \${lightingStyle}, hyper-realistic fine skin details, high fashion aesthetic, shot on iPhone 15 Pro --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "ملامح المؤثر",
        title_en: "Appearance",
        type: "select",
        options: [
          { label_ar: "إطلالة عربية ملكية", label_en: "Royal Arab Look", value: "graceful Arab influencer, elegant features" },
          { label_ar: "إطلالة عصرية أنيقة", label_en: "Modern Chic", value: "confident young creator, sharp features" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "نوع الزي",
        title_en: "Attire",
        type: "select",
        options: [
          { label_ar: "عباءة فاخرة بلمسات مينيمالست", label_en: "Luxury Abaya", value: "wearing modern luxury minimalist abaya" },
          { label_ar: "ثوب عصري أنيق", label_en: "Modern Thobe", value: "wearing bespoke tailored traditional thobe" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "لقطة كاملة (Full Body)", label_en: "Full Body", value: "full body elegant shot" },
          { label_ar: "لقطة بورتريه قريبة", label_en: "Close-up", value: "intimate close-up portrait" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة ذهبية ساعة الغروب", label_en: "Golden Hour", value: "warm golden sunset lighting" },
          { label_ar: "إضاءة ناعمة وراقية", label_en: "Soft Professional", value: "soft diffused lighting" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "منشور طولي (4:5)", label_en: "Post (4:5)", value: "4:5" },
          { label_ar: "ستوري (9:16)", label_en: "Story (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: سفر وتجول (Travel & Street)
  travel_street: {
    id: 'ai_influencer_travel',
    title: 'سفر وتجول (Travel)',
    description: 'صور عفوية أثناء السفر والتجول في شوارع المدن العالمية',
    template: `Candid travel photo of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, walking in a city street, \${cameraAngle}, \${lightingStyle}, authentic skin texture, motion blur, shot on iPhone 15 Pro --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "المظهر",
        title_en: "Appearance",
        type: "select",
        options: [
          { label_ar: "شابة في العشرينات", label_en: "Young Female", value: "stylish 24yo female traveller" },
          { label_ar: "شاب في العشرينات", label_en: "Young Male", value: "stylish 26yo male traveller" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "أزياء السفر",
        title_en: "Travel Outfit",
        type: "select",
        options: [
          { label_ar: "كاجوال أنيق مع معطف", label_en: "Travel Chic", value: "wearing stylish trench coat and sunglasses" },
          { label_ar: "ستايل ستريت وير", label_en: "Streetwear", value: "wearing casual streetwear hoodie" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "لقطة عفوية من بعيد", label_en: "Candid Shot", value: "looking away, candid walk" },
          { label_ar: "سيلفي أمام معالم المدينة", label_en: "Selfie With Landmark", value: "handheld selfie with blurry street background" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء النهار الساطع", label_en: "Daylight", value: "bright natural daylight" },
          { label_ar: "إضاءة ليلية دافئة", label_en: "Night City Light", value: "warm night city bokeh lights" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ستوري (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "منشور (4:5)", label_en: "Post (4:5)", value: "4:5" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: داخل السيارة (Car Lifestyle)
  car_lifestyle: {
    id: 'ai_influencer_car',
    title: 'يوميات السيارة (Car Selfie)',
    description: 'صور داخل سيارات فارهة تعكس نمط حياة الرفاهية',
    template: `Authentic car interior photograph of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, sitting in a luxury car, \${cameraAngle}, \${lightingStyle}, realistic pores, sun through panorama roof, shot on iPhone 15 Pro --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "المظهر",
        title_en: "Appearance",
        type: "select",
        options: [
          { label_ar: "إطلالة واثقة", label_en: "Confident Look", value: "attractive creator with bright smile" },
          { label_ar: "إطلالة ريلاكس", label_en: "Relaxed Look", value: "creator looking calm and serene" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "أزياء القيادة",
        title_en: "Outfit",
        type: "select",
        options: [
          { label_ar: "ملابس كاجوال فاخرة", label_en: "Luxury Casual", value: "wearing minimalist luxury top" },
          { label_ar: "إطلالة رسمية خفيفة", label_en: "Smart Casual", value: "wearing elegant shirt" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "سيلفي داخل السيارة", label_en: "Car Selfie", value: "handheld selfie from driver seat" },
          { label_ar: "زاوية جانبية من الراكب", label_en: "Side View", value: "portrait shot from passenger side" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة نهارية علوية (سقف بانوراما)", label_en: "Sunlight Through Roof", value: "daylight filtering through panorama roof" },
          { label_ar: "أضواء المدينة الليلية", label_en: "City Lights", value: "reflections of city lights at night" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ستوري (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: منتجع وشاطئ (Beach & Resort)
  beach_resort: {
    id: 'ai_influencer_beach',
    title: 'منتجع وشاطئ (Beach Resort)',
    description: 'صور الاستجمام في المنتجعات الفاخرة والمناطق الشاطئية',
    template: `Lifestyle beach photograph of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, at a luxury beach resort, \${cameraAngle}, \${lightingStyle}, hyper-realistic skin, natural glow, shot on iPhone 15 Pro --ar \${aspectRatio}`,
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "المظهر",
        title_en: "Appearance",
        type: "select",
        options: [
          { label_ar: "شابة بإطلالة صيفية", label_en: "Summer Female", value: "radiant 24yo female influencer" },
          { label_ar: "شاب بإطلالة صيفية", label_en: "Summer Male", value: "chilled 26yo male influencer" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "أزياء الشاطئ",
        title_en: "Beachwear",
        type: "select",
        options: [
          { label_ar: "ملابس صيفية خفيفة", label_en: "Light Summer Wear", value: "wearing elegant resort wear" },
          { label_ar: "نظارات شمسية وقبعة", label_en: "Accessories", value: "wearing designer sun hat and glasses" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "زاوية التصوير",
        title_en: "Angle",
        type: "select",
        options: [
          { label_ar: "لقطة استرخاء بجانب المسبح", label_en: "Poolside Shot", value: "candid relaxing by pool" },
          { label_ar: "سيلفي صيفي", label_en: "Summer Selfie", value: "close-up selfie, sun-kissed" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة شمس قوية وصيفية", label_en: "Bright Sunny", value: "bright natural summer sunlight" },
          { label_ar: "إضاءة غروب شاطئية", label_en: "Beach Sunset", value: "dramatic warm sunset lighting" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "الأبعاد",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ستوري (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "منشور (4:5)", label_en: "Post (4:5)", value: "4:5" }
        ]
      }
    ]
  }
};