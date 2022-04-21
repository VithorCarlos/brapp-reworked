import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";

interface Props {
  backgroundColor: string;
  disabled?: boolean;
  borderNone?: boolean;
}

const { primary_disabled, secondary } = theme.colors;

export const ButtonAction = styled(TouchableOpacity)`
  background-color: ${(props: Props) =>
    props.disabled ? primary_disabled : props.backgroundColor};
  opacity: ${(props: Props) => (props.disabled ? 0.5 : 1)};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-width: ${(props: Props) => (props.borderNone ? 0 : 2)}px;
  border-color: ${secondary};
  border-radius: ${widthPercentageToDP(2.5)}px;
  padding-horizontal: ${widthPercentageToDP(5)}px;
  height: ${widthPercentageToDP(13)}px;
  justify-content: center;
  align-items: center;
`;
