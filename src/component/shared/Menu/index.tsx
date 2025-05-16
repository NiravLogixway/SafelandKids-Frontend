import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import { useThemeContext } from '../../../context/ThemeContext';
import { MenuContainer, MenuItem } from './style';
import { GestureResponderEvent, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface options {
  label: string;
  value: string;
  id: number;
}

interface IMenuProps {
  menuItems?: options[];
  onPress?: (item: any, index?: number) => void;
  customMenu?: (ref: any) => ReactNode;
  customMenuItem?: (item: any, index: number) => ReactNode;
  customToggle?: () => ReactNode;
  anchorPosition?: string;
}

const Menu = ({
  menuItems,
  onPress,
  customMenu,
  customMenuItem,
  customToggle,
  ...props
}: IMenuProps) => {
  const { theme } = useThemeContext();
  const ref = useRef<any>({});

  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    return () => setVisible(false);
  }, []);

  return (
    <MenuContainer
      ref={ref}
      visible={visible}
      onDismiss={toggleMenu}
      anchor={
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View
            onStartShouldSetResponder={(event: any) => true}
            onTouchEnd={(e: any) => {
              e.stopPropagation();
            }}>
            {customToggle ? (
              customToggle()
            ) : (
              <Icon source={'dots-vertical'} size={18} color={theme.colors.formButtonBackground} />
            )}
          </View>
        </TouchableWithoutFeedback>
      }
      contentStyle={{
        backgroundColor: theme.colors.background.default,
        shadowColor: theme.colors.backdrop,
        shadowRadius: 5,
        shadowOpacity: 1,
        borderRadius: 8,
        marginTop: 10,
      }}
      {...props}>
      {menuItems && menuItems.length
        ? menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onPress={() => {
              setVisible(false);
              onPress && onPress(item, index);
            }}
            title={customMenuItem ? customMenuItem(item, index) : item.label}
            style={{
              paddingHorizontal: 16,
              paddingVertical: Platform.OS === 'ios' ? 10 : 15,
              height: 'auto',
            }}
            titleStyle={{
              color: theme.colors.text.textGrey,
              fontSize: 14,
            }}
          />
        ))
        : customMenu && customMenu(ref)}
    </MenuContainer>
  );
};

export default Menu;
