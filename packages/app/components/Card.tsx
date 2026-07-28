import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps, View as RNView } from 'react-native';
import { styled } from 'nativewind';
import { useTheme } from '../design/useTheme';

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
  const theme = useTheme();
  const cardClass = `${theme.cardBg} rounded-2xl p-4 ${theme.cardShadow} border ${theme.cardBorder}`;

  if (onPress) {
    return (
      <StyledTouchableOpacity
        onPress={onPress}
        className={`${cardClass} ${className}`}
        {...props}
      >
        {children}
      </StyledTouchableOpacity>
    );
  }
  
  return (
    <StyledView
      className={`${cardClass} ${className}`}
    >
      {children}
    </StyledView>
  );
};
