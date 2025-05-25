import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Switch } from 'react-native-paper';
import { useThemeContext } from '@/context/ThemeContext';
import Typography from '@/component/shared/Typography';
import { navigate } from '@/navigation/NavigationService';

const CustomHeader = (props: any) => {
  const { defaultValue = true } = props
  const { theme } = useThemeContext()
  const currentKid = useSelector((state: RootState) => state.app.currentKid);

  const childName = currentKid ? `${currentKid.firstName ?? ""} ${currentKid.lastName ?? ""}`.trim() : "";

  const handleToggle = () => {
    navigate("Passcode", { kid: currentKid })
  }

  return (
    <>
      <Switch
        value={defaultValue}
        style={{ marginRight: 8 }}
        onChange={handleToggle}
        theme={theme}
      />
      <Typography variant="h2" weight={600} color={theme.colors.text.textPrimary}>{childName}</Typography>
    </>
  )
}

export default CustomHeader