import React, { useState, useEffect, useContext } from "react";
import { Touchable, TouchableOpacity, StyleSheet} from "react-native";
import { View, Text, Button, Switch } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import themeContext from "./styles/themeContext";
import axios from 'axios';


const TRIVIA_QUESTION = "What is the capital of France?";
const Stack = createStackNavigator();

export default function Questions({ navigation }) {
  const theme = useContext(themeContext);
  const [quest, setQuest] = useState([]);
  const [corrAns, setCorr] = useState([]);
  const [incorr1, setIncorr1] = useState([]);
  const [incorr2, setIncorr2] = useState([]);
  const [incorr3, setIncorr3] = useState([]);
  const [rightTheme, setRightTheme] = useState(false);
  const [wrongTheme, setWrongTheme] = useState(false);
  const [pushed, setPushed] = useState('');
  var options = [];

  const checkAnswer = (option, index) => {
    if (option === corrAns) {
      setRightTheme(!rightTheme);
    } else {
      setWrongTheme(!wrongTheme);
    }
    setPushed(index);
    console.log(pushed);
  };

  const changeText = (option, index ) => {
    if (rightTheme && option === corrAns && index === pushed) {
      return 'Correct!';
    } else if (wrongTheme && option != corrAns && index === pushed) {
      return 'Incorrect!';
    } else {
      return option;
    }
  };

  const changeColor = (option, index) => {
    if (rightTheme && option === corrAns && index === pushed) {
      return 'green';
    } else if (wrongTheme && option != corrAns && index === pushed) {
      return 'red';
    } else {
      return styles.button.backgroundColor;
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      // Grabs question info from api
      let response = await axios.get('http://127.0.0.1:3000/questions/getQuestions');
      let data = response.data.allQuestions;
      // Gets number of JSON elements in array
      var count = Object.keys(data).length;
      // Selects random element in array
      var i = Math.floor(Math.random() * count);
      // Sets variables to JSON element object values
      setQuest(data[i].Question);
      setCorr(data[i].correctAns);
      setIncorr1(data[i].incorrectAns1);
      setIncorr2(data[i].incorrectAns2);
      setIncorr3(data[i].incorrectAns3);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(quest);
  console.log(corrAns);
  console.log(incorr1);
  console.log(incorr2);
  console.log(incorr3);

  options.push(corrAns, incorr1, incorr2, incorr3);
  options.sort();
  console.log(options);


    // Boolean toggles for each button

    const [Button1, setIsPressed1] = useState(true);
    const [Button2, setIsPressed2] = useState(true);
    const [Button3, setIsPressed3] = useState(true);
    const [Button4, setIsPressed4] = useState(true);
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
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background}}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: theme.color}}>{quest}</Text>
              {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => checkAnswer(option, index)}>
                  <View style={styles.button} backgroundColor={changeColor(option, index)}>
                    <Text style={styles.buttonText}>{changeText(option, index)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
        );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontWeight: 'bold',
    fontSize: 24,
    height: 50,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    marginBottom: 10
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#aa77ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});