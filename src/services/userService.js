import http from './httpService';
import config from '../config/api.json';

const baseUrl = `${config.apiBaseUrl}/users`;

export function register(user) {
    return http.post(baseUrl, user, null);
}



