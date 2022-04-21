import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components";
import { widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";

const { heading_light } = theme.colors;

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const Footer = styled(View)`
  margin-top: ${widthPercentageToDP(5)}px;

  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(View)`
  background-color: ${heading_light};
  margin-horizontal: ${widthPercentageToDP(6)}px;
  padding-horizontal: ${widthPercentageToDP(4)}px;
  padding-vertical: ${widthPercentageToDP(4)}px;
  border-radius: ${widthPercentageToDP(3)}px;
`;
