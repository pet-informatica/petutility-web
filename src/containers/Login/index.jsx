import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import AuthProvider from '../../lib/AuthProvider';

import LoginForm from './components/LoginForm';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: AuthProvider.loggedUser,
            open: false
        };
    }

    async componentDidMount() {
        AuthProvider.onChange(update => {
            this.setState({
                user: update.user,
                open: (update.status === 'wrongCredentials')
            });
        });
    }

    closeDialog = () => {
        this.setState({
            open: false
        });
    }

    render() {
        if(this.state.user !== null) {
            const { from } = this.props.location.state || {from: {pathname: '/recordOfMeeting'}}
            return <Redirect to={ from } />;
        }
        return (
            <Wrapper>
                <LoginForm/>
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.closeDialog}
                >
                    {"Email e/ou Senha inválidos!"}
                </Dialog>
            </Wrapper>
        );
    }

}

export default withRouter(Login);

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
`;
