import React, {useState} from 'react';
import {TextInput, Title, HelperText} from 'react-native-paper';
import { StyleSheet, Touchable, TouchableOpacity, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confpwdError, setConfPwdError] = useState(false);
  const navigation = useNavigation();

  const usernameRegex = /^[a-zA-Z0-9 ]+$/;
  const passwordRegex = /[\;\:\/\\\*\+\?\^\$\{\}\[\]\|]/;

  const validateUsername = (text) => {
    setUsernameError(!usernameRegex.test(text));
    setUsername(text);
  };

  const validateEmail = (text) => {
    const hasAtSignAndDot = text.includes("@") && text.includes(".");
    setEmailError(!hasAtSignAndDot);
    setEmail(text);
  };

  const validatePassword = (text) => {
    setPasswordError(passwordRegex.test(text));
    setPassword(text);
  };
  const userData = {username,email, password};

  const checkpwd = (text) => {
    setConfPwdError(text != password);
    setConfPassword(text);
  };

  const handleSignUp = async (username, email, password) => {
    if (!confpwdError) {
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/signup', {
        username,
        email,
        password,
      });
      console.log(response.data);
      alert("Sign up Successful!");
      navigation.navigate('Login');

    } catch (error) {
      alert('Username already exists');
      console.error(error);
    }
  } else {
    alert('Passwords do not match');
  }
  };
  const printUsers = async ()  => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/users/all');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    

  return (
    <SafeAreaView>
      <Title style={{padding: 38, marginBottom: -35, fontSize: 24, fontWeight: 'bold'}}>Sign Up</Title>
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={validateUsername}
      />
      <HelperText type="error" visible={usernameError}>
        Invalid username. Use only letters and numbers.
      </HelperText>
      
      <TextInput
        placeholder='Email'
        placeholderTextColor={'grey'}
        value={email}
        style={styles.input}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={emailError}>
        Invalid email. Please enter a valid email address.
      </HelperText>

      <TextInput
        placeholder='Password'
        placeholderTextColor={'grey'}
        value={password}
        style={styles.input}
        onChangeText={validatePassword}
        secureTextEntry
      />
      <HelperText type="error" visible={passwordError}>
        Invalid password. Do not use semicolon, slashes, and special characters.
      </HelperText>
      <TextInput
        placeholder='Confirm Password'
        placeholderTextColor={'grey'}
        value={confpassword}
        style={{    
          fontWeight: 'bold',
          fontSize: 24,
          height: 50,
          width: 350,
          padding: 10,
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: 5,
          marginTop: -20
        }}
        onChangeText={checkpwd}
        secureTextEntry
      />
      <HelperText type="error" visible={confpwdError}>
        Passwords do not match.
      </HelperText>

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp(username,email,password)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

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
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});


export default SignUpForm;
