import { 
    GET_INDEX_PROSEDUR_REQUEST, 
    GET_INDEX_PROSEDUR_SUCCESS,
    GET_INDEX_PROSEDUR_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getorderprosedurReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INDEX_PROSEDUR_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_INDEX_PROSEDUR_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_INDEX_PROSEDUR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getorderprosedurReducer;
