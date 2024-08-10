import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const createitemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ITEM_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case CREATE_ITEM_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                data: action.payload, 
                error: null 
            };
        case CREATE_ITEM_FAILURE:
            return { 
                ...state, 
                loading: false,
                error: action.payload 
            };
        default:
            return initialState;
    }
};

export default createitemReducer;
