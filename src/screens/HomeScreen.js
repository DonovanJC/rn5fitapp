import React from "react";
import { Button, View, Text } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

const HomeScreen = ({ navigation }) => {
    const {user} = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>
                {user.uid}
            </Text>
        </View>
    );
};

export default HomeScreen;