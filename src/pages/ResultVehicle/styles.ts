import { TouchableOpacity, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";
import { theme } from "../../global/styles/theme";

export const Container = styled(View)`
    flex: 1;
    margin-horizontal: 25px;
    
`;
const { primary, secondary, heading} = theme.colors;

export const Content = styled(View)`
    flex: 1;
`;

export const ResultContent = styled(View)`
    border-radius: 10px;
    align-content: center; 
    justify-content: center;
    background-color: ${secondary};
    padding-vertical: 8px;
    padding-horizontal: 20px;
`;

export const Fipe = styled(TouchableOpacity)`
    justify-content: center;
    flex-direction: row;
`;

export const Hr = styled(View)`
    margin-vertical: 10px;
    height: 1px;
    background-color: #36B5FD;
    opacity: 0.40;
    margin-horizontal: 25px;
`;

export const Footer = styled(View)`
    margin-bottom: ${getBottomSpace() + 25}px;
    margin-top: 18px;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    justify-content: flex-end;
`;