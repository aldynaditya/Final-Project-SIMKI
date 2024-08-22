import {
    FETCH_NOTIFIKASI_REQUEST,
    FETCH_NOTIFIKASI_SUCCESS,
    FETCH_NOTIFIKASI_FAILURE,
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchNotifikasiLaporan = () => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFIKASI_REQUEST });
    try {
        const response = await getData('/cms/laporan/pimpinan');
        dispatch({
            type: FETCH_NOTIFIKASI_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_NOTIFIKASI_FAILURE,
            payload: error.message,
        });
    }
};
