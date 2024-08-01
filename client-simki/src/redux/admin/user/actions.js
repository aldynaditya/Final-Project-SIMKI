import { getData, deleteData } from '../../../utils/fetch';
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from './constants';

export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
        const response = await getData('/cms/userklinik');
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

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        const response = await deleteData(`/cms/userklinik/${id}`);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: err.message
        });
    }
};
