import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { UserDto } from '../../../models/user.dto';

// Define the key for this feature state
export const authFeatureKey = 'auth';

// Define the shape of your authentication state
export interface AuthState {
  user: UserDto | null;
  loading: boolean;
  error: any;
}

// Set up the initial state
export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

// Create the reducer function using createReducer and on()
export const authReducer = createReducer(
  initialState,

  // When the login action is dispatched, set loading to true and clear previous errors.
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // When login succeeds, store the user and clear the loading flag.
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),

  // When login fails, capture the error and clear the loading flag.
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Optionally, add registration actions if you have them.
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Handle logout by resetting the state.
  on(AuthActions.logout, (state) => ({
    ...initialState
  }))
);