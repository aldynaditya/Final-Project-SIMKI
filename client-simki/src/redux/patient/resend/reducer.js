import { 
    RESEND_OTP_REQUEST, 
    RESEND_OTP_SUCCESS, 
    RESEND_OTP_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const resendOtpReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESEND_OTP_REQUEST:
            return { ...state, loading: true, error: null };
        case RESEND_OTP_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case RESEND_OTP_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default resendOtpReducer;
