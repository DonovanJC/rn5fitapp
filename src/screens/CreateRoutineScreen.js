import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View, Text, StatusBar, StyleSheet, Keyboard,
    TouchableWithoutFeedback, FlatList, Image,
    LogBox, ActivityIndicator, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { List, Modal, DefaultTheme, TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import Firebase from '../database/firebase';
import { AuthContext } from '../navigation/AuthProvider';

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

const CreateRoutine = ({ navigation }) => {
    const { user } = React.useContext(AuthContext)
    const { isLoading } = React.useContext(AuthContext)
    const [visible, setVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const { exercises } = React.useContext(AuthContext);
    // const [exercises, setExercises] = React.useState({
    //     chest: null, triceps: null, shoulder: null,
    //     legs: null, glutes: null, abs: null, back: null, biceps: null
    // });
    const [title, setTitle] = React.useState(null);
    const [routine, setRoutine] = React.useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    ///Function to add a new routine for a user to the firestore database in the 'routines' collection
    const submitRoutine = async () => {
        await db.collection('routines')
            .add({
                title: title,
                routine: routine,
                userId: user.uid
            })
            .then(() => {
                setRoutine([]);
                setTitle(null);
                Alert.alert('Routine succesfully created!');
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
            });
    }
///Toggle modal
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
///Validation to avoid repeated exercises
    const addExercise = (item) => {
        let check = routine.find(each => each.title === item.title);
        if (!check) {
            setRoutine([...routine, item]);
        }
        else { null; }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput placeholder='Add a Title' mode='outlined' style={{ marginBottom: 10, flex: 1, marginLeft: 10, marginRight: 5 }} onChangeText={(val) => setTitle(val)} />
                    {title == null || title == '' || routine.length == 0 ?
                        null
                        :
                        <TouchableOpacity onPress={() => submitRoutine()}>
                            <View style={{ backgroundColor: '#3700b3', marginHorizontal: 5, padding: 20, borderRadius: 10, marginTop: 5 }}>
                                <Text style={{ color: 'white' }}>Create Routine</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                {isLoading ?
                    <View >
                        <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                        <ActivityIndicator size='large' color="#0000ff" />
                    </View>
                    :
                    <View>
                        {/* {console.log(exercises.chest)} */}
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
                                                right={() =>
                                                    <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                                        onPress={() => addExercise(exercise)}
                                                        style={{ padding: 3 }} />
                                                }
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
        </TouchableWithoutFeedback>
    )
};

export default CreateRoutine;

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