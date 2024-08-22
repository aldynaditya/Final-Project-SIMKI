import { 
    UPDATE_ORDER_TO_TRANSACTION_REQUEST, 
    UPDATE_ORDER_TO_TRANSACTION_SUCCESS, 
    UPDATE_ORDER_TO_TRANSACTION_FAILURE 
} from './constants';
import { patchData } from '../../../utils/fetch';

export const updateOrdertoTransaction = (id, data) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_TO_TRANSACTION_REQUEST });

    try {
        const response = await patchData(`/cms/transaction/${id}`, data);
        dispatch({ type: UPDATE_ORDER_TO_TRANSACTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_TO_TRANSACTION_FAILURE, payload: error.message });
    }
};
