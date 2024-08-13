import {
    DELETE_ORDER_PROSEDUR_REQUEST,
    DELETE_ORDER_PROSEDUR_SUCCESS,
    DELETE_ORDER_PROSEDUR_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteorderProsedur = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_PROSEDUR_REQUEST });

    try {
        await deleteData(`/cms/order-item/${id}`);
        dispatch({
            type: DELETE_ORDER_PROSEDUR_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_PROSEDUR_FAILURE,
            payload: error.message,
        });
    }
};
