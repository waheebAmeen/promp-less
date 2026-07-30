import React from 'react';
import { useTheme } from '../../design/useTheme';
import { View, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { QuestionnaireEngine } from '../../engine/QuestionnaireEngine';
import { generatePrompt } from '../../engine/PromptGenerator';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { categoryTemplates } from '../../engine/templates';
import { useAppStore } from '../../storage/store';

const { useParam } = createParam<{ templateId: string, id: string }>();

export function CategoryQuestionnaireScreen() {
  const theme = useTheme();
  const [templateId] = useParam('templateId');
  const [id] = useParam('id');
  const { push, back } = useRouter();

  // Find the template
  const templatesData = categoryTemplates[id || ''] || {};
  const workflow = Object.values(templatesData).find((w: any) => w.id === templateId) as any;

  const handleGenerate = (answers: Record<string, string>) => {
    if (!workflow) return;
    // We pass the generic targetModel based on the category or keep it empty for ChatGPT processing if it's text.
    // For images we want to use the default target model (e.g. Midjourney) but here we can just pass 'midjourney' or let it be default.
    // Assuming prompt generator handles the formatting properly.
    const textCategories = ['study', 'marketing', 'writing', 'other', 'coding'];
    const generatedPrompt = generatePrompt(
      workflow.template,
      '',
      answers,
      [],
      textCategories.includes(id || '') ? 'chatgpt' : 'midjourney'
    );
    push({
      pathname: '/preview',
      query: { generatedPrompt, category: id || 'category' },
    });
  };

  if (!workflow) {
    return (
      <View className={`flex-1 ${theme.bg} justify-center items-center p-10`}>
        <Typography variant="h2" className={`${theme.text} mb-4 text-center`}>Template Not Found</Typography>
        <Button title="Return Home" onPress={() => push('/')} className="px-10" />
      </View>
    );
  }

  const mappedQuestions = workflow.questions.map((q: any) => ({
    id: q.id,
    title_ar: q.label || q.title_ar || q.id,
    title_en: q.label || q.title_en || q.id,
    type: (q.type === 'text' || q.type === 'text_only') ? 'text' : 'select',
    options: q.options
      ? q.options.map((opt: any) => {
          // Handle plain strings (e.g. study.ts, coding.ts, marketing.ts)
          if (typeof opt === 'string') {
            return { label_ar: opt, label_en: opt, value: opt };
          }
          // Handle objects that already have the shape {label_ar, label_en, value}
          return {
            label_ar: opt.label_ar ?? opt.label ?? opt.value ?? opt,
            label_en: opt.label_en ?? opt.label ?? opt.value ?? opt,
            value: opt.value ?? opt.label ?? opt,
          };
        })
      : [],
    placeholder_ar: q.placeholder || q.placeholder_ar || '',
    placeholder_en: q.placeholder || q.placeholder_en || '',
  }));


  const questionnaireData = {
    category: workflow.id,
    template: workflow.template,
    questions: mappedQuestions,
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <View className={`border-b ${theme.borderSubtle} ${theme.headerBg} backdrop-blur-md z-40`}>
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => back()} className={`w-10 h-10 ${theme.surface}/80 rounded-full items-center justify-center border border-slate-700/50 backdrop-blur-md`}>
             <Icon name="back" size={20} color="#94a3b8" />
          </TouchableOpacity>
          <View className="flex-1 px-4 items-center">
            <Typography variant="h2" className={`text-2xl font-bold ${theme.text} tracking-wide`} numberOfLines={1}>
               {workflow.title}
            </Typography>
          </View>
        </View>
      </View>

      <View className="flex-1 max-w-4xl mx-auto w-full">
        <QuestionnaireEngine 
          questionnaire={questionnaireData as any} 
          onGenerate={handleGenerate} 
        />
      </View>
    </ScreenContainer>
  );
}
