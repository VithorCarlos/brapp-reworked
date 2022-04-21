import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Background } from "../../component/Background";
import { ScrollView } from "react-native";
import {
  TextBold,
  TextSemiBold,
  TextRegular,
} from "../../component/TextHeading";
import CarSvg from "../../assets/images/carro-esporte.svg";
import {
  Container,
  Footer,
  Description,
  ActionButton,
  ImageContent,
} from "./styles";
import FontSize, {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../global/styles/responsive";
import * as Animatable from "react-native-animatable";
import { ModalHasUpdate } from "../../component/ModalHasUpdate";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Animatable.View
            useNativeDriver
            animation="bounceIn"
            direction="alternate"
            duration={4000}
            style={{
              marginTop: getStatusBarHeight() + widthPercentageToDP(5),
            }}
          >
            <TextBold fontSize={FontSize(30)}>Olá</TextBold>

            <TextSemiBold fontSize={FontSize(22)}>
              Seja bem-vindo(a) ao BRApp.
            </TextSemiBold>

            <Description>
              <TextRegular fontSize={FontSize(16)}>
                Aqui é possível realizar consultas precisas {"\n"}
                sobre o preço médio do veículo conforme a {"\n"}
                tabela FIPE.
              </TextRegular>
            </Description>
          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="bounceIn"
            direction="alternate"
            duration={4000}
            style={{ marginVertical: heightPercentageToDP(10) }}
          >
            <ImageContent>
              <CarSvg
                width={widthPercentageToDP(90)}
                height={widthPercentageToDP(90)}
              />
            </ImageContent>
          </Animatable.View>

          <Footer>
            <Animatable.View
              useNativeDriver
              animation="bounceIn"
              direction="alternate"
              duration={4000}
            >
              <ActionButton
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("CategorySelect", {
                    titulo: "Veiculos",
                  })
                }
              >
                <TextBold fontSize={FontSize(16)}>COMEÇAR CONSULTAS</TextBold>
              </ActionButton>
            </Animatable.View>
          </Footer>
          <ModalHasUpdate />
        </Container>
      </ScrollView>
    </Background>
  );
};
