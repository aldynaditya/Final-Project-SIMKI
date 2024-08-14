import {
    DELETE_ORDER_SURAT_REQUEST,
    DELETE_ORDER_SURAT_SUCCESS,
    DELETE_ORDER_SURAT_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteorderSurat = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_SURAT_REQUEST });

    try {
        await deleteData(`/cms/order-surat/${id}`);
        dispatch({
            type: DELETE_ORDER_SURAT_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_SURAT_FAILURE,
            payload: error.message,
        });
    }
};
