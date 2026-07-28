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
      <View className={`${theme.headerBg} border-b ${theme.headerBorder} z-50 px-6 pt-4 pb-3`}>
        <View className={`max-w-6xl mx-auto w-full flex-row items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Typography variant="h2" className={`text-xl font-black tracking-tight ${theme.text}`}>
            Promptless
          </Typography>

          <View className={`flex-row items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {/* Theme Toggle */}
            <TouchableOpacity
              onPress={toggleDarkMode}
              className={`w-9 h-9 rounded-full items-center justify-center ${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'}`}
            >
              <Typography className="text-base">{theme.isDark ? '☀️' : '🌙'}</Typography>
            </TouchableOpacity>

            {/* Language Toggle */}
            <TouchableOpacity
              onPress={toggleLanguage}
              className={`px-3 py-1.5 rounded-full border ${theme.border} ${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'}`}
            >
              <Typography className={`text-xs font-bold ${theme.textSecondary}`}>
                {isRtl ? 'EN' : 'عربي'}
              </Typography>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity onPress={() => push('/login')} className="py-2 px-3">
              <Typography className={`font-semibold ${theme.textSecondary}`}>
                {t('landing.nav_signin')}
              </Typography>
            </TouchableOpacity>

            {/* Get Started CTA */}
            <TouchableOpacity
              onPress={() => push('/login')}
              className="bg-primary py-2.5 px-6 rounded-full shadow-neon-primary"
              activeOpacity={0.8}
            >
              <Typography className="text-white font-bold text-sm">{t('landing.nav_start')}</Typography>
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
        <View className="max-w-6xl mx-auto w-full px-6 pt-20 pb-16 items-center">
          {/* Badge */}
          <View className="bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-8">
            <Typography className="text-primary font-bold text-xs tracking-widest uppercase">
              {t('landing.hero_badge')}
            </Typography>
          </View>

          {/* Main Heading */}
          <Typography
            variant="h1"
            className={`text-center mb-6 font-black leading-tight tracking-tighter ${theme.text}`}
            style={{ fontSize: 48, lineHeight: 56 }}
          >
            {t('landing.hero_title')}
          </Typography>

          {/* Subtitle */}
          <Typography
            className={`text-center text-lg mb-12 max-w-xl leading-relaxed ${theme.textMuted}`}
          >
            {t('landing.hero_subtitle')}
          </Typography>

          {/* CTA Buttons */}
          <View className={`flex-row items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <TouchableOpacity
              onPress={() => push('/login')}
              className="bg-primary py-4 px-10 rounded-2xl shadow-neon-primary"
              activeOpacity={0.8}
            >
              <Typography className="text-white font-bold text-lg">{t('landing.hero_cta')}</Typography>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => push('/login')}
              className={`py-4 px-10 rounded-2xl border-2 border-primary/30 ${theme.isDark ? 'bg-primary/5' : 'bg-primary/5'}`}
              activeOpacity={0.8}
            >
              <Typography className="text-primary font-bold text-lg">{t('landing.hero_cta2')}</Typography>
            </TouchableOpacity>
          </View>

          {/* Decorative Glow */}
          <View className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </View>

        {/* ── HOW IT WORKS ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
            {t('landing.how_badge')}
          </Typography>
          <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
            {t('landing.how_title')}
          </Typography>

          <View className={`flex-row flex-wrap justify-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {steps.map((step, idx) => (
              <View
                key={idx}
                className={`${theme.glassBg} border ${theme.glassBorder} rounded-3xl p-7 items-center`}
                style={{ width: 260 }}
              >
                {/* Step Number */}
                <View className="w-12 h-12 rounded-2xl bg-primary items-center justify-center mb-5 shadow-neon-primary">
                  <Typography className="text-white font-black text-lg">{idx + 1}</Typography>
                </View>

                {/* Icon */}
                <View className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center mb-5">
                  <Icon name={step.icon} size={24} color="#5D5FEF" />
                </View>

                <Typography className={`font-bold text-lg mb-2 text-center ${theme.text}`}>
                  {step.title}
                </Typography>
                <Typography className={`text-center text-sm leading-relaxed ${theme.textMuted}`}>
                  {step.desc}
                </Typography>

                {/* Connector Arrow (not on last) */}
                {idx < steps.length - 1 && (
                  <View className="absolute -right-4 top-1/2 hidden md:flex">
                    <Typography className="text-primary/40 text-2xl">→</Typography>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ── FEATURES ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
            {t('landing.features_badge')}
          </Typography>
          <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
            {t('landing.features_title')}
          </Typography>

          <View className={`flex-row flex-wrap justify-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`} style={{ maxWidth: 900 }}>
            {features.map((feature, idx) => (
              <View
                key={idx}
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
            ))}
          </View>
        </View>

        {/* ── STATS / TRUST SECTION ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-8">
            {t('landing.stats_badge')}
          </Typography>

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
        </View>

        {/* ── FAQ ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
          <Typography className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4">
            {t('landing.faq_badge')}
          </Typography>
          <Typography variant="h1" className={`text-center text-3xl font-black mb-16 tracking-tight ${theme.text}`}>
            {t('landing.faq_title')}
          </Typography>

          <View className="w-full" style={{ maxWidth: 700 }}>
            {faqs.map((faq, idx) => (
              <TouchableOpacity
                key={idx}
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
            ))}
          </View>
        </View>

        {/* ── FINAL CTA ── */}
        <View className="max-w-6xl mx-auto w-full px-6 py-16 items-center">
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
