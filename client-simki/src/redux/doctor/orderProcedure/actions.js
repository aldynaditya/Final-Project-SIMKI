import {
    CREATE_ORDER_PROSEDUR_REQUEST,
    CREATE_ORDER_PROSEDUR_SUCCESS,
    CREATE_ORDER_PROSEDUR_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createorderProsedur = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_PROSEDUR_REQUEST });

    try {
        const response = await postData(`/cms/order-item/${id}`, formData);
        dispatch({
            type: CREATE_ORDER_PROSEDUR_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_PROSEDUR_FAILURE,
            payload: error.message,
        });
    }
};
