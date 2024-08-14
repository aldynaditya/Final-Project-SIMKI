import {
    UPDATE_ACTION_REQUEST,
    UPDATE_ACTION_SUCCESS,
    UPDATE_ACTION_FAILURE,
} from './constants';
import { patchData } from '../../../utils/fetch';


export const updateActionEntry = (id, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_ACTION_REQUEST });

    try {
        const response = await patchData(`/cms/emr/${id}/update-action`, formData);
        dispatch({
            type: UPDATE_ACTION_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ACTION_FAILURE,
            payload: error.message,
        });
    }
};
