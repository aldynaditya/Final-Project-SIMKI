import {
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createFeedback = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_FEEDBACK_REQUEST });

    try {
        const response = await postData(`/cms/feedback/${id}`, formData);
        dispatch({
            type: CREATE_FEEDBACK_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_FEEDBACK_FAILURE,
            payload: error.message,
        });
    }
};
