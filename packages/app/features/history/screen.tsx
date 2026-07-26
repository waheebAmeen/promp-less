import React, { useState } from 'react';
import { View, ScreenContainer, FlatList, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useAppStore, PromptHistory } from '../../storage/store';
import { useRouter } from 'solito/router';

export function HistoryScreen() {
  const { t } = useTranslation();
  const { history, removePrompt } = useAppStore();
  const { back } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter(item => 
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t(`home.categories.${item.category}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <View className="border-b border-white/5 bg-background/50 backdrop-blur-md z-40">
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row justify-between items-center">
          <Typography variant="h1" className="text-2xl font-bold text-white tracking-wide">
            {t('history.title')}
          </Typography>
          <TouchableOpacity onPress={() => back()} className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-white/10 backdrop-blur-md">
            <Icon name="back" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="max-w-4xl mx-auto w-full flex-1">
        <View className="px-6 py-4 mt-4">
          <Input
            placeholder={t('history.search', { defaultValue: 'البحث في السجل...' })}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-surface/60 backdrop-blur-md border-white/10 h-14 px-6 rounded-2xl"
          />
        </View>
        
        {filteredHistory.length === 0 ? (
          <View className="flex-1 justify-center items-center p-8">
            <Typography className="text-slate-500 text-center text-lg font-medium">
              {history.length === 0 ? t('history.empty') : t('history.no_results', { defaultValue: 'لا توجد نتائج مطابقة' })}
            </Typography>
          </View>
        ) : (
          <FlatList
            data={filteredHistory}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            numColumns={Platform.OS === 'web' ? (history.length > 1 ? 2 : 1) : 1}
            key={Platform.OS === 'web' ? 'web-list' : 'mobile-list'}
            renderItem={({ item }: { item: any }) => (
              <View className="w-full md:w-1/2 p-2">
                <Card className="bg-surface-light/40 border border-white/5 shadow-glass p-6 rounded-3xl h-full">
                  <View className="flex-row justify-between items-center mb-5 border-b border-white/5 pb-3">
                    <View className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      <Typography variant="caption" className="uppercase text-primary-glow font-bold text-[10px]">
                        {t(`home.categories.${item.category}`)}
                      </Typography>
                    </View>
                    <TouchableOpacity onPress={() => removePrompt(item.id)} className="w-8 h-8 items-center justify-center bg-red-500/10 rounded-full border border-red-500/20">
                      <Icon name="delete" size={14} color="#f87171" />
                    </TouchableOpacity>
                  </View>
                  <Typography className="text-slate-200 text-base leading-relaxed" numberOfLines={5}>
                    {item.prompt}
                  </Typography>
                </Card>
              </View>
            )}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
