import { 
    UPDATE_ORDER_TO_TRANSACTION_REQUEST, 
    UPDATE_ORDER_TO_TRANSACTION_SUCCESS, 
    UPDATE_ORDER_TO_TRANSACTION_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

const updateordertotransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDER_TO_TRANSACTION_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_ORDER_TO_TRANSACTION_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case UPDATE_ORDER_TO_TRANSACTION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default updateordertotransactionReducer;
