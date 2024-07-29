// reducer.js
import { USER_LOGIN, USER_LOGOUT } from './constants';

let initialState = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : { token: null, role: null, nama: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                token: action.token,
                role: action.role,
                nama: action.nama
            };

        case USER_LOGOUT:
            return { token: null, role: null, nama: null };

        default:
            return state;
    }
}
