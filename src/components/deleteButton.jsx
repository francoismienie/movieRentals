import React, { Component } from 'react';


class DeleteButton extends Component {
    render() { 
        return (  
            <button onClick={() => this.props.onDelete(this.props.itemId)} className='btn btn-sm btn-danger'>Delete</button>
        );
    }
}
 
export default DeleteButton;