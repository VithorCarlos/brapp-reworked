import { View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { width, widthPercentageToDP } from "../../global/styles/responsive";
import styled from "styled-components";

export const VehicleBrand = styled(View)`
  margin-top: 10%;
  margin-horizontal: ${width / 30}px;
`;

export const Footer = styled(View)`
  margin-top: 5%;
  margin-bottom: ${getBottomSpace() + 25}px;
  align-items: center;
  justify-content: center;
  margin-horizontal: ${width / 100}%;
`;

export const ControllerText = styled(View)`
  margin-horizontal: ${widthPercentageToDP(5)}px;
`;
