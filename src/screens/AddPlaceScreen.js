import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Firebase from "../database/firebase";
import Geocoder from "react-native-geocoding";

const db = Firebase.firestore();
Geocoder.init("AIzaSyASYLMRcWSSxC_QbznjGA0hNRkl4-OjE_A");

const AddPlaceScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        street: "",
        number: "",
        postCode: ""
    })

    let location

    return (
        <View>
            <Text>Add a New Place</Text>
            <Text>Street</Text>
            <TextInput
                placeholder="Enter the street"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, street: val })}
            />

            <Text>Number</Text>
            <TextInput
                placeholder="Enter the street number"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, number: val })}
            />

            <Text>PostCode</Text>
            <TextInput
                placeholder="Enter the postcode"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, postCode: val })}
            />

            <Button title="GET COORDINATES" onPress={() => {
                let fulladdress = data.street + " " +  data.number + " " + data.postCode
                Geocoder.from(fulladdress)
                    .then(json => {
                        var location = json.results[0].geometry.location;
                        console.log(location);
                    })
                    .catch(error => console.warn(error));
            }
            } />
        </View>
    )
}

export default AddPlaceScreen;

const styles = StyleSheet.create({
    // textInput: {
    //     flex: 1,
    //     marginTop: Platform.OS === 'ios' ? 0 : -12,
    //     paddingLeft: 10,
    //     color: '#05375a',
    // }
})