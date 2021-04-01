import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//custom components
import HeaderInfo from './headerInfo';
import MoviesList from './moviesList';
import Genres from './genres';
import Pagination from '../components/pagination';
import DeleteButton from './deleteButton';
import Like from './like';
//services
import { getMovies } from '../services/movieService';
import { deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
//utils function
import { paginate } from './utils/paginate';
import { sorting } from './utils/sorting';


class Movies extends Component {
    state = {
        genres: [],
        movies: [],
        pageSize: 4,
        selectedPageNumber: 1,
        selectedGenreId: 0,
        searchQuery: '',
        sortColumn: { column: 'title', sortDirection: 'asc' },
        movieColumns: [{ id: 1, label: 'Title', columnName: 'title', content: item => <NavLink to={`/movieform/${item._id}`}>{item.title}</NavLink> }
            , { id: 2, label: 'Genre', columnName: 'genre.name', content: '' }
            , { id: 3, label: 'Stock', columnName: 'numberInStock', content: '' }
            , { id: 4, label: 'Rate', columnName: 'dailyRentalRate', content: '' }
            , { id: 5, label: '', columnName: '', content: ((item) => (<Like item={item} onClick={() => { this.handleLikeClicked(item) }} />)) }
            , { id: 6, label: '', columnName: '', content: ((item) => (<DeleteButton itemId={item._id} onDelete={(itemId) => { this.handleMovieDelete(itemId) }} />)) }]
    }

    componentDidMount() {

        this.loadMovies();
        this.loadGenres();
    }

    loadMovies = async () => {
        try {

            const { data: movies } = await getMovies();
            this.setState({ movies });

        } catch (error) {
            alert(error.message);
        }
    }

    loadPageMovies = () => {
        try {
            const { selectedGenreId, selectedPageNumber, pageSize, sortColumn, movies, searchQuery } = this.state;

            let moviesFiltered = [...movies];

            if (searchQuery !== '') {
                moviesFiltered = moviesFiltered.filter((movie) => String(movie.title).toLowerCase().startsWith(searchQuery.toLowerCase()) ? movie : null)
            }
            else if (this.state.selectedGenreId !== 0) {
                moviesFiltered = moviesFiltered.filter((movie) => movie.genre._id === selectedGenreId)
            }

            const pageMovies = paginate(moviesFiltered, selectedPageNumber, pageSize);
            const sortedMovies = sorting(pageMovies, sortColumn.column, sortColumn.sortDirection);

            return { pageMovies: sortedMovies, itemCount: moviesFiltered.length };
        } catch (error) {
            alert(error.message);
        }
    }

    loadGenres = async () => {
        const { data: dbGenres } = await getGenres();
        const genres = [{ name: 'All Genres', _id: 0 }, ...dbGenres];
        this.setState({ genres })
    }

    buildHeaderMessage(movieCount) {
        if (movieCount === 0 || movieCount === undefined)
            return 'There are no movies to display.';

        return `Showing ${movieCount} movies in the database.`;
    }

    async handleMovieDelete(id) {
        const prevMovies = this.state.movies;
        const movies = prevMovies.filter(movie => movie._id !== id);
        this.setState({ movies });

        try {
            await deleteMovie(id);

        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                alert('Movie already deleted.')

            this.setState({ prevMovies });
        }
    }

    handleLikeClicked = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageClicked = (selectedPageNumber) => {
        this.setState({ selectedPageNumber })
    }

    handleGenreChange = (genreId) => {
        this.setState({ selectedGenreId: genreId, selectedPageNumber: 1, searchString: '' });
    }

    handleOnSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    handleSearch = (searchQuery) => {
        this.setState({ searchQuery, selectedGenreId: 0, selectedPageNumber: 1 });
    }

    render() {

        const data = this.loadPageMovies();
        console.log('render');
        return (
            <React.Fragment>
                <div className='grid'>
                    <HeaderInfo id='header' headerCss="header" handleSearch={this.handleSearch} message={this.buildHeaderMessage(data.itemCount)} {...this.props} searchQuery={this.state.searchQuery} />
                    <Genres id='genre-list' items={this.state.genres} selectedGenreId={this.state.selectedGenreId} onChange={this.handleGenreChange} />
                    <MoviesList id='movie-list'
                        movieColumns={this.state.movieColumns}
                        movieList={data.pageMovies}
                        onSortClick={this.handleOnSort}
                        sortColumn={this.state.sortColumn}
                    />
                    <Pagination onPageClick={this.handlePageClicked} itemCount={data.itemCount} pageSize={this.state.pageSize} currentPage={this.state.selectedPageNumber} />
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;