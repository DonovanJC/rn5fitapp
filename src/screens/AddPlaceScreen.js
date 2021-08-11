import React from "react";
import { View, Text } from "react-native";
import Firebase from "../database/firebase";

const db = Firebase.firestore();

const AddPlaceScreen = ({ navigation }) => {

    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    return (
        <View>
            <Text>NEW SCREENSITA</Text>
        </View>
    )
}

export default AddPlaceScreen;