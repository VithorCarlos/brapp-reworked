import React from "react";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import { Background } from "./src/component/Background";
import { VehicleProvider } from "./src/hooks/vehicleContext";
import { GoogleSearchProvider } from "./src/hooks/googleSearchContext";
import codePush from "react-native-code-push";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <Background>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <VehicleProvider>
          <GoogleSearchProvider>
            <Routes />
          </GoogleSearchProvider>
        </VehicleProvider>
      </GestureHandlerRootView>
    </Background>
  );
};

export default codePush({
  // qd checar que tem atualização. aq aplica qd tiver att disponivel
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
