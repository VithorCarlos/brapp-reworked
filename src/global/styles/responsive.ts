import { Dimensions, PixelRatio, Platform } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const widthPercentageToDP = (widthPercent: any) => {
  const screenWidth = Dimensions.get("window").width;
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100
  );
};

export const heightPercentageToDP = (heightPercent: any) => {
  const screenHeight = Dimensions.get("window").height;
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100
  );
};

let scale = 0;

width <= height ? (scale = width / 320) : (scale = height / 320);

export default function FontSize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
