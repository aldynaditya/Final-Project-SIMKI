import { 
    GET_SEARCH_OBAT_REQUEST, 
    GET_SEARCH_OBAT_SUCCESS, 
    GET_SEARCH_OBAT_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const searchObat = (query) => async (dispatch) => {
    dispatch({ type: GET_SEARCH_OBAT_REQUEST });

    try {
        const response = await getData(`/cms/obat/${query}`);
        dispatch({ type: GET_SEARCH_OBAT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_SEARCH_OBAT_FAILURE, payload: error.message });
    }
};
