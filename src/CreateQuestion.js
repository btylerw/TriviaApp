import React, { useState, useEffect, useContext } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import axios from 'axios';
import themeContext from "./styles/themeContext";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

export default function CreateQuestion({navigation}) {
    const theme = useContext(themeContext);
    const [Category, setCategory] = useState('');
    const [Question, setQuestion] = useState('');
    const [correctAns, setcorrAns] = useState('');
    const [incorrectAns1, setincorrAns1] = useState('');
    const [incorrectAns2, setincorrAns2] = useState('');
    const [incorrectAns3, setincorrAns3] = useState('');
    // Sets variables for available categroeis
    const data = [
        {key:'Science', value:'Science'},
        {key:'Geography', value:'Geography'},
        {key:'Math', value:'Math'},
    ]

    // Sends question data to backend API to be saved to database
    const sendQuestion = async (Question, correctAns, incorrectAns1, incorrectAns2, incorrectAns3, Category) => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/questions/newQuestions', {
                Question, 
                correctAns, 
                incorrectAns1, 
                incorrectAns2, 
                incorrectAns3, 
                Category,
            });
            console.log(response.data);
            alert('Question registered successfully!')
        } catch (error) {
            alert('Question already exists');
            console.error(error);
        }

    }
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background}}>
        <SelectList /* Dropdown list to select category */
            boxStyles={{width: 300}}
            inputStyles={{color: theme.color, fontSize: 18}}
            dropdownTextStyles={{color: theme.color, fontSize: 18}}
            setSelected={setCategory}
            data={data}
            placeholder='Select Category'
        />
        <View style={{alignItems: 'left', padding: 10}}>
        <TextInput
            style={{padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    borderBottomColor: '#ffffff',
                    color: theme.color}}
            onChangeText={setQuestion}
            value={Question}
            placeholder="Input Question"
            placeholderTextColor={theme.placeholdercolor}
        />
        <TextInput
            style={{alignItems: 'center',
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: theme.color}}
            onChangeText={setcorrAns}
            value={correctAns}
            placeholder="Input Correct Answer"
            placeholderTextColor={theme.placeholdercolor}
        />
        <TextInput
            style={{alignItems: 'center',
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: theme.color}}
            onChangeText={setincorrAns1}
            value={incorrectAns1}
            placeholder="Input Incorrect Answer"
            placeholderTextColor={theme.placeholdercolor}
        />
        <TextInput
            style={{alignItems: 'center',
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: theme.color}}
            onChangeText={setincorrAns2}
            value={incorrectAns2}
            placeholder="Input Incorrect Answer"
            placeholderTextColor={theme.placeholdercolor}
        />
        <TextInput
            style={{alignItems: 'center',
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: theme.color}}
            onChangeText={setincorrAns3}
            value={incorrectAns3}
            placeholder="Input Incorrect Answer"
            placeholderTextColor={theme.placeholdercolor}
        />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={() => sendQuestion(Question, correctAns, incorrectAns1, incorrectAns2,
                                                                            incorrectAns3, Category)}>
            <Text style={styles.buttonText}>Submit Question</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
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