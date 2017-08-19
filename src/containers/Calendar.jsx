import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../components/Loading';
import EventForm from '../components/EventForm';
import EventFactory from '../factories/EventFactory';

import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isEditing: false,
            currEvent: null,
            events: []
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.delete = this.delete.bind(this);
    }

    async componentDidMount() {
        let events = await EventFactory.query();
        events = events.map(e => {
            return { Id: e.Id, title: e.Title, start: e.Start, end: e.End };
        });
        this.setState({
            loading: false,
            events: events
        });
    }

    openEditForm = () => {
        this.setState({
            isEditing: true
        });
    }

    closeForm = () => {
        this.setState({
            currEvent: null,
            isEditing: false
        });
    }

    async saveChanges(newEvent) {
        let event = {};
        if (newEvent.Id) {
            event = await EventFactory.update(newEvent);
        } else {
            event = await EventFactory.create(newEvent);
        }
        event = {
            Id: event.Id,
            title: event.Title,
            start: event.Start,
            end: event.End
        };
        let events = this.state.events;
        if (newEvent.Id) {
            for (let i=0;i<events.length;++i) {
                if (events[i].Id === newEvent.Id) {
                    events[i] = event;
                    break;
                }
            }
        } else {
            events.push(event);
        }
        this.setState({
            events: events
        });
        this.closeForm();
    }

    async delete(oldEventId) {
        await EventFactory.delete(oldEventId);
        let events = this.state.events;
        events = await events.filter(event => event.Id !== oldEventId);
        this.setState({
            events: events
        });
        this.closeForm();
    }

    openEvent = (event, e) => {
        this.setState({
            currEvent: {
                Id: event.Id,
                Title: event.title,
                Start: new Date(event.start),
                End: new Date(event.end)
            },
            isEditing: true
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading />);
        return (
            <Wrapper>
                <CalendarWrapper>
                    <BigCalendar
                        style={style}
                        events={this.state.events}
                        onSelectEvent={this.openEvent}
                    />
                </CalendarWrapper>
                <AddButton>
                    <FloatingActionButton onClick={this.openEditForm}>
                        <ContentAdd />
                    </FloatingActionButton>
                </AddButton>
                <Dialog
                    title={(this.state.currEvent === null ? "Criar":"Editar") + " Evento"}
                    modal={false}
                    open={this.state.isEditing}
                    onRequestClose={this.closeForm}
                >
                    <EventForm 
                        event={this.state.currEvent}
                        handleDelete={this.delete}
                        handleCancel={this.closeForm}
                        handleSave={this.saveChanges}
                    />
                </Dialog>
            </Wrapper>
        );
    }

}

export default Calendar;

const Wrapper = styled.div``;
const CalendarWrapper = styled.div`margin: 1% 5%;`;
const style = {
    height: window.innerHeight-100
}
const AddButton = styled.div`position: fixed; bottom: 0; right: 0; padding: 30px;`;