import {
    EDIT_SCHEDULE_REQUEST,
    EDIT_SCHEDULE_SUCCESS,
    EDIT_SCHEDULE_FAILURE,
    FETCH_SCHEDULE_BY_ID_REQUEST,
    FETCH_SCHEDULE_BY_ID_SUCCESS,
    FETCH_SCHEDULE_BY_ID_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

const editJadwalReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SCHEDULE_BY_ID_REQUEST:
            return { ...state, loading: true };
        case FETCH_SCHEDULE_BY_ID_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_SCHEDULE_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_SCHEDULE_REQUEST:
            return { ...state, loading: true };
        case EDIT_SCHEDULE_SUCCESS:
            return { ...state, loading: false };
        case EDIT_SCHEDULE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default editJadwalReducer;
