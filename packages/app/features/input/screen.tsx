import React, { useState } from 'react';
import { useTheme } from '../../design/useTheme';
import { View, ScreenContainer, KeyboardAvoidingView, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';

const { useParam } = createParam<{ category: string }>();

export function IdeaInputScreen() {
  const theme = useTheme();
  const [category] = useParam('category');
  const { t } = useTranslation();
  const [idea, setIdea] = useState('');
  const { push, back } = useRouter();

  const handleNext = () => {
    if (idea.trim().length > 0) {
      push({
        pathname: `/questionnaire/[category]`,
        query: { category, idea: idea.trim() },
      });
    }
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="max-w-4xl mx-auto w-full flex-1 px-4 md:px-6 pt-6 md:pt-10">
          <View className="flex-row items-center mb-8 md:mb-12">
            <TouchableOpacity onPress={() => back()} className={`w-10 h-10 md:w-12 md:h-12 ${theme.surface} rounded-xl md:rounded-2xl items-center justify-center border ${theme.border} backdrop-blur-md`}>
               <Icon name="back" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <View className="flex-1 items-center pr-10 md:pr-12">
              <Typography variant="h2" className={`text-xl md:text-2xl font-black ${theme.text}`}>
                {t(`home.categories.${category}`)}
              </Typography>
            </View>
          </View>

          <View className="flex-1">
            <Typography className={`${theme.textMuted} mb-3 md:mb-4 font-medium px-2`}>{t('input.label', { defaultValue: 'What is on your mind?' })}</Typography>
            <View className={`${theme.cardBg} rounded-3xl md:rounded-4xl border ${theme.borderSubtle} shadow-glass overflow-hidden`}>
              <Input
                multiline
                numberOfLines={10}
                placeholder={t('input.placeholder')}
                value={idea}
                onChangeText={setIdea}
                className="h-60 md:h-80 align-top text-lg md:text-xl text-slate-100 bg-transparent border-0 px-5 md:px-6 py-5 md:py-6"
                style={{ minHeight: Platform.OS === 'web' ? 250 : 200 }}
              />
              <View className={`flex-row justify-between items-center px-5 md:px-6 py-3 md:py-4 bg-white/5 border-t ${theme.borderSubtle}`}>
                <View className="flex-row gap-2">
                   <Icon name="text" size={14} color="#475569" />
                   <Typography variant="caption" className={`${theme.textMuted} font-bold text-xs md:text-sm`}>Smart Input</Typography>
                </View>
                <Typography variant="caption" className={`font-bold text-xs md:text-sm ${idea.length > 100 ? 'text-primary' : '${theme.textMuted}'}`}>
                  {idea.length} {t('input.char_count', { defaultValue: 'chars' })}
                </Typography>
              </View>
            </View>
          </View>

          <View className="pb-8 md:pb-10 pt-4 md:pt-6">
            <Button 
              title={t('input.next')} 
              onPress={handleNext} 
              disabled={idea.trim().length === 0}
              className={`w-full h-14 md:h-16 rounded-2xl md:rounded-3xl ${idea.trim().length === 0 ? 'opacity-30 ${theme.surface} border ${theme.border}' : 'bg-primary'}`}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
