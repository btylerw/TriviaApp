import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, StyleSheet} from "react-native";
import { View, Text } from 'react-native';
import themeContext from "./styles/themeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Questions({ navigation }) {
  const theme = useContext(themeContext);
  const [quest, setQuest] = useState([]);
  const [corrAns, setCorr] = useState([]);
  const [incorr1, setIncorr1] = useState([]);
  const [incorr2, setIncorr2] = useState([]);
  const [incorr3, setIncorr3] = useState([]);
  const [rightTheme, setRightTheme] = useState(false);
  const [wrongTheme, setWrongTheme] = useState(false);
  const [done, setDone] = useState(false);
  const [qcount, setQCount] = useState(0);
  const [pushed, setPushed] = useState('');
  const [username, setUsername] = useState('');
  var options = [];
  const [newscore, setNewScore] = useState(0);


  // Call to retrieve username from AsyncStorage
  const getUser = async () => {
    return new Promise((resolve, reject) => {
      const value = AsyncStorage.getItem('username')
        .then(value => setUsername(value))
        .then(username => resolve(username))
        .catch(error => reject(error));
      // Calls getScore after completion to ensure username is set before score is
      getScore();
    }) 
  };

  // Checks if answer is correct or incorrect and updates newscore
  const checkAnswer = (option, index) => {
    if (option === corrAns) {
      setRightTheme(!rightTheme);
      setNewScore(newscore+10);
    } else {
      setWrongTheme(!wrongTheme);
      setNewScore(newscore-10);
      if (newscore < 0) {
        setNewScore(0);
      }
    }
    setPushed(index);
    console.log(pushed);
  };

  // Checks which button was pushed and will change text accordingly
  const changeText = (option, index ) => {
    if (rightTheme && option === corrAns && index === pushed) {
      return 'Correct!';
    } else if (wrongTheme && option != corrAns && index === pushed) {
      return 'Incorrect!';
    } else {
      return option;
    }
  };

  // Checks which button was pushed and will change button color accordingly
  const changeColor = (option, index) => {
    if (rightTheme && option === corrAns && index === pushed) {
      return 'green';
    } else if (wrongTheme && option != corrAns && index === pushed) {
      return 'red';
    } else {
      return styles.button.backgroundColor;
    }
  }

  // Gets information in useEffect to only run once per refresh
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
    getUser();
    fetchdata();
    });
    return focusHandler
  }, [navigation]);

  const checknext = () => {
    console.log("Test" + qcount);
    if (done) {
      return 'Submit'
    } else {
      return 'Next Question'
    }
  }

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

  const getScore = async () => {
    try {
      // Calls backend API using current username
      const response = await axios.get(`http://127.0.0.1:3000/users/score/${username}`);
      // Saves retrieved score value into newscore
      setNewScore(response.data.score);
    } catch (error) {
      console.error(error);
    }
  };

  const sendScore = async (username, newscore) => {
    try {
      // Sends username and score to backend to be updated to database
        const response = await axios.post('http://127.0.0.1:3000/users/sendScores', {
            username,
            newscore,
        });
        alert('Score saved!');
    } catch (error) {
        console.error(error);
    }
  }

  // Pseudo randomization of questions
  options.push(corrAns, incorr1, incorr2, incorr3);
  options.sort();


  const next_question = () => {
    setQCount(qcount+1);
    if (qcount === 3) {
      setDone(true);
    }
    fetchdata();
    setRightTheme(false);
    setWrongTheme(false);
    setPushed('');
    console.log(qcount);
    console.log(done);
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
        <TouchableOpacity style={styles.button} onPress={next_question}>
          <Text style={styles.buttonText}>
            {checknext}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => sendScore(username, newscore)}>
          <Text style={styles.buttonText}>
            Submit Score
          </Text>
        </TouchableOpacity>
      </View>
  )};
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
              <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} onPress={next_question}>
                  Next Question
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} onPress={() => sendScore(username, newscore)}>
                  Submit
                </Text>
              </TouchableOpacity>
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