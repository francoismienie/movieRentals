import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class HeaderInfo extends Component {

    DisplayHeaderInfo(message) {
        return message;
    };

    processCss(cssProps) {
        return cssProps;

    }

    render() {
        return (
            <div className={this.processCss(this.props.headerCss)}>
                <Link to='/movies/new' className='btn btn-lg btn-primary'>New Movie</Link>
                <p style={this.paragraphStyle}>{this.DisplayHeaderInfo(this.props.message)}</p>
                <SearchBox id='searchBox' name='searchBox' searchQuery={this.props.searchQuery} autoFocus={true} handleSearch={this.props.handleSearch} />
            </div>
        );
    }
}

export default HeaderInfo