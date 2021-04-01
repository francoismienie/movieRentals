import React, { Component } from 'react';


class Genres extends Component {
   setActiveGenre = (genreId) => {
        let classes = "cursor-pointer genre-list list-group-item ";

        if(this.props.selectedGenreId === genreId)
        classes += "active";
        
        return classes;
    };


    render() { 
        
        return ( 
            <ul className='list-group genre-list'>
                {this.props.items.map((item) => {
                    return <li key={item[this.props.valueProperty]} onClick={() => {this.props.onChange(item[this.props.valueProperty])}} className={this.setActiveGenre(item[this.props.valueProperty])}>{item[this.props.textProperty]}</li>
                })}
            </ul>
         );
    };

    
};
 
Genres.defaultProps = {
        textProperty: "name",
        valueProperty:"_id"
    };

export default Genres;