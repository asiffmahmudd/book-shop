import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import firebase from "firebase/app";

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {    
    
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);

    function loginWith(media){
        let provider;
        if(media === 'google')
            provider = new firebase.auth.GoogleAuthProvider();
        else if(media === 'facebook')
            provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider)
    }

    function logout(){
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            let currentUser;
            if(user){
                currentUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }
            }
            setLoggedInUser(currentUser);
            setLoading(false);
        })

        return unsubscribe;
    },[])

    const value = {
        loggedInUser,loginWith,logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
