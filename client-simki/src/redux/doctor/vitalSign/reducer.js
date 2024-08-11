import { 
    GET_VITAL_SIGN_REQUEST, 
    GET_VITAL_SIGN_SUCCESS,
    GET_VITAL_SIGN_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getvitalsignReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VITAL_SIGN_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_VITAL_SIGN_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_VITAL_SIGN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getvitalsignReducer;
