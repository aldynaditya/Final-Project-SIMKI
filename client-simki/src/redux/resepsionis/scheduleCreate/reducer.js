import {
    CREATE_SCHEDULE_REQUEST,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const createjadwalReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SCHEDULE_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case CREATE_SCHEDULE_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                data: action.payload, 
                error: null 
            };
        case CREATE_SCHEDULE_FAILURE:
            return { 
                ...state, 
                loading: false,
                error: action.payload 
            };
        default:
            return initialState;
    }
};

export default createjadwalReducer;
