import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
// import randomColor from 'randomcolor';
import { useSelector } from 'react-redux';

interface AvatarProps {
  image?: string;
  size?: number;
  name: string;
  letters?: string;
  onPress?: () => void;
}

const StyledImage = styled.Image`  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.width}px;
`;

const StyledAvatar = styled.View<{ size: number; backgroundColor: string }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text<{ size: number; color: string }>`
  font-size: ${(props) => props.size / 2}px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const Avatar: React.FC<AvatarProps> = ({ image, size = 36, name, letters, onPress }) => {
  const branch = useSelector((state: any) => state.auth?.branch);
  const initials = useMemo(() => {
    const names = name.split(' ');
    return letters?.length === 2
      ? letters
      : `${names[0][0]}${names[names.length - 1][0] || ''}`.toUpperCase();
  }, [name]);

  const backgroundColor = useMemo(() => {
    // const color = randomColor({luminosity: 'dark', seed: name});
    return '#000';
  }, [name]);


  return (
    <TouchableOpacity onPress={onPress}>
      {image ? (
        <StyledAvatar size={size} backgroundColor={backgroundColor}>
          <StyledImage width={size} height={size} source={{ uri: `${branch}/${image}` }} />
        </StyledAvatar>
      ) : (
        <StyledAvatar size={size} backgroundColor={backgroundColor}>
          <StyledText size={size * 0.84} color="white">
            {initials}
          </StyledText>
        </StyledAvatar>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

