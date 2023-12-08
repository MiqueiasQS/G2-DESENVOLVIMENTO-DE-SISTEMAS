
import { Dimensions, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import styled from "styled-components"

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #45237F;
  padding: 15% 3% 0;
`;

export const ViewAbsolute = styled(BlurView).attrs({
  style: StyleSheet.absoluteFill,
  blurType: "light",
  blurAmount: 10,
})`
  z-index: 99999;
  position: absolute;
  top: 0;
  padding: 15% 3% 0;
  width: ${width}px;
`;

export const ViewTop = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  flex: 1;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: #ff69b4;
  padding: 10px;
  border-radius: 8px;
`;

export const TouchableOpacityText = styled.Text`
  color: #C8F7FE; /* Cor branca */
  font-size: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  margin-right: 8px;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  padding: 0 10px;
  color: #ffffff; /* Cor verde */
  background-color: #644F89;
`;