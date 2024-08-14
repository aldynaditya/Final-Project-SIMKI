import { postData } from '../../../utils/fetch';
import { SAVE_FACTUR_REQUEST, SAVE_FACTUR_SUCCESS, SAVE_FACTUR_FAILURE } from './constants';

export const saveFactur = (data) => async (dispatch) => {
    dispatch({ type: SAVE_FACTUR_REQUEST });

    try {
        const response = await postData('/cms/orders', data);
        dispatch({ type: SAVE_FACTUR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SAVE_FACTUR_FAILURE, payload: error.message });
    }
};
