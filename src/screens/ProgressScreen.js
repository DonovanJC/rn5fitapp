import React from "react";
import { View, Text, StatusBar } from "react-native";
const ProgressScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text>Progress Screen</Text>
        </View>
    );
};

export default ProgressScreen;