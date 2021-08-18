import React, { createContext, useState } from 'react';
import Firebase from "../database/firebase";

const auth = Firebase.auth();
const db = Firebase.firestore();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [checkRoutines, setCheckRoutines] = useState(0);
    const [routines, setRoutines] = useState(null);
    const [exercises, setExercises] = useState({
        chest: null, triceps: null, shoulder: null,
        legs: null, glutes: null, abs: null, back: null, biceps: null
    });
    const [isLoading, setLoading] = useState(true);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                checkRoutines,
                exercises,
                routines,
                login: async (email, password) => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth.signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                fetchRoutines: async () => {
                    try {
                        const list = [];
                        await db.collection('routines')
                            .where('userId', '==', user.uid)
                            .get()
                            .then((querySnapshot) => {
                                setCheckRoutines(querySnapshot.size);
                                querySnapshot.forEach((doc) => {
                                    const {routine, title, userId} = doc.data();
                                    const id = doc.id;
                                    list.push({
                                        routine, title, userId, id
                                    })
                                });
                                setRoutines(list);
                            })
                    } catch (e) {
                        console.log(e);
                    }
                },
                fetchExercises: async () => {
                    try {
                        const list = [];

                        await db.
                            collection('exercises')
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    const { title, description, level,
                                        muscles, image } = doc.data();
                                    const id = doc.id;
                                    list.push({
                                        title,
                                        description,
                                        image,
                                        level,
                                        muscles,
                                        id
                                    })
                                })
                                let chest = [], triceps = [], biceps = [], shoulder = [], glutes = [], back = [], abs = [], legs = []
                                list.map(function (exercise) {
                                    if (exercise.muscles.includes('Chest')) chest.push(exercise);
                                    if (exercise.muscles.includes('Shoulder')) shoulder.push(exercise);
                                    if (exercise.muscles.includes('Triceps')) triceps.push(exercise);
                                    if (exercise.muscles.includes('Biceps')) biceps.push(exercise);
                                    if (exercise.muscles.includes('Glutes')) glutes.push(exercise);
                                    if (exercise.muscles.includes('Back')) back.push(exercise);
                                    if (exercise.muscles.includes('Abs')) abs.push(exercise);
                                    if (exercise.muscles.includes('Legs')) legs.push(exercise);
                                });
                                setExercises({ chest, shoulder, triceps, biceps, glutes, back, abs, legs });
                                setLoading(false);
                            })
                    } catch (e) {
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

