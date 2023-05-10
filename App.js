import React, { useEffect, useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, Button, Switch, useColorScheme } from 'react-native';
import styles from './styles'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Provider as PaperProvider} from 'react-native-paper';
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./src/styles/themeContext";
import theme from "./src/styles/theme";
import Navigator from './src/Navigator';

const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });
  
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme}>
    <PaperProvider>
      <Navigator />
    </PaperProvider>
    </themeContext.Provider>
  );
};


