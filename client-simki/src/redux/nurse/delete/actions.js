import {
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteItem = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ITEM_REQUEST });

    try {
        await deleteData(`/cms/item/${id}`);
        dispatch({
            type: DELETE_ITEM_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ITEM_FAILURE,
            payload: error.message,
        });
    }
};
