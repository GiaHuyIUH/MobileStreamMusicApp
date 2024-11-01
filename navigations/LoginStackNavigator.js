// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigations/TabNavigator";
import AlbumViewScreen from "./screens/AlbumViewScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Define the main tab navigator as "MainTabs" */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        
        {/* Define the AlbumViewScreen */}
        <Stack.Screen name="AlbumView" component={AlbumViewScreen} />
        <Stack.Screen
        name="PlaylistSearch"
        component={PlaylistSearchScreen}
        options={{ headerShown: true, title: "Playlist Search" }}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
