import { 
    UPDATE_ORDER_TO_TRANSACTION_REQUEST, 
    UPDATE_ORDER_TO_TRANSACTION_SUCCESS, 
    UPDATE_ORDER_TO_TRANSACTION_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    errordata: null,
    updatedata: {},
};

const updateordertotransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDER_TO_TRANSACTION_REQUEST:
            return { ...state, loading: true, errordata: null };
        case UPDATE_ORDER_TO_TRANSACTION_SUCCESS:
            return { ...state, loading: false, updatedata: action.payload, errordata: null };
        case UPDATE_ORDER_TO_TRANSACTION_FAILURE:
            return { ...state, loading: false, errordata: action.payload, updatedata: null };
        default:
            return state;
    }
};

export default updateordertotransactionReducer;
