import { View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components";
import { widthPercentageToDP } from "../../global/styles/responsive";

export interface BreadcrumbProps {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

export const Container = styled(View)`
  margin-top: ${(props: BreadcrumbProps) =>
    props.marginTop || getStatusBarHeight() + widthPercentageToDP(5)}px;
  margin-left: ${(props: BreadcrumbProps) =>
    props.marginLeft || widthPercentageToDP(5)}px;
  margin-right: ${(props: BreadcrumbProps) =>
    props.marginRight || widthPercentageToDP(5)}px;
  margin-bottom: ${(props: BreadcrumbProps) =>
    props.marginBottom || widthPercentageToDP(8)}px;
`;
