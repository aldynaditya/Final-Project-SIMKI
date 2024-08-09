import {
    FETCH_OBAT_REQUEST,
    FETCH_OBAT_SUCCESS,
    FETCH_OBAT_FAILURE,
} from './constants';
import { 
    getData,
} from '../../../utils/fetch';

export const fetchObat = () => async (dispatch) => {
    dispatch({ type: FETCH_OBAT_REQUEST });

    try {
        const response = await getData('/cms/obat');
        dispatch({
            type: FETCH_OBAT_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_OBAT_FAILURE,
            payload: error.message,
        });
    }
};