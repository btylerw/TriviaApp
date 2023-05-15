import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, StyleSheet} from "react-native";
import { View, Text } from 'react-native';
import themeContext from "./styles/themeContext";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Leaderboard({ navigation }) {
    const [users, setUsers] = useState([]);
    const theme = useContext(themeContext);

    useEffect(() => {
        getUsers();
    })

    // Retrieves username/scores for all users
    const getUsers = async () => {
        try {
            const response = await axios('http://127.0.0.1:3000/users/allScores');
            let data = response.data;
            
            // Sorts user list by descending order of scores
            data = data.sort((a, b) => {
                if (a.score > b.score) {
                    return -1;
                }
            });
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={{justifyContent: 'center'}}>
            <Text style={{color: theme.color, fontSize: 56, fontWeight: 'bold', padding: 40}}>
                Leaderboard
            </Text>
            {users.map((user, index) => {
                return (
                    <View key={index} style={{alignItems: 'left', flexDirection: 'row', justifyContent: 'left', padding: 5, marginLeft: 40}}>
                        <Text style={{color: theme.color, fontSize: 24, fontWeight: 'bold'}}>{(index+1) + '. ' + user.username + ":"}</Text>
                        <Text style={{color: theme.color, fontSize: 24, fontWeight: 'bold', marginLeft: 40}}>{user.score}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
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