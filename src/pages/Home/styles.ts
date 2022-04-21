import { TouchableOpacity, View } from "react-native";
import { theme } from "../../global/styles/theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";
import { widthPercentageToDP } from "../../global/styles/responsive";

const { primary, secondary } = theme.colors;

export const Container = styled(View)`
  flex: 1;
  margin-horizontal: ${widthPercentageToDP(5)}px;
  flex-wrap: nowrap;
  flex-basis: auto;
`;

export const ImageContent = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const Description = styled(View)`
  margin-top: ${widthPercentageToDP(7)}px;
`;

export const Footer = styled(View)`
  margin-bottom: ${getBottomSpace() + 30}px;
  align-items: center;
  justify-content: flex-end;
`;

export const ActionButton = styled(TouchableOpacity)`
  background-color: ${primary};
  justify-content: center;
  align-items: center;
  height: ${widthPercentageToDP(13)}px;
  padding-horizontal: ${widthPercentageToDP(5)}px;
  border-radius: ${widthPercentageToDP(3)}px;
  border-width: 1px;
  border-color: ${secondary};
`;
