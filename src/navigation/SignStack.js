import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const SignStack = ({ navigation }) => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
        </Stack.Navigator>
    )
};

export default SignStack;
