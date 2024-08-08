import { 
    postData,
    getData
} from '../../../utils/fetch';
import {
    SUBMIT_RESPONSES_REQUEST,
    SUBMIT_RESPONSES_SUCCESS,
    SUBMIT_RESPONSES_FAILURE,
    FETCH_RESPONSES_REQUEST,
    FETCH_RESPONSES_SUCCESS,
    FETCH_RESPONSES_FAILURE

} from './constants';

export const submitResponses = (id, responses) => async (dispatch) => {
    dispatch({ type: SUBMIT_RESPONSES_REQUEST });

    try {
        const formattedResponses = responses.map((response) => {
            const answer = String(response.answer).trim();
            return {
                questionId: response.questionId,
                answer: answer
            };
        });

        const response = await postData(`/responses/${id}`, { responses: formattedResponses });
        dispatch({
            type: SUBMIT_RESPONSES_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: SUBMIT_RESPONSES_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchResponses = (emrId) => async (dispatch) => {
    dispatch({ type: FETCH_RESPONSES_REQUEST });

    try {
        const response = await getData(`/cms/responses/${emrId}`);
        dispatch({
            type: FETCH_RESPONSES_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_RESPONSES_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};