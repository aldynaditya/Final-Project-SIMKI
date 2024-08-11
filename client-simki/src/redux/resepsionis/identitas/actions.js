import { GET_IDENTITAS_PASIEN_SUCCESS, GET_IDENTITAS_PASIEN_FAILURE } from './constants';
import { getData } from '../../../utils/fetch';

export const getIdentitasPasien = () => async (dispatch) => {
    try {
        const response = await getData('/cms/datapasien');
        dispatch({ type: GET_IDENTITAS_PASIEN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_IDENTITAS_PASIEN_FAILURE, payload: error.message });
    }
};
