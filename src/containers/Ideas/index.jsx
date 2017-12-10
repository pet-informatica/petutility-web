import React, { PureComponent } from 'react';
import styled from 'styled-components';

import AddButton from '../../components/AddButton';
import Loading from '../../components/Loading';

import IdeaCard from './components/IdeaCard';
import IdeaDialog from './components/IdeaDialog';
import IdeaFactory from '../../factories/IdeaFactory';

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
        await ideas.sort((a, b) => (a.Id > b.Id) ? 1:-1);
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
            return (<Loading/>);
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
                <AddButton onClick={this.openEditForm} title="Adicionar Ideia" />
                <IdeaDialog 
                    title={"Criar Ideia"}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForm}
                    idea={this.props.idea}
                    handleSave={this.saveChanges} 
                />
            </Wrapper>
        );
    }

}

export default Ideas;

const Wrapper = styled.div``;
const IdeasList = styled.div`margin: 0 10%;`;