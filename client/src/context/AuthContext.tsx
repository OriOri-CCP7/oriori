import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

interface AuthenticatedUser {
  signup: (username: string, email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User;
}

const UserContext = createContext<AuthenticatedUser | null>(null);
  

  export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
      username: '',
      email: '',
      password: '',
      uuid: null,
    });

  const signup = async (username: string, email: string, password: string) => {
    const newUserInfo: User = {
      username: username,
      email: email,
      password: password,
      uuid: null,
    };
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    newUserInfo.uuid = newUser.user.uid;
    console.log('🌎', newUserInfo);
    await axios.post('api/newUser/', newUserInfo);
    return newUser;
  };

  const login = async (email: string, password: string) => {
    const loggedIn = signInWithEmailAndPassword(auth, email, password);
    return loggedIn;
  }

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const authenticationState = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const authenticatedUser: User = {
          username: '',
          email: '',
          password: '',
          uuid: currentUser.uid,
        };
        setUser(authenticatedUser);
      }
    });

    return () => {
      authenticationState();
    }
  }, []);

  return <UserContext.Provider value={{ signup, login, logout, user }}>
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}