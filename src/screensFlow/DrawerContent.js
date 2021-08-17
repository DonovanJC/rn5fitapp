import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar, Title, Caption, Paragraph, Drawer,
    Text, TouchableRipple, Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthProvider';

export function DrawerContent(props) {

    const { user, logout } = React.useContext(AuthContext)

    const [isDarkTheme, setisDarkTheme] = React.useState(false);

    // const { signOut } = React.useContext(AuthContext);

    const toggleTheme = () => {
        setisDarkTheme(!isDarkTheme);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: 'https://www.w3schools.com/w3images/avatar5.png' }}
                                size={50}
                            />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{user.email}</Title>
                                <Caption styles={styles.caption}>User ID</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='home-outline'
                                    color={'#6e45e6'}
                                    size={size} />
                            )}
                            label='Home'
                            onPress={() => { props.navigation.navigate('Home') }}
                            style={{ marginTop: 10 }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name='park'
                                    color={'#6e45e6'}
                                    size={size} />
                            )}
                            label='Explore'
                            onPress={() => { props.navigation.navigate('Explore') }}
                            style={{ marginTop: 10 }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='account-outline'
                                    color={'#6e45e6'}
                                    size={size} />
                            )}
                            label='Profile'
                            onPress={() => { props.navigation.navigate('Profile') }}
                            style={{ marginTop: 10 }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='eye-settings-outline'
                                    color={'#6e45e6'}
                                    size={size} />
                            )}
                            label='BMI | BMR Calculator'
                            onPress={() => { props.navigation.navigate('Calculator') }}
                            style={{ marginTop: 10 }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons
                                    name='calculator'
                                    color={'#6e45e6'}
                                    size={size} />
                            )}
                            label='Progress'
                            onPress={() => { props.navigation.navigate('Progress') }}
                            style={{ marginTop: 10 }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title='Preferences' style={{ marginTop: 15, borderColor:'#6e45e6' }}>
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text style={{color:'#6e45e6'}}>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={isDarkTheme} color='#6e45e6' />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name='exit-to-app'
                            color='#6e45e6'
                            size={size} />
                    )}
                    label='Sign Out'
                    onPress={() => logout()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 20,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    bottomDrawerSection: {
        marginBottom: 25,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 16
    }
});