import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddAgendaPointDialog extends Component {

    state = {
        Title: '',
        Description: ''
    }

    handleTextChange = (ev, param) => {
        let st = {};
        st[param] = ev.target.value;
        this.setState(st);
    }

    save = () => {
        const ag = {
            Title: this.state.Title,
            Description: this.state.Description
        };
        this.props.save(ag);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.props.onRequestClose}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                onClick={this.save}
                disabled={this.state.Title.length === 0 || this.state.Description.length === 0}
            />
        ];

        const dialogStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };

        return (
            <Dialog
                title="Adicionar ponto de ata"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                repositionOnUpdate={true}
                autoDetectWindowHeight={true}
                contentStyle={dialogStyle}
            >
                <TextField
                    floatingLabelText={'Título'}
                    value={this.state.Title}
                    onChange={(ev) => this.handleTextChange(ev, "Title")}
                    fullWidth={true}
                    errorText={this.state.Title.length > 0 ? '' : 'Campo necessário'}
                />
                <TextField
                    floatingLabelText={'Descrição'}
                    value={this.state.Description}
                    onChange={(ev) => this.handleTextChange(ev, "Description")}
                    fullWidth={true}
                    multiLine={true}
                    errorText={this.state.Description.length > 0 ? '' : 'Campo necessário'}
                />
            </Dialog>
        );
    }
}

export default AddAgendaPointDialog;