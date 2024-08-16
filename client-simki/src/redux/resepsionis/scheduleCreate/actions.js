import {
    CREATE_SCHEDULE_REQUEST,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';

export const createJadwal = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_SCHEDULE_REQUEST });

    try {
        const response = await postData('/cms/schedule', formData);
        dispatch({ type: CREATE_SCHEDULE_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: CREATE_SCHEDULE_FAILURE, payload: error.message });
    }
};
