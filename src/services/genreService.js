import http from './httpService';
import { apiBaseUrl } from '../config/api.json';


export async function getGenres() {

  return http.get(apiBaseUrl + '/genres');
}