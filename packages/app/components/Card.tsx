import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps, View as RNView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(RNView);
const StyledTouchableOpacity = styled(RNTouchableOpacity);

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onPress,
  ...props
}) => {
  if (onPress) {
    return (
      <StyledTouchableOpacity
        onPress={onPress}
        className={`bg-surface/80 rounded-2xl p-4 shadow-lg border border-slate-700/50 ${className}`}
        {...props}
      >
        {children}
      </StyledTouchableOpacity>
    );
  }
  
  return (
    <StyledView
      className={`bg-surface/80 rounded-2xl p-4 shadow-lg border border-slate-700/50 ${className}`}
    >
      {children}
    </StyledView>
  );
};
