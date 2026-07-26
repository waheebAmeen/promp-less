import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';

const StyledText = styled(RNText);

interface TypographyProps extends TextProps {
  className?: string;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  className = '',
  variant = 'body',
  children,
  ...props
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const baseStyles = 'text-slate-100'; // base color
  
  let variantStyles = '';
  switch (variant) {
    case 'h1':
      variantStyles = 'text-4xl font-bold';
      break;
    case 'h2':
      variantStyles = 'text-2xl font-semibold';
      break;
    case 'body':
      variantStyles = 'text-base';
      break;
    case 'caption':
      variantStyles = 'text-sm text-slate-400';
      break;
  }

  // Adjust text alignment for RTL
  const alignment = isRTL ? 'text-right' : 'text-left';

  return (
    <StyledText
      className={`${baseStyles} ${variantStyles} ${alignment} ${className}`}
      {...props}
    >
      {children}
    </StyledText>
  );
};
