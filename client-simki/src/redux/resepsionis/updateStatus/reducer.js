import {
    CREATE_UPDATE_STATUS_REQUEST,
    CREATE_UPDATE_STATUS_SUCCESS,
    CREATE_UPDATE_STATUS_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: null,
};

const updatestatusappointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UPDATE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_UPDATE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default updatestatusappointmentReducer;
