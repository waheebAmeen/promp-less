import React, { useState, useEffect } from 'react';
import { View, ScreenContainer, KeyboardAvoidingView, TouchableOpacity, ScrollView, DecorativeBackground } from '../../design/view';
import { Platform } from 'react-native';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { useAppStore } from '../../storage/store';

export function AuthScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { login, signup, isAuthenticated } = useAppStore();
  const { push, back } = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      push('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = () => {
    setError('');
    if (!email || !password || (!isLogin && !name)) {
       setError(isRtl ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
       return;
    }

    try {
      if (isLogin) {
        login(email, name || 'User');
      } else {
        signup(email, name);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ScreenContainer>
      <DecorativeBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 50 }}>
          <View className="max-w-md mx-auto w-full px-8 pt-16">
            
            <View className="items-center mb-12">
               <View className="w-20 h-20 bg-primary/20 rounded-3xl items-center justify-center border-2 border-primary/30 shadow-neon-blue mb-6">
                  <Typography className="text-4xl font-black text-white">P</Typography>
               </View>
               <Typography variant="h1" className="text-3xl font-black text-white text-center tracking-tight">
                 {isLogin ? (isRtl ? 'مرحباً بك مجدداً' : 'Welcome Back') : (isRtl ? 'انضم إلينا' : 'Create Account')}
               </Typography>
               <Typography className="text-slate-500 text-center font-medium mt-2">
                 {isLogin ? (isRtl ? 'سجل دخولك للمتابعة' : 'Sign in to continue your creative journey') : (isRtl ? 'ابدأ رحلتك الإبداعية معنا' : 'Join the most advanced prompt system')}
               </Typography>
            </View>

            {error ? (
              <View className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                 <Typography className="text-red-400 text-center text-sm font-bold">{error}</Typography>
              </View>
            ) : null}

            <View className="gap-5">
              {!isLogin && (
                <View>
                  <View className="bg-surface/60 rounded-2xl border border-white/5 p-1 backdrop-blur-md">
                    <Input
                      placeholder={isRtl ? 'الاسم الكامل' : 'Full Name'}
                      value={name}
                      onChangeText={setName}
                      className="bg-transparent border-0 px-5 h-14 text-white"
                    />
                  </View>
                </View>
              )}

              <View>
                <View className="bg-surface/60 rounded-2xl border border-white/5 p-1 backdrop-blur-md">
                  <Input
                    placeholder={isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="bg-transparent border-0 px-5 h-14 text-white"
                  />
                </View>
              </View>

              <View>
                <View className="bg-surface/60 rounded-2xl border border-white/5 p-1 backdrop-blur-md">
                  <Input
                    placeholder={isRtl ? 'كلمة المرور' : 'Password'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-transparent border-0 px-5 h-14 text-white"
                  />
                </View>
              </View>

              <Button 
                title={isLogin ? (isRtl ? 'دخول' : 'Sign In') : (isRtl ? 'تسجيل' : 'Register')}
                onPress={handleSubmit}
                className="mt-4 h-16 rounded-2xl bg-primary shadow-neon-blue"
              />

              <TouchableOpacity 
                onPress={() => { setIsLogin(!isLogin); setError(''); }}
                className="py-4 items-center"
              >
                 <Typography className="text-slate-400 font-bold">
                   {isLogin ? (isRtl ? 'لا تملك حساباً؟ سجل الآن' : "New here? Create an account") : (isRtl ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign in')}
                 </Typography>
              </TouchableOpacity>
            </View>

            <View className="mt-12 items-center opacity-30">
               <Typography variant="caption" className="font-bold uppercase tracking-widest text-[10px]">Promptless OS Secure Login</Typography>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
