import { View } from 'react-native';
import  styled  from 'styled-components';
import { width, height } from '../../global/styles/responsive';

export const Container = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #f2f2f2;
    border-radius: 10px;
    padding-left: ${width / 7}px;
`;

export const Content = styled(View)`
    
`;

export const Hr = styled(View)`
    height: 100%;
    transform: rotate(0deg);
    margin-horizontal: 2px;
    opacity: 0.2;
    border-width: 0.5px;
    margin-horizontal: 3%;
    background-color: #848484;
`;