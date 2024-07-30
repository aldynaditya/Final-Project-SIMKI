import { getData } from '../../../utils/fetch';
import {
    FETCH_DETAIL_REQUEST,
    FETCH_DETAIL_SUCCESS,
    FETCH_DETAIL_FAILURE,
} from './constants';

export const fetchDetail = (id) => async (dispatch) => {
    dispatch({ type: FETCH_DETAIL_REQUEST });
    try {
        const response = await getData(`/visit-details/${id}`);
        dispatch({ type: FETCH_DETAIL_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_DETAIL_FAILURE, payload: error.message });
    }
};
