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

const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="MainTabs" component={TabNavigator} />   
    //     <Stack.Screen name="PlaylistSearch" component={PlaylistSearchScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <AlbumControlScreen/>
    // <TrackViewScreen/>
    // <TrackControlScreen/>
    // <SongShareScreen/>
    // <AlbumRadioScreen/>
    // <NavigationContainer>
    //   <TabNavigator/>
    // </NavigationContainer>
    // <PlaylistSearchScreen/>

    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     {/* Hiển thị trực tiếp PlaylistSearchScreen */}
    //     <Stack.Screen name="PlaylistSearch" component={PlaylistSearchScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
<NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
