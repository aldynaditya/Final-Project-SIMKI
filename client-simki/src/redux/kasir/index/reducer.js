import { FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_FAILURE } from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case FETCH_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default transactionReducer;
