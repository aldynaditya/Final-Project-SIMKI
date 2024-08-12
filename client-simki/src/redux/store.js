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
import { deletePendaftarReducer } from './resepsionis/deletependaftar/reducer';
import orderobatReducer from "./pharmacy/order/reducer";
import statusorderobatReducer from "./pharmacy/update/reducer";
import getitemReducer from "./nurse/index/reducer";
import createitemReducer from "./nurse/create/reducer";
import deleteitemReducer from './nurse/delete/reducer';
import edititemReducer from "./nurse/edit/reducer";
import schedulePReducer from './resepsionis/jadwal/reducer';
import buatJanjiReducer from './resepsionis/buatjanji/reducer';
import antrianReducer from './resepsionis/antrian/reducer';
import identitasReducer from './resepsionis/identitas/reducer';
import getemrReducer from './doctor/indexEmr/reducer';
import getdetailemrReducer from './doctor/detailEmr/reducer';
import createvitalReducer from './nurse/vital/reducer';
import getvitalsignReducer from './doctor/vitalSign/reducer';
import createnewentryReducer from './doctor/newEntry/reducer';
import transactionReducer from './kasir/index/reducer';
import createcpptentryReducer from './doctor/cpptEntry/reducer';
import updateactionReducer from './doctor/action/reducer';
import createorderReducer from './doctor/finishOrder/reducer';
import getorderinfoReducer from './doctor/orderInfo/reducer';
import createorderobatReducer from './doctor/orderMedicine/reducer';
import createorderprosedurReducer from './doctor/orderProcedure/reducer';
import createordersuratrujukanReducer from './doctor/orderReferralLetter/reducer';
import createordersuratsakitReducer from './doctor/orderSickLetter/reducer';

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
    deletePendaftar: deletePendaftarReducer,
    orderObat: orderobatReducer,
    statusorderObat: statusorderobatReducer,
    getItem: getitemReducer,
    createItem: createitemReducer,
    deleteItem: deleteitemReducer,
    editItem: edititemReducer,
    getScheduleP: schedulePReducer,
    buatJanji: buatJanjiReducer,
    antrian: antrianReducer,
    identitas: identitasReducer,
    getEmr: getemrReducer,
    getdetailEmr: getdetailemrReducer,
    createVital: createvitalReducer,
    getVital: getvitalsignReducer,
    createNewEntry: createnewentryReducer,
    transaction: transactionReducer,
    createCpptEntry: createcpptentryReducer,
    updateAction: updateactionReducer,
    createOrder: createorderReducer,
    getorderInfo: getorderinfoReducer,
    createorderObat: createorderobatReducer,
    createorderProsedur: createorderprosedurReducer,
    createorderSuratRujukan: createordersuratrujukanReducer,
    createorderSuratSakit: createordersuratsakitReducer
}); 

const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;
