export const videoPrompts = {
  default: {
    id: 'video_default',
    title: 'الفيديوهات (افتراضي)',
    description: 'التدفق الأساسي لـ الفيديوهات',
    template: `Create a complete video storyboard and script prompt for \${idea}. Video Format: \${format}, Visual Aesthetic: \${visualStyle}, Pace: \${pacing}. Detailed scene-by-scene instructions with visual prompts.`,
    questions: [
  {
    id: "format",
    title_ar: "نوع وقالب الفيديو",
    title_en: "Video Format",
    type: "select",
    options: [
      {
        label_ar: "فيديو يوتيوب كامل (Full YouTube Video)",
        label_en: "Full Length YouTube",
        value: "full length structured YouTube video with intro and timestamps"
      },
      {
        label_ar: "فيديو قصير (Reels / Shorts / TikTok)",
        label_en: "Short Form Reels/TikTok",
        value: "viral 60-second vertical short video with fast hook"
      },
      {
        label_ar: "فيديو توضيحي / إعلاني (Explainer)",
        label_en: "Commercial Explainer",
        value: "sleek commercial explainer video concept"
      }
    ]
  },
  {
    id: "visualStyle",
    title_ar: "النمط البصري للفيديو",
    title_en: "Visual Aesthetic",
    type: "select",
    options: [
      {
        label_ar: "سينمائي عالي الجودة (Cinematic 4K)",
        label_en: "Cinematic 4K",
        value: "cinematic camera angles, filmic color grade, atmospheric lighting"
      },
      {
        label_ar: "موشن جرافيك / ثري دي (3D Motion Graphics)",
        label_en: "3D Motion Graphics",
        value: "modern 3D animation, sleek motion typography"
      },
      {
        label_ar: "توجيه تصوير شخصي (Vlog / Face-Cam)",
        label_en: "Vlog / Creator Style",
        value: "authentic creator vlog style, dynamic jump cuts"
      }
    ]
  }
]
  }
};
