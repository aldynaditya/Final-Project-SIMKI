// src/redux/profile/actions.js
import { getData, patchData } from '../../utils/fetch';
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from './constants';

export const fetchProfile = () => async dispatch => {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    try {
        const response = await getData('/pasien');
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    }
};

export const updateProfile = (profileData) => async dispatch => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
        await patchData('/pasien', profileData);
        dispatch({ type: UPDATE_PROFILE_SUCCESS });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
};
