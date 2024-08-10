import {
    EDIT_ITEM_REQUEST,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAILURE,
    FETCH_ITEM_BY_ID_REQUEST,
    FETCH_ITEM_BY_ID_SUCCESS,
    FETCH_ITEM_BY_ID_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    item: {},
};

const edititemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEM_BY_ID_REQUEST:
            return { ...state, loading: true };
        case FETCH_ITEM_BY_ID_SUCCESS:
            return { ...state, loading: false, item: action.payload };
        case FETCH_ITEM_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_ITEM_REQUEST:
            return { ...state, loading: true };
        case EDIT_ITEM_SUCCESS:
            return { ...state, loading: false };
        case EDIT_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default edititemReducer;
