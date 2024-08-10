import { postData } from '../../../utils/fetch';
import { 
    RESEND_OTP_REQUEST, 
    RESEND_OTP_SUCCESS, 
    RESEND_OTP_FAILURE 
} from './constants';

export const resendOtp = ( email ) => async (dispatch) => {
    dispatch({ type: RESEND_OTP_REQUEST });

    try {
        const response = await postData('/resend-otp', { email });
        dispatch({ type: RESEND_OTP_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: RESEND_OTP_FAILURE, payload: error.message });
    }
};
