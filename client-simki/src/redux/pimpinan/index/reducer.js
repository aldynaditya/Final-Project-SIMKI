import {
    FETCH_NOTIFIKASI_REQUEST,
    FETCH_NOTIFIKASI_SUCCESS,
    FETCH_NOTIFIKASI_FAILURE,
    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_FAILURE,
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const pimpinanReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFIKASI_REQUEST:
        case UPDATE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_NOTIFIKASI_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, status: action.payload.status }
                        : item
                ),
            };
        case FETCH_NOTIFIKASI_FAILURE:
        case UPDATE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default pimpinanReducer;
