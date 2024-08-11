import { FETCH_ANTRIAN_REQUEST, FETCH_ANTRIAN_SUCCESS, FETCH_ANTRIAN_FAILURE } from './constants';
import { getData } from '../../../utils/fetch';

export const fetchAntrian = () => async (dispatch) => {
    dispatch({ type: FETCH_ANTRIAN_REQUEST });
    try {
        const response = await getData('/cms/appointment');
        dispatch({ type: FETCH_ANTRIAN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ANTRIAN_FAILURE, payload: error.message });
    }
};
