import {
    DELETE_SCHEDULE_REQUEST,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
};

const deleteJadwalReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_SCHEDULE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_SCHEDULE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_SCHEDULE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default deleteJadwalReducer;