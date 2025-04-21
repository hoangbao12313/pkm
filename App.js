import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from './screens/MainMenuScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Chọn chế độ' }} />
        <Stack.Screen name="List" component={ListScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Detail" component={DetailScreen} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}