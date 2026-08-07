import React, { useState, useEffect } from 'react';
import { useTheme } from '../../design/useTheme';
import { View, ScreenContainer, ScrollView, TouchableOpacity, DecorativeBackground, ActivityIndicator } from '../../design/view';
import { Alert, Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../storage/store';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { TargetModel } from '../../engine/types';
import { formatPromptForModel } from '../../engine/PromptGenerator';
import { enhancePrompt } from '../../services/ai';

const { useParam } = createParam<{ generatedPrompt: string; category: string }>();



export function PreviewScreen() {
  const theme = useTheme();
  const [initialPrompt] = useParam('generatedPrompt');
  const [category] = useParam('category');
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { addPrompt } = useAppStore();
  const { push, back } = useRouter();

  const [displayPrompt, setDisplayPrompt] = useState<string>(initialPrompt || '');

  // Enhance state
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setDisplayPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleShare = async () => {
    if (Platform.OS === 'web') {
      if (navigator.share) {
        navigator.share({ text: displayPrompt });
      } else {
        navigator.clipboard.writeText(displayPrompt || '');
        window.alert('Prompt copied to clipboard!');
      }
    }
  };

  const handleSave = () => {
    if (!displayPrompt || !category) return;
    addPrompt({
      id: Date.now().toString(),
      category,
      prompt: displayPrompt,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    });
    if (Platform.OS === 'web') {
      window.alert('Success! Prompt saved to history!');
    } else {
      Alert.alert('Success', 'Prompt saved to history!');
    }
    push('/');
  };

  const handleEnhance = async () => {
    if (!displayPrompt || isEnhancing) return;
    setIsEnhancing(true);
    setEnhanceError(null);

    try {
      const lang = isRtl ? 'ar' : 'en';
      const improved = await enhancePrompt(displayPrompt, lang);
      setDisplayPrompt(improved);
      setIsEnhanced(true);
    } catch (err: any) {
      console.error('[Preview] enhance error:', err?.message);
      const msg = err?.message ?? '';
      if (msg.includes('network_error')) {
        setEnhanceError(isRtl ? '⚠️ تحقق من الاتصال بالإنترنت.' : '⚠️ Check your internet connection.');
      } else if (msg.includes('401')) {
        setEnhanceError(isRtl ? '🔑 مفتاح API غير صالح.' : '🔑 Invalid API key.');
      } else {
        setEnhanceError(isRtl ? '❌ فشل التحسين، حاول مرة أخرى.' : '❌ Enhancement failed. Try again.');
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 140 }}>
        <View className="max-w-4xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-10">
          <View className="flex-row items-center mb-6 md:mb-8">
            <TouchableOpacity onPress={() => back()} className={`w-10 h-10 md:w-12 md:h-12 ${theme.surface} rounded-xl md:rounded-2xl items-center justify-center border ${theme.border} backdrop-blur-md`}>
               <Icon name="back" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <View className="flex-1 items-center pr-10 md:pr-12">
              <Typography variant="h2" className={`text-xl md:text-2xl font-black ${theme.text}`}>
                {t('preview.title')}
              </Typography>
            </View>
          </View>

          <Typography variant="h1" className={`mb-4 md:mb-6 text-center text-3xl md:text-4xl font-black ${theme.text} px-2`}>
            {t('preview.subtitle', { defaultValue: 'Ready to use' })}
          </Typography>


          {/* Prompt display */}
          <View className={`mb-6 rounded-3xl md:rounded-4xl border-2 ${
            isEnhanced ? 'border-emerald-500/40' : 'border-primary/20'
          } overflow-hidden`}
          style={{
            backgroundColor: theme.isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(241, 245, 249, 1)',
          }}>
            {/* Enhanced badge */}
            {isEnhanced && (
              <View className="px-6 pt-4 pb-2 flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-emerald-400" />
                <Typography className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                  {isRtl ? 'تم التحسين بالذكاء الاصطناعي ' : 'AI Enhanced '}
                </Typography>
              </View>
            )}

            <View className="p-6 md:p-8">
              <Typography
                className="text-lg md:text-xl leading-[1.6] md:leading-[1.8] font-medium"
                style={{ color: theme.text }}
              >
                {displayPrompt}
              </Typography>
            </View>

            <View className={`bg-white/5 px-6 md:px-8 py-3 md:py-4 flex-row justify-between items-center border-t ${theme.borderSubtle}`}>
               <View className="flex-row items-center gap-2">
                 <Typography variant="caption" className="text-[10px] md:text-xs text-primary-glow font-bold uppercase tracking-wider">
                   {isRtl ? 'جاهز للنسخ' : 'Ready to copy'}
                 </Typography>
               </View>
               <TouchableOpacity
                 onPress={() => {
                   if (Platform.OS === 'web') {
                     navigator.clipboard.writeText(displayPrompt || '');
                     window.alert('Copied to clipboard!');
                   }
                 }}
                 className="flex-row items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20"
               >
                <Icon name="copy" size={16} color="#3b82f6" />
                <Typography className="text-xs font-bold text-primary-glow">Copy</Typography>
               </TouchableOpacity>
            </View>
          </View>

          {/* ✨ Enhance Prompt Button */}
          <View className="mb-4">
            <TouchableOpacity
              onPress={handleEnhance}
              disabled={isEnhancing}
              className={`w-full h-14 rounded-2xl flex-row items-center justify-center gap-3 border-2 ${
                isEnhancing
                  ? `${theme.surface} ${theme.borderSubtle} opacity-60`
                  : isEnhanced
                  ? 'bg-emerald-500/15 border-emerald-500/40'
                  : 'bg-violet-500/15 border-violet-500/40'
              }`}
            >
              {isEnhancing ? (
                <>
                  <ActivityIndicator size="small" color="#8b5cf6" />
                  <Typography className="font-bold text-sm text-violet-400">
                    {isRtl ? 'يحسّن الـ Prompt...' : 'Enhancing Prompt...'}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className="text-base">
                    {isEnhanced ? '✅' : ''}
                  </Typography>
                  <Typography className={`font-bold text-sm ${isEnhanced ? 'text-emerald-400' : 'text-violet-400'}`}>
                    {isEnhanced
                      ? (isRtl ? 'تم التحسين — حسّن مرة أخرى' : 'Enhanced — Improve Again')
                      : (isRtl ? 'تحسين الـ Prompt بالذكاء الاصطناعي' : 'Enhance Prompt with AI')}
                  </Typography>
                </>
              )}
            </TouchableOpacity>

            {/* Enhance error */}
            {enhanceError && (
              <View className="mt-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <Typography className="text-red-400 text-xs text-center">{enhanceError}</Typography>
              </View>
            )}
          </View>

          {/* Action buttons */}
          <View className="gap-4 md:gap-5 px-2">
            <Button
              title={t('preview.save')}
              onPress={handleSave}
              className="w-full h-14 md:h-16 bg-primary shadow-neon-blue rounded-2xl md:rounded-3xl"
              textClassName="text-white text-base md:text-lg"
            />
            <View className="flex-row gap-3 md:gap-4">
              <TouchableOpacity
                onPress={handleShare}
                className={`flex-1 h-14 md:h-16 ${theme.surface} border ${theme.border} rounded-2xl md:rounded-3xl items-center justify-center flex-row gap-2 md:gap-3`}
              >
                 <Icon name="share" size={18} color="#94a3b8" />
                 <Typography className={`${theme.textSecondary} font-bold text-base md:text-lg`}>{t('preview.share')}</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => back()}
                className={`flex-1 h-14 md:h-16 ${theme.surface} border ${theme.border} rounded-2xl md:rounded-3xl items-center justify-center flex-row gap-2 md:gap-3`}
              >
                 <Icon name="custom" size={18} color="#94a3b8" />
                 <Typography className={`${theme.textSecondary} font-bold text-base md:text-lg`}>{t('preview.edit')}</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
