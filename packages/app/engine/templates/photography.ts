export const photographyPrompts = {
  // 1. التفرع الأول: بورتريه احترافي استوديو
  studio_portrait: {
    id: 'photography_studio_portrait',
    title: 'بورتريه استوديو احترافي',
    description: 'إضاءة استوديو ناعمة، تفاصيل بشرة فائقة، ومظهر تجاري راقي',
    template: `High-end professional studio portrait of \${idea}, \${lens}, \${filmStock}, \${lighting}, \${realism}, sharp focus, detailed skin texture, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "85mm (بورتريه مثالي وخلفية ناعمة)", label_en: "85mm Portrait", value: "shot on 85mm lens, creamy bokeh" },
          { label_ar: "50mm (عين مجردة طبيعية)", label_en: "50mm Prime", value: "shot on 50mm f/1.2 lens" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الحساس / الفيلم",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "Kodak Portra 400 (ألوان بشرة طبيعية)", label_en: "Kodak Portra 400", value: "Kodak Portra 400 film grain" },
          { label_ar: "ديجيتال حديث (Sony A7R)", label_en: "Modern Digital", value: "shot on Sony A7R IV, hyper realistic" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة",
        title_en: "Lighting Setup",
        type: "select",
        options: [
          { label_ar: "إضاءة استوديو سوفت بوكس ناعمة", label_en: "Softbox Studio", value: "softbox lighting, gentle shadows" },
          { label_ar: "إضاءة جانبية درامية", label_en: "Dramatic Side Light", value: "dramatic directional studio key light" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "واقعية فائقة مع تفاصيل المسام", label_en: "Hyper-Real", value: "hyper-realistic, skin pores, fine details" },
          { label_ar: "تعديل احترافي راقي (High-End Retouch)", label_en: "Pro Retouch", value: "professionally retouched, high-end finish" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه عمودي (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "كلاسيك (3:2)", label_en: "Classic (3:2)", value: "3:2" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: تصوير الشارع (Street Photography)
  street_photography: {
    id: 'photography_street',
    title: 'تصوير الشارع العفوي (Street)',
    description: 'لحظات خام واقعية، حركة عفوية، وأجواء المدن النابضة بالحياة',
    template: `Candid street photography of \${idea}, \${lens}, \${filmStock}, \${lighting}, \${realism}, raw moment, urban atmosphere --ar \${aspectRatio}`,
    questions: [
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "35mm (لقطة عريضة طبيعية للشارع)", label_en: "35mm Natural", value: "shot on 35mm street lens, f/2" },
          { label_ar: "50mm (منظور العين البشرية)", label_en: "50mm Prime", value: "shot on 50mm lens" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الفيلم",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "أبيض وأسود كلاسيكي (Tri-X 400)", label_en: "B&W Tri-X", value: "Kodak Tri-X 400 black and white film grain" },
          { label_ar: "Fujifilm Superia (ألوان عتيقة)", label_en: "Fujifilm Superia", value: "Fujifilm Superia aesthetic" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة والظروف",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء شمس الغسق (Blue Hour)", label_en: "Blue Hour", value: "cool blue hour twilight urban lighting" },
          { label_ar: "إضاءة فلاش شارع حادة", label_en: "Hard Flash", value: "direct flash photography, high contrast night street" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "خام وغير معدل (Raw & Unedited)", label_en: "Raw", value: "raw photo, unedited, realistic imperfections" },
          { label_ar: "واقعية شارع سينمائية", label_en: "Cinematic Street", value: "gritty realistic street details, cinematic contrast" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "كلاسيك أفقي (3:2)", label_en: "Classic (3:2)", value: "3:2" },
          { label_ar: "مربع فني (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: ناشونال جيوغرافيك (طبيعة وسفر)
  documentary_nature: {
    id: 'photography_natgeo',
    title: 'ناشونال جيوغرافيك (طبيعة وسفر)',
    description: 'مناظر طبيعية خلابة، توثيق حيوي، وإضاءة شمس طبيعية ساحرة',
    template: `National Geographic documentary travel photography of \${idea}, \${lens}, \${filmStock}, \${lighting}, \${realism}, pristine details, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "24mm (زاوية واسعة للمناظر)", label_en: "24mm Wide", value: "shot on 24mm wide angle landscape lens" },
          { label_ar: "عدسة تقريب طبيعية (Telephoto)", label_en: "Telephoto", value: "telephoto nature lens, compressed perspective" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الحساس",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "ديجيتال فائق الدقة (Sony A7R)", label_en: "Modern Digital", value: "shot on high-end digital sensor, sharp details" },
          { label_ar: "ألوان وثائقية غنية", label_en: "Rich Documentary", value: "vibrant documentary color profile" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة الطبيعية",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء الشمس الذهبي (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour natural light, long shadows" },
          { label_ar: "ضوء ناصع وواضح النهار", label_en: "Bright Daylight", value: "crisp bright daylight, high visibility" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "واقعية فائقة ونقية", label_en: "Hyper-Real", value: "hyper-realistic, crystal clear details, sharp focus" },
          { label_ar: "طبيعي وثائقي نقي", label_en: "Natural Doc", value: "authentic documentary look" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بانوراما عريضة (16:9)", label_en: "Panorama (16:9)", value: "16:9" },
          { label_ar: "كلاسيك (3:2)", label_en: "Classic (3:2)", value: "3:2" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: تصوير ماكرو تفصيلي (Macro)
  macro_photography: {
    id: 'photography_macro',
    title: 'تصوير ماكرو تفصيلي (Macro)',
    description: 'تفاصيل دقيقة جداً للأشياء الصغيرة، الحشرات، أو الأنسجة القريبة',
    template: `Extreme macro photography of \${idea}, \${lens}, \${filmStock}, \${lighting}, \${realism}, micro-textures, hyper detailed, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "عدسة ماكرو 100mm متخصصة", label_en: "100mm Macro Lens", value: "100mm macro lens, extreme close-up" },
          { label_ar: "عدسة ماكرو فائقة التقريب", label_en: "Super Macro", value: "super macro lens with shallow depth of field" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الحساس",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "حساس ديجيتال نقي فائق الدقة", label_en: "High-Res Digital", value: "ultra-sharp high resolution digital sensor" },
          { label_ar: "فلم عالي التباين", label_en: "High Contrast Film", value: "fine grain macro film stock" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة حلقية ناعمة (Ring Light)", label_en: "Ring Light", value: "macro ring light, even shadowless illumination" },
          { label_ar: "ضوء جانبي لإبراز الملمس", label_en: "Side Texture Light", value: "directional side lighting highlighting micro-textures" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "تفاصيل مجهرية فائقة الوضوح", label_en: "Micro Details", value: "microscopic details, hyper-realistic textures" },
          { label_ar: "عمق ميدان ضحل وساحر", label_en: "Shallow Depth", value: "extremely shallow depth of field, artistic blur" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع متوازن (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "قياسي (3:2)", label_en: "Standard (3:2)", value: "3:2" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: تصوير تجاري وأزياء (Vogue / Commercial)
  commercial_fashion: {
    id: 'photography_fashion',
    title: 'تصوير أزياء وتجاري (Vogue)',
    description: 'إضاءة أزياء عالمية، أناقة مجلة فوغ، وتصميم بصري فاخر',
    template: `Vogue high-fashion editorial commercial photography of \${idea}, \${lens}, \${filmStock}, \${lighting}, \${realism}, high-end magazine style, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "85mm (عزل أنيق للبورتريه التجاري)", label_en: "85mm Portrait", value: "shot on 85mm fashion lens" },
          { label_ar: "35mm (تكوين مجلات الأزياء الواسع)", label_en: "35mm Editorial", value: "shot on 35mm editorial lens" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الحساس / الفيلم",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "بولارويد فني (Polaroid)", label_en: "Polaroid", value: "vintage polaroid fashion style, instant film" },
          { label_ar: "ديجيتال استوديو فائق النقاء", label_en: "Studio Digital", value: "commercial digital studio sensor, flawless grade" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة التجارية",
        title_en: "Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة استوديو أزياء قوية وحادة", label_en: "Hard Fashion Studio", value: "high-fashion studio strobe lighting, sharp contrast" },
          { label_ar: "ضوء نافذة طبيعي فاخر", label_en: "Luxury Window Light", value: "soft directional luxury window light" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية والمظهر",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "مظهر مجلات أزياء عالمية (Editorial)", label_en: "Editorial Grade", value: "high-end editorial retouch, cinematic fashion grade" },
          { label_ar: "واقعية تجارية نظيفة", label_en: "Clean Commercial", value: "clean commercial finish, sharp and polished" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه طولي لمجلات الأزياء (4:5)", label_en: "Editorial Portrait (4:5)", value: "4:5" },
          { label_ar: "عريض سينمائي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  }
};