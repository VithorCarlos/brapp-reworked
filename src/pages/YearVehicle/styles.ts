import { View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";
import { width, height } from '../../global/styles/responsive';

export const VehicleYear = styled(View)`
  margin-top: 10%;
  margin-horizontal: ${width / 30}px;
`;

export const Footer = styled(View)`
  margin-horizontal: ${width / 100}%;
  margin-top: 5%;
  margin-bottom: ${getBottomSpace() + 25}px;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  
`;