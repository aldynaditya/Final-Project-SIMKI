import { 
    DAFTAR_REQUEST, 
    DAFTAR_SUCCESS, 
    DAFTAR_FAILURE
} from './constants';
import { postData } from '../../../utils/fetch';

export const daftarUser = (userData) => async (dispatch) => {
    dispatch({ type: DAFTAR_REQUEST });

    try {
        const response = await postData('/auth/signup', userData);
        dispatch({ type: DAFTAR_SUCCESS, payload: { ...response.data, email: userData.email } });
    } catch (error) {
        dispatch({ type: DAFTAR_FAILURE, payload: error.message });
    }
};
