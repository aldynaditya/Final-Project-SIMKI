import { 
    GET_SCHEDULEP_REQUEST,
    GET_SCHEDULEP_SUCCESS, 
    GET_SCHEDULEP_ERROR 
} from './constants';

const initialState = {
    schedules: [],
    error: null,
    loading: false
};

const schedulePReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHEDULEP_REQUEST:
            return { 
                ...state, 
                loading: true 
            };
        case GET_SCHEDULEP_SUCCESS:
            return { 
                ...state, 
                schedules: action.payload, 
                error: null,
                loading: false 
            };
        case GET_SCHEDULEP_ERROR:
            return { 
                ...state, 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default schedulePReducer;
