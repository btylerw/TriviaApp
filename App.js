import React, { useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, Button, Switch } from 'react-native';
import styles from './styles'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Provider as PaperProvider} from 'react-native-paper';
import Navigator from './src/Navigator';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};


