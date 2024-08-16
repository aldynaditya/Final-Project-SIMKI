import {
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    DELETE_PATIENT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deletepasienReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PATIENT_REQUEST:
            return { ...state, loading: true, error: null};
        case DELETE_PATIENT_SUCCESS:
            return { ...state, loading: false, error: null };
        case DELETE_PATIENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default deletepasienReducer;