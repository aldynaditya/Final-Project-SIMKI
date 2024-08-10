import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';

export const createItem = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_ITEM_REQUEST });

    try {
        const response = await postData('/cms/item', formData);
        dispatch({ type: CREATE_ITEM_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: CREATE_ITEM_FAILURE, payload: error.message });
    }
};
