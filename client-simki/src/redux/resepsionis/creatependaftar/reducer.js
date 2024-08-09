import {
    CREATE_PENDAFTAR_REQUEST,
    CREATE_PENDAFTAR_SUCCESS,
    CREATE_PENDAFTAR_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    success: false,
    data: null,
};

const createPendaftarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PENDAFTAR_REQUEST:
            return { ...state, loading: true, error: null, success: false };
        case CREATE_PENDAFTAR_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case CREATE_PENDAFTAR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default createPendaftarReducer;
