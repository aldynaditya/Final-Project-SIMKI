import {
    CREATE_ORDER_OBAT_REQUEST,
    CREATE_ORDER_OBAT_SUCCESS,
    CREATE_ORDER_OBAT_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createorderObat = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_OBAT_REQUEST });

    try {
        const response = await postData(`/cms/order-obat/${id}`, formData);
        dispatch({
            type: CREATE_ORDER_OBAT_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_OBAT_FAILURE,
            payload: error.message,
        });
    }
};
