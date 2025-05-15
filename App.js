import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import { MyContextControllerProvider } from './LAB3/store/Index';

// import MainMenuScreen from './screens/MainMenuScreen';
// import ListScreen from './screens/ListScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import Ex4_DetailScreen from './Exercise4/Ex4_DetailScreen';
// import HomeScreen from './Exercise4/HomeScreen';
// import Profile from './Exercise4/Profile';
// import CustomDrawerBar from './Exercise4/CustomDrawerBar';
// import Pokemon from './components/Pokemon';
// import Cafe from './components/Cafe';
// import Design from '../DemoReactNative/android/Excersise3/Design';
// import CreateAcc from './android/Excersise3/CreateAcc';
// import ForgotAcc from './android/Excersise3/ForgotAcc';
// import Routes from '../DemoReactNative/LAB2/components/Routes';
// import TodoScreen from './android/Exercise5/TodoScreen';
// import Todo from './android/Exercise5/Todo';

import FoodList from './KTGK/screens/FoodList';
import Cart from './KTGK/screens/Cart';
import Login from '../DemoReactNative/KTGK/screens/Login';
import Register from '../DemoReactNative/KTGK/screens/Register';
import Cuisine from './KTGK/screens/Cuisine';
import PaymentSuccess from './KTGK/screens/PaymentSuccess';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const TheoryDrawer = () => (
//   <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
//     <Drawer.Screen name="TheoryHome" component={HomeScreen} />
//     <Drawer.Screen name="TheoryProfile" component={Profile} />
//     <Drawer.Screen name="TheoryDetail" component={Ex4_DetailScreen} />
//     <Drawer.Screen name="Pokemon" component={HomeScreen} />
//     <Drawer.Screen name="Cafe" component={HomeScreen} />
//     <Drawer.Screen name="Design" component={Design} />
//   </Drawer.Navigator>
// );

// const PracticeDrawer = () => (
//   <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
//     <Drawer.Screen name="Project1" component={HomeScreen} />
//     <Drawer.Screen name="Project2" component={HomeScreen} />
//     <Drawer.Screen name="Project3" component={HomeScreen} />
//   </Drawer.Navigator>
// );

function App() {
  return (
    <PaperProvider>
      <MyContextControllerProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="FoodList"
              component={FoodList}
              options={{ title: 'Danh sách món ăn' }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Giỏ hàng' }}
            />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Đăng nhập' }}
              />
             <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: 'Đăng ký' }}
            />
              <Stack.Screen
              name="Cuisine"
              component={Cuisine}
              options={{ title: 'Chọn món' }}
            />
             <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccess}
              options={{ title: 'thanh toan thanh cong' }}
            />
          </Stack.Navigator>
          {/* <Stack.Navigator initialRouteName="Lab3">
            <Stack.Screen name="Lab3" component={Lab3Screen} />
          </Stack.Navigator> */}
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
}

export default App;
