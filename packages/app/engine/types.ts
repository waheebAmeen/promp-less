export type TargetModel = 
  | 'midjourney' 
  | 'flux' 
  | 'sdxl' 
  | 'dalle3' 
  | 'ideogram' 
  | 'recraft' 
  | 'leonardo'
  | 'chatgpt'
  | 'claude'
  | 'gemini'
  | 'mistral';

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
  placeholder_ar?: string;
  placeholder_en?: string;
}

export interface Questionnaire {
  category: string;
  template: string;
  questions: Question[];
}

