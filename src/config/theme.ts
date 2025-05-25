import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {configureFonts} from 'react-native-paper';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'OpenSans-Medium',
    },
    medium: {
      fontFamily: 'OpenSans-SemiBold',
    },
    light: {
      fontFamily: 'OpenSans-Regular',
    },
    thin: {
      fontFamily: 'sans-serif-Light',
    },
    bold: {
      fontFamily: 'OpenSans-Bold',
    },
    labelLarge: {
      fontFamily: 'OpenSans-Bold',
    },
  },
  android: {
    regular: {
      fontFamily: 'OpenSans-Medium',
    },
    medium: {
      fontFamily: 'OpenSans-SemiBold',
    },
    light: {
      fontFamily: 'OpenSans-Regular',
    },
    thin: {
      fontFamily: 'sans-serif-Light',
    },
    bold: {
      fontFamily: 'OpenSans-Bold',
    },
    labelLarge: {
      fontFamily: 'OpenSans-Bold',
    },
  },
};

// Font constants
const FONT_THIN = 'sans-serif-Light';
const FONT_LIGHT = 'OpenSans-Regular';
const FONT_REGULAR = 'OpenSans-Medium';
const FONT_MEDIUM = 'OpenSans-SemiBold';
const FONT_BOLD = 'OpenSans-Bold';

const fonts = {
  ...NavigationDefaultTheme.fonts,
  // ...configureFonts({config: fontConfig, isV3: false}),
  FONT_THIN,
  FONT_LIGHT,
  FONT_REGULAR,
  FONT_MEDIUM,
  FONT_BOLD,
  bodyLarge: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  labelLarge: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
};

// Spacing constants
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius constants
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 999,
};

export const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#DD0A1D',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 218, 214)',
    onPrimaryContainer: 'rgb(65, 0, 2)',
    secondary: '#7A28FC',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 221, 177)',
    onSecondaryContainer: 'rgb(41, 24, 0)',
    tertiary: 'rgb(113, 91, 46)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(254, 223, 166)',
    onTertiaryContainer: 'rgb(38, 25, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    onBackground: 'rgb(32, 26, 25)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(32, 26, 25)',
    surfaceVariant: 'rgb(245, 221, 219)',
    onSurfaceVariant: 'rgb(83, 67, 65)',
    outline: 'rgb(133, 115, 113)',
    outlineVariant: 'rgb(216, 194, 191)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 46)',
    inverseOnSurface: 'rgb(251, 238, 236)',
    inversePrimary: 'rgb(255, 180, 172)',
    surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
    backdrop: 'rgba(59, 45, 44, 0.4)',
    info: 'rgba(27, 105, 253, 1)',
    background: {
      default: NavigationDefaultTheme.colors.background,
      primary: '#ffffff',
      secondary: '#7A28FC',
      gradient: {
        primary: {
          colors: ['rgba(232, 93, 4, 1)', 'rgba(250, 140, 70, 1)'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        },
      },
    },
    elevation: {
      level0: 'transparent',
      level1: 'rgb(252, 238, 243)',
      level2: 'rgb(250, 231, 236)',
      level3: 'rgb(248, 223, 229)',
      level4: 'rgb(247, 221, 227)',
      level5: 'rgb(246, 216, 222)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#D79A37',
      error: '#b83d3d',
      success: '#548d2c',
      textGrey: 'rgba(112, 112, 112, 1)',
      textPrimary: 'rgba(0,0,0,0.87)',
      textSecondary: 'rgba(0,0,0,0.60)',
      textDrakBlack: '#222',
      textDrakestBlack: '#181818',
    },
    input: {
      border: '#ffffff',
      errorBorder: '#ff0000',
      placeholder: '#ffffff',
      color: '#ffffff',
      background: '#7A28FC',
    },
    button: {
      primary: '#DD0A1D',
      secondary: '#D79A37',
    },
    border: {
      level0: 'rgba(196, 197, 200, 1)',
    },
  },
  fonts,
  spacing,
  borderRadius,
};

export const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    mainBg: 'transparent',
    headerBg: '#192332',
    headerShadow: '#000000',
    bottomNavigationBg: '#1E293B',
    bottomNavigationShadow: '#000000',
    card: '#192332',
    cardShadow: 'transparent',
    cardHeading: '#ffffff',
    cardTitle: '#E6E0E9',
    cardSubText: '#B4AFB9',
    profileMenuText: '#ffffff',
    title: '#258370',
    activeIcon: '#258370',
    inactiveIcon: '#989DB9',
    inputLabelText: '#E6E0E9',
    inputTextColor: '#E6E0E9',
    inputIconColor: '#078484',
    inputBackgroundColor: '#ffffff',
    placeholderText: '#B4AFB9',
    formButtonText: '#ffffff',
    formButtonBackground: '#078484',
    imageShadow: 'transparent',
    primaryText: '#0059C8',
    loaderColor: '#ffffff',
    danger: '#ff6347',
    success: '#32cd32',
    warning: '#ffc125',
    info: '#1e90ff',
    primary: '#1C826D',
    secondary: '#D79A37',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 218, 214)',
    onPrimaryContainer: 'rgb(65, 0, 2)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 221, 177)',
    onSecondaryContainer: 'rgb(41, 24, 0)',
    tertiary: 'rgb(113, 91, 46)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(254, 223, 166)',
    onTertiaryContainer: 'rgb(38, 25, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    onBackground: 'rgb(231, 225, 229)',
    surface: 'rgb(29, 27, 30)',
    onSurface: 'rgb(231, 225, 229)',
    surfaceVariant: 'rgb(74, 69, 78)',
    onSurfaceVariant: 'rgb(204, 196, 206)',
    outline: 'rgb(150, 142, 152)',
    outlineVariant: 'rgb(74, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(231, 225, 229)',
    inverseOnSurface: 'rgb(50, 47, 51)',
    inversePrimary: 'rgb(120, 69, 172)',
    surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    background: {
      default: NavigationDarkTheme.colors.background,
      primary: '#ffffff',
      gradient: {
        primary: {
          colors: ['rgba(28, 130, 109, 1)', 'rgba(40, 178, 151, 1)'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        },
      },
    },
    elevation: {
      level0: 'transparent',
      level1: 'rgb(39, 35, 41)',
      level2: 'rgb(44, 40, 48)',
      level3: 'rgb(50, 44, 55)',
      level4: 'rgb(52, 46, 57)',
      level5: 'rgb(56, 49, 62)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#D79A37',
      error: '#b83d3d',
      success: '#548d2c',
      textPrimary: 'rgba(255, 255, 255, 0.87)',
      textSecondary: 'rgba(255, 255, 255, 0.60)',
      textGrey: 'rgba(200, 200, 200, 1)',
      textDrakBlack: '#eee',
      textDrakestBlack: '#f5f5f5',
    },
    input: {
      border: '#ffffff',
      errorBorder: '#ff0000',
      placeholder: '#ffffff',
      color: '#ffffff',
      background: '#7A28FC',
    },
    button: {
      primary: '#DD0A1D',
      secondary: '#D79A37',
    },
    border: {
      level0: 'rgba(150, 150, 150, 1)',
    },
  },
  fonts,
  spacing,
  borderRadius,
};

export const theme = CombinedDefaultTheme;
export const darkTheme = CombinedDarkTheme;
