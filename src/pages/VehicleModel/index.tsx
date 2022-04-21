import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { Background } from "../../component/Background";
import { Breadcrumb } from "../../component/Breadcrumb";
import { Button } from "../../component/Button";
import { ButtonAdd } from "../../component/ButtonAdd";
import { SearchBar } from "../../component/SearchBar";
import {
  TextBold,
  TextRegular,
  TextSemiBold,
} from "../../component/TextHeading";
import FontSize, { widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";
import { IVehicle, useVehicleAuth } from "../../hooks/vehicleContext";
import { api } from "../../services/api";
import { Footer, ModelVehicle, SearchContent } from "./styles";

export function VehicleModel() {
  const route = useRoute();
  const params = route.params as IVehicle;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const navigation = useNavigation();
  const [model, setModel] = useState("");
  const [modelData, setModelData] = useState([]);
  const [modelName, setModelName] = useState("");
  const [idModel, setIdModel] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [selectModel, setSelectModel] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [filterItem, setFilterItem] = useState<IVehicle>([]);
  const { secondary, secondary_load } = theme.colors;

  const { replaceCase, toTitleCase } = useVehicleAuth();

  const load = async (category: any, idBrand: any) => {
    try {
      const { data } = await api.get(`/${category}/marcas/${idBrand}/modelos`);
      if (data !== "") {
        setLoading(false);
        setTimeout(() => setLoadingVisible(!loadingVisible), 1000);
      }

      return setVehicleData(data.modelos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchFilter = (text: string) => {
    if (text) {
      const newData = vehicleData.filter((item) => {
        const itemData = item ? item.nome.toLowerCase() : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.match(textData);
      });
      setFilterItem(newData);
    } else {
      setFilterItem(vehicleData);
    }
  };

  const handleModel = (item: string) => {
    model === "" ? setModel(item) : setModel("");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleModelSelected = (item: string) => {
    if (item === "") {
      setModel("");
      return setSelectModel(item);
    } else if (item === selectModel) {
      return setSelectModel("");
    }
    setModel(item);
    return setSelectModel(item);
  };

  useEffect(() => {
    setFilterItem(vehicleData);
  }, [vehicleData]);

  useEffect(() => {
    load(replaceCase(params.categoria), params.idMarca);
  }, []);

  useEffect(() => {
    if (model !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [handleModel]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titulo}
          categoryBreadcrumb={params.categoria}
          brandBreadcrumb={params.Marca && toTitleCase(params.Marca)}
        />

        <View style={{ marginHorizontal: widthPercentageToDP(5) }}>
          <TextSemiBold fontSize={FontSize(17)} textShadow>
            Selecione o modelo do veiculo
          </TextSemiBold>
        </View>

        <SearchContent>
          <SearchBar
            title="Pesquisar modelo do veiculo"
            data={vehicleData}
            onChangeText={handleSearchFilter}
          />
        </SearchContent>

        {loading ? (
          <ModelVehicle>
            <FlatList
              data={[1, 2, 3, 4]}
              nestedScrollEnabled={true}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ShimmerPlaceholder
                  style={{ borderRadius: widthPercentageToDP(3), flex: 1 }}
                  shimmerStyle={{
                    height: widthPercentageToDP(12),
                    marginBottom: widthPercentageToDP(3.5),
                    width: "100%",
                    borderWidth: 1,
                    borderColor: secondary,
                  }}
                  shimmerColors={[secondary_load, secondary, secondary_load]}
                  stopAutoRun={false}
                  visible={loadingVisible}
                >
                  <View style={{ width: "100%" }}>
                    <ButtonAdd title={""} />
                  </View>
                </ShimmerPlaceholder>
              )}
            />
          </ModelVehicle>
        ) : (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ModelVehicle>
              <FlatList
                data={filterItem}
                keyExtractor={(item) => String(item.codigo)}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: "100%" }}>
                    <ButtonAdd
                      style={{ marginHorizontal: widthPercentageToDP(1.2) }}
                      key={item.codigo}
                      title={toTitleCase(item.nome)}
                      color={theme.colors.heading}
                      onPress={() => {
                        handleModel(item);
                        handleModelSelected(item.codigo);
                        setIdModel(item.codigo);
                        setModelData(item);
                        setModelName(item.nome);
                      }}
                      selected={item.codigo === selectModel}
                    />
                  </View>
                )}
              />
            </ModelVehicle>
          </KeyboardAvoidingView>
        )}
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
          disabled={disabled}
          style={{ width: "46%" }}
          onPress={() =>
            navigation.navigate("YearVehicle", {
              titulo: params.titulo,
              categoria: params.categoria,
              Marca: params.Marca,
              Modelo: modelName,
              idMarca: params.idMarca,
              idModelo: idModel,
              modelData: modelData,
            })
          }
        >
          <TextBold fontSize={FontSize(16)} color={theme.colors.heading}>
            PRÓXIMO
          </TextBold>
        </Button>
      </Footer>
    </Background>
  );
}
