import React from 'react';
import { useTheme } from '../../design/useTheme';
import { View, ScreenContainer, TouchableOpacity, DecorativeBackground, ScrollView } from '../../design/view';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/Icon';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import { categoryTemplates } from '../../engine/templates';
import { useAppStore } from '../../storage/store';
import { useTranslation } from 'react-i18next';

const { useParam } = createParam<{ id: string }>();

export function CategoryScreen() {
  const theme = useTheme();
  const { push, back } = useRouter();
  const [id] = useParam('id');
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { workflows } = useAppStore();

  const category = workflows.find(w => w.id === id);
  const templatesData = categoryTemplates[id || ''] || {};
  const templates = Object.values(templatesData);

  if (!category) {
    return (
      <View className={`flex-1 ${theme.bg} justify-center items-center p-10`}>
        <Typography variant="h2" className={`${theme.text} mb-4 text-center`}>Category Not Found</Typography>
        <TouchableOpacity onPress={() => push('/')} className="px-10 py-3 bg-primary rounded-xl">
           <Typography className="text-white font-bold">Return Home</Typography>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <DecorativeBackground />
      
      {/* Header */}
      <View className={`border-b ${theme.borderSubtle} ${theme.headerBg} backdrop-blur-md z-40`}>
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => back()} className={`w-10 h-10 ${theme.surface}/80 rounded-full items-center justify-center border border-slate-700/50 backdrop-blur-md`}>
             <Icon name="back" size={20} color="#94a3b8" />
          </TouchableOpacity>
          <View className="flex-1 px-4 items-center flex-row justify-center gap-3">
            <Icon name={category.icon as any} size={24} color={category.iconColor} />
            <Typography variant="h2" className={`text-2xl font-bold ${theme.text} tracking-wide`}>
               {isRtl ? category.name_ar : category.name_en}
            </Typography>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="max-w-4xl mx-auto w-full px-6 pt-10">
          <Typography className={`text-lg font-medium mb-8 ${theme.textMuted} text-center`}>
            {isRtl ? 'اختر التفرع أو الموضوع المناسب' : 'Choose a specific branch or topic'}
          </Typography>

          <View className="flex-row flex-wrap justify-start">
            {templates.length === 0 ? (
               <Typography className={`w-full text-center mt-10 ${theme.textMuted}`}>
                  {isRtl ? 'لا توجد تفرعات متاحة في هذا القسم بعد' : 'No branches available yet'}
               </Typography>
            ) : (
              templates.map((template: any) => (
                <View key={template.id} className="w-full md:w-1/2 p-2">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className={`w-full overflow-hidden rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.cardShadow} flex-row items-center p-5`}
                    onPress={() => push(`/category/${id}/questionnaire/${template.id}`)}
                  >
                    <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isRtl ? 'ml-4' : 'mr-4'} ${category.color} border ${category.borderColor}`}>
                      <Icon name={category.icon as any} size={24} color={category.iconColor} />
                    </View>
                    <View className="flex-1">
                      <Typography variant="h2" className={`text-lg font-bold mb-1 ${theme.text}`}>
                        {template.title}
                      </Typography>
                      {template.description && (
                        <Typography variant="caption" className={`text-xs font-medium ${theme.textMuted}`} numberOfLines={2}>
                          {template.description}
                        </Typography>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
