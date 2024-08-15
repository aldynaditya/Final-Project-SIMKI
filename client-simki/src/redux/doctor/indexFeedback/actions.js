import {
    FETCH_FEEDBACK_REQUEST,
    FETCH_FEEDBACK_SUCCESS,
    FETCH_FEEDBACK_FAILURE,
} from './constants';
import { getData } from '../../../utils/fetch';


export const fetchFeedback = (id) => async (dispatch) => {
    dispatch({ type: FETCH_FEEDBACK_REQUEST });

    try {
        const response = await getData(`/cms/feedback/${id}`);
        dispatch({
            type: FETCH_FEEDBACK_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_FEEDBACK_FAILURE,
            payload: error.message,
        });
    }
};
