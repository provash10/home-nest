import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('user');

    const saveUserToBackend = async (userData) => {
        try {
            console.log('Saving user to backend:', userData.email);
            
            const response = await fetch('https://homenest-server-ten.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    name: userData.displayName || userData.email.split('@')[0],
                    photoURL: userData.photoURL || '',
                    role: 'user'
                })
            });
            
            const data = await response.json();
            console.log('Backend response:', data);
            
            if (data.success) {
                console.log('User saved successfully to backend');
            } else {
                console.warn('User save response not successful:', data);
            }
            
            return data;
        } catch (error) {
            console.error('Error saving user to backend:', error);
            toast.error('Failed to sync user data');
            return { success: false, error: error.message };
        }
    };

    const fetchUserRole = async (email) => {
        try {
            console.log('Fetching role for:', email);
            const response = await fetch(`https://homenest-server-ten.vercel.app/users/${email}/role`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Role fetched:', data.role);
                setUserRole(data.role || 'user');
                return data.role;
            } else {
                console.warn('Failed to fetch role, defaulting to user');
                setUserRole('user');
                return 'user';
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user');
            return 'user';
        }
    };

    // updated onAuthStateChanged
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('Auth state changed:', currentUser?.email);
            
            if (currentUser) {
                setUser(currentUser);
                
                // Save user to backend
                try {
                    await saveUserToBackend(currentUser);
                } catch (error) {
                    console.error('Failed to save user on auth state change:', error);
                }
                
                // Fetch user role
                try {
                    await fetchUserRole(currentUser.email);
                } catch (error) {
                    console.error('Failed to fetch role:', error);
                }
                
            } else {
                setUser(null);
                setUserRole('user');
            }
            setLoading(false);
        });
        
        return () => {
            unsubscribe();
        };
    }, []);

    // Create User with backend save
    const createUser = (email, password, name = '', photoURL = '') => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                
                // Update profile first
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL
                }).then(() => {
                    // Then save to backend
                    return saveUserToBackend({
                        ...user,
                        displayName: name,
                        photoURL: photoURL
                    }).then(() => {
                        return result;
                    });
                });
            });
    };

    // Sign In User with backend update
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Update last login in backend
                saveUserToBackend(result.user);
                return result;
            });
    };

    // Google Sign In with backend save
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                // Save user to backend
                saveUserToBackend(result.user);
                return result;
            });
    };

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
            .then(() => {
                // update in backend
                saveUserToBackend({
                    ...auth.currentUser,
                    ...updateData
                });
            });
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        userRole,
        setUser,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUser,
        saveUserToBackend,
        fetchUserRole
    };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;