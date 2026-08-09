import React, { useState, useEffect } from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Linking, Platform, TextInput } from 'react-native';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { useAppStore } from '../../storage/store';
import { useSafeArea } from '../../provider/safe-area/use-safe-area';
import { useTheme } from '../../design/useTheme';
import { useVoice } from '../../hooks/useVoice';
import { motion } from "framer-motion";
import { OnboardingScreen } from '../onboarding/OnboardingScreen';
import { PreferencesDrawer } from '../settings/PreferencesDrawer';


const SOCIAL_LINKS = [
  { name: 'X', url: 'https://twitter.com/anasalsabri' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anasalsabri' },
  { name: 'GitHub', url: 'https://github.com/anasalsabri' },
  { name: 'YouTube', url: 'https://www.youtube.com/@anas.ax.r' },
  { name: 'Instagram', url: 'https://www.instagram.com/anas.axr' },
];

export function HomeScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { push } = useRouter();
  const { user, isAuthenticated, logout, workflows, hasCompletedOnboarding } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const insets = useSafeArea();
  const theme = useTheme();
  const { isListening, isSupported, startListening, stopListening } = useVoice();

  // Magic Input state
  const [magicIdea, setMagicIdea] = useState('');
  const [complexity, setComplexity] = useState<'simple' | 'complex'>('simple');
  const [aiError, setAiError] = useState<string | null>(null);

  // ترتيب الأقسام المخصص (قم بتعديل الترتيب هنا حسب رغبتك)
  const categoryOrder = ['study', 'coding', 'writing', 'marketing'];

 
  const filteredWorkflows = workflows
    .filter(w => w.isActive)
    .sort((a, b) => {
      // إذا كان العنصر الأول هو other، اجعله في النهاية
      if (a.id === 'other') return 1;
      // إذا كان العنصر الثاني هو other، اجعل الأول قبله
      if (b.id === 'other') return -1;
 // إذا كان العنصر الأول هو other، اجعله في النهاية
      if (a.id === 'video') return 1;
      // إذا كان العنصر الثاني هو other، اجعل الأول قبله
      if (b.id === 'video') return -1;
      const indexA = categoryOrder.indexOf(a.id);
      const indexB = categoryOrder.indexOf(b.id);
      return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />;
  }

  const handleMagicSubmit = () => {
    const trimmed = magicIdea.trim();
    if (!trimmed) return;
    setAiError(null);
    push({
      pathname: '/questionnaire/dynamic',
      query: { idea: trimmed, mode: complexity },
    });
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />
      
      {/* Sleek Sidebar Drawer */}
      {isMenuOpen && (
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/60 z-50 backdrop-blur-sm"
        >
           <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className={`absolute top-0 bottom-0 w-72 ${theme.navBg} ${theme.navBorder} z-50 flex-col ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}`}
           >
              {/* Sidebar Header */}
              <View className={`p-6 border-b ${theme.border} flex-row items-center justify-between`}>
                 <Typography variant="h2" className={`${theme.text} font-black text-xl tracking-tighter`}>Promptless</Typography>
                 <TouchableOpacity onPress={() => setIsMenuOpen(false)} className="w-8 h-8 items-center justify-center">
                    <Icon name="back" size={18} color={theme.colors.icon} />
                 </TouchableOpacity>
              </View>

              <ScrollView className="flex-1 px-4 py-6">
                {/* Navigation Section */}
                <View className="mb-8">
                  <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">{isRtl ? 'التنقل' : 'Navigation'}</Typography>
                  <View className="gap-1">
                    {[
                      { id: 'home', label: isRtl ? 'استكشاف' : 'Explore', icon: 'apps', route: '/' },
                      { id: 'history', label: isRtl ? 'مكتبتي' : 'My Library', icon: 'history', route: '/history' },
                      { id: 'settings', label: isRtl ? 'الإعدادات' : 'Settings', icon: 'settings', route: '/settings' },
                    ].map(item => (
                      <TouchableOpacity 
                        key={item.id}
                        onPress={() => { setIsMenuOpen(false); push(item.route); }}
                        className="flex-row items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5"
                      >
                        <Icon name={item.icon as any} size={18} color="#94a3b8" />
                        <Typography className={`${theme.textSecondary} font-medium`}>{item.label}</Typography>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity 
                      onPress={() => { setIsMenuOpen(false); setIsPreferencesOpen(true); }}
                      className="flex-row items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5"
                    >
                      <Icon name="custom" size={18} color="#94a3b8" />
                      <Typography className={`${theme.textSecondary} font-medium`}>{isRtl ? 'تفضيلات الذكاء الاصطناعي' : 'AI Preferences'}</Typography>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Admin Section */}
                {user?.role === 'admin' && (
                  <View className="mb-8">
                    <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">{isRtl ? 'الإدارة' : 'Administration'}</Typography>
                    <TouchableOpacity 
                      onPress={() => { setIsMenuOpen(false); push('/admin'); }}
                      className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20"
                    >
                       <Icon name="settings" size={18} color="#3b82f6" />
                       <Typography className="text-primary-glow font-bold">{isRtl ? 'مركز التحكم' : 'Command Center'}</Typography>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Account Section */}
                <View className="mb-8">
                  <Typography variant="caption" className={`mb-4 px-2 uppercase font-bold text-[10px] tracking-widest ${theme.textMuted}`}>{isRtl ? 'الحساب' : 'Account'}</Typography>
                  <View className={`${theme.isDark ? 'bg-white/5' : 'bg-light-surface-container'} p-4 rounded-2xl border ${theme.borderSubtle} flex-row items-center gap-3`}>
                     <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center border border-primary/30">
                        <Typography className="text-primary-glow font-bold">{user?.name?.[0] || 'U'}</Typography>
                     </View>
                     <View className="flex-1 overflow-hidden">
                        <Typography className={`${theme.text} font-bold text-sm`} numberOfLines={1}>{user?.name}</Typography>
                        <Typography variant="caption" className={`text-xs ${theme.textMuted}`} numberOfLines={1}>{user?.email}</Typography>
                     </View>
                  </View>
                </View>

                {/* Social Section */}
                <View>
                  <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">{isRtl ? 'المطور' : 'Developer'}</Typography>
                  <View className="flex-row flex-wrap gap-2 px-2">
                     {SOCIAL_LINKS.map(link => (
                       <TouchableOpacity key={link.name} onPress={() => Linking.openURL(link.url)} className={`w-8 h-8 rounded-lg ${theme.cardBg} items-center justify-center border ${theme.border}`}>
                          <Typography className="text-[10px] text-slate-400 font-bold">{link.name.substring(0, 2)}</Typography>
                       </TouchableOpacity>
                     ))}
                  </View>
                </View>
              </ScrollView>

              {/* Sidebar Footer */}
              <View className={`p-4 border-t ${theme.borderSubtle}`}>
                 <TouchableOpacity onPress={logout} className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <Icon name="delete" size={16} color="#f87171" />
                    <Typography className="text-red-400 font-bold text-sm">{isRtl ? 'تسجيل الخروج' : 'Sign Out'}</Typography>
                 </TouchableOpacity>
              </View>
           </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* Main Header */}
      <View className={`border-b ${theme.headerBorder} ${theme.headerBg} z-40`}>
        <View className="max-w-6xl mx-auto w-full px-6 py-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => setIsMenuOpen(true)} className={`w-10 h-10 ${theme.cardBg} rounded-xl items-center justify-center border ${theme.border}`}>
            <View className="gap-1 items-center">
                <View className={`w-5 h-0.5 rounded-full ${theme.isDark ? 'bg-slate-400' : 'bg-slate-600'}`} />
                <View className={`w-3 h-0.5 rounded-full ${theme.isDark ? 'bg-slate-400' : 'bg-slate-600'}`} />
                <View className={`w-5 h-0.5 rounded-full ${theme.isDark ? 'bg-slate-400' : 'bg-slate-600'}`} />
            </View>
          </TouchableOpacity>
          
          <Typography variant="h2" className={`text-xl font-black tracking-tight ${theme.text}`}>Promptless</Typography>
          
          <TouchableOpacity onPress={() => push('/settings')} className={`w-10 h-10 ${theme.cardBg} rounded-xl items-center justify-center border ${theme.border} overflow-hidden`}>
             <Icon name="settings" size={20} color={theme.colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingBottom: 160,
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-6xl mx-auto w-full px-6 pt-12">
          {/* Professional Hero Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="mb-12"
>


  {/* Title */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25 }}
  >
    <Typography
      variant="h1"
      className={`${theme.text}
      text-5xl
      md:text-7xl
      font-black
      leading-[1.05]
      tracking-tight
      max-w-4xl`}
    >
      نظام المدير الإبداعي
    </Typography>
  </motion.div>

  {/* Description */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mt-8"
  >
    <Typography
      variant="caption"
      className={`
        text-lg
        md:text-xl
        leading-9
        max-w-2xl
        font-medium
        ${theme.textMuted}
      `}
    >
      أنشئ مطالبات بصرية احترافية باستخدام تدفقات عمل ذكية،
      وتوجيه فني متقدم، وأدوات تساعدك على إنتاج نتائج عالية الجودة
      بسرعة ودقة.
    </Typography>
  </motion.div>
</motion.div>

          {/* ✨ Magic AI Input */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
            className="mb-12 relative"
          >
            {/* Breathing Aura Glow Behind Input */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl"
              style={{ zIndex: -1 }}
            />

            {/* Glowing Label */}
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 items-center justify-center">
                <Typography className="text-[8px]">✨</Typography>
              </View>
              <Typography className="text-primary-glow font-black text-xs uppercase tracking-[0.2em]">
                {isRtl ? 'المدخل الذكي — اكتب فكرتك' : 'Magic Input — Type your idea'}
              </Typography>
            </View>

            {/* Input Container */}
            <View className={`rounded-3xl border-2 overflow-hidden backdrop-blur-3xl ${theme.border} ${theme.cardBg}`}>
              <TextInput
                value={magicIdea}
                onChangeText={(text) => {
                  setMagicIdea(text);
                  if (aiError) setAiError(null);
                }}
                placeholder={
                  isRtl
                    ? 'مثال: أريد بناء خطة تسويقية لمطعم عربي فاخر...'
                    : 'e.g. I want a cinematic photo of a knight in a desert storm...'
                }
                placeholderTextColor={theme.isDark ? '#475569' : '#94a3b8'}
                multiline
                numberOfLines={3}
                style={{
                  color: theme.isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: 16,
                  lineHeight: 24,
                  padding: 20,
                  minHeight: 90,
                  textAlignVertical: 'top',
                  fontFamily: Platform.OS === 'web' ? 'inherit' : undefined,
                  direction: isRtl ? 'rtl' : 'ltr',
                  textAlign: isRtl ? 'right' : 'left',
                }}
              />

              {/* Bottom Bar of Input */}
              <View className={`flex-row flex-wrap items-center justify-between gap-3 px-4 py-3 border-t ${theme.borderSubtle} ${theme.isDark ? 'bg-white/3' : 'bg-black/3'}`}>
                <View className="flex-row items-center gap-3">
                  <Typography variant="caption" className={`text-xs ${theme.textMuted}`}>
                    {isRtl ? 'يعمل بـ Cohere · Command A' : 'Powered by Cohere · Command A'}
                  </Typography>

                  {/* Mic Button */}
                  {isSupported && (
                    <TouchableOpacity
                      onPress={() => {
                        if (isListening) stopListening();
                        else startListening(magicIdea, (text) => setMagicIdea(text));
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

                {/* Send Button */}
                <TouchableOpacity
                  onPress={handleMagicSubmit}
                  disabled={!magicIdea.trim()}
                  className={`flex-row items-center gap-2 px-5 py-2.5 rounded-2xl ${
                    magicIdea.trim()
                      ? 'bg-primary shadow-neon-blue'
                      : theme.isDark ? 'bg-white/5' : 'bg-black/5'
                  }`}
                >
                  <Typography className={`font-bold text-sm ${magicIdea.trim() ? 'text-white' : theme.textMuted}`}>
                    {isRtl ? 'ابدأ بالذكاء الاصطناعي' : 'AI Start'}
                  </Typography>
                  <Icon name="check" size={14} color={magicIdea.trim() ? '#ffffff' : theme.colors.icon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Hint: More detail = better results */}
            <View className="flex-row items-center gap-1.5 mt-2 px-1">
              <Typography className="text-[10px]">💡</Typography>
              <Typography className={`text-xs ${theme.textMuted}`}>
                {isRtl
                  ? 'كلما كان وصفك أكثر تفصيلاً، كانت النتائج أفضل'
                  : 'The more detailed your description, the better the results'}
              </Typography>
            </View>

            {/* Complexity Mode Selector */}
            {magicIdea.trim().length > 0 && (
              <View className="mt-3 flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setComplexity('simple')}
                  className={`flex-1 py-3 rounded-2xl border-2 items-center ${
                    complexity === 'simple'
                      ? 'bg-blue-500/20 border-blue-500'
                      : theme.isDark
                        ? 'bg-white/5 border-white/15'
                        : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  <Typography
                    className={`font-black text-sm ${
                      complexity === 'simple'
                        ? 'text-blue-500'
                        : theme.isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {isRtl ? '⚡ مبسط' : '⚡ Simple'}
                  </Typography>
                  <Typography
                    className={`text-[10px] mt-0.5 ${
                      complexity === 'simple'
                        ? 'text-blue-400'
                        : theme.isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {isRtl ? 'سريع · 3-10 أسئلة' : 'Fast · 3-10 questions'}
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setComplexity('complex')}
                  className={`flex-1 py-3 rounded-2xl border-2 items-center ${
                    complexity === 'complex'
                      ? 'bg-violet-500/20 border-violet-500'
                      : theme.isDark
                        ? 'bg-white/5 border-white/15'
                        : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  <Typography
                    className={`font-black text-sm ${
                      complexity === 'complex'
                        ? 'text-violet-500'
                        : theme.isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {isRtl ? '🎯 مفصل ودقيق' : '🎯 Detailed'}
                  </Typography>
                  <Typography
                    className={`text-[10px] mt-0.5 ${
                      complexity === 'complex'
                        ? 'text-violet-400'
                        : theme.isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {isRtl ? 'دقيق · 10-25 سؤالاً' : 'Deep · 10-25 questions'}
                  </Typography>
                </TouchableOpacity>
              </View>
            )}
            {aiError && (
              <View className="mt-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex-row items-start gap-2">
                <Typography className="text-red-400 text-sm leading-relaxed">{aiError}</Typography>
              </View>
            )}

            {/* Separator */}
            <View className="flex-row items-center gap-4 mt-8 mb-2">
              <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <Typography className={`text-xs font-bold uppercase tracking-widest ${theme.textMuted}`}>
                {isRtl ? 'أو اختر تدفقاً' : 'or choose a workflow'}
              </Typography>
              <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            </View>
          </motion.div>

          {/* Categories Grid */}
          <View className="flex-row flex-wrap justify-start">
            {/* Study & Education Fixed Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
              className="w-1/2 md:w-1/3 lg:w-1/5 p-1.5 md:p-2"
            >
              <TouchableOpacity
                activeOpacity={0.7}
                className={`w-full overflow-hidden rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.cardShadow}`}
                onPress={() => push(`/category/study`)}
              >
                <View className="p-5">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-5 bg-blue-500/10 border border-blue-500/20`}>
                    <Icon name="text" size={24} color="#3b82f6" strokeWidth={2.5} />
                  </View>
                  <Typography variant="h2" className={`text-lg font-bold mb-1 ${theme.text}`}>
                    {isRtl ? 'الدراسة والتعليم' : 'Education'}
                  </Typography>
                  <Typography variant="caption" className={`text-xs font-medium ${theme.textMuted}`}>
                    {isRtl ? 'تلقينات نصية' : 'Text Prompts'}
                  </Typography>
                </View>
              </TouchableOpacity>
            </motion.div>

            {filteredWorkflows.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (index % 5 + 1) * 0.1, ease: "easeOut" }}
                className="w-1/2 md:w-1/3 lg:w-1/5 p-1.5 md:p-2"
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={`w-full overflow-hidden rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.cardShadow}`}
                  onPress={() => push(`/category/${cat.id}`)}
                >
                  <View className="p-5">
                    <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-5 ${cat.color} border ${cat.borderColor}`}>
                      <Icon name={cat.icon as any} size={24} color={cat.iconColor} strokeWidth={2.5} />
                    </View>
                    <Typography variant="h2" className={`text-lg font-bold mb-1 ${theme.text}`}>
                      {isRtl ? cat.name_ar : cat.name_en}
                    </Typography>
                    <Typography variant="caption" className={`text-xs font-medium ${theme.textMuted}`}>
                      Start Workflow
                    </Typography>
                  </View>
                </TouchableOpacity>
              </motion.div>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Minimal Bottom Bar */}
      <View 
        className="absolute left-0 right-0 z-40 px-8"
        style={{ bottom: Math.max(insets.bottom, 24) }}
      >
        <View className="max-w-md mx-auto w-full">
          <View className={`h-16 ${theme.navBg} border ${theme.navBorder} rounded-full shadow-premium flex-row items-center justify-around px-2`}>
            {[
              { id: 'home', icon: 'apps', route: '/' },
              { id: 'history', icon: 'history', route: '/history' },
              { id: 'settings', icon: 'settings', route: '/settings' },
            ].map(tab => (
              <TouchableOpacity 
                key={tab.id}
                onPress={() => push(tab.route)} 
                className={`items-center justify-center w-12 h-12 rounded-full ${tab.id === 'home' ? 'bg-primary/20 border border-primary/30' : ''}`}
              >
                <Icon name={tab.icon as any} size={20} color={tab.id === 'home' ? '#3b82f6' : theme.colors.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <PreferencesDrawer 
        isOpen={isPreferencesOpen} 
        onClose={() => setIsPreferencesOpen(false)} 
      />
    </ScreenContainer>
  );
}