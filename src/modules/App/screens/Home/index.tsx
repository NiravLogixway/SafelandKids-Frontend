import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Switch, Text } from 'react-native-paper';
import Card from '@/component/app/Card';
import Menu from '@/component/shared/Menu';
import Typography from '@/component/shared/Typography';
import { HomeContainer, KidCardWrapper, GradientBackground, AddKidButton } from './styles';
import { TouchableOpacity, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '@/context/ThemeContext';
import Stack from '@/component/shared/Stack';
import { navigate } from '@/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../store/appActions';
import { RootState } from '@/store';
import { Kid } from '../../store/appTypes';

const menuItems = [
  { label: 'Edit', value: 'edit', id: 1 },
  { label: 'Delete', value: 'delete', id: 2 },
];

const Home = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const kids = useSelector((state: RootState) => state.app.kids);
  const currentKid = useSelector((state: RootState) => state.app.currentKid);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);

  console.log(currentKid, 'currentKid');

  useEffect(() => {
    dispatch(appActions.getKids());
  }, [dispatch]);

  const handleToggle = async (kid: Kid) => {
    console.log("called", kid)
    if (kid) {
      dispatch(appActions.setCurrentKid(kid));
    }
  };

  const handleMenuPress = (item: any, kid: Kid) => {
    if (item.value === 'edit') {
      navigate('Child', { screen: 'ChildForm', params: { mode: 'edit', kid } });
    }
    setMenuVisible(null);
  };

  const handleRedirectToAddKid = () => {
    navigate('Child', { screen: 'ChildForm', params: { mode: 'add' } });
  };

  const redirectOnChildPlaylists = (item: Kid) => {
    navigate('Child', { screen: 'ChildPlaylist', params: { kid: item } });
  }

  const renderKidItem = ({ item }: { item: Kid }) => (
    <KidCardWrapper
      key={item.id}
      onPress={() => {
        redirectOnChildPlaylists(item);
      }}
    >
      <Stack direction="row" align="center">
        <Switch
          value={item.id === currentKid?.id}
          onValueChange={() => {
            if (item.id) handleToggle(item);
          }}
          style={{ marginRight: 16 }}
        />
        <Typography variant="body1" weight={500}>{item.firstName} {item.lastName}</Typography>
      </Stack>
      <Menu
        menuItems={menuItems}
        onPress={(menuItem) => {
          if (item.id) handleMenuPress(menuItem, item);
        }}
        anchorPosition="bottom"
      />
    </KidCardWrapper>
  );

  return (
    <AppLayout title="Home">
      <HomeContainer>
        <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl }}>
          <FlatList
            data={kids}
            renderItem={renderKidItem}
            keyExtractor={item => item.id?.toString() ?? ''}
            contentContainerStyle={{ paddingBottom: theme.spacing.sm }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AddKidButton>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}
            onPress={handleRedirectToAddKid}
          >
            <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
              <Icon name="add" size={24} color={theme.colors.text.primary} />
            </GradientBackground>
            <Typography variant="body1" weight={500}>Add Kid(s)</Typography>
          </TouchableOpacity>
        </AddKidButton>
      </HomeContainer>
    </AppLayout>
  );
};

export default Home;