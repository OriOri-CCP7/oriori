export {};
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import auth from '../firebase.config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({});

  const signup = async (username: string, email: string, password: string) => {
    let newUserInfo: {username: string, email: string, password: string, uuid: string | unknown}
    newUserInfo = {
      username: username,
      email: email,
      password: password,
      uuid: null
    };
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    newUserInfo.uuid = newUser.user.uid;
    // AXIOS REQUEST TO PYTHON SERVER HERE
  };

  const login = async (email: string, password: string) => {
    const loggedIn = signInWithEmailAndPassword(auth, email, password);
    return loggedIn;
  }

  const logout = () => {
    return signOut(auth);
  };

  return <UserContext.Provider value={{ signup, login, logout, user }}>
    {children}
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}
