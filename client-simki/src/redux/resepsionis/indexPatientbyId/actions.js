import { 
    GET_IDENTITAS_PASIEN_ID_REQUEST,
    GET_IDENTITAS_PASIEN_ID_SUCCESS, 
    GET_IDENTITAS_PASIEN_ID_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchPasienbyId = (id) => async (dispatch) => {
    dispatch({ type: GET_IDENTITAS_PASIEN_ID_REQUEST });
    try {
        const response = await getData(`/cms/data-pasien/${id}`);
        dispatch({ type: GET_IDENTITAS_PASIEN_ID_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_IDENTITAS_PASIEN_ID_FAILURE, payload: error.message });
    }
};
