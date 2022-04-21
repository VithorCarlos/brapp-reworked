import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Background } from "../../component/Background";
import { Breadcrumb } from "../../component/Breadcrumb";
import { Button } from "../../component/Button";
import { ButtonAdd } from "../../component/ButtonAdd";
import { Category } from "../../component/Category";
import { TextBold, TextSemiBold } from "../../component/TextHeading";
import { theme } from "../../global/styles/theme";
import { IVehicle, useVehicleAuth } from "../../hooks/vehicleContext";
import { categories } from "../../utils/categories";
import { VehicleBrand, Footer, ControllerText } from "./styles";
import { api } from "../../services/api";
import { SearchBar } from "../../component/SearchBar";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import FontSize, { widthPercentageToDP } from "../../global/styles/responsive";

export function CategorySelect() {
  const route = useRoute();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const params = route.params as IVehicle;
  const navigation = useNavigation();
  const [category, setCategory] = useState("Carros");
  const [brandId, setBrandId] = useState("");
  const [brand, setBrand] = useState<any>("");
  const [brandData, setBrandData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectVehicle, setSelectVehicle] = useState<any>("");
  const [selectBrand, setSelectBrand] = useState<any>("");
  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [loading, setLoading] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [filterItem, setFilterItem] = useState<IVehicle>();
  const { replaceCase, toTitleCase } = useVehicleAuth();
  const { secondary, secondary_load } = theme.colors;

  const load = async (vehicle: string) => {
    try {
      const { data } = await api.get(`/${vehicle}/marcas`);
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
      const newData = vehicleData.filter((item: any) => {
        const itemData = item ? item.nome.toLowerCase() : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.match(textData);
      });
      setFilterItem(newData);
    } else {
      setFilterItem(vehicleData);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCategory = (item: any) => {
    category === "" ? setCategory(item) : setCategory("");
  };

  const handleBrand = (item: any) => {
    brand === "" ? setBrand(item) : setBrand("");
    setBrandId(item);
  };

  const handleVehicleSelected = (index: number) => {
    setSelectVehicle(index);
  };

  const handleBrandSelected = (item: string) => {
    if (item === "") {
      setBrand("");
      return setSelectBrand(item);
    } else if (item === selectBrand) {
      return setSelectBrand("");
    }
    setBrand(item);
    return setSelectBrand(item);
  };

  useEffect(() => {
    if (category && brand !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [handleCategory, handleBrand]);

  useEffect(() => {
    if (category == "Carros") {
      load(category);
      setSelectVehicle(0);
    }
  }, []);

  useEffect(() => {
    setFilterItem(vehicleData);
  }, [vehicleData]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titulo}
          categoryBreadcrumb={category}
        />

        <View>
          <ControllerText>
            <TextSemiBold fontSize={FontSize(17)} textShadow>
              Selecione o tipo de veiculo
            </TextSemiBold>
          </ControllerText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: "5%",
              paddingRight: "5%",
              marginTop: "7%",
              marginBottom: "7%",
            }}
          >
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <Category
                  key={category.id}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleCategory(category.title);
                    setLoading(true);
                    load(replaceCase(category.title));
                    setCategory(category.title);
                    handleVehicleSelected(index);
                  }}
                  selected={index === selectVehicle}
                  title={category.title}
                  icon={category.icon}
                />
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        <ControllerText>
          <TextSemiBold fontSize={FontSize(17)} textShadow>
            Selecione a fabricante do veiculo
          </TextSemiBold>
        </ControllerText>

        <View style={{ marginTop: "7%", marginHorizontal: "5%" }}>
          <SearchBar
            title="Pesquisar marca do veiculo"
            data={vehicleData}
            onChangeText={handleSearchFilter}
          />
        </View>

        {loading ? (
          <VehicleBrand>
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
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
                  LinearGradient={LinearGradient}
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
          </VehicleBrand>
        ) : (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <VehicleBrand>
              <FlatList
                data={filterItem}
                nestedScrollEnabled={true}
                keyExtractor={(item) => String(item.codigo)}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: "50%" }}>
                    <ButtonAdd
                      title={toTitleCase(item.nome)}
                      style={{ marginHorizontal: widthPercentageToDP(1.2) }}
                      color={theme.colors.heading}
                      onPress={() => {
                        handleBrand(item.nome);
                        setBrandId(item.codigo);
                        handleBrandSelected(item.codigo);
                        setBrandData(item);
                        setBrandName(item.nome);
                      }}
                      selected={item.codigo === selectBrand}
                    />
                  </View>
                )}
              />
            </VehicleBrand>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <Footer>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
              navigation.navigate("VehicleModel", {
                titulo: params.titulo,
                categoria: category,
                Marca: brandName,
                DataCategory: vehicleData,
                brandData: brandData,
                idMarca: brandId,
              })
            }
          >
            <TextBold fontSize={FontSize(16)} color={theme.colors.heading}>
              PRÓXIMO
            </TextBold>
          </Button>
        </View>
      </Footer>
    </Background>
  );
}
