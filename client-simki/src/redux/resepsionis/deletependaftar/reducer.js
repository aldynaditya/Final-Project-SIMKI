import {
    DELETE_PENDAFTAR_REQUEST,
    DELETE_PENDAFTAR_SUCCESS,
    DELETE_PENDAFTAR_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    success: null,
};

export const deletePendaftarReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PENDAFTAR_REQUEST:
            return { ...state, loading: true, error: null, success: null };
        case DELETE_PENDAFTAR_SUCCESS:
            return { ...state, loading: false, success: 'DataPasien berhasil terhapus', error: null };
        case DELETE_PENDAFTAR_FAILURE:
            return { ...state, loading: false, success: null, error: action.payload };
        default:
            return state;
    }
};
