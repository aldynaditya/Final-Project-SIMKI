import {
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const statusorderobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDER_STATUS_REQUEST:
            return { ...state, loading: true };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case UPDATE_ORDER_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default statusorderobatReducer;
