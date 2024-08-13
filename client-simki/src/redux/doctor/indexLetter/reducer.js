import { 
    GET_INDEX_LETTER_REQUEST, 
    GET_INDEX_LETTER_SUCCESS,
    GET_INDEX_LETTER_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getorderletterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INDEX_LETTER_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_INDEX_LETTER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_INDEX_LETTER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getorderletterReducer;
