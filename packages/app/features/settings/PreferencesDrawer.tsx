import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from '../../design/view';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/Icon';
import { useAppStore } from '../../storage/store';
import { useTheme } from '../../design/useTheme';
import { useTranslation } from 'react-i18next';
import { TextInput, Platform } from 'react-native';

// ─── Data ──────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'identity', labelAr: 'الهوية',      labelEn: 'Identity',   icon: '🌐' },
  { id: 'role',     labelAr: 'الدور',        labelEn: 'Role',       icon: '🧠' },
  { id: 'style',    labelAr: 'التواصل',      labelEn: 'Style',      icon: '💬' },
  { id: 'output',   labelAr: 'الإخراج',      labelEn: 'Output',     icon: '📄' },
  { id: 'creative', labelAr: 'الإبداع',      labelEn: 'Creative',   icon: '✨' },
  { id: 'image',    labelAr: 'الصور',         labelEn: 'Images',     icon: '🖼️' },
];

type OptionItem = { id: string; labelAr: string; labelEn: string; desc?: string; descAr?: string };

const LANGS: OptionItem[] = [
  { id: 'ar', labelAr: '🇸🇦  العربية',    labelEn: '🇸🇦  Arabic' },
  { id: 'en', labelAr: '🇺🇸  الإنجليزية', labelEn: '🇺🇸  English' },
  { id: 'fr', labelAr: '🇫🇷  الفرنسية',   labelEn: '🇫🇷  French' },
  { id: 'es', labelAr: '🇪🇸  الإسبانية',  labelEn: '🇪🇸  Spanish' },
  { id: 'de', labelAr: '🇩🇪  الألمانية',  labelEn: '🇩🇪  German' },
];

const OCCUPATIONS: OptionItem[] = [
  { id: 'student',    labelAr: 'طالب / باحث',         labelEn: 'Student / Researcher' },
  { id: 'developer',  labelAr: 'مطوّر / مهندس',        labelEn: 'Developer / Engineer' },
  { id: 'designer',   labelAr: 'مصمم / فنان',          labelEn: 'Designer / Artist' },
  { id: 'marketer',   labelAr: 'مسوّق / أعمال',         labelEn: 'Marketer / Business' },
  { id: 'writer',     labelAr: 'كاتب / صحفي',          labelEn: 'Writer / Journalist' },
  { id: 'educator',   labelAr: 'معلم / مدرّب',         labelEn: 'Educator / Trainer' },
  { id: 'healthcare', labelAr: 'طب وصحة',              labelEn: 'Healthcare' },
  { id: 'legal',      labelAr: 'قانون / محاسبة',       labelEn: 'Legal / Accounting' },
  { id: 'other',      labelAr: 'مجال آخر',             labelEn: 'Other Field' },
];

const AI_ROLES: OptionItem[] = [
  { id: 'expert',    labelAr: 'خبير',    labelEn: 'Expert',    descAr: 'يجيب بثقة واختصار',      desc: 'concise & confident' },
  { id: 'mentor',    labelAr: 'مرشد',    labelEn: 'Mentor',    descAr: 'يشرح ويعلّم',            desc: 'explains & teaches' },
  { id: 'partner',   labelAr: 'شريك',    labelEn: 'Partner',   descAr: 'يفكر معي',               desc: 'thinks with me' },
  { id: 'creative',  labelAr: 'مبدع',    labelEn: 'Creative',  descAr: 'يُلهم ويقترح',           desc: 'inspires & suggests' },
  { id: 'analyst',   labelAr: 'محلل',    labelEn: 'Analyst',   descAr: 'يراجع ويُقيّم',          desc: 'reviews & evaluates' },
  { id: 'assistant', labelAr: 'مساعد',   labelEn: 'Assistant', descAr: 'ينفذ مباشرة',            desc: 'executes directly' },
];

const EXPERTISE: OptionItem[] = [
  { id: 'beginner',     labelAr: 'مبتدئ',     labelEn: 'Beginner',     descAr: 'اشرح كل شيء',        desc: 'explain everything' },
  { id: 'intermediate', labelAr: 'متوسط',     labelEn: 'Intermediate', descAr: 'لا تبسّط كثيراً',    desc: 'skip the basics' },
  { id: 'advanced',     labelAr: 'متقدم',     labelEn: 'Advanced',     descAr: 'مستوى خبير',          desc: 'expert level' },
];

const DEPTHS: OptionItem[] = [
  { id: 'brief',    labelAr: 'مختصر',    labelEn: 'Brief',    descAr: 'إجابة مباشرة فقط',       desc: 'direct answer only' },
  { id: 'balanced', labelAr: 'متوازن',   labelEn: 'Balanced', descAr: 'تفاصيل كافية',           desc: 'enough detail' },
  { id: 'deep',     labelAr: 'عميق',     labelEn: 'Deep',     descAr: 'شامل مع أمثلة',          desc: 'comprehensive with examples' },
];

const TONES: OptionItem[] = [
  { id: 'professional', labelAr: 'رسمي',       labelEn: 'Professional', descAr: 'رسمي واحترافي',     desc: 'formal & polished' },
  { id: 'friendly',     labelAr: 'ودي',         labelEn: 'Friendly',     descAr: 'مرن وغير رسمي',     desc: 'casual & warm' },
  { id: 'direct',       labelAr: 'مباشر',       labelEn: 'Direct',       descAr: 'صريح ومختصر',       desc: 'blunt & brief' },
  { id: 'academic',     labelAr: 'أكاديمي',     labelEn: 'Academic',     descAr: 'موثّق ومرجعي',      desc: 'cited & structured' },
  { id: 'inspiring',    labelAr: 'ملهِم',        labelEn: 'Inspiring',    descAr: 'حيوي وتحفيزي',      desc: 'energetic & motivating' },
];

const RESPONSE_LENGTHS: OptionItem[] = [
  { id: 'short',  labelAr: 'قصير',     labelEn: 'Short',  descAr: 'جملة أو اثنتان',           desc: '1–2 sentences' },
  { id: 'medium', labelAr: 'متوسط',    labelEn: 'Medium', descAr: 'فقرة إلى فقرتين',           desc: '1–2 paragraphs' },
  { id: 'long',   labelAr: 'طويل',     labelEn: 'Long',   descAr: 'مفصّل ومنظّم',             desc: 'detailed & structured' },
  { id: 'auto',   labelAr: 'تلقائي',   labelEn: 'Auto',   descAr: 'حسب طبيعة السؤال',         desc: 'based on the question' },
];

const FORMATS: OptionItem[] = [
  { id: 'structured', labelAr: 'عناوين ونقاط',   labelEn: 'Headers & Bullets', descAr: 'منظّم وواضح',           desc: 'structured & clear' },
  { id: 'prose',      labelAr: 'فقرات نثرية',    labelEn: 'Paragraphs',        descAr: 'سردي ومتدفق',           desc: 'flowing narrative' },
  { id: 'numbered',   labelAr: 'خطوات مرقّمة',   labelEn: 'Numbered Steps',    descAr: 'مرتّب وتسلسلي',          desc: 'ordered & sequential' },
  { id: 'table',      labelAr: 'جداول',           labelEn: 'Tables',            descAr: 'للمقارنة والبيانات',     desc: 'comparisons & data' },
  { id: 'mixed',      labelAr: 'مختلط',           labelEn: 'Mixed',             descAr: 'حسب المحتوى',            desc: 'context-driven' },
];

const AUDIENCES: OptionItem[] = [
  { id: 'self',     labelAr: 'لنفسي',             labelEn: 'Myself',        descAr: 'استخدام شخصي',           desc: 'personal use' },
  { id: 'team',     labelAr: 'فريق عمل',           labelEn: 'Work Team',     descAr: 'زملاء وموظفون',          desc: 'colleagues & staff' },
  { id: 'clients',  labelAr: 'عملاء / زبائن',     labelEn: 'Clients',       descAr: 'عملاء تجاريون',          desc: 'business clients' },
  { id: 'students', labelAr: 'طلاب / متعلمون',    labelEn: 'Learners',      descAr: 'بيئة تعليمية',           desc: 'educational audience' },
  { id: 'general',  labelAr: 'جمهور عام',          labelEn: 'General Public', descAr: 'عامة الناس',             desc: 'everyone' },
  { id: 'social',   labelAr: 'منصات تواصل',        labelEn: 'Social Media',  descAr: 'متابعون وجمهور رقمي',   desc: 'digital followers' },
];

const REGIONS: OptionItem[] = [
  { id: 'gulf',          labelAr: '🇸🇦  الخليج العربي',    labelEn: '🇸🇦  Gulf Region' },
  { id: 'middle-east',   labelAr: '🌍  الشرق الأوسط',     labelEn: '🌍  Middle East' },
  { id: 'north-africa',  labelAr: '🌍  شمال أفريقيا',     labelEn: '🌍  North Africa' },
  { id: 'europe',        labelAr: '🇪🇺  أوروبا',           labelEn: '🇪🇺  Europe' },
  { id: 'north-america', labelAr: '🇺🇸  أمريكا الشمالية', labelEn: '🇺🇸  North America' },
  { id: 'global',        labelAr: '🌐  عالمي',             labelEn: '🌐  Global' },
];

const CREATIVITY: OptionItem[] = [
  { id: 'conservative',  labelAr: 'محافظ',     labelEn: 'Conservative', descAr: 'ثابت وموثوق',            desc: 'safe & reliable' },
  { id: 'balanced',      labelAr: 'متوازن',    labelEn: 'Balanced',     descAr: 'مزيج من الأصالة والجدة', desc: 'familiar yet original' },
  { id: 'creative',      labelAr: 'مبدع',      labelEn: 'Creative',     descAr: 'أفكار جديدة وجريئة',    desc: 'bold new ideas' },
  { id: 'experimental',  labelAr: 'تجريبي',    labelEn: 'Experimental', descAr: 'خارج الصندوق',           desc: 'out of the box' },
];

const HUMOR: OptionItem[] = [
  { id: 'none',     labelAr: 'جاد تماماً', labelEn: 'Serious',   descAr: 'بلا فكاهة على الإطلاق',   desc: 'no humor at all' },
  { id: 'minimal',  labelAr: 'خفيف',       labelEn: 'Minimal',   descAr: 'طرفة عابرة أحياناً',       desc: 'occasional light touch' },
  { id: 'moderate', labelAr: 'معتدل',      labelEn: 'Moderate',  descAr: 'مريح وممتع',               desc: 'warm & fun' },
  { id: 'witty',    labelAr: 'ذكي ساخر',   labelEn: 'Witty',     descAr: 'فكاهة راقية وذكية',        desc: 'clever humor' },
];

const IMAGE_ENGINES: OptionItem[] = [
  { id: 'midjourney', labelAr: 'Midjourney',          labelEn: 'Midjourney',          descAr: 'الأفضل للصور الفنية', desc: 'best for artistic images' },
  { id: 'flux',       labelAr: 'Flux',                labelEn: 'Flux',                descAr: 'واقعي وسريع',         desc: 'realistic & fast' },
  { id: 'sdxl',       labelAr: 'Stable Diffusion XL', labelEn: 'Stable Diffusion XL', descAr: 'مفتوح المصدر',        desc: 'open source' },
  { id: 'dalle',      labelAr: 'DALL·E 3',            labelEn: 'DALL·E 3',            descAr: 'من OpenAI',           desc: 'by OpenAI' },
  { id: 'ideogram',   labelAr: 'Ideogram',            labelEn: 'Ideogram',            descAr: 'الأفضل للنصوص',       desc: 'best for text in images' },
];

const IMAGE_STYLES: OptionItem[] = [
  { id: 'photorealistic', labelAr: 'واقعي فوتوغرافي',    labelEn: 'Photorealistic' },
  { id: 'cinematic',      labelAr: 'سينمائي درامي',       labelEn: 'Cinematic' },
  { id: 'anime',          labelAr: 'أنمي احترافي',        labelEn: 'High-end Anime' },
  { id: '3d',             labelAr: 'ثلاثي الأبعاد',       labelEn: '3D Render' },
  { id: 'illustration',   labelAr: 'رسم توضيحي',          labelEn: 'Illustration' },
  { id: 'minimalist',     labelAr: 'بسيط ونظيف',          labelEn: 'Minimalist' },
];

const IMAGE_RATIOS: OptionItem[] = [
  { id: '1:1',  labelAr: 'مربع  1:1',          labelEn: 'Square  1:1' },
  { id: '16:9', labelAr: 'أفقي  16:9',         labelEn: 'Landscape  16:9' },
  { id: '9:16', labelAr: 'عمودي  9:16',         labelEn: 'Portrait  9:16' },
  { id: '4:5',  labelAr: 'بورتريه  4:5',        labelEn: 'Portrait  4:5' },
  { id: '21:9', labelAr: 'سينمائي  21:9',       labelEn: 'Cinematic  21:9' },
];

// ─── Component ─────────────────────────────────────────────────────────────

interface PreferencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type SectionId = typeof SECTIONS[number]['id'];

export function PreferencesDrawer({ isOpen, onClose }: PreferencesDrawerProps) {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { preferences, updatePreferences } = useAppStore();
  const [activeSection, setActiveSection] = useState<SectionId>('identity');
  const [occupationText, setOccupationText] = useState(preferences?.occupation || '');

  if (!isOpen) return null;

  const pref = preferences as any;

  // ── Row-based selector (compact square cards) ─────────────────────────────
  const renderRows = (
    options: OptionItem[],
    prefKey: string,
    accentHex: string,
    accentClass: string,
  ) => {
    const value = pref?.[prefKey];
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {options.map(opt => {
          const selected = value === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => updatePreferences({ [prefKey]: opt.id } as any)}
              style={selected ? {
                backgroundColor: `${accentHex}18`,
                borderColor: accentHex,
                borderWidth: 1.5,
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              } : {
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                borderWidth: 1,
                borderColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                backgroundColor: theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              }}
            >
              <Typography
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: selected
                    ? accentHex
                    : theme.isDark ? '#cbd5e1' : '#334155',
                }}
              >
                {isRtl ? opt.labelAr : opt.labelEn}
              </Typography>
              {selected && (
                <View style={{
                  width: 16, height: 16, borderRadius: 8,
                  backgroundColor: accentHex,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="check" size={10} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };



  // ── Pill chips (for short labels like languages) ──────────────────────────
  const renderPills = (options: OptionItem[], prefKey: string, accentHex: string) => {
    const value = pref?.[prefKey];
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {options.map(opt => {
          const selected = value === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => updatePreferences({ [prefKey]: opt.id } as any)}
              style={selected ? {
                paddingHorizontal: 16, paddingVertical: 10,
                borderRadius: 100,
                backgroundColor: `${accentHex}22`,
                borderWidth: 1.5,
                borderColor: accentHex,
              } : {
                paddingHorizontal: 16, paddingVertical: 10,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                backgroundColor: theme.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              }}
            >
              <Typography
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: selected
                    ? accentHex
                    : theme.isDark ? '#94a3b8' : '#475569',
                }}
              >
                {isRtl ? opt.labelAr : opt.labelEn}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // ── Section header ────────────────────────────────────────────────────────
  const SLabel = ({ ar, en }: { ar: string; en: string }) => (
    <Typography
      style={{
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: '#64748b',
        marginTop: 24,
        marginBottom: 10,
        textAlign: isRtl ? 'right' : 'left',
      }}
    >
      {isRtl ? ar : en}
    </Typography>
  );

  // ── Accent palette ────────────────────────────────────────────────────────
  const A = {
    blue:   '#1a56db',
    sky:    '#0ea5e9',
    violet: '#8b5cf6',
    emerald:'#10b981',
    amber:  '#f59e0b',
    rose:   '#f43f5e',
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={{
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          maxHeight: '90%',
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: theme.isDark ? '#0d1a30' : '#ffffff',
          borderWidth: 1,
          borderColor: theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
          // shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.4,
          shadowRadius: 40,
          elevation: 20,
        }}
      >
        {/* ── Header ── */}
        <View style={{
          paddingHorizontal: 24, paddingTop: 22, paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <View style={{ flex: 1 }}>
            <Typography style={{ fontSize: 18, fontWeight: '900', color: theme.isDark ? '#f1f5f9' : '#0d1f4e' }}>
              {isRtl ? 'تفضيلات الذكاء الاصطناعي' : 'AI Preferences'}
            </Typography>
            <Typography style={{ fontSize: 12, color: theme.isDark ? '#64748b' : '#94a3b8', marginTop: 2 }}>
              {isRtl ? 'تُرسَل مع كل طلب — تُستخدم إذا كانت ذات صلة' : 'Sent with every request — applied when relevant'}
            </Typography>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{
              width: 34, height: 34, borderRadius: 17,
              backgroundColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              alignItems: 'center', justifyContent: 'center',
              borderWidth: 1,
              borderColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              marginLeft: 12,
            }}
          >
            <Icon name="close" size={16} color={theme.isDark ? '#94a3b8' : '#64748b'} />
          </TouchableOpacity>
        </View>

        {/* ── Section Tabs ── */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 14, gap: 12, alignItems: 'center' }}
          >
            {SECTIONS.map(s => {
              const active = activeSection === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => setActiveSection(s.id as SectionId)}
                  style={{
                    alignItems: 'center',
                    gap: 6,
                    minWidth: 64,
                  }}
                >
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: active ? A.blue + '20' : theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    borderWidth: 1.5,
                    borderColor: active ? A.blue : theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  }}>
                    <Typography style={{ fontSize: 20 }}>{s.icon}</Typography>
                  </View>
                  <Typography style={{
                    fontSize: 11,
                    fontWeight: active ? '800' : '600',
                    textAlign: 'center',
                    color: active ? A.blue : theme.isDark ? '#94a3b8' : '#64748b',
                  }}>
                    {isRtl ? s.labelAr : s.labelEn}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Body ── */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 4 }}
          showsVerticalScrollIndicator={false}
        >

          {/* IDENTITY */}
          {activeSection === 'identity' && (
            <View>
              <SLabel ar="لغتي الأم" en="My Native Language" />
              {renderPills(LANGS, 'nativeLang', A.blue)}

              <SLabel ar="لغة إخراج الردود" en="Preferred Output Language" />
              {renderPills(LANGS, 'preferredOutputLang', A.sky)}

              <SLabel ar="المنطقة الجغرافية" en="Geographic Region" />
              {renderPills(REGIONS, 'region', A.emerald)}
            </View>
          )}

          {/* ROLE */}
          {activeSection === 'role' && (
            <View>
              <SLabel ar="المجال المهني" en="Professional Field" />
              {renderPills(OCCUPATIONS, 'occupation', A.violet)}

              <View style={{
                marginTop: 10,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                backgroundColor: theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                overflow: 'hidden',
              }}>
                <TextInput
                  value={occupationText}
                  onChangeText={(t) => { setOccupationText(t); updatePreferences({ occupation: t } as any); }}
                  placeholder={isRtl ? 'أو اكتب مجالك بنفسك…' : 'Or type your field manually…'}
                  placeholderTextColor={theme.isDark ? '#475569' : '#94a3b8'}
                  style={{
                    color: theme.isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: 14, padding: 14,
                    textAlign: isRtl ? 'right' : 'left',
                    fontFamily: Platform.OS === 'web' ? 'inherit' : undefined,
                  }}
                />
              </View>

              <SLabel ar="الدور الذي أريده من الذكاء الاصطناعي" en="Role I Want AI to Play" />
              {renderRows(AI_ROLES, 'role', A.amber, 'amber')}
            </View>
          )}

          {/* STYLE */}
          {activeSection === 'style' && (
            <View>
              <SLabel ar="مستوى خبرتي" en="My Expertise Level" />
              {renderRows(EXPERTISE, 'expertiseLevel', A.blue, 'primary')}

              <SLabel ar="نبرة التواصل" en="Preferred Tone" />
              {renderRows(TONES, 'tone', A.sky, 'sky')}

              <SLabel ar="مستوى الفكاهة" en="Humor Level" />
              {renderRows(HUMOR, 'humorLevel', A.amber, 'amber')}
            </View>
          )}

          {/* OUTPUT */}
          {activeSection === 'output' && (
            <View>
              <SLabel ar="عمق الإجابة" en="Answer Depth" />
              {renderRows(DEPTHS, 'preferredDepth', A.blue, 'primary')}

              <SLabel ar="طول الرد" en="Response Length" />
              {renderRows(RESPONSE_LENGTHS, 'responseLength', A.violet, 'violet')}

              <SLabel ar="شكل تنسيق الإخراج" en="Output Format" />
              {renderRows(FORMATS, 'preferredFormat', A.emerald, 'emerald')}

              <SLabel ar="الجمهور المستهدف" en="Target Audience" />
              {renderRows(AUDIENCES, 'targetAudience', A.rose, 'rose')}
            </View>
          )}

          {/* CREATIVE */}
          {activeSection === 'creative' && (
            <View>
              <SLabel ar="مستوى الإبداع" en="Creativity Level" />
              {renderRows(CREATIVITY, 'creativityLevel', A.violet, 'violet')}

              <SLabel ar="مستوى خبرتي العامة" en="General Knowledge Level" />
              {renderRows(EXPERTISE, 'experienceLevel', A.blue, 'primary')}
            </View>
          )}

          {/* IMAGE */}
          {activeSection === 'image' && (
            <View>
              <SLabel ar="محرك الصور الافتراضي" en="Default Image Engine" />
              {renderRows(IMAGE_ENGINES, 'defaultImageEngine', A.blue, 'primary')}

              <SLabel ar="أسلوب الصور المفضل" en="Preferred Image Style" />
              {renderPills(IMAGE_STYLES, 'imageStyle', A.violet)}

              <SLabel ar="نسبة الأبعاد الافتراضية" en="Default Aspect Ratio" />
              {renderPills(IMAGE_RATIOS, 'imageAspectRatio', A.sky)}
            </View>
          )}

        </ScrollView>

        {/* ── Footer ── */}
        <View style={{
          paddingHorizontal: 20, paddingVertical: 14,
          borderTopWidth: 1,
          borderTopColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          flexDirection: 'row', alignItems: 'center', gap: 8,
        }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#10b981' }} />
          <Typography style={{ fontSize: 11, color: theme.isDark ? '#64748b' : '#94a3b8', flex: 1 }}>
            {isRtl
              ? 'تُحفظ التفضيلات تلقائياً وتُرسَل مع كل طلب للذكاء الاصطناعي'
              : 'Preferences are auto-saved and injected into every AI request'}
          </Typography>
        </View>

      </TouchableOpacity>
    </TouchableOpacity>
  );
}
