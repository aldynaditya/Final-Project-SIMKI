import {
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const createfeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FEEDBACK_REQUEST:
            return { ...state, loading: true };
        case CREATE_FEEDBACK_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case CREATE_FEEDBACK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createfeedbackReducer;
