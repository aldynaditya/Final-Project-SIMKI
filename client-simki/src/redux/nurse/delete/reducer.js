import {
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteitemReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteitemReducer;