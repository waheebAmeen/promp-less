import React, { useState } from 'react';
import { View, ScrollView, ScreenContainer, TouchableOpacity, DecorativeBackground, Switch } from '../../design/view';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/Icon';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { useAppStore, User, Workflow, Question, QuestionOption } from '../../storage/store';
import { useSafeArea } from '../../provider/safe-area/use-safe-area';
import { Platform, Alert } from 'react-native';

type Tab = 'overview' | 'users' | 'workflows' | 'settings';

export function AdminScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { push, back } = useRouter();
  const { 
    user, users, workflows, globalHistory, qualityBoosters, 
    updateUser, updateWorkflow, setQualityBoosters, clearGlobalHistory,
    addWorkflow, deleteWorkflow 
  } = useAppStore();
  const insets = useSafeArea();
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [newBooster, setNewBooster] = useState('');
  
  // Workflow Editor State
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
  const editingWorkflow = workflows.find(w => w.id === editingWorkflowId);

  // Guard: only admin can access
  if (user?.role !== 'admin') {
    return (
      <ScreenContainer className="justify-center items-center p-10">
        <Typography variant="h1" className="text-red-400 mb-4">Access Denied</Typography>
        <TouchableOpacity onPress={() => push('/')} className="bg-primary px-8 py-4 rounded-2xl">
          <Typography className="font-bold">Return Home</Typography>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const handleAddBooster = () => {
    if (newBooster.trim()) {
      setQualityBoosters([...qualityBoosters, newBooster.trim()]);
      setNewBooster('');
    }
  };

  const renderOverview = () => (
    <View className="gap-8">
      {/* Stats Grid */}
      <View className="flex-row flex-wrap -mx-2">
        {[
          { label: 'Total Users', value: users.length, icon: 'user', color: 'text-primary-glow' },
          { label: 'Total Prompts', value: globalHistory.length, icon: 'text', color: 'text-accent-purple' },
          { label: 'Active Workflows', value: workflows.filter(w => w.isActive).length, icon: 'apps', color: 'text-accent-emerald' },
          { label: 'Banned Users', value: users.filter(u => u.status === 'banned').length, icon: 'delete', color: 'text-accent-rose' },
        ].map((stat, i) => (
          <View key={i} className="w-1/2 md:w-1/4 p-2">
            <Card className="bg-surface-light/30 border-white/5 items-center py-6">
               <Typography variant="h1" className={`${stat.color} text-3xl mb-1`}>{stat.value}</Typography>
               <Typography variant="caption" className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{stat.label}</Typography>
            </Card>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View>
        <View className="flex-row justify-between items-end mb-6 px-2">
          <Typography variant="h2" className="text-xl font-black text-white">Recent Activity</Typography>
          <TouchableOpacity onPress={clearGlobalHistory}>
             <Typography variant="caption" className="text-accent-rose font-bold">Clear Logs</Typography>
          </TouchableOpacity>
        </View>
        <Card className="bg-surface/40 border-white/5 p-0 overflow-hidden">
          {globalHistory.slice(0, 10).map((log, i) => (
            <View key={log.id} className={`p-4 flex-row items-center gap-4 ${i !== 0 ? 'border-t border-white/5' : ''}`}>
               <View className="w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/5">
                  <Typography className="text-[10px] font-black uppercase text-slate-500">{log.workflowId.substring(0, 3)}</Typography>
               </View>
               <View className="flex-1">
                  <Typography className="text-slate-200 text-sm font-medium" numberOfLines={1}>
                    <Typography className="text-primary-glow font-bold">{log.userName}</Typography> created a prompt
                  </Typography>
                  <Typography variant="caption" className="text-slate-500 text-[10px]">{new Date(log.createdAt).toLocaleString()}</Typography>
               </View>
            </View>
          ))}
          {globalHistory.length === 0 && (
            <View className="p-10 items-center">
               <Typography className="text-slate-600 italic">No activity logs yet</Typography>
            </View>
          )}
        </Card>
      </View>
    </View>
  );

  const renderUsers = () => (
    <View>
      <View className="mb-6 px-2">
         <Typography variant="h2" className="text-xl font-black text-white">User Management</Typography>
         <Typography variant="caption" className="text-slate-500">Manage permissions and account status</Typography>
      </View>
      
      <View className="gap-4">
        {users.map(u => (
          <Card key={u.id} className="bg-surface-light/30 border-white/5 p-5">
            <View className="flex-row justify-between items-start">
               <View className="flex-row gap-4 items-center">
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${u.role === 'admin' ? 'bg-primary/20 border border-primary/30' : 'bg-white/5 border border-white/10'}`}>
                     <Typography className="text-xl">{u.role === 'admin' ? '🛡️' : '👤'}</Typography>
                  </View>
                  <View>
                     <Typography className="text-white font-bold text-lg">{u.name}</Typography>
                     <Typography variant="caption" className="text-slate-500">{u.email}</Typography>
                  </View>
               </View>
               <View className={`px-3 py-1 rounded-full ${u.status === 'active' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <Typography className={`text-[10px] font-black uppercase ${u.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>{u.status}</Typography>
               </View>
            </View>
            
            <View className="flex-row gap-3 mt-6 pt-5 border-t border-white/5">
               <TouchableOpacity 
                onPress={() => updateUser(u.id, { status: u.status === 'active' ? 'banned' : 'active' })}
                className={`flex-1 h-10 rounded-xl items-center justify-center ${u.status === 'active' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}
               >
                  <Typography className={`font-bold text-xs ${u.status === 'active' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {u.status === 'active' ? 'Ban User' : 'Unban User'}
                  </Typography>
               </TouchableOpacity>
               <TouchableOpacity 
                onPress={() => updateUser(u.id, { role: u.role === 'admin' ? 'user' : 'admin' })}
                className="flex-1 h-10 bg-white/5 rounded-xl items-center justify-center"
               >
                  <Typography className="text-slate-400 font-bold text-xs">
                    {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                  </Typography>
               </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );

  const renderWorkflowEditor = () => {
    if (!editingWorkflow) return null;

    const handleUpdateField = (field: keyof Workflow, value: any) => {
      updateWorkflow(editingWorkflow.id, { [field]: value });
    };

    const handleUpdateQuestion = (qId: string, updates: Partial<Question>) => {
      const updatedQuestions = editingWorkflow.questions.map(q => 
        q.id === qId ? { ...q, ...updates } : q
      );
      handleUpdateField('questions', updatedQuestions);
    };

    const handleAddQuestion = () => {
       const newQ: Question = {
         id: 'q-' + Date.now(),
         title_en: 'New Question',
         title_ar: 'سؤال جديد',
         type: 'select',
         options: []
       };
       handleUpdateField('questions', [...editingWorkflow.questions, newQ]);
    };

    const handleAddOption = (qId: string) => {
       const newOpt: QuestionOption = {
          label_en: 'New Option',
          label_ar: 'خيار جديد',
          value: 'val-' + Date.now()
       };
       const updatedQuestions = editingWorkflow.questions.map(q => 
        q.id === qId ? { ...q, options: [...(q.options || []), newOpt] } : q
       );
       handleUpdateField('questions', updatedQuestions);
    };

    const handleRemoveQuestion = (qId: string) => {
       handleUpdateField('questions', editingWorkflow.questions.filter(q => q.id !== qId));
    };

    return (
       <View className="gap-8 pb-20">
          <View className="flex-row justify-between items-center px-2">
             <Typography variant="h2" className="text-xl font-black text-white">Edit Workflow</Typography>
             <TouchableOpacity onPress={() => setEditingWorkflowId(null)} className="px-4 py-2 bg-white/5 rounded-full">
                <Typography className="text-slate-400 font-bold text-xs">Close Editor</Typography>
             </TouchableOpacity>
          </View>

          <Card className="bg-surface-light/30 border-white/5 p-6 gap-6">
             <View>
                <Typography variant="caption" className="text-slate-500 mb-2 uppercase font-black text-[10px]">Workflow Name (EN / AR)</Typography>
                <View className="flex-row gap-2">
                   <Input 
                    value={editingWorkflow.name_en} 
                    onChangeText={(t) => handleUpdateField('name_en', t)}
                    className="flex-1 bg-black/20 border-white/5" 
                   />
                   <Input 
                    value={editingWorkflow.name_ar} 
                    onChangeText={(t) => handleUpdateField('name_ar', t)}
                    className="flex-1 bg-black/20 border-white/5" 
                   />
                </View>
             </View>
             <View>
                <Typography variant="caption" className="text-slate-500 mb-2 uppercase font-black text-[10px]">Prompt Template</Typography>
                <Input 
                  multiline 
                  numberOfLines={3} 
                  value={editingWorkflow.template}
                  onChangeText={(t) => handleUpdateField('template', t)}
                  className="bg-black/20 border-white/5 h-24 font-mono text-xs text-primary-glow" 
                />
             </View>
          </Card>

          <View className="flex-row justify-between items-center px-2">
             <Typography variant="h2" className="text-lg font-black text-white">Question Blocks</Typography>
             <TouchableOpacity onPress={handleAddQuestion} className="bg-primary/20 px-4 py-2 rounded-full border border-primary/30">
                <Typography className="text-primary-glow font-bold text-xs">+ Add Question</Typography>
             </TouchableOpacity>
          </View>

          {editingWorkflow.questions.map((q, qIndex) => (
             <Card key={q.id} className="bg-surface/40 border-white/10 p-6">
                <View className="flex-row justify-between items-start mb-6">
                   <View className="flex-1 mr-4">
                      <Input 
                        value={q.title_en} 
                        onChangeText={(t) => handleUpdateQuestion(q.id, { title_en: t })}
                        className="bg-black/20 border-white/5 mb-2 font-bold" 
                      />
                      <Input 
                        value={q.title_ar} 
                        onChangeText={(t) => handleUpdateQuestion(q.id, { title_ar: t })}
                        className="bg-black/20 border-white/5" 
                      />
                   </View>
                   <TouchableOpacity onPress={() => handleRemoveQuestion(q.id)} className="w-10 h-10 bg-red-500/10 rounded-full items-center justify-center border border-red-500/20">
                      <Icon name="delete" size={14} color="#f87171" />
                   </TouchableOpacity>
                </View>

                <Typography variant="caption" className="text-slate-500 mb-4 uppercase font-black text-[10px]">Answer Options</Typography>
                <View className="gap-2 mb-4">
                   {q.options?.map((opt, oIndex) => (
                      <View key={oIndex} className="flex-row gap-2">
                         <Input 
                          placeholder="Label EN"
                          value={opt.label_en}
                          onChangeText={(t) => {
                            const newOpts = [...(q.options || [])];
                            newOpts[oIndex] = { ...opt, label_en: t };
                            handleUpdateQuestion(q.id, { options: newOpts });
                          }}
                          className="flex-1 bg-black/20 border-white/5 text-xs h-10" 
                         />
                         <Input 
                          placeholder="Value"
                          value={opt.value}
                          onChangeText={(t) => {
                            const newOpts = [...(q.options || [])];
                            newOpts[oIndex] = { ...opt, value: t };
                            handleUpdateQuestion(q.id, { options: newOpts });
                          }}
                          className="flex-1 bg-black/20 border-white/5 text-xs h-10 text-primary-glow" 
                         />
                         <TouchableOpacity 
                          onPress={() => {
                            handleUpdateQuestion(q.id, { options: q.options?.filter((_, i) => i !== oIndex) });
                          }}
                          className="w-10 h-10 bg-white/5 rounded-xl items-center justify-center"
                         >
                            <Icon name="delete" size={12} color="#64748b" />
                         </TouchableOpacity>
                      </View>
                   ))}
                </View>
                <TouchableOpacity onPress={() => handleAddOption(q.id)} className="py-2 items-center bg-white/5 rounded-xl border border-white/5">
                   <Typography className="text-slate-500 font-bold text-[10px]">+ Add Option</Typography>
                </TouchableOpacity>
             </Card>
          ))}
       </View>
    );
  };

  const renderWorkflows = () => (
    <View>
      <View className="flex-row justify-between items-center mb-6 px-2">
         <View>
            <Typography variant="h2" className="text-xl font-black text-white">Workflow Engine</Typography>
            <Typography variant="caption" className="text-slate-500">Dynamic category and template builder</Typography>
         </View>
         <TouchableOpacity 
          onPress={() => {
            const id = 'workflow-' + Date.now();
            addWorkflow({
              id,
              name_en: 'New Workflow',
              name_ar: 'سير عمل جديد',
              icon: 'custom',
              color: 'bg-primary/10',
              borderColor: 'border-primary/30',
              iconColor: '#3b82f6',
              isActive: true,
              template: "${idea}, high quality",
              questions: []
            });
            setEditingWorkflowId(id);
          }}
          className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center border border-primary/30"
         >
            <Typography className="text-primary-glow text-xl font-bold">+</Typography>
         </TouchableOpacity>
      </View>

      <View className="gap-4">
        {workflows.map(w => (
          <Card key={w.id} className={`bg-surface-light/30 border-white/5 p-0 overflow-hidden ${!w.isActive ? 'opacity-50' : ''}`}>
             <View className="p-5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                   <View className={`w-12 h-12 rounded-2xl items-center justify-center ${w.color} border ${w.borderColor}`}>
                      <Icon name={w.icon as any} size={24} color={w.iconColor} />
                   </View>
                   <View className="flex-1">
                      <Typography className="text-white font-bold text-lg" numberOfLines={1}>{w.name_en} / {w.name_ar}</Typography>
                      <Typography variant="caption" className="text-slate-500">{w.questions.length} Questions</Typography>
                   </View>
                </View>
                <View className="flex-row items-center gap-3">
                   <TouchableOpacity 
                    onPress={() => {
                      if (Platform.OS === 'web') {
                        if (confirm('Delete this workflow?')) deleteWorkflow(w.id);
                      } else {
                        deleteWorkflow(w.id);
                      }
                    }}
                    className="w-8 h-8 bg-red-500/10 rounded-lg items-center justify-center"
                   >
                      <Icon name="delete" size={14} color="#f43f5e" />
                   </TouchableOpacity>
                   <Switch 
                    value={w.isActive} 
                    onValueChange={() => updateWorkflow(w.id, { isActive: !w.isActive })}
                    trackColor={{ false: '#1e293b', true: '#3b82f6' }}
                  />
                </View>
             </View>
             <View className="bg-black/20 p-4 border-t border-white/5">
                <Typography variant="caption" className="text-slate-400 text-[10px] uppercase font-black mb-1">Template String</Typography>
                <Typography className="text-primary-glow/80 text-xs font-mono" numberOfLines={2}>{w.template}</Typography>
             </View>
             <TouchableOpacity onPress={() => setEditingWorkflowId(w.id)} className="py-3 items-center bg-white/5">
                <Typography className="text-slate-400 font-bold text-xs">Edit Workflow Structure</Typography>
             </TouchableOpacity>
          </Card>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View>
      <View className="mb-8 px-2">
         <Typography variant="h2" className="text-xl font-black text-white">Global OS Settings</Typography>
         <Typography variant="caption" className="text-slate-500">Configure platform-wide behavior</Typography>
      </View>

      <Card className="bg-surface-light/30 border-white/5 p-6 mb-8">
         <Typography className="text-white font-bold mb-4">Prompt Quality Boosters</Typography>
         <View className="flex-row flex-wrap gap-2 mb-6">
            {qualityBoosters.map((b, i) => (
              <View key={i} className="flex-row items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                 <Typography className="text-primary-glow text-sm font-medium">{b}</Typography>
                 <TouchableOpacity onPress={() => setQualityBoosters(qualityBoosters.filter(x => x !== b))}>
                    <Icon name="delete" size={12} color="#f43f5e" />
                 </TouchableOpacity>
              </View>
            ))}
         </View>
         <View className="flex-row gap-2">
            <View className="flex-1 bg-black/20 rounded-2xl border border-white/10 px-4 justify-center overflow-hidden">
               <Input 
                placeholder="Add new booster..." 
                className="bg-transparent border-0 h-12 text-white" 
                value={newBooster}
                onChangeText={setNewBooster}
               />
            </View>
            <Button title="Add" onPress={handleAddBooster} className="px-6 h-12 rounded-2xl" />
         </View>
      </Card>

      <Card className="bg-accent-rose/5 border-accent-rose/20 p-6">
         <Typography className="text-accent-rose font-bold mb-2">Maintenance Controls</Typography>
         <View className="gap-4">
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <Typography className="text-slate-300 font-bold">System Maintenance Mode</Typography>
               <View className="w-10 h-5 rounded-full bg-slate-700 px-1 justify-center"><View className="w-3 h-3 rounded-full bg-white" /></View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <Typography className="text-slate-300 font-bold">Block All Guest Access</Typography>
               <View className="w-10 h-5 rounded-full bg-slate-700 px-1 justify-center"><View className="w-3 h-3 rounded-full bg-white" /></View>
            </TouchableOpacity>
         </View>
      </Card>
    </View>
  );

  return (
    <ScreenContainer>
      <DecorativeBackground />

      {/* Admin Header */}
      <View className="border-b border-white/5 bg-background/50 backdrop-blur-md z-40">
        <View className="max-w-6xl mx-auto w-full px-6 py-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
             <TouchableOpacity onPress={() => back()} className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-white/10">
                <Icon name="back" size={20} color="#94a3b8" />
             </TouchableOpacity>
             <View>
                <Typography variant="h2" className="text-xl font-black text-white tracking-tight">Admin Control Center</Typography>
                <Typography className="text-primary-glow text-[10px] font-black uppercase tracking-widest">Promptless OS v1.0</Typography>
             </View>
          </View>
          <View className="w-10 h-10 rounded-2xl bg-primary/20 items-center justify-center border border-primary/30">
             <Typography className="text-primary-glow font-bold">A</Typography>
          </View>
        </View>
      </View>

      {/* Tabs Navigation */}
      {!editingWorkflowId && (
        <View className="bg-surface/40 border-b border-white/5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4">
              <View className="flex-row gap-4">
                {[
                  { id: 'overview', label: 'Overview', icon: 'apps' },
                  { id: 'users', label: 'Users', icon: 'user' },
                  { id: 'workflows', label: 'Workflows', icon: 'custom' },
                  { id: 'settings', label: 'Settings', icon: 'settings' },
                ].map((tab) => (
                  <TouchableOpacity 
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id as Tab)}
                    className={`flex-row items-center gap-2 px-5 py-2.5 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-primary border border-primary-glow shadow-neon-blue' : 'bg-white/5 border border-white/5'}`}
                  >
                      <Icon name={tab.icon as any} size={16} color={activeTab === tab.id ? 'white' : '#64748b'} />
                      <Typography className={`font-bold text-sm ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.label}</Typography>
                  </TouchableOpacity>
                ))}
              </View>
          </ScrollView>
        </View>
      )}

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="max-w-6xl mx-auto w-full p-6">
           {editingWorkflowId ? renderWorkflowEditor() : (
             <>
               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'users' && renderUsers()}
               {activeTab === 'workflows' && renderWorkflows()}
               {activeTab === 'settings' && renderSettings()}
             </>
           )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
