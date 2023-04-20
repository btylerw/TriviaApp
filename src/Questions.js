import React, { useState, useEffect } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, Button, Switch } from 'react-native';
import styles from '../styles'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios';


const TRIVIA_QUESTION = "What is the capital of France?";
const Stack = createStackNavigator();

export default function Questions({ navigation }) {
  const [quest, setQuest] = useState([]);
  const [corrAns, setCorr] = useState([]);
  const [incorr1, setIncorr1] = useState([]);
  const [incorr2, setIncorr2] = useState([]);
  const [incorr3, setIncorr3] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      // Grabs question info from api
      let response = await axios.get('http://127.0.0.1:3000/getQuestions');
      // Gets number of JSON elements in array
      var count = Object.keys(response.data.allQuestions).length;
      // Selects random element in array
      var i = Math.floor(Math.random() * count);
      // Sets variables to JSON element object values
      setQuest(response.data.allQuestions[i].Question);
      setCorr(response.data.allQuestions[i].correctAns);
      setIncorr1(response.data.allQuestions[i].incorrectAns1);
      setIncorr2(response.data.allQuestions[i].incorrectAns2);
      setIncorr3(response.data.allQuestions[i].incorrectAns3);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(quest);
  console.log(corrAns);
  console.log(incorr1);
  console.log(incorr2);
  console.log(incorr3);

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
              <Text style={{ fontSize: 24, color: DarkMode ? '#000000' : '#ffffff' }}>{quest}</Text>
                <TouchableOpacity onPress={btn1}>
                  <View style={styles.button} backgroundColor={Button1 ? styles.button.backgroundColor : 'green'}>
                    <Text style={{fontSize: 18}}>{Button1 ? corrAns : "Correct!"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn2}>
                  <View style={styles.button} backgroundColor={Button2 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button2 ? incorr1 : "Incorrect"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn3}>
                  <View style={styles.button} backgroundColor={Button3 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button3 ? incorr2 : "Incorrect"} </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={btn4}>
                  <View style={styles.button} backgroundColor={Button4 ? styles.button.backgroundColor : 'red'}>
                    <Text style={{fontSize: 18}}>{Button4 ? incorr3 : "Incorrect"} </Text>
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
