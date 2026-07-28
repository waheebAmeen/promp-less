import React, { useState } from 'react';
import { View, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../storage/store';

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { darkMode, toggleDarkMode, setLanguage, language } = useAppStore();
  const [step, setStep] = useState<'splash' | 'slides'>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      stepNum: '01',
      icon: 'sparkles',
      title: isRtl ? "أنشئ Prompts احترافية بسهولة." : "Create professional Prompts easily.",
      desc: isRtl 
        ? "منصة تساعد أي شخص على صياغة أفضل أفكاره وتحويلها إلى أمر متكامل ودقيق."
        : "A platform helping anyone transform ideas into detailed, high-impact prompts."
    },
    {
      stepNum: '02',
      icon: 'apps',
      title: isRtl ? "لا تحتاج لأي خبرة." : "No prior experience required.",
      desc: isRtl 
        ? "دون الحاجة لمعرفة مسبقة بهندسة الأوامر (Prompt Engineering)، الحوار الذكي يوجهك خطوة بخطوة."
        : "Without any prompt engineering background, our smart director workflow guides you effortlessly."
    },
    {
      stepNum: '03',
      icon: 'share',
      title: isRtl ? "استخدمها مع ChatGPT و Claude و Gemini وغيرها." : "Use with ChatGPT, Claude, Gemini & more.",
      desc: isRtl 
        ? "انسخ الـ Prompt الناتج واستخدمه مباشرة في منصة أو نموذج الذكاء الاصطناعي الذي تفضله."
        : "Copy your crafted prompt and execute it directly in your preferred AI platform."
    }
  ];

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      {/* Header controls (Language & Dark Mode Toggle) */}
      <View className="flex-row justify-between items-center px-6 pt-6 z-20">
        <TouchableOpacity 
          onPress={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className={`px-3 py-1.5 rounded-full border ${darkMode ? 'bg-surface/60 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <Typography className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === 'ar' ? 'English' : 'العربية'}
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={toggleDarkMode}
          className={`w-10 h-10 rounded-full items-center justify-center border ${darkMode ? 'bg-surface/60 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <Icon name={darkMode ? 'settings' : 'apps'} size={18} color={darkMode ? '#f59e0b' : '#3b82f6'} />
        </TouchableOpacity>
      </View>

      {/* Step 1: Splash Screen */}
      {step === 'splash' ? (
        <View className="flex-1 justify-center items-center px-6 text-center max-w-lg mx-auto w-full">
          <View className="w-24 h-24 rounded-3xl bg-primary/20 items-center justify-center border-2 border-primary/40 shadow-neon-blue mb-8">
             <Typography className="text-5xl font-black text-primary-glow">P</Typography>
          </View>

          <Typography variant="h1" className={`text-4xl md:text-5xl font-black mb-4 text-center tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Promptless
          </Typography>

          <Typography className={`text-lg md:text-xl font-medium text-center mb-12 leading-relaxed max-w-md ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {isRtl ? "حوّل فكرتك إلى Prompt احترافي في أقل من دقيقة." : "Turn your idea into a professional Prompt in less than a minute."}
          </Typography>

          <Button 
            title={isRtl ? "ابدأ الآن" : "Start Now"}
            onPress={() => setStep('slides')}
            className="w-full h-16 rounded-2xl bg-primary shadow-neon-blue"
            textClassName="text-white font-black text-lg"
          />
        </View>
      ) : (
        /* Step 2: 3-Step Onboarding Slides */
        <View className="flex-1 justify-between px-6 pt-10 pb-12 max-w-lg mx-auto w-full">
          {/* Top Skip Bar */}
          <View className="flex-row justify-between items-center mb-8">
             <View className="flex-row gap-2">
               {slides.map((_, idx) => (
                 <View 
                   key={idx} 
                   className={`h-2 rounded-full ${idx === currentSlide ? 'w-8 bg-primary' : (darkMode ? 'w-2 bg-white/20' : 'w-2 bg-slate-300')}`} 
                 />
               ))}
             </View>
             <TouchableOpacity onPress={onComplete} className="px-3 py-1">
                <Typography className={`font-bold text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isRtl ? "تخطي" : "Skip"}
                </Typography>
             </TouchableOpacity>
          </View>

          {/* Current Slide Content */}
          <View className="flex-1 justify-center items-center text-center px-2">
             <View className={`w-20 h-20 rounded-3xl items-center justify-center mb-8 border ${darkMode ? 'bg-surface/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Typography className="text-2xl font-black text-primary">{slides[currentSlide].stepNum}</Typography>
             </View>

             <Typography variant="h1" className={`text-2xl md:text-3xl font-black mb-4 text-center leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
               {slides[currentSlide].title}
             </Typography>

             <Typography className={`text-base font-medium text-center leading-relaxed max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
               {slides[currentSlide].desc}
             </Typography>
          </View>

          {/* Bottom Actions */}
          <View className="gap-4">
             <Button 
               title={currentSlide === slides.length - 1 ? (isRtl ? "ابدأ" : "Start") : (isRtl ? "التالي" : "Next")}
               onPress={handleNextSlide}
               className="w-full h-16 rounded-2xl bg-primary shadow-neon-blue"
               textClassName="text-white font-black text-lg"
             />
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
