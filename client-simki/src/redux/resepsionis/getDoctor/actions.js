import { getData } from '../../../utils/fetch';
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from './constants';

export const fetchDoctor = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
        const response = await getData('/cms/schedule-doctor');
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data.data
        });
    } catch (err) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: err.message
        });
    }
};
