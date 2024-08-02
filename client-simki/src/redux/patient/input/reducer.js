import { 
    GET_SCHEDULES_SUCCESS, 
    GET_SCHEDULES_ERROR 
} from './constants';

const initialState = {
    schedules: [],
    error: null,
};

const inputReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHEDULES_SUCCESS:
            return { 
                ...state, 
                schedules: action.payload, 
                error: null };
        case GET_SCHEDULES_ERROR:
            return { 
                ...state, 
                error: action.payload };
        default:
            return state;
    }
};

export default inputReducer;
