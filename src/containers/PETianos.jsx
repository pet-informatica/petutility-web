import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AddButton from '../components/AddButton';
import PETianoCard from '../components/PETianoCard';
import PETianoService from '../services/PETianoService';
import Utils from '../lib/Utils';
import AuthProvider from '../lib/AuthProvider';

class PETianos extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Profile: AuthProvider.loggedUser.Profile,
            open: false,
            Email: '',
            EmailError: null,
            PETianos: [],
            sent: false
        };
        this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        let data = await PETianoService.getAll();
        this.setState({
            PETianos: data,
            loading: false
        });
    }

    openDialog = () => {
        this.setState({
            open: true
        });
    }

    closeDialog = () => {
        this.setState({
            open: false
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

    async submit() {
        this.closeDialog();
        await PETianoService.invite(this.state.Email);
        this.setState({
            sent: true
        });
    }

    closeSentMessage = () => {
        this.setState({
            sent: false
        });
    }

    render() {
        const actions = [
            <FlatButton
                label={"Cancelar"}
                onClick={this.closeDialog}
            />,
            <FlatButton
                label={"Salvar"}
                onClick={this.submit}
                primary={true}
                disabled={this.state.EmailError}
            />
        ];
        return (
            <Wrapper>
                <PETianosList>
                    {this.state.PETianos.map((PETiano, i) => <PETianoCard key={i} PETiano={PETiano}/>)}
                </PETianosList>
                {
                    this.state.Profile === 3 ?
                    <AddButton
                        title={"Adicionar PETiano"}
                        onClick={this.openDialog}
                    />:null
                }
                <Dialog
                    title={"Adicionar PETiano"}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.closeDialog}
                    actions={actions}
                >
                    <Form onSubmit={e => e.preventDefault()}>
                        <TextField
                            floatingLabelText={"Email"}
                            fullWidth={true}
                            value={this.state.Email}
                            onChange={this.handleEmailChange}
                            errorText={this.state.EmailError ? this.state.EmailError : ''}
                        />
                    </Form>
                </Dialog>
                <Dialog
                    modal={false}
                    open={this.state.sent}
                    onRequestClose={this.closeSentMessage}
                >
                    {`Um email foi enviado para "${this.state.Email}" com a senha para login no sistema!`}
                </Dialog>
            </Wrapper>
        );
    }

}

export default PETianos;

const Wrapper = styled.div`max-width: 100%;`;
const PETianosList = styled.div`margin: 0 10%;`;
const Form = styled.form``;