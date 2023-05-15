import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { SafeAreaView, StyleSheet, Text, View, Button, Appearance } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import HomeScreen from './HomeScreen';
import Questions from './Questions';
import CreateQuestion from './CreateQuestion';
import OnlineQuestions from './OnlineQuestion';
import themeContext from './styles/themeContext';
import { UserContext } from './UserContext';
import { DefaultTheme } from 'react-native-paper';
import Leaderboard from './Leaderboard';


// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false, 
  setUser: () => {},
});
// export const choice = createContext({
//   hasChoice: false, 
//   setChoice: () => {},
// });


const SignUpScreen = () => {
  return (
    <SignUpForm />
  );
};

const LogInScreen = () => {
  const {setUser} = useContext(AuthContext);
  const handleSucessfulLogin = () => {
    setUser(true);
  };

  return (
    <SafeAreaView>
      <LogInForm onLogin={handleSucessfulLogin}/>
      
    </SafeAreaView>
  );
};

const ProfileScreen = () => {

  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

const LoggedInNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={ProfileScreen} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};




const Stack = createStackNavigator();
// Defines available screens
export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {hasUser
        ? 
        <Stack.Screen name='Home' component={HomeScreen} />
        :
        <>
      
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </>
    }
    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="Create Question" component={CreateQuestion} />
    <Stack.Screen name="Online Question" component={OnlineQuestions} />
    <Stack.Screen name="Leaderboard" component={Leaderboard}/>
    <Stack.Screen name="Log In" component={LogInScreen}/>
    </Stack.Navigator>
  );
};


const screens = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    // Entire app is wrapped with theme context to switch between dark mode and light mode
    <AuthContext.Provider value={{ hasUser, setUser }}>
        <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
          <AppNavigator />
        </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default screens;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});