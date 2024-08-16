import {
    CREATE_PENDAFTAR_REQUEST,
    CREATE_PENDAFTAR_SUCCESS,
    CREATE_PENDAFTAR_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';

export const createPasien = ( formData ) => async (dispatch) => {
    dispatch({ type: CREATE_PENDAFTAR_REQUEST });

    try {
        const response = await postData('/cms/datapasien', formData);
        dispatch({
            type: CREATE_PENDAFTAR_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_PENDAFTAR_FAILURE,
            payload: error.message,
        });
    }
};
