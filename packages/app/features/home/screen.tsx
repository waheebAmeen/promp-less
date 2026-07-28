import React, { useState, useEffect } from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground } from '../../design/view';
import { Linking } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { useAppStore } from '../../storage/store';
import { useSafeArea } from '../../provider/safe-area/use-safe-area';

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
  const { user, isAuthenticated, logout, workflows } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeArea();

  const filteredWorkflows = workflows.filter(w => w.isActive);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

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
            className={`absolute top-0 bottom-0 w-72 bg-surface/95 border-white/10 z-50 flex-col ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}`}
           >
              {/* Sidebar Header */}
              <View className="p-6 border-b border-white/5 flex-row items-center justify-between">
                 <Typography variant="h2" className="text-white font-black text-xl tracking-tighter">Promptless</Typography>
                 <TouchableOpacity onPress={() => setIsMenuOpen(false)} className="w-8 h-8 items-center justify-center">
                    <Icon name="back" size={18} color="#64748b" />
                 </TouchableOpacity>
              </View>

              <ScrollView className="flex-1 px-4 py-6">
                {/* Navigation Section */}
                <View className="mb-8">
                  <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">Navigation</Typography>
                  <View className="gap-1">
                    {[
                      { id: 'home', label: 'Explore', icon: 'apps', route: '/' },
                      { id: 'history', label: 'My Library', icon: 'history', route: '/history' },
                      { id: 'settings', label: 'Settings', icon: 'settings', route: '/settings' },
                    ].map(item => (
                      <TouchableOpacity 
                        key={item.id}
                        onPress={() => { setIsMenuOpen(false); push(item.route); }}
                        className="flex-row items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5"
                      >
                        <Icon name={item.icon as any} size={18} color="#94a3b8" />
                        <Typography className="text-slate-300 font-medium">{item.label}</Typography>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Admin Section */}
                {user?.role === 'admin' && (
                  <View className="mb-8">
                    <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">Administration</Typography>
                    <TouchableOpacity 
                      onPress={() => { setIsMenuOpen(false); push('/admin'); }}
                      className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20"
                    >
                       <Icon name="settings" size={18} color="#3b82f6" />
                       <Typography className="text-primary-glow font-bold">Command Center</Typography>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Account Section */}
                <View className="mb-8">
                  <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">Account</Typography>
                  <View className="bg-white/5 p-4 rounded-2xl border border-white/5 flex-row items-center gap-3">
                     <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center border border-primary/30">
                        <Typography className="text-primary-glow font-bold">{user?.name?.[0] || 'U'}</Typography>
                     </View>
                     <View className="flex-1 overflow-hidden">
                        <Typography className="text-white font-bold text-sm" numberOfLines={1}>{user?.name}</Typography>
                        <Typography variant="caption" className="text-slate-500 text-xs" numberOfLines={1}>{user?.email}</Typography>
                     </View>
                  </View>
                </View>

                {/* Social Section */}
                <View>
                  <Typography variant="caption" className="text-slate-500 mb-4 px-2 uppercase font-bold text-[10px] tracking-widest">Developer</Typography>
                  <View className="flex-row flex-wrap gap-2 px-2">
                     {SOCIAL_LINKS.map(link => (
                       <TouchableOpacity key={link.name} onPress={() => Linking.openURL(link.url)} className="w-8 h-8 rounded-lg bg-white/5 items-center justify-center border border-white/10">
                          <Typography className="text-[10px] text-slate-400 font-bold">{link.name.substring(0, 2)}</Typography>
                       </TouchableOpacity>
                     ))}
                  </View>
                </View>
              </ScrollView>

              {/* Sidebar Footer */}
              <View className="p-4 border-t border-white/5">
                 <TouchableOpacity onPress={logout} className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <Icon name="delete" size={16} color="#f87171" />
                    <Typography className="text-red-400 font-bold text-sm">Sign Out</Typography>
                 </TouchableOpacity>
              </View>
           </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* Main Header */}
      <View className="border-b border-white/5 bg-background/50 backdrop-blur-md z-40">
        <View className="max-w-6xl mx-auto w-full px-6 py-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => setIsMenuOpen(true)} className="w-10 h-10 bg-surface rounded-xl items-center justify-center border border-white/10">
            <View className="gap-1 items-center">
                <View className="w-5 h-0.5 bg-slate-400 rounded-full" />
                <View className="w-3 h-0.5 bg-slate-400 rounded-full" />
                <View className="w-5 h-0.5 bg-slate-400 rounded-full" />
            </View>
          </TouchableOpacity>
          
          <Typography variant="h2" className="text-xl font-black text-white tracking-tight">Promptless</Typography>
          
          <TouchableOpacity onPress={() => push('/settings')} className="w-10 h-10 bg-surface rounded-xl items-center justify-center border border-white/10 overflow-hidden">
             <Icon name="settings" size={20} color="#94a3b8" />
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
          <View className="mb-16">
            <Typography className="text-primary-glow font-black uppercase text-[10px] tracking-[0.3em] mb-4">Promptless AI OS</Typography>
            <Typography variant="h1" className="text-white mb-4 text-4xl md:text-6xl font-black leading-tight tracking-tighter">
               نظام المدير الإبداعي 
            </Typography>
            <Typography variant="caption" className="text-lg text-slate-400 font-medium max-w-xl leading-relaxed">
               قم ببناء مطالبات بصرية متطورة باستخدام تدفقات عمل التوجية الفني الاحترافي 
            </Typography>
          </View>

          {/* Categories Grid */}
          <View className="flex-row flex-wrap justify-start">
            {filteredWorkflows.map((cat) => (
              <View key={cat.id} className="w-1/2 md:w-1/3 lg:w-1/5 p-1.5 md:p-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-full overflow-hidden rounded-3xl border border-white/5 bg-surface/40 backdrop-blur-md"
                  onPress={() => push(`/input/${cat.id}`)}
                >
                  <View className="p-5">
                    <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-5 ${cat.color} border ${cat.borderColor}`}>
                      <Icon name={cat.icon as any} size={24} color={cat.iconColor} strokeWidth={2.5} />
                    </View>
                    <Typography variant="h2" className="text-lg font-bold text-white mb-1">
                      {isRtl ? cat.name_ar : cat.name_en}
                    </Typography>
                    <Typography variant="caption" className="text-slate-500 text-xs font-medium">
                      Start Workflow
                    </Typography>
                  </View>
                </TouchableOpacity>
              </View>
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
          <View className="h-16 bg-surface/90 border border-white/10 rounded-full backdrop-blur-3xl shadow-premium flex-row items-center justify-around px-2">
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
                <Icon name={tab.icon as any} size={20} color={tab.id === 'home' ? '#3b82f6' : '#94a3b8'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
