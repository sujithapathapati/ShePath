// src/contexts/EmployerContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Employer {
  id?: string;
  companyName?: string;
  contactPerson?: string;
  email: string;
  name?: string; // Optional name for display (like email prefix)
}

interface EmployerState {
  employer: Employer | null;
  isEmployerAuthenticated: boolean;
}

type Action =
  | { type: 'LOGIN_EMPLOYER'; payload: Employer }
  | { type: 'LOGOUT_EMPLOYER' };

const initialState: EmployerState = {
  employer: null,
  isEmployerAuthenticated: false,
};

function employerReducer(state: EmployerState, action: Action): EmployerState {
  switch (action.type) {
    case 'LOGIN_EMPLOYER':
      return {
        ...state,
        employer: action.payload,
        isEmployerAuthenticated: true,
      };
    case 'LOGOUT_EMPLOYER':
      return {
        ...state,
        employer: null,
        isEmployerAuthenticated: false,
      };
    default:
      return state;
  }
}

const EmployerContext = createContext<{
  state: EmployerState;
  dispatch: React.Dispatch<Action>;
  loginEmployer: (employer: Employer) => void;
  logoutEmployer: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  loginEmployer: () => {},
  logoutEmployer: () => {},
});

export const EmployerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(employerReducer, initialState);

  const loginEmployer = (employer: Employer) => {
    dispatch({ type: 'LOGIN_EMPLOYER', payload: employer });
  };

  const logoutEmployer = () => {
    dispatch({ type: 'LOGOUT_EMPLOYER' });
  };

  return (
    <EmployerContext.Provider value={{ state, dispatch, loginEmployer, logoutEmployer }}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => useContext(EmployerContext);