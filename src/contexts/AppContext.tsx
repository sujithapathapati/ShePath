import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Job, Course, Product, Badge, Notice, Mentor, Employer, JobApplication } from '../types';

interface AppState {
  user: User | null;
  employer: Employer | null;
  isAuthenticated: boolean;
  isEmployerAuthenticated: boolean;
  userType: 'user' | 'employer' | null;
  language: 'english' | 'telugu';
  jobs: Job[];
  courses: Course[];
  products: Product[];
  notices: Notice[];
  mentors: Mentor[];
  jobApplications: JobApplication[];
  loading: boolean;
  error: string | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_EMPLOYER'; payload: Employer }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_EMPLOYER' }
  | { type: 'SET_LANGUAGE'; payload: 'english' | 'telugu' }
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'BOOKMARK_JOB'; payload: string }
  | { type: 'APPLY_JOB'; payload: JobApplication }
  | { type: 'ENROLL_COURSE'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  user: null,
  employer: null,
  isAuthenticated: false,
  isEmployerAuthenticated: false,
  userType: null,
  language: 'english',
  jobs: [],
  courses: [],
  products: [],
  notices: [],
  mentors: [],
  jobApplications: [],
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        userType: 'user',
      };
    case 'SET_EMPLOYER':
      return {
        ...state,
        employer: action.payload,
        isEmployerAuthenticated: true,
        userType: 'employer',
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userType: null,
      };
    case 'LOGOUT_EMPLOYER':
      return {
        ...state,
        employer: null,
        isEmployerAuthenticated: false,
        userType: null,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload,
      };
    case 'ADD_JOB':
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
      };
    case 'BOOKMARK_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload
            ? { ...job, isBookmarked: !job.isBookmarked }
            : job
        ),
      };
    case 'APPLY_JOB':
      return {
        ...state,
        jobApplications: [...state.jobApplications, action.payload],
        jobs: state.jobs.map(job =>
          job.id === action.payload.jobId
            ? { ...job, applicationsCount: (job.applicationsCount || 0) + 1 }
            : job
        ),
      };
    case 'ENROLL_COURSE':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload
            ? { ...course, enrolled: true }
            : course
        ),
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'ADD_BADGE':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          badges: [...state.user.badges, action.payload],
        } : null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}