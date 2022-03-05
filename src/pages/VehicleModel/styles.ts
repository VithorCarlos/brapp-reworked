import { View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { width, height } from '../../global/styles/responsive';
import styled from "styled-components";

export const ModelVehicle = styled(View)`
    margin-top: 20px;
`;

export const Footer = styled(View)`
  margin-top: 5%;
  margin-horizontal: ${width / 100}%;
  margin-bottom: ${getBottomSpace() + 25}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;