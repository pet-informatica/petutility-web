import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

class IdeaForm extends Component {

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

    submit = () => {
        let idea = this.idea;
        idea.Title = this.state.Title;
        idea.Description = this.state.Description;
        this.props.handleSave(idea);
    }

    render() {
        return (
            <Form onSubmit={this.submit}>
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
                <Div>
                    <RaisedButton style={style} label="Cancelar" onClick={this.props.handleCancel} />
                    <RaisedButton style={style} label="Salvar" disabled={this.state.Title.length === 0} primary={true} type={"submit"} />
                </Div>
            </Form>
        );
    }

}

export default IdeaForm;

const style = {
    margin: 8
};
const Form = styled.form``;
const Div = styled.div``;