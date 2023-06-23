import React, { createContext, useContext, useEffect, useReducer, useState, ReactNode } from 'react';
import axios from 'axios';
import app from '../firebase.config';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut,
  UserCredential,
} from 'firebase/auth';
import { get, ref } from 'firebase/database';
import Cookies from 'js-cookie';

const { auth, database } = app;
const csrftoken = Cookies.get('csrftoken');

export interface User {
  username: string, 
  email: string, 
  uuid: string | null,
  location: string
};

interface AuthenticatedUser {
  signup: (username: string, email: string, password: string) => Promise<UserCredential | undefined>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  user: User;
  role: string;
  onboarded: boolean;
  dispatchUser: React.Dispatch<UserReducerAction>;
  isLoading: boolean;
  csrftoken: string | undefined;
};

interface UserReducerAction {
  type: 'set_user' | 'clear_user' | 'set_username' | 'set_email' | 'set_uuid' | 'set_location',
  newUsername?: string,
  newEmail?: string,
  newUuid?: string,
  newLocation?: string,
  newUserState?: User
};

interface UserMetadata {
  onboarded?: boolean,
  role?: string
};

function userReducer(state: User, action: UserReducerAction): User {
  console.log(action.type);
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
  };
};

const UserContext = createContext<AuthenticatedUser | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, dispatchUser] = useReducer(userReducer,
    {
      username: '',
      email: '',
      uuid: null,
      location: "13"
    }
  );
  const [role, setRole] = useState('');
  const [onboarded, setOnboarded] = useState(false);

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
    await refreshUser(loggedIn.user.uid, loggedIn.user.email);
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
      const result = await axios.get(`/api/users/${userId}/`);
      if (result.status !== 200) { throw new Error(`User ID "${userId}" not found in app database.`); }
      await loadUserRole(userId);
      await loadOnboardState(userId);
      dispatchUser({
        type: 'set_user',
        newUsername: result.data.username,
        newEmail: email ?? (result.data.email ?? ''),
        newUuid: userId,
        newLocation: result.data.location
      });
      console.log("User data retrieved.");
    } catch (error) {
      console.log("🍀", `Error: ${error}`);
    } finally {
      setIsLoading(false);
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

  const loadUserRole = async (userId: string) => {
    let userSnapshot = await get(ref(database, `users/${userId}`));
    if (userSnapshot.exists()) {
      let userJson: UserMetadata = userSnapshot.toJSON() ?? {};
      if (userJson.role) {
        setRole(userJson.role);
      }
    } else {
      throw new Error('User metadata not found.')
    }
  };

  const loadOnboardState = async (userId: string) => {
    let userSnapshot = await get(ref(database, `onboardedUsers/${userId}`));
    if (userSnapshot.exists()) {
      let userJson: UserMetadata = userSnapshot.toJSON() ?? {};
      setOnboarded(userJson.onboarded ?? false);
    } else {
      throw new Error('User metadata not found.')
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      refreshUser(auth.currentUser.uid, auth.currentUser.email);
    } else {
      dispatchUser({ type: 'clear_user' });
    }
    
    const authenticationState = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        refreshUser(currentUser.uid, currentUser.email);
      }
    });

    return () => {
      authenticationState();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={{ signup, login, logout, resetPassword, user, role, onboarded, dispatchUser, isLoading, csrftoken }}>
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}