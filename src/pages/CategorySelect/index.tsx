import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Background } from '../../component/Background';
import { Breadcrumb, IParams } from '../../component/Breadcrumb';
import { Button } from '../../component/Button';
import { ButtonAdd } from '../../component/ButtonAdd';
import { Category } from '../../component/Category';
import { TextBold, TextSemiBold } from '../../component/TextHeading';
import { theme } from '../../global/styles/theme';
import { IVehicle, useAuth } from '../../hooks/context';
import { categories } from '../../utils/categories';
import { VehicleBrand, Footer, ControllerText } from './styles';
import { api } from '../../services/api';
import { SearchBar } from '../../component/SearchBar';
import { width } from '../../global/styles/responsive';

export function CategorySelect() {
  const route = useRoute();
  const params = route.params as IParams;
  const navigation = useNavigation();
  const { replaceCase, toTitleCase } = useAuth();
  const [vehicle, setVehicle] = useState('Carros');
  const [codeBrandVehicle, setCodeBrandVechicle] = useState('');
  const [brand, setBrand] = useState<any>('');
  const [brandData, setBrandData] = useState([]);
  const [selectVehicle, setSelectVehicle] = useState<any>('');
  const [selectBrand, setSelectBrand] = useState<any>('');
  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [loading, setLoading] = useState(true);
  const [filterItem, setFilterItem] = useState<IVehicle>([]);

  async function load(vehicle: string) {
    const { data } = await api.get(`/${vehicle}/marcas`);
    if (data !== '') {
      setLoading(false);
      return setVehicleData(data);
    }
  }


  const handleSearchFilter = (text: string) => {
    if (text) {
      const newData = vehicleData.filter((item) => {
        const itemData = item ? item.nome.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.match(textData);
      })
      setFilterItem(newData);
    } else {
      setFilterItem(vehicleData)
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleVehicle(item: any) {
    vehicle === '' ? setVehicle(item) : setVehicle('');
  }

  function handleBrand(item: any) {
    brand === '' ? setBrand(item) : setBrand('');
    setCodeBrandVechicle(item);
  }

  function handleVehicleSelected(index: number) {
    setSelectVehicle(index);
  }

  function handleBrandSelected(item: string) {
    if (item === '') {
      setBrand('')
      return setSelectBrand(item);
    } else if (item === selectBrand) {
      return setSelectBrand('')
    }
    setBrand(item)
    return setSelectBrand(item);
  }

  useEffect(() => {
    if (vehicle && brand !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [handleVehicle, handleBrand]);


  useEffect(() => {
    if (vehicle == 'Carros') {
      load(vehicle);
      setSelectVehicle(0)
    }
  }, [])

  useEffect(() => {
    setFilterItem(vehicleData);
  }, [vehicleData]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titleBreadcrumb}
          vehicleBreadcrumb={vehicle}
        />

        <View>
          <ControllerText>
            <TextSemiBold fontSize={17}>
              Selecione o tipo de veiculo
            </TextSemiBold>
          </ControllerText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              { marginHorizontal: '5%', paddingRight: '5%', marginTop: '7%', marginBottom: '7%' }}>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <Category
                  key={category.id}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleVehicle(category.title)
                    load(replaceCase(category.title))
                    setVehicle(category.title)
                    handleVehicleSelected(index)
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
          <TextSemiBold fontSize={17}>Selecione a marca do veiculo</TextSemiBold>
        </ControllerText>
        <View style={{ marginTop: '7%', marginHorizontal: '5%' }}>
          <SearchBar
            title='Pesquisar marca do veiculo'
            data={vehicleData}
            onChangeText={handleSearchFilter}

          />
        </View>

        {loading
          ?
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={{ flex: 1 }}
          />
          :
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
                  <View style={{ width: '50%' }}>
                    <ButtonAdd title={toTitleCase(item.nome)}
                      style={{ marginHorizontal: 3 }}
                      color={theme.colors.heading}
                      onPress={() => {
                        handleBrand(item.nome)
                        setCodeBrandVechicle(item.codigo)
                        handleBrandSelected(item.codigo)
                        setBrandData(item)
                      }}
                      selected={item.codigo === selectBrand}
                    />
                  </View>
                )}
              />
            </VehicleBrand>
          </KeyboardAvoidingView>
        }
      </ScrollView>
      <Footer>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            background={theme.colors.primary}
            style={{ width: '46%' }}
            onPress={handleGoBack}
          >
            <TextBold fontSize={18} color={theme.colors.heading}>
              Voltar
            </TextBold>
          </Button>
          <View style={{ marginHorizontal: '4%' }} />
          <Button
            background={theme.colors.primary}
            style={{ width: '46%' }}
            disabled={disabled}
            onPress={() => navigation.navigate('VehicleModel', {
              titleBreadcrumb: params.titleBreadcrumb,
              vehicleBreadcrumb: vehicle,
              brandBreadcrumb: brandData,
              vehicleData: vehicleData,
              codeBrandVehicle: codeBrandVehicle
            })}
          >
            <TextBold fontSize={18} color={theme.colors.heading}>
              Pŕoximo
            </TextBold>
          </Button>
        </View>
      </Footer>

    </Background>
  );
}
