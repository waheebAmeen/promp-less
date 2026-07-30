import React, { useState } from 'react';
import { useTheme } from '../design/useTheme';
import { View, ScrollView, TouchableOpacity } from '../design/view';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Questionnaire, Question } from './types';
import { useSafeArea } from '../provider/safe-area/use-safe-area';
import { useAppStore } from '../storage/store';
import { useVoice } from '../hooks/useVoice';

interface Props {
  questionnaire: Questionnaire;
  onGenerate: (answers: Record<string, string>) => void;
}

export const QuestionnaireEngine: React.FC<Props> = ({ questionnaire, onGenerate }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const { aiDraft, clearAiDraft } = useAppStore();
  const theme = useTheme();
  // Pre-fill answers from AI draft if available for this workflow
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customAdditions, setCustomAdditions] = useState<Record<string, string>>({});
  const insets = useSafeArea();
  const { isListening, isSupported, startListening, stopListening } = useVoice();

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCustomChange = (questionId: string, text: string) => {
    setCustomAdditions((prev) => ({ ...prev, [questionId]: text }));
  };

  const getMergedAnswers = () => {
    const merged: Record<string, string> = {};
    questionnaire.questions.forEach(q => {
      const selected = answers[q.id] || '';
      const custom = customAdditions[q.id] || '';
      
      if (selected && custom) {
        merged[q.id] = `${selected}, ${custom}`;
      } else {
        merged[q.id] = selected || custom;
      }
    });
    return merged;
  };

  const totalSteps = questionnaire.questions.length;
  const currentQuestion = questionnaire.questions[currentStep];
  if (!currentQuestion) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  // Text questions are optional — user can skip without typing.
  // Choice questions require a selection (or custom text) before proceeding.
  const isCurrentStepAnswered =
    currentQuestion.type === 'text'
      ? true
      : !!answers[currentQuestion.id] || !!customAdditions[currentQuestion.id];

  return (
    <View className="flex-1 bg-transparent flex-col">
      {/* Progress Bar */}
      <View className="px-6 pt-4 pb-2">
        <View className={`h-1.5 w-full ${theme.cardBg} rounded-full overflow-hidden`}>
          <View 
            className="h-full bg-primary shadow-neon-primary" 
            style={{ width: `${progress}%` }} 
          />
        </View>
        <View className="flex-row justify-between mt-2 px-1">
          <Typography variant="caption" className="text-primary-glow font-bold">
            {t('common.step', { defaultValue: 'الخطوة' })} {currentStep + 1} / {totalSteps}
          </Typography>
          <Typography variant="caption" className={`${theme.textMuted} font-medium`}>
            {Math.round(progress)}%
          </Typography>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-6 py-4" contentContainerStyle={{ paddingBottom: 20 }}>
        <View key={currentQuestion.id} className={`${theme.cardBg} rounded-3xl md:rounded-4xl p-6 md:p-8 border ${theme.border} backdrop-blur-2xl shadow-premium`}>
          <Typography variant="h2" className={`mb-6 md:mb-8 text-xl md:text-2xl ${theme.text} font-black tracking-tight leading-tight`}>
            {isRtl ? currentQuestion.title_ar : currentQuestion.title_en}
          </Typography>
          
          <View className="gap-3 md:gap-4">
            {/* TEXT TYPE: render a large text input instead of option cards */}
            {currentQuestion.type === 'text' ? (
              <View className={`${theme.bg}/40 rounded-2xl md:rounded-3xl border ${theme.borderSubtle} overflow-hidden`}>
                <TextInput
                  placeholder={isRtl
                    ? (currentQuestion.placeholder_ar || 'اكتب هنا...')
                    : (currentQuestion.placeholder_en || 'Type here...')}
                  placeholderTextColor={theme.isDark ? '#475569' : '#94a3b8'}
                  value={answers[currentQuestion.id] || ''}
                  onChangeText={(text) => handleSelect(currentQuestion.id, text)}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  textAlign={isRtl ? 'right' : 'left'}
                  style={{
                    minHeight: 120,
                    color: theme.isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: 16,
                    lineHeight: 24,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontFamily: 'System',
                  }}
                />
                
                {/* Bottom Bar of Input for Mic */}
                <View className={`flex-row justify-end px-4 py-2 border-t ${theme.borderSubtle} ${theme.isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  {isSupported && (
                    <TouchableOpacity
                      onPress={() => {
                        if (isListening) stopListening();
                        else startListening(answers[currentQuestion.id] || '', (text) => handleSelect(currentQuestion.id, text));
                      }}
                      className={`w-8 h-8 rounded-full items-center justify-center ${
                        isListening ? 'bg-red-500/20 border border-red-500/40' : `${theme.surface} border ${theme.borderSubtle}`
                      }`}
                    >
                      {isListening ? (
                        <View className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
                      ) : (
                        <Icon name="mic" size={14} color={theme.colors.icon} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              /* SELECT / CHOICE TYPE: render option cards */
              <>
                {currentQuestion.options?.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  return (
                    <Card
                      key={option.value}
                      onPress={() => handleSelect(currentQuestion.id, option.value)}
                      className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-primary bg-primary/20 shadow-neon-blue' 
                          : '${theme.borderSubtle} ${theme.surface}/50'
                      }`}
                    >
                      <View className="flex-row items-center justify-between">
                        <Typography className={`text-base md:text-lg ${isSelected ? `${theme.text} font-bold` : `${theme.textSecondary} font-medium`}`}>
                          {isRtl ? option.label_ar : option.label_en}
                        </Typography>
                        {isSelected && (
                          <View className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full items-center justify-center shadow-neon-blue">
                             <Icon name="check" size={12} color="white" />
                          </View>
                        )}
                      </View>
                    </Card>
                  );
                })}

                {/* Custom Addition Field for choice-type questions */}
                <View className={`mt-4 md:mt-6 pt-4 md:pt-6 border-t ${theme.borderSubtle}`}>
                   <Typography variant="caption" className={`${theme.textMuted} mb-2 md:mb-3 font-bold uppercase tracking-widest text-[10px] md:text-xs`}>
                     {isRtl ? 'إضافة مخصصة لهذا القسم' : 'Custom detail for this section'}
                   </Typography>
                   <View className={`${theme.bg}/40 rounded-2xl md:rounded-3xl border ${theme.borderSubtle} overflow-hidden`}>
                     <TextInput
                       placeholder={isRtl ? 'اكتب تفاصيل إضافية هنا...' : 'Type extra details...'}
                       placeholderTextColor={theme.isDark ? '#475569' : '#94a3b8'}
                       value={customAdditions[currentQuestion.id] || ''}
                       onChangeText={(text) => handleCustomChange(currentQuestion.id, text)}
                       textAlign={isRtl ? 'right' : 'left'}
                       multiline
                       style={{
                         color: theme.isDark ? '#f1f5f9' : '#1e293b',
                         fontSize: 14,
                         minHeight: 60,
                         textAlignVertical: 'center',
                         paddingHorizontal: 14,
                         paddingVertical: 10,
                         fontFamily: 'System',
                       }}
                     />
                     
                     <View className={`absolute top-2 ${isRtl ? 'left-2' : 'right-2'}`}>
                       {isSupported && (
                         <TouchableOpacity
                           onPress={() => {
                             if (isListening) stopListening();
                             else startListening(customAdditions[currentQuestion.id] || '', (text) => handleCustomChange(currentQuestion.id, text));
                           }}
                           className={`w-7 h-7 rounded-full items-center justify-center ${
                             isListening ? 'bg-red-500/20 border border-red-500/40' : `${theme.surface} border ${theme.borderSubtle}`
                           }`}
                         >
                           {isListening ? (
                             <View className="w-2 h-2 bg-red-500 rounded-sm" />
                           ) : (
                             <Icon name="mic" size={12} color={theme.colors.icon} />
                           )}
                         </TouchableOpacity>
                       )}
                     </View>
                   </View>
                </View>
              </>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Navigation Bar - Relative for better safety */}
      <View 
        className={`${theme.bg}/90 backdrop-blur-3xl border-t ${theme.borderSubtle}`}
        style={{ 
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: Math.max(insets.bottom, 24) 
        }}
      >
        <View className="flex-row gap-3 md:gap-4">
          <TouchableOpacity 
            onPress={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : null}
            disabled={currentStep === 0}
            className={`flex-1 h-14 md:h-16 rounded-2xl md:rounded-3xl items-center justify-center ${theme.surface} border ${theme.border} ${currentStep === 0 ? 'opacity-20' : ''}`}
          >
             <Typography className={`${theme.textSecondary} font-bold text-base md:text-lg`}>{isRtl ? 'السابق' : 'Back'}</Typography>
          </TouchableOpacity>
          
          <Button
            title={isLastStep ? (isRtl ? 'توليد الأمر النهائي' : 'Generate Result') : (isRtl ? 'التالي' : 'Next')}
            onPress={() => {
              if (isLastStep) {
                clearAiDraft();
                onGenerate(getMergedAnswers());
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={!isCurrentStepAnswered}
            className={`flex-[2] h-14 md:h-16 rounded-2xl md:rounded-3xl ${!isCurrentStepAnswered ? 'opacity-30' : 'bg-primary shadow-neon-blue'}`}
          />
        </View>
      </View>
    </View>
  );
};
