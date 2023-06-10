import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import app from '../firebase.config';
const { auth } = app;

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  UserCredential,
  sendPasswordResetEmail
} from 'firebase/auth';
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');

interface User {
  username: string, 
  email: string, 
  uuid: string | unknown,
  location: number | unknown
};

interface AuthenticatedUser {
  signup: (username: string, email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  user: User;
  csrftoken: string | undefined;
}

const UserContext = createContext<AuthenticatedUser | null>(null);

  export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
      username: '',
      email: '',
      uuid: null,
      location: 1
    });

  const signup = async (username: string, email: string, password: string) => {
    const newUserInfo: User = {
      username: username,
      email: email,
      uuid: null,
      location: 1 // user inputs prefecture
    };
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    newUserInfo.uuid = newUser.user.uid;
    console.log('🌎', newUserInfo);
    await axios.post('/api/users/newUser/', newUserInfo, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    });
    return newUser;
  };

  const login = async (email: string, password: string) => {
    const loggedIn = await signInWithEmailAndPassword(auth, email, password);
    console.log('😜', loggedIn);
    const currentUser = loggedIn.user;
    console.log('🤩', currentUser);
    return loggedIn;
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({
        username: '',
        email: '',
        uuid: null,
        location: 1
      });
    } catch (error) {
      console.log('😡', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('A password reset email was sent to your registered email address.');
    } catch(error) {
      console.log('💢', error);
    }
  };

  useEffect(() => {
    const authenticationState = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const authenticatedUser: User = {
          username: currentUser.displayName ?? '',
          email: currentUser.email ?? '',
          uuid: currentUser.uid,
          location: 1
        };
        setUser(authenticatedUser);
        console.log('😤', user);
      }
    });

    return () => {
      authenticationState();
    }
  }, []);

  return <UserContext.Provider value={{ signup, login, logout, resetPassword, user, csrftoken }}>
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}