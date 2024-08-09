import {
    FETCH_OBAT_REQUEST,
    FETCH_OBAT_SUCCESS,
    FETCH_OBAT_FAILURE,
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OBAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_OBAT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FETCH_OBAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default getobatReducer;
