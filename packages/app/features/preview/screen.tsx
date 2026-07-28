import React, { useState, useEffect } from 'react';
import { View, ScreenContainer, ScrollView, TouchableOpacity, DecorativeBackground } from '../../design/view';
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

const { useParam } = createParam<{ generatedPrompt: string; category: string }>();

const TARGET_MODELS: { id: TargetModel; label: string; badge: string }[] = [
  { id: 'midjourney', label: 'Midjourney v6', badge: 'MJ' },
  { id: 'flux', label: 'Flux.1', badge: 'FLUX' },
  { id: 'sdxl', label: 'SDXL 1.0', badge: 'SDXL' },
  { id: 'dalle3', label: 'DALL·E 3', badge: 'DALL-E' },
  { id: 'ideogram', label: 'Ideogram 2.0', badge: 'IDEO' },
  { id: 'recraft', label: 'Recraft V3', badge: 'RC' },
  { id: 'leonardo', label: 'Leonardo AI', badge: 'LEO' },
];

export function PreviewScreen() {
  const [initialPrompt] = useParam('generatedPrompt');
  const [category] = useParam('category');
  const { t } = useTranslation();
  const { addPrompt } = useAppStore();
  const { push, back } = useRouter();

  const [selectedModel, setSelectedModel] = useState<TargetModel>('midjourney');
  const [displayPrompt, setDisplayPrompt] = useState<string>(initialPrompt || '');

  useEffect(() => {
    if (initialPrompt) {
      setDisplayPrompt(formatPromptForModel(initialPrompt, selectedModel));
    }
  }, [initialPrompt, selectedModel]);

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
      window.alert("Success! Prompt saved to history!");
    } else {
      Alert.alert("Success", "Prompt saved to history!");
    }
    push('/');
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 140 }}>
        <View className="max-w-4xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-10">
          <View className="flex-row items-center mb-6 md:mb-8">
            <TouchableOpacity onPress={() => back()} className="w-10 h-10 md:w-12 md:h-12 bg-surface rounded-xl md:rounded-2xl items-center justify-center border border-white/10 backdrop-blur-md">
               <Icon name="back" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <View className="flex-1 items-center pr-10 md:pr-12">
              <Typography variant="h2" className="text-xl md:text-2xl font-black text-white">
                {t('preview.title')}
              </Typography>
            </View>
          </View>

          <Typography variant="h1" className="mb-4 md:mb-6 text-center text-3xl md:text-4xl font-black text-white px-2">
            {t('preview.subtitle', { defaultValue: 'Ready to use' })}
          </Typography>

          {/* AI Model Target Selector */}
          <View className="mb-6">
            <Typography variant="caption" className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3 px-2">
              Select Target AI Model Engine
            </Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 px-1">
              {TARGET_MODELS.map((model) => {
                const isActive = selectedModel === model.id;
                return (
                  <TouchableOpacity
                    key={model.id}
                    onPress={() => setSelectedModel(model.id)}
                    className={`px-4 py-2.5 rounded-2xl flex-row items-center gap-2 border ${
                      isActive
                        ? 'bg-primary/20 border-primary/50 shadow-neon-blue'
                        : 'bg-surface/40 border-white/5'
                    }`}
                  >
                    <View className={`px-1.5 py-0.5 rounded-md ${isActive ? 'bg-primary' : 'bg-white/10'}`}>
                      <Typography className="text-[10px] font-black text-white">{model.badge}</Typography>
                    </View>
                    <Typography className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {model.label}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View className="mb-8 md:mb-10 rounded-3xl md:rounded-4xl border-2 border-primary/20 bg-surface/60 shadow-neon-blue overflow-hidden backdrop-blur-2xl">
            <View className="p-6 md:p-8">
              <Typography className="text-lg md:text-xl leading-[1.6] md:leading-[1.8] text-slate-100 font-medium">
                {displayPrompt}
              </Typography>
            </View>
            <View className="bg-white/5 px-6 md:px-8 py-3 md:py-4 flex-row justify-between items-center border-t border-white/5">
               <View className="flex-row items-center gap-2">
                 <Typography variant="caption" className="text-[10px] md:text-xs text-primary-glow font-bold uppercase tracking-wider">
                   Optimized for {TARGET_MODELS.find(m => m.id === selectedModel)?.label}
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
                className="flex-1 h-14 md:h-16 bg-surface border border-white/10 rounded-2xl md:rounded-3xl items-center justify-center flex-row gap-2 md:gap-3"
              >
                 <Icon name="share" size={18} color="#94a3b8" />
                 <Typography className="text-slate-300 font-bold text-base md:text-lg">{t('preview.share')}</Typography>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => back()}
                className="flex-1 h-14 md:h-16 bg-surface border border-white/10 rounded-2xl md:rounded-3xl items-center justify-center flex-row gap-2 md:gap-3"
              >
                 <Icon name="custom" size={18} color="#94a3b8" />
                 <Typography className="text-slate-300 font-bold text-base md:text-lg">{t('preview.edit')}</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

