import {
    DELETE_ORDER_PROSEDUR_REQUEST,
    DELETE_ORDER_PROSEDUR_SUCCESS,
    DELETE_ORDER_PROSEDUR_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteorderprosedurReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ORDER_PROSEDUR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ORDER_PROSEDUR_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_ORDER_PROSEDUR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteorderprosedurReducer;