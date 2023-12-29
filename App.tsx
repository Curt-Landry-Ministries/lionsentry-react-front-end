import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./src/util/routes";

// Importing Firebase configuration to ensure Firebase is initialized
import './src/util/firebase/firebaseConfig';

import "./src/i18n";

const fetchFonts = () => {
  return Font.loadAsync({
    // Assuming FONTS.TITLE and FONTS.BODY are mapped to "Cinzel" and "Lora" respectively
    'Cinzel-Regular': require("./assets/fonts/Cinzel-Regular.ttf"),
    'Lora-Regular': require("./assets/fonts/Lora-Regular.ttf"),
  });
};

const App: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  if (!dataLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
