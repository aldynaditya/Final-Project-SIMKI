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
import facturReducer from './kasir/create/reducer';
import transaksiReducer from './keuangan/indextransaksi/reducer';
import laporanReducer from './keuangan/create/reducer';
import notifReducer from './keuangan/indexnotif/reducer';
import updateStatusReducer from './pimpinan/update/reducer';
import pimpinanReducer from './pimpinan/index/reducer';

import createcpptentryReducer from './doctor/cpptEntry/reducer';
import updateactionReducer from './doctor/action/reducer';
import createorderReducer from './doctor/finishOrder/reducer';
import getorderinfoReducer from './doctor/orderInfo/reducer';
import createorderobatReducer from './doctor/orderMedicine/reducer';
import createorderprosedurReducer from './doctor/orderProcedure/reducer';
import createordersuratrujukanReducer from './doctor/orderReferralLetter/reducer';
import createordersuratsakitReducer from './doctor/orderSickLetter/reducer';
import getorderobatReducer from './doctor/indexMedicine/reducer';
import getorderprosedurReducer from './doctor/indexProcedure/reducer';
import getordersuratReducer from './doctor/indexLetter/reducer';
import searchobatReducer from './doctor/searchMedicine/reducer';
import deleteorderobatReducer from './doctor/indexDeleteMedicine/reducer';
import finishorderobatReducer from './doctor/indexDeleteMedicine/reducer';
import deleteorderprosedurReducer from './doctor/indexDeleteProcedure/reducer';
import searchprosedurReducer from './doctor/searchProcedure/reducer';
import deleteordersuratReducer from './doctor/indexDeleteLetter/reducer';


const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    //Page Admin
    user: userReducer,
    addUser: addUserReducer,
    //Page Pasien
    auth: authReducer,
    profile: profileReducer,
    daftar: daftarReducer,
    activated: activatedReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    appointments: appointmentReducer,
    history: historyReducer,
    detail: detailReducer,
    createAppointment: createAppointmentReducer,
    schedule: scheduleReducer,
    resendOtp: resendOtpReducer,
    questions: questionReducer,
    responses: responseReducer,
    //Page Pendaftar Baru
    createPendaftar: createPendaftarReducer,
    pasien: pasienReducer,
    deletePendaftar: deletePendaftarReducer,
    //Page Kelola Obat & Order Masuk
    getObat: getobatReducer,
    createObat: createobatReducer,
    deleteObat: deleteobatReducer,
    editObat: editobatReducer,
    orderObat: orderobatReducer,
    statusorderObat: statusorderobatReducer,
    //Page Kelola Item
    getItem: getitemReducer,
    createItem: createitemReducer,
    deleteItem: deleteitemReducer,
    editItem: edititemReducer,
    //Jadwal for Page Dokter, Resepsionis, & Perawat
    getScheduleP: schedulePReducer,
    //Page buat janji
    buatJanji: buatJanjiReducer,
    antrian: antrianReducer,
    identitas: identitasReducer,
    //Page EMR
    getEmr: getemrReducer,
    getdetailEmr: getdetailemrReducer,
    createVital: createvitalReducer,
    getVital: getvitalsignReducer,
    createNewEntry: createnewentryReducer,
//Page Transaksi
    transaction: transactionReducer,
    factur: facturReducer,
    transaksi: transaksiReducer,
    laporan: laporanReducer,
    notif: notifReducer,
    updateStatus: updateStatusReducer,
    pimpinan: pimpinanReducer,

    //Page Doctor
    createCpptEntry: createcpptentryReducer,
    updateAction: updateactionReducer,
    createOrder: createorderReducer,
    
    //All Page Order
    getorderInfo: getorderinfoReducer,
    
    //Page Order Obat
    createorderObat: createorderobatReducer,
    getorderObat: getorderobatReducer,
    searchObat: searchobatReducer,
    deleteorderObat: deleteorderobatReducer,
    finishorderObat: finishorderobatReducer,
    
    //Page Order Prosedur
    getorderProsedur: getorderprosedurReducer,
    searchProsedur: searchprosedurReducer,
    createorderProsedur: createorderprosedurReducer,
    deleteorderProsedur: deleteorderprosedurReducer,
    
    //Page Order Surat
    getorderSurat: getordersuratReducer,
    createorderSuratRujukan: createordersuratrujukanReducer,
    createorderSuratSakit: createordersuratsakitReducer,
    deleteorderSurat: deleteordersuratReducer,
}); 

const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;
