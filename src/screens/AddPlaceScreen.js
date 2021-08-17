import React, { useEffect } from "react";
import {
    View, Text, StyleSheet, Alert,
    Platform, ActivityIndicator, Image,
    TouchableOpacity, KeyboardAvoidingView,
    ScrollView, StatusBar
} from "react-native";
import StarRating from "react-native-star-rating";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import Firebase from "../database/firebase";
import Geocoder from "react-native-geocoding";
// import ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../navigation/AuthProvider';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Permission } from 'expo';

Geocoder.init("AIzaSyASYLMRcWSSxC_QbznjGA0hNRkl4-OjE_A");
const db = Firebase.firestore();

const AddPlaceScreen = ({ navigation }) => {

    const { user, logout } = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        title: '',
        street: "",
        number: "",
        postCode: "",
        starCount: 3.5,
        description: ''
    });

    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [place, setPlace] = React.useState(null);

    useEffect(() => {
        getCoordinates('Greet House, off Frazier Street');
    }, [])

    ///Set star rating
    const onStarRatingPress = (rating) => {
        setData({
            ...data,
            starCount: rating
        });
    }

    ///Select Image from library
    const choosePhotoFromLibrary = async () => {
        getCoordinates();
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled == true) {
            return;
        }
        setImage(pickerResult.uri);
    };
    ///// Get coordinates
    const getCoordinates = async () => {
        let fulladdress = data.street + " " + data.number + " " + data.postCode
        // console.log(fulladdress);
        Geocoder.from(fulladdress)
            .then(json => {
                // console.log(json.results);
                let location = json.results[0].geometry.location;
                setPlace(location);
            })
            .catch(error => console.log(error));
        // console.log(place);
    }

    ///Add a new place to our common FIRESTORE Database
    const submitPlace = async () => {

        setUploading(true);
        getCoordinates();

        const imageUrl = await uploadImage();
        // console.log('Image Url: ', imageUrl);
        let coordinates = place;
        // console.log(coordinates);

        db.collection('places')
            .add({
                userId: user.uid,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                url: imageUrl,
                title: data.title,
                description: data.description,
                rating: data.starCount
            })
            .then(() => {
                console.log('Place Added!!!');
                Alert.alert(
                    'Place published',
                    'Your place has been published succesfully!!!');
                setPlace(null);
                navigation.navigate('Explore');
                setUploading(false);
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
            });

    }

    ///Upload place's Image to FIrebase Cloud and get Url

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open("GET", uploadUri, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref('Places').child(filename);
        const snapshot = await ref.put(blob);

        blob.close();

        url = await snapshot.ref.getDownloadURL();

        setImage(null);

        return url;
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.text1}>Title</Text>
                    <TextInput
                        mode='outlined'
                        onChangeText={(val) => setData({ ...data, title: val })}
                    />
                    <Text style={styles.text1}>Enter the Address</Text>
                    <TextInput
                        placeholder="Enter the street"
                        mode='outlined'
                        onChangeText={(val) => setData({ ...data, street: val })}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder="Number"
                            mode='outlined'
                            style={{ padding: 1 }}
                            onChangeText={(val) => setData({ ...data, number: val })}
                        />
                        <TextInput
                            mode='outlined'
                            placeholder='Postcode'
                            style={{ padding: 1, borderRadius: 5 }}
                            onChangeText={(val) => setData({ ...data, postCode: val })}
                        />
                        <TouchableOpacity onPress={choosePhotoFromLibrary}>
                            <View style={{ backgroundColor: '#6e45e6', marginTop: 8, padding: 20, paddingRight: 33, paddingLeft: 33, borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Upload Image</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text1}>Description</Text>
                    <TextInput
                        mode='outlined'
                        onChangeText={(val) => setData({ ...data, description: val })}
                        numberOfLines={4}
                        multiline={true}
                    />
                    <Text style={styles.text1}>Rating</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={data.starCount}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor='#9960fc'
                        starStyle={{ marginTop: 5 }}
                    />

                    {uploading == false ?
                        < View style={styles.button}>
                            <TouchableOpacity style={styles.signIn} onPress={submitPlace}>
                                <LinearGradient
                                    colors={['#6e45e6', '#5c2de3']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign], {
                                        color: '#fff'
                                    }}>Add Place</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <ActivityIndicator size='large' color="#0000ff" />
                        </View>
                    }
                    {/* <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={submitPlace}>
                        <LinearGradient
                            colors={['#a767f0', '#9960fc']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign], {
                                color: '#fff'
                            }}>Add Place</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
                    {image == null ? <View></View>
                        : <Image source={{ uri: image }}
                            style={styles.thumbnail} />}
                </View>
            </ScrollView>
        </View >
    )
}

export default AddPlaceScreen;

const styles = StyleSheet.create({
    // textInput: {
    //     flex: 1,
    //     marginTop: Platform.OS === 'ios' ? 0 : -12,
    //     paddingLeft: 10,
    //     color: '#05375a',
    // }
    text1: {
        color: '#05375a',
        fontSize: 25,
        fontWeight: 'bold'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        marginLeft: 15
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        justifyContent: 'center',
        borderRadius: 4,
        marginHorizontal: 40
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop:100
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})