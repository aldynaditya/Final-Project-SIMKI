import {
    SUBMIT_RESPONSES_REQUEST,
    SUBMIT_RESPONSES_SUCCESS,
    SUBMIT_RESPONSES_FAILURE
} from './constants';

const initialState = {
    submitting: false,
    response: null,
    error: null
};

const responseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_RESPONSES_REQUEST:
            return {
                ...state,
                submitting: true,
                error: null
            };
        case SUBMIT_RESPONSES_SUCCESS:
            return {
                ...state,
                submitting: false,
                response: action.payload,
                error: null
            };
        case SUBMIT_RESPONSES_FAILURE:
            return {
                ...state,
                submitting: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default responseReducer;
