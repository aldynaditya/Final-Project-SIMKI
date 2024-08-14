import {
    DELETE_ORDER_OBAT_REQUEST,
    DELETE_ORDER_OBAT_SUCCESS,
    DELETE_ORDER_OBAT_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteorderObat = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_OBAT_REQUEST });

    try {
        await deleteData(`/cms/order-obat/${id}`);
        dispatch({
            type: DELETE_ORDER_OBAT_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_OBAT_FAILURE,
            payload: error.message,
        });
    }
};
