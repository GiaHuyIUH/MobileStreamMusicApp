import React from "react";
import { Text, View, ActivityIndicator, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import LoginStackNavigator from "./navigations/LoginStackNavigator";

export default function App() {
  // Load the font
  const [fontsLoaded] = useFonts({
    MyFont: require("./assets/fonts/MyFont.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <LoginStackNavigator />
    </>
  );
}
