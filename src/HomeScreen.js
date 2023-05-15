import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Appearance, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native';
import themeContext from './styles/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import styles from '../styles';
import { EventRegister } from 'react-native-event-listeners';
import { useFonts } from 'expo-font';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');

    // Gets current username variable from AsyncStorage
    const getUser = async () => {
      return new Promise((resolve, reject) => {
        const value = AsyncStorage.getItem('username')
          .then(value => setUsername(value))
          .then(username => resolve(username))
          .catch(error => reject(error));
        getScore();
      }) 
    };

    // Calls functions to retrieve information once ever refresh
    useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        getUser();
        console.log(username);
      });
      return focusHandler;
    }, [navigation]);



    // Retrieves current user's score from backend API
    const getScore = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/score/${username}`);
        console.log(response.data);
        setScore(response.data.score);
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background}}>
            <Text style={{color: theme.color, fontSize: 24, fontWeight: 'bold', paddingBottom: 20}}>Hello {username}!</Text>
            <Text style={{color: theme.color, fontSize: 24, fontWeight: 'bold', paddingBottom: 20}}>Score: {score}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Questions")} style={styles.button}>
                    <Text style={styles.buttonText}>Go to Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Create Question")} style={styles.button}>
                    <Text style={styles.buttonText}>Create a Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Online Question")} style={styles.button}>
                    <Text style={styles.buttonText}>Online Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")} style={styles.button}>
                    <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: theme.color, fontSize: 24, fontWeight: 'bold'}}>{mode ? 'Light Mode: ' : 'Dark Mode: '}</Text>
            <Switch 
                // Switch that allows user to change between dark and light modes
                value={mode} onValueChange={(value) => {
                setMode(value);
                EventRegister.emit("changeTheme", value);
                }} 
            />
            </View>
            
        </View>
    )
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
    },
    button: {
      width: 350,
      height: 50,
      backgroundColor: '#aa77ff',
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
  });