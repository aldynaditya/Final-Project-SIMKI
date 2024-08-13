import { 
    GET_SEARCH_PROSEDUR_REQUEST, 
    GET_SEARCH_PROSEDUR_SUCCESS,
    GET_SEARCH_PROSEDUR_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const searchprosedurReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEARCH_PROSEDUR_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_SEARCH_PROSEDUR_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_SEARCH_PROSEDUR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default searchprosedurReducer;
