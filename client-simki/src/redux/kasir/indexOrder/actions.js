import { 
    FETCH_TRANSACTIONS_REQUEST, 
    FETCH_TRANSACTIONS_SUCCESS, 
    FETCH_TRANSACTIONS_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';


export const fetchAllOrder = () => async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
    try {
        const response = await getData('/cms/orders');
        dispatch({
            type: FETCH_TRANSACTIONS_SUCCESS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_TRANSACTIONS_FAILURE,
            payload: error.message
        });
    }
};
