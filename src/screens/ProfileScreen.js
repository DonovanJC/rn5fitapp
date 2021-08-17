import React from "react";
import { View, Text, StatusBar } from "react-native";
const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text>Profile Screen</Text>
        </View>
    );
};

export default ProfileScreen;