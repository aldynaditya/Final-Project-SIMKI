import { 
    GET_INDEX_LETTER_REQUEST, 
    GET_INDEX_LETTER_SUCCESS, 
    GET_INDEX_LETTER_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchOrderLetter = () => async (dispatch) => {
    dispatch({ type: GET_INDEX_LETTER_REQUEST });

    try {
        const response = await getData('/cms/emr');
        dispatch({ type: GET_INDEX_LETTER_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_INDEX_LETTER_FAILURE, payload: error.message });
    }
};
