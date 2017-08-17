import React, { Component } from 'react';
import styled from 'styled-components';
import AuthProvider from '../lib/AuthProvider';
import { Redirect, withRouter } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: AuthProvider.loggedUser
        };
    }

    componentDidMount() {
        AuthProvider.onChange(update => {
            this.setState({
                user: update.user
            });
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
