import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {FormInput, FormInputWrapper, FormOutlineButton} from '../style';

export const FormWrapper = styled.View``;

export const FilePreviewWrapper = styled.TouchableOpacity.attrs({})`
  width: 100%;
  height: 150px;
  max-height: 150px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const FilePreview = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  aspect-ratio: 1/1;
  flex: 1;
`;

export const FileInputWrapper = styled(FormInputWrapper).attrs({})`
  height: 46px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const CamIcon = styled.View`
  width: 50px;
  width: 50px;
`;

export const AddFileButton = styled(FormOutlineButton).attrs({
  style: {
    padding: 0,
    marginVertical: 'auto',
    marginHorizontal: 16
  },
  labelStyle: {
    marginVertical: 0,
    fontSize: 12,
  },
})`
  margin-bottom: 0;
  height: 30px;
  align-content: center;
  margin-left: 16px
`;

export const fileInputStyle = StyleSheet.create({});
