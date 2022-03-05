import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    View,
} from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import { Background } from '../../component/Background';
import { Breadcrumb, IParams } from '../../component/Breadcrumb';
import { TextBold, TextLight, TextSemiBold } from '../../component/TextHeading';
import { theme } from '../../global/styles/theme';
import { Container, Content, Fipe, Hr, ResultContent } from './styles';
import CopySvg from '../../assets/images/copy.svg';
import { Button } from '../../component/Button';
import { Footer } from './styles';
import { api } from '../../services/api';
import { IVehicle, useAuth } from '../../hooks/context';
import { ToastAndroid } from 'react-native';

export function ResultVehicle() {
    const route = useRoute();
    const params = route.params as IParams;
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [vehicleData, setVehicleData] = useState<IVehicle>({} as IVehicle);

    const {replaceCase, toTitleCase} = useAuth();
    async function load() {
        const { data } = await api.get(
            `/${replaceCase(params.vehicleBreadcrumb)}/marcas/${params.codeBrandVehicle}
            /modelos/${params.codeModel}/anos/${params.yearBreadcrumb.codigo}`);

           
            if (data !== ''){
                setLoading(false);
                return setVehicleData(data);
            }
    }

    useEffect(() => {
        load()
    }, [])

    function copyToClipboard(item: any) {
        Clipboard.setString(item)
        ToastAndroid.showWithGravity(
            "Copiado para área de transferência!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER 
        )
    }

    return (
        <Background>
            <Breadcrumb
                titleBreadcrumb={params.titleBreadcrumb}
                vehicleBreadcrumb={params.vehicleBreadcrumb}
                brandBreadcrumb={params.brandBreadcrumb.nome && params.brandBreadcrumb.nome}
                modelBreadcrumb={params.modelBreadcrumb.nome && params.modelBreadcrumb.nome}
                yearBreadcrumb={params.yearBreadcrumb.nome && params.yearBreadcrumb.nome}
                marginBottom={30}
            />

            <Container>
                <View>
                    <TextSemiBold fontSize={24}>
                        Dados do veiculo
                    </TextSemiBold>
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 20}}
                >
                    {            
                        <>
                        <Content>
                            <ResultContent>
                                    <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                        Preço
                                    </TextLight>
                                    <TextBold fontSize={18} color={theme.colors.heading}  textAlign={'center'}>
                                        {vehicleData.Valor}
                                    </TextBold>
                            </ResultContent>

                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Marca
                                </TextLight>
                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.Marca}
                                </TextBold>
                            </ResultContent>

                            <Hr/>
                            
                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Modelo
                                </TextLight>

                                <Fipe activeOpacity={0.7} onPress={() => (copyToClipboard(vehicleData.Modelo))}>
                                    <CopySvg width={20} height={20} style={{ marginRight: 5 }} />
                                    <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                        {vehicleData.Modelo}
                                    </TextBold>
                                </Fipe>
                            </ResultContent>

                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Ano modelo
                                </TextLight>

                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.AnoModelo}
                                </TextBold>
                            </ResultContent>
                               
                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Combustivel
                                </TextLight>

                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.Combustivel}
                                </TextBold>
                            </ResultContent>
                                
                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Código FIPE
                                </TextLight>

                                <Fipe activeOpacity={0.7} onPress={() => (copyToClipboard(vehicleData.CodigoFipe))}>
                                    <CopySvg width={20} height={20} style={{ marginRight: 5 }} />
                                    <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                        {vehicleData.CodigoFipe}
                                    </TextBold>
                                </Fipe>
                            </ResultContent>
                                
                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Mês ref.
                                </TextLight>

                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.MesReferencia}
                                </TextBold>
                            </ResultContent>

                            <Hr/>

                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Sigla Combustivel
                                </TextLight>

                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.SiglaCombustivel}
                                </TextBold>
                            </ResultContent>

                            <Hr/>
                            
                            <ResultContent>
                                <TextLight fontSize={17} color={theme.colors.heading} textAlign={'center'}>
                                    Tipo veiculo
                                </TextLight>

                                <TextBold fontSize={18} color={theme.colors.heading} textAlign={'center'}>
                                    {vehicleData.TipoVeiculo}
                                </TextBold>

                            </ResultContent>
                        </Content>
                        </>
                    
                    }
                </ScrollView>
            }
            </Container>

            <Footer>
                <Button
                    background={theme.colors.primary}
                    onPress={() => navigation.navigate('Home')}
                >
                    <TextBold fontSize={18} color={theme.colors.heading}>
                        Voltar ao inicio
                    </TextBold>
                </Button>
            </Footer>

        </Background>
    );
}