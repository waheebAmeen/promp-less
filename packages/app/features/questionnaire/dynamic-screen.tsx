/**
 * DynamicQuestionnaireScreen
 * ─────────────────────────────────────────────────────────────────────────────
 * Requirements Elicitation Engine — conversational AI-driven question flow.
 *
 * Flow:
 *   1. Screen mounts → immediately fetches first question from AI
 *   2. User answers → AI decides next question OR done=true
 *   3. When done → AI synthesizes a professional prompt from all Q&A
 *   4. Navigates to /preview with the synthesized prompt
 *
 * Max 5 questions enforced client-side regardless of AI decision.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../design/useTheme';
import {
  View,
  ScrollView,
  ScreenContainer,
  TouchableOpacity,
  DecorativeBackground,
  ActivityIndicator,
} from '../../design/view';
import { TextInput, Animated } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import { useSafeArea } from '../../provider/safe-area/use-safe-area';
import { useVoice } from '../../hooks/useVoice';
import {
  getNextQuestion,
  synthesizeProfessionalPrompt,
  AiQuestion,
  QAEntry,
  ComplexityMode,
} from '../../services/ai';

// ─── Constants ────────────────────────────────────────────────────────────────// Safety ceiling — AI decides the real count within these limits
const MAX_QUESTIONS_SIMPLE = 10;   // AI uses 3-10 based on idea
const MAX_QUESTIONS_COMPLEX = 25;  // AI uses 10-25+ based on idea

// ─── URL params ───────────────────────────────────────────────────────────────
const { useParam } = createParam<{ idea: string; mode: string }>();

// ─── Screen states ────────────────────────────────────────────────────────────
type ScreenState =
  | 'loading_question'   // Fetching next question from AI
  | 'question'           // Showing a question to user
  | 'synthesizing'       // Generating the final professional prompt
  | 'error'
  | 'select_model';             // Something went wrong

// ─────────────────────────────────────────────────────────────────────────────
export function DynamicQuestionnaireScreen() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { push, back } = useRouter();
  const insets = useSafeArea();
  const { isListening, isSupported, startListening, stopListening } = useVoice();

  const [ideaParam] = useParam('idea');
  const [modeParam] = useParam('mode');
  const idea = ideaParam ? decodeURIComponent(ideaParam as string) : '';
  const mode: ComplexityMode = modeParam === 'complex' ? 'complex' : 'simple';
  const MAX_QUESTIONS = mode === 'complex' ? MAX_QUESTIONS_COMPLEX : MAX_QUESTIONS_SIMPLE;

  // ─── State ──────────────────────────────────────────────────────────────────
  const [screenState, setScreenState] = useState<ScreenState>('loading_question');
  const [currentQuestion, setCurrentQuestion] = useState<AiQuestion | null>(null);
  const [history, setHistory] = useState<QAEntry[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [targetModel, setTargetModel] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fade-in animation for each new question
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const isAnswered = selectedOptions.length > 0 || customText.trim().length > 0;

  const buildAnswer = (): string => {
    const selected = selectedOptions.join('، ');
    if (selected && customText.trim()) return `${selected}، ${customText.trim()}`;
    return selected || customText.trim();
  };

  // ─── Fetch first question on mount ───────────────────────────────────────────
  useEffect(() => {
    if (!idea) {
      setScreenState('error');
      setErrorMsg(isRtl ? 'لم يتم العثور على الفكرة.' : 'No idea provided.');
      return;
    }
    fetchNextQuestion([]);
  }, []);

  // ─── Core: fetch next question OR trigger synthesis ───────────────────────────
  const fetchNextQuestion = async (currentHistory: QAEntry[]) => {
    // Stop any active microphone session before transitioning
    if (isListening) stopListening();

    // Enforce max questions
    if (currentHistory.length >= MAX_QUESTIONS) {
      setScreenState('select_model');
      fadeIn();
      return;
    }

    setScreenState('loading_question');
    setSelectedOptions([]);
    setCustomText('');

    try {
      const result = await getNextQuestion(idea, currentHistory, mode);

      if (result.done) {
        setScreenState('select_model');
        fadeIn();
        return;
      }

      setCurrentQuestion(result.question);
      setScreenState('question');
      fadeIn();
    } catch (err: any) {
      console.error('[Dynamic] getNextQuestion error:', err?.message);
      handleError(err?.message ?? '');
    }
  };

  // ─── Synthesize the professional prompt ───────────────────────────────────────
  const runSynthesis = async (finalHistory: QAEntry[], selectedModel: any) => {
    if (isListening) stopListening();
    
    setScreenState('synthesizing');
    try {
      const lang = isRtl ? 'ar' : 'en';
      const professionalPrompt = await synthesizeProfessionalPrompt(idea, finalHistory, lang, selectedModel);

      push({
        pathname: '/preview',
        query: { generatedPrompt: professionalPrompt, category: 'ai_dynamic' },
      });
    } catch (err: any) {
      console.error('[Dynamic] synthesize error:', err?.message);
      handleError(err?.message ?? '');
    }
  };

  // ─── Error handler ───────────────────────────────────────────────────────────
  const handleError = (msg: string) => {
    let display: string;
    if (msg.includes('network_error')) {
      display = isRtl
        ? '⚠️ تحقق من اتصال الإنترنت وأعد المحاولة.'
        : '⚠️ Check your internet connection and try again.';
    } else if (msg.includes('401') || msg.includes('403')) {
      display = isRtl ? '🔑 مفتاح API غير صالح.' : '🔑 Invalid API key.';
    } else if (msg.includes('loading')) {
      display = isRtl
        ? '⏳ النموذج يتهيأ، انتظر 30 ثانية ثم أعد المحاولة.'
        : '⏳ Model is warming up. Try again in 30s.';
    } else {
      display = isRtl
        ? '❌ حدث خطأ غير متوقع. حاول مرة أخرى.'
        : '❌ Unexpected error. Please try again.';
    }
    setErrorMsg(display);
    setScreenState('error');
  };

  // ─── User submits answer ──────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!isAnswered || !currentQuestion) return;

    const answer = buildAnswer();
    const newHistory: QAEntry[] = [
      ...history,
      { question: currentQuestion.question, answer },
    ];
    setHistory(newHistory);
    fetchNextQuestion(newHistory);
  };

  // ─── Skip remaining questions ─────────────────────────────────────────────────
  const handleSkipToGenerate = () => {
    setScreenState('select_model');
    fadeIn();
  };

  // ─── Progress calculation ─────────────────────────────────────────────────────
  const questionNumber = history.length + 1;
  const progressPct = Math.min((history.length / MAX_QUESTIONS) * 100, 95);

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER STATES
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Error ────────────────────────────────────────────────────────────────────
  if (screenState === 'error') {
    return (
      <ScreenContainer>
        <DecorativeBackground />
        <View className={`flex-1 justify-center items-center px-8`}>
          <View className={`${theme.cardBg} rounded-3xl p-8 border ${theme.border} items-center gap-4 max-w-sm w-full`}>
            <Typography className="text-4xl">😔</Typography>
            <Typography variant="h2" className={`${theme.text} text-center font-bold`}>
              {isRtl ? 'حدث خطأ' : 'Something went wrong'}
            </Typography>
            <Typography className={`${theme.textMuted} text-center text-sm leading-relaxed`}>
              {errorMsg}
            </Typography>
            <Button
              title={isRtl ? 'حاول مرة أخرى' : 'Try Again'}
              onPress={() => fetchNextQuestion(history)}
              className="w-full bg-primary rounded-2xl h-12"
            />
            <TouchableOpacity onPress={() => push('/')}>
              <Typography className="text-primary-glow text-sm font-bold">
                {isRtl ? 'العودة للرئيسية' : 'Return Home'}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  // ── Loading question / Synthesizing ──────────────────────────────────────────
  if (screenState === 'loading_question' || screenState === 'synthesizing') {
    const isSynthesizing = screenState === 'synthesizing';
    return (
      <ScreenContainer>
        <DecorativeBackground />
        <View className="flex-1 justify-center items-center px-8">
          <View className={`${theme.cardBg} rounded-3xl p-10 border ${theme.border} items-center gap-6 max-w-sm w-full`}>
            {/* Animated dots */}
            <View className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 items-center justify-center">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>

            <View className="items-center gap-2">
              <Typography variant="h2" className={`${theme.text} font-black text-center`}>
                {isSynthesizing
                  ? isRtl ? '✨ يبني الـ Prompt الاحترافي' : '✨ Crafting Your Prompt'
                  : isRtl ? '🤔 يفكر في السؤال التالي' : '🤔 Thinking...'}
              </Typography>
              <Typography className={`${theme.textMuted} text-center text-sm leading-relaxed`}>
                {isSynthesizing
                  ? isRtl
                    ? 'يقوم الذكاء الاصطناعي بتحليل إجاباتك وبناء prompt احترافي...'
                    : 'Analyzing your answers and synthesizing a professional prompt...'
                  : isRtl
                    ? 'يقرر الذكاء الاصطناعي السؤال الأكثر قيمة...'
                    : 'Finding the most valuable next question...'}
              </Typography>
            </View>

            {/* Progress dots */}
            <View className="flex-row gap-2">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/30'}`}
                />
              ))}
            </View>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  
  // ── Select Model ─────────────────────────────────────────────────────────────
  if (screenState === 'select_model') {
    const modelOptions = [
      { label_ar: 'ChatGPT (نصوص)', label_en: 'ChatGPT (Text)', value: 'chatgpt' },
      { label_ar: 'Claude (نصوص)', label_en: 'Claude (Text)', value: 'claude' },
      { label_ar: 'Gemini (نصوص)', label_en: 'Gemini (Text)', value: 'gemini' },
      { label_ar: 'Mistral (نصوص)', label_en: 'Mistral (Text)', value: 'mistral' },
      { label_ar: 'Midjourney (صور)', label_en: 'Midjourney (Images)', value: 'midjourney' },
      { label_ar: 'Flux (صور)', label_en: 'Flux (Images)', value: 'flux' },
      { label_ar: 'SDXL (صور)', label_en: 'SDXL (Images)', value: 'sdxl' },
      { label_ar: 'DALL-E 3 (صور)', label_en: 'DALL-E 3 (Images)', value: 'dalle3' },
    ];
    return (
      <ScreenContainer>
        <DecorativeBackground />
        <View className={`border-b ${theme.borderSubtle} ${theme.headerBg} backdrop-blur-md z-40`}>
          <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row items-center">
            <TouchableOpacity onPress={() => setScreenState('question')} className={`w-10 h-10 ${theme.surface}/80 rounded-full items-center justify-center border border-slate-700/50`}>
              <Icon name="back" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <View className="flex-1 px-4 items-center">
              <Typography className="text-primary-glow font-black text-[10px] uppercase tracking-[0.25em] mb-0.5">
                {isRtl ? 'المدير الإبداعي الذكي' : 'AI Creative Director'}
              </Typography>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 md:px-6 py-4" contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="max-w-4xl mx-auto w-full">
            <Animated.View style={{ opacity: fadeAnim }}>
              <View className={`${theme.cardBg} rounded-3xl p-6 md:p-8 border ${theme.border} shadow-premium`}>
                <View className="mb-6">
                  <Typography variant="h2" className={`text-xl md:text-2xl ${theme.text} font-black tracking-tight leading-tight`}>
                    {isRtl ? 'النموذج المستهدف (إلزامي)' : 'Target Model (Required)'}
                  </Typography>
                </View>

                <View className="gap-3">
                  {modelOptions.map((option) => {
                    const isSelected = targetModel === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => setTargetModel(option.value)}
                        className={`py-4 px-5 rounded-2xl border-2 ${isSelected ? 'border-primary bg-primary/15' : `${theme.borderSubtle} ${theme.surface}/50`}`}
                      >
                        <View className="flex-row items-center justify-between">
                          <Typography className={`text-base flex-1 ${isSelected ? `${theme.text} font-bold` : `${theme.textSecondary} font-medium`}`}>
                            {isRtl ? option.label_ar : option.label_en}
                          </Typography>
                          {isSelected && (
                            <View className="w-5 h-5 bg-primary items-center justify-center ml-3 shrink-0 rounded-full">
                              <View className="w-2 h-2 bg-white rounded-full" />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>

        <View className={`${theme.bg}/90 backdrop-blur-3xl border-t ${theme.borderSubtle}`} style={{ paddingTop: 24, paddingLeft: 24, paddingRight: 24, paddingBottom: Math.max(insets.bottom, 24) }}>
          <View className="max-w-4xl mx-auto w-full flex-row gap-3">
             <Button
                title={isRtl ? 'توليد الأمر النهائي' : 'Generate Result'}
                onPress={() => runSynthesis(history, targetModel)}
                disabled={!targetModel}
                className={`flex-1 h-14 md:h-16 rounded-2xl md:rounded-3xl ${!targetModel ? 'opacity-30' : 'bg-primary shadow-neon-blue'}`}
             />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  // ── Question ─────────────────────────────────────────────────────────────────
  return (
    <ScreenContainer>
      <DecorativeBackground />

      {/* ── Header ── */}
      <View className={`border-b ${theme.borderSubtle} ${theme.headerBg} backdrop-blur-md z-40`}>
        <View className="max-w-4xl mx-auto w-full px-6 py-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => back()}
            className={`w-10 h-10 ${theme.surface}/80 rounded-full items-center justify-center border border-slate-700/50`}
          >
            <Icon name="back" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View className="flex-1 px-4 items-center">
            <Typography className="text-primary-glow font-black text-[10px] uppercase tracking-[0.25em] mb-0.5">
              {isRtl ? 'المدير الإبداعي الذكي' : 'AI Creative Director'}
            </Typography>
            <Typography className={`${theme.textMuted} text-xs`} numberOfLines={1}>
              {idea}
            </Typography>
          </View>

          {/* Mode badge */}
          <View className={`px-2.5 py-1 rounded-xl border ${
            mode === 'complex'
              ? 'bg-violet-500/15 border-violet-500/30'
              : 'bg-primary/15 border-primary/30'
          }`}>
            <Typography className={`text-[10px] font-black uppercase tracking-wider ${
              mode === 'complex' ? 'text-violet-400' : 'text-primary-glow'
            }`}>
              {mode === 'complex'
                ? (isRtl ? '🎯 مفصل ودقيق' : '🎯 Detailed')
                : (isRtl ? '⚡ مبسط' : '⚡ Simple')}
            </Typography>
          </View>

          {/* Skip to generate button */}
          {history.length >= 1 && (
            <TouchableOpacity
              onPress={handleSkipToGenerate}
              className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Typography className="text-primary-glow font-bold text-xs">
                {isRtl ? 'توليد الآن' : 'Generate'}
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View className="px-6 pt-4 pb-2 max-w-4xl mx-auto w-full">
        <View className={`h-1.5 w-full ${theme.cardBg} rounded-full overflow-hidden`}>
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </View>
        <View className="flex-row justify-between mt-2 px-1">
          <Typography variant="caption" className="text-primary-glow font-bold">
            {isRtl ? `السؤال ${questionNumber}` : `Question ${questionNumber}`}
          </Typography>
          <Typography variant="caption" className={`${theme.textMuted}`}>
            {isRtl
              ? `${history.length} من ${MAX_QUESTIONS} إجابة`
              : `${history.length} / ${MAX_QUESTIONS} answered`}
          </Typography>
        </View>
      </View>

      {/* ── Question card ── */}
      <ScrollView
        className="flex-1 px-4 md:px-6 py-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-4xl mx-auto w-full">
          {currentQuestion && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <View
                className={`${theme.cardBg} rounded-3xl p-6 md:p-8 border ${theme.border} shadow-premium`}
              >
                {/* Question badge */}
                <View className="flex-row items-center gap-2 mb-4">
                  <View className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 items-center justify-center">
                    <Typography className="text-[10px] font-black text-primary-glow">
                      {questionNumber}
                    </Typography>
                  </View>
                  <Typography className="text-primary-glow text-[10px] font-bold uppercase tracking-widest">
                    {isRtl ? 'سؤال توجيهي' : 'Guiding Question'}
                  </Typography>
                </View>

                {/* Question text */}
                <View className="mb-6">
                  <Typography
                    variant="h2"
                    className={`text-xl md:text-2xl ${theme.text} font-black tracking-tight leading-tight`}
                  >
                    {currentQuestion.question}
                  </Typography>
                  {currentQuestion.type === 'multiple_choice' && (
                    <Typography className={`text-sm ${theme.textSecondary} mt-2 font-medium`}>
                      {isRtl ? '(يمكنك اختيار أكثر من إجابة)' : '(You can select multiple answers)'}
                    </Typography>
                  )}
                </View>

                {/* Options */}
                {currentQuestion.type !== 'text_only' && (
                  <View className="gap-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedOptions.includes(option);
                      return (
                        <TouchableOpacity
                          key={option}
                          onPress={() => {
                            if (currentQuestion.type === 'multiple_choice') {
                              setSelectedOptions(prev => 
                                isSelected ? prev.filter(o => o !== option) : [...prev, option]
                              );
                            } else {
                              setSelectedOptions(isSelected ? [] : [option]);
                            }
                          }}
                          className={`py-4 px-5 rounded-2xl border-2 ${
                            isSelected
                              ? 'border-primary bg-primary/15'
                              : `${theme.borderSubtle} ${theme.surface}/50`
                          }`}
                          activeOpacity={0.7}
                        >
                          <View className="flex-row items-center justify-between">
                            <Typography
                              className={`text-base flex-1 ${
                                isSelected
                                  ? `${theme.text} font-bold`
                                  : `${theme.textSecondary} font-medium`
                              }`}
                            >
                              {option}
                            </Typography>
                            {isSelected && (
                              <View className={`w-5 h-5 bg-primary items-center justify-center ml-3 shrink-0 ${
                                currentQuestion.type === 'multiple_choice' ? 'rounded-md' : 'rounded-full'
                              }`}>
                                {currentQuestion.type === 'multiple_choice' ? (
                                  <Icon name="check" size={13} color="white" />
                                ) : (
                                  <View className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {/* Custom input is always visible now */}
                <View className={currentQuestion.type !== 'text_only' ? `mt-6 pt-6 border-t ${theme.borderSubtle}` : ''}>
                  {currentQuestion.type !== 'text_only' && (
                    <View className="flex-row items-center gap-2 mb-2">
                      <Typography
                        variant="caption"
                        className={`${theme.textMuted} font-bold uppercase tracking-widest text-[10px]`}
                      >
                        {isRtl ? 'تفاصيل إضافية (اختياري)' : 'Additional details (optional)'}
                      </Typography>
                    </View>
                  )}
                    
                    {/* The hint text requested by the user */}
                    <Typography className={`text-xs ${theme.textSecondary} mb-3 leading-relaxed`}>
                      {isRtl 
                        ? '💡 ملاحظة: ستكون نتيجة البرومبت أدق وأفضل كلما أضفت شرحاً وتفصيلاً أكثر هنا.'
                        : '💡 Note: The prompt will be much more accurate and better if you provide more details here.'}
                    </Typography>

                    <View className={`${theme.bg}/40 rounded-2xl border ${theme.borderSubtle} px-4 py-3 flex-row items-end`}>
                      <TextInput
                        placeholder={isRtl ? 'اكتب تفاصيلك هنا...' : 'Type your details here...'}
                        placeholderTextColor={theme.isDark ? '#475569' : '#94a3b8'}
                        value={customText}
                        onChangeText={setCustomText}
                        style={{
                          color: theme.isDark ? '#f1f5f9' : '#1e293b',
                          fontSize: 15,
                          lineHeight: 22,
                          minHeight: 36,
                          flex: 1,
                        }}
                        multiline
                      />

                      {/* Mic Button for Custom Text */}
                      {isSupported && (
                        <TouchableOpacity
                          onPress={() => {
                            if (isListening) stopListening();
                            else startListening(customText, (text) => setCustomText(text));
                          }}
                          className={`w-8 h-8 rounded-full items-center justify-center ml-2 mb-1 ${
                            isListening ? 'bg-red-500/20 border border-red-500/40' : `${theme.surface} border ${theme.borderSubtle}`
                          }`}
                        >
                          {isListening ? (
                            <View className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> // Stop square
                          ) : (
                            <Icon name="mic" size={14} color={theme.colors.icon} />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
              </View>

              {/* Previous answers summary */}
              {history.length > 0 && (
                <View className={`mt-4 p-4 rounded-2xl ${theme.surface}/40 border ${theme.borderSubtle}`}>
                  <Typography variant="caption" className={`${theme.textMuted} font-bold uppercase tracking-widest text-[10px] mb-2`}>
                    {isRtl ? 'إجاباتك حتى الآن' : 'Your answers so far'}
                  </Typography>
                  {history.map((entry, i) => (
                    <View key={i} className="flex-row gap-2 mt-1">
                      <Typography className={`text-primary-glow text-xs font-bold`}>•</Typography>
                      <Typography className={`${theme.textMuted} text-xs flex-1`} numberOfLines={2}>
                        {entry.answer}
                      </Typography>
                    </View>
                  ))}
                </View>
              )}
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* ── Navigation bar ── */}
      <View
        className={`${theme.bg}/90 backdrop-blur-3xl border-t ${theme.borderSubtle}`}
        style={{
          paddingTop: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: Math.max(insets.bottom, 20),
        }}
      >
        <View className="max-w-4xl mx-auto w-full flex-row gap-3">
          {/* Back button (only if we have history) */}
          <TouchableOpacity
            onPress={() => {
              if (history.length > 0) {
                const prevHistory = history.slice(0, -1);
                setHistory(prevHistory);
                fetchNextQuestion(prevHistory.slice(0, -1));
              } else {
                back();
              }
            }}
            className={`flex-1 h-14 rounded-2xl items-center justify-center ${theme.surface} border ${theme.border}`}
          >
            <Typography className={`${theme.textSecondary} font-bold text-sm`}>
              {isRtl ? 'السابق' : 'Back'}
            </Typography>
          </TouchableOpacity>

          {/* Submit button */}
          <Button
            title={isRtl ? 'التالي' : 'Next'}
            onPress={handleSubmit}
            disabled={!isAnswered}
            className={`flex-[2] h-14 rounded-2xl ${
              !isAnswered ? 'opacity-30' : 'bg-primary shadow-neon-blue'
            }`}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
