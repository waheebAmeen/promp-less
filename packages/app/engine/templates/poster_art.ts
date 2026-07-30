export const poster_artPrompts = {
  default: {
    id: 'poster_art_default',
    title: 'بوسترات وفن (افتراضي)',
    description: 'التدفق الأساسي لـ بوسترات وفن',
    template: `High-impact graphic design key art poster of \${idea}, \${artStyle}, \${compositionLayout}, \${colorPalette}, \${textureFinish}, typography space, masterpiece artwork, award-winning poster design, 8k --ar \${aspectRatio}`,
    questions: [
  {
    id: "artStyle",
    title_ar: "الأسلوب الفني للبوستر",
    title_en: "Poster Art Style",
    type: "select",
    options: [
      {
        label_ar: "بوستر فيلم سينمائي هوليودي",
        label_en: "Hollywood Movie Key Art",
        value: "blockbuster movie key art poster style, dramatic scale"
      },
      {
        label_ar: "فن السايبربانك ونيون ريترو",
        label_en: "Cyberpunk Synthwave",
        value: "retro 1980s synthwave cyberpunk aesthetic, neon neon vector lineart"
      },
      {
        label_ar: "تقليل ومينيماليزم فاخر",
        label_en: "Minimalist Graphic",
        value: "Swiss minimalist graphic design poster, bold geometric forms"
      },
      {
        label_ar: "فن فنتازيا وأسطوري (Dark Fantasy)",
        label_en: "Dark Fantasy Epic",
        value: "epic dark fantasy oil painting poster, intricate detail"
      },
      {
        label_ar: "فن البوب ارت والكوميكس",
        label_en: "Pop Art & Comic",
        value: "bold halftone dot pop art comic book cover aesthetic"
      }
    ]
  },
  {
    id: "compositionLayout",
    title_ar: "تكوين البوستر وتوزيع العناصر",
    title_en: "Poster Layout Composition",
    type: "select",
    options: [
      {
        label_ar: "تكوين مركزي ضخم (Central Hero)",
        label_en: "Central Hero",
        value: "towering central hero subject with symmetric visual hierarchy"
      },
      {
        label_ar: "تداخل طبقات متعددة (Collage Layers)",
        label_en: "Layered Montage",
        value: "cinematic montage layout with blended double exposure elements"
      },
      {
        label_ar: "تأطير هندسي جرافيكي",
        label_en: "Geometric Framing",
        value: "bold diagonal framing lines, structured grid layout"
      }
    ]
  },
  {
    id: "colorPalette",
    title_ar: "لوحة الألوان المعتمدة",
    title_en: "Color Palette",
    type: "select",
    options: [
      {
        label_ar: "أحمر وأسود درامي (High Contrast)",
        label_en: "Dramatic Red & Black",
        value: "intense crimson red and obsidian black palette"
      },
      {
        label_ar: "تيل وأورانج سينمائي (Teal & Amber)",
        label_en: "Teal & Amber",
        value: "deep cyan teal and glowing amber orange contrast"
      },
      {
        label_ar: "ألوان ميتاليك وذهب فاخر",
        label_en: "Metallic Gold & Charcoal",
        value: "luxurious metallic gold leaf accents on dark charcoal background"
      }
    ]
  },
  {
    id: "textureFinish",
    title_ar: "ملمس وتأثير الورق/الطباعة",
    title_en: "Texture & Print Finish",
    type: "select",
    options: [
      {
        label_ar: "ورق بوستر قديم مطوي (Folded Vintage Paper)",
        label_en: "Vintage Folded Paper",
        value: "subtle folded paper creases and screenprint texture"
      },
      {
        label_ar: "طباعة غلوس حديثة نقية",
        label_en: "Modern Gloss Print",
        value: "ultra clean glossy print quality, sharp edges"
      },
      {
        label_ar: "تأثير جرانج وحبيبات غبار",
        label_en: "Grunge Noise Grain",
        value: "heavy film grain, subtle grunge dust and distressed texture"
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
        label_ar: "أبعاد بوستر كلاسيكي (2:3)",
        label_en: "Classic Poster (2:3)",
        value: "2:3"
      },
      {
        label_ar: "أبعاد سينما (16:9)",
        label_en: "Widescreen Banner (16:9)",
        value: "16:9"
      },
      {
        label_ar: "غلاف ألبوم مربع (1:1)",
        label_en: "Album Cover (1:1)",
        value: "1:1"
      }
    ]
  }
]
  }
};
