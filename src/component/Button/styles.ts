import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../global/styles/theme';

interface Props {
    backgroundColor: string;
    disabled?: boolean;
}

const {  primary_disabled, secondary } = theme.colors;

export const ButtonAction = styled(TouchableOpacity)`
    background-color: ${(props: Props) => props.disabled ? primary_disabled : props.backgroundColor};
    opacity: ${(props: Props) => props.disabled ? 0.5 : 1};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    border-width: 2px;
    border-color: ${secondary};
    border-radius: 10px;
    padding-horizontal: 20px;
    height: 45px;
    justify-content: center;
    align-items: center;
`;