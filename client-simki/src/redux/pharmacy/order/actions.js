import {
    FETCH_ORDER_OBAT_REQUEST,
    FETCH_ORDER_OBAT_SUCCESS,
    FETCH_ORDER_OBAT_FAILURE,
} from './constants';
import { 
    getData,
} from '../../../utils/fetch';

export const fetchorderObat = () => async (dispatch) => {
    dispatch({ type: FETCH_ORDER_OBAT_REQUEST });

    try {
        const response = await getData('/cms/order-obat');
        dispatch({
            type: FETCH_ORDER_OBAT_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_ORDER_OBAT_FAILURE,
            payload: error.message,
        });
    }
};