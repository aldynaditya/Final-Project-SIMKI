import {
    CREATE_ORDER_PROCEDURE_REQUEST,
    CREATE_ORDER_PROCEDURE_SUCCESS,
    CREATE_ORDER_PROCEDURE_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createorderProsedur = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_PROCEDURE_REQUEST });

    try {
        const response = await postData(`/cms/order-item/${id}`, formData);
        dispatch({
            type: CREATE_ORDER_PROCEDURE_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_PROCEDURE_FAILURE,
            payload: error.message,
        });
    }
};
