// actions.js
import { USER_LOGIN, USER_LOGOUT } from './constants';

export function userLogin(token, role, nama) {
    localStorage.setItem('auth', JSON.stringify({ token, role, nama }));
    return {
        type: USER_LOGIN,
        token,
        role,
        nama
    };
}

export function userLogout() {
    localStorage.removeItem('auth');
    return {
        type: USER_LOGOUT,
    };
}
