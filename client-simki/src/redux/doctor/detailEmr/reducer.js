import { 
    GET_DETAIL_EMR_REQUEST, 
    GET_DETAIL_EMR_SUCCESS,
    GET_DETAIL_EMR_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getdetailemrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_EMR_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DETAIL_EMR_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case GET_DETAIL_EMR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getdetailemrReducer;
