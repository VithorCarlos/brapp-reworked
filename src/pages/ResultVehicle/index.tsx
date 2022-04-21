import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Image, ToastAndroid, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import Clipboard from "@react-native-community/clipboard";
import { Background } from "../../component/Background";
import { Breadcrumb } from "../../component/Breadcrumb";
import { TextBold, TextLight, TextSemiBold } from "../../component/TextHeading";
import { theme } from "../../global/styles/theme";
import {
  Container,
  Content,
  Fipe,
  Hr,
  ResultContent,
  Header,
  GoogleSearchContent,
  Teste,
} from "./styles";
import CopySvg from "../../assets/images/copy.svg";
import CardImageSvg from "../../assets/images/card-image.svg";
import GoogleSvg from "../../assets/images/google.svg";
import { Button } from "../../component/Button";
import { Footer } from "./styles";
import { api } from "../../services/api";
import { IVehicle, useVehicleAuth } from "../../hooks/vehicleContext";
import FontSize, {
  heightPercentageToDP,
  width,
  widthPercentageToDP,
} from "../../global/styles/responsive";
import { useGoogleSearchAuth } from "../../hooks/googleSearchContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ButtonAdd } from "../../component/ButtonAdd";
import * as Animatable from "react-native-animatable";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function ResultVehicle() {
  const route = useRoute();
  const params = route.params as IVehicle;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const [loading, setLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const { loadImage, googleSearch, setGoogleSearch } = useGoogleSearchAuth();
  const { secondary, secondary_load } = theme.colors;
  const { replaceCase, toTitleCase } = useVehicleAuth();

  const load = async () => {
    try {
      const { data } = await api.get(
        `/${replaceCase(params.categoria)}/marcas/${params.idMarca}
                /modelos/${params.idModelo}/anos/${params.idAno}`
      );

      if (data !== "") {
        setLoading(false);
        setLoadingVisible(loadingVisible);
        return setVehicleData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    load();

    if (googleSearch) {
      setGoogleSearch();
    }
  }, []);

  const copyToClipboard = (item: any) => {
    Clipboard.setString(item);
    ToastAndroid.showWithGravity(
      "Copiado para área de transferência!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <Background>
      <Animatable.View
        style={{ flex: 1 }}
        useNativeDriver
        animation="bounceIn"
        direction="alternate"
        duration={1500}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Breadcrumb
            titleBreadcrumb={params.titulo}
            categoryBreadcrumb={params.categoria}
            brandBreadcrumb={params.Marca && toTitleCase(params.Marca)}
            modelBreadcrumb={params.Modelo && toTitleCase(params.Modelo)}
            yearBreadcrumb={params.AnoModelo && toTitleCase(params.AnoModelo)}
            marginBottom={width * 0.07}
          />
          <Container>
            {loading ? (
              <Header>
                <TextSemiBold fontSize={width * 0.065} textShadow>
                  Dados do veiculo
                </TextSemiBold>

                <ShimmerPlaceholder
                  style={{ flex: 1, borderRadius: widthPercentageToDP(3) }}
                  shimmerStyle={{
                    height: widthPercentageToDP(12),
                    marginLeft: widthPercentageToDP(7),
                    borderWidth: 1,
                    borderColor: secondary,
                  }}
                  shimmerColors={[secondary_load, secondary, secondary_load]}
                  stopAutoRun={false}
                  visible={loadingVisible}
                >
                  <Button background={theme.colors.secondary}>
                    <TextSemiBold fontSize={width * 0.045}>
                      Ver Fotos
                    </TextSemiBold>
                  </Button>
                </ShimmerPlaceholder>
              </Header>
            ) : (
              <Header>
                <View
                  style={{
                    marginBottom: widthPercentageToDP(2),
                    marginRight: widthPercentageToDP(5),
                  }}
                >
                  <TextSemiBold fontSize={width * 0.065} textShadow>
                    Dados do veiculo
                  </TextSemiBold>
                </View>
                <Button
                  background={theme.colors.secondary}
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: width * 0.025,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    openModal();
                    loadImage(
                      10,
                      `${vehicleData.Marca} ${vehicleData.Modelo} ano ${vehicleData.AnoModelo}`
                    );
                  }}
                >
                  <CardImageSvg
                    width={widthPercentageToDP(6.2)}
                    height={widthPercentageToDP(6.2)}
                    style={{ marginRight: width * 0.015 }}
                  />
                  <TextSemiBold fontSize={width * 0.045}>
                    Ver Fotos
                  </TextSemiBold>
                </Button>
              </Header>
            )}

            {loading ? (
              <View style={{ marginTop: width * 0.11 }}>
                <FlatList
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <Hr />}
                  contentContainerStyle={{
                    marginBottom: widthPercentageToDP(2),
                  }}
                  renderItem={({ item }) => (
                    <React.Fragment>
                      <ShimmerPlaceholder
                        style={{
                          borderRadius: widthPercentageToDP(3),
                          flex: 1,
                        }}
                        shimmerStyle={{
                          height: widthPercentageToDP(16),
                          width: "100%",

                          borderWidth: 1,
                          borderColor: secondary,
                        }}
                        shimmerColors={[
                          secondary_load,
                          secondary,
                          secondary_load,
                        ]}
                        stopAutoRun={false}
                        visible={loadingVisible}
                      >
                        <View>
                          <ButtonAdd title={""} />
                        </View>
                      </ShimmerPlaceholder>
                    </React.Fragment>
                  )}
                />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: width * 0.11 }}
              >
                {
                  <>
                    <Content>
                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Preço
                        </TextLight>
                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {vehicleData.Valor}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Marca
                        </TextLight>
                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {toTitleCase(vehicleData.Marca)}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Modelo
                        </TextLight>

                        <Fipe
                          activeOpacity={0.7}
                          onPress={() =>
                            copyToClipboard(
                              `${vehicleData.Marca} ${vehicleData.Modelo} ano ${vehicleData.AnoModelo}`
                            )
                          }
                        >
                          <CopySvg
                            width={widthPercentageToDP(5.2)}
                            height={widthPercentageToDP(5.2)}
                            style={{ marginRight: widthPercentageToDP(1) }}
                          />
                          <TextBold
                            fontSize={width * 0.046}
                            color={theme.colors.heading}
                            textAlign={"center"}
                          >
                            {toTitleCase(vehicleData.Modelo)}
                          </TextBold>
                        </Fipe>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Ano modelo
                        </TextLight>

                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {vehicleData.AnoModelo}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Combustivel
                        </TextLight>

                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {toTitleCase(vehicleData.Combustivel)}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Código FIPE
                        </TextLight>

                        <Fipe
                          activeOpacity={0.7}
                          onPress={() =>
                            copyToClipboard(vehicleData.CodigoFipe)
                          }
                        >
                          <CopySvg
                            width={widthPercentageToDP(5.2)}
                            height={widthPercentageToDP(5.2)}
                            style={{ marginRight: 5 }}
                          />
                          <TextBold
                            fontSize={width * 0.046}
                            color={theme.colors.heading}
                            textAlign={"center"}
                          >
                            {vehicleData.CodigoFipe}
                          </TextBold>
                        </Fipe>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Mês ref.
                        </TextLight>

                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {toTitleCase(vehicleData.MesReferencia)}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Sigla Combustivel
                        </TextLight>

                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {vehicleData.SiglaCombustivel}
                        </TextBold>
                      </ResultContent>

                      <Hr />

                      <ResultContent>
                        <TextLight
                          fontSize={width * 0.045}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          Tipo veiculo
                        </TextLight>

                        <TextBold
                          fontSize={width * 0.046}
                          color={theme.colors.heading}
                          textAlign={"center"}
                        >
                          {vehicleData.TipoVeiculo}
                        </TextBold>
                      </ResultContent>
                    </Content>
                  </>
                }
              </ScrollView>
            )}
          </Container>
        </ScrollView>
        <Footer>
          <Button
            background={theme.colors.primary}
            style={{ width: "46%" }}
            onPress={handleGoBack}
          >
            <TextBold fontSize={FontSize(16)} color={theme.colors.heading}>
              VOLTAR
            </TextBold>
          </Button>
          <View style={{ marginHorizontal: "4%" }} />
          <Button
            background={theme.colors.primary}
            onPress={() => navigation.navigate("Home")}
            style={{ width: "46%" }}
          >
            <TextBold fontSize={FontSize(16)} color={theme.colors.heading}>
              INÍCIO
            </TextBold>
          </Button>
        </Footer>

        <Modalize
          ref={modalizeRef}
          snapPoint={heightPercentageToDP(65)}
          modalHeight={heightPercentageToDP(97) - getStatusBarHeight()}
          modalStyle={{ backgroundColor: theme.colors.primary }}
          handleStyle={{
            backgroundColor: theme.colors.heading,
            width: widthPercentageToDP(25),
            height: widthPercentageToDP(1.5),
          }}
          useNativeDriver
        >
          <Animatable.View
            useNativeDriver
            animation="fadeIn"
            direction="alternate"
            duration={3000}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleSvg
                width={widthPercentageToDP(9.2)}
                height={widthPercentageToDP(9.2)}
                style={{ marginVertical: widthPercentageToDP(5) }}
              />
              {googleSearch?.map((item: any) => (
                <>
                  <GoogleSearchContent>
                    <Image
                      source={{ uri: item.link }}
                      style={{
                        width: "100%",
                        height: widthPercentageToDP(80),
                        borderRadius: width * 0.03,
                      }}
                      resizeMode="stretch"
                    />
                  </GoogleSearchContent>
                </>
              ))}
            </ScrollView>
          </Animatable.View>
        </Modalize>
      </Animatable.View>
    </Background>
  );
}
