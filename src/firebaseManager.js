import firebaseConfig from './firebaseConfig';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

export const signin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        var user = {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
        }
        return user;
    }).catch((error) => {
        alert(error.message)
    });
}

export const signout = () => {
    return firebase.auth().signOut().then(() => {
        return true;
    }).catch((error) => {
    alert(error.message)
    });
}