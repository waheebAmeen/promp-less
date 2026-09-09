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
  const { user, isAuthenticated, logout, workflows, hasCompletedOnboarding, setHasCompletedOnboarding } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // Auto-open AI Preferences drawer for first-time users
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      setIsPreferencesOpen(true);
    }
  }, [hasCompletedOnboarding]);
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
                 <TouchableOpacity 
                   onPress={() => { setIsMenuOpen(false); setIsPreferencesOpen(true); }} 
                   className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20"
                 >
                    <Icon name="custom" size={16} color="#3b82f6" />
                    <Typography className="text-primary-glow font-bold text-sm">{isRtl ? 'تعديل التفضيلات' : 'Edit Preferences'}</Typography>
                 </TouchableOpacity>
              </View>
           </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* Main Header */}
      <View className={`border-b ${theme.headerBorder} ${theme.headerBg} z-40`}>
        <View className="max-w-6xl mx-auto w-full px-4 md:px-8 py-3.5 flex-row justify-between items-center">
          {/* Logo & Mobile Drawer Toggle */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity 
              onPress={() => setIsMenuOpen(true)} 
              className="w-10 h-10 rounded-xl items-center justify-center hover:bg-[#006666]/20 transition-all duration-200"
              activeOpacity={0.7}
            >
              <View className="gap-1 items-center">
                  <View className="w-5 h-0.5 rounded-full bg-[#33CCCC]" />
                  <View className="w-3.5 h-0.5 rounded-full bg-[#33CCCC]" />
                  <View className="w-5 h-0.5 rounded-full bg-[#33CCCC]" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => push('/')} activeOpacity={0.8} className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-lg bg-[#006666]/30 border border-[#33CCCC]/40 items-center justify-center">
                <Typography className="text-[#33CCCC] font-black text-base">P</Typography>
              </View>
              <Typography 
                variant="h2" 
                className="text-xl md:text-2xl font-black tracking-tight text-white" 
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Promptless
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Action Buttons (Clean Ghost Buttons) */}
          <View className="flex-row items-center gap-1 sm:gap-2">
            {/* Desktop Action Links */}
            <View className="hidden md:flex flex-row items-center gap-1">
              {[
                { id: 'home', label: isRtl ? 'استكشاف' : 'Explore', icon: 'apps', route: '/' },
                { id: 'history', label: isRtl ? 'مكتبتي' : 'My Library', icon: 'history', route: '/history' },
              ].map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => push(item.route)}
                  className="flex-row items-center gap-2 px-3.5 py-2 rounded-xl hover:bg-[#006666]/25 transition-all duration-200"
                  activeOpacity={0.7}
                >
                  <Icon name={item.icon as any} size={16} color={item.id === 'home' ? '#33CCCC' : '#94a3b8'} />
                  <Typography 
                    className={`text-xs md:text-sm font-semibold ${item.id === 'home' ? 'text-[#33CCCC]' : 'text-slate-300'}`} 
                    style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                  >
                    {item.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            {/* AI Preferences Ghost Button */}
            <TouchableOpacity 
              onPress={() => setIsPreferencesOpen(true)} 
              className="flex-row items-center gap-2 px-3.5 py-2 rounded-xl hover:bg-[#006666]/25 transition-all duration-200"
              activeOpacity={0.7}
            >
               <Icon name="custom" size={16} color="#33CCCC" />
               <Typography 
                 className="hidden sm:flex text-xs md:text-sm font-semibold text-slate-300 hover:text-[#33CCCC]" 
                 style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
               >
                 {isRtl ? 'التفضيلات' : 'Preferences'}
               </Typography>
            </TouchableOpacity>

            {/* Settings Ghost Button */}
            <TouchableOpacity 
              onPress={() => push('/settings')} 
              className="w-10 h-10 rounded-xl items-center justify-center hover:bg-[#006666]/25 transition-all duration-200"
              activeOpacity={0.7}
            >
               <Icon name="settings" size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingBottom: 120,
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-6xl mx-auto w-full px-4 md:px-6">
          {/* Professional Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-16 md:mt-20 text-center items-center"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Typography
                variant="h1"
                className={`${theme.text} text-center mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] tracking-tight max-w-4xl`}
                style={{
                  fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif',
                }}
              >
                {isRtl ? 'رفيقك الذكي لهندسة الأوامر' : 'Your Smart Prompt Engineering Companion'}
              </Typography>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 mb-12"
            >
              <Typography
                variant="caption"
                className={`text-center mx-auto text-base sm:text-lg md:text-xl font-normal leading-[1.7] md:leading-[1.8] max-w-2xl md:max-w-3xl ${theme.textMuted}`}
                style={{
                  fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif',
                  lineHeight: 32,
                }}
              >
                {isRtl
                  ? 'لا تحتاج لخبرة مسبقة؛ حول أفكارك البسيطة إلى أوامر احترافية ودقيقة في ثوانٍ معدودة. أنشئ مطالبات بصرية احترافية باستخدام تدفقات عمل ذكية، وتوجيه فني متقدم، وأدوات تساعدك على إنتاج نتائج عالية الجودة بسرعة ودقة.'
                  : 'No prior experience needed; effortlessly transform your simple ideas into professional prompts and precise visual directions in seconds. Create high-grade visual prompts with smart creative workflows, advanced art direction, and tools built for speed and precision.'}
              </Typography>
            </motion.div>
          </motion.div>

          {/* ✨ Magic AI Input Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
            className="mb-12 md:mb-16 relative max-w-4xl mx-auto w-full"
          >
            {/* Ambient Background Glow with Dark Green #006666 */}
            <motion.div
              animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.98, 1.02, 0.98] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -inset-1 rounded-3xl bg-[#006666]/30 blur-2xl pointer-events-none"
              style={{ zIndex: -1 }}
            />

            {/* Header / Label */}
            <View className="flex-row items-center justify-between mb-3 px-1">
              <View className="flex-row items-center gap-2">
                <View className="w-5 h-5 rounded-full bg-[#006666]/40 border border-[#33CCCC]/40 items-center justify-center">
                  <Typography className="text-[10px]">✨</Typography>
                </View>
                <Typography className="text-[#33CCCC] font-extrabold text-xs uppercase tracking-[0.2em]" style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                  {isRtl ? 'المدخل الذكي — اكتب فكرتك' : 'Magic Input — Type your idea'}
                </Typography>
              </View>

              <Typography variant="caption" className="text-xs text-slate-400 font-medium" style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                {isRtl ? 'محرك أوامر الصور الاحترافي' : 'Professional AI Image Prompter'}
              </Typography>
            </View>

            {/* Quick Tags (Sparks) — Interactive Gold/Sand #C8B47C on hover */}
            <View className="mb-3.5">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
                {[
                  { label: isRtl ? '🎬 بورتريه سينمائي' : '🎬 Cinematic Portrait', prompt: isRtl ? 'بورتريه سينمائي لشخصية وقورة بإضاءة درامية خافتة وعدسة 85mm' : 'Cinematic 85mm portrait with dramatic chiaroscuro lighting and shallow depth of field' },
                  { label: isRtl ? '📦 إعلان منتج فاخر' : '📦 Luxury Product', prompt: isRtl ? 'صورة تجارية احترافية لزجاجة عطر فاخرة على منصة رخامية سوداء مع إضاءة استوديو ناعمة' : 'Commercial luxury perfume bottle on black marble pedestal with soft studio lighting' },
                  { label: isRtl ? '✨ مشهد خيالي ملحمي' : '✨ Epic Fantasy', prompt: isRtl ? 'قلعة عملاقة عائمة في السحاب فوق جبال خضراء وقت الغسق بأسلوب فانتازي سينمائي' : 'Epic floating castle in clouds over emerald mountains during sunset twilight' },
                  { label: isRtl ? '🏛️ عمارة حديثة' : '🏛️ Modern Architecture', prompt: isRtl ? 'تصميم معماري مستقبلي مستوحى من الطراز العربي الحديث بإضاءات ليلية مذهلة' : 'Futuristic architectural photography inspired by modern Islamic geometry with night lights' },
                ].map((chip, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setMagicIdea(chip.prompt)}
                    className="group px-3.5 py-1.5 rounded-full border border-white/10 bg-[#071630]/90 flex-row items-center mr-2 shadow-sm transition-all duration-300 hover:border-[#C8B47C] hover:bg-[#C8B47C]/10"
                    activeOpacity={0.7}
                  >
                    <Typography 
                      className="text-xs text-slate-300 font-medium transition-colors duration-300 group-hover:text-[#C8B47C]" 
                      style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                    >
                      {chip.label}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Elevated Input Container with Drop Shadow #006666 and Glow #33CCCC */}
            <View className={`rounded-2xl md:rounded-3xl border-2 border-[#006666]/60 overflow-hidden backdrop-blur-3xl ${theme.cardBg} shadow-[0_12px_40px_rgba(0,102,102,0.25)] focus-within:border-[#33CCCC] focus-within:shadow-[0_0_30px_rgba(51,204,204,0.35)] transition-all duration-300`}>
              <TextInput
                value={magicIdea}
                onChangeText={(text) => {
                  setMagicIdea(text);
                  if (aiError) setAiError(null);
                }}
                placeholder={
                  isRtl
                    ? 'اكتب فكرتك هنا وسيقوم النظام بتوجيهك هندسياً (مثال: لقطة سينمائية لغروب الشمس فوق الكثبان الرملية...)'
                    : 'Describe your vision here (e.g. Cinematic wide-angle shot of sunset over sand dunes...)'
                }
                placeholderTextColor={theme.isDark ? '#64748b' : '#94a3b8'}
                multiline
                numberOfLines={3}
                style={{
                  color: theme.isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: 15,
                  lineHeight: 24,
                  padding: 18,
                  minHeight: 80,
                  textAlignVertical: 'top',
                  fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif',
                  direction: isRtl ? 'rtl' : 'ltr',
                  textAlign: isRtl ? 'right' : 'left',
                }}
              />

              {/* Bottom Bar of Input */}
              <View className={`flex-row flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-white/10 ${theme.isDark ? 'bg-white/3' : 'bg-black/3'}`}>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-2 h-2 rounded-full bg-[#33CCCC]" />
                    <Typography variant="caption" className={`text-xs ${theme.textMuted}`} style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                      {isRtl ? 'توليد ذكي فائق الدقة' : 'Ultra-precise Prompt Engine'}
                    </Typography>
                  </View>

                  {/* Mic Button */}
                  {isSupported && (
                    <TouchableOpacity
                      onPress={() => {
                        if (isListening) stopListening();
                        else startListening(magicIdea, (text) => setMagicIdea(text));
                      }}
                      className={`w-8 h-8 rounded-full items-center justify-center transition-all ${
                        isListening ? 'bg-red-500/20 border border-red-500/40' : 'bg-[#006666]/30 border border-[#33CCCC]/30 hover:bg-[#006666]/50'
                      }`}
                    >
                      {isListening ? (
                        <View className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
                      ) : (
                        <Icon name="mic" size={14} color="#33CCCC" />
                      )}
                    </TouchableOpacity>
                  )}
                </View>

                {/* Send Button with Primary Cyan #33CCCC */}
                <TouchableOpacity
                  onPress={handleMagicSubmit}
                  disabled={!magicIdea.trim()}
                  className={`flex-row items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-200 ${
                    magicIdea.trim()
                      ? 'bg-[#33CCCC] shadow-[0_4px_20px_rgba(51,204,204,0.4)] hover:brightness-110'
                      : theme.isDark ? 'bg-white/5' : 'bg-black/5'
                  }`}
                >
                  <Typography className={`font-bold text-sm ${magicIdea.trim() ? 'text-[#020e25]' : theme.textMuted}`} style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                    {isRtl ? 'ابدأ بالذكاء الاصطناعي' : 'AI Start'}
                  </Typography>
                  <Icon name="check" size={14} color={magicIdea.trim() ? '#020e25' : theme.colors.icon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Complexity Selector */}
            {magicIdea.trim().length > 0 && (
              <View className="mt-3 flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setComplexity('simple')}
                  className={`flex-1 py-3 rounded-2xl border-2 items-center transition-all ${
                    complexity === 'simple'
                      ? 'bg-[#006666]/30 border-[#33CCCC]'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <Typography
                    className={`font-black text-sm ${
                      complexity === 'simple' ? 'text-[#33CCCC]' : 'text-slate-400'
                    }`}
                    style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                  >
                    {isRtl ? '⚡ مبسط' : '⚡ Simple'}
                  </Typography>
                  <Typography
                    className="text-[10px] mt-0.5 text-slate-400"
                    style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                  >
                    {isRtl ? 'سريع · 3-10 أسئلة' : 'Fast · 3-10 questions'}
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setComplexity('complex')}
                  className={`flex-1 py-3 rounded-2xl border-2 items-center transition-all ${
                    complexity === 'complex'
                      ? 'bg-[#006666]/30 border-[#33CCCC]'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <Typography
                    className={`font-black text-sm ${
                      complexity === 'complex' ? 'text-[#33CCCC]' : 'text-slate-400'
                    }`}
                    style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                  >
                    {isRtl ? '🎯 مفصل ودقيق' : '🎯 Detailed'}
                  </Typography>
                  <Typography
                    className="text-[10px] mt-0.5 text-slate-400"
                    style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                  >
                    {isRtl ? 'دقيق · 10-25 سؤالاً' : 'Deep · 10-25 questions'}
                  </Typography>
                </TouchableOpacity>
              </View>
            )}

            {aiError && (
              <View className="mt-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex-row items-start gap-2">
                <Typography className="text-red-400 text-sm leading-relaxed" style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>{aiError}</Typography>
              </View>
            )}

            {/* Separator */}
            <View className="flex-row items-center gap-3 md:gap-4 mt-8 md:mt-12 mb-4">
              <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <Typography className={`text-[11px] md:text-xs font-bold uppercase tracking-widest ${theme.textMuted}`} style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                {isRtl ? 'أو اختر مساراً متخصصاً' : 'or choose a creative workflow'}
              </Typography>
              <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            </View>
          </motion.div>

          {/* Categories Grid (Workflow Cards) */}
          <View className="flex-row flex-wrap justify-start -m-2 md:-m-2.5">
            {filteredWorkflows.map((cat, index) => {
              // Highlight the first workflow as "Featured" with Gold/Sand #C8B47C
              const isFeatured = index === 0;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (index % 5 + 1) * 0.06, ease: "easeOut" }}
                  className="w-1/2 md:w-1/3 lg:w-1/4 p-2 md:p-2.5"
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className={`group w-full h-full overflow-hidden rounded-3xl border ${
                      isFeatured ? 'border-[#C8B47C]/40 bg-[#071630]' : 'border-white/10 bg-[#071630]'
                    } ${theme.cardShadow} transition-all duration-300 hover:-translate-y-2 hover:border-[#33CCCC] hover:shadow-[0_12px_30px_rgba(51,204,204,0.18)]`}
                    onPress={() => push(`/category/${cat.id}`)}
                  >
                    <View className="p-6 flex-1 justify-between">
                      {/* Icon Container with #006666 or #C8B47C */}
                      <View className="flex-row items-center justify-between mb-5">
                        <View className={`w-12 h-12 rounded-2xl items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          isFeatured
                            ? 'bg-[#C8B47C]/15 border border-[#C8B47C]/40'
                            : 'bg-[#006666]/20 border border-[#006666]/40'
                        }`}>
                          <Icon 
                            name={cat.icon as any} 
                            size={22} 
                            color={isFeatured ? '#C8B47C' : '#33CCCC'} 
                            strokeWidth={2.5} 
                          />
                        </View>

                        {isFeatured && (
                          <View className="px-2.5 py-0.5 rounded-full bg-[#C8B47C]/15 border border-[#C8B47C]/40">
                            <Typography className="text-[10px] font-bold text-[#C8B47C]" style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}>
                              {isRtl ? 'مميز ★' : 'Featured ★'}
                            </Typography>
                          </View>
                        )}
                      </View>

                      {/* Card Title & CTA */}
                      <View>
                        <Typography 
                          variant="h2" 
                          className="text-lg font-bold mb-2 text-white group-hover:text-[#33CCCC] transition-colors duration-200" 
                          style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                        >
                          {isRtl ? cat.name_ar : cat.name_en}
                        </Typography>

                        {/* CTA Subtext in #33CCCC */}
                        <Typography 
                          variant="caption" 
                          className="text-xs font-bold text-[#33CCCC] group-hover:underline" 
                          style={{ fontFamily: isRtl ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                        >
                          {isRtl ? 'ابدأ التدفق ←' : 'Start Workflow →'}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                </motion.div>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Minimal Bottom Bar — Mobile Only */}
      <View 
        className="md:hidden absolute left-0 right-0 z-40 px-4"
        style={{ bottom: Math.max(insets.bottom, 16) }}
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
        onClose={() => {
          setIsPreferencesOpen(false);
          // Mark onboarding as complete when the drawer is closed for the first time
          if (!hasCompletedOnboarding) {
            setHasCompletedOnboarding(true);
          }
        }} 
      />
    </ScreenContainer>
  );
}