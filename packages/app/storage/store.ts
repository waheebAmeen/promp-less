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
  user: User | null;
  
  // Database-ready state
  users: User[];
  workflows: Workflow[];
  globalHistory: GlobalHistoryEntry[];
  qualityBoosters: string[];

  // User Actions
  setLanguage: (lang: 'ar' | 'en') => void;
  toggleDarkMode: () => void;
  addPrompt: (prompt: PromptHistory) => void;
  removePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
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
          { label_ar: "ألوان زاهية", label_en: "Vibrant", label_en: "Vibrant", value: "highly saturated vivid colors" },
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
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ar',
      darkMode: true,
      history: [],
      isAuthenticated: false,
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
          return { isAuthenticated: true, user: existingUser };
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
          user: newUser,
          users: [...state.users, newUser]
        };
      }),

      logout: () => set({ isAuthenticated: false, user: null }),

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
      name: 'promptless-db-storage',
      storage: createJSONStorage(() => unifiedStorage),
    }
  )
);
