// src/redux/pharmacy/edit/actions.js

import {
    EDIT_OBAT_REQUEST,
    EDIT_OBAT_SUCCESS,
    EDIT_OBAT_FAILURE,
    FETCH_OBAT_BY_ID_REQUEST,
    FETCH_OBAT_BY_ID_SUCCESS,
    FETCH_OBAT_BY_ID_FAILURE,
} from './constants';
import { getData, patchData } from '../../../utils/fetch';

// Fetch medication data by ID
export const fetchObatById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_OBAT_BY_ID_REQUEST });

    try {
        const response = await getData(`/cms/obat/${id}`);
        dispatch({
            type: FETCH_OBAT_BY_ID_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_OBAT_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

// Edit medication data
export const editObat = (id, data) => async (dispatch) => {
    dispatch({ type: EDIT_OBAT_REQUEST });

    try {
        await patchData(`/cms/obat/${id}`, data);
        dispatch({
            type: EDIT_OBAT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: EDIT_OBAT_FAILURE,
            payload: error.message,
        });
    }
};
