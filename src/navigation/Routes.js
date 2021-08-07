import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from "../database/firebase";
import { AuthContext } from './AuthProvider';

import SignStack from './SignStack';
import AppStack from './AppStack';

const auth = Firebase.auth();

const Routes = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;
    
    return (
        <NavigationContainer>
            { user ? <AppStack/> : <SignStack />}
        </NavigationContainer>
    );
};

export default Routes;


