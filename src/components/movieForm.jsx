import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/genreService'
import { getMovie, saveMovie } from './../services/movieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            rate: ''
        },
        errors: {},
        genreList: []
    }

    async componentDidMount() {
        const { data: genres } = await getGenres();
        const genreList = [{ value: '', text: '' }, ...genres.map(genre => {
            return { value: genre._id, text: genre.name };
        })]
        this.setState({ genreList }, async () => {
            const { id } = this.props.match.params;
            if (id === undefined)
                return;

            const { data: movie } = await getMovie(id);
            if (movie !== undefined)
                this.setState({ data: this.mapData(movie) });

        });


    }

    mapData = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            rate: movie.dailyRentalRate
        }
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
        rate: Joi.number().min(0).max(10).label('Rate')
    }

    async doSubmit() {
        let { id } = this.props.match.params;
        if (id === 'new')
            id = null;

        const { title, genreId, numberInStock, rate } = this.state.data;

        const movie = {
            _id: id,
            title: title,
            genreId: genreId,
            numberInStock: numberInStock,
            dailyRentalRate: rate,
            liked: false
        }
        const response = await saveMovie(movie);

        if (response.status === 200)
            this.props.history.replace('/movies');
    }

    render() {

        return (
            <div className='movie-form'>
                <h3>Movie Form</h3>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('text', 'title', 'Title', 'Title', false, false)}
                    {this.renderSelect('genreId', 'Genre', this.state.genreList, 'Genres', true, false)}
                    {this.renderInput('text', 'numberInStock', 'NumberInStock', 'In Stock', false, false)}
                    {this.renderInput('text', 'rate', 'Rate', 'Rate', false, false)}
                    {this.renderSubmitButton('Save')}

                </form>
            </div>
        );
    }
}

export default MovieForm;