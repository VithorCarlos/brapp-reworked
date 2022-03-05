import React, { ReactNode }from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../global/styles/theme';

interface Props {
    children: ReactNode;
}

export function Background({children}: Props)  {
  const { background100, background80 } = theme.colors;
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[background100, background80, background80, background100]}
    > 
        {children}
    </LinearGradient>
  );
}
