// App.tsx
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Design from './android/excersise3/Design';
import CreateAcc from './android/excersise3/CreateAcc';
import ForgotAcc from './android/excersise3/ForgotAcc';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
         initialRouteName="Design"
         screenOptions={{headerShown: false}}
         >
          <Stack.Screen name="Design" component={Design} />
          <Stack.Screen
            name="CreateAcc"
            component={CreateAcc}
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="ForgotAcc" component={ForgotAcc} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
