import React from "react";
import { Button, View, Text } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

import Firebase from "../database/firebase";

const db = Firebase.firestore()

const HomeScreen = ({ navigation }) => {
    const { user } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>
                {user.uid}
            </Text>
            <Button title='Exercises List' onPress={() => { navigation.navigate('Exercises List') }} />
            <Button title='Create Routine' onPress={() => { navigation.navigate('Create Routine') }} />
        </View>
    );
};

export default HomeScreen;