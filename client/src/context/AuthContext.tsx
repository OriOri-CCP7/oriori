import React, { createContext, useContext, useEffect, ReactNode, useReducer } from 'react';
import axios from 'axios';
import app from '../firebase.config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  UserCredential,
  sendPasswordResetEmail
} from 'firebase/auth';
import Cookies from 'js-cookie';

const { auth } = app;
const csrftoken = Cookies.get('csrftoken');

interface AuthenticatedUser {
  signup: (username: string, email: string, password: string) => Promise<UserCredential | undefined>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  user: User;
  refreshUser: (userId: string, email: string | null) => Promise<void>;
  dispatchUser: React.Dispatch<UserReducerAction>;
  csrftoken: string | undefined;
};

interface User {
  username: string, 
  email: string, 
  uuid: string | null,
  location: string
};

interface UserReducerAction {
  type: 'set_user' | 'clear_user' | 'set_username' | 'set_email' | 'set_uuid' | 'set_location',
  newUsername?: string,
  newEmail?: string,
  newUuid?: string,
  newLocation?: string,
  newUserState?: User
}

function userReducer(state: User, action: UserReducerAction): User {
  switch (action.type) {
    case 'set_user': {
      return {
        ...state,
        username: action.newUsername ?? state.username,
        email: action.newEmail ?? state.email,
        uuid: action.newUuid ?? state.uuid,
        location: action.newLocation ?? state.location
      }
    }
    case 'clear_user': {
      return {
        username: '',
        email: '',
        uuid: null,
        location: '13'
      };
    }
    case 'set_username': {
      return {
        ...state,
        username: action.newUsername ?? state.username
      };
    }
    case 'set_email': {
      return {
        ...state,
        email: action.newEmail ?? state.email
      };
    }
    case 'set_uuid': {
      return {
        ...state,
        uuid: action.newUuid ?? state.uuid
      };
    }
    case 'set_location': {
      return {
        ...state,
        location: action.newLocation ?? state.location
      };
    }
  }
}

const UserContext = createContext<AuthenticatedUser | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatchUser] = useReducer(userReducer,
    {
      username: '',
      email: '',
      uuid: null,
      location: "13"
    }
  );

  const signup = async (username: string, email: string, password: string) => {
    const newUserInfo: User = {
      username: username,
      email: email,
      uuid: null,
      location: "13"
    };
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      newUserInfo.uuid = newUser.user.uid;
      console.log('🌎', newUserInfo);
      let userUpdate = await axios.post('/api/users/newUser/', newUserInfo, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
      });
      if (userUpdate.status !== 200) throw new Error("User could not be added to app database: " + newUserInfo.uuid);
      return newUser;
    } catch(err) {
      console.log("Error creating user: ", err);
    }
  };

  const login = async (email: string, password: string) => {
    const loggedIn = await signInWithEmailAndPassword(auth, email, password);
    console.log('😜', loggedIn);
    refreshUser(loggedIn.user.uid, loggedIn.user.email);
    console.log('🤩', user);
    return loggedIn;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatchUser({
        type: 'clear_user'
      });
    } catch (error) {
      console.log('😡', error);
    }
  };

  const refreshUser = async (userId: string, email: string | null) => {
    try {
      if (auth) {
        const result = await axios.get(`/api/users/${userId}/`);
        if (result.status !== 200) { throw new Error(`User ID "${userId}" not found in app database.`); }
        dispatchUser({
          type: 'set_user',
          newUsername: result.data.username,
          newEmail: email ?? (result.data.email ?? ''),
          newUuid: userId,
          newLocation: result.data.location
        });
      } else {
        throw new Error("Auth could not be validated.");
      }
    } catch (error) {
      console.log("🍀", `Error: ${error}`);
    } finally {
      console.log("User data retrieved.");
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
        refreshUser(currentUser.uid, currentUser.email);
      }
    });

    return () => {
      authenticationState();
    };
  }, []);

  return <UserContext.Provider value={{ signup, login, logout, resetPassword, user, refreshUser, dispatchUser, csrftoken }}>
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}