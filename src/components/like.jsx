import React, { Component } from 'react';

const Like = (props) => {
    let likedClassName = "cursor-pointer fa fa-heart";
    
    if(props.item.liked !== true)
        likedClassName += "-o";
    
    return ( 
        <i className={likedClassName} onClick={props.onClick}></i>
     );
}
 
export default Like;