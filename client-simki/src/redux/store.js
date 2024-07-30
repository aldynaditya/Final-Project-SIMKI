import {
    combineReducers,
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from 'redux';

import { thunk } from 'redux-thunk';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import daftarReducer from './daftar/reducer';
import activatedReducer from './activated/reducer';
import forgotPasswordReducer from './forgot/reducer';
import changePasswordReducer from './change/reducer';
import appointmentReducer from './appointment/reducer';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    daftar: daftarReducer,
    activated: activatedReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    appointments: appointmentReducer,
});
const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;