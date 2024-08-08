import {
    SUBMIT_RESPONSES_REQUEST,
    SUBMIT_RESPONSES_SUCCESS,
    SUBMIT_RESPONSES_FAILURE,
    FETCH_RESPONSES_REQUEST,
    FETCH_RESPONSES_SUCCESS,
    FETCH_RESPONSES_FAILURE
} from './constants';

const initialState = {
    responses: [],
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
        case FETCH_RESPONSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RESPONSES_SUCCESS:
            return {
                ...state,
                loading: false,
                responses: action.payload,
                error: null
            };
        case FETCH_RESPONSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default responseReducer;
