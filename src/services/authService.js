import http from './httpService'
import config from '../config/api.json'
import jwtDecode from 'jwt-decode';

const baseUrl = `${config.apiBaseUrl}/auth`;
const tokenKey = 'token';

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

export async function getAuthenticatedUser() {
    try {
        const jwt = getToken();
        return await jwtDecode(jwt);
    }
    catch (ex) {

    }
}

export default {
    login,
    loginWithJwt,
    logout,
    getAuthenticatedUser
}