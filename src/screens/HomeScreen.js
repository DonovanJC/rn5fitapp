import React from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { Ionicons } from "@expo/vector-icons";

import Firebase from "../database/firebase";

const db = Firebase.firestore()

const HomeScreen = ({ navigation }) => {
    const { user } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:10, backgroundColor:'white' }}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <TouchableOpacity onPress={() => { navigation.navigate('Exercises List') }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Exercises List</Text>
                    <Ionicons name='list' size={100} color='white'/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Create Routine') }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Create a Routine</Text>
                    <Ionicons name='create-outline' size={100} color='white'/>
                </View>
            </TouchableOpacity>
            {/* <Text>Home Screen</Text>
            <Text>
                {user.uid}
            </Text>
            <Button title='Exercises List' onPress={() => { navigation.navigate('Exercises List') }} />
            <Button title='Create Routine' onPress={() => { navigation.navigate('Create Routine') }} /> */}
        </View >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    button: {
        height: 200,
        width: '100%',
        backgroundColor: '#6e45e6',
        padding: 30,
        marginBottom: 10,
        borderRadius: 20,
        alignItems:'center',
    },
    text: {
        fontSize: 30,
        fontWeight:'bold',
        color:'white'
    }
})