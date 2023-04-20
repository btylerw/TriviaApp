import React, {useState} from 'react';
import {Button, TextInput, Title, HelperText} from 'react-native-paper';
import axios from 'axios';

const LogInForm = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const verifyUser = async (username)  => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/users/user/${username}`);
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

  return (
    <>
      <Title>Log In</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        error={usernameError}
      />
      {usernameError && <HelperText type="error">Username not found</HelperText>}

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        error={passwordError}
      />
      {passwordError && <HelperText type="error">Incorrect password</HelperText>}

      <Button mode="contained" onPress={() => verifyUser(username)}>
        Log In
      </Button>
    </>
  );
};

export default LogInForm;
