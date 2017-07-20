import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

import '../styles/Login.css';

class Login extends Component {

    render() {
        return (
            <div className={'container'} >
                <LoginForm
                    onForgetPassword={() => this.props.history.push('/forgetPassword')} />
            </div>
        );
    }

}

export default Login;