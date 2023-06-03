export {};
import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import auth from '../firebase.config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  UserCredential 
} from 'firebase/auth';

interface User {
  username: string, 
  email: string, 
  password: string, 
  uuid: string | unknown
};

const UserContext = createContext<{
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User;
} | null>(null);
  

  export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
      username: '',
      email: '',
      password: '',
      uuid: null,
    });

  const signup = async (username: string, email: string, password: string) => {
    let newUserInfo: User = {
      username: username,
      email: email,
      password: password,
      uuid: null,
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
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}