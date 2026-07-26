import React from 'react';
import { Svg, Path, Circle, Rect } from 'react-native-svg';
import { styled } from 'nativewind';

const StyledSvg = styled(Svg);

interface IconProps {
  name: 'images' | 'apps' | 'text' | 'video' | 'custom' | 'history' | 'settings' | 'back' | 'check' | 'delete' | 'copy' | 'save' | 'share' | 'search';
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'white', strokeWidth = 2 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as any;

  switch (name) {
    case 'images':
      return (
        <StyledSvg {...props}>
          <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <Circle cx="8.5" cy="8.5" r="1.5" />
          <Path d="M21 15l-5-5L5 21" />
        </StyledSvg>
      );
    case 'apps':
      return (
        <StyledSvg {...props}>
          <Rect x="3" y="3" width="7" height="7" />
          <Rect x="14" y="3" width="7" height="7" />
          <Rect x="14" y="14" width="7" height="7" />
          <Rect x="3" y="14" width="7" height="7" />
        </StyledSvg>
      );
    case 'text':
      return (
        <StyledSvg {...props}>
          <Path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </StyledSvg>
      );
    case 'video':
      return (
        <StyledSvg {...props}>
          <Path d="M23 7l-7 5 7 5V7z" />
          <Rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </StyledSvg>
      );
    case 'custom':
      return (
        <StyledSvg {...props}>
          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </StyledSvg>
      );
    case 'history':
      return (
        <StyledSvg {...props}>
          <Circle cx="12" cy="12" r="10" />
          <Path d="M12 6v6l4 2" />
        </StyledSvg>
      );
    case 'settings':
      return (
        <StyledSvg {...props}>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </StyledSvg>
      );
    case 'back':
      return (
        <StyledSvg {...props}>
          <Path d="M19 12H5M12 19l-7-7 7-7" />
        </StyledSvg>
      );
    case 'check':
      return (
        <StyledSvg {...props}>
          <Path d="M20 6L9 17l-5-5" />
        </StyledSvg>
      );
    case 'delete':
      return (
        <StyledSvg {...props}>
          <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
        </StyledSvg>
      );
    case 'copy':
      return (
        <StyledSvg {...props}>
          <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </StyledSvg>
      );
    case 'save':
      return (
        <StyledSvg {...props}>
          <Path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <Path d="M17 21v-8H7v8M7 3v5h8" />
        </StyledSvg>
      );
    case 'share':
      return (
        <StyledSvg {...props}>
          <Circle cx="18" cy="5" r="3" />
          <Circle cx="6" cy="12" r="3" />
          <Circle cx="18" cy="19" r="3" />
          <Path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
        </StyledSvg>
      );
    case 'search':
      return (
        <StyledSvg {...props}>
          <Circle cx="11" cy="11" r="8" />
          <Path d="M21 21l-4.35-4.35" />
        </StyledSvg>
      );
    default:
      return null;
  }
};
