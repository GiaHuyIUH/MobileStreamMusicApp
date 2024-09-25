import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens/StartScreen";
import SignUpScreen1 from "../screens/SignUpScreen1";
import SignUpScreen2 from "../screens/SignUpScreen2";

const Stack = createStackNavigator();

const setting = {
  headerTitle: "Create account",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#121212", // Set header background color
  },
  headerTintColor: "#fff", // Set header text color
  headerTitleStyle: {
    fontWeight: "bold", // Customize title text style
  },
};

const LoginStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen1"
          component={SignUpScreen1}
          options={setting}
        />
        <Stack.Screen
          name="SignUpScreen2"
          component={SignUpScreen2}
          options={setting}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStackNavigator;
