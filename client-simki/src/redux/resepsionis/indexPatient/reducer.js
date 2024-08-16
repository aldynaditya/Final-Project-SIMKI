import { 
    GET_IDENTITAS_PASIEN_REQUEST,
    GET_IDENTITAS_PASIEN_SUCCESS, 
    GET_IDENTITAS_PASIEN_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: true,
    error: null,
};

const getpatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IDENTITAS_PASIEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_IDENTITAS_PASIEN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        case GET_IDENTITAS_PASIEN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default getpatientReducer;
