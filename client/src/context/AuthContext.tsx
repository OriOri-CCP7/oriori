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
import { get, ref, set } from 'firebase/database';
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
  login: (email: string, password: string) => Promise<UserMetadata | undefined>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  user: User;
  role: string;
  onboarded: boolean;
  dispatchUser: React.Dispatch<UserReducerAction>;
  loadComplete: boolean;
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
  const [loadComplete, setLoadComplete] = useState(false);
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
  const [refreshAllowed, setRefreshAllowed] = useState(true);

  const signup = async (username: string, email: string, password: string) => {
    setRefreshAllowed(false);
    const newUserInfo: User = {
      username: username,
      email: email,
      uuid: null,
      location: "13"
    };
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      newUserInfo.uuid = newUser.user.uid;
      console.log('🌎 User Created: ', newUserInfo);
      let userUpdate = await axios.post('/api/users/newUser/', newUserInfo, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
      });
      if (userUpdate.status !== 200) throw new Error("User could not be added to app database: " + newUserInfo.uuid);
      await createUserMetadata(newUserInfo.uuid);
      await refreshUser(newUserInfo.uuid, newUserInfo.email);
      setLoadComplete(true);
      return newUser;
    } catch(err) {
      console.log("Error creating user: ", err);
    }
  };

  const login = async (email: string, password: string) => {
    setRefreshAllowed(false);
    const loggedIn = await signInWithEmailAndPassword(auth, email, password);
    console.log('LOG IN: ', loggedIn);
    const userMetadata = await refreshUser(loggedIn.user.uid, loggedIn.user.email);
    setLoadComplete(true);
    return userMetadata;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatchUser({
        type: 'clear_user'
      });
      setRole('');
    } catch (error) {
      console.log('😡 Logout Error: ', error);
    }
  };

  const refreshUser = async (userId: string, email: string | null) => {
    try {
      const result = await axios.get(`/api/users/${userId}/`);
      if (result.status !== 200) { throw new Error(`User ID "${userId}" not found in app database.`); }
      dispatchUser({
        type: 'set_user',
        newUsername: result.data.username,
        newEmail: email ?? (result.data.email ?? ''),
        newUuid: userId,
        newLocation: String(result.data.location)
      });
      const userMetadata = await updateUserMetadata(userId);
      return userMetadata;
    } catch (error) {
      console.log("🍀 Refresh Error: ", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('A password reset email was sent to your registered email address.');
    } catch(error) {
      console.log('💢 Password Reset Error: ', error);
    }
  };

  const loadUserRole = async (userId: string) => {
    let userSnapshot = await get(ref(database, `users/${userId}`));
    if (userSnapshot.exists()) {
      let userJson: UserMetadata = userSnapshot.toJSON() ?? {};
      if (userJson.role) {
        setRole(userJson.role);
        console.log('USER ROLE: ', userJson.role);
        return userJson.role
      }
    } else {
      console.log('User metadata (role) not found.')
      return '';
    }
  };

  const loadOnboardState = async (userId: string) => {
    let userSnapshot = await get(ref(database, `users/${userId}`));
    if (userSnapshot.exists()) {
      let userJson: UserMetadata = userSnapshot.toJSON() ?? {};
      if (userJson.onboarded !== undefined) {
        setOnboarded(userJson.onboarded);
        console.log('ONBOARD STATE: ', userJson.onboarded);
        return userJson.onboarded;
      }
    } else {
      console.log('User metadata (onboard) not found.')
      return false;
    }
  };
  
  const createUserMetadata = async (userId: string) => {
    const newUser: UserMetadata = {
      onboarded: false,
      role: ''
    };

    await set(ref(database, `users/${userId}`), newUser);
    let userSnapshot = await get(ref(database, `users/${userId}`));
    if (userSnapshot.exists()) {
      let userJson: UserMetadata = userSnapshot.toJSON() ?? {};
      setOnboarded(userJson.onboarded ?? false);
      setRole(userJson.role ?? '');
    } else {
      console.log('User metadata could not be initialized.');
    }
  };

  const updateUserMetadata = async (userId: string): Promise<UserMetadata> => {
    const role = await loadUserRole(userId);
    const onboard = await loadOnboardState(userId);
    return { onboarded: onboard, role: role };
  };

  useEffect(() => {
    const authenticationState = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state change.");
      if (currentUser && refreshAllowed) {
        refreshUser(currentUser.uid, currentUser.email)
          .then(() => setLoadComplete(true));
      }
    });

    return () => {
      authenticationState();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshAllowed]);

  useEffect(() => {
    console.log('USER UPDATE: ', user);
  }, [user]);

  return <UserContext.Provider value={{ signup, login, logout, resetPassword, user, role, onboarded, dispatchUser, loadComplete, csrftoken }}>
    { children }
  </UserContext.Provider>
}

export const UserAuth = () => {
  return useContext(UserContext);
}