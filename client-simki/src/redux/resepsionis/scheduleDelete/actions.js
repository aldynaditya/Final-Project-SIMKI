import {
    DELETE_SCHEDULE_REQUEST,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deleteJadwal = (id) => async (dispatch) => {
    dispatch({ type: DELETE_SCHEDULE_REQUEST });

    try {
        await deleteData(`/cms/schedule/${id}`);
        dispatch({
            type: DELETE_SCHEDULE_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_SCHEDULE_FAILURE,
            payload: error.message,
        });
    }
};
