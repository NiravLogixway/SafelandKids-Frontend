import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../config/theme';
import {Appearance} from 'react-native';

const ThemeCustomizationContext = createContext({
  theme: CombinedDefaultTheme as any,
  toggleTheme: () => {},
  isThemeDark: false,
});

const ThemeContext = ({children}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    setIsThemeDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = useCallback(
    () => setIsThemeDark(!isThemeDark),
    [isThemeDark],
  );

  return (
    <ThemeCustomizationContext.Provider
      value={{toggleTheme, theme, isThemeDark}}>
      {children}
    </ThemeCustomizationContext.Provider>
  );
};

export default ThemeContext;

export const useThemeContext = () => useContext(ThemeCustomizationContext);
