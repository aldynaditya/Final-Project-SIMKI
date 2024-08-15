import {
    FETCH_FEEDBACK_REQUEST,
    FETCH_FEEDBACK_SUCCESS,
    FETCH_FEEDBACK_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const getfeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FEEDBACK_REQUEST:
            return { ...state, loading: true };
        case FETCH_FEEDBACK_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case FETCH_FEEDBACK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default getfeedbackReducer;
