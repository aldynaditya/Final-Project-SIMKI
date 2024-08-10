import {
    EDIT_OBAT_REQUEST,
    EDIT_OBAT_SUCCESS,
    EDIT_OBAT_FAILURE,
    FETCH_OBAT_BY_ID_REQUEST,
    FETCH_OBAT_BY_ID_SUCCESS,
    FETCH_OBAT_BY_ID_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    obat: {},
};

const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OBAT_BY_ID_REQUEST:
            return { ...state, loading: true };
        case FETCH_OBAT_BY_ID_SUCCESS:
            return { ...state, loading: false, obat: action.payload };
        case FETCH_OBAT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_OBAT_REQUEST:
            return { ...state, loading: true };
        case EDIT_OBAT_SUCCESS:
            return { ...state, loading: false };
        case EDIT_OBAT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default editReducer;
