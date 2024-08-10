import {
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
} from './constants';
import { patchData } from '../../../utils/fetch';

export const updateOrderStatus = (id) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const response = await patchData(`/cms/order-obat/${id}`);
        dispatch({
            type: UPDATE_ORDER_STATUS_SUCCESS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_STATUS_FAILURE,
            payload: error.message
        });
    }
};
