import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useThemeContext } from '../../../context/ThemeContext';
import { MenuContainer, MenuItem } from './style';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';

interface options {
  label: string;
  value: string;
  id: number;
}

interface IMenuProps {
  menuItems?: options[];
  onPress?: (item: any, index?: number) => void;
  customMenu?: () => ReactNode;
  customMenuItem?: (item: any, index: number) => ReactNode;
  customToggle?: () => ReactNode;
  anchorPosition?: 'top' | 'bottom';
  icon?: object
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
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    return () => setVisible(false);
  }, []);

  return (
    <MenuContainer
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
              <Icon source={'dots-vertical'} size={18} color={theme.colors.text.primary} {...props.icon} />
            )}
          </View>
        </TouchableWithoutFeedback>
      }
      contentStyle={{
        backgroundColor: "#ffffff",
        shadowColor: theme.colors.backdrop,
        shadowRadius: 5,
        shadowOpacity: 1,
        borderRadius: 8,
        marginTop: 10,
      }}
      anchorPosition={props.anchorPosition}
      {...props}>
      {menuItems && menuItems.length
        ? menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setVisible(false);
              onPress && onPress(item, index);
            }}
            style={{
              backgroundColor: theme.colors.background.surface,
            }}>
            <MenuItem
              title={customMenuItem ? customMenuItem(item, index) : item.label}
              style={{
                paddingHorizontal: 16,
                paddingVertical: Platform.OS === 'ios' ? 10 : 15,
                height: 'auto',
                backgroundColor: 'transparent',
              }}
              titleStyle={{
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
        ))
        : customMenu && customMenu()}
    </MenuContainer>
  );
};

export default Menu;
