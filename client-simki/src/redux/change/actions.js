import { postData } from '../../utils/fetch';
import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
} from './constants';

export const changePassword = (token, newPassword, confirmPassword) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
        const response = await postData('/reset-password', { token, newPassword, confirmPassword });
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error.message });
    }
};
