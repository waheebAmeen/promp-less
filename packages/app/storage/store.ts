import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { unifiedStorage } from './unified-storage';

export type PromptHistory = {
  id: string;
  category: string;
  prompt: string;
  createdAt: string;
  isFavorite: boolean;
};

export type QuestionType = 'select' | 'multiselect' | 'text' | 'textarea' | 'slider';

export interface QuestionOption {
  label_ar: string;
  label_en: string;
  value: string;
}

export interface Question {
  id: string;
  title_ar: string;
  title_en: string;
  type: QuestionType;
  options?: QuestionOption[];
}

export interface Workflow {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
  color: string;
  borderColor: string;
  iconColor: string;
  template: string;
  questions: Question[];
  isActive: boolean;
}

export type GlobalHistoryEntry = {
  id: string;
  userId: string;
  userName: string;
  workflowId: string;
  prompt: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'pro';
  status: 'active' | 'banned';
  createdAt: string;
};

interface AppState {
  language: 'ar' | 'en';
  darkMode: boolean;
  history: PromptHistory[];
  isAuthenticated: boolean;
  isGuest: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
  
  // Database-ready state
  users: User[];
  workflows: Workflow[];
  globalHistory: GlobalHistoryEntry[];
  qualityBoosters: string[];

  // User Actions
  setLanguage: (lang: 'ar' | 'en') => void;
  toggleDarkMode: () => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  addPrompt: (prompt: PromptHistory) => void;
  removePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  
  // Admin Actions
  updateUser: (userId: string, updates: Partial<User>) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  setQualityBoosters: (boosters: string[]) => void;
  clearGlobalHistory: () => void;
}

// Initial workflow data migrated from JSON files
const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'study',
    name_en: 'Study',
    name_ar: 'الدراسة',
    icon: 'apps',
    color: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: '#3b82f6',
    isActive: true,
    template: "Act as an expert academic tutor. Help with ${idea}. Objective: ${objective}, Subject Area: ${subject}, Style/Depth: ${depth}. Format output clearly with examples and step-by-step reasoning.",
    questions: [
      {
        id: "objective",
        title_ar: "الهدف من التطلب الدراسي",
        title_en: "Study Objective",
        type: "select",
        options: [
          { label_ar: "تلخيص PDF أو مستند", label_en: "Summarize PDF/Document", value: "Comprehensive document summarization with key takeaways" },
          { label_ar: "شرح درس أو مفهوم معقد", label_en: "Explain Complex Lesson", value: "Clear step-by-step lesson explanation with real-world examples" },
          { label_ar: "إنشاء أسئلة واختبارات مراجعة", label_en: "Generate Practice Quiz", value: "Practice quiz questions with detailed answer key" },
          { label_ar: "حل واجبات ومسائل بالتفصيل", label_en: "Homework Assistance", value: "Detailed homework solution with breakdown" }
        ]
      },
      {
        id: "subject",
        title_ar: "المادة الدراسية",
        title_en: "Subject",
        type: "select",
        options: [
          { label_ar: "علوم وتكنولوجيا", label_en: "Science & Tech", value: "Science, Engineering, and Technology" },
          { label_ar: "رياضيات وإحصاء", label_en: "Math & Statistics", value: "Mathematics and Analytical Statistics" },
          { label_ar: "لغات وآداب", label_en: "Languages & Literature", value: "Languages, Grammar, and Literature" },
          { label_ar: "علوم إنسانية وإدارة", label_en: "Humanities & Business", value: "Business, Economics, and Social Sciences" }
        ]
      },
      {
        id: "depth",
        title_ar: "مستوى وشكل الإخراج",
        title_en: "Depth & Style",
        type: "select",
        options: [
          { label_ar: "مبسط ومباشر للمبتدئين", label_en: "Simplified for Beginners", value: "simple beginner-friendly explanation" },
          { label_ar: "أكاديمي متعمق ومفصل", label_en: "In-Depth Academic", value: "rigorous academic standards with citations" },
          { label_ar: "نقاط سريعة للمراجعة (Bullet points)", label_en: "Quick Bullet Points", value: "bulleted bullet points for quick review" }
        ]
      }
    ]
  },
  {
    id: 'coding',
    name_en: 'Coding',
    name_ar: 'البرمجة',
    icon: 'apps',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: '#10b981',
    isActive: true,
    template: "Act as a Senior Principal Software Engineer. Help with ${idea}. Task Goal: ${taskGoal}, Tech Stack: ${stack}, Code Quality Focus: ${qualityFocus}. Provide clean, performant, production-ready code with inline comments.",
    questions: [
      {
        id: "taskGoal",
        title_ar: "هدف المهمة البرمجية",
        title_en: "Coding Goal",
        type: "select",
        options: [
          { label_ar: "كتابة تطبيق / كود جديد", label_en: "Write New App/Feature", value: "building a new complete production-ready code feature" },
          { label_ar: "تصحيح أخطاء ومراجعة كود (Debugging)", label_en: "Debugging & Fix", value: "debugging error stack trace and refactoring broken code" },
          { label_ar: "شرح وتبسيط خوارزمية أو مكتبة", label_en: "Code Explanation", value: "explaining technical code concepts and architecture" },
          { label_ar: "تحسين الأداء والحماية (Refactoring)", label_en: "Optimization & Security", value: "optimizing code execution speed and security best practices" }
        ]
      },
      {
        id: "stack",
        title_ar: "البيئة والتقنيات المستخدمة",
        title_en: "Technology Stack",
        type: "select",
        options: [
          { label_ar: "React / Next.js / TypeScript", label_en: "React / Next.js / TS", value: "React, Next.js, Modern TypeScript, TailwindCSS" },
          { label_ar: "Python / AI / Data Science", label_en: "Python / AI", value: "Python 3.11, PyTorch, pandas, FastAPI" },
          { label_ar: "Node.js / Express / MongoDB / SQL", label_en: "Node.js Backend", value: "Node.js, Express, PostgreSQL, Prisma ORM" },
          { label_ar: "تطبيقات موبايل (React Native / Flutter)", label_en: "Mobile App", value: "React Native, Expo, Mobile UX" }
        ]
      },
      {
        id: "qualityFocus",
        title_ar: "معايير الكود المطلوبة",
        title_en: "Code Standards",
        type: "select",
        options: [
          { label_ar: "جاهز للإنتاج (Production Ready)", label_en: "Production Grade", value: "clean modular production grade code" },
          { label_ar: "نموذج سريعة (MVP Prototype)", label_en: "Quick MVP", value: "quick lightweight working snippet" },
          { label_ar: "شامل للاختبارات (With Unit Tests)", label_en: "With Unit Tests", value: "includes comprehensive unit tests and error handling" }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    name_en: 'Marketing',
    name_ar: 'التسويق',
    icon: 'apps',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: '#a855f7',
    isActive: true,
    template: "Act as a World-Class CMO & Marketing Strategist. Create marketing copy for ${idea}. Campaign Type: ${campaignType}, Target Platform: ${platform}, Tone of Voice: ${tone}. Include compelling hook, value proposition, and CTA.",
    questions: [
      {
        id: "campaignType",
        title_ar: "نوع الحملة / الطلب",
        title_en: "Campaign Type",
        type: "select",
        options: [
          { label_ar: "نص إعلان تسويقي جذاب (Ad Copy)", label_en: "High-Converting Ad Copy", value: "high-converting direct response ad copy" },
          { label_ar: "استراتيجية وخطة تسويق كاملة", label_en: "Marketing Strategy Plan", value: "comprehensive marketing campaign strategy and roadmap" },
          { label_ar: "منشورات وسائل التواصل الاجتماعي", label_en: "Social Content Calendar", value: "engaging viral social media posts calendar" },
          { label_ar: "رسالة مبيعات وايميل تسويقي", label_en: "Email Sales Sequence", value: "persuasive email marketing campaign sequence" }
        ]
      },
      {
        id: "platform",
        title_ar: "المنصة المستهدفة",
        title_en: "Target Platform",
        type: "select",
        options: [
          { label_ar: "إنستغرام وتيك توك (Instagram/TikTok)", label_en: "Instagram / TikTok", value: "Instagram Reels and TikTok visual dynamic marketing" },
          { label_ar: "إعلانات جوجل وفيسبوك (Google/FB Ads)", label_en: "Google & Meta Ads", value: "Meta Ads and Google Performance Max campaigns" },
          { label_ar: "لينكد إن للأعمال (LinkedIn B2B)", label_en: "LinkedIn B2B", value: "professional B2B thought leadership on LinkedIn" },
          { label_ar: "الموقع الإلكتروني والبريد", label_en: "Website & Email", value: "high-converting landing page and newsletter" }
        ]
      },
      {
        id: "tone",
        title_ar: "نبرة الخطاب (Tone of Voice)",
        title_en: "Tone of Voice",
        type: "select",
        options: [
          { label_ar: "جذابة ومثيرة للحماس (High Energy)", label_en: "High Energy", value: "vibrant, exciting, urgent call to action" },
          { label_ar: "احترافية فاخرة (Luxury Pro)", label_en: "Professional Luxury", value: "sophisticated, authoritative, premium brand tone" },
          { label_ar: "ودودة وقريبة للجمهور (Friendly)", label_en: "Warm & Friendly", value: "relatable, authentic, conversational story tone" }
        ]
      }
    ]
  },
  {
    id: 'writing',
    name_en: 'Writing & Content',
    name_ar: 'الكتابة والمحتوى',
    icon: 'text',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: '#f59e0b',
    isActive: true,
    template: "Act as an Expert Content Author and Copywriter. Help write ${idea}. Content Format: ${format}, Writing Style: ${style}, Target Audience: ${audience}. Ensure captivating opening, smooth transitions, and high clarity.",
    questions: [
      {
        id: "format",
        title_ar: "قالب وشكل المحتوى",
        title_en: "Content Format",
        type: "select",
        options: [
          { label_ar: "مقالة / مدونة احترافية (Blog Post)", label_en: "SEO Blog Article", value: "SEO-optimized engaging blog article" },
          { label_ar: "سيناريو فيديو / سكربت", label_en: "Video Script", value: "engaging video script with visual hook and timestamps" },
          { label_ar: "منشور مفصل أو قصة قصيرة", label_en: "Story / Essay", value: "captivating narrative story or structured essay" },
          { label_ar: "صياغة وتدقيق نص محدد", label_en: "Proofread & Rewrite", value: "flawless proofreading, polishing, and rewording" }
        ]
      },
      {
        id: "style",
        title_ar: "أسلوب الكتابة",
        title_en: "Writing Style",
        type: "select",
        options: [
          { label_ar: "إبداعي وممتع (Creative)", label_en: "Creative & Engaging", value: "vivid, imaginative, immersive creative writing" },
          { label_ar: "رسمي وموثق (Formal)", label_en: "Formal & Professional", value: "polished, clear, authoritative formal tone" },
          { label_ar: "توعوي وتثقيفي (Informative)", label_en: "Informative Educational", value: "educational, structured, easy to digest" }
        ]
      }
    ]
  },
  {
    id: 'video',
    name_en: 'Videos',
    name_ar: 'الفيديوهات',
    icon: 'clapperboard',
    color: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: '#ef4444',
    isActive: true,
    template: "Create a complete video storyboard and script prompt for ${idea}. Video Format: ${format}, Visual Aesthetic: ${visualStyle}, Pace: ${pacing}. Detailed scene-by-scene instructions with visual prompts.",
    questions: [
      {
        id: "format",
        title_ar: "نوع وقالب الفيديو",
        title_en: "Video Format",
        type: "select",
        options: [
          { label_ar: "فيديو يوتيوب كامل (Full YouTube Video)", label_en: "Full Length YouTube", value: "full length structured YouTube video with intro and timestamps" },
          { label_ar: "فيديو قصير (Reels / Shorts / TikTok)", label_en: "Short Form Reels/TikTok", value: "viral 60-second vertical short video with fast hook" },
          { label_ar: "فيديو توضيحي / إعلاني (Explainer)", label_en: "Commercial Explainer", value: "sleek commercial explainer video concept" }
        ]
      },
      {
        id: "visualStyle",
        title_ar: "النمط البصري للفيديو",
        title_en: "Visual Aesthetic",
        type: "select",
        options: [
          { label_ar: "سينمائي عالي الجودة (Cinematic 4K)", label_en: "Cinematic 4K", value: "cinematic camera angles, filmic color grade, atmospheric lighting" },
          { label_ar: "موشن جرافيك / ثري دي (3D Motion Graphics)", label_en: "3D Motion Graphics", value: "modern 3D animation, sleek motion typography" },
          { label_ar: "توجيه تصوير شخصي (Vlog / Face-Cam)", label_en: "Vlog / Creator Style", value: "authentic creator vlog style, dynamic jump cuts" }
        ]
      }
    ]
  },
  {
    id: 'other',
    name_en: 'Other',
    name_ar: 'أخرى',
    icon: 'apps',
    color: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    iconColor: '#64748b',
    isActive: true,
    template: "Act as an expert AI prompt engineer. Craft a master prompt for ${idea}. Primary Focus: ${focus}, Expected Output: ${outputStyle}. Highly specific, well-structured, ready for maximum AI model accuracy.",
    questions: [
      {
        id: "focus",
        title_ar: "التركيز الرئيسي للطلب",
        title_en: "Primary Focus",
        type: "select",
        options: [
          { label_ar: "فكرة حرّة وإبداعية متكاملة", label_en: "Free Creative Idea", value: "free-form creative brainstorming and solution" },
          { label_ar: "تحليل وتخطيط شامل", label_en: "Analysis & Planning", value: "structured breakdown, analysis, and execution plan" },
          { label_ar: "توليد أوامر برومبت مخصصة", label_en: "Custom Prompt Architecture", value: "specialized custom system prompt architecture" }
        ]
      }
    ]
  },
  {
    id: 'cinematic',
    name_en: 'Cinematic',
    name_ar: 'سينمائي',
    icon: 'clapperboard',
    color: 'bg-primary/10',
    borderColor: 'border-primary/30',
    iconColor: '#3b82f6',
    isActive: true,
    template: "Cinematic shot of ${idea}, ${composition}, ${lighting}, ${colorGrading}, ${atmosphere}, filmed on ${camera}, ${lens}, highly detailed, cinematic atmosphere, 8k resolution, photorealistic --ar ${aspectRatio}",
    questions: [
      {
        id: "composition",
        title_ar: "تكوين المشهد (Composition)",
        title_en: "Scene Composition",
        type: "select",
        options: [
          { label_ar: "لقطة واسعة", label_en: "Wide Shot", value: "wide angle cinematic shot" },
          { label_ar: "لقطة مقربة (Portrait)", label_en: "Close-up", value: "extreme close-up portrait" },
          { label_ar: "منظور عين الطائر", label_en: "Bird's Eye View", value: "aerial drone photography, bird's eye view" },
          { label_ar: "قاعدة الأثلاث", label_en: "Rule of Thirds", value: "rule of thirds composition" },
          { label_ar: "لقطة متوسطة", label_en: "Medium Shot", value: "medium shot, cinematic framing" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Style",
        type: "select",
        options: [
          { label_ar: "إضاءة درامية (Chiaroscuro)", label_en: "Dramatic (Chiaroscuro)", value: "dramatic chiaroscuro lighting, heavy shadows" },
          { label_ar: "إضاءة ناعمة (Soft Light)", label_en: "Soft Lighting", value: "soft diffused cinematic lighting" },
          { label_ar: "إضاءة نيون (Neon)", label_en: "Neon Glow", value: "vibrant neon lighting, cyber aesthetic" },
          { label_ar: "إضاءة طبيعية (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour sunlight" },
          { label_ar: "إضاءة خلفية (Rim Light)", label_en: "Rim Lighting", value: "sharp rim lighting, silhouette contrast" }
        ]
      },
      {
        id: "colorGrading",
        title_ar: "تلوين المشهد (Color Grading)",
        title_en: "Color Grading",
        type: "select",
        options: [
          { label_ar: "ألوان سينمائية (Teal & Orange)", label_en: "Teal & Orange", value: "teal and orange color grading" },
          { label_ar: "أبيض وأسود فاخر", label_en: "Luxury B&W", value: "high-contrast cinematic black and white" },
          { label_ar: "ألوان باهتة (Vintage)", label_en: "Vintage Film", value: "faded vintage film colors, kodachrome" },
          { label_ar: "ألوان زاهية", label_en: "Vibrant", value: "highly saturated vivid colors" },
          { label_ar: "ألوان باردة", label_en: "Cold Tones", value: "moody blue and cold cinematic tones" }
        ]
      },
      {
        id: "atmosphere",
        title_ar: "الأجواء (Atmosphere)",
        title_en: "Atmosphere",
        type: "select",
        options: [
          { label_ar: "ضبابي", label_en: "Foggy/Misty", value: "dense fog, misty atmosphere" },
          { label_ar: "جزيئات غبار في الضوء", label_en: "Dust Motes", value: "dust motes dancing in light beams" },
          { label_ar: "دخان سينمائي", label_en: "Cinematic Smoke", value: "volumetric smoke and haze" },
          { label_ar: "ممطر", label_en: "Rainy", value: "heavy rain, wet surfaces, cinematic droplets" },
          { label_ar: "صافي ونقي", label_en: "Crystal Clear", value: "sharp focus, crystal clear air" }
        ]
      },
      {
        id: "camera",
        title_ar: "نوع الكاميرا",
        title_en: "Camera Model",
        type: "select",
        options: [
          { label_ar: "Arri Alexa", label_en: "Arri Alexa", value: "shot on Arri Alexa LF" },
          { label_ar: "Red Digital Cinema", label_en: "Red Digital Cinema", value: "shot on RED V-Raptor" },
          { label_ar: "Panavision", label_en: "Panavision", value: "Panavision anamorphic lenses" },
          { label_ar: "IMAX 70mm", label_en: "IMAX 70mm", value: "IMAX 70mm film format" },
          { label_ar: "كاميرا كلاسيكية 35mm", label_en: "35mm Film", value: "vintage 35mm movie camera" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض (21:9)", label_en: "Ultra-Wide (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "ستاندرد (4:3)", label_en: "Standard (4:3)", value: "4:3" },
          { label_ar: "طولي (9:16)", label_en: "Vertical (9:16)", value: "9:16" }
        ]
      }
    ]
  },
  {
    id: 'photography',
    name_en: 'Photography',
    name_ar: 'فوتوغراف',
    icon: 'camera',
    color: 'bg-accent-purple/10',
    borderColor: 'border-accent-purple/30',
    iconColor: '#8b5cf6',
    isActive: true,
    template: "Professional photography of ${idea}, ${style}, ${lens}, ${filmStock}, ${lighting}, ${realism}, high resolution, sharp focus, 8k, detailed skin texture --ar ${aspectRatio}",
    questions: [
      {
        id: "style",
        title_ar: "نمط التصوير",
        title_en: "Photography Style",
        type: "select",
        options: [
          { label_ar: "ناشونال جيوغرافيك", label_en: "National Geographic", value: "National Geographic documentary style" },
          { label_ar: "تصوير أزياء (Vogue)", label_en: "Fashion (Vogue)", value: "Vogue high-fashion editorial photography" },
          { label_ar: "تصوير شارع", label_en: "Street Photography", value: "candid street photography, raw moment" },
          { label_ar: "ماكرو (Micro)", label_en: "Macro", value: "extreme macro photography, hyper detailed" },
          { label_ar: "بورتريه استوديو", label_en: "Studio Portrait", value: "professional studio portrait, clean background" }
        ]
      },
      {
        id: "lens",
        title_ar: "نوع العدسة",
        title_en: "Lens Choice",
        type: "select",
        options: [
          { label_ar: "35mm (لقطة طبيعية)", label_en: "35mm (Natural)", value: "shot on 35mm lens, f/1.8" },
          { label_ar: "85mm (بورتريه)", label_en: "85mm (Portrait)", value: "shot on 85mm lens, creamy bokeh" },
          { label_ar: "24mm (زاوية واسعة)", label_en: "24mm (Wide Angle)", value: "shot on 24mm wide angle lens" },
          { label_ar: "50mm (عين مجردة)", label_en: "50mm (Prime)", value: "shot on 50mm f/1.2 lens" },
          { label_ar: "عدسة ماكرو", label_en: "Macro Lens", value: "100mm macro lens, extreme detail" }
        ]
      },
      {
        id: "filmStock",
        title_ar: "نوع الفيلم / الحساس",
        title_en: "Film Stock",
        type: "select",
        options: [
          { label_ar: "Kodak Portra 400", label_en: "Kodak Portra 400", value: "Kodak Portra 400 film grain" },
          { label_ar: "Fujifilm Superia", label_en: "Fujifilm Superia", value: "Fujifilm Superia aesthetic" },
          { label_ar: "أبيض وأسود (Tri-X)", label_en: "Black & White (Tri-X)", value: "Kodak Tri-X 400 black and white film" },
          { label_ar: "ديجيتال حديث (Sony A7R)", label_en: "Modern Digital", value: "shot on Sony A7R IV, hyper realistic" },
          { label_ar: "بولارويد (Polaroid)", label_en: "Polaroid", value: "vintage polaroid style, instant film" }
        ]
      },
      {
        id: "lighting",
        title_ar: "الإضاءة",
        title_en: "Lighting Setup",
        type: "select",
        options: [
          { label_ar: "ضوء الشمس الذهبي", label_en: "Golden Hour", value: "warm golden hour natural light" },
          { label_ar: "إضاءة استوديو ناعمة", label_en: "Softbox Studio", value: "softbox lighting, gentle shadows" },
          { label_ar: "ضوء النافذة", label_en: "Window Light", value: "natural window light, directional" },
          { label_ar: "إضاءة فلاش حادة", label_en: "Hard Flash", value: "direct flash photography, high contrast" },
          { label_ar: "إضاءة الغسق (Blue Hour)", label_en: "Blue Hour", value: "cool blue hour twilight lighting" }
        ]
      },
      {
        id: "realism",
        title_ar: "مستوى الواقعية",
        title_en: "Realism Level",
        type: "select",
        options: [
          { label_ar: "واقعية فائقة (Hyper-Real)", label_en: "Hyper-Realistic", value: "hyper-realistic, skin pores, fine details" },
          { label_ar: "خام (Raw)", label_en: "Raw & Unedited", value: "raw photo, unedited, realistic imperfections" },
          { label_ar: "تعديل احترافي", label_en: "Pro Retouch", value: "professionally retouched, high-end finish" },
          { label_ar: "سينمائي ناعم", label_en: "Cinematic Softness", value: "soft cinematic glow, ethereal realism" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "3:2 (كلاسيك)", label_en: "3:2 (Classic)", value: "3:2" },
          { label_ar: "بورتريه (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "بانوراما (16:9)", label_en: "Panorama (16:9)", value: "16:9" }
        ]
      }
    ]
  },
  {
    id: 'characters',
    name_en: 'Characters',
    name_ar: 'شخصيات',
    icon: 'user',
    color: 'bg-accent-emerald/10',
    borderColor: 'border-accent-emerald/30',
    iconColor: '#10b981',
    isActive: true,
    template: "Full body shot of ${idea}, ${ethnicity}, ${clothing}, ${expression}, ${pose}, ${background}, ${lighting}, ${rendering}, hyper-detailed, masterpiece, 8k --ar ${aspectRatio}",
    questions: [
      {
        id: "ethnicity",
        title_ar: "العرق / الملامح",
        title_en: "Ethnicity / Features",
        type: "select",
        options: [
          { label_ar: "ملامح عربية (خليجية)", label_en: "Arabic (Khaleeji)", value: "Middle Eastern Arabic features, Khaleeji style" },
          { label_ar: "ملامح أوروبية", label_en: "European", value: "European Caucasian features" },
          { label_ar: "ملامح شرق آسيوية", label_en: "East Asian", value: "East Asian features" },
          { label_ar: "ملامح أفريقية", label_en: "African", value: "African descent features" },
          { label_ar: "ملامح لاتينية", label_en: "Latino", value: "Latino Hispanic features" }
        ]
      },
      {
        id: "clothing",
        title_ar: "الملابس والستايل",
        title_en: "Clothing & Style",
        type: "select",
        options: [
          { label_ar: "أزياء فاخرة (Luxury)", label_en: "High-End Luxury", value: "wearing high-end luxury designer clothing" },
          { label_ar: "لباس تقليدي (ثوب/بشت)", label_en: "Traditional (Thobe)", value: "wearing traditional elegant Arabic thobe and bisht" },
          { label_ar: "سايبربانك (Cyberpunk)", label_en: "Cyberpunk Tech", value: "wearing futuristic cyberpunk techwear" },
          { label_ar: "ملابس كاجوال عصرية", label_en: "Modern Casual", value: "wearing stylish modern casual streetwear" },
          { label_ar: "بدلة رسمية فاخرة", label_en: "Formal Suit", value: "wearing a bespoke luxury tailored suit" }
        ]
      },
      {
        id: "expression",
        title_ar: "تعبيرات الوجه",
        title_en: "Facial Expression",
        type: "select",
        options: [
          { label_ar: "ابتسامة خفيفة واثقة", label_en: "Confident Smile", value: "subtle confident smile, looking at camera" },
          { label_ar: "نظرة جادة حادة", label_en: "Serious/Intense", value: "intense serious gaze, powerful expression" },
          { label_ar: "نظرة هادئة متأملة", label_en: "Calm/Thoughtful", value: "calm thoughtful expression, looking away" },
          { label_ar: "مندهش", label_en: "Surprised", value: "expression of awe and surprise" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية / المكان",
        title_en: "Background Environment",
        type: "select",
        options: [
          { label_ar: "مدينة مستقبلية", label_en: "Future City", value: "in a futuristic neon city street at night" },
          { label_ar: "مجلس عربي فاخر", label_en: "Luxury Majlis", value: "inside a luxurious modern Arabic majlis" },
          { label_ar: "مكتب عصري", label_en: "Modern Office", value: "in a high-end minimalist corporate office" },
          { label_ar: "طبيعة خلابة", label_en: "Nature", value: "standing in a serene natural landscape" },
          { label_ar: "استوديو احترافي", label_en: "Pro Studio", value: "solid professional studio background" }
        ]
      },
      {
        id: "rendering",
        title_ar: "أسلوب العرض",
        title_en: "Rendering Style",
        type: "select",
        options: [
          { label_ar: "واقعي جداً", label_en: "Photorealistic", value: "unreal engine 5 render, photorealistic, path tracing" },
          { label_ar: "ثري دي (Pixar Style)", label_en: "3D Animation", value: "stylized 3D character design, Disney Pixar style" },
          { label_ar: "أنمي احترافي", label_en: "High-end Anime", value: "detailed anime illustration, Makoto Shinkai style" },
          { label_ar: "رسم رقمي (Concept Art)", label_en: "Concept Art", value: "masterpiece digital concept art, detailed brushwork" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "بورتريه (9:16)", label_en: "Portrait (9:16)", value: "9:16" },
          { label_ar: "طولي (2:3)", label_en: "Tall (2:3)", value: "2:3" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },
  {
    id: 'products',
    name_en: 'Products',
    name_ar: 'منتجات',
    icon: 'apps',
    color: 'bg-accent-rose/10',
    borderColor: 'border-accent-rose/30',
    iconColor: '#f43f5e',
    isActive: true,
    template: "Commercial product photography of ${idea}, ${style}, ${background}, ${lighting}, ${shotType}, ${rendering}, high-end advertising, sharp focus, 8k, professional color grading --ar ${aspectRatio}",
    questions: [
      {
        id: "style",
        title_ar: "نمط الإعلان",
        title_en: "Advertising Style",
        type: "select",
        options: [
          { label_ar: "بسيط (Minimalist)", label_en: "Minimalist", value: "clean minimalist product photography, Apple style" },
          { label_ar: "فاخر (Luxury)", label_en: "Luxury", value: "luxury high-end commercial style, elegant" },
          { label_ar: "ديناميكي (Action)", label_en: "Dynamic/Action", value: "dynamic action shot, splashes or movement" },
          { label_ar: "طبيعي (Organic)", label_en: "Organic/Natural", value: "organic natural product staging, eco-friendly vibe" }
        ]
      },
      {
        id: "background",
        title_ar: "الخلفية",
        title_en: "Background",
        type: "select",
        options: [
          { label_ar: "لون سادة (Studio)", label_en: "Solid Studio", value: "solid neutral studio background, professional" },
          { label_ar: "رخام فاخر", label_en: "Luxury Marble", value: "placed on a luxury marble surface" },
          { label_ar: "طبيعة مدنية", label_en: "Urban/City", value: "in a modern urban city environment" },
          { label_ar: "منصة عرض (Podium)", label_en: "Podium", value: "standing on a geometric floating podium" }
        ]
      },
      {
        id: "lighting",
        title_ar: "نوع الإضاءة",
        title_en: "Lighting Type",
        type: "select",
        options: [
          { label_ar: "إضاءة ناعمة (Soft)", label_en: "Soft Lighting", value: "soft diffused studio lighting, no harsh shadows" },
          { label_ar: "إضاءة درامية (Hard)", label_en: "Dramatic Lighting", value: "high-contrast dramatic lighting, sharp highlights" },
          { label_ar: "إضاءة ملونة (Neon)", label_en: "Neon/RGB", value: "vibrant RGB neon lighting, futuristic" },
          { label_ar: "إضاءة خلفية", label_en: "Backlit", value: "elegant backlighting, glowing edges" }
        ]
      },
      {
        id: "shotType",
        title_ar: "نوع اللقطة",
        title_en: "Shot Type",
        type: "select",
        options: [
          { label_ar: "عين الطائر (Top Down)", label_en: "Top Down", value: "flat lay top down perspective" },
          { label_ar: "لقطة مقربة (Macro)", label_en: "Macro Close-up", value: "extreme close-up on product details and texture" },
          { label_ar: "لقطة عينية", label_en: "Eye Level", value: "eye level hero shot" },
          { label_ar: "زاوية منخفضة", label_en: "Low Angle", value: "low angle, making the product look heroic" }
        ]
      },
      {
        id: "rendering",
        title_ar: "جودة الرندر",
        title_en: "Render Engine",
        type: "select",
        options: [
          { label_ar: "Octane Render", label_en: "Octane Render", value: "rendered in Octane, photorealistic, 8k" },
          { label_ar: "Ray Tracing", label_en: "Ray Tracing", value: "hyper realistic ray tracing, realistic reflections" },
          { label_ar: "واقعي فوتوغرافي", label_en: "Photorealistic", value: "professional studio photography, high resolution" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" },
          { label_ar: "بورتريه (4:5)", label_en: "Portrait (4:5)", value: "4:5" },
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" }
        ]
      }
    ]
  },
  {
    id: 'architecture',
    name_en: 'Architecture',
    name_ar: 'معمار',
    icon: 'architecture',
    color: 'bg-accent-amber/10',
    borderColor: 'border-accent-amber/30',
    iconColor: '#f59e0b',
    isActive: true,
    template: "Architectural photography of ${idea}, ${style}, ${environment}, ${lighting}, ${view}, ${material}, high resolution, sharp focus, 8k, realistic textures --ar ${aspectRatio}",
    questions: [
      {
        id: "style",
        title_ar: "النمط المعماري",
        title_en: "Architectural Style",
        type: "select",
        options: [
          { label_ar: "مودرن (Modern)", label_en: "Modern", value: "modern minimalist architecture, clean lines" },
          { label_ar: "مستقبلي (Futuristic)", label_en: "Futuristic", value: "futuristic organic architecture, Zaha Hadid style" },
          { label_ar: "إسلامي حديث", label_en: "Modern Islamic", value: "modern Islamic architecture, intricate geometric patterns" },
          { label_ar: "وحشي (Brutalist)", label_en: "Brutalist", value: "brutalist architecture, raw concrete, massive forms" },
          { label_ar: "كلاسيكي", label_en: "Classic", value: "classic timeless architecture, elegant details" }
        ]
      },
      {
        id: "environment",
        title_ar: "البيئة المحيطة",
        title_en: "Environment",
        type: "select",
        options: [
          { label_ar: "وسط المدينة (Urban)", label_en: "Urban City", value: "located in a bustling modern urban city center" },
          { label_ar: "واحة صحراوية", label_en: "Desert Oasis", value: "located in a serene luxury desert oasis" },
          { label_ar: "غابة خضراء", label_en: "Forest", value: "nestled in a lush green forest environment" },
          { label_ar: "على الشاطئ", label_en: "Beachfront", value: "overlooking a calm crystal clear ocean beach" }
        ]
      },
      {
        id: "lighting",
        title_ar: "وقت اللقطة / الإضاءة",
        title_en: "Time / Lighting",
        type: "select",
        options: [
          { label_ar: "وقت الغروب (Golden Hour)", label_en: "Golden Hour", value: "warm golden hour sunset lighting, long shadows" },
          { label_ar: "وقت الليل (Night)", label_en: "Night/Illuminated", value: "at night, beautifully illuminated with artificial lights" },
          { label_ar: "وقت الظهيرة (High Sun)", label_en: "High Noon", value: "bright high noon sunlight, clear sky" },
          { label_ar: "وقت الغسق (Blue Hour)", label_en: "Blue Hour", value: "cool blue hour twilight lighting" }
        ]
      },
      {
        id: "view",
        title_ar: "زاوية العرض",
        title_en: "View Angle",
        type: "select",
        options: [
          { label_ar: "منظور خارجي (Exterior)", label_en: "Exterior View", value: "exterior hero shot, wide angle" },
          { label_ar: "منظور داخلي (Interior)", label_en: "Interior View", value: "luxurious interior design shot, spacious" },
          { label_ar: "لقطة علوية (Drone)", label_en: "Drone View", value: "aerial drone photography, looking down" },
          { label_ar: "لقطة زاوية (Corner)", label_en: "Corner View", value: "dynamic corner perspective" }
        ]
      },
      {
        id: "material",
        title_ar: "المواد الغالبة",
        title_en: "Primary Materials",
        type: "select",
        options: [
          { label_ar: "زجاج وفولاذ", label_en: "Glass & Steel", value: "dominated by floor-to-ceiling glass and polished steel" },
          { label_ar: "خرسانة ناعمة", label_en: "Smooth Concrete", value: "raw smooth concrete textures" },
          { label_ar: "خشب وحجر طبيعي", label_en: "Wood & Stone", value: "warm wood accents and natural stone walls" },
          { label_ar: "رخام فاخر", label_en: "Luxury Marble", value: "polished white luxury marble" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي (21:9)", label_en: "Cinematic (21:9)", value: "21:9" },
          { label_ar: "عرضي (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "ستاندرد (4:3)", label_en: "Standard (4:3)", value: "4:3" }
        ]
      }
    ]
  },
  {
    id: 'fashion',
    name_en: 'Fashion & Luxury',
    name_ar: 'أزياء وموضة',
    icon: 'user',
    color: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    iconColor: '#ec4899',
    isActive: true,
    template: "High-fashion editorial photography of ${idea}, ${garmentStyle}, ${fabricTexture}, ${setting}, ${lighting}, ${modelPose}, Vogue aesthetic, sharp focus, 8k, detailed clothing texture --ar ${aspectRatio}",
    questions: [
      {
        id: "garmentStyle",
        title_ar: "أسلوب الملابس (Garment Style)",
        title_en: "Garment Style",
        type: "select",
        options: [
          { label_ar: "أزياء راقية (Haute Couture)", label_en: "Haute Couture", value: "avant-garde haute couture fashion gown" },
          { label_ar: "ستريت وير فاخر (Luxury Streetwear)", label_en: "Luxury Streetwear", value: "oversized high-end luxury streetwear outfit" },
          { label_ar: "تصميم أدنى (Minimalist Chic)", label_en: "Minimalist Chic", value: "sleek minimalist silk suit, tailored lines" },
          { label_ar: "فخامة عربية معاصرة", label_en: "Modern Arabian Luxury", value: "royal embroidered silk abaya, modern Arabian elegance" },
          { label_ar: "ستايل فينتج كلاسيك", label_en: "Vintage Classic", value: "1970s retro glam fashion ensemble" }
        ]
      },
      {
        id: "fabricTexture",
        title_ar: "خامة القماش والنسيج",
        title_en: "Fabric & Texture",
        type: "select",
        options: [
          { label_ar: "حرير لامع", label_en: "Flowing Silk", value: "lustrous flowing silk and satin reflection" },
          { label_ar: "مخمل ثقيل", label_en: "Heavy Velvet", value: "rich deep-toned heavy velvet texture" },
          { label_ar: "جلد مصقول", label_en: "Polished Leather", value: "sleek polished leather with specular highlights" },
          { label_ar: "تطريز ذهبي دقيق", label_en: "Gold Embroidery", value: "intricate hand-stitched gold metallic thread embroidery" }
        ]
      },
      {
        id: "setting",
        title_ar: "مكان التصوير (Editorial Setting)",
        title_en: "Editorial Location",
        type: "select",
        options: [
          { label_ar: "استوديو باريس بياض كلي", label_en: "Parisian Studio", value: "inside a minimalist high-ceiling Parisian studio" },
          { label_ar: "مدرج عرض أزياء (Runway)", label_en: "Fashion Runway", value: "walking down a foggy lit fashion runway" },
          { label_ar: "معمار مدريد الكلاسيكي", label_en: "Classic Architecture", value: "against classical marble column architecture" },
          { label_ar: "طبيعة صحراوية راقية", label_en: "Luxury Desert", value: "surrounded by golden desert sand dunes at sunset" }
        ]
      },
      {
        id: "lighting",
        title_ar: "إضاءة الأزياء",
        title_en: "Fashion Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة غلاف مجلة (Softbox)", label_en: "Magazine Cover Softbox", value: "flattering high-key softbox cover lighting" },
          { label_ar: "ظلال حادة درامية", label_en: "Dramatic Hard Shadows", value: "harsh sun direct shadow play, high contrast" },
          { label_ar: "ضوء شمس العصر الدافئ", label_en: "Warm Afternoon Sun", value: "warm golden sunlight casting artistic shadows" }
        ]
      },
      {
        id: "modelPose",
        title_ar: "وقفة العارض/العارضة",
        title_en: "Model Pose",
        type: "select",
        options: [
          { label_ar: "حركة ديناميكية (Dynamic Walk)", label_en: "Dynamic Walk", value: "striding forward dynamically, flowing outfit movement" },
          { label_ar: "وقفة قوة واثقة (Power Pose)", label_en: "Power Pose", value: "confident stance, direct magnetic eye contact" },
          { label_ar: "لقطة مقربة للوجه والملامح", label_en: "Fashion Beauty Portrait", value: "intimate beauty portrait focusing on makeup and jewelry detail" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "غلاف مجلة طولي (4:5)", label_en: "Magazine Portrait (4:5)", value: "4:5" },
          { label_ar: "طولي كامل (9:16)", label_en: "Full Story (9:16)", value: "9:16" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },
  {
    id: 'social_thumb',
    name_en: 'Social & Thumbnails',
    name_ar: 'منصات ومصغرات',
    icon: 'apps',
    color: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: '#ef4444',
    isActive: true,
    template: "Eye-catching click-worthy YouTube thumbnail graphic of ${idea}, ${subjectExpression}, ${backgroundStyle}, ${colorTheme}, ${lightingEffect}, hyper-detailed, high visual contrast, 8k resolution, trending composition --ar ${aspectRatio}",
    questions: [
      {
        id: "subjectExpression",
        title_ar: "تعبير الشخصية الرئيسية",
        title_en: "Main Subject Expression",
        type: "select",
        options: [
          { label_ar: "صدمة ومفاجأة قوية", label_en: "Shocked & Surprised", value: "shocked expressive facial reaction, wide open eyes, mouth open" },
          { label_ar: "ابتسامة نجاح واثقة", label_en: "Confident Smirk", value: "confident charismatic smile, pointing finger towards viewer" },
          { label_ar: "غموض وتركيز شديد", label_en: "Intense Mystery", value: "intense curious gaze, dramatic shadow on half face" },
          { label_ar: "تحدي وقوة", label_en: "Hero Challenge", value: "heroic posture, arms crossed, powerful vibe" }
        ]
      },
      {
        id: "backgroundStyle",
        title_ar: "نمط الخلفية",
        title_en: "Background Style",
        type: "select",
        options: [
          { label_ar: "انفجار ألوان وجسيمات ضوئية", label_en: "Color Burst Sparks", value: "glowing neon background with flying embers and light sparks" },
          { label_ar: "خلفية ضبابية معزولة (Bokeh)", label_en: "Blurred Depth of Field", value: "blurry dark background with heavy neon bokeh highlights" },
          { label_ar: "محيط تكنولوجي مستقبلي", label_en: "Futuristic Tech Setup", value: "futuristic streaming setup with multiple glowing RGB monitors" },
          { label_ar: "انقسام قبل وبعد (Split Screen)", label_en: "Split Contrast Background", "value": "half glowing blue half fiery orange high contrast background" }
        ]
      },
      {
        id: "colorTheme",
        title_ar: "طابع الألوان المثير للانتباه",
        title_en: "Attention Color Scheme",
        type: "select",
        options: [
          { label_ar: "أصفر وأزرق نيون (High Click-Through)", label_en: "Vibrant Yellow & Blue", value: "electric yellow highlights against rich deep blue theme" },
          { label_ar: "أحمر ونار درامي", label_en: "Fiery Red & Gold", value: "intense fiery red energy flames and metallic gold glow" },
          { label_ar: "بنفسجي وسايبر", label_en: "Cyber Purple & Cyan", value: "ultra vibrant magenta purple and cyan neon style" }
        ]
      },
      {
        id: "lightingEffect",
        title_ar: "مؤثرات الإضاءة المحيطية",
        title_en: "Lighting & Effects",
        type: "select",
        options: [
          { label_ar: "توهج حواف حاد (Rim Glow)", label_en: "Sharp Edge Rim Light", value: "intense glowing rim light outlining the subject silhouette" },
          { label_ar: "إضاءة استوديو اليوتيوب الاحترافية", label_en: "Pro YouTube Lighting", value: "crisp key light with soft fill and vibrant backlight" },
          { label_ar: "برق ومشرارة كهربائية", label_en: "Electric Lightning Sparks", value: "subtle electric lightning tendrils around the subject" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "مصغرة يوتيوب / شاشة (16:9)", label_en: "YouTube Thumbnail (16:9)", value: "16:9" },
          { label_ar: "ريلز وتيك توك (9:16)", label_en: "Reels / TikTok (9:16)", value: "9:16" },
          { label_ar: "منشور إنستغرام (1:1)", label_en: "Instagram Feed (1:1)", value: "1:1" }
        ]
      }
    ]
  },
  {
    id: 'ai_influencer',
    name_en: 'AI Influencer',
    name_ar: 'مؤثر رقمي',
    icon: 'user',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: '#a855f7',
    isActive: true,
    template: "Authentic lifestyle photograph of an AI influencer ${idea}, ${featuresAndEthnicity}, ${outfitStyle}, ${locationContext}, ${cameraAngle}, ${lightingStyle}, hyper-realistic skin texture with fine pores, natural hair, shot on iPhone 15 Pro, unedited raw photo --ar ${aspectRatio}",
    questions: [
      {
        id: "featuresAndEthnicity",
        title_ar: "ملامح وعرق المؤثر",
        title_en: "Influencer Appearance & Ethnicity",
        type: "select",
        options: [
          { label_ar: "ملامح عربية حديثة (شابة خليجية/عربية)", label_en: "Modern Arab Female", value: "striking modern 24yo Arab female influencer, hazel eyes, natural beauty" },
          { label_ar: "ملامح عربية وسيمة (شاب خليجي/عربي)", label_en: "Modern Arab Male", value: "handsome 26yo Arab male content creator, well-groomed beard, sharp jawline" },
          { label_ar: "ملامح عالمية مختلطة", label_en: "Global Mixed Features", value: "attractive mixed ethnicity digital creator, warm smile, expressive eyes" }
        ]
      },
      {
        id: "outfitStyle",
        title_ar: "نمط الأزياء اليومية",
        title_en: "Daily Outfit Style",
        type: "select",
        options: [
          { label_ar: "أزياء سفر وكاجوال أنيق", label_en: "Travel Casual Elegant", value: "wearing stylish beige trench coat and designer sunglasses" },
          { label_ar: "ملابس رياضية وصحية (Fitness Lifestyle)", label_en: "Athleisure Fitness", value: "wearing sleek modern activewear, post workout glow" },
          { label_ar: "عباءة مودرن راقية / ثوب عصري", label_en: "Modern Heritage Chic", value: "wearing modern luxury minimalist Abaya, elegant jewelry" },
          { label_ar: "ملابس كافيه ورستر كاجوال", label_en: "Cozy Café Style", value: "wearing cozy oversized cashmere sweater holding coffee cup" }
        ]
      },
      {
        id: "locationContext",
        title_ar: "موقع الصورة ونمط الحياة",
        title_en: "Lifestyle Location",
        type: "select",
        options: [
          { label_ar: "مقهى عصري فاخر بدبي / الرياض", label_en: "Luxury Modern Café", value: "sitting at an outdoor upscale coffee shop table in Dubai downtown" },
          { label_ar: "شوارع باريس / لندن الممطرة", label_en: "European City Street", value: "walking through a quaint cobblestone European street" },
          { label_ar: "منتجع فاخر على شاطئ البحر", label_en: "Luxury Beach Resort", value: "relaxing at an infinity pool terrace overlooking turquoise ocean" },
          { label_ar: "داخل سيارة فاخرة (Car Selfie)", label_en: "Luxury Car Interior", value: "inside a luxury sports car, daylight through panorama roof" }
        ]
      },
      {
        id: "cameraAngle",
        title_ar: "منظور التصوير والكاميرا",
        title_en: "Perspective & Framing",
        type: "select",
        options: [
          { label_ar: "سيلفي كاميرا أمامية طبيعية", label_en: "Casual Front Camera Selfie", value: "candid handheld selfie angle, slight depth of field" },
          { label_ar: "لقطة عفوية (Candid POV)", label_en: "Candid Third Person POV", value: "candid shot taken by a friend, looking away smiling" },
          { label_ar: "بورتريه نصف جسم (Half Body)", label_en: "Half Body Portrait", value: "medium portrait shot, natural arm placement" }
        ]
      },
      {
        id: "lightingStyle",
        title_ar: "إضاءة الصورة الواقعية",
        title_en: "Natural Lighting",
        type: "select",
        options: [
          { label_ar: "إضاءة شمس ذهبية (Golden Hour)", label_en: "Golden Hour Flare", value: "warm golden sunset lighting catching hair edges" },
          { label_ar: "ضوء يوم طبيعي ناعم (Overcast Window)", label_en: "Soft Daylight", value: "soft diffused natural window sunlight, natural skin tone" },
          { label_ar: "إضاءة ليلية دافئة بأضواء المدينة", label_en: "Warm Night City Lights", value: "nighttime city ambient lights, subtle street bokeh" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "ستوري / ريلز (9:16)", label_en: "Story / Reels (9:16)", value: "9:16" },
          { label_ar: "منشور إنستغرام طولي (4:5)", label_en: "Instagram Post (4:5)", value: "4:5" },
          { label_ar: "مربع (1:1)", label_en: "Square (1:1)", value: "1:1" }
        ]
      }
    ]
  },
  {
    id: 'poster_art',
    name_en: 'Poster Art',
    name_ar: 'بوسترات وفن',
    icon: 'apps',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: '#10b981',
    isActive: true,
    template: "High-impact graphic design key art poster of ${idea}, ${artStyle}, ${compositionLayout}, ${colorPalette}, ${textureFinish}, typography space, masterpiece artwork, award-winning poster design, 8k --ar ${aspectRatio}",
    questions: [
      {
        id: "artStyle",
        title_ar: "الأسلوب الفني للبوستر",
        title_en: "Poster Art Style",
        type: "select",
        options: [
          { label_ar: "بوستر فيلم سينمائي هوليودي", label_en: "Hollywood Movie Key Art", value: "blockbuster movie key art poster style, dramatic scale" },
          { label_ar: "فن السايبربانك ونيون ريترو", label_en: "Cyberpunk Synthwave", value: "retro 1980s synthwave cyberpunk aesthetic, neon neon vector lineart" },
          { label_ar: "تقليل ومينيماليزم فاخر", label_en: "Minimalist Graphic", value: "Swiss minimalist graphic design poster, bold geometric forms" },
          { label_ar: "فن فنتازيا وأسطوري (Dark Fantasy)", label_en: "Dark Fantasy Epic", value: "epic dark fantasy oil painting poster, intricate detail" },
          { label_ar: "فن البوب ارت والكوميكس", label_en: "Pop Art & Comic", value: "bold halftone dot pop art comic book cover aesthetic" }
        ]
      },
      {
        id: "compositionLayout",
        title_ar: "تكوين البوستر وتوزيع العناصر",
        title_en: "Poster Layout Composition",
        type: "select",
        options: [
          { label_ar: "تكوين مركزي ضخم (Central Hero)", label_en: "Central Hero", value: "towering central hero subject with symmetric visual hierarchy" },
          { label_ar: "تداخل طبقات متعددة (Collage Layers)", label_en: "Layered Montage", value: "cinematic montage layout with blended double exposure elements" },
          { label_ar: "تأطير هندسي جرافيكي", "label_en": "Geometric Framing", value: "bold diagonal framing lines, structured grid layout" }
        ]
      },
      {
        id: "colorPalette",
        title_ar: "لوحة الألوان المعتمدة",
        title_en: "Color Palette",
        type: "select",
        options: [
          { label_ar: "أحمر وأسود درامي (High Contrast)", label_en: "Dramatic Red & Black", value: "intense crimson red and obsidian black palette" },
          { label_ar: "تيل وأورانج سينمائي (Teal & Amber)", label_en: "Teal & Amber", value: "deep cyan teal and glowing amber orange contrast" },
          { label_ar: "ألوان ميتاليك وذهب فاخر", label_en: "Metallic Gold & Charcoal", value: "luxurious metallic gold leaf accents on dark charcoal background" }
        ]
      },
      {
        id: "textureFinish",
        title_ar: "ملمس وتأثير الورق/الطباعة",
        title_en: "Texture & Print Finish",
        type: "select",
        options: [
          { label_ar: "ورق بوستر قديم مطوي (Folded Vintage Paper)", label_en: "Vintage Folded Paper", value: "subtle folded paper creases and screenprint texture" },
          { label_ar: "طباعة غلوس حديثة نقية", label_en: "Modern Gloss Print", value: "ultra clean glossy print quality, sharp edges" },
          { label_ar: "تأثير جرانج وحبيبات غبار", label_en: "Grunge Noise Grain", value: "heavy film grain, subtle grunge dust and distressed texture" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "أبعاد بوستر كلاسيكي (2:3)", label_en: "Classic Poster (2:3)", value: "2:3" },
          { label_ar: "أبعاد سينما (16:9)", label_en: "Widescreen Banner (16:9)", value: "16:9" },
          { label_ar: "غلاف ألبوم مربع (1:1)", label_en: "Album Cover (1:1)", value: "1:1" }
        ]
      }
    ]
  },
  {
    id: 'arabic_heritage',
    name_en: 'Arabic & Heritage',
    name_ar: 'تراث وعرب',
    icon: 'clapperboard',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: '#f59e0b',
    isActive: true,
    template: "Cinematic artwork of ${idea}, ${arabianTheme}, ${architecturalStyle}, ${lightingAtmosphere}, ${timeOfDay}, ${calligraphyDetails}, epic Arabian storytelling visual, masterpiece, highly detailed, 8k resolution --ar ${aspectRatio}",
    questions: [
      {
        id: "arabianTheme",
        title_ar: "طابع الفكرة العربية والتراثية",
        title_en: "Arabian Narrative Theme",
        type: "select",
        options: [
          { label_ar: "فروسية وأصالة خيل عربية", label_en: "Equestrian & Purebred Horses", value: "majestic Arabian purebred horse rider in desert dunes, flowing traditional bisht" },
          { label_ar: "ألف ليلة وليلة وفنتازيا شرقية", label_en: "Arabian Nights Fantasy", value: "mythical Arabian fantasy scene, glowing magical lanterns and starlight" },
          { label_ar: "مستقبل نيوم والمعمار العربي المعاصر", label_en: "Neo-Arabian Futurism", value: "futuristic neo-Arabian megacity, sleek golden architectural towers" },
          { label_ar: "مجلس عربي ملكي وتكريم", label_en: "Royal Heritage Majlis", value: "opulent Arabian royal majlis, hand-woven carpets and brass coffee pots" }
        ]
      },
      {
        id: "architecturalStyle",
        title_ar: "النمط المعماري والتصميم",
        title_en: "Architectural Elements",
        type: "select",
        options: [
          { label_ar: "نقوش إسلامية وزخارف هندسية", label_en: "Islamic Geometric Patterns", value: "intricate Islamic geometric arches and mosaic tilework" },
          { label_ar: "طين نجد وتراث العلا والتاريخ", label_en: "Traditional Clay & Oasis", value: "ancient sun-baked mudbrick architecture, lush date palm oasis" },
          { label_ar: "زجاج حديث منقوش بذهب", label_en: "Modern Gold Lattice Glass", value: "hyper-modern glass skyscraper with gold mashrabiya lattice facade" }
        ]
      },
      {
        id: "lightingAtmosphere",
        title_ar: "إضاءة وأجواء المشهد",
        title_en: "Lighting & Atmosphere",
        type: "select",
        options: [
          { label_ar: "غروب صحراوي ذهبي وسحر الكثبان", label_en: "Golden Desert Sunset", value: "dramatic golden hour sunset over endless desert dunes, warm orange glow" },
          { label_ar: "ليل صحراوي مجري ونجوم متلألئة", label_en: "Starlit Desert Night", value: "clear desert night sky filled with Milky Way galaxy stars, moonlit sand" },
          { label_ar: "إضاءة الفجر والضباب الخفيف", label_en: "Dawn Misty Light", value: "peaceful early morning dawn light with soft desert haze" }
        ]
      },
      {
        id: "calligraphyDetails",
        title_ar: "لمسات الفن والخط العربي",
        title_en: "Calligraphy & Art Detail",
        type: "select",
        options: [
          { label_ar: "خط كوفي معاصر ذهبي", label_en: "Golden Kufic Calligraphy", value: "subtle floating 3D golden Arabic Kufic calligraphic motifs" },
          { label_ar: "تزويق بالذهب واللازورد", label_en: "Gold & Lapis Lazuli Accents", value: "royal lapis lazuli blue and gold leaf decorative accents" },
          { label_ar: "واقعية سينمائية بدون كتابة", label_en: "Pure Cinematic Visual", value: "pure cinematic visual depth without text overlays" }
        ]
      },
      {
        id: "aspectRatio",
        title_ar: "أبعاد الصورة",
        title_en: "Aspect Ratio",
        type: "select",
        options: [
          { label_ar: "سينمائي عريض جداً (21:9)", label_en: "Ultra-Wide Cinematic (21:9)", value: "21:9" },
          { label_ar: "شاشة عريضة (16:9)", label_en: "Widescreen (16:9)", value: "16:9" },
          { label_ar: "بورتريه طولي (9:16)", label_en: "Vertical Story (9:16)", value: "9:16" }
        ]
      }
    ]
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ar',
      darkMode: true,
      history: [],
      isAuthenticated: false,
      isGuest: false,
      hasCompletedOnboarding: false,
      user: null,
      
      users: [
        { 
          id: 'admin-1', 
          name: 'Anas Alsabri', 
          email: 'anasabdualsabri@gmail.com', 
          role: 'admin', 
          status: 'active', 
          createdAt: new Date().toISOString() 
        }
      ],
      workflows: INITIAL_WORKFLOWS,
      globalHistory: [],
      qualityBoosters: ["hyper-realistic", "8k resolution", "highly detailed", "masterpiece"],

      setLanguage: (lang) => set({ language: lang }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),
      
      addPrompt: (prompt) => set((state) => {
        const newGlobalEntry: GlobalHistoryEntry = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          userId: state.user?.id || 'guest',
          userName: state.user?.name || 'Guest',
          workflowId: prompt.category,
          prompt: prompt.prompt,
          createdAt: prompt.createdAt
        };
        return { 
          history: [prompt, ...state.history],
          globalHistory: [newGlobalEntry, ...state.globalHistory]
        };
      }),

      removePrompt: (id) =>
        set((state) => ({
          history: state.history.filter((p) => p.id !== id),
        })),
      
      toggleFavorite: (id) =>
        set((state) => ({
          history: state.history.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        })),
      
      clearHistory: () => set({ history: [] }),
      
      login: (email, name) => set((state) => {
        const existingUser = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
          if (existingUser.status === 'banned') {
            throw new Error("Your account has been suspended.");
          }
          return { isAuthenticated: true, isGuest: false, user: existingUser };
        }
        
        // Auto-assign admin if email matches yours or contains admin
        const role = (email.toLowerCase() === 'anasabdualsabri@gmail.com' || email.toLowerCase().includes('admin')) ? 'admin' : 'user';
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name: name || 'User',
          role,
          status: 'active',
          createdAt: new Date().toISOString()
        };
        
        return { 
          isAuthenticated: true, 
          isGuest: false,
          user: newUser,
          users: [...state.users, newUser]
        };
      }),

      signup: (email, name) => set((state) => {
        const role = (email.toLowerCase() === 'anasabdualsabri@gmail.com' || email.toLowerCase().includes('admin')) ? 'admin' : 'user';
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role,
          status: 'active',
          createdAt: new Date().toISOString()
        };
        return { 
          isAuthenticated: true, 
          isGuest: false,
          user: newUser,
          users: [...state.users, newUser]
        };
      }),

      loginAsGuest: () => set({
        isAuthenticated: true,
        isGuest: true,
        user: {
          id: 'guest',
          name: 'زائر / Guest',
          email: 'guest@promptless.ai',
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString()
        }
      }),

      logout: () => set({ isAuthenticated: false, isGuest: false, user: null }),

      // Admin Actions
      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u),
        // If updating the current user, sync the user object too
        user: state.user?.id === userId ? { ...state.user, ...updates } : state.user
      })),

      addWorkflow: (workflow) => set((state) => ({
        workflows: [workflow, ...state.workflows]
      })),

      updateWorkflow: (id, updates) => set((state) => ({
        workflows: state.workflows.map(w => w.id === id ? { ...w, ...updates } : w)
      })),

      deleteWorkflow: (id) => set((state) => ({
        workflows: state.workflows.filter(w => w.id !== id)
      })),

      setQualityBoosters: (boosters) => set({ qualityBoosters: boosters }),
      
      clearGlobalHistory: () => set({ globalHistory: [] }),
    }),
    {
      name: 'promptless-db-storage-v2',
      storage: createJSONStorage(() => unifiedStorage),
      merge: (persistedState: any, currentState: AppState) => {
        const persisted = (persistedState as Partial<AppState>) || {};
        const persistedWorkflows = persisted.workflows || [];
        
        // Map INITIAL_WORKFLOWS to ensure new categories are always present
        const workflowMap = new Map<string, Workflow>();
        INITIAL_WORKFLOWS.forEach(w => workflowMap.set(w.id, w));
        
        // Merge any user-customized workflows or extra properties
        persistedWorkflows.forEach(w => {
          const initial = workflowMap.get(w.id);
          if (initial) {
            workflowMap.set(w.id, { ...initial, ...w });
          } else {
            workflowMap.set(w.id, w);
          }
        });
        
        return {
          ...currentState,
          ...persisted,
          workflows: Array.from(workflowMap.values()),
        };
      }
    }
  )
);

