import React, { Component } from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import CardText from '../../../components/CardText';

class AgendaPointCard extends Component {

    state = {
        AgendaPoint: this.props.AgendaPoint,
        isEditing: false,
        isDeleting: false,
        expanded: false
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    }

    handleTextChange = (ev, param) => {
        let a = this.state.AgendaPoint;
        a[param] = ev.target.value;
        this.setState({
            AgendaPoint: a
        });
    }

    openEditDialog = () => {
        this.setState({
            isEditing: true
        });
    }

    openDeleteDialog = () => {
        this.setState({
            isDeleting: true
        });
    }

    handleClose = () => {
        this.setState({
            isEditing: false,
            isDeleting: false
        });
    }

    handleFixed = () => {
        let ag = this.state.AgendaPoint;
        if (this.state.AgendaPoint.Status !== 2)
            ag.Status = 2;
        else
            ag.Status = 3;
        this.props.handleEdit(ag);
    }

    handleAction = (callback) => {
        this.handleClose();
        callback(this.state.AgendaPoint);
    }

    render() {
        const editingActions = [
            <FlatButton
                label="Cancelar"
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Salvar"
                disabled={this.state.AgendaPoint.Title.length === 0 || this.state.AgendaPoint.Description.length === 0}
                primary={true}
                onClick={() => this.handleAction(this.props.handleEdit)}
            />
        ];

        const deletingActions = [
            <FlatButton
                label="Deletar"
                onClick={() => this.handleAction(this.props.handleDelete)}
                secondary={true}
            />,
            <FlatButton
                label="Cancelar"
                onClick={this.handleClose}
            />
        ];
        const dialogStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };

        const styles = {
            opened: {
                marginTop: 10,
                marginBottom: 10
            },
            closed: {
                marginLeft: 10,
                marginRight: 10
            }
        };

        return (
            <Card 
                expanded={this.state.expanded}
                onExpandChange={this.handleExpandChange}
                style={this.state.expanded ? styles.opened : styles.closed}
                zDepth={2}
            >
                <CardHeader
                    titleStyle={{fontWeight: 'normal'}}
                    title={this.state.AgendaPoint.Title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {this.state.AgendaPoint.Description}
                </CardText>
                {
                    this.props.IsOpen ? 
                    <CardActions expandable={true}>
                        <FlatButton
                            label="Editar"
                            primary={true}
                            onClick={this.openEditDialog}
                        />
                        {
                            this.state.AgendaPoint.Status !== 1 ?
                            <FlatButton
                                label={this.state.AgendaPoint.Status === 2 ? "Desafixar" : "Fixar"}
                                onClick={this.handleFixed}
                            />:
                            null
                        }
                        <FlatButton
                            label="Deletar"
                            secondary={true}
                            onClick={this.openDeleteDialog}
                        />
                    </CardActions>:
                    null
                }
                <Dialog
                    title="Editar ponto de ata"
                    actions={editingActions}
                    modal={false}
                    open={this.state.isEditing}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                    autoDetectWindowHeight={true}
                    contentStyle={dialogStyle}
                >
                    <TextField
                        floatingLabelText={'Título'}
                        value={this.state.AgendaPoint.Title}
                        onChange={(ev) => this.handleTextChange(ev, "Title")}
                        fullWidth={true}
                        errorText={this.state.AgendaPoint.Title.length > 0 ? '' : 'Campo necessário'}
                    />
                    <TextField
                        floatingLabelText={'Descrição'}
                        value={this.state.AgendaPoint.Description}
                        onChange={(ev) => this.handleTextChange(ev, "Description")}
                        fullWidth={true}
                        multiLine={true}
                        errorText={this.state.AgendaPoint.Description.length > 0 ? '' : 'Campo necessário'}
                    />
                </Dialog>
                <Dialog
                    title="Confirmar Remoção"
                    actions={deletingActions}
                    modal={false}
                    open={this.state.isDeleting}
                    onRequestClose={this.handleClose}
                >
                    {`Você tem certeza que deseja deletar o ponto de ata com o seguinte título: "${this.state.AgendaPoint.Title}"?`}
                </Dialog>
            </Card>
        );
    }
}

export default AgendaPointCard;