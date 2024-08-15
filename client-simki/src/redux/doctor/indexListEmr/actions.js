import { 
    GET_LIST_EMR_REQUEST, 
    GET_LIST_EMR_SUCCESS, 
    GET_LIST_EMR_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchListEmr = () => async (dispatch) => {
    dispatch({ type: GET_LIST_EMR_REQUEST });

    try {
        const response = await getData('/cms/list-emr');
        dispatch({ type: GET_LIST_EMR_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_LIST_EMR_FAILURE, payload: error.message });
    }
};
