import React from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Alert, Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { CustomSwitch as Switch } from '../../components/Switch';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../storage/store';
import { configureRTL } from '../../locales';
import { useRouter } from 'solito/router';
import { useTheme } from '../../design/useTheme';

export function SettingsScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { language, setLanguage, darkMode, toggleDarkMode, clearHistory } = useAppStore();
  const { back } = useRouter();

  const handleLanguageToggle = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    configureRTL(newLang);
    if (Platform.OS === 'web') {
      document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const handleClearHistory = () => {
    if (Platform.OS === 'web') {
      if (window.confirm("Are you sure you want to clear all history?")) {
        clearHistory();
      }
    } else {
      Alert.alert(
        "Clear History",
        "Are you sure you want to clear all history?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Clear", style: "destructive", onPress: () => clearHistory() }
        ]
      );
    }
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />

      <View className={`border-b ${theme.headerBorder} ${theme.headerBg} z-40`}>
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row justify-between items-center">
          <Typography variant="h1" className={`text-2xl font-bold tracking-wide ${theme.text}`}>
            {t('settings.title')}
          </Typography>
          <TouchableOpacity onPress={() => back()} className={`w-10 h-10 rounded-full items-center justify-center border ${theme.border} ${theme.glassBg}`}>
            <Icon name="back" size={20} color={theme.colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="max-w-4xl mx-auto w-full p-6 gap-6 pt-10">
          <View className={`${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} p-6 rounded-3xl md:rounded-4xl flex-row justify-between items-center`}>
            <View className="flex-1 mr-4">
              <Typography className={`text-lg font-bold mb-1 ${theme.text}`}>{t('settings.language')} (AR/EN)</Typography>
              <Typography variant="caption" className={`font-medium ${theme.textMuted}`}>تغيير لغة الواجهة والاتجاه</Typography>
            </View>
            <Switch 
              value={language === 'ar'} 
              onValueChange={handleLanguageToggle}
              trackColor={{ false: '#1e293b', true: '#3b82f6' }}
              thumbColor="#f8fafc"
            />
          </View>

          <View className={`${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} p-6 rounded-3xl md:rounded-4xl flex-row justify-between items-center`}>
            <View className="flex-1 mr-4">
              <Typography className={`text-lg font-bold mb-1 ${theme.text}`}>{t('settings.darkMode')}</Typography>
              <Typography variant="caption" className={`font-medium ${theme.textMuted}`}>تفعيل مظهر الحماية البصرية</Typography>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.colors.switchTrackOff, true: theme.colors.switchTrackOn }}
              thumbColor={theme.colors.thumbColor}
            />
          </View>
          
          <View className="mt-12">
            <Typography className={`mb-4 font-bold uppercase tracking-widest text-xs px-2 ${theme.textMuted}`}>Data Management</Typography>
            <TouchableOpacity 
              onPress={handleClearHistory} 
              className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl md:rounded-4xl flex-row items-center justify-between"
            >
               <View>
                  <Typography className="text-red-400 font-bold text-lg">Clear All History</Typography>
                  <Typography className="text-red-400/60 text-xs">سيتم حذف جميع الأوامر المحفوظة نهائياً</Typography>
               </View>
               <Icon name="delete" size={24} color="#f87171" />
            </TouchableOpacity>
          </View>

          <View className="mt-12 items-center py-10 opacity-40">
             <Typography variant="h2" className={`text-xl ${theme.text}`}>Promptless</Typography>
             <Typography variant="caption" className={`mt-1 ${theme.textMuted}`}>Version 1.0.0 (BETA)</Typography>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
