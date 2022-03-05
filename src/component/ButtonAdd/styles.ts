import { View } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../global/styles/theme';

interface Props {
    toggle?: boolean;
}

const { primary, secondary } = theme.colors;

export const Content = styled(View)`
    background-color: ${(props: Props) => props.toggle ? primary : secondary};
    border-width: 2px;
    border-color: ${(props: Props) => props.toggle ? secondary : 'transparent'};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    height: 46px;
    padding-horizontal: 20px;
    
    margin-bottom: 14px;
`;

