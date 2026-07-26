import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(RNTouchableOpacity);

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  className = '',
  textClassName = '',
  ...props
}) => {
  let bgClass = 'bg-primary shadow-neon-primary';
  let textClass = 'text-white';

  if (variant === 'secondary') {
    bgClass = 'bg-surface-light border border-slate-700';
    textClass = 'text-slate-300';
  } else if (variant === 'outline') {
    bgClass = 'bg-transparent border-2 border-primary';
    textClass = 'text-primary-light';
  }

  return (
    <StyledTouchableOpacity
      className={`rounded-2xl py-4 px-8 items-center justify-center flex-row ${bgClass} ${className}`}
      {...props}
    >
      <Typography className={`font-bold text-lg tracking-wide ${textClass} ${textClassName}`}>
        {title}
      </Typography>
    </StyledTouchableOpacity>
  );
};
