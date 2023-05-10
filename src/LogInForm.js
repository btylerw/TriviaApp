import React, {useEffect, useState} from 'react';
import {Button, TextInput, Title, HelperText, Text} from 'react-native-paper';
import axios from 'axios';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LogInForm ({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigation = useNavigation();
  console.log(process.env.MONGO_DB_URL);

  const verifyUser = async (username)  => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/users/user/${username}`);
      console.log(response.data);
      setUser(response.data);
      if (response.data.password === password) {
        onLogin();
      } else {
        setPasswordError(true);
      }
    } catch (error) {
      console.error(error);
      setUsernameError(true);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View>
      <Title style={{paddingLeft: 38, fontSize: 24, fontWeight: 'bold'}}>Login</Title>
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={text => setUsername(text)}
        error={usernameError}
      />
      {usernameError && <HelperText type="error">Username not found</HelperText>}

      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor={'grey'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        error={passwordError}
      />
      {passwordError && <HelperText type="error">Incorrect password</HelperText>}

      <TouchableOpacity style={styles.button} onPress={() => verifyUser(username)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Text style={{paddingRight: 5, fontSize: 20}}>Need an account?</Text>
      <TouchableOpacity onPress={handleSignUp} style={{}}>
        <Text style={{fontSize: 20, color: 'blue'}}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
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

export default LogInForm;