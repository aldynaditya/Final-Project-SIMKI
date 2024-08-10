import { 
    RESEND_OTP_REQUEST, 
    RESEND_OTP_SUCCESS, 
    RESEND_OTP_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    success: null,
    err: null,
};

const resendOtpReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESEND_OTP_REQUEST:
            return { ...state, loading: true, err: null };
        case RESEND_OTP_SUCCESS:
            return { ...state, loading: false, success: action.payload, err: null };
        case RESEND_OTP_FAILURE:
            return { ...state, loading: false, err: action.payload };
        default:
            return state;
    }
};

export default resendOtpReducer;
