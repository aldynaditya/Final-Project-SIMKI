import {
    combineReducers,
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from 'redux';

import { thunk } from 'redux-thunk';
import authReducer from './auth/reducer';
import profileReducer from './patient/profile/reducer';
import daftarReducer from './patient/daftar/reducer';
import activatedReducer from './patient/activated/reducer';
import forgotPasswordReducer from './patient/forgot/reducer';
import changePasswordReducer from './patient/change/reducer';
import appointmentReducer from './patient/appointment/reducer';
import historyReducer from './patient/history/reducer';
import detailReducer from './patient/detail/reducer';
import userReducer from './admin/user/reducer';
import addUserReducer from './admin/add/reducer';


const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    daftar: daftarReducer,
    activated: activatedReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    appointments: appointmentReducer,
    history: historyReducer,
    detail: detailReducer,
    user: userReducer,
    addUser: addUserReducer
});
const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;