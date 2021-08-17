import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from '../screensFlow/DrawerContent';
import MainTabScreen from '../screensFlow/MainTabScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CalculatorScreen from '../screens/CalculatorScreen';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const CalculatorStack = createStackNavigator();
const ProgressStack = createStackNavigator();

const AppStack = ({ navigation }) => {

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
            <Drawer.Screen name='Calculator' component={CalculatorStackScreen} />
            <Drawer.Screen name='Progress' component={ProgressStackScreen} />
        </Drawer.Navigator>
    )
}

export default AppStack;

const CalculatorStackScreen = ({ navigation }) => (
    <CalculatorStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'white'
        },
        headerTransparent: true,
        headerTintColor: '#6e45e6',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <CalculatorStack.Screen name='Calculator' component={CalculatorScreen} options={{
            title: 'Calculator', headerTintColor: '#6e45e6',
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={45} color='#6e45e6'
                    backgroundColor='transparent' underlayColor='transparent' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </CalculatorStack.Navigator>
);

const ProgressStackScreen = ({ navigation }) => (
    <ProgressStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'white'
        },
        headerTransparent: true,
        headerTintColor: '#6e45e6',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProgressStack.Screen name='Progress' component={ProgressScreen} options={{
            title: 'Progress', headerTintColor: '#6e45e6',
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={45} color='#6e45e6'
                    backgroundColor='transparent' underlayColor='transparent' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </ProgressStack.Navigator>
);