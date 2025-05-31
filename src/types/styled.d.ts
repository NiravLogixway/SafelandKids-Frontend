import 'styled-components/native';
import {theme} from '@/config/theme';

// Define theme types for styled-components
declare module 'styled-components/native' {
  export interface DefaultTheme {
    dark: boolean;
    colors: {
      primary: string;
      onPrimary: string;
      primaryContainer: string;
      onPrimaryContainer: string;
      secondary: string;
      onSecondary: string;
      secondaryContainer: string;
      onSecondaryContainer: string;
      tertiary: string;
      onTertiary: string;
      tertiaryContainer: string;
      onTertiaryContainer: string;
      errorText: string;
      error: string;
      onError: string;
      errorContainer: string;
      onErrorContainer: string;
      onBackground: string;
      surface: string;
      onSurface: string;
      surfaceVariant: string;
      onSurfaceVariant: string;
      outline: string;
      outlineVariant: string;
      shadow: string;
      scrim: string;
      inverseSurface: string;
      inverseOnSurface: string;
      inversePrimary: string;
      amber: string;
      white: string;
      purple: string;
      orange: string;
      inputBackground: string;
      inputText: string;
      buttonPrimary: string;
      linkText: string;
      info: string;
      input: {
        border: string;
        errorBorder: string;
        background: string;
        text: string;
        placeholder: string;
        color: string;
      };
      button: {
        primary: string;
        secondary: string;
      };
      elevation: {
        level0: string;
        level1: string;
        level2: string;
        level3: string;
        level4: string;
        level5: string;
      };
      surfaceDisabled: string;
      onSurfaceDisabled: string;
      backdrop: string;
      text: {
        primary: string;
        secondary: string;
        error: string;
        success: string;
        textGrey: string;
        textPrimary: string;
        textSecondary: string;
        textDrakBlack: string;
        textDrakestBlack: string;
      };
      border: {
        level0: string;
      };
      background: {
        default: string;
        secondary: string;
        dark: string;
        gradient: {
          primary: {
            colors: string[];
            start: {x: number; y: number};
            end: {x: number; y: number};
          };
        };
      };
    };
    fonts: {
      FONT_THIN: string;
      FONT_LIGHT: string;
      FONT_REGULAR: string;
      FONT_MEDIUM: string;
      FONT_BOLD: string;
      [key: string]: any;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      round: number;
    };
  }
}
