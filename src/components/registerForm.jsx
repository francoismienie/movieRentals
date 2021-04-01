import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from './../services/userService';
import auth from './../services/authService';


class RegisterForm extends Form {
    state = {
        data: {
            userName: '',
            password: '',
            name: ''
        },
        errors: {}
    };

    schema = {
        userName: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    }

    RegisterStyle = {
        backgroundColor: '#F8F9FA',
        padding: '2rem',
        width: '50%',
        margin: '12% auto',
        borderRadius: '10px'
    }

    doSubmit = async () => {
        try {
            const { userName, password, name } = this.state.data;
            const user = {
                email: userName,
                password: password,
                name: name
            }

            const response = await userService.register(user);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';

            console.log('User Registerred. ', response);

        } catch (ex) {
            const { errors } = this.state;

            if (ex.response && ex.response.status === 400) {
                errors.userName = ex.response.data;
                this.setState({ errors });
            }
        }

    }

    render() {

        return (
            <div style={this.RegisterStyle}>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'userName', 'UserName', 'Username', true, true)}
                    {this.renderInput('password', 'password', 'Password', 'Password', true, false)}
                    {this.renderInput('text', 'name', 'Name', 'Name', true, false)}
                    {this.renderSubmitButton('Register')}
                </form>
            </div>

        )
    }
}

export default RegisterForm;