import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createOrder = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        const response = await postData(`/cms/emr/${id}/finish-order`, formData);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
        });
    }
};
