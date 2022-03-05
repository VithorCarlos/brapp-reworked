import React, { useState } from 'react';
import {
    TextInput, TextInputProps, View
} from 'react-native';
import SearchSvg from '../../assets/images/search.svg'
import { theme } from '../../global/styles/theme';
import { IVehicle } from '../../hooks/context';
import { Container, Hr } from './styles';
import { width, height } from '../../global/styles/responsive';

interface Props extends TextInputProps{
  title: string;
  text: string;
  data: Array<IVehicle>;
}

export function SearchBar({title, text, ...rest}: Props){

  return (
        <Container>   
            
          <View style={{position: 'absolute', left: 10 }}>
            <SearchSvg width={29} height={29}/>
          </View> 

          <TextInput style={{
            height: 45, 
            width: '100%', 
            fontFamily: theme.fonts.title400,
            fontSize: 16,
          }}
          {...rest}
          placeholder={title}
          color={theme.colors.inputColor}
          >
          </TextInput>
        </Container>
  );
}