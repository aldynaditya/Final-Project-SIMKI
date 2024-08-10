import { deleteData } from '../../../utils/fetch';
import {
    DELETE_PENDAFTAR_REQUEST,
    DELETE_PENDAFTAR_SUCCESS,
    DELETE_PENDAFTAR_FAILURE,
} from './constants';

export const deletePendaftar = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PENDAFTAR_REQUEST });

    try {
        await deleteData(`/cms/datapasien/${id}`);
        dispatch({ type: DELETE_PENDAFTAR_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_PENDAFTAR_FAILURE, payload: error.message });
    }
};
