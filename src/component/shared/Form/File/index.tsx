import React, {useEffect, useMemo, useState} from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {
  FilePreviewWrapper,
  FilePreview,
  AddFileButton,
  FileInputWrapper,
} from './style';
import Spinner from '../../Spinner';
import {useThemeContext} from '../../../../context/ThemeContext';
import {FormInput, FormInputIcon} from '../style';
import {fetchImage, uploadImage} from '../../../../api';
import {API_URL, APP_URL} from '@env';

interface FileInputProps {
  value?: string;
  onChange: (value: string, event: any) => void;
  placeholder?: string;
  error?: boolean;
}

const FileInput: React.FC<FileInputProps> = (props: any) => {
  const {theme} = useThemeContext();
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleChoosePhoto = () => {
    const options: any = {
      mediaType: 'photo' as MediaType,
      maxWidth: 512,
      maxHeight: 512,
      quality: 1,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, async (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const file = response.assets[0];
        const obj = {
          uri: file.uri,
          type: file.type || 'image/jpeg',
          name: file.fileName || 'image.jpg',
        };
        setLoading(true);
        try {
          const data: any = await uploadImage(obj);
          props.onChange(data[0].id, null);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    });
  };

  const fetchImageById = async () => {
    if (props.value) {
      const data: any = await fetchImage(props.value);
      setImageUrl(`${APP_URL}${data.url}`);
    } else {
      setImageUrl('');
    }
  };

  useEffect(() => {
    fetchImageById();
  }, [props.value]);

  return (
    <>
      {/* {imageUrl && (
        <FilePreviewWrapper
          onPress={handleChoosePhoto}
          style={{
            borderColor: theme.colors.inputBorderColor,
          }}>
          <FilePreview src={imageUrl}>
            {loading && <Spinner color="primary" size="large" />}
          </FilePreview>
        </FilePreviewWrapper>
      )} */}

      <FileInputWrapper>
        <FormInput
          style={{
            backgroundColor: theme.colors.inputBackgroundColor,
            borderColor: props.error
              ? theme.colors.inputErrorBorderColor
              : theme.colors.inputBorderColor,
            borderWidth: 1,
            borderRadius: 8,
            overflow: 'hidden',
          }}
          placeholderTextColor={
            props.value
              ? theme.colors.inputTextColor
              : theme.colors.placeholderText
          }
          disabled
          placeholder={props.placeholder}
          value={imageUrl}
        />
        <FormInputIcon>
          {loading ? (
            <Spinner color="primary" size="small" />
          ) : (
            <AddFileButton
              style={{backgroundColor: theme.colors.card}}
              onPress={handleChoosePhoto}>
              Add File
            </AddFileButton>
          )}
        </FormInputIcon>
      </FileInputWrapper>
    </>
  );
};

export default FileInput;
