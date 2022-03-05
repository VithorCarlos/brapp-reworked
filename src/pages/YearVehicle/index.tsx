import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Background } from '../../component/Background';
import { Breadcrumb, IParams } from '../../component/Breadcrumb';
import { Button } from '../../component/Button';
import { ButtonAdd } from '../../component/ButtonAdd';
import { SearchBar } from '../../component/SearchBar';
import { TextBold, TextSemiBold } from '../../component/TextHeading';
import { theme } from '../../global/styles/theme';
import { IVehicle, useAuth } from '../../hooks/context';
import { api } from '../../services/api';
import { Footer, VehicleYear } from './styles';

export function YearVehicle() {
  const route = useRoute();
  const params = route.params as IParams;
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [year, setYear] = useState('');
  const [yearData, setYearData] = useState([]);
  const [selectYear, setSelectYear] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [filterItem, setFilterItem] = useState<IVehicle>([]);
  const { replaceCase, toTitleCase } = useAuth();

  async function load(vehicle: any,) {
    const { data } = await api.get(`/${vehicle}/marcas/${params.codeBrandVehicle}/modelos/${params.codeModel}/anos`);

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

  function handleYear(item: string) {
    year === '' ? setYear(item) : setYear('');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleYearSelected(item: string) {
    if (item === '') {
      setYear('')
      return setSelectYear(item);
    } else if (item === selectYear) {
      return setSelectYear('')
    }
    setYear(item);
    return setSelectYear(item);
  }

  useEffect(() => {
    setFilterItem(vehicleData);
  }, [vehicleData]);

  useEffect(() => {
    load(replaceCase(params.vehicleBreadcrumb))
  }, [])

  useEffect(() => {
    if (year !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [handleYear]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titleBreadcrumb}
          vehicleBreadcrumb={params.vehicleBreadcrumb}
          brandBreadcrumb={params.brandBreadcrumb.nome && params.brandBreadcrumb.nome}
          modelBreadcrumb={params.modelBreadcrumb.nome && params.modelBreadcrumb.nome}
        />

        <View style={{ marginHorizontal: 20 }}>
          <TextSemiBold fontSize={17}>
            Selecione o ano do veiculo
          </TextSemiBold>

          <View style={{ marginTop: 20 }}>
            <SearchBar
              title='Pesquisar ano do veiculo'
              data={vehicleData}
              onChangeText={handleSearchFilter}
            />
          </View>
        </View>
        {
          loading
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
              <VehicleYear>
                <FlatList
                  data={filterItem}
                  keyExtractor={(item) => String(item.codigo)}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ width: '50%' }}>
                      <ButtonAdd
                        style={{ marginHorizontal: 3 }}
                        title={toTitleCase(item.nome)}
                        color={theme.colors.heading}
                        onPress={() => {
                          handleYear(item.nome)
                          handleYearSelected(item.codigo)
                          setYearData(item)
                        }}
                        selected={item.codigo === selectYear}
                      />

                    </View>
                  )}
                />
              </VehicleYear>
            </KeyboardAvoidingView>
        }
      </ScrollView>
      <Footer>
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
          onPress={() => navigation.navigate('ResultVehicle', {
            titleBreadcrumb: params.titleBreadcrumb,
            vehicleBreadcrumb: params.vehicleBreadcrumb,
            brandBreadcrumb: params.brandBreadcrumb,
            modelBreadcrumb: params.modelBreadcrumb,
            codeModel: params.codeModel,
            codeBrandVehicle: params.codeBrandVehicle,
            yearBreadcrumb: yearData
          })}
        >
          <TextBold fontSize={18} color={theme.colors.heading}>
            Pŕoximo
          </TextBold>
        </Button>
      </Footer>
    </Background>
  );
}