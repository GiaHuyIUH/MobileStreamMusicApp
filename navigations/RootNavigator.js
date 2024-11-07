import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; // TabNavigator với các tab chính
import ProfileScreen from '../screens/ProfileScreen'; // Màn hình ProfileScreen độc lập
import AlbumViewScreen from '../screens/AlbumViewScreen'; //
import AlbumControlScreen from '../screens/AlbumControlScreen'; //
import TrackViewScreen from '../screens/TrackViewScreen';
import TrackScreen from '../screens/TrackScreen';
import SongShareScreen from '../screens/SongShareScreen';
import AlbumRadioScreen from '../screens/AlbumRadioScreen';
import ListeningScreen from '../screens/ListeningScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TabNavigator là màn hình chính */}
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* ProfileScreen sẽ được điều hướng từ LibraryScreen */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AlbumView" component={AlbumViewScreen} />
      <Stack.Screen
        name="AlbumControl"
        component={AlbumControlScreen}
        options={{
          presentation: 'modal', // Hiệu ứng trượt từ dưới lên
          cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }, 
        }}
      />
      <Stack.Screen
        name="TrackView"
        component={TrackViewScreen}
        options={{
            presentation: 'modal',
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
        />

        <Stack.Screen
            name="TrackScreen"
            component={TrackScreen}
            options={{
            presentation: 'modal', // Hiệu ứng trượt từ dưới lên
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }, 
            }}
        />
        <Stack.Screen
        name="SongShare"
        component={SongShareScreen}
        options={{
          presentation: 'modal',
          cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
      />
      <Stack.Screen name="AlbumRadioScreen" component={AlbumRadioScreen} />
      <Stack.Screen 
          name="ListeningScreen" 
          component={ListeningScreen} 
          options={{
            presentation: 'modal',
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            presentation: 'modal',
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        />
    </Stack.Navigator>
  );
};

export default RootNavigator;
