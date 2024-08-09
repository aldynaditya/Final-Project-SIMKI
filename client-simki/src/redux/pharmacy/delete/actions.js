import {
    DELETE_OBAT_REQUEST,
    DELETE_OBAT_SUCCESS,
    DELETE_OBAT_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteObat = (id) => async (dispatch) => {
    dispatch({ type: DELETE_OBAT_REQUEST });

    try {
        await deleteData(`/cms/obat/${id}`);
        dispatch({
            type: DELETE_OBAT_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_OBAT_FAILURE,
            payload: error.message,
        });
    }
};
