import React, {useEffect} from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider";
import { Ionicons } from "@expo/vector-icons";

import Firebase from "../database/firebase";

const db = Firebase.firestore();
const auth = Firebase.auth();

// const getFood = async () => {
//     try {
//         const response = await fetch(
//             'https://trackapi.nutritionix.com/v2/search/instant?query=rice',
//             {
//                 headers: {
//                     "x-app-id": "9cff23e8",
//                     "x-app-key": "7a99a3c231be486fbe32cfdd0b96584a"
//                 },
//             });
//         const json = await response.json();
//         console.log(json.common);
//     } catch (e) {
//         console.log(e);
//     }
// }



const HomeScreen = ({ navigation }) => {

    const { checkRoutines } = React.useContext(AuthContext);
    const { fetchRoutines } = React.useContext(AuthContext);
    const { fetchUserInfo } = React.useContext(AuthContext); 

    useFocusEffect(
        React.useCallback(() => {
            fetchRoutines();
            fetchUserInfo();
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, backgroundColor: 'white', paddingTop: 50 }}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <TouchableOpacity onPress={() => { navigation.navigate('Exercises List') }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Exercises List</Text>
                    <Ionicons name='list' size={100} color='white' />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Create Routine') }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Create a Routine</Text>
                    <Ionicons name='create-outline' size={100} color='white' />
                </View>
            </TouchableOpacity>
            {checkRoutines == 0 ?
                <TouchableOpacity onPress={() => Alert.alert("You don't have any routine created. Please create a routine.")}>
                    <View style={styles.buttonDisabled}>
                        <Text style={styles.text}>View My Routines</Text>
                        <Ionicons name='create-outline' size={100} color='white' />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => navigation.navigate('My Routines')}>
                    <View style={styles.button}>
                        <Text style={styles.text}>View My Routines</Text>
                        <Ionicons name='create-outline' size={100} color='white' />
                    </View>
                </TouchableOpacity>
            }


            {/* <Button title='Create Routine' onPress={() => {
                getFood();
            }} /> */}
        </View >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    button: {
        height: 180,
        width: '100%',
        backgroundColor: '#6e45e6',
        padding: 30,
        marginBottom: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonDisabled: {
        height: 180,
        width: '100%',
        backgroundColor: 'grey',
        padding: 30,
        marginBottom: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    }
})