import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthenticationNavigator} from './src/components/Auth';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DashboardNavigator} from './src/components/Dashboard';
import {useFonts} from 'expo-font';


const AppStack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    'Poppins-SemiBold': require('./src/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./src/fonts/Poppins-Regular.ttf')
  });

  if(!loaded){
    return null;
  }
  return (
    <ThemeProvider {...{theme}}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStack.Navigator
          // headerShown= "false"
            headerMode= "none"
            initialRouteName="Authentication">
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="Dashboard" component={DashboardNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
