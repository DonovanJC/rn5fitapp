import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { List, DefaultTheme, Modal } from 'react-native-paper';

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


const RoutinesScreen = () => {
    const { routines } = React.useContext(AuthContext);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const renderItem = ({ item }) => {
        return (
            <List.Accordion
                title={item.title}
                left={props => <List.Icon {...props} icon="equal" />}
                theme={theme} id={item.id}>
                {item.routine.map(exercise => {
                    { console.log(exercise.title) }
                    return (
                        <List.Item title={exercise.title} key={exercise.id}
                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />}
                            onPress={() => { showModal(); setSelectedItem(exercise) }}
                        />
                    )
                })
                }
            </List.Accordion>
        );
    }

    return (
        <View style={styles.container}>
            <List.AccordionGroup>
                <FlatList data={routines} renderItem={renderItem} keyExtractor={(item) => { return item.id }} />
            </List.AccordionGroup>
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

    )
}

export default RoutinesScreen;

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modal: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 5

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