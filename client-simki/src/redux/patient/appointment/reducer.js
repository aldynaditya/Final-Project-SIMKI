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

const initialState = {
    doctors: [],
    hours: [],
    appointments: [],
    loading: false,
    error: null,
};

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                appointments: action.payload,
            };
        case FETCH_APPOINTMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_DOCTORS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_DOCTORS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                doctors: action.payload 
            };
        case GET_DOCTORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_HOURS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_HOURS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                hours: action.payload 
            };
        case GET_HOURS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_APPOINTMENT_REQUEST:
            return { 
                ...state, 
                loading: true 
            };
        case CREATE_APPOINTMENT_SUCCESS:
            return { 
                ...state, 
                loading: false 
            };
        case CREATE_APPOINTMENT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default appointmentReducer;
