import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../components/Loading';
import ActivityCard from '../components/ActivityCard';
import ActivityDialog from '../components/ActivityDialog';
import ActivityFactory from '../factories/ActivityFactory';

class Activity extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isEditing: false,
            activities: []
        };
        this.saveChanges = this.saveChanges.bind(this);
    }

    async componentDidMount() {
        let activities = await ActivityFactory.query();
        this.setState({
            loading: false,
            activities: activities
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

    async saveChanges(newActivity) {
        let activity = await ActivityFactory.create(newActivity);
        let activities = this.state.activities;
        activities.push(activity);
        this.setState({
            activities: activities
        });
        this.closeForm();
    }

    render() {
        if (this.state.loading)
            return (<Loading />);
        return (
            <Wrapper>
                <ActivityList>
                    {this.state.activities.map((a, i) => <ActivityCard key={i} activity={a} />)}
                </ActivityList>
                <AddButton>
                    <FloatingActionButton onClick={this.openEditForm} title="Adicionar Atividade">
                        <ContentAdd />
                    </FloatingActionButton>
                </AddButton>
                <ActivityDialog
                    title="Criar Atividade"
                    open={this.state.isEditing}
                    onRequestClose={this.closeForm}
                    handleCancel={this.closeForm}
                    handleSave={this.saveChanges} 
                />
            </Wrapper>
        );
    }

}

export default Activity;

const Wrapper = styled.div` max-width: 100%;`;
const ActivityList = styled.div`margin: 0 10%;`;
const AddButton = styled.div`position: fixed; bottom: 0; right: 0; padding: 30px;`;