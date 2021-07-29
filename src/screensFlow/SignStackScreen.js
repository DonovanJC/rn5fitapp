import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const SignStack = createStackNavigator();

const SignStackScreen = ({navigation}) => (
    <SignStack.Navigator headerMode='none'>
        <SignStack.Screen name='Splash' component={SplashScreen} />
        <SignStack.Screen name='SignIn' component={SignInScreen} />
        <SignStack.Screen name='SignUp' component={SignUpScreen} />
    </SignStack.Navigator>
);

export default SignStackScreen;
