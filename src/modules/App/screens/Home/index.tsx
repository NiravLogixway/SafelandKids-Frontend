import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Switch } from 'react-native-paper';
import Menu from '@/component/shared/Menu';
import Typography from '@/component/shared/Typography';
import { HomeContainer, KidCardWrapper, GradientBackground, AddKidButton } from './styles';
import { TouchableOpacity, FlatList, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '@/context/ThemeContext';
import Stack from '@/component/shared/Stack';
import { navigate, navigateToNestedScreen } from '@/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../store/appActions';
import { RootState } from '@/store';
import { Kid } from '../../store/appTypes';
import { setItem } from '@/utils/localstorage';
import toast from '@/utils/toast';
import Empty from '@/component/app/Empty';
import Spinner from '@/component/shared/Spinner';

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
  const [loading, setLoading] = useState(false);

  const getKids = async () => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      dispatch(appActions.getKids(resolve, reject));
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getKids();
  }, [dispatch]);

  const handleToggle = (kid: Kid) => {
    if (kid && kid.playlists && kid.playlists.length > 0) {
      setItem('CURRENT_KID', JSON.stringify(kid));
      dispatch(appActions.setCurrentKid(kid));
      navigate('ChildVideoPlaylist', { kid });
    } else {
      toast.info('No videos found for this kid. Please add at least one video to get started.');
    }
  };

  const handleMenuPress = async (item: any, kid: Kid) => {
    if (item.value === 'edit') {
      navigateToNestedScreen('Child', 'ChildForm', { mode: 'edit', kid });
    } else if (item.value === 'delete') {
      await new Promise((resolve, reject) => {
        dispatch(appActions.deleteKid(kid, resolve, reject))
      })
    }
    setMenuVisible(null);
  };

  const handleRedirectToAddKid = () => {
    navigateToNestedScreen('Child', 'ChildForm', { mode: 'add' });
  };

  const redirectOnChildPlaylists = (item: Kid) => {
    navigate('ChildPlaylist', { kid: item });
  }

  const renderKidItem = ({ item }: { item: Kid }) => (
    <KidCardWrapper
      key={item.id}
      onPress={() => {
        redirectOnChildPlaylists(item);
      }}
    >
      <Stack direction="row" align="center">
        <Pressable
          onPress={(e) => {
            if (item.id) handleToggle(item);
          }}
        >
          <Switch
            value={item.id === currentKid?.id}
            onChange={() => {
              if (item.id) handleToggle(item);
            }}
            style={{ marginRight: 16 }}
            trackColor={{
              true: theme.colors.inverseOnSurface,
              false: theme.colors.inverseOnSurface,
            }}
            color={theme.colors.secondary}
            thumbColor={theme.colors.onPrimary}
            ios_backgroundColor={theme.colors.inverseOnSurface}
          />
        </Pressable>
        <Typography variant="body1" weight={500} color={theme.colors.text.primary}>{item.firstName} {item.lastName}</Typography>
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
          {loading ? <Spinner size="small" color={theme.colors.text.primary} /> :
            kids.length === 0 ? (
              <Stack align="center" justify="center" style={{ flex: 1 }}>
                <Empty
                  title="Add Your Kids to Get Started"
                  icon={<MaterialIcons name="child-care" size={80} color={theme.colors.text.primary} />}
                />
              </Stack>
            ) : (
              <FlatList
                data={kids}
                renderItem={renderKidItem}
                keyExtractor={item => item.id?.toString() ?? ''}
                contentContainerStyle={{ paddingBottom: theme.spacing.sm }}
                showsVerticalScrollIndicator={false}
              />
            )}
        </View>
        <AddKidButton>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}
            onPress={handleRedirectToAddKid}
          >
            <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
              <Icon name="add" size={24} color={theme.colors.text.primary} />
            </GradientBackground>
            <Typography variant="body1" weight={600} color={theme.colors.text.primary}>Add Kid(s)</Typography>
          </TouchableOpacity>
        </AddKidButton>
      </HomeContainer>
    </AppLayout>
  );
};

export default Home;