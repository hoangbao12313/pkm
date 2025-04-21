import React from 'react';
import Pokemon from '../components/Pokemon';
import Cafe from '../components/Cafe';
import Design from '../android/excersise3/Design';
import CreateAcc from '../android/excersise3/CreateAcc';
import ForgotAcc from '../android/excersise3/ForgotAcc';
import Project1 from '../LAB1/Project1';
import Project2 from '../LAB1/Project2';
import Project3 from '../LAB1/Project3';
import Project4 from '../LAB1/Project4';
import Project5 from '../LAB1/Project5';
import Project6 from '../LAB1/Project6';
import Project7 from '../LAB1//Project7';
import Project8 from '../LAB1/Project8';
export default function DetailScreen({ route }) {
  const { componentName } = route.params;

  const componentsMap = {
    Pokemon: <Pokemon />,
    Cafe: <Cafe />,
    Design: <Design />,
    CreateAcc: <CreateAcc />,
    ForgotAcc: <ForgotAcc />,
    Project1: <Project1 />,
    Project2: <Project2 />,
    Project3: <Project3 />,
    Project4: <Project4 />,
    Project5: <Project5 />,
    Project6: <Project6/>,
    Project7: <Project7 />,
    Project8: <Project8 />,
  };

  return componentsMap[componentName] || null;
}
