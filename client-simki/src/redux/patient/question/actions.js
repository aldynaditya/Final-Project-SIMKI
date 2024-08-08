import { getData } from '../../../utils/fetch';
import {
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE
} from './constants';

export const fetchQuestions = () => async (dispatch) => {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });

    try {
        const response = await getData('/cms/questions');
        dispatch({
            type: FETCH_QUESTIONS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_QUESTIONS_FAILURE,
            payload: error.message,
        });
    }
};
