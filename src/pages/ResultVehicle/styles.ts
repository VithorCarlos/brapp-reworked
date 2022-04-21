import { TouchableOpacity, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";
import { width, widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";

export const Container = styled(View)`
  flex: 1;
  margin-horizontal: ${widthPercentageToDP(5)}px;
`;
const { primary, secondary } = theme.colors;

export const Content = styled(View)`
  flex: 1;
`;
export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const ResultContent = styled(View)`
  border-radius: ${width * 0.03}px;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${secondary};
  padding-vertical: ${widthPercentageToDP(2)}px;
  padding-horizontal: ${widthPercentageToDP(6)}px;
`;

export const Fipe = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: row;
`;

export const Teste = styled(View)`
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
`;

export const Hr = styled(View)`
  margin-vertical: ${width * 0.025}px;
  height: 1px;
  background-color: #36b5fd;
  opacity: 0.4;
  margin-horizontal: ${width * 0.035}px;
`;

export const Footer = styled(View)`
  margin-top: ${width * 0.015}%;
  margin-horizontal: ${width / 100}%;
  margin-bottom: ${getBottomSpace() + 25}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GoogleSearchContent = styled(View)`
  background-color: ${primary};
  border-width: 2px;
  width: ${widthPercentageToDP(90)}px;
  padding: ${widthPercentageToDP(3)}px;
  margin-bottom: ${widthPercentageToDP(5)}px;
  border-color: ${secondary};
  border-radius: ${width * 0.03}px;
  justify-content: center;
  align-items: center;
`;
