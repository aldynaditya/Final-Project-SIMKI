import { patchData } from '../../../utils/fetch';
import { UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE } from './constants';

export const updateStatus = (id, status) => async (dispatch) => {
    dispatch({ type: UPDATE_STATUS_REQUEST });

    try {
        const result = await patchData(`/cms/laporan/${id}/status`, { status });
        dispatch({
            type: UPDATE_STATUS_SUCCESS,
            payload: result.data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_STATUS_FAILURE,
            payload: error.message,
        });
    }
};
