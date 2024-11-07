import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen2 from "../screens/SearchScreen2";
import LibraryScreen from "../screens/LibraryScreen";
import PlaylistSearchScreen from "../screens/PlaylistSearchScreen"; // Import PlaylistSearchScreen
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Library") {
            iconName = focused ? "library" : "library-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? size + 5 : size}
              color={focused ? "#fff" : "#888"}
            />
          );
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 55,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen2} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />

      {/* Thêm PlaylistSearchScreen nhưng ẩn nó khỏi tab bar */}
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
