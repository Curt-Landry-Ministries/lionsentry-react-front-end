// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../interface/screens/Onboarding/WelcomeScreen';
import Onboarding from '../interface/screens/Onboarding/Onboarding';
import CreateAccountEnterName from '../interface/screens/Onboarding/CreateAccountEnterName';
import CreateAccountEnterEmailPassword from '../interface/screens/Onboarding/CreateAccountEnterEmailPassword';

const Stack = createNativeStackNavigator();

// This is where we define navigation in our applicaiton - all screens that we want to use must be added in here. 

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="CreateAccountEnterName" component={CreateAccountEnterName} />
      <Stack.Screen name="CreateAccountEnterEmailPassword" component={CreateAccountEnterEmailPassword} />


      {/* Define other screens */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
