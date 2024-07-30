import { postData } from '../../../utils/fetch';
import { DAFTAR_REQUEST, DAFTAR_SUCCESS, DAFTAR_FAILURE } from './constants';

export const daftarUser = (userData) => async (dispatch) => {
    dispatch({ type: DAFTAR_REQUEST });

    try {
        const response = await postData('/auth/signup', userData);
        dispatch({ type: DAFTAR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DAFTAR_FAILURE, payload: error.message });
    }
};
