import {
    DELETE_ORDER_SURAT_REQUEST,
    DELETE_ORDER_SURAT_SUCCESS,
    DELETE_ORDER_SURAT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteordersuratReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ORDER_SURAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ORDER_SURAT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_ORDER_SURAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteordersuratReducer;