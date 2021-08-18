import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { List, DefaultTheme } from 'react-native-paper';

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
                            left={() => <Image style={styles.tinyLogo} source={{ uri: exercise.image }} />} />
                    )
                })
                }
            </List.Accordion>
        );
    }

    return (
        <View>
            <List.AccordionGroup>
                <FlatList data={routines} renderItem={renderItem} keyExtractor={(item) => { return item.id }} />
            </List.AccordionGroup>
        </View>
    )
}

export default RoutinesScreen;

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    }
})