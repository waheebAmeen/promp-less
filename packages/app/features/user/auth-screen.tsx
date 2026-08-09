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
import { useTheme } from '../../design/useTheme';

export function AuthScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRtl = i18n.language === 'ar';
  const { login, signup, loginAsGuest, isAuthenticated } = useAppStore();
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
               <View className="w-20 h-20 rounded-3xl items-center justify-center border-2 mb-6" style={{ backgroundColor: theme.colors.primary + '33', borderColor: theme.colors.primary + '4D' }}>
                  <Typography className="text-4xl font-black" style={{ color: theme.text }}>P</Typography>
               </View>
               <Typography variant="h1" className="text-3xl font-black text-center tracking-tight" style={{ color: theme.text }}>
                 {isLogin ? t('auth.title_login', { defaultValue: 'Welcome Back' }) : t('auth.title_signup', { defaultValue: 'Create Account' })}
               </Typography>
               <Typography className="text-center font-medium mt-2" style={{ color: theme.textSecondary }}>
                 {t('auth.subtitle', { defaultValue: 'Choose sign-in method to continue' })}
               </Typography>
            </View>

            {error ? (
              <View className="mb-6 p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                 <Typography className="text-center text-sm font-bold" style={{ color: '#f87171' }}>{error}</Typography>
              </View>
            ) : null}

            <View className="gap-5">
              {!isLogin && (
                <View>
                  <View className={`rounded-2xl border p-1 backdrop-blur-md ${theme.isDark ? 'bg-[#1E1E2D]/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
                    <Input
                      placeholder={t('auth.full_name', { defaultValue: 'Full Name' })}
                      value={name}
                      onChangeText={setName}
                      className="bg-transparent border-0 px-5 h-14"
                      style={{ color: theme.isDark ? '#f8fafc' : '#0f172a' }}
                    />
                  </View>
                </View>
              )}

              <View>
                <View className={`rounded-2xl border p-1 backdrop-blur-md ${theme.isDark ? 'bg-[#1E1E2D]/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
                  <Input
                    placeholder={t('auth.email', { defaultValue: 'Email Address' })}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="bg-transparent border-0 px-5 h-14"
                    style={{ color: theme.isDark ? '#f8fafc' : '#0f172a' }}
                  />
                </View>
              </View>

              <View>
                <View className={`rounded-2xl border p-1 backdrop-blur-md ${theme.isDark ? 'bg-[#1E1E2D]/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
                  <Input
                    placeholder={t('auth.password', { defaultValue: 'Password' })}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-transparent border-0 px-5 h-14"
                    style={{ color: theme.isDark ? '#f8fafc' : '#0f172a' }}
                  />
                </View>
              </View>

              <Button 
                title={isLogin ? t('auth.sign_in', { defaultValue: 'Sign In' }) : t('auth.sign_up', { defaultValue: 'Register' })}
                onPress={handleSubmit}
                className="mt-2 h-16 rounded-2xl"
                style={{ backgroundColor: theme.colors.primary }}
              />

              <View className="flex-row items-center my-6">
                <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
                <Typography className="px-4 text-xs font-bold uppercase tracking-widest" style={{ color: theme.isDark ? '#94a3b8' : '#64748b' }}>
                  {t('auth.or_continue', { defaultValue: 'OR' })}
                </Typography>
                <View className={`flex-1 h-px ${theme.isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
              </View>

              <TouchableOpacity 
                className={`flex-row items-center justify-center h-16 rounded-2xl border ${theme.isDark ? 'bg-[#1E1E2D]/80 border-white/10' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}
                onPress={() => { /* Google Sign In */ }}
                activeOpacity={0.8}
              >
                <Icon name="google" size={24} />
                <Typography className="font-bold text-lg ml-3" style={{ color: theme.isDark ? '#f8fafc' : '#0f172a' }}>
                  Google
                </Typography>
              </TouchableOpacity>



              <TouchableOpacity 
                onPress={() => { setIsLogin(!isLogin); setError(''); }}
                className="py-4 items-center"
              >
                 <Typography className="font-bold" style={{ color: theme.textSecondary }}>
                   {isLogin ? t('auth.switch_signup', { defaultValue: "New here? Create an account" }) : t('auth.switch_login', { defaultValue: 'Already have an account? Sign in' })}
                 </Typography>
              </TouchableOpacity>
              

            </View>

            <View className="mt-12 items-center opacity-30">
               <Typography variant="caption" className="font-bold uppercase tracking-widest text-[10px]" style={{ color: theme.text }}>Promptless OS Secure Login</Typography>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
