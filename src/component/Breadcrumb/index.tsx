import React from "react";
import { TextSemiBold } from "../TextHeading";
import { theme } from "../../global/styles/theme";
import { BreadcrumbProps, Container } from "./styles";
import { IVehicle } from "../../hooks/vehicleContext";
import { width } from "../../global/styles/responsive";

export interface IParams extends BreadcrumbProps {
  titleBreadcrumb: string;
  categoryBreadcrumb?: string;
  brandBreadcrumb?: string;
  modelBreadcrumb?: string;
  yearBreadcrumb?: string;
}

export function Breadcrumb({
  titleBreadcrumb,
  categoryBreadcrumb,
  brandBreadcrumb,
  modelBreadcrumb,
  yearBreadcrumb,
  ...rest
}: IParams) {
  return (
    <Container {...rest}>
      <TextSemiBold fontSize={width * 0.042} color={theme.colors.heading_light}>
        {titleBreadcrumb ? titleBreadcrumb + ">" : ""}
        {categoryBreadcrumb ? categoryBreadcrumb + ">" : ""}
        {brandBreadcrumb ? brandBreadcrumb + ">" : ""}
        {modelBreadcrumb ? modelBreadcrumb + ">" : ""}
        {yearBreadcrumb}
      </TextSemiBold>
    </Container>
  );
}
