import { 
    GET_DETAIL_EMR_REQUEST, 
    GET_DETAIL_EMR_SUCCESS, 
    GET_DETAIL_EMR_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchdetailEmr = (id) => async (dispatch) => {
    dispatch({ type: GET_DETAIL_EMR_REQUEST });

    try {
        const response = await getData(`/cms/emr/${id}`);
        dispatch({ type: GET_DETAIL_EMR_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_DETAIL_EMR_FAILURE, payload: error.message });
    }
};
