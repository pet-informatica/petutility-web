import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../components/Loading';
import IdeaCard from '../components/IdeaCard';
import IdeaForm from '../components/IdeaForm';
import IdeaFactory from '../factories/IdeaFactory';

class Ideas extends PureComponent {
  
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isEditing: false,
            ideas: []
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.removeIdeaFromList = this.removeIdeaFromList.bind(this);
    }

    async componentDidMount() {
        let ideas = await IdeaFactory.query();
        this.setState({
            loading: false,
            ideas: ideas
        });
    }

    openEditForm = () => {
        this.setState({
            isEditing: true
        });
    };

    closeForm = () => {
        this.setState({
            isEditing: false
        });
    };

    async saveChanges(newIdea) {
        let idea = await IdeaFactory.create(newIdea);
        let ideas = this.state.ideas;
        ideas.push(idea);
        this.setState({
            ideas: ideas
        });
        this.closeForm();
    }

    async removeIdeaFromList(oldIdeaId) {
        let ideas = this.state.ideas;
        ideas = await ideas.filter(idea => idea.Id !== oldIdeaId);
        this.setState({
            ideas: ideas
        });
        this.closeForm();
    }

    render() {
        if (this.state.loading)
            return <Loading/>
        return (
            <Wrapper>
                <IdeasList>
                    {
                        this.state.ideas.map((idea, i) =>
                            <IdeaCard 
                                key={i}
                                idea={idea}
                                saveChanges={this.saveChanges}
                                removeIdeaFromList={this.removeIdeaFromList}
                            />
                        )
                    }
                </IdeasList>
                <AddButton>
                    <FloatingActionButton onClick={this.openEditForm} title="Adicionar Ideia">
                        <ContentAdd />
                    </FloatingActionButton>
                </AddButton>
                <Dialog
                    title="Criar Ideia"
                    modal={false}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForm}
                >
                    <IdeaForm idea={this.props.idea} handleCancel={this.closeForm} handleSave={this.saveChanges} />
                </Dialog>
            </Wrapper>
        );
    }

}

export default Ideas;

const Wrapper = styled.div``;
const IdeasList = styled.div`margin: 0 15%;`;
const AddButton = styled.div`position: fixed; bottom: 0; right: 0; padding: 30px;`;