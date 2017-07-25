import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import AuthProvider from '../lib/AuthProvider';

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

    handleLogin(ev) {
        ev.preventDefault();
        AuthProvider.loginWithUsernameAndPassword(this.state.username, this.state.password);
    }

    render() {
        return (
            <Paper zDepth={5} >
                <Form onSubmit={this.handleLogin} > 
                    <H1Title>Entrar</H1Title>
                    <TextFieldUsername floatingLabelText={'Usuário'}
                        value={this.state.username}
                        onChange={this.handleUsernameChange} />
                    <TextFieldPassword floatingLabelText={'Senha'}
                        value={this.state.password}
                        onChange={this.handlePasswordChange} 
                        type={'password'} />
                    <RaisedButtonSubmit label={'Entrar'} type="submit" />
                    <LinkForgetPassword to={'/forgetPassword'} >Esqueceu a senha?</LinkForgetPassword>
                </Form>
            </Paper>
        );
    }
}

export default withRouter(LoginForm);

const Form = styled.form`
    margin: 20px;
    display: grid;
    grid-template-columns: auto 88px;
    grid-template-rows: auto auto auto auto;
    grid-row-gap: 14px;
    grid-template-areas:
    "tth1 tth1"
    "ustf ustf"
    "pstf pstf"
    "fgps lgbt";
`;

const H1Title = styled.h1`
    grid-area: tth1;
    font-weight: normal;
`;

const TextFieldUsername = styled(TextField)`
    grid-area: ustf;
`;

const TextFieldPassword = styled(TextField)`
    grid-area: pstf;
`;

const RaisedButtonSubmit = styled(RaisedButton)`
    grid-area: lgbt;
`;

const LinkForgetPassword = styled(Link)`
    grid-area: fgps;
    font-size: 0.75em;
`;