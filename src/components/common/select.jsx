import React from 'react';

const Select = ({ id, name, optionList, value, lableText, handleChange, customValidation, inputCssClass, labelCssClass, hasFocus, error }) => {
    const options = optionList.map(option => <option key={option.value} value={option.value}  >{option.text}</option>);

    return (
        <React.Fragment>
            <label htmlFor={id} className={labelCssClass}>{lableText}</label>
            <select onChange={(e) => handleChange(e, customValidation)} className={inputCssClass} id={id} name={name} autoFocus={hasFocus} value={value} >
                {options}
            </select>
            {error && <div className='alert alert-danger'>{error}</div>}
        </React.Fragment>
    );
}

export default Select;