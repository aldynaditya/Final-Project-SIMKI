import { 
    GET_ORDER_INFORMATION_REQUEST, 
    GET_ORDER_INFORMATION_SUCCESS,
    GET_ORDER_INFORMATION_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getorderinfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_INFORMATION_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ORDER_INFORMATION_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_ORDER_INFORMATION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getorderinfoReducer;
