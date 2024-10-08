import {
    FETCH_NOTIFIKASI_REQUEST,
    FETCH_NOTIFIKASI_SUCCESS,
    FETCH_NOTIFIKASI_FAILURE,
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const notifikasilaporanbypimpinanReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFIKASI_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_NOTIFIKASI_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case FETCH_NOTIFIKASI_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default notifikasilaporanbypimpinanReducer;
