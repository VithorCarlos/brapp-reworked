import React, { ReactNode } from "react";

import { TouchableOpacityProps, View } from "react-native";

import { ButtonAction } from "./styles";

interface Props extends TouchableOpacityProps {
  children: ReactNode;
  background: string;
  borderNone: boolean;
}

export function Button({ children, background, borderNone, ...rest }: Props) {
  return (
    <ButtonAction
      activeOpacity={0.7}
      backgroundColor={background}
      borderNone={borderNone}
      {...rest}
    >
      {children}
    </ButtonAction>
  );
}
