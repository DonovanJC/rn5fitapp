import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        activeColor='white'
        barStyle={{ backgroundColor: '#aa80ff' }}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#aa80ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={35}
                    backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </HomeStack.Navigator>
);

const ExploreStackScreen = ({ navigation }) => (
    <ExploreStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#aa80ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name='Explore' component={ExploreScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={35}
                    backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </ExploreStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#aa80ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={35}
                    backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </ProfileStack.Navigator>
);


