import { 
    GET_HISTORY_REQUEST, 
    GET_HISTORY_SUCCESS, 
    GET_HISTORY_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchHistory = () => async (dispatch) => {
    dispatch({ type: GET_HISTORY_REQUEST });

    try {
        const response = await getData('/visit-history');
        dispatch({ type: GET_HISTORY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_HISTORY_FAILURE, payload: error.message });
    }
};
