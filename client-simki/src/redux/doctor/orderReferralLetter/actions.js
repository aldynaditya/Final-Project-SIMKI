import {
    CREATE_ORDER_REFERRAL_LETTER_REQUEST,
    CREATE_ORDER_REFERRAL_LETTER_SUCCESS,
    CREATE_ORDER_REFERRAL_LETTER_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createorderSuratRujukan = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REFERRAL_LETTER_REQUEST });

    try {
        const response = await postData(`/cms/order-surat-rujukan/${id}`, formData);
        dispatch({
            type: CREATE_ORDER_REFERRAL_LETTER_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_REFERRAL_LETTER_FAILURE,
            payload: error.message,
        });
    }
};
