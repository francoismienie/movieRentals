import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    
    calculatePageNumbers = () =>{
        const pageNumbers = [];
        let pageCount = 0;
        const itemCount = this.props.itemCount;
        const pageSize = this.props.pageSize;

        if(itemCount <= pageSize){
            pageCount = 1;
        }
        else{
            pageCount = Math.ceil(itemCount / pageSize);
        }

        for(let count = 1; count <= pageCount; count++){
            pageNumbers.push(count);
        }

        return pageNumbers;
    };
    
    render() { 
        
        return ( 
        <ul className="pagination pagination-sm pagination-grid">
            {this.calculatePageNumbers().map((page) => {
                const css = page === this.props.currentPage ? 'page-item active' : 'page-item';
                return <li className={css} key={page}><a className="page-link" href="#" onClick={() => {this.props.onPageClick(page)}}>{page}</a></li>
            })}
        </ul> 
      );
    }
};

Pagination.propTypes = {
    itemCount:PropTypes.number.isRequired, pageSize:PropTypes.number.isRequired, currentPage:PropTypes.number.isRequired, onPageClick:PropTypes.func.isRequired
};

export default Pagination;