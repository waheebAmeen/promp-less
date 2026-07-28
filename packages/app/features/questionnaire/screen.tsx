import React from 'react';
import { View, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { QuestionnaireEngine } from '../../engine/QuestionnaireEngine';
import { generatePrompt } from '../../engine/PromptGenerator';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../storage/store';

const { useParam } = createParam<{ category: string; idea: string }>();

export function QuestionnaireScreen() {
  const [category] = useParam('category');
  const [idea] = useParam('idea');
  const { i18n } = useTranslation();
  const { push, back } = useRouter();
  const { workflows, qualityBoosters } = useAppStore();

  const workflow = workflows.find(w => w.id === category);

  const handleGenerate = (answers: Record<string, string>) => {
    if (!workflow || !idea) return;
    const generatedPrompt = generatePrompt(workflow.template, idea, answers, qualityBoosters, 'midjourney');
    push({
      pathname: '/preview',
      query: { generatedPrompt, category },
    });
  };

  if (!workflow) {
    return (
      <View className="flex-1 bg-background justify-center items-center p-10">
        <Typography variant="h2" className="text-white mb-4 text-center">Workflow Not Found</Typography>
        <Button title="Return Home" onPress={() => push('/')} className="px-10" />
      </View>
    );
  }

  const questionnaireData = {
    category: workflow.id,
    template: workflow.template,
    questions: workflow.questions,
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <View className="border-b border-white/5 bg-background/50 backdrop-blur-md z-40">
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => back()} className="w-10 h-10 bg-surface/80 rounded-full items-center justify-center border border-slate-700/50 backdrop-blur-md">
             <Icon name="back" size={20} color="#94a3b8" />
          </TouchableOpacity>
          <View className="flex-1 pr-10 items-center">
            <Typography variant="h2" className="text-2xl font-bold text-white tracking-wide">
               {i18n.language === 'ar' ? workflow.name_ar : workflow.name_en}
            </Typography>
          </View>
        </View>
      </View>

      <View className="flex-1 max-w-4xl mx-auto w-full">
        <QuestionnaireEngine 
          questionnaire={questionnaireData} 
          onGenerate={handleGenerate} 
        />
      </View>
    </ScreenContainer>
  );
}

