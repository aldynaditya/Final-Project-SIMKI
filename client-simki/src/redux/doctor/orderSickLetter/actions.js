import {
    CREATE_ORDER_SICK_LETTER_REQUEST,
    CREATE_ORDER_SICK_LETTER_SUCCESS,
    CREATE_ORDER_SICK_LETTER_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createorderSuratSakit = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_SICK_LETTER_REQUEST });

    try {
        const response = await postData(`/cms/order-surat-sakit/${id}`, formData);
        dispatch({
            type: CREATE_ORDER_SICK_LETTER_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_SICK_LETTER_FAILURE,
            payload: error.message,
        });
    }
};
