import React, { Component } from 'react';
import Table from './table';


class MoviesList extends Component {


    render() {
        {if(this.props.movieList.length === 0) return null;} 

        return (
            <React.Fragment>
                <Table columns={this.props.movieColumns} data={this.props.movieList} sortColumn={this.props.sortColumn} onSortClick={this.props.onSortClick}/>
            </React.Fragment>            
         );
    }
}
 
export default MoviesList;