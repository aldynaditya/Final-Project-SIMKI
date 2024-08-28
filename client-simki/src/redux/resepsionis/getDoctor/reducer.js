import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const scheduledoctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default scheduledoctorReducer;
