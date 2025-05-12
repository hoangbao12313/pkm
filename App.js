import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Store from '../DemoReactNative/LAB2/components/Store';

import MainMenuScreen from './screens/MainMenuScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import Ex4_DetailScreen from './Exercise4/Ex4_DetailScreen';
import HomeScreen from './Exercise4/HomeScreen';
import Profile from './Exercise4/Profile';
import CustomDrawerBar from './Exercise4/CustomDrawerBar';
import Pokemon from './components/Pokemon';
import Cafe from './components/Cafe';

import Design from '../DemoReactNative/android/Excersise3/Design';
import CreateAcc from './android/Excersise3/CreateAcc';
import ForgotAcc from './android/Excersise3/ForgotAcc';
import Routes from '../DemoReactNative/LAB2/components/Routes';

import firestore from '@react-native-firebase/firestore'; // Sửa import
import TodoScreen from './android/Exercise5/TodoScreen';
import Todo from './android/Exercise5/Todo';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TheoryDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
    <Drawer.Screen name="TheoryHome" component={HomeScreen} />
    <Drawer.Screen name="TheoryProfile" component={Profile} />
    <Drawer.Screen name="TheoryDetail" component={Ex4_DetailScreen} />
    <Drawer.Screen name="Pokemon" component={HomeScreen} />
    <Drawer.Screen name="Cafe" component={HomeScreen} />
    <Drawer.Screen name="Design" component={Design} />
  </Drawer.Navigator>
);

const PracticeDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
    <Drawer.Screen name="Project1" component={HomeScreen} />
    <Drawer.Screen name="Project2" component={HomeScreen} />
    <Drawer.Screen name="Project3" component={HomeScreen} />
  </Drawer.Navigator>
);

function App() {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainMenu">
            <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Chọn chế độ' }} />
            <Stack.Screen name="TodoApp" component={TodoScreen} />
            <Stack.Screen name="Theory" component={TheoryDrawer} />
            <Stack.Screen name="Practice" component={PracticeDrawer} />
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Detail" component={DetailsScreen} />
            <Stack.Screen name="Ex4_DetailScreen" component={Ex4_DetailScreen} />
            <Stack.Screen name="Design" component={Design} />
            <Stack.Screen name="CreateAcc" component={CreateAcc} />
            <Stack.Screen name="ForgotAcc" component={ForgotAcc} />
            <Stack.Screen name="Routes" component={Routes} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
export default App;