import { getData } from '../../../utils/fetch';
import { FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_FAILURE } from './constants';

export const fetchTransaction = () => async (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
    try {
        const response = await getData('/cms/orders');
        dispatch({
            type: FETCH_TRANSACTIONS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_TRANSACTIONS_FAILURE,
            payload: error.message
        });
    }
};
