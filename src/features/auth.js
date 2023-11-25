import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      switch (action.type) {
        case 'auth/setUser': {
          localStorage.setItem('account_id', action.payload.id);
          return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            sessionId: localStorage.getItem('session_id'),
          };
        }
        default: return state;
      }
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state) => state.auth;

export const userSelector = (state) => state.auth.user;

export const userAuthenticatedSelector = (state) => state.auth.isAuthenticated;

export const sessionIdSelector = (state) => state.auth.sessionId;
