import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CardText from './CardText';
import IdeaDialog from './IdeaDialog';
import Loading from './Loading';
import IdeaFactory from '../factories/IdeaFactory';
import PETianoService from '../services/PETianoService';

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
        this.closeForms();
        let idea = await IdeaFactory.update(newIdea);
        this.setState({
            Title: idea.Title,
            Description: idea.Description
        });
    }

    async delete() {
        this.closeForms();
        let ideaId = this.props.idea.Id;
        await IdeaFactory.delete(ideaId);
        this.props.removeIdeaFromList(ideaId);
    }

    render() {
        const deleteActions = [
            <FlatButton
                label="Deletar"
                onClick={this.delete}
                secondary={true}
            />,
            <FlatButton
                label="Cancelar"
                onClick={this.closeForms}
            />
        ];
        return (
            <Card style={style} >
                <CardTitle title={this.state.Title} />
                <CardText>
                    {this.state.Description}
                </CardText>
                {
                    this.state.PETiano !== null ?
                        <CardHeader
                            title={this.state.PETiano.Name}
                            avatar={this.state.PETiano.Photo}
                        /> : <Loading />
                }
                <CardActions>
                    <RaisedButton label="Editar" primary={true} onClick={this.openEditForm}/>
                    <RaisedButton label="Delete" secondary={true} onClick={this.openDeleteForm}/>
                </CardActions>
                <Dialog
                    title="Confirmar Remoção"
                    actions={deleteActions}
                    modal={false}
                    open={this.state.isDeleting}
                    onRequestClose={this.closeForms}
                >
                    {`Você tem certeza que deseja deletar a ideia com titulo: "${this.state.Title}"?`}
                </Dialog>
                <IdeaDialog
                    title={"Editar Ideia"}
                    idea={this.props.idea}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForms}
                    handleSave={this.saveChanges}
                />
            </Card>
        );
    }
}

export default IdeaCard;

const style = {
    margin: 10
};