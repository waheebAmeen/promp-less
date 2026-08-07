export const otherPrompts = {
  // 1. توليد الأوامر (Prompt Engineering)
  prompt_generator: {
    id: 'other_prompt_gen',
    title: 'مهندس الأوامر (Prompt Architect)',
    description: 'إنشاء برومبت احترافي ومحكم للنماذج الذكية',
    template: `Act as a senior Prompt Engineer. Develop a master prompt for: \${idea}. Focus on: \${focus}. Output format: \${outputStyle}. Ensure high-level constraints, role-playing, and step-by-step reasoning.`,
    questions: [
      {
        id: "focus",
        title_ar: "الغرض من البرومبت",
        title_en: "Purpose",
        type: "select",
        options: [
          { label_ar: "توليد محتوى إبداعي", label_en: "Creative Writing", value: "creative narrative generation" },
          { label_ar: "برمجة وحل مشاكل", label_en: "Coding/Debugging", value: "code generation and architectural debugging" }
        ]
      },
      {
        id: "outputStyle",
        title_ar: "أسلوب المخرجات",
        title_en: "Output Style",
        type: "select",
        options: [
          { label_ar: "منظم بجدول", label_en: "Structured Table", value: "tabular data and summary" },
          { label_ar: "خطوات تعليمية مفصلة", label_en: "Detailed Steps", value: "step-by-step chain-of-thought guide" }
        ]
      }
    ]
  },

  // 2. تحليل البيانات (Data Analysis)
  data_analyst: {
    id: 'other_data_analysis',
    title: 'محلل بيانات (Data Analyst)',
    description: 'تحليل البيانات واستخراج الرؤى الاستراتيجية',
    template: `Act as a Data Scientist. Analyze the following data/context: \${idea}. Perform: \${analysisType}. Provide actionable insights in \${outputStyle}.`,
    questions: [
      {
        id: "analysisType",
        title_ar: "نوع التحليل",
        title_en: "Analysis Type",
        type: "select",
        options: [
          { label_ar: "تحليل SWOT", label_en: "SWOT Analysis", value: "comprehensive SWOT analysis" },
          { label_ar: "تحليل تنبئي للمستقبل", label_en: "Predictive Analysis", value: "trend identification and future projection" }
        ]
      },
      {
        id: "outputStyle",
        title_ar: "صيغة التقرير",
        title_en: "Output Format",
        type: "select",
        options: [
          { label_ar: "تقرير تنفيذي", label_en: "Executive Summary", value: "concise executive summary" },
          { label_ar: "نقاط مفصلة بالأرقام", label_en: "Detailed Points", value: "deep dive with numerical evidence" }
        ]
      }
    ]
  },

  // 3. التطوير البرمجي (Code Development)
  code_dev: {
    id: 'other_code_dev',
    title: 'مطور برمجيات (Dev Consultant)',
    description: 'كتابة، مراجعة، وتحسين الكود المصدري',
    template: `Act as a Senior Full-Stack Developer. Review/Write code for: \${idea}. Language/Tech: \${techStack}. Requirements: \${requirementType}. Focus on clean code, performance, and security.`,
    questions: [
      {
        id: "techStack",
        title_ar: "التقنية المستخدمة",
        title_en: "Tech Stack",
        type: "select",
        options: [
          { label_ar: "PHP / Laravel", label_en: "Laravel/PHP", value: "PHP/Laravel modern architecture" },
          { label_ar: "React Native / JS", label_en: "React Native", value: "React Native mobile components" }
        ]
      },
      {
        id: "requirementType",
        title_ar: "نوع المهمة",
        title_en: "Task Type",
        type: "select",
        options: [
          { label_ar: "كتابة هيكلية مشروع", label_en: "Scaffolding", value: "project architecture and file structure" },
          { label_ar: "إصلاح ثغرات/تطوير أمني", label_en: "Security Audit", value: "security patch and optimization" }
        ]
      }
    ]
  },

  // 4. التخطيط الاستراتيجي (Strategic Planning)
  strategy_planner: {
    id: 'other_strategy',
    title: 'مخطط استراتيجي (Strategist)',
    description: 'بناء خطط عمل لمشاريع ريادية',
    template: `Act as a Business Consultant. Develop a strategic plan for: \${idea}. The approach should be: \${approach}. Focus on: \${focusArea}.`,
    questions: [
      {
        id: "approach",
        title_ar: "منهجية التخطيط",
        title_en: "Methodology",
        type: "select",
        options: [
          { label_ar: "منهجية Agile/Lean", label_en: "Agile/Lean", value: "lean startup methodology" },
          { label_ar: "تخطيط تقليدي مفصل", label_en: "Traditional", value: "comprehensive long-term planning" }
        ]
      },
      {
        id: "focusArea",
        title_ar: "مجال التركيز",
        title_en: "Focus Area",
        type: "select",
        options: [
          { label_ar: "تسويق ونمو", label_en: "Growth/Marketing", value: "market penetration and user acquisition" },
          { label_ar: "بناء فرق العمل", label_en: "Team Building", value: "team organizational structure and culture" }
        ]
      }
    ]
  },

  // 5. كتابة إبداعية (Creative Writing)
  creative_writing: {
    id: 'other_creative',
    title: 'كاتب إبداعي (Creative Writer)',
    description: 'كتابة نصوص إعلانية أو مقالات إبداعية',
    template: `Act as an expert copywriter. Create content for: \${idea}. Tone: \${tone}. Target Audience: \${audience}.`,
    questions: [
      {
        id: "tone",
        title_ar: "نبرة الصوت",
        title_en: "Tone",
        type: "select",
        options: [
          { label_ar: "رسمية واحترافية", label_en: "Formal", value: "professional and authoritative tone" },
          { label_ar: "ودية وملهمة", label_en: "Friendly", value: "warm, engaging, and inspiring tone" }
        ]
      },
      {
        id: "audience",
        title_ar: "الجمهور المستهدف",
        title_en: "Target Audience",
        type: "select",
        options: [
          { label_ar: "عملاء محتملين", label_en: "Potential Clients", value: "B2B business clients" },
          { label_ar: "مستخدمي تطبيقات جوال", label_en: "App Users", value: "casual mobile app users" }
        ]
      }
    ]
  },

  // 6. تعليم وتدريب (Educational/Tutor)
  tutor_mentor: {
    id: 'other_tutor',
    title: 'مدرب/معلم (Tutor)',
    description: 'شرح مفاهيم تعليمية أو تقنية معقدة',
    template: `Act as a professional mentor. Explain: \${idea}. Difficulty level: \${level}. Use analogy: \${analogy}.`,
    questions: [
      {
        id: "level",
        title_ar: "مستوى الشرح",
        title_en: "Difficulty",
        type: "select",
        options: [
          { label_ar: "مبتدئ (تبسيط)", label_en: "Beginner", value: "simple, analogy-driven explanation" },
          { label_ar: "خبير (تقني)", label_en: "Expert", value: "deep technical dive" }
        ]
      },
      {
        id: "analogy",
        title_ar: "استخدام تشبيه",
        title_en: "Use Analogy",
        type: "select",
        options: [
          { label_ar: "نعم، بسط بالمقارنة", label_en: "Yes", value: "using real-world analogies" },
          { label_ar: "لا، شرح مباشر", label_en: "No", value: "direct technical explanation" }
        ]
      }
    ]
  },

  // 7. إدارة المهام (Task Management)
  task_manager: {
    id: 'other_task',
    title: 'مدير مهام (Task Manager)',
    description: 'ترتيب المهام وتحديد الأولويات',
    template: `Act as an expert Project Manager. Organize the following tasks: \${idea}. Priority method: \${priority}. Deadline context: \${deadline}.`,
    questions: [
      {
        id: "priority",
        title_ar: "مبدأ الأولوية",
        title_en: "Priority Logic",
        type: "select",
        options: [
          { label_ar: "مصفوفة أيزنهاور", label_en: "Eisenhower", value: "Eisenhower matrix categorization" },
          { label_ar: "الأهم ثم العاجل", label_en: "Urgency-based", value: "urgent-first task sequencing" }
        ]
      },
      {
        id: "deadline",
        title_ar: "الجدول الزمني",
        title_en: "Timeline",
        type: "select",
        options: [
          { label_ar: "مضغوط (يومي)", label_en: "Daily Sprint", value: "daily high-intensity sprint" },
          { label_ar: "طويل الأمد (شهري)", label_en: "Monthly Plan", value: "milestone-based monthly planning" }
        ]
      }
    ]
  },

  // 8. بحث واستكشاف (Research & Explore)
  researcher: {
    id: 'other_research',
    title: 'باحث (Researcher)',
    description: 'جمع معلومات وبحث معمق في موضوع محدد',
    template: `Act as an expert Researcher. Explore: \${idea}. Depth: \${depth}. Source focus: \${source}.`,
    questions: [
      {
        id: "depth",
        title_ar: "عمق البحث",
        title_en: "Depth",
        type: "select",
        options: [
          { label_ar: "نظرة عامة", label_en: "Overview", value: "broad overview" },
          { label_ar: "بحث أكاديمي عميق", label_en: "In-depth Academic", value: "highly detailed analytical research" }
        ]
      },
      {
        id: "source",
        title_ar: "نوع المصادر",
        title_en: "Source Focus",
        type: "select",
        options: [
          { label_ar: "تقنيات حديثة", label_en: "Tech Trends", value: "latest technology trends" },
          { label_ar: "تاريخي/نظري", label_en: "Historical/Theoretical", value: "historical and theoretical background" }
        ]
      }
    ]
  }
};