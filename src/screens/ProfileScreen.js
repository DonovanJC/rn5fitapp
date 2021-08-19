import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import Moment from "moment";

const ProfileScreen = ({ navigation }) => {
    const { userInfo } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <View style={{ flexDirection: 'row', padding:5, marginTop:65 }}>
                <View style={{ flexDirection: 'column', borderWidth:1,borderRadius:10, backgroundColor:'#6e45e6' }}>
                    <Text style={styles.text2}>Name: </Text>
                    <Text style={styles.text2}>Surname: </Text>
                    <Text style={styles.text2}>Your Email: </Text>
                    <Text style={styles.text2}>Age: </Text>
                    <Text style={styles.text2}>Current Weight: </Text>
                    <Text style={styles.text2}>Current Height: </Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems:'flex-start' }}>
                    <Text style={styles.text}>{userInfo.name}</Text>
                    <Text style={styles.text}>{userInfo.surname}</Text>
                    <Text style={styles.text}>{userInfo.email}</Text>
                    <Text style={styles.text}>{userInfo.age}</Text>
                    <Text style={styles.text}>{userInfo.weight[userInfo.weight.length - 1].weight}</Text>
                    <Text style={styles.text}>{userInfo.height[userInfo.height.length - 1].height}</Text>
                </View>
            </View>
        </View >
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    text:{
        padding: 35,
        fontSize:14
    },
    text2:{
        padding: 35,
        fontSize:14,
        fontWeight:'bold',
        color:'white'
    }
})