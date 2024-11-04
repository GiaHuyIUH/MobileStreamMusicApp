import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
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
      {/* <Stack.Screen
                name="PlayList"
                component={PlayList}
                options={{
                    headerTitle: "",
                    headerBackground: () => {
                        return (
                            <View
                                style={{
                                    background: "#0080AE",
                                    flex: 1,
                                }}
                            ></View>
                        );
                    },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                }}
            /> */}
    </Stack.Navigator>
  );
}
