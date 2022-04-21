import React, { useState } from "react";
import { SvgProps } from "react-native-svg";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { TextBold } from "../TextHeading";
import { Content, Spacer } from "./styles";
import FontSize, {
  width,
  height,
  widthPercentageToDP,
} from "../../global/styles/responsive";
interface Props extends TouchableOpacityProps {
  title: string;
  icon: React.FC<SvgProps>;
  selected?: boolean;
}

export function Category({ title, icon: Icon, selected, ...rest }: Props) {
  return (
    <View>
      <TouchableOpacity {...rest}>
        <Content toggle={selected}>
          <Icon
            width={widthPercentageToDP(13)}
            height={widthPercentageToDP(10)}
          />
          <Spacer />
          <TextBold fontSize={FontSize(14)}>{title}</TextBold>
        </Content>
      </TouchableOpacity>
    </View>
  );
}
