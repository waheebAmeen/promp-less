import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { unifiedStorage } from './unified-storage';
import type { AiDraft } from '../services/ai';

export type { AiDraft };

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

export interface UserPreferences {
  // Legacy fields (kept for compatibility)
  field: string;
  vibe: string;
  experienceLevel: string;
  defaultEngine: string;

  // General Identity
  nativeLang: string;        // اللغة الأم للمستخدم
  preferredOutputLang: string; // لغة الإخراج المفضلة

  // Persona & Role
  occupation: string;        // المجال المهني
  role: string;              // الدور الذي يريده من الذكاء الاصطناعي

  // Expertise
  expertiseLevel: string;    // مستوى الخبرة العامة
  preferredDepth: string;    // عمق الإجابات

  // Communication Style
  tone: string;              // نبرة التواصل
  responseLength: string;    // طول الردود
  preferredFormat: string;   // شكل الإخراج

  // Audience & Context
  targetAudience: string;    // الجمهور المستهدف
  region: string;            // المنطقة الجغرافية

  // Creative Preferences
  creativityLevel: string;   // مستوى الإبداع والتجديد
  humorLevel: string;        // مستوى الفكاهة

  // Image AI
  defaultImageEngine: string; // محرك الصور الافتراضي
  imageStyle: string;         // أسلوب الصور المفضل
  imageAspectRatio: string;   // نسبة الأبعاد المفضلة
}

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
  preferences: UserPreferences | null;
  
  // Database-ready state
  users: User[];
  workflows: Workflow[];
  globalHistory: GlobalHistoryEntry[];
  qualityBoosters: string[];

  // AI Magic Input
  aiDraft: AiDraft | null;

  // User Actions
  setLanguage: (lang: 'ar' | 'en') => void;
  toggleDarkMode: () => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  addPrompt: (prompt: PromptHistory) => void;
  updatePrompt: (id: string, newText: string) => void;
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

  // AI Actions
  setAiDraft: (draft: AiDraft) => void;
  clearAiDraft: () => void;
}

import { INITIAL_WORKFLOWS } from './workflows.data';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ar',
      darkMode: true,
      history: [],
      isAuthenticated: true,
      isGuest: false,
      hasCompletedOnboarding: false,
      user: {
        id: 'admin-1',
        name: 'Anas Alsabri',
        email: 'anasabdualsabri@gmail.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      preferences: null,
      
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
      aiDraft: null,

      setLanguage: (lang) => set({ language: lang }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),
      updatePreferences: (updates) => set((state) => ({ 
        preferences: state.preferences ? { ...state.preferences, ...updates } : { 
          field: 'other', 
          vibe: 'photorealistic', 
          experienceLevel: 'intermediate', 
          defaultEngine: 'midjourney',
          nativeLang: 'ar',
          preferredOutputLang: 'ar',
          occupation: '',
          role: 'expert',
          expertiseLevel: 'intermediate',
          preferredDepth: 'balanced',
          tone: 'professional',
          responseLength: 'medium',
          preferredFormat: 'structured',
          targetAudience: 'general',
          region: 'middle-east',
          creativityLevel: 'balanced',
          humorLevel: 'minimal',
          defaultImageEngine: 'midjourney',
          imageStyle: 'photorealistic',
          imageAspectRatio: '16:9',
          ...updates 
        } 
      })),
      
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

      updatePrompt: (id, newText) =>
        set((state) => ({
          history: state.history.map((p) =>
            p.id === id ? { ...p, prompt: newText } : p
          ),
          globalHistory: state.globalHistory.map((g) =>
            g.id.startsWith(id) ? { ...g, prompt: newText } : g
          ),
        })),

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
        
        // Only designated super-admin email gets admin role automatically
        const role = email.toLowerCase() === 'anasabdualsabri@gmail.com' ? 'admin' : 'user';
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
        const role = email.toLowerCase() === 'anasabdualsabri@gmail.com' ? 'admin' : 'user';
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

      setAiDraft: (draft) => set({ aiDraft: draft }),
      clearAiDraft: () => set({ aiDraft: null }),
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

