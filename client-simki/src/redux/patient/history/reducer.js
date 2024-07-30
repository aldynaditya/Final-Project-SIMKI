import { 
    GET_HISTORY_REQUEST, 
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_HISTORY_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default historyReducer;
