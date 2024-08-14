import {
    FINISH_ORDER_OBAT_REQUEST,
    FINISH_ORDER_OBAT_SUCCESS,
    FINISH_ORDER_OBAT_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

const finishorderobatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FINISH_ORDER_OBAT_REQUEST:
            return { ...state, loading: true };
        case FINISH_ORDER_OBAT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FINISH_ORDER_OBAT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default finishorderobatReducer;
