import {
    CREATE_OBAT_REQUEST,
    CREATE_OBAT_SUCCESS,
    CREATE_OBAT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const createobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_OBAT_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case CREATE_OBAT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                data: action.payload, 
                error: null 
            };
        case CREATE_OBAT_FAILURE:
            return { 
                ...state, 
                loading: false,
                error: action.payload 
            };
        default:
            return initialState;
    }
};

export default createobatReducer;
