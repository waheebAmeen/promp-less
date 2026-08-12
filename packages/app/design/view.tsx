import React, { useState, useEffect, useRef } from 'react'
import { 
  View as ReactNativeView, 
  ScrollView as ReactNativeScrollView, 
  SafeAreaView as ReactNativeSafeAreaView,
  TouchableOpacity as ReactNativeTouchableOpacity,
  KeyboardAvoidingView as ReactNativeKeyboardAvoidingView,
  ActivityIndicator as ReactNativeActivityIndicator,
  FlatList as ReactNativeFlatList,
  Switch as ReactNativeSwitch,
  Platform
} from 'react-native'
import { styled } from 'nativewind'
import { useAppStore } from '../storage/store'
import { useTheme } from './useTheme'
import { Animated } from 'react-native'

export const View = styled(ReactNativeView)
export const ScrollView = styled(ReactNativeScrollView)
export const SafeAreaView = styled(ReactNativeSafeAreaView)
export const TouchableOpacity = styled(ReactNativeTouchableOpacity)
export const KeyboardAvoidingView = styled(ReactNativeKeyboardAvoidingView)
export const ActivityIndicator = styled(ReactNativeActivityIndicator)
export const FlatList = styled(ReactNativeFlatList)
export const Switch = styled(ReactNativeSwitch)

export const ScreenContainer = ({ children, className = "", ...props }: any) => {
  const theme = useTheme();
  const bgClass = theme.isDark ? 'bg-background text-slate-100' : 'bg-light-background text-light-on-surface';

  return (
    <View 
      className={`flex-1 ${bgClass} ${className}`} 
      style={{ 
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }} 
      {...props}
    >
      {children}
    </View>
  )
}

export const DecorativeBackground = () => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    
    const startAnim = (anim: Animated.Value, duration: number) => {
      // Ensure we reset value just in case
      anim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: false
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: false
          })
        ])
      ).start();
    };

    startAnim(anim1, 5000);
    startAnim(anim2, 6000);
    startAnim(anim3, 7500);
  }, [isMounted, anim1, anim2, anim3]);

  if (!isMounted) {
    // Return static version for SSR
    return (
      <View 
        style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          overflow: 'hidden', zIndex: -1, width: '100%', height: '100%'
        }}
        pointerEvents="none"
      >
        <View 
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] ${
            theme.isDark ? 'bg-primary/20 opacity-60' : 'bg-primary/10 opacity-70'
          }`} 
        />
        <View 
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] ${
            theme.isDark ? 'bg-accent-purple/20 opacity-40' : 'bg-secondary/15 opacity-50'
          }`} 
        />
      </View>
    );
  }

  return (
    <View 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        overflow: 'hidden',
        zIndex: -1,
        width: '100%',
        height: '100%'
      }}
      pointerEvents="none"
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          borderRadius: 9999,
          transform: [
            { translateY: anim1.interpolate({ inputRange: [0, 1], outputRange: [0, -40] }) },
            { translateX: anim1.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) },
            { scale: anim1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }
          ]
        }}
      >
        <View 
          className={`w-full h-full rounded-full blur-[80px] ${
            theme.isDark ? 'bg-primary/20 opacity-60' : 'bg-primary/10 opacity-70'
          }`} 
        />
      </Animated.View>
      
      <Animated.View
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '50%',
          height: '50%',
          borderRadius: 9999,
          transform: [
            { translateY: anim2.interpolate({ inputRange: [0, 1], outputRange: [0, 40] }) },
            { translateX: anim2.interpolate({ inputRange: [0, 1], outputRange: [0, -30] }) },
            { scale: anim2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }
          ]
        }}
      >
        <View 
          className={`w-full h-full rounded-full blur-[80px] ${
            theme.isDark ? 'bg-accent-purple/20 opacity-40' : 'bg-secondary/15 opacity-50'
          }`} 
        />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '40%',
          height: '40%',
          borderRadius: 9999,
          opacity: anim3.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
          transform: [
            { translateY: anim3.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
            { translateX: anim3.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) },
            { scale: anim3.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }
          ]
        }}
      >
        <View 
          className={`w-full h-full rounded-full blur-[100px] ${
            theme.isDark ? 'bg-[#ff0080]/10' : 'bg-[#ff0080]/5'
          }`} 
        />
      </Animated.View>
    </View>
  );
}

