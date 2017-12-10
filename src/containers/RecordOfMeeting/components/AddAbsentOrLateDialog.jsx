import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import PETianoService from '../../../services/PETianoService';

class RecordOfMeetingAddAbsentOrLateDialog extends Component {

    state = {
        PETianos: [],
        PETianoId: null,
        Reason: '',
        IsJustified: false,
        Type: (this.props.type === "absent" ? 1:2),
        TypeString: (this.props.type === "absent" ? 'Ausente' : 'Atrasado'),
        isSaving: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            Type: (nextProps.type === "absent" ? 1 : 2),
            TypeString: (nextProps.type === "absent" ? 'Ausente' : 'Atrasado'),
            isSaving: false
        });
    }

    async componentDidMount() {
        let data = await PETianoService.getAsArray();
        data = await data.filter(p => p.Profile === 1 || p.Profile === 3);
        this.setState({
            PETianos: data
        });
    }

    handlePETianoChange = (event, index, value) => this.setState({ PETianoId: value });

    handleReasonChange = (ev) => this.setState({ Reason: ev.target.value })

    handleIsJustifiedChange = (ev) => this.setState({ IsJustified: !this.state.IsJustified});

    save = () => {
        const AbsentOrLate = {
            PETianoId: this.state.PETianoId,
            Reason: this.state.Reason,
            IsJustified: this.state.IsJustified,
            Type: this.state.Type
        };
        this.setState({
            isSaving: true
        });
        this.props.save(AbsentOrLate);
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
                disabled={this.state.PETianoId === null || this.state.Reason === null || this.state.isSaving}
            />
        ];

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                modal={false}
                title={"Adicionar " + this.state.TypeString}
                actions={actions}
            >
                <SelectField
                    floatingLabelText={this.state.TypeString}
                    value={this.state.PETianoId}
                    onChange={this.handlePETianoChange}
                    fullWidth={true}
                >
                    {
                        this.state.PETianos.length ?
                            this.state.PETianos.map(p => <MenuItem key={p.Id} value={p.Id} primaryText={p.Name} />) :
                            null
                    }
                </SelectField>
                <TextField 
                    floatingLabelText={'Motivo'}
                    value={this.state.Reason}
                    onChange={this.handleReasonChange}
                    fullWidth={true}
                    errorText={this.state.Reason.length > 0 ? '' : 'Campo necessário'}
                />
                <Checkbox
                    label="Justificado"
                    checked={this.state.IsJustified}
                    onCheck={this.handleIsJustifiedChange}
                />
            </Dialog>
        );
    }

}

export default RecordOfMeetingAddAbsentOrLateDialog;