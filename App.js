import React, { useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, Button, Switch } from 'react-native';
import styles from './styles'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Questions from "./Questions";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Questions" component={Questions}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;

