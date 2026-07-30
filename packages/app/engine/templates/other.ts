export const otherPrompts = {
  default: {
    id: 'other_default',
    title: 'أخرى (افتراضي)',
    description: 'التدفق الأساسي لـ أخرى',
    template: `Act as an expert AI prompt engineer. Craft a master prompt for \${idea}. Primary Focus: \${focus}, Expected Output: \${outputStyle}. Highly specific, well-structured, ready for maximum AI model accuracy.`,
    questions: [
  {
    id: "focus",
    title_ar: "التركيز الرئيسي للطلب",
    title_en: "Primary Focus",
    type: "select",
    options: [
      {
        label_ar: "فكرة حرّة وإبداعية متكاملة",
        label_en: "Free Creative Idea",
        value: "free-form creative brainstorming and solution"
      },
      {
        label_ar: "تحليل وتخطيط شامل",
        label_en: "Analysis & Planning",
        value: "structured breakdown, analysis, and execution plan"
      },
      {
        label_ar: "توليد أوامر برومبت مخصصة",
        label_en: "Custom Prompt Architecture",
        value: "specialized custom system prompt architecture"
      }
    ]
  }
]
  }
};
