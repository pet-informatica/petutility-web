import React, { Component } from 'react';
import IdeaForm from './IdeaForm';
import Loading from './Loading';
import IdeaFactory from '../factories/IdeaFactory';
import PETianoService from '../services/PETianoService';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class IdeaCard extends Component {

    constructor(props) {
        super(props);
        this.PETianoId = this.props.idea.PETianoId;
        this.state = {
            Title: this.props.idea.Title,
            Description: this.props.idea.Description,
            PETiano: null,
            isDeleting: false,
            isEditing: false
        }
        this.saveChanges = this.saveChanges.bind(this);
        this.delete = this.delete.bind(this);
    }

    async componentDidMount() {
        let PETiano = await PETianoService.get(this.PETianoId);
        this.setState({
            PETiano: PETiano
        });
    }

    openDeleteForm = () => {
        this.setState({
            isDeleting: true
        });
    };

    openEditForm = () => {
        this.setState({
            isEditing: true
        });
    };

    closeForms = () => {
        this.setState({
            isDeleting: false,
            isEditing: false
        });
    };

    async saveChanges(newIdea) {
        let idea = await IdeaFactory.update(newIdea);
        this.setState({
            Title: idea.Title,
            Description: idea.Description
        });
        this.closeForms();
    }

    async delete() {
        let ideaId = this.props.idea.Id;
        await IdeaFactory.delete(ideaId);
        this.props.removeIdeaFromList(ideaId);
        this.closeForms();
    }

    render() {
        const deleteActions = [
            <RaisedButton
                label="Deletar"
                onClick={this.delete}
                secondary={true}
            />,
            <RaisedButton
                label="Cancelar"
                onClick={this.closeForms}
            />
        ];
        return (
            <Card style={style} >
                {
                    this.state.PETiano !== null ? 
                    <CardHeader 
                        title={this.state.PETiano.Name}
                        avatar={this.state.PETiano.Photo}
                    />:<Loading />
                }
                <CardTitle title={this.state.Title} />
                <CardText>
                    {this.state.Description}
                </CardText>
                <CardActions>
                    <RaisedButton label="Delete" secondary={true} onClick={this.openDeleteForm}/>
                    <RaisedButton label="Editar" primary={true} onClick={this.openEditForm}/>
                </CardActions>
                <Dialog
                    title="Confirmar Remoção"
                    actions={deleteActions}
                    modal={false}
                    open={this.state.isDeleting}
                    onRequestClose={this.closeForms}
                >
                    Você tem certeza que deseja deletar a ideia com titulo: "{this.state.Title}"?
                </Dialog>
                <Dialog
                    title="Editar Ideia"
                    modal={false}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForms}
                >
                    <IdeaForm idea={this.props.idea} handleCancel={this.closeForms} handleSave={this.saveChanges}/>
                </Dialog>
            </Card>
        );
    }
}

export default IdeaCard;

const style = {
    margin: 10
};