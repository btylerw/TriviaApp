import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Appearance, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native';
import themeContext from './styles/themeContext';
//import styles from '../styles';
import { EventRegister } from 'react-native-event-listeners';
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
    
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background}}>
            <TouchableOpacity onPress={() => navigation.navigate("Questions")} style={styles.button}>
                    <Text style={styles.buttonText}>Go to Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Create Question")} style={styles.button}>
                    <Text style={styles.buttonText}>Create a Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Online Question")} style={styles.button}>
                    <Text style={styles.buttonText}>Online Questions</Text>
            </TouchableOpacity>
            <Switch 
                value={mode} onValueChange={(value) => {
                setMode(value);
                EventRegister.emit("changeTheme", value);
                }} 
            />
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