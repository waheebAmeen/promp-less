import React, { useState } from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/Icon';
import { useAppStore, UserPreferences } from '../../storage/store';
import { useRouter } from 'solito/router';
import { useSafeArea } from '../../provider/safe-area/use-safe-area';
import { useTheme } from '../../design/useTheme';
import { useTranslation } from 'react-i18next';

const FIELDS = [
  { id: 'marketing', icon: 'trending-up', labelEn: 'Marketing & Ads', labelAr: 'التسويق والإعلانات' },
  { id: 'design', icon: 'layers', labelEn: 'Design & UI/UX', labelAr: 'التصميم وواجهة المستخدم' },
  { id: 'photography', icon: 'camera', labelEn: 'Photography', labelAr: 'التصوير الفوتوغرافي' },
  { id: 'writing', icon: 'text', labelEn: 'Content Writing', labelAr: 'كتابة المحتوى' },
  { id: 'engineering', icon: 'code', labelEn: 'Engineering / Code', labelAr: 'البرمجة والهندسة' },
  { id: 'other', icon: 'star', labelEn: 'Other / Hobbyist', labelAr: 'أخرى / هاوي' },
];

const VIBES = [
  { id: 'cinematic', labelEn: 'Cinematic 4K', labelAr: 'سينمائي 4K', descEn: 'Moody, realistic, dramatic lighting', descAr: 'واقعي، إضاءة درامية' },
  { id: 'anime', labelEn: 'High-end Anime', labelAr: 'أنمي عالي الجودة', descEn: 'Stylized, colorful, Makoto Shinkai', descAr: 'ألوان جذابة، ستايل الأنمي' },
  { id: 'photorealistic', labelEn: 'Hyper-Realistic', labelAr: 'واقعي جداً', descEn: 'Like a real photo, sharp details', descAr: 'كصورة حقيقية، تفاصيل حادة' },
  { id: '3d', labelEn: '3D Pixar', labelAr: 'ثلاثي الأبعاد (Pixar)', descEn: 'Cute, smooth, motion graphics', descAr: 'ناعم وجذاب، أسلوب بيكسار' },
];

const EXPERIENCE = [
  { id: 'beginner', labelEn: 'Beginner', labelAr: 'مبتدئ', descEn: 'I want AI to help me build the prompt', descAr: 'أريد مساعدة الذكاء الاصطناعي في الأوامر' },
  { id: 'pro', labelEn: 'Professional', labelAr: 'محترف', descEn: 'I write my own exact prompts', descAr: 'أكتب أوامري بدقة تامة' },
];

interface OnboardingScreenProps {
  /** When true, loads current preferences and keeps hasCompletedOnboarding = true on save */
  isEditMode?: boolean;
}

export function OnboardingScreen({ isEditMode = false }: OnboardingScreenProps) {
  const theme = useTheme();
  const insets = useSafeArea();
  const { push, back } = useRouter();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { updatePreferences, setHasCompletedOnboarding, preferences } = useAppStore();

  const [step, setStep] = useState(1);
  // In edit mode: pre-populate with existing preferences; otherwise start blank
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({
    field: isEditMode ? (preferences?.field || '') : '',
    vibe: isEditMode ? (preferences?.vibe || '') : '',
    experienceLevel: isEditMode ? (preferences?.experienceLevel || '') : '',
    defaultEngine: isEditMode ? (preferences?.defaultEngine || 'midjourney') : 'midjourney',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences
      updatePreferences(prefs);
      // In edit mode keep hasCompletedOnboarding = true, in first-time set it true
      setHasCompletedOnboarding(true);
      if (isEditMode) {
        back();
      } else {
        push('/');
      }
    }
  };

  const handleSkip = () => {
    if (isEditMode) {
      back();
    } else {
      updatePreferences({ field: 'other', vibe: 'cinematic', experienceLevel: 'beginner', defaultEngine: 'midjourney' });
      setHasCompletedOnboarding(true);
      push('/');
    }
  };

  const isCurrentStepValid = () => {
    if (step === 1) return !!prefs.field;
    if (step === 2) return !!prefs.vibe;
    if (step === 3) return !!prefs.experienceLevel;
    return false;
  };

  const STEP_CONFIGS = [
    {
      titleEn: 'What is your main field?',
      titleAr: 'ما هو مجالك الأساسي؟',
      subtitleEn: 'This helps us tailor your default workflows.',
      subtitleAr: 'هذا يساعدنا في تخصيص أدواتك.',
    },
    {
      titleEn: 'Your favorite visual vibe?',
      titleAr: 'ما هو النمط البصري المفضل؟',
      subtitleEn: "We'll use this style by default for images.",
      subtitleAr: 'سنستخدم هذا النمط افتراضياً للصور.',
    },
    {
      titleEn: 'How experienced are you?',
      titleAr: 'ما هو مستوى خبرتك؟',
      subtitleEn: 'With AI prompt engineering.',
      subtitleAr: 'مع هندسة الأوامر الذكية.',
    },
  ];

  const currentConfig = STEP_CONFIGS[step - 1];

  const renderStep1 = () => (
    <View className="flex-row flex-wrap justify-center gap-4">
      {FIELDS.map(f => {
        const isSelected = prefs.field === f.id;
        return (
          <TouchableOpacity
            key={f.id}
            onPress={() => setPrefs({ ...prefs, field: f.id })}
            className={`w-[45%] md:w-[30%] p-6 rounded-3xl border-2 items-center justify-center ${
              isSelected
                ? 'bg-primary/20 border-primary'
                : `${theme.cardBg} border ${theme.cardBorder}`
            }`}
            activeOpacity={0.8}
          >
            <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-4 ${
              isSelected ? 'bg-primary/20 border border-primary/40' : `${theme.surface} border ${theme.border}`
            }`}>
              <Icon name={f.icon as any} size={24} color={isSelected ? '#5D5FEF' : theme.colors.icon} />
            </View>
            <Typography className={`font-bold text-center text-sm ${isSelected ? 'text-primary' : theme.textSecondary}`}>
              {isRtl ? f.labelAr : f.labelEn}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderStep2 = () => (
    <View className="gap-4 max-w-md mx-auto w-full">
      {VIBES.map(v => {
        const isSelected = prefs.vibe === v.id;
        return (
          <TouchableOpacity
            key={v.id}
            onPress={() => setPrefs({ ...prefs, vibe: v.id })}
            className={`p-6 rounded-3xl border-2 flex-row items-center justify-between ${
              isSelected
                ? 'bg-primary/20 border-primary'
                : `${theme.cardBg} border ${theme.cardBorder}`
            }`}
            activeOpacity={0.8}
          >
            <View className="flex-1">
              <Typography className={`font-black text-lg ${isSelected ? 'text-primary' : theme.text}`}>
                {isRtl ? v.labelAr : v.labelEn}
              </Typography>
              <Typography className={`text-sm mt-1 ${theme.textMuted}`}>
                {isRtl ? v.descAr : v.descEn}
              </Typography>
            </View>
            {isSelected && (
              <View className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 items-center justify-center ml-4">
                <Icon name="check" size={16} color="#5D5FEF" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderStep3 = () => (
    <View className="gap-4 max-w-md mx-auto w-full">
      {EXPERIENCE.map(e => {
        const isSelected = prefs.experienceLevel === e.id;
        return (
          <TouchableOpacity
            key={e.id}
            onPress={() => setPrefs({ ...prefs, experienceLevel: e.id })}
            className={`p-6 rounded-3xl border-2 flex-row items-center justify-between ${
              isSelected
                ? 'bg-primary/20 border-primary'
                : `${theme.cardBg} border ${theme.cardBorder}`
            }`}
            activeOpacity={0.8}
          >
            <View className="flex-1">
              <Typography className={`font-black text-xl ${isSelected ? 'text-primary' : theme.text}`}>
                {isRtl ? e.labelAr : e.labelEn}
              </Typography>
              <Typography className={`text-sm mt-1 ${theme.textMuted}`}>
                {isRtl ? e.descAr : e.descEn}
              </Typography>
            </View>
            {isSelected && (
              <View className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 items-center justify-center ml-4">
                <Icon name="check" size={16} color="#5D5FEF" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ScreenContainer>
      <DecorativeBackground />

      {/* ═══════ Header Bar ═══════ */}
      <View className={`${theme.headerBg} border-b ${theme.headerBorder} z-50 px-6 pt-4 pb-3`}>
        <View className={`max-w-6xl mx-auto w-full flex-row items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          {/* Left: Back button in edit mode / Logo in onboarding */}
          {isEditMode ? (
            <TouchableOpacity
              onPress={() => back()}
              className={`w-9 h-9 rounded-full items-center justify-center ${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'} border ${theme.border}`}
            >
              <Icon name="back" size={18} color={theme.colors.icon} />
            </TouchableOpacity>
          ) : (
            <Typography variant="h2" className={`text-xl font-black tracking-tight ${theme.text}`}>
              Promptless
            </Typography>
          )}

          {/* Right: Skip / Edit label */}
          <TouchableOpacity onPress={handleSkip} className="py-2 px-3">
            <Typography className={`font-semibold ${theme.textSecondary}`}>
              {isEditMode
                ? (isRtl ? 'إلغاء' : 'Cancel')
                : (isRtl ? 'تخطي' : 'Skip')}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* ═══════ Scrollable Content ═══════ */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-6xl mx-auto w-full px-6 pt-12 pb-6 items-center">

          {/* Badge */}
          <View className="bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-8">
            <Typography className="text-primary font-bold text-xs tracking-widest uppercase">
              {isEditMode
                ? (isRtl ? 'تعديل التفضيلات' : 'Edit Preferences')
                : (isRtl ? 'الإعداد الأولي' : 'Initial Setup')}
            </Typography>
          </View>

          {/* Step Heading */}
          <Typography
            variant="h1"
            className={`text-center mb-3 font-black leading-tight tracking-tighter ${theme.text}`}
            style={{ fontSize: 36, lineHeight: 44 }}
          >
            {isRtl ? currentConfig.titleAr : currentConfig.titleEn}
          </Typography>

          <Typography
            className={`text-center text-base mb-10 max-w-sm leading-relaxed ${theme.textMuted}`}
          >
            {isRtl ? currentConfig.subtitleAr : currentConfig.subtitleEn}
          </Typography>

          {/* Progress Dots */}
          <View className={`flex-row gap-2 mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {[1, 2, 3].map(i => (
              <View
                key={i}
                className={`h-2 rounded-full transition-all ${
                  step >= i
                    ? 'bg-primary w-8'
                    : `${theme.isDark ? 'bg-white/15' : 'bg-light-border'} w-2`
                }`}
              />
            ))}
          </View>

          {/* Divider */}
          <View className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />

          {/* Step Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

        </View>
      </ScrollView>

      {/* ═══════ Sticky Footer Actions ═══════ */}
      <View
        className={`absolute left-0 right-0 px-6 ${theme.isDark ? 'bg-background/80' : 'bg-white/80'} backdrop-blur-md border-t ${theme.headerBorder}`}
        style={{ bottom: 0, paddingBottom: Math.max(insets.bottom, 24), paddingTop: 16 }}
      >
        <View className="max-w-md mx-auto w-full">
          <TouchableOpacity
            disabled={!isCurrentStepValid()}
            onPress={handleNext}
            className={`w-full py-4 rounded-2xl items-center flex-row justify-center gap-2 ${
              isCurrentStepValid()
                ? 'bg-primary shadow-neon-primary'
                : theme.isDark ? 'bg-white/5 border border-white/10' : 'bg-light-surface-container border border-light-border'
            }`}
            activeOpacity={0.8}
          >
            <Typography className={`font-bold text-lg ${isCurrentStepValid() ? 'text-white' : theme.textMuted}`}>
              {step === 3
                ? (isEditMode ? (isRtl ? 'حفظ التغييرات' : 'Save Changes') : (isRtl ? 'إنهاء' : 'Finish'))
                : (isRtl ? 'التالي' : 'Next')}
            </Typography>
            {isCurrentStepValid() && (
              <Icon name="arrow-right" size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

    </ScreenContainer>
  );
}
