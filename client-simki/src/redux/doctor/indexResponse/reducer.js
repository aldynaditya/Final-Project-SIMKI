import { 
    GET_RESPONSE_REQUEST, 
    GET_RESPONSE_SUCCESS,
    GET_RESPONSE_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getresponsebyIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESPONSE_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_RESPONSE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_RESPONSE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getresponsebyIdReducer;
