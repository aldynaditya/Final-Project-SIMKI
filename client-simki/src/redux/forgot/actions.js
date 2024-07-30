import { postData } from '../../utils/fetch';
import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
} from './constants';

export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const response = await postData('/forgot-password', { email });
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
};
