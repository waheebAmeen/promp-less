import React, { useState } from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTheme } from '../../design/useTheme';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { useAppStore } from '../../storage/store';
import { configureRTL } from '../../locales';

const ScrollReveal = ({ children, delay = 0, className = "w-full flex-col" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = React.useState(Platform.OS !== 'web');
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'IntersectionObserver' in window && ref.current) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay); 
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(ref.current as any);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [delay]);

  return (
    <View ref={ref} className={className}>
      <View 
        style={{ 
          opacity: isVisible ? 1 : 0, 
          transform: [{ translateY: isVisible ? 0 : 40 }],
          ...(Platform.OS === 'web' ? { transition: 'opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' } as any : {})
        }}
      >
        {children}
      </View>
    </View>
  );
};

export function LandingScreen() {
  const { t, i18n } = useTranslation();
  const { push } = useRouter();
  const { toggleDarkMode, setLanguage: storeSetLanguage } = useAppStore();
  const theme = useTheme();
  const isRtl = i18n.language === 'ar';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleLanguage = () => {
    const newLang = isRtl ? 'en' : 'ar';
    storeSetLanguage(newLang);
    i18n.changeLanguage(newLang);
    configureRTL(newLang);
    if (Platform.OS === 'web') {
      document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const steps = [
    { icon: 'apps' as const, title: t('landing.how_steps.0.title'), desc: t('landing.how_steps.0.desc') },
    { icon: 'text' as const, title: t('landing.how_steps.1.title'), desc: t('landing.how_steps.1.desc') },
    { icon: 'images' as const, title: t('landing.how_steps.2.title'), desc: t('landing.how_steps.2.desc') },
    { icon: 'copy' as const, title: t('landing.how_steps.3.title'), desc: t('landing.how_steps.3.desc') },
  ];

  const features = [
    { icon: 'camera' as const, title: t('landing.features_items.0.title'), desc: t('landing.features_items.0.desc') },
    { icon: 'check' as const, title: t('landing.features_items.1.title'), desc: t('landing.features_items.1.desc') },
    { icon: 'images' as const, title: t('landing.features_items.2.title'), desc: t('landing.features_items.2.desc') },
    { icon: 'text' as const, title: t('landing.features_items.3.title'), desc: t('landing.features_items.3.desc') },
    { icon: 'user' as const, title: t('landing.features_items.4.title'), desc: t('landing.features_items.4.desc') },
    { icon: 'apps' as const, title: t('landing.features_items.5.title'), desc: t('landing.features_items.5.desc') },
  ];

  const stats = [
    { value: '11+', label: t('landing.stats_items.0.label') },
    { value: '7+', label: t('landing.stats_items.1.label') },
    { value: '∞', label: t('landing.stats_items.2.label') },
  ];

  const faqs = [
    { q: t('landing.faq_items.0.q'), a: t('landing.faq_items.0.a') },
    { q: t('landing.faq_items.1.q'), a: t('landing.faq_items.1.a') },
    { q: t('landing.faq_items.2.q'), a: t('landing.faq_items.2.a') },
    { q: t('landing.faq_items.3.q'), a: t('landing.faq_items.3.a') },
    { q: t('landing.faq_items.4.q'), a: t('landing.faq_items.4.a') },
  ];

  return (
    <ScreenContainer>
      <DecorativeBackground />

      {/* ═══════ Sticky Navigation Bar ═══════ */}
      <View className={`${theme.headerBg} border-b ${theme.headerBorder} z-50 px-4 md:px-6 pt-3 md:pt-4 pb-2 md:pb-3`}>
        <View className={`max-w-6xl mx-auto w-full flex-row items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Typography variant="h2" className={`text-lg md:text-xl font-black tracking-tight ${theme.text}`}>
            Promptless
          </Typography>

          <View className={`flex-row items-center gap-2 md:gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {/* Theme Toggle */}
            <TouchableOpacity
              onPress={toggleDarkMode}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full items-center justify-center ${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'}`}
            >
              <Typography className="text-sm md:text-base">{theme.isDark ? '☀️' : '🌙'}</Typography>
            </TouchableOpacity>

            {/* Language Toggle */}
            <TouchableOpacity
              onPress={toggleLanguage}
              className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border ${theme.border} ${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'}`}
            >
              <Typography className={`text-xs font-bold ${theme.textSecondary}`}>
                {isRtl ? 'EN' : 'عربي'}
              </Typography>
            </TouchableOpacity>

            {/* Sign In Link — hidden on mobile to save space */}
            <TouchableOpacity onPress={() => push('/login')} className="hidden md:flex py-2 px-3">
              <Typography className={`font-semibold ${theme.textSecondary}`}>
                {t('landing.nav_signin')}
              </Typography>
            </TouchableOpacity>

            {/* Get Started CTA */}
            <TouchableOpacity
              onPress={() => push('/login')}
              className="bg-primary py-2 md:py-2.5 px-4 md:px-6 rounded-full shadow-neon-primary"
              activeOpacity={0.8}
            >
              <Typography className="text-white font-bold text-xs md:text-sm">{t('landing.nav_start')}</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ═══════ Scrollable Content ═══════ */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO SECTION ── */}
        <View className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-10 md:pt-20 pb-10 md:pb-16 items-center">
          {/* Badge */}
          <ScrollReveal delay={0} className="items-center">
            <View className="bg-primary/10 border border-primary/20 px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-5 md:mb-8">
              <Typography className="text-primary font-bold text-[10px] md:text-xs tracking-widest uppercase">
                {t('landing.hero_badge')}
              </Typography>
            </View>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150} className="items-center w-full">
            <Typography
              variant="h1"
              className={`text-center mb-4 md:mb-6 font-black leading-tight tracking-tighter ${theme.text} text-3xl md:text-4xl lg:text-5xl`}
            >
              {t('landing.hero_title')}
            </Typography>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={300} className="items-center w-full">
            <Typography
              className={`text-center text-sm md:text-lg mb-8 md:mb-12 max-w-xl leading-relaxed ${theme.textMuted}`}
            >
              {t('landing.hero_subtitle')}
            </Typography>
          </ScrollReveal>

          {/* CTA Buttons — stack vertically on mobile */}
          <ScrollReveal delay={450} className="items-center w-full">
            <View className={`flex-col md:flex-row items-center gap-3 md:gap-4 justify-center w-full md:w-auto ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              <TouchableOpacity
                onPress={() => push('/login')}
                className="bg-primary py-3.5 md:py-4 px-10 rounded-2xl shadow-neon-primary w-full md:w-auto items-center"
                activeOpacity={0.8}
              >
                <Typography className="text-white font-bold text-base md:text-lg">{t('landing.hero_cta')}</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => push('/login')}
                className={`py-3.5 md:py-4 px-10 rounded-2xl border-2 border-primary/30 w-full md:w-auto items-center ${theme.isDark ? 'bg-primary/5' : 'bg-primary/5'}`}
                activeOpacity={0.8}
              >
                <Typography className="text-primary font-bold text-base md:text-lg">{t('landing.hero_cta2')}</Typography>
              </TouchableOpacity>
            </View>
          </ScrollReveal>

          {/* Decorative Glow */}
          <View className="mt-10 md:mt-16 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </View>

        {/* ── HOW IT WORKS ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <ScrollReveal delay={100} className="items-center">
            <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
              {t('landing.how_badge')}
            </Typography>
            <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
              {t('landing.how_title')}
            </Typography>
          </ScrollReveal>

          <View className="relative w-full max-w-4xl mt-4 mb-16 mx-auto">
            {/* ── Mobile Path Line ── */}
            <View 
              className={`md:hidden absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10 ${isRtl ? 'right-6' : 'left-6'}`} 
              style={{ transform: [{ translateX: isRtl ? 2 : -2 }] }} 
            />

            <View className="flex-col w-full">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                const isCardOnLeft = isEven ? !isRtl : isRtl;

                return (
                  <ScrollReveal key={idx} delay={(idx % 2) * 150} className="w-full flex-col">
                    <View className={`relative w-full mb-12 md:mb-6 flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      
                      {/* Desktop Zigzag Wave */}
                      <View className="hidden md:flex absolute top-0 bottom-0 left-1/2 w-[120px] -ml-[60px] z-0">
                        {isCardOnLeft ? (
                          // Left Wave (<)
                          <View className="absolute top-0 bottom-0 right-1/2 w-[60px]">
                            <View className="absolute top-0 left-0 right-0 border-primary/40" style={{ height: '50%', borderRightWidth: 3, borderBottomWidth: 3, borderBottomRightRadius: 40 }} />
                            <View className="absolute bottom-0 left-0 right-0 border-primary/40" style={{ top: '50%', marginTop: -3, borderRightWidth: 3, borderTopWidth: 3, borderTopRightRadius: 40 }} />
                          </View>
                        ) : (
                          // Right Wave (>)
                          <View className="absolute top-0 bottom-0 left-1/2 w-[60px]">
                            <View className="absolute top-0 left-0 right-0 border-primary/40" style={{ height: '50%', borderLeftWidth: 3, borderBottomWidth: 3, borderBottomLeftRadius: 40 }} />
                            <View className="absolute bottom-0 left-0 right-0 border-primary/40" style={{ top: '50%', marginTop: -3, borderLeftWidth: 3, borderTopWidth: 3, borderTopLeftRadius: 40 }} />
                          </View>
                        )}
                      </View>

                      {/* Desktop Horizontal Connector Line (from Peak to Card) */}
                      <View 
                        className="hidden md:flex absolute top-1/2 h-0.5 bg-primary/40 z-0" 
                        style={{ 
                          width: 36,
                          left: '50%',
                          marginLeft: isCardOnLeft ? -96 : 60,
                          transform: [{ translateY: -1 }] 
                        }} 
                      />

                      {/* Desktop Node Dot */}
                      <View 
                        className="hidden md:flex absolute top-1/2 w-5 h-5 rounded-full bg-primary/20 items-center justify-center shadow-neon-primary z-10" 
                        style={{ 
                          left: '50%', 
                          marginLeft: isCardOnLeft ? -60 : 60,
                          transform: [{ translateX: -10 }, { translateY: -10 }] 
                        }}
                      >
                        <View className="w-2.5 h-2.5 bg-primary rounded-full shadow-neon-primary" />
                      </View>

                      {/* Mobile Node Dot */}
                      <View 
                        className={`md:hidden absolute top-1/2 w-5 h-5 rounded-full bg-primary/20 items-center justify-center shadow-neon-primary z-10 ${isRtl ? 'right-6' : 'left-6'}`} 
                        style={{ transform: [{ translateX: isRtl ? 10 : -10 }, { translateY: -10 }] }}
                      >
                        <View className="w-2.5 h-2.5 bg-primary rounded-full shadow-neon-primary" />
                      </View>

                      {/* Card Container */}
                      <View className={`w-full md:w-1/2 ${isRtl ? 'pr-20 md:pr-0' : 'pl-20 md:pl-0'} ${isCardOnLeft ? 'md:pr-24 md:pl-0' : 'md:pl-24 md:pr-0'} py-4 items-center md:${isEven ? 'items-end' : 'items-start'}`}>
                        
                        <View className={`${theme.glassBg} border ${theme.glassBorder} rounded-3xl p-6 items-center shadow-lg w-full max-w-[320px] relative`}>
                          
                          {/* Step Number */}
                          <View className={`absolute -top-5 ${isEven ? (isRtl ? 'md:-left-5' : 'md:-right-5') : (isRtl ? 'md:-right-5' : 'md:-left-5')} md:top-auto md:bottom-auto w-10 h-10 rounded-xl bg-primary items-center justify-center shadow-neon-primary z-20`}>
                            <Typography className="text-white font-black text-lg">{idx + 1}</Typography>
                          </View>

                          <View className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center mb-5 mt-2">
                            <Icon name={step.icon} size={28} color="#5D5FEF" />
                          </View>

                          <Typography className={`font-bold text-xl mb-3 text-center ${theme.text}`}>
                            {step.title}
                          </Typography>
                          <Typography className={`text-center text-sm leading-relaxed ${theme.textMuted}`}>
                            {step.desc}
                          </Typography>
                          
                        </View>
                      </View>

                    </View>
                  </ScrollReveal>
                );
              })}
            </View>
          </View>
        </View>

        {/* ── FEATURES ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <ScrollReveal delay={100} className="items-center">
            <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
              {t('landing.features_badge')}
            </Typography>
            <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
              {t('landing.features_title')}
            </Typography>
          </ScrollReveal>

          <View className={`flex-row flex-wrap justify-center gap-5 w-full ${isRtl ? 'flex-row-reverse' : ''}`} style={{ maxWidth: 900 }}>
            {features.map((feature, idx) => (
              <ScrollReveal
                key={idx}
                delay={(idx % 3) * 150}
                className="w-auto flex-col"
              >
                <View
                  className={`${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} rounded-3xl p-6`}
                  style={{ width: 270 }}
                >
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-5 ${
                    theme.isDark ? 'bg-primary/15 border border-primary/20' : 'bg-primary/10 border border-primary/15'
                  }`}>
                    <Icon name={feature.icon} size={22} color="#5D5FEF" />
                  </View>
                  <Typography className={`font-bold text-lg mb-2 ${theme.text}`}>{feature.title}</Typography>
                  <Typography className={`text-sm leading-relaxed ${theme.textMuted}`}>{feature.desc}</Typography>
                </View>
              </ScrollReveal>
            ))}
          </View>
        </View>

        {/* ── STATS / TRUST SECTION ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <ScrollReveal delay={100} className="items-center">
            <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-8">
              {t('landing.stats_badge')}
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={200} className="w-full items-center">
            <View className={`${theme.glassBg} border ${theme.glassBorder} rounded-4xl p-10 w-full`} style={{ maxWidth: 800 }}>
              <View className={`flex-row justify-around items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                {stats.map((stat, idx) => (
                  <View key={idx} className="items-center px-4">
                    <Typography className="text-primary font-black mb-2" style={{ fontSize: 48 }}>
                      {stat.value}
                    </Typography>
                    <Typography className={`text-center font-medium ${theme.textMuted}`}>{stat.label}</Typography>
                  </View>
                ))}
              </View>
            </View>
          </ScrollReveal>
        </View>

        {/* ── FAQ ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <ScrollReveal delay={100} className="items-center">
            <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
              {t('landing.faq_badge')}
            </Typography>
            <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
              {t('landing.faq_title')}
            </Typography>
          </ScrollReveal>

          <View className="w-full" style={{ maxWidth: 700 }}>
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} delay={(idx % 5) * 100} className="w-full">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`mb-3 ${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} rounded-2xl overflow-hidden`}
                >
                  <View className={`p-5 flex-row items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Typography className={`font-bold text-base flex-1 ${theme.text} ${isRtl ? 'text-right mr-0 ml-4' : 'text-left mr-4'}`}>
                      {faq.q}
                    </Typography>
                    <View className={`w-8 h-8 rounded-full items-center justify-center ${openFaq === idx ? 'bg-primary/20' : theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'}`}>
                      <Typography className={`font-bold ${openFaq === idx ? 'text-primary' : theme.textMuted}`}>
                        {openFaq === idx ? '−' : '+'}
                      </Typography>
                    </View>
                  </View>
                  {openFaq === idx && (
                    <View className={`px-5 pb-5 border-t ${theme.borderSubtle} pt-4`}>
                      <Typography className={`text-sm leading-relaxed ${theme.textMuted} ${isRtl ? 'text-right' : 'text-left'}`}>
                        {faq.a}
                      </Typography>
                    </View>
                  )}
                </TouchableOpacity>
              </ScrollReveal>
            ))}
          </View>
        </View>

        {/* ── FINAL CTA ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <ScrollReveal delay={150} className="w-full items-center">
            <View className={`bg-primary/5 border border-primary/15 rounded-4xl p-12 w-full items-center ${theme.isDark ? 'bg-primary/10 border-primary/20' : ''}`} style={{ maxWidth: 800 }}>
              <Typography variant="h1" className={`text-center text-3xl font-black mb-4 tracking-tight ${theme.text}`}>
                {t('landing.cta_title')}
              </Typography>
              <Typography className={`text-center text-lg mb-10 max-w-md leading-relaxed ${theme.textMuted}`}>
                {t('landing.cta_subtitle')}
              </Typography>
              <TouchableOpacity
                onPress={() => push('/login')}
                className="bg-primary py-4 px-12 rounded-2xl shadow-neon-primary"
                activeOpacity={0.8}
              >
                <Typography className="text-white font-bold text-lg">{t('landing.cta_button')}</Typography>
              </TouchableOpacity>
            </View>
          </ScrollReveal>
        </View>

        {/* ── FOOTER ── */}
        <View className={`border-t ${theme.borderSubtle} py-8 px-6 items-center`}>
          <Typography className={`text-sm ${theme.textMuted}`}>
            {t('landing.footer_copy')}
          </Typography>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
