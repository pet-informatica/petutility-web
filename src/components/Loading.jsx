import React, { Component } from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends Component {

    render() {
        return (
            <Wrapper>
                <CircularProgress />
            </Wrapper>
        );
    }

}

export default Loading;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
`;