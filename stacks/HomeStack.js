import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ListeningScreen from "../screens/ListeningScreen";
import TrackViewScreen from "../screens/TrackViewScreen";
import TrackControlScreen from "../screens/TrackControlScreen";
import SongShareScreen from "../screens/SongShareScreen";
import PlayList from "../modules/Playlist/Playlist";
// import PlayList from "../modules/Playlist/PlayList";
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
        name="TrackControlScreen"
        component={TrackControlScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SongShareScreen"
        component={SongShareScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayList"
        component={PlayList}
        options={{
          headerTitle: "My Playlist",
          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#121212",
                flex: 1,
              }}
            />
          ),
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
