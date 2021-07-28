import React from "react";
import { Button, View, Text } from "react-native";

const DetailsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Detail Screen</Text>
            <Button
                title='Go to Details Screen AGAINNN'
                onPress={() => navigation.push('Details')} />
            <Button
                title='Go to Home Screen'
                onPress={() => navigation.navigate('Home')} />
            <Button
                title='Go Back'
                onPress={() => navigation.goBack()} />
            <Button
                title='Go to First Screen'
                onPress={() => navigation.popToTop()} />
        </View>
    );
};

export default DetailsScreen;