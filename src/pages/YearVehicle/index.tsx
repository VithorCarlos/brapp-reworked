import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { Background } from "../../component/Background";
import { Breadcrumb, IParams } from "../../component/Breadcrumb";
import { Button } from "../../component/Button";
import { ButtonAdd } from "../../component/ButtonAdd";
import { SearchBar } from "../../component/SearchBar";
import { TextBold, TextSemiBold } from "../../component/TextHeading";
import FontSize, {
  width,
  widthPercentageToDP,
} from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";
import { IVehicle, useVehicleAuth } from "../../hooks/vehicleContext";
import { api } from "../../services/api";
import { Footer, VehicleYear } from "./styles";

export function YearVehicle() {
  const route = useRoute();
  const params = route.params as IVehicle;
  const navigation = useNavigation();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [year, setYear] = useState("");
  const [idYear, setIdYear] = useState("");
  const [yearData, setYearData] = useState([]);
  const [yearModel, setYearModel] = useState("");
  const [selectYear, setSelectYear] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [filterItem, setFilterItem] = useState<IVehicle>([]);
  const { replaceCase, toTitleCase } = useVehicleAuth();
  const { secondary, secondary_load } = theme.colors;

  const load = async (categoria: any) => {
    try {
      const { data } = await api.get(
        `/${categoria}/marcas/${params.idMarca}/modelos/${params.idModelo}/anos`
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

  const handleYear = (item: string) => {
    year === "" ? setYear(item) : setYear("");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleYearSelected = (item: string) => {
    if (item === "") {
      setYear("");
      return setSelectYear(item);
    } else if (item === selectYear) {
      return setSelectYear("");
    }
    setYear(item);
    return setSelectYear(item);
  };

  useEffect(() => {
    setFilterItem(vehicleData);
  }, [vehicleData]);

  useEffect(() => {
    if (vehicleData !== undefined) {
      load(replaceCase(params.categoria));
    }
  }, []);

  useEffect(() => {
    if (year !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [handleYear]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titulo}
          categoryBreadcrumb={params.categoria}
          brandBreadcrumb={params.Marca && toTitleCase(params.Marca)}
          modelBreadcrumb={params.Modelo && toTitleCase(params.Modelo)}
        />

        <View style={{ marginHorizontal: widthPercentageToDP(5) }}>
          <TextSemiBold fontSize={FontSize(17)} textShadow>
            Selecione o ano do veiculo
          </TextSemiBold>
        </View>

        <View style={{ marginTop: "7%", marginHorizontal: "5%" }}>
          <SearchBar
            title="Pesquisar ano do veiculo"
            data={vehicleData}
            onChangeText={handleSearchFilter}
          />
        </View>

        {loading ? (
          <VehicleYear>
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              nestedScrollEnabled={true}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ShimmerPlaceholder
                  style={{ borderRadius: widthPercentageToDP(3), flex: 1 }}
                  shimmerStyle={{
                    height: widthPercentageToDP(12),
                    marginBottom: widthPercentageToDP(3.5),
                    marginHorizontal: widthPercentageToDP(2),
                    borderWidth: 1,
                    borderColor: secondary,
                  }}
                  shimmerColors={[secondary_load, secondary, secondary_load]}
                  stopAutoRun={false}
                  visible={loadingVisible}
                >
                  <View>
                    <ButtonAdd title={""} />
                  </View>
                </ShimmerPlaceholder>
              )}
            />
          </VehicleYear>
        ) : (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <VehicleYear>
              <FlatList
                data={filterItem}
                keyExtractor={(item) => String(item.codigo)}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: "50%" }}>
                    <ButtonAdd
                      key={item.codigo}
                      style={{ marginHorizontal: widthPercentageToDP(1.2) }}
                      title={toTitleCase(item.nome)}
                      color={theme.colors.heading}
                      onPress={() => {
                        handleYear(item.nome);
                        handleYearSelected(item.codigo);
                        setYearData(item);
                        setYearModel(item.nome);
                        setIdYear(item.codigo);
                      }}
                      selected={item.codigo === selectYear}
                    />
                  </View>
                )}
              />
            </VehicleYear>
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
          style={{ width: "46%" }}
          disabled={disabled}
          onPress={() =>
            navigation.navigate("ResultVehicle", {
              titulo: params.titulo,
              categoria: params.categoria,
              Marca: params.Marca,
              Modelo: params.Modelo,
              idModelo: params.idModelo,
              idMarca: params.idMarca,
              yearData: yearData,
              idAno: idYear,
              AnoModelo: yearModel,
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
