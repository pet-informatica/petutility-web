import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import PETianoService from '../services/PETianoService';

class RecordOfMeetingEditAteiroOrPresidentDialog extends Component {

    state = {
        PETianos: [],
        president: (this.props.president.Profile === 1 || this.props.president.Profile === 3) ? this.props.president.Id : null,
        ateiro: (this.props.ateiro.Profile === 1 || this.props.ateiro.Profile === 3) ? this.props.ateiro.Id : null
    }
    
    async componentDidMount() {
        let data = await PETianoService.getAsArray();
        data = await data.filter(p => p.Profile === 1 || p.Profile === 3);
        this.setState({
            PETianos: data
        });
    }

    handleChangePresident = (event, index, value) => this.setState({ president: value });

    handleChangeAteiro = (event, index, value) => this.setState({ ateiro: value });

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.props.onRequestClose}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                onClick={() => this.props.save(this.state.ateiro, this.state.president)}
                disabled={this.state.president === null || this.state.ateiro === null}
            />
        ];

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                modal={false}
                title="Escolher Presidente e Ateiro"
                actions={actions}
            >
                <SelectField
                    floatingLabelText="Presidente"
                    value={this.state.president}
                    onChange={this.handleChangePresident}
                    fullWidth={true}
                >
                    {
                        this.state.PETianos.length ?
                        this.state.PETianos.map(p => <MenuItem key={p.Id} value={p.Id} primaryText={p.Name} />):
                        null
                    }
                </SelectField>
                <SelectField
                    floatingLabelText="Ateiro"
                    value={this.state.ateiro}
                    onChange={this.handleChangeAteiro}
                    fullWidth={true}
                >
                    {
                        this.state.PETianos.length ?
                        this.state.PETianos.map(p => <MenuItem key={p.Id} value={p.Id} primaryText={p.Name} />) :
                        null
                    }
                </SelectField>
            </Dialog>
        );
    }

}

export default RecordOfMeetingEditAteiroOrPresidentDialog;