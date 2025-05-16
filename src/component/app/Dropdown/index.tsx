import React, { useState } from 'react';
import { Menu, Button, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';

const DropdownContainer = styled.View`
  margin: 10px;
`;

interface OptionProp {
  label: string;
  value: string;
}

interface DropdownProps {
  options: OptionProp[];
  title: string;
  icon?: any;
  onChange?: (option: OptionProp) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, title, icon, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<OptionProp | null>(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option: OptionProp) => {
    setSelected(option);
    onChange?.(option);
    closeMenu();
  };

  return (
    <DropdownContainer>
      <Button icon={icon} mode="contained" onPress={openMenu}>
        {selected ? selected.label : title}
      </Button>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon={icon} size={20} onPress={openMenu} />}>
        {options.map((option, index) => (
          <Menu.Item key={index} onPress={() => handleSelect(option)} title={option.label} />
        ))}
      </Menu>
    </DropdownContainer>
  );
};

export default Dropdown;
