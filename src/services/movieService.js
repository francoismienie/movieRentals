import http from './httpService';
import { apiBaseUrl } from '../config/api.json';


export function getMovies() {

    return http.get(apiBaseUrl + '/movies');
}

export function getMovie(id) {

    return http.get(apiBaseUrl + '/movies/' + id);
}

export function saveMovie(movie) {
    let movieInDb = {};

    movieInDb.title = movie.title;
    movieInDb.genreId = movie.genreId;
    movieInDb.numberInStock = Number(movie.numberInStock);
    movieInDb.dailyRentalRate = Number(movie.dailyRentalRate);
    //movieInDb.liked = movie.liked //this field needs to be added to the DB

    if (!movie._id) {
        return http.post(apiBaseUrl + '/movies', movieInDb, null);
    }
    else {
        return http.put(apiBaseUrl + '/movies/' + movie._id, movieInDb, null);
    }
}

export function deleteMovie(id) {

    return http.delete(apiBaseUrl + '/movies/' + id, null);
}