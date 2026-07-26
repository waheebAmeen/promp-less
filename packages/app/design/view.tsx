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

export const View = styled(ReactNativeView)
export const ScrollView = styled(ReactNativeScrollView)
export const SafeAreaView = styled(ReactNativeSafeAreaView)
export const TouchableOpacity = styled(ReactNativeTouchableOpacity)
export const KeyboardAvoidingView = styled(ReactNativeKeyboardAvoidingView)
export const ActivityIndicator = styled(ReactNativeActivityIndicator)
export const FlatList = styled(ReactNativeFlatList)
export const Switch = styled(ReactNativeSwitch)

export const ScreenContainer = ({ children, className = "", ...props }: any) => {
  return (
    <View 
      className={`flex-1 bg-background ${className}`} 
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

export const DecorativeBackground = () => (
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
    <View 
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[80px] opacity-60" 
    />
    <View 
      className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/20 rounded-full blur-[80px] opacity-40" 
    />
  </View>
)
