import { View } from 'react-native';
import { theme } from '../../global/styles/theme';
import styled from 'styled-components';
interface Props {
    toggle?: boolean;
}

const { primary ,secondary } = theme.colors;

export const Content = styled(View)`
    background-color: ${(props: Props) => props.toggle ? primary : secondary};;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${(props: Props) => props.toggle ? secondary : 'transparent'};
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 100px;
    margin-right: 20px;
    max-width: 110px
`;
