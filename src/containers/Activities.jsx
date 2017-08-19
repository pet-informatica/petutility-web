import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../components/Loading';
import ActivityCard from '../components/ActivityCard';
import ActivityForm from '../components/ActivityForm';
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
            return <Loading />
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
                <Dialog
                    title="Criar Atividade"
                    modal={false}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForm}
                    autoScrollBodyContent={true}
                >
                    <ActivityForm handleCancel={this.closeForm} handleSave={this.saveChanges} />
                </Dialog>
            </Wrapper>
        );
    }

}

export default Activity;

const Wrapper = styled.div``;
const ActivityList = styled.div`margin: 0 10%;`;
const AddButton = styled.div`position: fixed; bottom: 0; right: 0; padding: 30px;`;