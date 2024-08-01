import {
    FETCH_APPOINTMENTS_REQUEST,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_FAILURE,
    GET_DOCTORS_REQUEST, 
    GET_DOCTORS_SUCCESS, 
    GET_DOCTORS_FAILURE, 
    GET_HOURS_REQUEST, 
    GET_HOURS_SUCCESS, 
    GET_HOURS_FAILURE, 
    CREATE_APPOINTMENT_REQUEST, 
    CREATE_APPOINTMENT_SUCCESS, 
    CREATE_APPOINTMENT_FAILURE
} from './constants';
import { 
    getData, 
    postData 
} from '../../../utils/fetch';

export const fetchAppointments = () => async (dispatch) => {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });

    try {
        const response = await getData('/appointment');
        dispatch({
            type: FETCH_APPOINTMENTS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_APPOINTMENTS_FAILURE,
            payload: error.message,
        });
    }
};

export const getDoctors = (poli) => async (dispatch) => {
    dispatch({ type: GET_DOCTORS_REQUEST });
    try {
        const response = await getData(`/cms/schedule`, { poli });
        dispatch({ type: GET_DOCTORS_SUCCESS, payload: response.data.data });
        const data = await response.json();
        console.log('Doctors fetched:', data);
    } catch (error) {
        dispatch({ type: GET_DOCTORS_FAILURE, payload: error.message });
    }
};

export const getAvailableHours = (dokter, tanggal) => async (dispatch) => {
    dispatch({ type: GET_HOURS_REQUEST });
    try {
        const response = await getData(`/cms/schedule`, { dokter, tanggal });
        dispatch({ type: GET_HOURS_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_HOURS_FAILURE, payload: error.message });
    }
};

export const createAppointment = (data) => async (dispatch) => {
    dispatch({ type: CREATE_APPOINTMENT_REQUEST });
    try {
        const response = await postData(`/appointment`, data);
        dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_APPOINTMENT_FAILURE, payload: error.message, });
    }
};
