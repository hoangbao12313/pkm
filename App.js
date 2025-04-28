import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';

import MainMenuScreen from './screens/MainMenuScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import Ex4_DetailScreen from './Exercise4/Ex4_DetailScreen';
import HomeScreen from './Exercise4/HomeScreen';
import Profile from './Exercise4/Profile';
import CustomDrawerBar from './Exercise4/CustomDrawerBar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TheoryDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
    <Drawer.Screen name="TheoryHome" component={HomeScreen} />
    <Drawer.Screen name="TheoryProfile" component={Profile} />
    <Drawer.Screen name="TheoryDetail" component={Ex4_DetailScreen} />
    <Drawer.Screen name="Pokemon" component={HomeScreen} /> 
    <Drawer.Screen name="Cafe" component={HomeScreen} />
    <Drawer.Screen name="Design" component={HomeScreen} />
  </Drawer.Navigator>
);

const PracticeDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
    <Drawer.Screen name="Project1" component={HomeScreen} /> 
    <Drawer.Screen name="Project2" component={HomeScreen} />
    <Drawer.Screen name="Project3" component={HomeScreen} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Chọn chế độ' }} />
          <Stack.Screen name="Theory" component={TheoryDrawer} />
          <Stack.Screen name="Practice" component={PracticeDrawer} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Detail" component={DetailsScreen} />
          <Stack.Screen name="Ex4_DetailScreen" component={Ex4_DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
