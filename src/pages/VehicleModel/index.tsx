import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Background } from '../../component/Background';
import { Breadcrumb, IParams } from '../../component/Breadcrumb';
import { Button } from '../../component/Button';
import { ButtonAdd } from '../../component/ButtonAdd';
import { SearchBar } from '../../component/SearchBar';
import { TextBold, TextRegular, TextSemiBold } from '../../component/TextHeading';
import { theme } from '../../global/styles/theme';
import { IVehicle, useAuth } from '../../hooks/context';
import { api } from '../../services/api';
import { Container, Footer, ModelVehicle } from './styles';

export function VehicleModel() {
  const route = useRoute();
  const params = route.params as IParams;
  const navigation = useNavigation();
  const [model, setModel] = useState('');
  const [modelData, setModelData] = useState([]);
  const [codeModel, setCodeModel] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);
  const [selectModel, setSelectModel] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [filterItem, setFilterItem] = useState<IVehicle>([]);

  const { replaceCase, toTitleCase } = useAuth();


  async function load(vehicle: any, codeBrandVehicle: any) {
    const { data } = await api.get(`/${vehicle}/marcas/${codeBrandVehicle}/modelos`);
    if (data !== '') {
      setLoading(false);
      return setVehicleData(data.modelos);
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

  function handleModel(item: string) {
    model === '' ? setModel(item) : setModel('');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleModelSelected(item: string) {
    if (item === '') {
      setModel('')
      return setSelectModel(item);
    } else if (item === selectModel) {
      return setSelectModel('')
    }
    setModel(item)
    return setSelectModel(item);
  }

  useEffect(() => {
    setFilterItem(vehicleData)
  }, [vehicleData]);

  useEffect(() => {
    load(replaceCase(params.vehicleBreadcrumb), params.codeBrandVehicle)
  }, [])

  useEffect(() => {
    if (model !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [handleModel]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          titleBreadcrumb={params.titleBreadcrumb}
          vehicleBreadcrumb={params.vehicleBreadcrumb}
          brandBreadcrumb={params.brandBreadcrumb.nome && params.brandBreadcrumb.nome}
          marginLeft={20}
          marginBottom={35}
        />

        <View style={{ marginHorizontal: 22 }}>
          <TextSemiBold fontSize={17} >
            Selecione o modelo do veiculo
          </TextSemiBold>
        </View>

        <View style={{ marginTop: '7%', marginBottom: '10%', marginHorizontal: '5%' }}>
          <SearchBar
            title='Pesquisar modelo do veiculo'
            data={vehicleData}
            onChangeText={handleSearchFilter}
          />
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

              <FlatList
                data={filterItem}
                keyExtractor={(item) => String(item.codigo)}
                numColumns={1}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                  <View style={{ width: '100%' }}>
                    <ButtonAdd
                      style={{ marginHorizontal: 22 }}
                      key={item.codigo}
                      title={toTitleCase(item.nome)}
                      color={theme.colors.heading}
                      onPress={() => {
                        handleModel(item)
                        handleModelSelected(item.codigo)
                        setCodeModel(item.codigo)
                        setModelData(item)
                      }}
                      selected={item.codigo === selectModel}
                    />
                  </View>
                )}
              />

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
          disabled={disabled}
          style={{ width: '46%' }}
          onPress={() => navigation.navigate('YearVehicle', {
            titleBreadcrumb: params.titleBreadcrumb,
            vehicleBreadcrumb: params.vehicleBreadcrumb,
            brandBreadcrumb: params.brandBreadcrumb,
            modelBreadcrumb: modelData,
            codeModel: codeModel,
            codeBrandVehicle: params.codeBrandVehicle
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