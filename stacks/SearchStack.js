import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
// import CategoryDetail from "../modules/Search/CategoryDetail";
// import SearchView from "../modules/Search/SearchView";
import { View } from "react-native";
// import HeaderSearch from "../modules/Search/HeaderSearch";
// import PlayList from "../modules/Playlist/PlayList";
// import Artist from "../modules/Playlist/Artist";

const Stack = createNativeStackNavigator();
export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
                name="CategoryDetail"
                component={CategoryDetail}
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
            />
            <Stack.Screen
                name="SearchView"
                component={SearchView}
                options={{
                    headerTintColor: "white",
                    headerBackground: () => {
                        return (
                            <View
                                style={{
                                    backgroundColor: "#000",
                                    opacity: 0.8,
                                    flex: 1,
                                }}
                            ></View>
                        );
                    },
                    headerSearchBarOptions: {
                        backgroundColor: "#000",
                    },
                    headerTitle: () => <HeaderSearch></HeaderSearch>,
                }}
            />
            <Stack.Screen
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
            />
            <Stack.Screen
                name="Artist"
                component={Artist}
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
