import React, { Component } from 'react';
class TableHeader extends Component {
    
    buildTableHeader(){
        return this.props.columns.map((item) => {
            let sortedCssClass = '';
            if(item.columnName === this.props.sortColumn.column && item.label){
                sortedCssClass = this.props.sortColumn.sortDirection === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc'
            }
            
            return <th key={item.id} className='cursor-pointer' title='click to sort' onClick={() => {this.onSortClick(item)}}>
                        {item.label} <i className={sortedCssClass} aria-hidden="true"></i>
                   </th>
        })
    }

    onSortClick(column){
        const orderBy = this.props.sortColumn.sortDirection === 'asc' ? 'desc' : 'asc';
        const newSortColumn = {column:column.columnName, sortDirection:orderBy};
        this.props.onSortClick(newSortColumn);
    }
    

    render() { 
        return ( 
            <thead>
                <tr>
                    {this.buildTableHeader()}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;