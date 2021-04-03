import http from './httpService'
import config from '../config/api.json'
import jwtDecode from 'jwt-decode';

const baseUrl = `${config.apiBaseUrl}/auth`;
const tokenKey = 'token';

http.setAuth(getToken());

export async function login(credentials) {
    const { data: jwt } = await http.post(baseUrl, credentials, null);
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function getAuthenticatedUser() {
    try {
        const jwt = getToken();
        return jwtDecode(jwt);
    }
    catch (ex) {

    }
}

export default {
    login,
    loginWithJwt,
    getToken,
    logout,
    getAuthenticatedUser
}