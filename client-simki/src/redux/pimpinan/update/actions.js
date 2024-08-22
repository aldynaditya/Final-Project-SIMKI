import { 
    UPDATE_STATUS_REQUEST, 
    UPDATE_STATUS_SUCCESS, 
    UPDATE_STATUS_FAILURE 
} from './constants';
import { patchData } from '../../../utils/fetch';

export const updateStatus = (id) => async (dispatch) => {
    dispatch({ type: UPDATE_STATUS_REQUEST });
    try {
        const response = await patchData(`/cms/laporan/${id}/status`);
        dispatch({
            type: UPDATE_STATUS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_STATUS_FAILURE,
            payload: error.message,
        });
    }
};
