export const videoPrompts = {
  // 1. يوتيوب وثائقي
  youtube_documentary: {
    id: 'video_docu',
    title: 'يوتيوب وثائقي (Docu-Style)',
    description: 'إنتاج فيديوهات يوتيوب معمقة وقصصية',
    template: `Act as a professional YouTube Producer. Create a detailed production script for: \${idea}. 
    Goal: \${goal}. Structure: \${structure}. Tone: \${tone}. Pacing: \${pacing}. Visual Style: \${visualStyle}. 
    Include: Timestamped segments, B-roll suggestions, specific camera angles, and audio mood cues.`,
    questions: [
      { id: "goal", title_ar: "الهدف من الفيديو", title_en: "Core Goal", type: "select", options: [{ label_ar: "إلهام وتغيير رأي", label_en: "Inspire", value: "inspirational" }, { label_ar: "تعليم مهارة معقدة", label_en: "Educate", value: "skill-based" }] },
      { id: "structure", title_ar: "هيكلية السرد", title_en: "Structure", type: "select", options: [{ label_ar: "رحلة البطل", label_en: "Hero's Journey", value: "hero's journey" }, { label_ar: "تفكيك مشكلة", label_en: "Problem/Solution", value: "problem-solution" }] },
      { id: "tone", title_ar: "نبرة الصوت", title_en: "Tone", type: "select", options: [{ label_ar: "سلطوي وعلمي", label_en: "Authoritative", value: "authoritative" }, { label_ar: "ودود وقصصي", label_en: "Friendly", value: "conversational" }] },
      { id: "pacing", title_ar: "إيقاع الفيديو", title_en: "Pacing", type: "select", options: [{ label_ar: "سريع ومثير", label_en: "Fast", value: "high energy" }, { label_ar: "بطيء وتأملي", label_en: "Slow", value: "cinematic/deliberate" }] },
      { id: "visualStyle", title_ar: "النمط البصري", title_en: "Visual Style", type: "select", options: [{ label_ar: "واقعي سينمائي", label_en: "Cinematic", value: "filmic" }, { label_ar: "رسوم توضيحية", label_en: "Graphics", value: "motion graphics" }] }
    ]
  },

  // 2. فيديوهات قصيرة
  viral_short: {
    id: 'video_shorts',
    title: 'فيديوهات قصيرة (Reels/TikTok)',
    description: 'صناعة محتوى سريع الانتشار',
    template: `Create a 60s viral script for: \${idea}. Hook: \${hook}. Visual Style: \${visualStyle}. Pace: \${pacing}. Call to Action: \${cta}. Platform: \${platform}.`,
    questions: [
      { id: "hook", title_ar: "نوع الخطاف (البداية)", title_en: "Hook", type: "select", options: [{ label_ar: "سؤال صادم", label_en: "Shock", value: "provocative question" }, { label_ar: "نتيجة فورية", label_en: "Instant Result", value: "teaser of end result" }] },
      { id: "visualStyle", title_ar: "الأسلوب البصري", title_en: "Visual Style", type: "select", options: [{ label_ar: "عفوي (UGC)", label_en: "Raw UGC", value: "authentic handheld" }, { label_ar: "نصوص متحركة", title_en: "Typography", value: "kinetic typography" }] },
      { id: "pacing", title_ar: "سرعة القطع", title_en: "Pacing", type: "select", options: [{ label_ar: "خاطفة (Jump-cuts)", label_en: "Fast", value: "aggressive jump-cuts" }, { label_ar: "متزنة مع الموسيقى", label_en: "Rhythmic", value: "music-synced" }] },
      { id: "cta", title_ar: "الهدف من التفاعل", title_en: "CTA", type: "select", options: [{ label_ar: "متابعة", label_en: "Follow", value: "subscribe/follow" }, { label_ar: "رابط في البايو", label_en: "Link in bio", value: "conversion/click" }] },
      { id: "platform", title_ar: "المنصة", title_en: "Platform", type: "select", options: [{ label_ar: "TikTok", label_en: "TikTok", value: "TikTok trends" }, { label_ar: "Reels", label_en: "Reels", value: "Instagram Reels style" }] }
    ]
  },

  // 3. إعلان تجاري
  commercial_ad: {
    id: 'video_ads',
    title: 'إعلان تجاري (Commercial)',
    description: 'إعلانات احترافية تستهدف المبيعات',
    template: `Develop a high-conversion ad script for: \${idea}. Angle: \${angle}. Audience: \${audience}. Lighting: \${lighting}. Music: \${music}. Message: \${message}.`,
    questions: [
      { id: "angle", title_ar: "زاوية الإعلان", title_en: "Angle", type: "select", options: [{ label_ar: "عاطفي (Lifestyle)", label_en: "Emotional", value: "lifestyle-focused" }, { label_ar: "منطقي (Features)", label_en: "Rational", value: "feature-benefits" }] },
      { id: "audience", title_ar: "الجمهور", title_en: "Audience", type: "select", options: [{ label_ar: "شباب (Gen Z)", label_en: "Gen Z", value: "trendy/modern" }, { label_ar: "مهنيين", title_en: "Pros", value: "corporate/professional" }] },
      { id: "lighting", title_ar: "نمط الإضاءة", title_en: "Lighting", type: "select", options: [{ label_ar: "ساطعة", label_en: "Bright", value: "high-key studio" }, { label_ar: "درامية", title_en: "Moody", value: "low-key dramatic" }] },
      { id: "music", title_ar: "نمط الموسيقى", title_en: "Music", type: "select", options: [{ label_ar: "حماسية", label_en: "Upbeat", value: "energetic" }, { label_ar: "هادئة", title_en: "Minimal", value: "elegant/minimal" }] },
      { id: "message", title_ar: "الرسالة الرئيسية", title_en: "Key Message", type: "select", options: [{ label_ar: "الراحة", label_en: "Comfort", value: "solving pain points" }, { label_ar: "المكانة", title_en: "Status", value: "exclusivity" }] }
    ]
  },

  // 4. موشن جرافيك
  explainer_motion: {
    id: 'video_motion',
    title: 'موشن جرافيك (Explainer)',
    description: 'شرح معقد عبر الرسوم المتحركة',
    template: `Write an explainer script for: \${idea}. Complexity: \${complexity}. Style: \${style}. Focus: \${focus}. Palette: \${palette}. Voice: \${voice}.`,
    questions: [
      { id: "complexity", title_ar: "مستوى التعقيد", title_en: "Complexity", type: "select", options: [{ label_ar: "مبسط جداً", label_en: "Simple", value: "elementary" }, { label_ar: "تقني مفصل", label_en: "Technical", value: "technical/deep" }] },
      { id: "style", title_ar: "نمط الرسم", title_en: "Style", type: "select", options: [{ label_ar: "مسطح (2D)", label_en: "2D Flat", value: "clean 2D vector" }, { label_ar: "عمق (3D)", label_en: "3D", value: "immersive 3D" }] },
      { id: "focus", title_ar: "التركيز", title_en: "Focus", type: "select", options: [{ label_ar: "خطوات عمل", label_en: "Process", value: "workflow" }, { label_ar: "نتائج وإحصاء", label_en: "Data", value: "analytics" }] },
      { id: "palette", title_ar: "لوحة الألوان", title_en: "Colors", type: "select", options: [{ label_ar: "ألوان العلامة", label_en: "Brand", value: "brand-consistent" }, { label_ar: "ألوان متباينة", title_en: "High Contrast", value: "vibrant" }] },
      { id: "voice", title_ar: "طابع الصوت", title_en: "Voiceover", type: "select", options: [{ label_ar: "أنثوي هادئ", label_en: "Soft Female", value: "soft female VO" }, { label_ar: "رجولي حماسي", label_en: "Energetic Male", value: "energetic male VO" }] }
    ]
  },

  // 5. مقابلات وبودكاست
  interview_vlog: {
    id: 'video_interview',
    title: 'مقابلات / بودكاست',
    description: 'تحسين إعداد مقابلات',
    template: `Act as a Showrunner. Create a structure for an interview about: \${idea}. Goal: \${goal}. Format: \${format}. Setting: \${setting}. Depth: \${depth}. Questions Style: \${qStyle}.`,
    questions: [
      { id: "goal", title_ar: "الهدف", title_en: "Goal", type: "select", options: [{ label_ar: "تثقيف الجمهور", label_en: "Educate", value: "educational" }, { label_ar: "كشف أسرار", label_en: "Behind scenes", value: "in-depth insights" }] },
      { id: "format", title_ar: "تنسيق المقابلة", title_en: "Format", type: "select", options: [{ label_ar: "حوار صريح", label_en: "Direct", value: "Q&A" }, { label_ar: "نقاش تفاعلي", title_en: "Debate", value: "discussion" }] },
      { id: "setting", title_ar: "الديكور", title_en: "Setting", type: "select", options: [{ label_ar: "استوديو دافئ", label_en: "Warm", value: "warm cozy studio" }, { label_ar: "بيئة عمل", title_en: "Office", value: "professional office" }] },
      { id: "depth", title_ar: "عمق الحوار", title_en: "Depth", type: "select", options: [{ label_ar: "سريع", label_en: "Light", value: "quick overview" }, { label_ar: "فلسفي", title_en: "Deep", value: "deep dive" }] },
      { id: "qStyle", title_ar: "نمط الأسئلة", title_en: "Q Style", type: "select", options: [{ label_ar: "مفتوحة", label_en: "Open", value: "open-ended" }, { label_ar: "محددة", title_en: "Specific", value: "technical/focused" }] }
    ]
  },

  // 6. سينما وفن
  cinematic_art: {
    id: 'video_cinematic',
    title: 'سينما وفن (Cinematic)',
    description: 'فيديو يركز على الجمالية والسينما',
    template: `Write a cinematic visual script for: \${idea}. Mood: \${mood}. Palette: \${palette}. Camera: \${camera}. Rhythm: \${rhythm}. Theme: \${theme}.`,
    questions: [
      { id: "mood", title_ar: "الحالة", title_en: "Mood", type: "select", options: [{ label_ar: "غامضة", label_en: "Dark", value: "noir" }, { label_ar: "حالمة", title_en: "Dreamy", value: "ethereal" }] },
      { id: "palette", title_ar: "الألوان", title_en: "Colors", type: "select", options: [{ label_ar: "دافئة", label_en: "Warm", value: "gold/sunset" }, { label_ar: "باردة", title_en: "Cool", value: "blue/teal" }] },
      { id: "camera", title_ar: "زاوية الكاميرا", title_en: "Camera", type: "select", options: [{ label_ar: "بورتريه", label_en: "Portrait", value: "macro/tight" }, { label_ar: "واسعة", title_en: "Wide", value: "cinematic wide" }] },
      { id: "rhythm", title_ar: "الإيقاع", title_en: "Rhythm", type: "select", options: [{ label_ar: "بطيء", label_en: "Slow", value: "long shots" }, { label_ar: "سريع", title_en: "Fast", value: "rhythmic cuts" }] },
      { id: "theme", title_ar: "الموضوع الفني", title_en: "Theme", type: "select", options: [{ label_ar: "طبيعة", label_en: "Nature", value: "naturalistic" }, { label_ar: "حضرية", title_en: "Urban", value: "metropolis" }] }
    ]
  },

  // 7. درس تعليمي
  course_lecture: {
    id: 'video_course',
    title: 'درس تعليمي (Course)',
    description: 'هيكلة دورات تعليمية',
    template: `Develop a course script for: \${idea}. Level: \${level}. Visuals: \${visuals}. Activity: \${activity}. Duration: \${duration}. Assessment: \${test}.`,
    questions: [
      { id: "level", title_ar: "المستوى", title_en: "Level", type: "select", options: [{ label_ar: "مبتدئ", label_en: "Beginner", value: "foundational" }, { label_ar: "متقدم", title_en: "Advanced", value: "expert" }] },
      { id: "visuals", title_ar: "المساعد البصري", title_en: "Visuals", type: "select", options: [{ label_ar: "شرائح", label_en: "Slides", value: "slide deck" }, { label_ar: "تطبيق عملي", title_en: "Live", value: "screen-cast" }] },
      { id: "activity", title_ar: "التفاعل", title_en: "Activity", type: "select", options: [{ label_ar: "مثال", label_en: "Example", value: "case-study" }, { label_ar: "تمرين", title_en: "Exercise", value: "practical task" }] },
      { id: "duration", title_ar: "مدة الدرس", title_en: "Time", type: "select", options: [{ label_ar: "5 دقائق", label_en: "Short", value: "quick-hit" }, { label_ar: "20 دقيقة", title_en: "Long", value: "deep-dive" }] },
      { id: "test", title_ar: "قياس الاستيعاب", title_en: "Assessment", type: "select", options: [{ label_ar: "اختبار", label_en: "Quiz", value: "quiz" }, { label_ar: "مشروع", title_en: "Project", value: "assignment" }] }
    ]
  },

  // 8. تشويقي لحدث
  event_teaser: {
    id: 'video_event',
    title: 'تشويقي لحدث (Teaser)',
    description: 'فيديوهات حماسية',
    template: `Write a teaser script for: \${idea}. Music: \${music}. Pacing: \${pacing}. Key Reveal: \${reveal}. Energy: \${energy}. Goal: \${goal}.`,
    questions: [
      { id: "music", title_ar: "الموسيقى", title_en: "Music", type: "select", options: [{ label_ar: "صاخب", label_en: "Loud", value: "EDM" }, { label_ar: "سينمائي", title_en: "Epic", value: "orchestral" }] },
      { id: "pacing", title_ar: "الإيقاع", title_en: "Pacing", type: "select", options: [{ label_ar: "خاطف", label_en: "Flash", value: "super-fast" }, { label_ar: "متصاعد", title_en: "Build-up", value: "rhythmic build" }] },
      { id: "reveal", title_ar: "لحظة الكشف", title_en: "Reveal", type: "select", options: [{ label_ar: "مبكر", label_en: "Early", value: "instant reveal" }, { label_ar: "في النهاية", title_en: "End", value: "climax reveal" }] },
      { id: "energy", title_ar: "مستوى الطاقة", title_en: "Energy", type: "select", options: [{ label_ar: "عالي", label_en: "High", value: "hype" }, { label_ar: "مسيطر", title_en: "Dominant", value: "bold" }] },
      { id: "goal", title_ar: "الهدف", title_en: "Goal", type: "select", options: [{ label_ar: "تسجيل", label_en: "Register", value: "sign-ups" }, { label_ar: "وعي", title_en: "Awareness", value: "hype generation" }] }
    ]
  }
};