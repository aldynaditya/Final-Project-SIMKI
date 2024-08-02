import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const createAppointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case CREATE_APPOINTMENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                data: action.payload, 
                error: null 
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

export default createAppointmentReducer;
