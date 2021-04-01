import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { saveMovie } from './../services/movieService';

class NewMovie extends Form {
    state = {
        data: {
            _id: '',
            title: '',
            genre: '',
            numberInStock: '',
            rate: ''
        },
        errors: {},
        genreList: []
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
        rate: Joi.number().min(0).max(10).label('Rate')
    }

    async componentDidMount() {

        const { data: genres } = await getGenres();
        const genreList = [{ value: '', text: '' }, ...genres.map(genre => {
            return { value: genre._id, text: genre.name };
        })]
        this.setState({ genreList });
    }

    doSubmit = async () => {
        //save the new movie
        const { title, genre, numberInStock, rate } = this.state.data;

        const movie = {
            _id: null,
            title: title,
            genreId: genre,
            numberInStock: numberInStock,
            dailyRentalRate: rate,
            liked: false
        }

        const response = await saveMovie(movie);
        if (response)
            this.props.history.replace("/movies");
    }



    render() {
        return (
            <div className='movie-form'>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('text', 'title', 'Title', 'Title', true, true)}
                    {this.renderSelect('genre', 'Genre', this.state.genreList, 'Genre', true, false)}
                    {this.renderInput('text', 'numberInStock', 'NumberInStock', 'Number in Stock', true, false)}
                    {this.renderInput('text', 'rate', 'Rate', 'Rate', true, false)}
                    {this.renderSubmitButton('Save')}
                </form>
            </div>
        );
    }
}

export default NewMovie;