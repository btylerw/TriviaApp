import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import themeContext from './styles/themeContext';

export default function OnlineQuestions() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState('');
  const [rightTheme, setRightTheme] = useState(false);
  const [wrongTheme, setWrongTheme] = useState(false);
  const [pushed, setPushed] = useState('');
  const theme = useContext(themeContext);


  const checkAnswer = (option, ans, index) => {
    if (option === ans) {
      setRightTheme(!rightTheme);
    } else {
      setWrongTheme(!wrongTheme);
    }
    setPushed(index);
    console.log(pushed);
  };

  const changeText = (option, ans, index ) => {
    if (rightTheme && option === ans && index === pushed) {
      return 'Correct!';
    } else if (wrongTheme && option != ans && index === pushed) {
      return 'Incorrect!';
    } else {
      return option;
    }
  };

  const changeColor = (option, ans, index) => {
    if (rightTheme && option === ans && index === pushed) {
      return 'green';
    } else if (wrongTheme && option != ans && index === pushed) {
      return 'red';
    } else {
      return styles.button.backgroundColor;
    }
  }
  const request = `https://the-trivia-api.com/v2/questions?limit=1&categories=${categories}&difficulties=easy,medium&tags=${categories}&types=text_choice`;

  useEffect(() => {
    if (categories) {
      fetchQuestions();
    }
  }, [categories]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(request);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const create = (cat) => {
    setCategories(cat);
  };

  const renderItem = ({ item }) => {
    //Fake sort that does places the answer in different order
    const options = [item.correctAnswer, ...item.incorrectAnswers].sort();
    const ans = item.correctAnswer;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250, backgroundColor: theme.background}}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: theme.color }}>{item.question.text}</Text>
        {options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => checkAnswer(option, ans, index)}>
            <View style={styles.button} backgroundColor={changeColor(option, ans, index)}>
              <Text style={styles.buttonText}>{changeText(option, ans, index)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    //<SafeAreaView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background}}>
        {isLoading ? (
        <>
          <TouchableOpacity style={styles.button} onPress={() => create('science')}>
            <Text style={styles.buttonText}>Science</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => create('geography')}>
            <Text style={styles.buttonText}>Geography</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => create('general_knowledge')}>
            <Text style={styles.buttonText}>General</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => create('events')}>
            <Text style={styles.buttonText}>Events</Text>
          </TouchableOpacity>
        </>
        ) : (
          <FlatList data={data} keyExtractor={({ id }) => id} renderItem={renderItem} />
        )}
      </View>
    //</SafeAreaView>
  );
}

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