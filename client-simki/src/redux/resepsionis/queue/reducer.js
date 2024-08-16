import { 
    FETCH_APPOINTMENT_REQUEST, 
    FETCH_APPOINTMENT_SUCCESS, 
    FETCH_APPOINTMENT_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENT_REQUEST:
            return { ...state, loading: true };
        case FETCH_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_APPOINTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default appointmentReducer;
