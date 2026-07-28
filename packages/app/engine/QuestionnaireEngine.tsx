import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from '../design/view';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { useTranslation } from 'react-i18next';
import { Questionnaire, Question } from './types';
import { useSafeArea } from '../provider/safe-area/use-safe-area';

interface Props {
  questionnaire: Questionnaire;
  onGenerate: (answers: Record<string, string>) => void;
}

export const QuestionnaireEngine: React.FC<Props> = ({ questionnaire, onGenerate }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customAdditions, setCustomAdditions] = useState<Record<string, string>>({});
  const insets = useSafeArea();

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

  // A step is considered "answered" if they have a selection OR custom text
  const isCurrentStepAnswered = !!answers[currentQuestion.id] || !!customAdditions[currentQuestion.id];

  return (
    <View className="flex-1 bg-transparent flex-col">
      {/* Progress Bar */}
      <View className="px-6 pt-4 pb-2">
        <View className="h-1.5 w-full bg-surface-light/30 rounded-full overflow-hidden">
          <View 
            className="h-full bg-primary shadow-neon-primary" 
            style={{ width: `${progress}%` }} 
          />
        </View>
        <View className="flex-row justify-between mt-2 px-1">
          <Typography variant="caption" className="text-primary-glow font-bold">
            {t('common.step', { defaultValue: 'الخطوة' })} {currentStep + 1} / {totalSteps}
          </Typography>
          <Typography variant="caption" className="text-slate-500 font-medium">
            {Math.round(progress)}%
          </Typography>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-6 py-4" contentContainerStyle={{ paddingBottom: 20 }}>
        <View key={currentQuestion.id} className="bg-surface-light/30 rounded-3xl md:rounded-4xl p-6 md:p-8 border border-white/10 backdrop-blur-2xl shadow-premium">
          <Typography variant="h2" className="mb-6 md:mb-8 text-xl md:text-2xl text-white font-black tracking-tight leading-tight">
            {isRtl ? currentQuestion.title_ar : currentQuestion.title_en}
          </Typography>
          
          <View className="gap-3 md:gap-4">
            {currentQuestion.options?.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <Card
                  key={option.value}
                  onPress={() => handleSelect(currentQuestion.id, option.value)}
                  className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary bg-primary/20 shadow-neon-blue' 
                      : 'border-white/5 bg-surface/50'
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <Typography className={`text-base md:text-lg ${isSelected ? 'text-white font-bold' : 'text-slate-300 font-medium'}`}>
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

            {/* Custom Addition Field for THIS specific question */}
            <View className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5">
               <Typography variant="caption" className="text-slate-400 mb-2 md:mb-3 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                 {isRtl ? 'إضافة مخصصة لهذا القسم' : 'Custom detail for this section'}
               </Typography>
               <View className="bg-background/40 rounded-2xl md:rounded-3xl border border-white/5 p-1 md:p-2">
                 <Input
                   placeholder={isRtl ? 'اكتب تفاصيل إضافية هنا...' : 'Type extra details...'}
                   value={customAdditions[currentQuestion.id] || ''}
                   onChangeText={(text) => handleCustomChange(currentQuestion.id, text)}
                   className="text-slate-100 bg-transparent border-0 px-3 md:px-4 py-2 md:py-3"
                 />
               </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Bar - Relative for better safety */}
      <View 
        className="bg-background/90 backdrop-blur-3xl border-t border-white/5"
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
            className={`flex-1 h-14 md:h-16 rounded-2xl md:rounded-3xl items-center justify-center bg-surface border border-white/10 ${currentStep === 0 ? 'opacity-20' : ''}`}
          >
             <Typography className="text-slate-300 font-bold text-base md:text-lg">{isRtl ? 'السابق' : 'Back'}</Typography>
          </TouchableOpacity>
          
          <Button
            title={isLastStep ? (isRtl ? 'توليد الأمر النهائي' : 'Generate Result') : (isRtl ? 'التالي' : 'Next')}
            onPress={() => isLastStep ? onGenerate(getMergedAnswers()) : setCurrentStep(currentStep + 1)}
            disabled={!isCurrentStepAnswered}
            className={`flex-[2] h-14 md:h-16 rounded-2xl md:rounded-3xl ${!isCurrentStepAnswered ? 'opacity-30' : 'bg-primary shadow-neon-blue'}`}
          />
        </View>
      </View>
    </View>
  );
};
