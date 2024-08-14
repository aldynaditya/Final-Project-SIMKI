import { getData, putData } from '../../../utils/fetch';
import {
    FETCH_NOTIFIKASI_REQUEST,
    FETCH_NOTIFIKASI_SUCCESS,
    FETCH_NOTIFIKASI_FAILURE,
    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_FAILURE,
} from './constants';


export const fetchNotifikasi = () => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFIKASI_REQUEST });
    try {
        const response = await getData('/cms/laporan/pimpinan');
        dispatch({
            type: FETCH_NOTIFIKASI_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_NOTIFIKASI_FAILURE,
            payload: error.message,
        });
    }
};


export const updateStatus = (id, status) => async (dispatch) => {
    dispatch({ type: UPDATE_STATUS_REQUEST });
    try {
        await putData(`/laporan/pimpinan/${id}/status`, { status });
        dispatch({
            type: UPDATE_STATUS_SUCCESS,
            payload: { id, status },
        });
    } catch (error) {
        dispatch({
            type: UPDATE_STATUS_FAILURE,
            payload: error.message,
        });
    }
};
