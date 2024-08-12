import { 
    GET_ORDER_INFORMATION_REQUEST, 
    GET_ORDER_INFORMATION_SUCCESS, 
    GET_ORDER_INFORMATION_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchorderInfo = (id) => async (dispatch) => {
    dispatch({ type: GET_ORDER_INFORMATION_REQUEST });

    try {
        const response = await getData(`/cms/detail-information/${id}`);
        dispatch({ type: GET_ORDER_INFORMATION_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_ORDER_INFORMATION_FAILURE, payload: error.message });
    }
};
