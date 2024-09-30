import React from "react";
import { Text, View, ActivityIndicator, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import LoginStackNavigator from "./navigations/LoginStackNavigator";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen1 from "./screens/SearchScreen1";
import SearchScreen2 from "./screens/SearchScreen2";
import AlbumViewScreen from "./screens/AlbumViewScreen";
import AlbumControlScreen from "./screens/AlbumControlScreen";

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
      <AlbumControlScreen /> 
      

      
    </>
  );
}
