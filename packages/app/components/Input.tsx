import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View as RNView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';

const StyledView = styled(RNView);
const StyledTextInput = styled(RNTextInput);

interface InputProps extends TextInputProps {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <StyledView className={`bg-surface rounded-xl border border-slate-700/50 px-4 py-3 ${className}`}>
      <StyledTextInput
        placeholderTextColor="#64748b"
        className={`text-slate-100 text-base ${isRTL ? 'text-right' : 'text-left'}`}
        textAlign={isRTL ? 'right' : 'left'}
        {...props}
      />
    </StyledView>
  );
};
