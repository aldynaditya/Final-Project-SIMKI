import {
    FETCH_PASIEN_REQUEST,
    FETCH_PASIEN_SUCCESS,
    FETCH_PASIEN_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const pasienReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PASIEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PASIEN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case FETCH_PASIEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default pasienReducer;
