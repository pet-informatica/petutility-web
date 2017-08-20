import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Utils from '../lib/Utils';

class ProfileDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.user.Name,
            NameError: null,
            Email: this.props.user.Email,
            EmailError: null,
            Cpf: this.props.user.Cpf,
            Rg: this.props.user.Rg,
            CellPhone: this.props.user.CellPhone,
            Photo: this.props.user.Photo
        };
    }

    submit = (ev) => {
        ev.preventDefault();
        let user = {
            Name: this.state.Name,
            Email: this.state.Email,
            CellPhone: this.state.CellPhone,
            Cpf: this.state.Cpf,
            Rg: this.state.Rg,
            Photo: this.state.Photo
        };
        this.props.handleSave(user);
    }

    render() {
        const actions = [
            <FlatButton
                label={"Cancelar"}
                onClick={this.props.handleCancel}
            />,
            <FlatButton
                label={"Salvar"}
                primary={true}
                onClick={this.submit}
            />
        ];
        return (
            <Dialog
                title={"Editar Meu Perfil"}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                actions={actions}
            >
                
            </Dialog>
        );
    }
}

export default ProfileDialog;

const Form = styled.form``;
const Div = styled.div``;
const ProfilePhoto = styled.img`
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    margin: auto;
`;