import React, { Component } from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddButton extends Component {

    render() {
        return (
            <Div>
                <FloatingActionButton onClick={this.props.onClick} title={this.props.title}>
                    <ContentAdd />
                </FloatingActionButton>
            </Div>
        );
    }

}

export default AddButton;

const Div = styled.div`position: fixed; bottom: 0; right: 0; padding: 30px;`;