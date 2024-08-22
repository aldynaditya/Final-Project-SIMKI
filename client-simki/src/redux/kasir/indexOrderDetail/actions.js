import { 
    FETCH_DETAIL_TRANSACTIONS_REQUEST, 
    FETCH_DETAIL_TRANSACTIONS_SUCCESS, 
    FETCH_DETAIL_TRANSACTIONS_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';


export const fetchDetailOrderbyId = (id) => async (dispatch) => {
    dispatch({ type: FETCH_DETAIL_TRANSACTIONS_REQUEST });
    try {
        const response = await getData(`/cms/orders/${id}`);
        dispatch({
            type: FETCH_DETAIL_TRANSACTIONS_SUCCESS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_DETAIL_TRANSACTIONS_FAILURE,
            payload: error.message
        });
    }
};
