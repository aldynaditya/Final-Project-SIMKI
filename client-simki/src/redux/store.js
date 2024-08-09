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
import createAppointmentReducer from './patient/create/reducer';
import scheduleReducer from './patient/schedule/reducer';
import resendOtpReducer from './patient/resend/reducer';
import questionReducer from './patient/question/reducer';
import responseReducer from './patient/response/reducer';
import createPendaftarReducer from './resepsionis/creatependaftar/reducer';
import pasienReducer from './resepsionis/updatependaftar/reducer';
import getobatReducer from "./pharmacy/index/reducer";
import createobatReducer from "./pharmacy/create/reducer";
import deleteobatReducer from './pharmacy/delete/reducer';
import editobatReducer from "./pharmacy/edit/reducer";
import { editObat } from './pharmacy/edit/actions';

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
    addUser: addUserReducer,
    createAppointment: createAppointmentReducer,
    schedule: scheduleReducer,
    resendOtp: resendOtpReducer,
    questions: questionReducer,
    responses: responseReducer,
    createPendaftar: createPendaftarReducer,
    pasien: pasienReducer,
    getObat: getobatReducer,
    createObat: createobatReducer,
    deleteObat: deleteobatReducer,
    editObat: editobatReducer,
});
const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;