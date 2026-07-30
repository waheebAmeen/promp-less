export const ai_influencerPrompts = {
  default: {
    id: 'ai_influencer_default',
    title: 'مؤثر رقمي (افتراضي)',
    description: 'التدفق الأساسي لـ مؤثر رقمي',
    template: `Authentic lifestyle photograph of an AI influencer \${idea}, \${featuresAndEthnicity}, \${outfitStyle}, \${locationContext}, \${cameraAngle}, \${lightingStyle}, hyper-realistic skin texture with fine pores, natural hair, shot on iPhone 15 Pro, unedited raw photo --ar \${aspectRatio}`,
    questions: [
  {
    id: "featuresAndEthnicity",
    title_ar: "ملامح وعرق المؤثر",
    title_en: "Influencer Appearance & Ethnicity",
    type: "select",
    options: [
      {
        label_ar: "ملامح عربية حديثة (شابة خليجية/عربية)",
        label_en: "Modern Arab Female",
        value: "striking modern 24yo Arab female influencer, hazel eyes, natural beauty"
      },
      {
        label_ar: "ملامح عربية وسيمة (شاب خليجي/عربي)",
        label_en: "Modern Arab Male",
        value: "handsome 26yo Arab male content creator, well-groomed beard, sharp jawline"
      },
      {
        label_ar: "ملامح عالمية مختلطة",
        label_en: "Global Mixed Features",
        value: "attractive mixed ethnicity digital creator, warm smile, expressive eyes"
      }
    ]
  },
  {
    id: "outfitStyle",
    title_ar: "نمط الأزياء اليومية",
    title_en: "Daily Outfit Style",
    type: "select",
    options: [
      {
        label_ar: "أزياء سفر وكاجوال أنيق",
        label_en: "Travel Casual Elegant",
        value: "wearing stylish beige trench coat and designer sunglasses"
      },
      {
        label_ar: "ملابس رياضية وصحية (Fitness Lifestyle)",
        label_en: "Athleisure Fitness",
        value: "wearing sleek modern activewear, post workout glow"
      },
      {
        label_ar: "عباءة مودرن راقية / ثوب عصري",
        label_en: "Modern Heritage Chic",
        value: "wearing modern luxury minimalist Abaya, elegant jewelry"
      },
      {
        label_ar: "ملابس كافيه ورستر كاجوال",
        label_en: "Cozy Café Style",
        value: "wearing cozy oversized cashmere sweater holding coffee cup"
      }
    ]
  },
  {
    id: "locationContext",
    title_ar: "موقع الصورة ونمط الحياة",
    title_en: "Lifestyle Location",
    type: "select",
    options: [
      {
        label_ar: "مقهى عصري فاخر بدبي / الرياض",
        label_en: "Luxury Modern Café",
        value: "sitting at an outdoor upscale coffee shop table in Dubai downtown"
      },
      {
        label_ar: "شوارع باريس / لندن الممطرة",
        label_en: "European City Street",
        value: "walking through a quaint cobblestone European street"
      },
      {
        label_ar: "منتجع فاخر على شاطئ البحر",
        label_en: "Luxury Beach Resort",
        value: "relaxing at an infinity pool terrace overlooking turquoise ocean"
      },
      {
        label_ar: "داخل سيارة فاخرة (Car Selfie)",
        label_en: "Luxury Car Interior",
        value: "inside a luxury sports car, daylight through panorama roof"
      }
    ]
  },
  {
    id: "cameraAngle",
    title_ar: "منظور التصوير والكاميرا",
    title_en: "Perspective & Framing",
    type: "select",
    options: [
      {
        label_ar: "سيلفي كاميرا أمامية طبيعية",
        label_en: "Casual Front Camera Selfie",
        value: "candid handheld selfie angle, slight depth of field"
      },
      {
        label_ar: "لقطة عفوية (Candid POV)",
        label_en: "Candid Third Person POV",
        value: "candid shot taken by a friend, looking away smiling"
      },
      {
        label_ar: "بورتريه نصف جسم (Half Body)",
        label_en: "Half Body Portrait",
        value: "medium portrait shot, natural arm placement"
      }
    ]
  },
  {
    id: "lightingStyle",
    title_ar: "إضاءة الصورة الواقعية",
    title_en: "Natural Lighting",
    type: "select",
    options: [
      {
        label_ar: "إضاءة شمس ذهبية (Golden Hour)",
        label_en: "Golden Hour Flare",
        value: "warm golden sunset lighting catching hair edges"
      },
      {
        label_ar: "ضوء يوم طبيعي ناعم (Overcast Window)",
        label_en: "Soft Daylight",
        value: "soft diffused natural window sunlight, natural skin tone"
      },
      {
        label_ar: "إضاءة ليلية دافئة بأضواء المدينة",
        label_en: "Warm Night City Lights",
        value: "nighttime city ambient lights, subtle street bokeh"
      }
    ]
  },
  {
    id: "aspectRatio",
    title_ar: "أبعاد الصورة",
    title_en: "Aspect Ratio",
    type: "select",
    options: [
      {
        label_ar: "ستوري / ريلز (9:16)",
        label_en: "Story / Reels (9:16)",
        value: "9:16"
      },
      {
        label_ar: "منشور إنستغرام طولي (4:5)",
        label_en: "Instagram Post (4:5)",
        value: "4:5"
      },
      {
        label_ar: "مربع (1:1)",
        label_en: "Square (1:1)",
        value: "1:1"
      }
    ]
  }
]
  }
};
