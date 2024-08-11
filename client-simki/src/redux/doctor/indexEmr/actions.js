import { 
    GET_EMR_REQUEST, 
    GET_EMR_SUCCESS, 
    GET_EMR_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchEmr = () => async (dispatch) => {
    dispatch({ type: GET_EMR_REQUEST });

    try {
        const response = await getData('/cms/emr');
        dispatch({ type: GET_EMR_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_EMR_FAILURE, payload: error.message });
    }
};
