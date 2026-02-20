import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmartHeroGallery from "./src/screens/SmartHeroGallery";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SmartHeroGallery />
    </SafeAreaView>
  );
};

export default App;
