import React, { Component } from 'react';

const Input = ({ inputType, id, name, value, lableText, handleChange, customValidation, inputCssClass, labelCssClass, hasFocus, error }) => {
    return (
        <React.Fragment>
            <label htmlFor={id} className={labelCssClass}>{lableText}</label>
            <input type={inputType} value={value} onChange={(e) => handleChange(e, customValidation)} className={inputCssClass} id={id} name={name} autoFocus={hasFocus} />
            {(error && <div className="alert alert-danger">{error}</div>)}
        </React.Fragment>
    );
}

export default Input