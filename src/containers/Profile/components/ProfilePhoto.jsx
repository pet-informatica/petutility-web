import React, { Component } from 'react';
import styled from 'styled-components';

class ProfilePhoto extends Component {

    render() {
        let style = {
            backgroundImage: 'url('+this.props.src+')',
            cursor: (this.props.disabled ? 'auto' : 'pointer')
        };
        return (
            <Wrapper>
                {
                    this.props.disabled ? 
                    <Image style={style} /> : 
                    <Image style={style} onClick={this.props.handleClick}>
                        <Span>{"Alterar"}</Span>
                    </Image>
                }
            </Wrapper>
        );
    }
}

export default ProfilePhoto;

const Wrapper = styled.div``;
const Image = styled.div`
    width: 30vw;
    height: 30vw;
    background-size: 30vw 30vw;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    position: relative;
`;
const Span = styled.span`
    background: rgba(0,0,0,.54);
    padding: 7px 0;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
`;