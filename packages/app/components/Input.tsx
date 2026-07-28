import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View as RNView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';
import { useTheme } from '../design/useTheme';

const StyledView = styled(RNView);
const StyledTextInput = styled(RNTextInput);

interface InputProps extends TextInputProps {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();
  
  return (
    <StyledView className={`${theme.inputBg} rounded-xl border ${theme.inputBorder} px-4 py-3 ${className}`}>
      <StyledTextInput
        placeholderTextColor={theme.inputPlaceholder}
        className={`${theme.inputText} text-base ${isRTL ? 'text-right' : 'text-left'}`}
        textAlign={isRTL ? 'right' : 'left'}
        {...props}
      />
    </StyledView>
  );
};
