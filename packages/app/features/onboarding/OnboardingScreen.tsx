import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from '../../design/view';
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

export function OnboardingScreen() {
  const theme = useTheme();
  const insets = useSafeArea();
  const { push } = useRouter();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { updatePreferences, setHasCompletedOnboarding } = useAppStore();

  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({
    field: '',
    vibe: '',
    experienceLevel: '',
    defaultEngine: 'midjourney',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish
      updatePreferences(prefs);
      setHasCompletedOnboarding(true);
      push('/');
    }
  };

  const renderStep1 = () => (
    <View className="flex-1 justify-center">
      <Typography variant="h1" className={`text-4xl font-black mb-2 text-center ${theme.text}`}>{isRtl ? 'ما هو مجالك الأساسي؟' : 'What is your main field?'}</Typography>
      <Typography variant="caption" className={`text-center mb-10 ${theme.textMuted}`}>{isRtl ? 'هذا يساعدنا في تخصيص أدواتك.' : 'This helps us tailor your default workflows.'}</Typography>
      
      <View className="flex-row flex-wrap justify-center gap-4">
        {FIELDS.map(f => (
          <TouchableOpacity
            key={f.id}
            onPress={() => setPrefs({ ...prefs, field: f.id })}
            className={`w-[45%] md:w-[30%] p-6 rounded-3xl border-2 items-center justify-center ${
              prefs.field === f.id
                ? 'bg-primary/20 border-primary'
                : `${theme.cardBg} ${theme.borderSubtle}`
            }`}
          >
            <Icon name={f.icon as any} size={32} color={prefs.field === f.id ? '#3b82f6' : theme.colors.icon} />
            <Typography className={`mt-4 font-bold text-center ${prefs.field === f.id ? 'text-primary-glow' : theme.textSecondary}`}>
              {isRtl ? f.labelAr : f.labelEn}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 justify-center">
      <Typography variant="h1" className={`text-4xl font-black mb-2 text-center ${theme.text}`}>{isRtl ? 'ما هو النمط البصري المفضل؟' : 'Your favorite visual vibe?'}</Typography>
      <Typography variant="caption" className={`text-center mb-10 ${theme.textMuted}`}>{isRtl ? 'سنستخدم هذا النمط افتراضياً للصور.' : "We'll use this style by default for images."}</Typography>
      
      <View className="gap-4 max-w-md mx-auto w-full">
        {VIBES.map(v => (
          <TouchableOpacity
            key={v.id}
            onPress={() => setPrefs({ ...prefs, vibe: v.id })}
            className={`p-6 rounded-3xl border-2 flex-row items-center justify-between ${
              prefs.vibe === v.id
                ? 'bg-purple-500/20 border-purple-500'
                : `${theme.cardBg} ${theme.borderSubtle}`
            }`}
          >
            <View>
              <Typography className={`font-black text-lg ${prefs.vibe === v.id ? 'text-purple-400' : theme.text}`}>
                {isRtl ? v.labelAr : v.labelEn}
              </Typography>
              <Typography className={`text-sm mt-1 ${theme.textMuted}`}>{isRtl ? v.descAr : v.descEn}</Typography>
            </View>
            {prefs.vibe === v.id && <Icon name="check" size={24} color="#a855f7" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 justify-center">
      <Typography variant="h1" className={`text-4xl font-black mb-2 text-center ${theme.text}`}>{isRtl ? 'ما هو مستوى خبرتك؟' : 'How experienced are you?'}</Typography>
      <Typography variant="caption" className={`text-center mb-10 ${theme.textMuted}`}>{isRtl ? 'مع هندسة الأوامر الذكية.' : 'With AI prompt engineering.'}</Typography>
      
      <View className="gap-4 max-w-md mx-auto w-full">
        {EXPERIENCE.map(e => (
          <TouchableOpacity
            key={e.id}
            onPress={() => setPrefs({ ...prefs, experienceLevel: e.id })}
            className={`p-6 rounded-3xl border-2 flex-row items-center justify-between ${
              prefs.experienceLevel === e.id
                ? 'bg-emerald-500/20 border-emerald-500'
                : `${theme.cardBg} ${theme.borderSubtle}`
            }`}
          >
            <View>
              <Typography className={`font-black text-lg ${prefs.experienceLevel === e.id ? 'text-emerald-400' : theme.text}`}>
                {isRtl ? e.labelAr : e.labelEn}
              </Typography>
              <Typography className={`text-sm mt-1 ${theme.textMuted}`}>{isRtl ? e.descAr : e.descEn}</Typography>
            </View>
            {prefs.experienceLevel === e.id && <Icon name="check" size={24} color="#10b981" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const isCurrentStepValid = () => {
    if (step === 1) return !!prefs.field;
    if (step === 2) return !!prefs.vibe;
    if (step === 3) return !!prefs.experienceLevel;
    return false;
  };

  return (
    <View className={`flex-1 ${theme.screenBg}`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: Math.max(insets.top, 40) }}>
        
        {/* Progress Dots */}
        <View className="flex-row justify-center gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <View key={i} className={`h-2 rounded-full ${step >= i ? 'bg-primary w-8' : `${theme.borderSubtle} w-2`}`} />
          ))}
        </View>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Footer */}
        <View className="mt-8 max-w-md mx-auto w-full flex-row justify-between items-center pb-8" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
          <TouchableOpacity
            onPress={() => {
              updatePreferences({ field: 'other', vibe: 'cinematic', experienceLevel: 'beginner', defaultEngine: 'midjourney' });
              setHasCompletedOnboarding(true);
              push('/');
            }}
          >
            <Typography className={`font-bold ${theme.textMuted}`}>{isRtl ? 'تخطي' : 'Skip'}</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isCurrentStepValid()}
            onPress={handleNext}
            className={`px-8 py-4 rounded-full flex-row items-center gap-2 ${
              isCurrentStepValid() ? 'bg-primary' : theme.cardBg
            }`}
          >
            <Typography className={`font-bold ${isCurrentStepValid() ? 'text-white' : theme.textMuted}`}>
              {step === 3 ? (isRtl ? 'إنهاء' : 'Finish') : (isRtl ? 'التالي' : 'Next')}
            </Typography>
            <Icon name="arrow-right" size={20} color={isCurrentStepValid() ? '#fff' : theme.colors.icon} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
