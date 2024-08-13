import {
    FINISH_ORDER_OBAT_REQUEST,
    FINISH_ORDER_OBAT_SUCCESS,
    FINISH_ORDER_OBAT_FAILURE,
} from './constants';
import { patchData } from '../../../utils/fetch';

export const finishorderObat = (id, data) => async (dispatch) => {
    dispatch({ type: FINISH_ORDER_OBAT_REQUEST });

    try {
        await patchData(`/cms/order-obat/status/${id}`, data);
        dispatch({
            type: FINISH_ORDER_OBAT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: FINISH_ORDER_OBAT_FAILURE,
            payload: error.message,
        });
    }
};
