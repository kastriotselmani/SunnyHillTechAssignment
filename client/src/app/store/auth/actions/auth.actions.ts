import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserDto } from '../../../models/user.dto';

export const AuthActions = createActionGroup({
  source: '[Auth]',
  events: {
    // Login actions
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: UserDto }>(),
    'Login Failure': props<{ error: any }>(),

    // Registration actions
    'Register': props<{ email: string; password: string; name: string }>(),
    'Register Success': props<{ user: UserDto }>(),
    'Register Failure': props<{ error: any }>(),

    // Token Refresh actions (if implemented)
    'Refresh Token': emptyProps(), // you might not need any payload to trigger refresh
    'Refresh Token Success': props<{ user: UserDto }>(),
    'Refresh Token Failure': props<{ error: any }>(),

    // Logout action (typically no payload is required)
    'Logout': emptyProps()
  }
});