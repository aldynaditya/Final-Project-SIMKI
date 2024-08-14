import { 
    GET_NOTIFIKASI_REQUEST, 
    GET_NOTIFIKASI_SUCCESS, 
    GET_NOTIFIKASI_FAILURE,
    MARK_NOTIFICATIONS_SEEN,
    SET_NOTIFICATIONS_VIEWED
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchNotifikasiSurat = () => async (dispatch) => {
    dispatch({ type: GET_NOTIFIKASI_REQUEST });

    try {
        const response = await getData('/cms/suratsakit');
        dispatch({ type: GET_NOTIFIKASI_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_NOTIFIKASI_FAILURE, payload: error.message });
    }
};

export const markNotificationsSeen = () => ({
    type: MARK_NOTIFICATIONS_SEEN
});

export const setNotificationsViewed = () => ({
    type: SET_NOTIFICATIONS_VIEWED
});
