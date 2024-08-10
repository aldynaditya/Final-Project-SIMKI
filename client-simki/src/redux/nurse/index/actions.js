import {
    FETCH_ITEM_REQUEST,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEM_FAILURE,
} from './constants';
import { 
    getData,
} from '../../../utils/fetch';

export const fetchItem = () => async (dispatch) => {
    dispatch({ type: FETCH_ITEM_REQUEST });

    try {
        const response = await getData('/cms/item');
        dispatch({
            type: FETCH_ITEM_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_ITEM_FAILURE,
            payload: error.message,
        });
    }
};