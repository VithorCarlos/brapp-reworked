import React from 'react';
import { TextSemiBold } from '../TextHeading';
import { theme } from '../../global/styles/theme';
import { BreadcrumbProps, Container } from './styles';
import { IVehicle } from '../../hooks/context';

export interface IParams extends BreadcrumbProps{
  vehicle?: IVehicle;
  titleBreadcrumb: string;
  vehicleBreadcrumb?: string;
  brandBreadcrumb?: string;
  modelBreadcrumb?: string;
  yearBreadcrumb?: string;
}

export function Breadcrumb({ 
   titleBreadcrumb, 
   vehicleBreadcrumb,  
   brandBreadcrumb,
   modelBreadcrumb,
   yearBreadcrumb,
  ...rest}: IParams

   ){ 
  return (
    <Container {...rest}>
        <TextSemiBold fontSize={16} color={theme.colors.heading_light}>
            {titleBreadcrumb ? titleBreadcrumb + '>' : ''} 
            {vehicleBreadcrumb ? vehicleBreadcrumb + '>' : ''} 
            {brandBreadcrumb ? brandBreadcrumb + '>' : ''} 
            {modelBreadcrumb ? modelBreadcrumb + '>' : ''}
            {yearBreadcrumb}
        </TextSemiBold>
    </Container>
  );
}