import {
    FETCH_ITEM_REQUEST,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEM_FAILURE,
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getitemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FETCH_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default getitemReducer;
