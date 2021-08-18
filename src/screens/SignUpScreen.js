import React from "react";
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    Dimensions, Platform, TextInput, StatusBar, Keyboard, TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthProvider";

import Firebase from "../database/firebase";

const auth = Firebase.auth();

const SignUpScreen = ({ navigation }) => {

    const { register } = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    });

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        }
        else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const handleValidEmail = (val) => {
        console.log(val);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const check = re.test(String(val.trim()).toLowerCase());
        console.log(check);
        if (check) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail: true,
            })
        }
        else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail: false
            })
        }
    }

    const handleValidPassword = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleValidConfirmPassword = (val) => {
        if (val.trim().length > 0 && val.trim() == data.password.trim()) {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true
            })
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#6e45e6' barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                    <Text>Please Create your account</Text>
                </View>
                <Animatable.View style={styles.footer}
                    animation='fadeInUpBig'
                >
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name='user-o'
                            color='#05375a'
                            size={20}
                        />
                        <TextInput
                            placeholder='Your Email'
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(val) => handleValidEmail(val.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation='bounceIn'
                            >
                                <Feather
                                    name='check-circle'
                                    color='green'
                                    szie={20}
                                />
                            </Animatable.View>
                            : null
                        }

                    </View>
                    {data.isValidEmail ? null
                        :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Please enter a valid email</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name='lock'
                            color='#05375a'
                            size={20}
                        />
                        <TextInput
                            placeholder='Your Password'
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => handlePasswordChange(val)}
                            onEndEditing={(val) => handleValidPassword(val.nativeEvent.text)}
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ?
                                <Feather
                                    name='eye-off'
                                    color='grey'
                                    szie={20}
                                />
                                :
                                <Feather
                                    name='eye'
                                    color='grey'
                                    szie={20}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null
                        :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name='lock'
                            color='#05375a'
                            size={20}
                        />
                        <TextInput
                            placeholder='Confirm your password'
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            onEndEditing={(val) => handleValidConfirmPassword(val.nativeEvent.text)}
                        />
                        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                            {data.confirm_secureTextEntry ?
                                <Feather
                                    name='eye-off'
                                    color='grey'
                                    szie={20}
                                />
                                :
                                <Feather
                                    name='eye'
                                    color='grey'
                                    szie={20}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    {data.isValidConfirmPassword ? null
                        :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Confirm password must be the same.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                data.isValidEmail && data.isValidPassword && data.isValidConfirmPassword ? register(data.email, data.password)
                                    : null
                            }}
                        >
                            <LinearGradient
                                colors={['#6e45e6', '#5c2de3']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign], {
                                    color: '#fff'
                                }}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                            style={[styles.signIn, {
                                borderColor: '#6e45e6',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#6e45e6'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6e45e6'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});