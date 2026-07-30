export const photographyPrompts = {
  default: {
    id: 'photography_default',
    title: 'فوتوغراف (افتراضي)',
    description: 'التدفق الأساسي لـ فوتوغراف',
    template: `Professional photography of \${idea}, \${style}, \${lens}, \${filmStock}, \${lighting}, \${realism}, high resolution, sharp focus, 8k, detailed skin texture --ar \${aspectRatio}`,
    questions: [
  {
    id: "style",
    title_ar: "نمط التصوير",
    title_en: "Photography Style",
    type: "select",
    options: [
      {
        label_ar: "ناشونال جيوغرافيك",
        label_en: "National Geographic",
        value: "National Geographic documentary style"
      },
      {
        label_ar: "تصوير أزياء (Vogue)",
        label_en: "Fashion (Vogue)",
        value: "Vogue high-fashion editorial photography"
      },
      {
        label_ar: "تصوير شارع",
        label_en: "Street Photography",
        value: "candid street photography, raw moment"
      },
      {
        label_ar: "ماكرو (Micro)",
        label_en: "Macro",
        value: "extreme macro photography, hyper detailed"
      },
      {
        label_ar: "بورتريه استوديو",
        label_en: "Studio Portrait",
        value: "professional studio portrait, clean background"
      }
    ]
  },
  {
    id: "lens",
    title_ar: "نوع العدسة",
    title_en: "Lens Choice",
    type: "select",
    options: [
      {
        label_ar: "35mm (لقطة طبيعية)",
        label_en: "35mm (Natural)",
        value: "shot on 35mm lens, f/1.8"
      },
      {
        label_ar: "85mm (بورتريه)",
        label_en: "85mm (Portrait)",
        value: "shot on 85mm lens, creamy bokeh"
      },
      {
        label_ar: "24mm (زاوية واسعة)",
        label_en: "24mm (Wide Angle)",
        value: "shot on 24mm wide angle lens"
      },
      {
        label_ar: "50mm (عين مجردة)",
        label_en: "50mm (Prime)",
        value: "shot on 50mm f/1.2 lens"
      },
      {
        label_ar: "عدسة ماكرو",
        label_en: "Macro Lens",
        value: "100mm macro lens, extreme detail"
      }
    ]
  },
  {
    id: "filmStock",
    title_ar: "نوع الفيلم / الحساس",
    title_en: "Film Stock",
    type: "select",
    options: [
      {
        label_ar: "Kodak Portra 400",
        label_en: "Kodak Portra 400",
        value: "Kodak Portra 400 film grain"
      },
      {
        label_ar: "Fujifilm Superia",
        label_en: "Fujifilm Superia",
        value: "Fujifilm Superia aesthetic"
      },
      {
        label_ar: "أبيض وأسود (Tri-X)",
        label_en: "Black & White (Tri-X)",
        value: "Kodak Tri-X 400 black and white film"
      },
      {
        label_ar: "ديجيتال حديث (Sony A7R)",
        label_en: "Modern Digital",
        value: "shot on Sony A7R IV, hyper realistic"
      },
      {
        label_ar: "بولارويد (Polaroid)",
        label_en: "Polaroid",
        value: "vintage polaroid style, instant film"
      }
    ]
  },
  {
    id: "lighting",
    title_ar: "الإضاءة",
    title_en: "Lighting Setup",
    type: "select",
    options: [
      {
        label_ar: "ضوء الشمس الذهبي",
        label_en: "Golden Hour",
        value: "warm golden hour natural light"
      },
      {
        label_ar: "إضاءة استوديو ناعمة",
        label_en: "Softbox Studio",
        value: "softbox lighting, gentle shadows"
      },
      {
        label_ar: "ضوء النافذة",
        label_en: "Window Light",
        value: "natural window light, directional"
      },
      {
        label_ar: "إضاءة فلاش حادة",
        label_en: "Hard Flash",
        value: "direct flash photography, high contrast"
      },
      {
        label_ar: "إضاءة الغسق (Blue Hour)",
        label_en: "Blue Hour",
        value: "cool blue hour twilight lighting"
      }
    ]
  },
  {
    id: "realism",
    title_ar: "مستوى الواقعية",
    title_en: "Realism Level",
    type: "select",
    options: [
      {
        label_ar: "واقعية فائقة (Hyper-Real)",
        label_en: "Hyper-Realistic",
        value: "hyper-realistic, skin pores, fine details"
      },
      {
        label_ar: "خام (Raw)",
        label_en: "Raw & Unedited",
        value: "raw photo, unedited, realistic imperfections"
      },
      {
        label_ar: "تعديل احترافي",
        label_en: "Pro Retouch",
        value: "professionally retouched, high-end finish"
      },
      {
        label_ar: "سينمائي ناعم",
        label_en: "Cinematic Softness",
        value: "soft cinematic glow, ethereal realism"
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
        label_ar: "3:2 (كلاسيك)",
        label_en: "3:2 (Classic)",
        value: "3:2"
      },
      {
        label_ar: "بورتريه (4:5)",
        label_en: "Portrait (4:5)",
        value: "4:5"
      },
      {
        label_ar: "مربع (1:1)",
        label_en: "Square (1:1)",
        value: "1:1"
      },
      {
        label_ar: "بانوراما (16:9)",
        label_en: "Panorama (16:9)",
        value: "16:9"
      }
    ]
  }
]
  }
};
