import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import axios from 'axios';

interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  age: number;
  location: string;
  education: string;
  interests: string[];
  badges: string[];
  appliedJobs: string[];
  completedCourses: string[];
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  location: string;
  education: string;
  interests: string[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (updatedData: Partial<User>) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            phone: '',
            age: 0,
            location: '',
            education: '',
            interests: [],
            badges: [],
            appliedJobs: [],
            completedCourses: [],
          });
        }

        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: data.name });

      const userDoc: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: data.name,
        phone: data.phone,
        age: data.age,
        location: data.location,
        education: data.education,
        interests: data.interests,
        badges: [],
        appliedJobs: [],
        completedCourses: [],
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userDoc);

      // Sync with backend (optional)
      await axios.post('http://localhost:8000/api/auth/register', {
        ...data,
        uid: firebaseUser.uid,
      });

      setUser(userDoc);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('Register error:', error);
      alert(error.message);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      }

      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (updatedData: Partial<User>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { ...user, ...updatedData }, { merge: true });
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, register, login, logout, updateUserProfile, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export the custom hook to access context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
