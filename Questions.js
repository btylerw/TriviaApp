import React, { useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, Button, Switch } from 'react-native';
import styles from './styles'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";

const TRIVIA_QUESTION = "What is the capital of France?";
const Stack = createStackNavigator();

export default function Questions({ navigation }) {
    
    // Boolean toggles for each button
    const [Button1, setIsPressed1] = useState(true);
    const [Button2, setIsPressed2] = useState(true);
    const [Button3, setIsPressed3] = useState(true);
    const [Button4, setIsPressed4] = useState(true);
    const [DarkMode, setIsPressed5] = useState(true);
    const btn1 = () => {
        setIsPressed1(!Button1);
    };
    const btn2 = () => {
        setIsPressed2(!Button2);
    };
    const btn3 = () => {
        setIsPressed3(!Button3);
    };
    const btn4 = () => {
        setIsPressed4(!Button4);
    };
    const drkmode = () => {
        setIsPressed5(!DarkMode);
    }
        return (
          
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: DarkMode ? '#ffffff' : '#333333'}}>
              <Text style={{ fontSize: 24, color: DarkMode ? '#000000' : '#ffffff' }}>{TRIVIA_QUESTION}</Text>
                <TouchableOpacity onPress={btn1}>
                  <View style={styles.button} backgroundColor={Button1 ? styles.button.backgroundColor : 'green'}>
                    <Text style={{fontSize: 18}}>{Button1 ? "Paris" : "Correct!"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn2}>
                  <View style={styles.button} backgroundColor={Button2 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button2 ? "Naples" : "Incorrect"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn3}>
                  <View style={styles.button} backgroundColor={Button3 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button3 ? "Nice" : "Incorrect"} </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn4}>
                  <View style={styles.button} backgroundColor={Button4 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button4 ? "Moscow" : "Incorrect"} </Text>
                  </View>
                </TouchableOpacity>
                <Text style={{fontSize: 18, color: DarkMode ? 'black' : 'white'}}>{DarkMode ? "Light Mode" : "Dark Mode"}</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={DarkMode ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={drkmode}
                  value={DarkMode}
                />
            </View>
        );
}
