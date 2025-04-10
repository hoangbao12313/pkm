// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Pokemo from './components/pokemon';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <Pokemo />
    </SafeAreaView>
  );
};

export default App;
