import React, { useState } from 'react';
import { Drawer as DrawerContainer } from 'react-native-paper';

const MenuItem = ({ item, index, active, ...props }: any) => {
  return (
    <DrawerContainer.Item
      key={index}
      label={item.label}
      active={active}
      onPress={() => props.onPress(item)}
    />
  );
};

function Drawer({ navigation, menus, ...props }: any) {
  const [active, setActive] = useState(0);

  const onPress = (nav: any, index: number) => {
    if (nav.route !== '') {
      navigation.navigate(nav.route);
    }
    setActive(index);
  };

  return (
    <DrawerContainer.Section title="Some title" {...props}>
      {menus.map((item: any, index: number) => (
        <MenuItem
          key={index}
          item={item}
          index={index}
          active={active === index}
          onPress={(i: any) => onPress(i, index)}
        />
      ))}
    </DrawerContainer.Section>
  );
}

Drawer.propTypes = {};

Drawer.defaultProps = {
  menus: [],
};

export default Drawer;
