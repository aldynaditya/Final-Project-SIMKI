import { 
    GET_RESPONSE_REQUEST, 
    GET_RESPONSE_SUCCESS, 
    GET_RESPONSE_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchResponseById = (id) => async (dispatch) => {
    dispatch({ type: GET_RESPONSE_REQUEST });

    try {
        const response = await getData(`/cms/responses/${id}`);
        dispatch({ type: GET_RESPONSE_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_RESPONSE_FAILURE, payload: error.message });
    }
};
