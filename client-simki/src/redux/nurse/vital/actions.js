import {
    CREATE_VITAL_REQUEST,
    CREATE_VITAL_SUCCESS,
    CREATE_VITAL_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createVital = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_VITAL_REQUEST });

    try {
        const response = await postData(`/cms/emr/${id}/nurse`, formData);
        dispatch({
            type: CREATE_VITAL_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_VITAL_FAILURE,
            payload: error.message,
        });
    }
};
