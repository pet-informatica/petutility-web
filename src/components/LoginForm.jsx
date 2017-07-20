import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
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
            <Paper zDepth={5} >
                <form className={"containerLogin"} > 
                    <h1 className={'titleLogin'} >Entrar</h1>
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
            </Paper>
        );
    }
}

export default LoginForm;