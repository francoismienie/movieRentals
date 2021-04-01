import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    buildBody(data = [], columns = []) {
        return data.map(item => (
            <tr key={item[this.props.itemIdName]}>
                {columns.map((column) => <td key={column[this.props.columnIdName]}>{this.buildCellContent(item, column)}</td>)}
            </tr>
        ));
    }

    buildCellContent(item, column) {
        if (column.content)
            return column.content(item);

        return _.get(item, column[this.props.columnName])
    }

    render() {
        return (
            <tbody>
                {this.buildBody(this.props.data, this.props.columns)}
            </tbody>
        );
    }
}

TableBody.defaultProps = {
    itemIdName: '_id',
    columnIdName: 'id',
    columnName: 'columnName'
}

export default TableBody;


{/* <tr key={item._id}>
<td>{item.title}</td>
<td>{item.genre.name}</td>
<td>{item.numberInStock}</td>
<td>{item.dailyRentalRate}</td>
<td><Like item={item} onClick={() => this.props.onLikeClick(item)} /></td>
<td><DeleteButton itemId={item._id} onDelete={this.props.onDelete}/></td>
</tr> */}