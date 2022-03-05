import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background } from '../../component/Background';
import { TextBold, TextSemiBold, TextRegular } from '../../component/TextHeading';
import CarSvg from '../../assets/images/carro-esporte.svg'
import {
  Container,
  Content,
  Footer,
  Description,
  ActionButton,
  ImageContent
} from './styles';
import { Dimensions, ScrollView } from 'react-native';
import { width, height } from '../../global/styles/responsive';

export function Home() {
  const navigation = useNavigation();
  const [test, setTest] = useState(Boolean);

  Dimensions.addEventListener('change', ({ screen }) => {
    if (screen.width > screen.height) {
      setTest(true);
    } else {
      setTest(false);
    }
  });

  return (
    <Background>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Content isLandscape={test}>
            <TextBold fontSize={35}>
              Olá
            </TextBold>

            <TextSemiBold fontSize={25}>
              Seja bem-vindo(a) ao BRApp.
            </TextSemiBold>

            <Description>
              <TextRegular fontSize={18} lineHeight={20}>
                Aqui é possível realizar consultas precisas {'\n'}
                sobre o preço médio do veículo baseado na {'\n'}
                tabela FIPE.
              </TextRegular>
            </Description>
          </Content>

          <ImageContent>
            <CarSvg width={width - 26} height={width - 26} />
          </ImageContent>

          <Footer>
            <ActionButton
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CategorySelect', {
                titleBreadcrumb: 'Veiculos'
              })}
            >
              <TextBold fontSize={18}>
                COMEÇAR CONSULTAS
              </TextBold>
            </ActionButton>
          </Footer>
        </ScrollView>
      </Container>

    </Background>
  );
}