import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {
    render() {
        return (
            <table className='table table-striped movie-list'>
                <TableHeader columns={this.props.columns} sortColumn={this.props.sortColumn} onSortClick={this.props.onSortClick} />
                <TableBody columns={this.props.columns} data={this.props.data} />
            </table>
        );
    }
}

export default Table;