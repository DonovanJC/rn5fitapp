import React from "react";
import { View, Text, StatusBar } from "react-native";
const LoadingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6e45e6' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
        </View>
    );
};

export default LoadingScreen;