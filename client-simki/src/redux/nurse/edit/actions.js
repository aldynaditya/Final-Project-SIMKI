import {
    EDIT_ITEM_REQUEST,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAILURE,
    FETCH_ITEM_BY_ID_REQUEST,
    FETCH_ITEM_BY_ID_SUCCESS,
    FETCH_ITEM_BY_ID_FAILURE,
} from './constants';
import { getData, patchData } from '../../../utils/fetch';

export const fetchItemById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_ITEM_BY_ID_REQUEST });

    try {
        const response = await getData(`/cms/item/${id}`);
        dispatch({
            type: FETCH_ITEM_BY_ID_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_ITEM_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

export const editItem = (id, data) => async (dispatch) => {
    dispatch({ type: EDIT_ITEM_REQUEST });

    try {
        await patchData(`/cms/item/${id}`, data);
        dispatch({
            type: EDIT_ITEM_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: EDIT_ITEM_FAILURE,
            payload: error.message,
        });
    }
};
