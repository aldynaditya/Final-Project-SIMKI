import { 
    GET_LIST_EMR_REQUEST, 
    GET_LIST_EMR_SUCCESS,
    GET_LIST_EMR_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getlistemrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_EMR_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LIST_EMR_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_LIST_EMR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getlistemrReducer;
