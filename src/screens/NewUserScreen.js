import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import Firebase from "../database/firebase";
import { Ionicons } from "@expo/vector-icons";
import Moment from "moment";

const db = Firebase.firestore();

const NewUserScreen = ({ navigation }) => {
    const { user } = React.useContext(AuthContext);
    const { setCheckNewUser } = React.useContext(AuthContext);
    const [height, setHeight] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [surname, setSurname] = React.useState(null);
    const [age, setAge] = React.useState(null);

    const addUserInfo = async () => {
        let date = new Date();
        date = Moment(date).format('d MMM');

        await db.collection('usersInfo').doc(user.uid)
            .set({
                name: name,
                surname: surname,
                age: age,
                height: [{ height, postTime: date }],
                weight: [{ weight, postTime: date }],
                userId: user.uid,
                email: user.email
            })
            .then(() => {
                Alert.alert('Your information has been added!');
                setCheckNewUser(false);
                // navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>WELCOME!!!</Text>
                <Text style={styles.title2}>We need some details about you</Text>

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    onChangeText={(val) => setName(val)} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Surname"
                    onChangeText={(val) => setSurname(val)} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Age"
                    keyboardType='numeric'
                    onChangeText={(val) => setAge(val)} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Height (cm)"
                    keyboardType='numeric'
                    onChangeText={(val) => setHeight(val)} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Weight (kg)"
                    keyboardType='numeric'
                    onChangeText={(val) => setWeight(val)} />

                <TouchableOpacity onPress={() => {
                    if (height && weight && name && surname && age) {
                        addUserInfo();
                    }
                    else {
                        Alert.alert('You must fill every field')
                    }
                }}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Add Info</Text>
                        <Ionicons name='create-outline' size={60} color='white' />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default NewUserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        paddingTop: 40,
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
    },
    title2: {
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        margin: 15,
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '60%'
    },
    button: {
        height: 100,
        width: '80%',
        backgroundColor: '#6e45e6',
        padding: 20,
        marginBottom: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    }
})