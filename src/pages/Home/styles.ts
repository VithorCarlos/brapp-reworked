import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { theme } from '../../global/styles/theme';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components';
import { width, height } from '../../global/styles/responsive';
import { useEffect } from 'react';

const { primary, secondary } = theme.colors;

interface Props {
    isLandscape: boolean
}

export const Container = styled(SafeAreaView)`
    flex: 1;
`;

export const Content = styled(View)`
    flex: 1;
    margin-top: ${getStatusBarHeight() + 40}px;
    margin-horizontal: ${width / 20}px;
    justify-content: ${(prop: Props) => prop.isLandscape ? 'center' : 'flex-start'};
    align-items: ${(prop: Props) => prop.isLandscape ? 'center': 'flex-start'};
`;

export const ImageContent = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10%;
`

export const Footer = styled(View)`
    flex: 1;
    margin-bottom: ${getBottomSpace() + 25}px;
    justify-content: flex-end;
    align-items: center;
`;

export const Description = styled(View)`
    margin-top: 26px;
`;

export const ActionButton = styled(TouchableOpacity)`
    background-color: ${primary};
    justify-content: center;
    align-items: center;
    height: 45px;
    padding-horizontal: ${width / 15}px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${secondary};
`;


