import React, { createContext, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import { UserContext } from './UserContext';


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
    <SafeAreaView style={styles.container}>
    <SignUpForm />
    <Button
    title="Press"
    onPress = {() => null}
    />
  </SafeAreaView>
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

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);
  return (
    <Stack.Navigator>
    {hasUser
    ? 
    <Stack.Screen name='Home' component={LoggedInNavigator} />
    :
    <>
   
    <Stack.Screen name="Log In" component={LogInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
    
    </>
    }
    </Stack.Navigator>
  );
};



const screens = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState(false);
  
  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
        <NavigationContainer>
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