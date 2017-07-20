import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

import AuthProvider from '../lib/AuthProvider';

import '../styles/LoginForm.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(ev) {
        this.setState({
            username: ev.target.value
        });
    }

    handlePasswordChange(ev) {
        this.setState({
            password: ev.target.value
        });
    }

    handleLogin() {
        AuthProvider.loginWithUsernameAndPassword(this.state.username, this.state.password);
    }

    render() {
        return (
            <form className={"containerLogin"} > 
                <TextField className={"usernameTextField"} floatingLabelText={'Usuário'}
                    value={this.state.username}
                    onChange={this.handleUsernameChange} />
                <TextField className={"passwordTextField"} floatingLabelText={'Senha'}
                    value={this.state.password}
                    onChange={this.handlePasswordChange} 
                    type={'password'} />
                <RaisedButton className={"loginRaisedButton"} label={'Entrar'} onClick={this.handleLogin} />
                <Link className={"forgetPasswordButton"} to={'/forgetPassword'} >Esqueceu a senha?</Link>
            </form>
        );
    }
}

export default LoginForm;