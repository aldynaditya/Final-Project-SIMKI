import {
    CREATE_ACTION_REQUEST,
    CREATE_ACTION_SUCCESS,
    CREATE_ACTION_FAILURE,
} from './constants';
import { patchData } from '../../../utils/fetch';


export const updateActionEntry = (episodeId, formData) => async (dispatch) => {
    dispatch({ type: CREATE_ACTION_REQUEST });

    try {
        const response = await patchData(`/cms/emr/${episodeId}/update-action`, formData);
        dispatch({
            type: CREATE_ACTION_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ACTION_FAILURE,
            payload: error.message,
        });
    }
};
