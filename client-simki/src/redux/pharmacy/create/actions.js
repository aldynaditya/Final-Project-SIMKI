import {
    CREATE_OBAT_REQUEST,
    CREATE_OBAT_SUCCESS,
    CREATE_OBAT_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';

export const createObat = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_OBAT_REQUEST });

    try {
        const response = await postData('/cms/obat', formData);
        dispatch({ type: CREATE_OBAT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: CREATE_OBAT_FAILURE, payload: error.message });
    }
};
