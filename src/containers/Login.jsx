import React, { Component } from 'react';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';

class Login extends Component {

    render() {
        return (
            <Wrapper>
                <LoginForm />
            </Wrapper>
        );
    }

}

export default Login;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
`;