import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

const AuthProvider = ({children}) => {
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    //get current user info
    onAuthStateChanged(auth, (currentUser)=>{
        if(currentUser){
            console.log('inside observer. if', currentUser)
        }
        else{
            console.log('inside observer. else', currentUser)
        }
    })
    const authInfo ={
        // user: 'kotha10@gmail.com '
        createUser,
        signInUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;