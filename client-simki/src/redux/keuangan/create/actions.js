import { postData } from '../../../utils/fetch';
import { CREATE_LAPORAN_REQUEST, CREATE_LAPORAN_SUCCESS, CREATE_LAPORAN_FAILURE } from './constants';

export const createLaporan = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_LAPORAN_REQUEST });
    try {
        const response = await postData('/cms/laporan', formData, true);
        dispatch({ type: CREATE_LAPORAN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_LAPORAN_FAILURE, payload: error.message });
    }
};
