import { 
    GET_EPISODE_REQUEST, 
    GET_EPISODE_SUCCESS,
    GET_EPISODE_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const getepisodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EPISODE_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EPISODE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_EPISODE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default getepisodeReducer;
