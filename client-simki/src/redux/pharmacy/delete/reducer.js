import {
    DELETE_OBAT_REQUEST,
    DELETE_OBAT_SUCCESS,
    DELETE_OBAT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteObatReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_OBAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_OBAT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_OBAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteObatReducer;