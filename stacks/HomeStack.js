import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PlayList from "../modules/Playlist/Playlist";
import Artist from "../modules/Playlist/Artist";
import AlbumViewScreen from "../screens/AlbumViewScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PlayList"
        component={PlayList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ArtistViewScreen"
        component={Artist}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AlbumViewScreen"
        component={AlbumViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
