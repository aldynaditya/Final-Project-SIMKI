import { 
    GET_IDENTITAS_PASIEN_REQUEST,
    GET_IDENTITAS_PASIEN_SUCCESS, 
    GET_IDENTITAS_PASIEN_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchPasien = () => async (dispatch) => {
    dispatch({ type: GET_IDENTITAS_PASIEN_REQUEST });
    try {
        const response = await getData('/cms/datapasien');
        dispatch({ type: GET_IDENTITAS_PASIEN_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_IDENTITAS_PASIEN_FAILURE, payload: error.message });
    }
};
