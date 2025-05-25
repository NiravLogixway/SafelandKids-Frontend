import styled from 'styled-components/native';
import Box from '@/component/shared/Box';
import Button from '@/component/shared/Button';

export const PasscodeContainer = styled(Box)(({theme}) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const FormContainer = styled(Box)(({theme}) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px',
  background: 'transparent',
}));

export const PasscodeBox = styled(Box)(({theme}) => ({
  background: '#7b3ff2',
  borderRadius: 24,
  padding: '32px 20px 24px 20px',
  alignItems: 'center',
  width: '100%',
  maxWidth: 340,
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 16,
  shadowOffset: '0px 4px',
}));

export const StyledButton = styled(Button)(({theme}) => ({
  width: '100%',
  marginTop: 12,
  borderRadius: 12,
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
}));
