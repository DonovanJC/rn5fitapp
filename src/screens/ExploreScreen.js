import React, { useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Platform, TouchableOpacity, Image, Animated, ScrollView,
    ActivityIndicator
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

// import { markers } from '../model/mapdata';
import StarRating from '../components/StarRating';
import Firebase from "../database/firebase";

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.7;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = ({ navigation }) => {


    const initialMapState = {
        region: {
            latitude: 51.509865,
            longitude: -0.118092,
            latitudeDelta: 0.12,
            longitudeDelta: 0.641,
        }
    }
    const [isLoading, setLoading] = React.useState(true);
    const [region, setRegion] = React.useState(initialMapState.region);
    const [places, setPlaces] = React.useState(null);

    const fetchPosts = async () => {
        try {
            const list = [];

            await Firebase.firestore().
                collection('places')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const { title, description, rating,
                            url, latitude, longitude } = doc.data();

                        list.push({
                            coordinate: {
                                latitude,
                                longitude
                            },
                            title,
                            description,
                            image: url,
                            rating
                        })
                    })
                    setPlaces(list);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
        }
    };

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchPosts();
            // console.log(places);
        }, [])
    )

    // useEffect(() => {
    //     fetchPosts();
    //     if (!isLoading) {
    //         console.log(places);
    //     }
    // }, []);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); //animated 30% away from landing on next
            if (index >= places.length) {
                index = places.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = places[index];
                    _map.current.animateToRegion({
                        ...coordinate,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta
                    },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = places.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp'
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerId = mapEventData._targetInst.return.key;
        let x = (markerId * CARD_WIDTH) + (markerId * 20);
        if (Platform.OS == "ios") {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    const RenderContent = () => {
        if (isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size='large' color="#0000ff"/>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>

                    <MapView
                        ref={_map}
                        initialRegion={region}
                        provider={PROVIDER_GOOGLE}
                        style={styles.container}
                    >
                        {places.map((marker, index) => {
                            const scaleStyle = {
                                transform: [
                                    {
                                        scale: interpolations[index].scale,
                                    },
                                ],
                            }
                            return (
                                <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                                    <Animated.View style={styles.markerWrap}>
                                        <Animated.Image
                                            source={require('../../assets/map_marker.png')}
                                            style={[styles.marker, scaleStyle]}
                                            resizeMode='cover'
                                        />
                                    </Animated.View>
                                </Marker>
                            )
                        })}
                    </MapView>
                    <TouchableOpacity style={styles.chipsItem} onPress={() => { navigation.navigate("Add Place") }}>
                        <MaterialIcons name="add" size={20} style={styles.chipsIcon} />
                        <Text>Add a New Place</Text>
                    </TouchableOpacity>
                    <Animated.ScrollView
                        ref={_scrollView}
                        horizontal
                        scrollEventThrottle
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                        pagingEnabled
                        snapToInterval={CARD_WIDTH + 20}
                        snapToAlignment='center'
                        contentInset={{
                            top: 0,
                            left: SPACING_FOR_CARD_INSET,
                            bottom: 0,
                            right: SPACING_FOR_CARD_INSET
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                        }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation
                                        }
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                    >
                        {places.map((marker, index) => (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={{ uri: marker.image }}
                                    style={styles.cardImage}
                                    resizeMode='cover'
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    <StarRating rating={marker.rating} />
                                    <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                                </View>
                            </View>
                        ))}
                    </Animated.ScrollView>
                </View>
            );
        }
    }

    return (
        <RenderContent />
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        position: "absolute",
        top: 15,
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT - 45,
        width: CARD_WIDTH,
        overflow: "hidden",
        marginBottom: 50
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
        padding: 15,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});