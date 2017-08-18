import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Utils from '../lib/Utils';
import Dialog from 'material-ui/Dialog';

import AuthProvider from '../lib/AuthProvider';

class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            open: false,
            isValid: false,
            redirect: false
        };
    }

    handleEmailChange = (ev) => {
        let val = Utils.validateEmail(ev.target.value);
        this.setState({
            email: ev.target.value,
            isValid: val
        });
    }

    submit = (ev) => {
        ev.preventDefault();
        AuthProvider.forgotPassword(this.state.email);
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            const { from } = this.props.location.state || { from: { pathname: '/' } }
            return <Redirect to={from} />;
        }
        const actions = [
            <FlatButton
                label="Descartar"
                primary={true}
                onClick={this.handleClose}
            />,
        ]
        return (
            <Paper zDepth={5} >
                <Form onSubmit={this.submit}>
                    <H1Title>Esqueceu a senha?</H1Title>
                    <Text>Enviaremos um email para você</Text>
                    <TextFieldEmail floatingLabelText={'Email'}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        type={"email"}
                        errorText={this.state.isValid ? '' : 'Digite um email válido'}
                    />
                    <LinkToLogin to={'/'} >Voltar para o login</LinkToLogin>
                    <Submit type="submit" label={"Enviar"} disabled={!this.state.isValid} />
                </Form>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Um email foi enviado para "{this.state.email}" com a nova senha!
                </Dialog>
            </Paper>
        );
    }
}

export default withRouter(ForgotPasswordForm);

const Form = styled.form`
    margin: 20px;
    display: grid;
    grid-template-columns: auto 88px;
    grid-template-rows: auto auto auto auto;
    grid-row-gap: 14px;
    grid-template-areas:
    "tth1 tth1"
    "pmsg pmsg"
    "mail mail"
    "link fgps";
`;
const H1Title = styled.h1`
    grid-area: tth1;
    font-weight: normal;
`;
const Text = styled.p`
    grid-area: pmsg;
`;
const TextFieldEmail = styled(TextField) `
    grid-area: mail;
`;
const LinkToLogin = styled(Link) `
    grid-area: link;
    font-size: 0.75em;
`;
const Submit = styled(RaisedButton) `
    grid-area: fgps;
`;