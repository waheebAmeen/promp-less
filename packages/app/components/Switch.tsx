import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
}

export const CustomSwitch: React.FC<SwitchProps> = ({ 
  value, 
  onValueChange,
  trackColor = { false: '#cbd5e1', true: '#3b82f6' },
  thumbColor = '#ffffff'
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        { 
          backgroundColor: value ? trackColor.true : trackColor.false,
          alignItems: value ? 'flex-end' : 'flex-start'
        }
      ]}
    >
      <View 
        style={[
          styles.thumb,
          { backgroundColor: thumbColor }
        ]} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
    // Add smooth transition for web if possible, otherwise it just snaps
    ...(Platform.OS === 'web' ? { transition: 'background-color 0.2s' } as any : {}),
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    // For web transition
    ...(Platform.OS === 'web' ? { transition: 'margin 0.2s cubic-bezier(0.4, 0, 0.2, 1)' } as any : {}),
  }
});

import { Platform } from 'react-native';
