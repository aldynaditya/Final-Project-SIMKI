import { 
    GET_VITAL_SIGN_REQUEST, 
    GET_VITAL_SIGN_SUCCESS, 
    GET_VITAL_SIGN_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchVitalsign = (id) => async (dispatch) => {
    dispatch({ type: GET_VITAL_SIGN_REQUEST });

    try {
        const response = await getData(`/cms/vitalsign/${id}`);
        dispatch({ type: GET_VITAL_SIGN_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_VITAL_SIGN_FAILURE, payload: error.message });
    }
};
