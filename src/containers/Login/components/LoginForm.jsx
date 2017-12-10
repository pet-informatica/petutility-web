import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Utils from '../../../lib/Utils';
import AuthProvider from '../../../lib/AuthProvider';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isValid: true
        };
    }

    handleEmailChange = (ev) => {
        this.setState({
            email: ev.target.value
        });
    }

    handlePasswordChange = (ev) => {
        this.setState({
            password: ev.target.value
        });
    }

    validate = () => {
        let val = Utils.validateEmail(this.state.email);
        let ok = val && (this.state.password.length > 0)
        this.setState({
            isValid: ok
        });
        return ok;
    }

    handleLogin = (ev) => {
        ev.preventDefault();
        if (this.validate())
            AuthProvider.loginWithEmailAndPassword(this.state.email, this.state.password);
    }

    render() {
        return (
            <Paper zDepth={5} >
                <Form onSubmit={this.handleLogin} >
                    <H1Title>Entrar</H1Title>
                    <TextFieldEmail floatingLabelText={'Email'}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        errorText={this.state.isValid ? '' :'Digite um email válido'}
                    />
                    <TextFieldPassword floatingLabelText={'Senha'}
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type={'password'}
                        errorText={this.state.password.length > 0 ? '' : 'Digite uma senha'}
                    />
                    <LinkForgetPassword to={'/forgotPassword'} >Esqueceu a senha?</LinkForgetPassword>
                    <RaisedButtonSubmit label={'Entrar'} type="submit" disabled={!this.state.isValid}/>
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

const TextFieldEmail = styled(TextField)`
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
