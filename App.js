// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigations/TabNavigator";
import AlbumViewScreen from "./screens/AlbumViewScreen";
import AlbumControlScreen from "./screens/AlbumControlScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
       
    //     <Stack.Screen name="MainTabs" component={TabNavigator} />
        
   
    //     <Stack.Screen name="AlbumView" component={AlbumViewScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <AlbumControlScreen/>
  );
}
