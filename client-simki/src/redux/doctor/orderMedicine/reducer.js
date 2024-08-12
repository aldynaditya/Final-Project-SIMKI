import {
    CREATE_ORDER_OBAT_REQUEST,
    CREATE_ORDER_OBAT_SUCCESS,
    CREATE_ORDER_OBAT_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const createorderobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_OBAT_REQUEST:
            return { ...state, loading: true };
        case CREATE_ORDER_OBAT_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case CREATE_ORDER_OBAT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createorderobatReducer;
