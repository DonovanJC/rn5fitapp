import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { List, Modal, DefaultTheme } from 'react-native-paper';
import {
    View, Text, ActivityIndicator, ScrollView,
    StyleSheet, FlatList, Image, LogBox, StatusBar
} from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';

import Firebase from '../database/firebase';
const db = Firebase.firestore();
const theme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        accent: 'black',
        background: '#6e45e6',
        text: 'white'
    },
};
const theme2 = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6e45e6',
        accent: '#6e45e6',
        background: 'white',
        text: '#6e45e6'
    },
};

const ExercisesList = () => {
    const { isLoading } = React.useContext(AuthContext);
    const { exercises } = React.useContext(AuthContext);
    const [visible, setVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

///Toggle Modal for clicked exercise
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            {isLoading ?
                <View >
                    <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                    <ActivityIndicator size='large' color="#0000ff" />
                </View>
                :
                <View>
                    <ScrollView>
                        <List.AccordionGroup>
                            <List.Accordion
                                title="Chest"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='1'>
                                {exercises.chest.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Back"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='2'>
                                {exercises.back.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Legs"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='3'>
                                {exercises.legs.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Shoulder"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='4'>
                                {exercises.shoulder.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Abs"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='5'>
                                {exercises.abs.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Glutes"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='6'>
                                {exercises.glutes.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Biceps"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='7'>
                                {exercises.biceps.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                            <List.Accordion
                                title="Triceps"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='8'>
                                {exercises.triceps.map(exercise => {
                                    return (
                                        <List.Item title={exercise.title} key={exercise.id}
                                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                                        />
                                    )
                                })}
                            </List.Accordion>
                        </List.AccordionGroup>
                    </ScrollView>
                    {selectedItem ?
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: selectedItem.image }} style={styles.bigLogo} />
                                <View style={styles.modalText}>
                                    <Text>{selectedItem.description}</Text>
                                </View>
                            </View>
                        </Modal>
                        : null}

                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modal: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 5

    },
    tinyLogo: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    bigLogo: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        margin: 30,
    },
    modalText: {
        borderRadius: 5,
        padding: 20,
        backgroundColor: '#6e45e6'
    }
})

export default ExercisesList;