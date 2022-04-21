import React, { ReactNode } from "react";
import { TextProps } from "react-native";
import {
  TextBoldCss,
  TextSemiBoldCss,
  TextRegularCss,
  TextLightCss,
} from "./styles";

interface Props extends TextProps {
  children: ReactNode;
  color?: string;
  fontSize: number;
  lineHeight?: number;
  outline?: boolean;
  textAlign?: string;
  marginBottom?: number;
  textShadow?: boolean;
}

export function TextBold({
  children,
  color,
  fontSize,
  lineHeight,
  outline,
  textAlign,
  marginBottom,
  textShadow,
  ...rest
}: Props) {
  return (
    <TextBoldCss
      color={color}
      fontSize={fontSize}
      outline={outline}
      textAlign={textAlign}
      marginBottom={marginBottom}
      style={{ lineHeight: lineHeight }}
      textShadow={textShadow}
      {...rest}
    >
      {children}
    </TextBoldCss>
  );
}

export function TextSemiBold({
  children,
  color,
  fontSize,
  lineHeight,
  outline,
  textAlign,
  marginBottom,
  textShadow,
  ...rest
}: Props) {
  return (
    <TextSemiBoldCss
      color={color}
      fontSize={fontSize}
      outline={outline}
      textAlign={textAlign}
      marginBottom={marginBottom}
      style={{ lineHeight: lineHeight }}
      textShadow={textShadow}
      {...rest}
    >
      {children}
    </TextSemiBoldCss>
  );
}

export function TextRegular({
  children,
  color,
  fontSize,
  lineHeight,
  outline,
  textAlign,
  marginBottom,
  textShadow,
  ...rest
}: Props) {
  return (
    <TextRegularCss
      color={color}
      fontSize={fontSize}
      outline={outline}
      textAlign={textAlign}
      marginBottom={marginBottom}
      style={{ lineHeight: lineHeight }}
      textShadow={textShadow}
      {...rest}
    >
      {children}
    </TextRegularCss>
  );
}

export function TextLight({
  children,
  color,
  fontSize,
  lineHeight,
  outline,
  textAlign,
  marginBottom,
  textShadow,
  ...rest
}: Props) {
  return (
    <TextLightCss
      color={color}
      fontSize={fontSize}
      outline={outline}
      textAlign={textAlign}
      marginBottom={marginBottom}
      style={{ lineHeight: lineHeight }}
      textShadow={textShadow}
      {...rest}
    >
      {children}
    </TextLightCss>
  );
}
