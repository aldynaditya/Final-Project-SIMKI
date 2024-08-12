import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const createorderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true };
        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createorderReducer;
