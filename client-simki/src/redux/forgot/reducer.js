import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FORGOT_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default forgotPasswordReducer;
