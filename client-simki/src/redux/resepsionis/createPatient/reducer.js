import {
    CREATE_PENDAFTAR_REQUEST,
    CREATE_PENDAFTAR_SUCCESS,
    CREATE_PENDAFTAR_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: null,
};

const createpasienReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PENDAFTAR_REQUEST:
            return { ...state, loading: true, error: null};
        case CREATE_PENDAFTAR_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null, };
        case CREATE_PENDAFTAR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createpasienReducer;
