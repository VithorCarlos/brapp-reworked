import { View } from "react-native";
import { theme } from "../../global/styles/theme";
import styled from "styled-components";
import { width, widthPercentageToDP } from "../../global/styles/responsive";
interface Props {
  toggle?: boolean;
}

const { secondary, secondary_selected } = theme.colors;

export const Content = styled(View)`
  background-color: ${(props: Props) =>
    props.toggle ? secondary_selected : secondary};
  border-radius: ${widthPercentageToDP(3)}px;
  border-width: 2px;
  border-color: ${(props: Props) => (props.toggle ? secondary : "transparent")};
  align-items: center;
  justify-content: center;
  align-content: center;
  width: ${widthPercentageToDP(34)}px;
  padding-vertical: ${widthPercentageToDP(4)}px;
  padding-horizontal: ${widthPercentageToDP(2)}px;
  margin-right: ${width * 0.043}px;
`;

export const Spacer = styled(View)`
  margin-vertical: ${widthPercentageToDP(0.6)}px;
`;
