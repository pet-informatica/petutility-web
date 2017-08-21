import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Card, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ProfilePhoto from '../components/ProfilePhoto';
import UploadBox from '../components/UploadBox';
import Utils from '../lib/Utils';
import AuthProvider from '../lib/AuthProvider';
import PETianoService from '../services/PETianoService';

class Profile extends PureComponent {
    
    constructor(props) {
        super(props);
        let user = AuthProvider.loggedUser;
        this.state = {
            isEditingProfile: false,
            isEditingPassword: false,
            isUploadingPhoto: false,
            isUpdating: false,
            Name: user.Name,
            NameError: null,
            Email: user.Email,
            EmailError: null,
            Cpf: user.Cpf,
            Rg: user.Rg,
            CellPhone: user.CellPhone,
            Photo: user.Photo,
            NewPhotoFile: null,
            NewPhotoPreview: null,
            Password: '',
            OldPassword: '',
            ConfirmPassword: ''
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.savePasswordChange = this.savePasswordChange.bind(this);
    }

    closeForms = () => {
        this.setState({
            isEditingProfile: false,
            isEditingPassword: false
        });
    }

    openProfileForm = () => {
        this.setState({
            isEditingProfile: true
        });
    }

    openPasswordForm = () => {
        this.setState({
            isEditingPassword: true
        });
    }

    async saveChanges(ev) {
        ev.preventDefault();
        let data = new FormData();
        let user = {
            Name: this.state.Name,
            Email: this.state.Email,
            Cpf: this.state.Cpf,
            Rg: this.state.Rg,
            CellPhone: this.state.CellPhone
        };
        if (this.state.NewPhotoFile !== null)
            user.Photo = this.state.NewPhotoFile;
        for (var param in user)
            if (user.hasOwnProperty(param))
                data.append(param, user[param]);
        this.setState({
            isUpdating: true 
        });
        await PETianoService.update(data);
        this.closeForms();
    }

    async savePasswordChange(ev) {
        ev.preventDefault();
        let data = new FormData();
        data.append('OldPassword', this.state.OldPassword);
        data.append('Password', this.state.Password);
        this.setState({
            isUpdating: true
        });
        await PETianoService.update(data);
        this.closeForms();
    }

    handleNameChange = (ev) => {
        let name = ev.target.value;
        let err = null;
        if (name.length === 0)
            err = 'Campo necessário';
        this.setState({
            Name: name,
            NameError: err
        });
    }

    handleEmailChange = (ev) => {
        let email = ev.target.value;
        let err = null;
        if (email.length === 0)
            err = 'Campo necessário';
        else if (!Utils.validateEmail(email))
            err = 'Digite em email válido';
        this.setState({
            Email: email,
            EmailError: err
        });
    }

    handleAnyChange = (ev, param) => {
        let obj = {};
        obj[param] = ev.target.value;
        this.setState(obj);
    }

    openPhotoUploadForm = () => {
        this.setState({
            isUploadingPhoto: true
        });
    }

    handleFileChange = (file, preview) => {
        this.setState({
            NewPhotoPreview: preview,
            NewPhotoFile: file
        });
    }

    closePhotoUploadForm = () => {
        this.setState({
            isUploadingPhoto: false,
            NewPhotoPreview: null
        });
    }

    savePhotoChanges = () => {
        let preview = this.state.NewPhotoPreview
        this.setState({
            Photo: preview,
            NewPhotoPreview: null
        });
        this.closePhotoUploadForm();
    }

    render() {
        const photoActions = [
            <FlatButton
                label={"Cancelar"}
                onClick={this.closePhotoUploadForm}
            />,
            <FlatButton
                label={"Salvar"}
                primary={true}
                onClick={this.savePhotoChanges}
            />
        ];
        const passwordActions = [
            <FlatButton
                label={"Cancelar"}
                onClick={this.closeForms}
            />,
            <FlatButton
                label={"Salvar"}
                primary={true}
                onClick={this.savePasswordChange}
                disabled={
                    this.state.OldPassword.length === 0 ||
                    this.state.Password.length === 0 ||
                    this.state.Password !== this.state.ConfirmPassword
                }
            />
        ];
        return (
            <Wrapper>
                <Card style={styles.card}>
                    <Form onSubmit={e => e.preventDefault()}>
                        <CardMedia>
                            <ProfilePhoto
                                src={this.state.Photo}
                                disabled={!this.state.isEditingProfile} 
                                handleClick={this.openPhotoUploadForm}
                            />
                        </CardMedia>
                        <CardText>
                            <TextField
                                disabled={!this.state.isEditingProfile}
                                floatingLabelText={"Nome"}
                                fullWidth={true}
                                value={this.state.Name}
                                onChange={this.handleNameChange}
                                errorText={this.state.NameError ? this.state.NameError : ''}
                            />
                            <TextField
                                disabled={!this.state.isEditingProfile}
                                floatingLabelText={"Email"}
                                fullWidth={true}
                                value={this.state.Email}
                                onChange={this.handleEmailChange}
                                errorText={this.state.EmailError ? this.state.EmailError : ''}
                            />
                            <TextField
                                disabled={!this.state.isEditingProfile}
                                floatingLabelText={"Telefone Celular"}
                                fullWidth={true}
                                value={this.state.CellPhone}
                                onChange={(ev) => this.handleAnyChange(ev, 'CellPhone')}
                            />
                            <TextField
                                disabled={!this.state.isEditingProfile}
                                floatingLabelText={"CPF"}
                                fullWidth={true}
                                value={this.state.Cpf}
                                onChange={(ev) => this.handleAnyChange(ev, 'Cpf')}
                            />
                            <TextField
                                disabled={!this.state.isEditingProfile}
                                floatingLabelText={"RG"}
                                fullWidth={true}
                                value={this.state.Rg}
                                onChange={(ev) => this.handleAnyChange(ev, 'Rg')}
                            />
                        </CardText>
                        {
                            this.state.isEditingProfile ?
                                <CardActions>
                                    <RaisedButton
                                        label={"Salvar"}
                                        primary={true}
                                        onClick={this.saveChanges}
                                        disabled={(this.state.NameError !== null || this.state.EmailError !== null)}
                                    />
                                    <RaisedButton
                                        label={"Cancelar"}
                                        onClick={this.closeForms}
                                    />
                                </CardActions> :
                                <CardActions>
                                    <RaisedButton
                                        label={"Editar"}
                                        primary={true}
                                        onClick={this.openProfileForm}
                                    />
                                    <RaisedButton
                                        label={"Alterar Senha"}
                                        onClick={this.openPasswordForm}
                                    />
                                </CardActions>
                        }
                    </Form>
                </Card>
                <Dialog
                    title={"Alterar Minha Senha"}
                    modal={false}
                    open={this.state.isEditingPassword}
                    onRequestClose={this.closeForms}
                    actions={passwordActions}
                >
                    <Form>
                        <TextField
                            floatingLabelText={"Senha Antiga"}
                            fullWidth={true}
                            value={this.state.OldPassword}
                            onChange={(ev) => this.handleAnyChange(ev, 'OldPassword')}
                            type={"password"}
                        />
                        <TextField
                            floatingLabelText={"Senha Nova"}
                            fullWidth={true}
                            value={this.state.Password}
                            onChange={(ev) => this.handleAnyChange(ev, 'Password')}
                            type={"password"}
                        />
                        <TextField
                            floatingLabelText={"Confirmar Senha Nova"}
                            fullWidth={true}
                            value={this.state.ConfirmPassword}
                            onChange={(ev) => this.handleAnyChange(ev, 'ConfirmPassword')}
                            type={"password"}
                            errorText={
                                (this.state.Password.length > 0 &&
                                this.state.Password !== this.state.ConfirmPassword) ?
                                'Senhas não são iguais': ''
                            }
                        />
                    </Form>
                </Dialog>
                <Dialog
                    title={"Alterar Minha Foto"}
                    modal={false}
                    open={this.state.isUploadingPhoto}
                    onRequestClose={this.closePhotoUploadForm}
                    actions={photoActions}
                >
                    <Form>
                        {
                            this.state.NewPhotoPreview === null ?
                            <UploadBox onChange={this.handleFileChange}/>:
                            <ProfilePhoto
                                src={this.state.NewPhotoPreview}
                                disabled={true}
                            />
                        }
                    </Form>
                </Dialog>
            </Wrapper>
        );
    }
}

export default Profile;

const styles = {
    card: {
        margin: 10
    }
};
const CardText = styled.div`
    width: 90%;
    margin: 0 3%;
`;
const Form = styled.form``;
const Wrapper = styled.div`
    margin: 0 10%;
`;
const CardMedia = styled.div`
    margin: 10px 0;
    text-align: center;
`;