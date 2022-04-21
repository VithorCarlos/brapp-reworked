import { View } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP } from "../../global/styles/responsive";

export const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #f2f2f2;
  border-radius: ${widthPercentageToDP(3)}px;
  padding-left: ${widthPercentageToDP(11)}px;
`;
