import React, { Component } from 'react';
import styled from 'styled-components';
import ForgotPasswordForm from './components/ForgotPasswordForm';

class ForgotPassword extends Component {

    render() {
        return (
            <Wrapper>
                <ForgotPasswordForm />
            </Wrapper>
        );
    }
}

export default ForgotPassword;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
`;