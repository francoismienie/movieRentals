import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate() {
        const validation = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!validation.error) {
            return null;
        }
        console.log(validation.error);
        return {};
    };

    validateProperty(inputElement) {
        if (Object.getOwnPropertyNames(this.schema).includes(inputElement.id)) {
            const schema = { [inputElement.id]: this.schema[inputElement.id] }
            var validation = Joi.validate({ [inputElement.id]: inputElement.value }, schema);
            return validation.error ? validation.error.details[0].message : null;
        }
        return null;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        if (errors) {
            this.setState({ errors });
            return;
        }

        this.doSubmit();
    }

    handleChange = (e) => {
        console.log('handle Change executed');
        e.preventDefault();
        const input = e.currentTarget;
        const { data } = { ...this.state };
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) {
            errors[input.id] = errorMessage;
        }
        else {
            delete errors[input.id];
        }

        data[input.id] = input.value;
        this.setState({ data, errors }, () => { console.log(this.state.data) });
    }

    renderSubmitButton = (label) => {
        return <button type="submit" className="btn btn-primary" disabled={this.validate()}>{label}</button>
    }

    renderInput = (inputType, id, name, label, doCustomValidation, hasFocus) => {
        const { data, errors } = { ...this.state };

        return <div className="form-group">
            <Input inputType={inputType} id={id} name={name} value={data[id]} lableText={label} handleChange={this.handleChange} customValidation={doCustomValidation} hasFocus={hasFocus} error={errors[id]} inputCssClass='form-control' labelCssClass='' />
        </div>
    }
    renderSelect = (id, name, optionList = [], label, doCustomValidation, hasFocus) => {
        const { data, errors } = { ...this.state };

        return <div className="form-group">
            <Select id={id} name={name} optionList={optionList} value={data[id]} lableText={label} handleChange={this.handleChange} customValidation={doCustomValidation} hasFocus={hasFocus} error={errors[id]} inputCssClass='form-control' labelCssClass='' />
        </div>
    }

    disableSubmit = () => {
        const { errors } = this.state;
        if (Object.getOwnPropertyNames(errors).length > 0) {
            return 'disabled';
        }

        return '';
    }

}

export default Form;