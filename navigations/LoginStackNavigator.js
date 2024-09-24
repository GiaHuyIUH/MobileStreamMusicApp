import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
