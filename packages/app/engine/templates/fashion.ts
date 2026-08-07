export const fashionPrompts = {
  // 1. التفرع الأول: أزياء راقية (Haute Couture)
  haute_couture: {
    id: 'fashion_haute_couture',
    title: 'أزياء راقية (Haute Couture)',
    description: 'تصاميم فساتين عروض الأزياء الراقية والدرجة الأولى بجودة مجلات الموضة',
    template: `High-fashion editorial photography of \${idea}, avant-garde haute couture fashion gown, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, Vogue aesthetic, sharp focus, 8k, detailed clothing texture --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "خامة القماش الفاخرة",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "حرير لامع وساتان منساب", label_en: "Flowing Silk", value: "lustrous flowing silk and satin reflection" },
          { label_ar: "تطريز ذهبي يدوي دقيق", label_en: "Gold Embroidery", value: "intricate hand-stitched gold metallic thread embroidery" }
        ]
      },
      {
        id: "setting",
        title_ar: "مكان التصوير",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "استوديو باريس بياض كلي", label_en: "Parisian Studio", value: "inside a minimalist high-ceiling Parisian studio" },
          { label_ar: "قصر تاريخي فخم", label_en: "Historic Palace", value: "inside a grand European historic palace hall" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة الاستوديو",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة غلاف مجلة (Softbox)", label_en: "Softbox", value: "flattering high-key softbox cover lighting" },
          { label_ar: "إضاءة سينمائية مظلمة (Moody)", label_en: "Moody Cinematic", value: "moody cinematic rim lighting with deep shadows" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارض/العارضة",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "وقفة قوة واثقة (Power Pose)", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" },
          { label_ar: "استرخاء فني عصري", label_en: "Artistic Relaxed", value: "artistic relaxed seating pose, elegant posture" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة بورتريه عازلة (85mm)", label_en: "85mm Lens", value: "shot on 85mm f/1.4 lens, creamy bokeh background" },
          { label_ar: "عدسة عريضة (35mm)", label_en: "35mm Lens", value: "shot on 35mm editorial fashion lens, sharp depth of field" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "غلاف مجلة طولي (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "قصص (9:16)", label_en: "Story (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 2. التفرع الثاني: ستريت وير فاخر (Luxury Streetwear)
  luxury_streetwear: {
    id: 'fashion_streetwear',
    title: 'ستريت وير فاخر (Luxury Streetwear)',
    description: 'ملابس الشارع العصرية ذات العلامات التجارية الفاخرة والطابع الحضري',
    template: `High-fashion urban editorial photography of \${idea}, oversized high-end luxury streetwear outfit, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, modern streetwear aesthetic, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "خامة الملابس",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "جلد مصقول عالي الجودة", label_en: "Polished Leather", value: "sleek polished leather with specular highlights" },
          { label_ar: "خامات قطنية ثقيلة ومطرزة", label_en: "Heavy Cotton", value: "heavyweight textured cotton blend with distinct branding" }
        ]
      },
      {
        id: "setting",
        title_ar: "مكان التصوير الحضري",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "شوارع مدينة عصرية ليلاً (Neon)", label_en: "City Night", value: "urban neon-lit metropolis street at night with bokeh" },
          { label_ar: "مدرج عرض أزياء ضبابي (Runway)", label_en: "Runway", value: "walking down a foggy lit fashion runway" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة الشارع",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "ظلال حادة درامية (Hard Shadows)", label_en: "Hard Shadows", value: "harsh sun direct shadow play, high contrast" },
          { label_ar: "إضاءة سينمائية مظلمة (Moody)", label_en: "Moody Cinematic", value: "moody cinematic rim lighting with deep shadows" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارض",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "حركة ديناميكية أثناء المشي", label_en: "Dynamic Walk", value: "striding forward dynamically, flowing outfit movement" },
          { label_ar: "وقفة قوة واثقة", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة عريضة لكامل الجسم (35mm)", label_en: "35mm Lens", value: "shot on 35mm editorial fashion lens, sharp depth of field" },
          { label_ar: "لقطة واسعة تظهر المكان (Wide)", label_en: "Wide Shot", value: "cinematic wide-angle environmental fashion shot" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "طولي كامل للقصص (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },

  // 3. التفرع الثالث: تصميم أدنى (Minimalist Chic)
  minimalist_chic: {
    id: 'fashion_minimalist',
    title: 'تصميم أدنى وبسيط (Minimalist Chic)',
    description: 'أزياء ناعمة وخطوط مفصلة بعناية تعكس البساطة والرفاهية الصامتة',
    template: `Clean minimalist fashion editorial photography of \${idea}, sleek minimalist silk suit, tailored lines, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, quiet luxury aesthetic, sharp focus, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "خامة النسيج الهادئ",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "حرير ناعم ومطفي", label_en: "Matte Silk", value: "smooth matte silk with subtle draping" },
          { label_ar: "تويد كلاسيكي فاخر خفيف", label_en: "Light Tweed", value: "luxurious textured wool tweed fabric" }
        ]
      },
      {
        id: "setting",
        title_ar: "مكان التصوير النظيف",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "استوديو باريس بياض كلي وبسيط", label_en: "Parisian Studio", value: "inside a minimalist high-ceiling Parisian studio" },
          { label_ar: "معمار أوروبي كلاسيكي ناصع", label_en: "Classic Architecture", value: "against classical marble column architecture" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة ناعمة",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة غلاف مجلة ناعمة (Softbox)", label_en: "Softbox", value: "flattering high-key softbox cover lighting" },
          { label_ar: "ضوء شمس العصر الدافئ (Golden Hour)", label_en: "Golden Hour", value: "warm golden sunlight casting artistic shadows" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارض/العارضة",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "استرخاء فني عصري هادئ", label_en: "Artistic Relaxed", value: "artistic relaxed seating pose, elegant posture" },
          { label_ar: "لقطة مقربة للوجه والجمال الهادئ", label_en: "Beauty Portrait", value: "intimate beauty portrait focusing on makeup and jewelry detail" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة بورتريه عازلة (85mm)", label_en: "85mm Lens", value: "shot on 85mm f/1.4 lens, creamy bokeh background" },
          { label_ar: "عدسة عريضة (35mm)", label_en: "35mm Lens", value: "shot on 35mm editorial fashion lens, sharp depth of field" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "غلاف مجلة طولي (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "عرضي سينمائي (16:9)", label_en: "Landscape (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 4. التفرع الرابع: فخامة عربية معاصرة (Modern Arabian Luxury)
  arabian_luxury: {
    id: 'fashion_arabian',
    title: 'فخامة عربية معاصرة (Modern Arabian Luxury)',
    description: 'عباءات ملكية وتصميمات عربية معاصرة بلمسات فاخرة وأجواء ساحرة',
    template: `Luxury Arabian fashion editorial photography of \${idea}, royal embroidered silk abaya, modern Arabian elegance, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, high-end Middle Eastern fashion, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "الخامات والتطريز",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "مخمل ثقيل فاخر مع تطريز ذهبي", label_en: "Velvet & Gold", value: "rich deep-toned heavy velvet texture with intricate hand-stitched gold metallic thread" },
          { label_ar: "دانتيل شفاف راقي وحرير منساب", label_en: "Lace & Silk", value: "delicate sheer lace and lustrous flowing silk reflection" }
        ]
      },
      {
        id: "setting",
        title_ar: "الموقع الجغرافي المعاصر",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "طبيعة صحراوية راقية عند الغروب", label_en: "Desert Sunset", value: "surrounded by golden desert sand dunes at sunset" },
          { label_ar: "قصر تاريخي فخم بلمسات شرقية", label_en: "Historic Palace", value: "inside a grand European historic palace hall with rich architecture" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة صحراوية/ملكية",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء شمس العصر الدافئ (Golden Hour)", label_en: "Golden Hour", value: "warm golden sunlight casting artistic shadows" },
          { label_ar: "إضاءة سينمائية دافئة", label_en: "Cinematic Warm", value: "moody cinematic rim lighting with deep warm tones" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارضة",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "وقفة قوة واثقة وساحرة", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" },
          { label_ar: "لقطة مقربة للوجه وتفاصيل التطريز", label_en: "Close-up", value: "intimate beauty portrait focusing on makeup and jewelry detail" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة بورتريه عازلة (85mm)", label_en: "85mm Lens", value: "shot on 85mm f/1.4 lens, creamy bokeh background" },
          { label_ar: "لقطة واسعة تظهر جمال المكان (Wide)", label_en: "Wide Shot", value: "cinematic wide-angle environmental fashion shot" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "غلاف مجلة طولي (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "قصص (9:16)", label_en: "Story (9:16)", value: "9:16" }
        ]
      }
    ]
  },

  // 5. التفرع الخامس: ستايل فينتج كلاسيك (Vintage Classic)
  vintage_classic: {
    id: 'fashion_vintage',
    title: 'ستايل فينتج كلاسيك (Vintage Classic)',
    description: 'أزياء مستوحاة من حقب الماضي الكلاسيكية بلمسة جمالية عتيقة وساحرة',
    template: `Vintage editorial fashion photography of \${idea}, 1970s retro glam fashion ensemble, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, retro aesthetic, film grain, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "خامات الفينتج",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "مخمل ثقيل فاخر عتيق", label_en: "Heavy Velvet", value: "rich deep-toned heavy velvet texture" },
          { label_ar: "دانتيل شفاف راقي كلاسيكي", label_en: "Fine Lace", value: "delicate sheer lace with intricate vintage patterns" }
        ]
      },
      {
        id: "setting",
        title_ar: "موقع التصوير الكلاسيكي",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "قصر تاريخي فخم بعراقة قديمة", label_en: "Historic Palace", value: "inside a grand European historic palace hall" },
          { label_ar: "معمار أوروبي كلاسيكي عتيق", label_en: "Classic Architecture", value: "against classical marble column architecture" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة فينتج دافئة",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "ضوء شمس العصر الدافئ (Golden Hour)", label_en: "Golden Hour", value: "warm golden sunlight casting artistic shadows" },
          { label_ar: "ظلال حادة درامية كلاسيكية", label_en: "Hard Shadows", value: "harsh sun direct shadow play, high contrast vintage feel" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارض",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "استرخاء فني عصري ريترو", label_en: "Artistic Relaxed", value: "artistic relaxed seating pose, elegant posture" },
          { label_ar: "وقفة قوة واثقة كلاسيكية", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة بورتريه عازلة (85mm)", label_en: "85mm Lens", value: "shot on 85mm f/1.4 lens, creamy bokeh background" },
          { label_ar: "عدسة عريضة (35mm)", label_en: "35mm Lens", value: "shot on 35mm editorial fashion lens, sharp depth of field" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "عرضي سينمائي (16:9)", label_en: "Landscape (16:9)", value: "16:9" }
        ]
      }
    ]
  },

  // 6. التفرع السادس: أزياء رياضية راقية (Athleisure)
  luxury_athleisure: {
    id: 'fashion_athleisure',
    title: 'أزياء رياضية راقية (Luxury Athleisure)',
    description: 'دمج الأناقة الرفيعة مع الملابس الرياضية المريحة لإطلالات عصرية ديناميكية',
    template: `High-fashion athletic editorial photography of \${idea}, high-end designer athletic wear, sophisticated sporty look, \${fabricTexture}, \${setting}, \${lighting}, \${modelPose}, \${cameraLens}, modern sportswear aesthetic, 8k --ar \${aspectRatio}`,
    questions: [
      {
        id: "fabricTexture",
        title_ar: "الخامات الرياضية الفاخرة",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "أقمشة تقنية مرنة وعالية الجودة", label_en: "Performance Fabric", value: "sleek technical performance fabric with matte finish" },
          { label_ar: "جلد مصقول عالي الجودة خفيف", label_en: "Polished Leather Accents", value: "sleek polished leather accents with specular highlights" }
        ]
      },
      {
        id: "setting",
        title_ar: "موقع التصوير الرياضي",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "مدرج عرض أزياء ضبابي بتصميم رياضي", label_en: "Runway", value: "walking down a foggy lit fashion runway" },
          { label_ar: "شوارع مدينة عصرية ليلاً", label_en: "City Night", value: "urban neon-lit metropolis street at night with bokeh" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة حيوية",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة غلاف مجلة ساطعة (Softbox)", label_en: "Softbox", value: "flattering high-key softbox cover lighting" },
          { label_ar: "ظلال حادة درامية", label_en: "Hard Shadows", value: "harsh sun direct shadow play, high contrast" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة الحركة الرياضية",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "حركة ديناميكية أثناء المشي السريع", label_en: "Dynamic Walk", value: "striding forward dynamically, flowing outfit movement" },
          { label_ar: "وقفة قوة واثقة", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" }
        ]
      },
      {
        id: "cameraLens",
        title_ar: "العدسة",
        title_en: "Camera & Lens",
        type: "select",
        options: [
          { label_ar: "عدسة عريضة لكامل الجسم (35mm)", label_en: "35mm Lens", value: "shot on 35mm editorial fashion lens, sharp depth of field" },
          { label_ar: "عدسة بورتريه عازلة (85mm)", label_en: "85mm Lens", value: "shot on 85mm f/1.4 lens, creamy bokeh background" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "طولي كامل للقصص (9:16)", label_en: "Story (9:16)", value: "9:16" },
          { label_ar: "غلاف مجلة طولي (4:5)", label_en: "Portrait (4:5)", value: "4:5" }
        ]
      }
    ]
  }
};