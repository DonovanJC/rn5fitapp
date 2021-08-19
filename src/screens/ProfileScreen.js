import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

const ProfileScreen = ({ navigation }) => {
    const {userInfo} = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems:'flex-start', justifyContent: 'space-around', padding:20 }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            
            <View style={{flexDirection:'row'}}>
                <Text>Name: </Text>
                <Text>{userInfo.name}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>Surname: </Text>
                <Text>{userInfo.surname}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>Your Email: </Text>
                <Text>{userInfo.email}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>Age: </Text>
                <Text>{userInfo.age}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>Current Weight: </Text>
                <Text>{userInfo.weight[userInfo.weight.length-1]}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>Current Height: </Text>
                <Text>{userInfo.height[userInfo.height.length-1]}</Text>
            </View>

        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
})