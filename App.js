// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigations/TabNavigator";
import AlbumViewScreen from "./screens/AlbumViewScreen";
import AlbumControlScreen from "./screens/AlbumControlScreen";
import TrackViewScreen from "./screens/TrackViewScreen";
import TrackControlScreen from "./screens/TrackScreen";
import SongShareScreen from "./screens/SongShareScreen";
import AlbumRadioScreen from "./screens/AlbumRadioScreen";
import PlaylistSearchScreen from "./screens/PlaylistSearchScreen";
import ListeningScreen from "./screens/ListeningScreen";
import RootNavigator from "./navigations/RootNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
