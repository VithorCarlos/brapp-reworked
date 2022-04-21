import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import SearchSvg from "../../assets/images/search.svg";
import { theme } from "../../global/styles/theme";
import { IVehicle } from "../../hooks/vehicleContext";
import { Container, Hr } from "./styles";
import FontSize, {
  width,
  height,
  widthPercentageToDP,
} from "../../global/styles/responsive";

interface Props extends TextInputProps {
  title: string;
  text: string;
  data: Array<IVehicle>;
}

export function SearchBar({ title, text, ...rest }: Props) {
  return (
    <Container>
      <View style={{ position: "absolute", left: 10 }}>
        <SearchSvg width={width * 0.08} height={width * 0.08} />
      </View>

      <TextInput
        style={{
          height: widthPercentageToDP(13),
          width: widthPercentageToDP(80),
          fontFamily: theme.fonts.title400,
          fontSize: FontSize(14),
        }}
        {...rest}
        placeholder={title}
        color={theme.colors.inputColor}
      ></TextInput>
    </Container>
  );
}
