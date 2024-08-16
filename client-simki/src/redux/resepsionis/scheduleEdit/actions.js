import {
    EDIT_SCHEDULE_REQUEST,
    EDIT_SCHEDULE_SUCCESS,
    EDIT_SCHEDULE_FAILURE,
    FETCH_SCHEDULE_BY_ID_REQUEST,
    FETCH_SCHEDULE_BY_ID_SUCCESS,
    FETCH_SCHEDULE_BY_ID_FAILURE,
} from './constants';
import { getData, patchData } from '../../../utils/fetch';

export const fetchJadwalById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_SCHEDULE_BY_ID_REQUEST });

    try {
        const response = await getData(`/cms/schedule/${id}`);
        dispatch({
            type: FETCH_SCHEDULE_BY_ID_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_SCHEDULE_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

export const editJadwal = (id, data) => async (dispatch) => {
    dispatch({ type: EDIT_SCHEDULE_REQUEST });

    try {
        await patchData(`/cms/schedule/${id}`, data);
        dispatch({
            type: EDIT_SCHEDULE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: EDIT_SCHEDULE_FAILURE,
            payload: error.message,
        });
    }
};
