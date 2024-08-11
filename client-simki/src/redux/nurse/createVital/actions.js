import {
    CREATE_VITAL_REQUEST,
    CREATE_VITAL_SUCCESS,
    CREATE_VITAL_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createVital = (id, data) => async (dispatch) => {
    dispatch({ type: CREATE_VITAL_REQUEST });

    try {
        await postData(`/emr/${id}/nurse`, data);
        dispatch({
            type: CREATE_VITAL_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CREATE_VITAL_FAILURE,
            payload: error.message,
        });
    }
};
