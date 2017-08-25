import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

class IdeaDialog extends Component {

    constructor(props) {
        super(props);
        this.idea = this.props.idea ? this.props.idea : {Title: '', Description: ''};
        this.state = {
            Title: this.idea.Title,
            Description: this.idea.Description
        }
    }

    handleTitleChange = (ev) => {
        this.setState({
            Title: ev.target.value
        });
    }

    handleDescriptionChange = (ev) => {
        this.setState({
            Description: ev.target.value
        });
    }

    submit = (ev) => {
        ev.preventDefault();
        let idea = {
            Title: this.state.Title,
            Description: this.state.Description
        };
        if (this.idea.Id)
            idea.Id = this.idea.Id;
        this.props.handleSave(idea);
    }

    render() {
        const actions = [
            <FlatButton
                style={style}
                label="Cancelar"
                onClick={this.props.onRequestClose}
            />,
            <FlatButton
                style={style}
                label="Salvar"
                disabled={this.state.Title.length === 0}
                primary={true}
                onClick={this.submit}
            />
        ];
        return (
            <Dialog
                title={this.props.title}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                actions={actions}
            >
                <Form>
                    <TextField 
                        floatingLabelText={'Título'}
                        value={this.state.Title}
                        onChange={this.handleTitleChange}
                        fullWidth={true}
                        errorText={this.state.Title.length > 0 ? '': 'Campo necessário'}
                    />
                    <TextField
                        floatingLabelText={'Descrição'}
                        value={this.state.Description}
                        onChange={this.handleDescriptionChange}
                        multiLine={true}
                        fullWidth={true}
                    />
                </Form>
            </Dialog>
        );
    }

}

export default IdeaDialog;

const style = {
    margin: 8
};
const Form = styled.form``;