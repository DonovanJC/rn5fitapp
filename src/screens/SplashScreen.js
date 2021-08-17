import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#6e45e6' barStyle='light-content' />
            <View style={styles.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duraton='1500'
                    source={require('../../assets/fitLogo2.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <Text style={styles.title}>Stay Connected with everyone!!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <LinearGradient
                            colors={['#6e45e6', '#5c2de3']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons name='navigate-next' color='#fff' size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6e45e6'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});