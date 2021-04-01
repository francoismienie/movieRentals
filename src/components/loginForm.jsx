import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
    state = {
        data: {
            userName: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        userName: Joi.string().required().label('Username'),
        password: Joi.string().min(8).required().label('Password')
    }

    LoginStyle = {
        backgroundColor: '#F8F9FA',
        padding: '2rem',
        width: '50%',
        margin: '12% auto',
        borderRadius: '10px'
    }

    doSubmit = async () => {
        try {
            const { data } = this.state;

            const credentials = {
                email: data.userName,
                password: data.password
            }

            auth.login(credentials);

            window.location = '/';

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const { errors } = this.state;
                errors.userName = ex.response.data;

                this.setState({ errors });
            }
        }


    }

    render() {

        return (

            <div style={this.LoginStyle}>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('text', 'userName', 'Username', 'User name', true, true)}
                    {this.renderInput('password', 'password', 'Password', 'Password', true, false)}
                    {this.renderSubmitButton('submit')}
                </form>
            </div>
        );
    }
}

export default LoginForm;