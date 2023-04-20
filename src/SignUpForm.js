import React, {useState} from 'react';
import {Button, TextInput, Title, HelperText} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

  const handleSignUp = async (username, email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/signup', {
        username,
        email,
        password,
      });
      console.log(response.data);

    } catch (error) {
      console.error(error);
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
    <>
      <Title>Sign Up</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={validateUsername}
      />
      <HelperText type="error" visible={usernameError}>
        Invalid username. Use only letters and numbers.
      </HelperText>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={emailError}>
        Invalid email. Please enter a valid email address.
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
      />
      <HelperText type="error" visible={passwordError}>
        Invalid password. Do not use semicolon, slashes, and special characters.
      </HelperText>
      <Button mode="contained" onPress={() => handleSignUp(username,email,password)}>
        Sign Up
      </Button>
      <Button mode="contained" onPress={() => null}>
        Print
      </Button>
    </>
  );
};

export default SignUpForm;
