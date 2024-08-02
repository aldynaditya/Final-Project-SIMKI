import { 
    GET_SCHEDULE_REQUEST,
    GET_SCHEDULES_SUCCESS, 
    GET_SCHEDULES_ERROR 
} from './constants';

const initialState = {
    schedules: [],
    error: null,
    loading: false
};

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHEDULE_REQUEST:
            return { 
                ...state, 
                loading: true 
            };
        case GET_SCHEDULES_SUCCESS:
            return { 
                ...state, 
                schedules: action.payload, 
                error: null 
            };
        case GET_SCHEDULES_ERROR:
            return { 
                ...state, 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default scheduleReducer;
