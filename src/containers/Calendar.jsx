import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import Loading from '../components/Loading';
import EventDialog from '../components/EventDialog';
import EventFactory from '../factories/EventFactory';
import moment from 'moment';
import 'moment/locale/pt-br';
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
        this.openEvent = this.openEvent.bind(this);
    }

    async componentDidMount() {
        let events = await EventFactory.query();
        events = events.map(e => {
            return { Id: e.Id, title: e.Title, start: new Date(e.Start), end: new Date(e.End) };
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

    async openEvent(event, e) {
        await this.setState({
            currEvent: {
                Id: event.Id,
                Title: event.title,
                Start: new Date(event.start),
                End: new Date(event.end)
            }
        });
        await this.setState({
            isEditing: true
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading />);
        const messages = {
            allDay: 'Todo o Dia',
            previous: '<',
            next: '>',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            agenda: 'Agenda',
            date: 'Data',
            time: 'Horário',
            event: 'Evento'
        };
        return (
            <Wrapper>
                <CalendarWrapper>
                    <BigCalendar
                        messages={messages}
                        style={style}
                        culture={'pt-br'}
                        events={this.state.events}
                        onSelectEvent={this.openEvent}
                    />
                </CalendarWrapper>
                <AddButton onClick={this.openEditForm} title={"Adicionar Evento"}/>
                {
                    this.state.isEditing ? 
                    <EventDialog
                        title={(this.state.currEvent === null ? "Criar ": "Editar ") + "Evento"}
                        open={this.state.isEditing}
                        event={this.state.currEvent}
                        onRequestClose={this.closeForm}
                        handleDelete={this.delete}
                        handleSave={this.saveChanges}
                    /> : null
                }
                
            </Wrapper>
        );
    }

}

export default Calendar;

const Wrapper = styled.div``;
const CalendarWrapper = styled.div`margin: 1% 5%;`;
const style = {
    height: window.innerHeight-100
};