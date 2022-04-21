import { View } from "react-native";
import styled from "styled-components";
import { width, widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";

interface Props {
  toggle?: boolean;
}

const { secondary, secondary_selected } = theme.colors;

export const Content = styled(View)`
  background-color: ${(props: Props) =>
    props.toggle ? secondary_selected : secondary};
  border-width: 2px;
  border-color: ${(props: Props) => (props.toggle ? secondary : "transparent")};
  border-radius: ${widthPercentageToDP(3)}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${widthPercentageToDP(3)}px;
  padding-vertical: ${widthPercentageToDP(3)}px;
  margin-bottom: ${widthPercentageToDP(3.5)}px;
`;
