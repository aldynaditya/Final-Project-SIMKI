import { 
    FETCH_DETAIL_TRANSACTIONS_REQUEST, 
    FETCH_DETAIL_TRANSACTIONS_SUCCESS, 
    FETCH_DETAIL_TRANSACTIONS_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const getdetailorderReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_DETAIL_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_DETAIL_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case FETCH_DETAIL_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default getdetailorderReducer;