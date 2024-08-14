import { 
    GET_SEARCH_PROSEDUR_REQUEST, 
    GET_SEARCH_PROSEDUR_SUCCESS, 
    GET_SEARCH_PROSEDUR_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const searchProsedur = (query) => async (dispatch) => {
    dispatch({ type: GET_SEARCH_PROSEDUR_REQUEST });

    try {
        const response = await getData(`/cms/item/${query}`);
        dispatch({ type: GET_SEARCH_PROSEDUR_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_SEARCH_PROSEDUR_FAILURE, payload: error.message });
    }
};
