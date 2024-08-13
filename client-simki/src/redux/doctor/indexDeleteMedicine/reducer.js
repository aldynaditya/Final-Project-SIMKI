import {
    DELETE_ORDER_OBAT_REQUEST,
    DELETE_ORDER_OBAT_SUCCESS,
    DELETE_ORDER_OBAT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteorderobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ORDER_OBAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ORDER_OBAT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_ORDER_OBAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteorderobatReducer;