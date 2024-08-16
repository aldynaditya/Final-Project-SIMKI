import {
    CREATE_UPDATE_STATUS_REQUEST,
    CREATE_UPDATE_STATUS_SUCCESS,
    CREATE_UPDATE_STATUS_FAILURE,
} from './constants';

import { patchData } from '../../../utils/fetch';

export const updatestatusAppointment = ( id, formData ) => async (dispatch) => {
    dispatch({ type: CREATE_UPDATE_STATUS_REQUEST });
    try {
        const response = await patchData(`/cms/appointment/${id}`, formData);
        dispatch({
            type: CREATE_UPDATE_STATUS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_UPDATE_STATUS_FAILURE,
            payload: error.message,
        });
    }
};
