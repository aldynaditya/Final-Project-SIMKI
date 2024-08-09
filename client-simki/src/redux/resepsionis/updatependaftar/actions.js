import { getData } from '../../../utils/fetch';
import { FETCH_PASIEN_REQUEST, FETCH_PASIEN_SUCCESS, FETCH_PASIEN_FAILURE } from './constants';

export const fetchPasien = () => async (dispatch) => {
    dispatch({ type: FETCH_PASIEN_REQUEST });

    try {
        const response = await getData('/cms/datapasien');
        dispatch({
            type: FETCH_PASIEN_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_PASIEN_FAILURE,
            payload: error.message,
        });
    }
};
