import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Questions")}>
                <View style={styles.button} backgroundColor={styles.button.backgroundColor}>
                    <Text style={{fontSize: 18}}>Go to Questions</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}