import { postData } from '../../../utils/fetch';
import {
    SUBMIT_RESPONSES_REQUEST,
    SUBMIT_RESPONSES_SUCCESS,
    SUBMIT_RESPONSES_FAILURE
} from './constants';

export const submitResponses = (id, responses) => async (dispatch) => {
    dispatch({ type: SUBMIT_RESPONSES_REQUEST });

    try {
        console.log('Response Answers:', responses);

        const formattedResponses = responses.map((response) => {
            console.log('Raw Answer:', response.answer);
            // Ensure answer is a string and matches ENUM values
            const answer = String(response.answer).trim();
            console.log('Formatted Answer:', answer);
            return {
                questionId: response.questionId,
                answer: answer
            };
        });

        // Send formatted data to the backend
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
