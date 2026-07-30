export const charactersPrompts = {
  default: {
    id: 'characters_default',
    title: 'شخصيات (افتراضي)',
    description: 'التدفق الأساسي لـ شخصيات',
    template: `Full body shot of \${idea}, \${ethnicity}, \${clothing}, \${expression}, \${pose}, \${background}, \${lighting}, \${rendering}, hyper-detailed, masterpiece, 8k --ar \${aspectRatio}`,
    questions: [
  {
    id: "ethnicity",
    title_ar: "العرق / الملامح",
    title_en: "Ethnicity / Features",
    type: "select",
    options: [
      {
        label_ar: "ملامح عربية (خليجية)",
        label_en: "Arabic (Khaleeji)",
        value: "Middle Eastern Arabic features, Khaleeji style"
      },
      {
        label_ar: "ملامح أوروبية",
        label_en: "European",
        value: "European Caucasian features"
      },
      {
        label_ar: "ملامح شرق آسيوية",
        label_en: "East Asian",
        value: "East Asian features"
      },
      {
        label_ar: "ملامح أفريقية",
        label_en: "African",
        value: "African descent features"
      },
      {
        label_ar: "ملامح لاتينية",
        label_en: "Latino",
        value: "Latino Hispanic features"
      }
    ]
  },
  {
    id: "clothing",
    title_ar: "الملابس والستايل",
    title_en: "Clothing & Style",
    type: "select",
    options: [
      {
        label_ar: "أزياء فاخرة (Luxury)",
        label_en: "High-End Luxury",
        value: "wearing high-end luxury designer clothing"
      },
      {
        label_ar: "لباس تقليدي (ثوب/بشت)",
        label_en: "Traditional (Thobe)",
        value: "wearing traditional elegant Arabic thobe and bisht"
      },
      {
        label_ar: "سايبربانك (Cyberpunk)",
        label_en: "Cyberpunk Tech",
        value: "wearing futuristic cyberpunk techwear"
      },
      {
        label_ar: "ملابس كاجوال عصرية",
        label_en: "Modern Casual",
        value: "wearing stylish modern casual streetwear"
      },
      {
        label_ar: "بدلة رسمية فاخرة",
        label_en: "Formal Suit",
        value: "wearing a bespoke luxury tailored suit"
      }
    ]
  },
  {
    id: "expression",
    title_ar: "تعبيرات الوجه",
    title_en: "Facial Expression",
    type: "select",
    options: [
      {
        label_ar: "ابتسامة خفيفة واثقة",
        label_en: "Confident Smile",
        value: "subtle confident smile, looking at camera"
      },
      {
        label_ar: "نظرة جادة حادة",
        label_en: "Serious/Intense",
        value: "intense serious gaze, powerful expression"
      },
      {
        label_ar: "نظرة هادئة متأملة",
        label_en: "Calm/Thoughtful",
        value: "calm thoughtful expression, looking away"
      },
      {
        label_ar: "مندهش",
        label_en: "Surprised",
        value: "expression of awe and surprise"
      }
    ]
  },
  {
    id: "background",
    title_ar: "الخلفية / المكان",
    title_en: "Background Environment",
    type: "select",
    options: [
      {
        label_ar: "مدينة مستقبلية",
        label_en: "Future City",
        value: "in a futuristic neon city street at night"
      },
      {
        label_ar: "مجلس عربي فاخر",
        label_en: "Luxury Majlis",
        value: "inside a luxurious modern Arabic majlis"
      },
      {
        label_ar: "مكتب عصري",
        label_en: "Modern Office",
        value: "in a high-end minimalist corporate office"
      },
      {
        label_ar: "طبيعة خلابة",
        label_en: "Nature",
        value: "standing in a serene natural landscape"
      },
      {
        label_ar: "استوديو احترافي",
        label_en: "Pro Studio",
        value: "solid professional studio background"
      }
    ]
  },
  {
    id: "rendering",
    title_ar: "أسلوب العرض",
    title_en: "Rendering Style",
    type: "select",
    options: [
      {
        label_ar: "واقعي جداً",
        label_en: "Photorealistic",
        value: "unreal engine 5 render, photorealistic, path tracing"
      },
      {
        label_ar: "ثري دي (Pixar Style)",
        label_en: "3D Animation",
        value: "stylized 3D character design, Disney Pixar style"
      },
      {
        label_ar: "أنمي احترافي",
        label_en: "High-end Anime",
        value: "detailed anime illustration, Makoto Shinkai style"
      },
      {
        label_ar: "رسم رقمي (Concept Art)",
        label_en: "Concept Art",
        value: "masterpiece digital concept art, detailed brushwork"
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
        label_ar: "بورتريه (9:16)",
        label_en: "Portrait (9:16)",
        value: "9:16"
      },
      {
        label_ar: "طولي (2:3)",
        label_en: "Tall (2:3)",
        value: "2:3"
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
