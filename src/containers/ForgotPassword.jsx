import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Utils from '../lib/Utils';

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isValid: false
        };
    }

    handleEmailChange = (ev) => {
        let val = Utils.validateEmail(ev.target.value);
        this.setState({
            email: ev.target.value,
            isValid: val
        });
    }

    submit = () => {

    }

    render() {
        return (
            <Wrapper>
                <Paper zDepth={5} >
                    <Form onSubmit={this.submit}>
                        <H1Title>Esqueceu a senha?</H1Title>
                        <Text>Enviaremos um email para você</Text>
                        <TextFieldEmail floatingLabelText={'Email'}
                            value={this.state.email}
                            onChange={this.handleEmailChange} 
                            type={"email"}
                            errorText={this.state.isValid ? '':'Digite um email válido'}
                        />
                        <Submit type="submit" label={"Enviar"} disabled={!this.state.isValid}/>
                    </Form>
                </Paper>
            </Wrapper>
        );
    }
}

export default ForgetPassword;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
`;
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
    "xxxx fgps";
`;
const H1Title = styled.h1`
    grid-area: tth1;
    font-weight: normal;
`;
const Text = styled.p`
    grid-area: pmsg;
`;
const TextFieldEmail = styled(TextField)`
    grid-area: mail;
`;
const Submit = styled(RaisedButton)`
    grid-area: fgps;
`;