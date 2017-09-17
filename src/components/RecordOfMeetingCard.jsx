import React, { Component } from 'react';
import styled from 'styled-components';
import { lightGreen300, red300, orange900 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import Loading from './Loading';
import AgendaPointCard from './AgendaPointCard';
import PETianoService from '../services/PETianoService';

class RecordOfMeetingCard extends Component {

    constructor(props) {
        super(props);
        const RecordOfMeeting = {
            Status: props.RecordOfMeeting.Status,
            Date: new Date(props.RecordOfMeeting.Date),
            AteiroId: props.RecordOfMeeting.AteiroId,
            PresidentId: props.RecordOfMeeting.PresidentId,
            AgendaPoints: {
                NewOutside: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 1),
                Fixed: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 2),
                Pending: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 3),
                NewInside: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 4)
            },
            AbsentsOrLates: {
                Absents: props.RecordOfMeeting.AbsentsOrLates.filter(({ Type }) => Type === 1),
                Lates: props.RecordOfMeeting.AbsentsOrLates.filter(({ Type }) => Type === 2)
            }
        };
        this.state = {
            loading: true,
            RecordOfMeeting: RecordOfMeeting,
            PETianos: null
        };
    }

    async componentDidMount() {
        let PETianos = {};
        let data = await PETianoService.getAll();
        await data.forEach(p => PETianos[p.Id] = p);
        this.setState({
            loading: false,
            PETianos: PETianos
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading/>);
        let President = this.state.PETianos[this.state.RecordOfMeeting.PresidentId];
        let Ateiro = this.state.PETianos[this.state.RecordOfMeeting.AteiroId];
        return (
            <Paper zDepth={2}>
                <CardTitle title={"Reunião "+this.state.RecordOfMeeting.Date.toLocaleString()} />
                <PresidentAndAteiroCard>
                    <CardHeader
                        title="Presidente"
                        subtitle={President.Name}
                        avatar={President.Photo}
                    />
                    <Divider/>
                    <CardHeader
                        title="Ateiro"
                        subtitle={Ateiro.Name}
                        avatar={Ateiro.Photo}
                    />
                </PresidentAndAteiroCard>
                <AbsentsOrLatesCard>
                    <CardHeader titleColor="white" title="Ausentes"/>
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Absents.map((a, i) =>{
                            a.PETiano = this.state.PETianos[a.PETianoId];
                            return (
                                <MyChip 
                                    key={i}
                                    backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                >
                                    <Avatar src={a.PETiano.Photo} />
                                    {a.PETiano.Name}
                                </MyChip>
                            )}
                        )}
                    </AbsentsOrLatesList>
                    <CardHeader titleColor="white" title="Atrasados"/>
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Lates.map((a, i) => {
                            a.PETiano = this.state.PETianos[a.PETianoId];
                            return (
                                <MyChip
                                    key={i}
                                    backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                >
                                    <Avatar src={a.PETiano.Photo} />
                                    {a.PETiano.Name}
                                </MyChip>
                            )
                        }
                        )}
                    </AbsentsOrLatesList>
                </AbsentsOrLatesCard>
                <CardTitle title="Fixos"/>
                <AgendaPointCards>
                    {this.state.RecordOfMeeting.AgendaPoints.Fixed.map((a, i) => 
                        <AgendaPointCard key={i} AgendaPoint={a} IsOpen={this.state.RecordOfMeeting.Status === 1}/>
                    )}
                </AgendaPointCards>
                <CardTitle title="Pendentes"/>
                <AgendaPointCards>
                    {this.state.RecordOfMeeting.AgendaPoints.Pending.map((a, i) => 
                        <AgendaPointCard key={i} AgendaPoint={a} IsOpen={this.state.RecordOfMeeting.Status === 1}/>
                    )}
                </AgendaPointCards>
                <CardTitle title="Novos"/>
                <AgendaPointCards>
                    {this.state.RecordOfMeeting.AgendaPoints.NewInside.map((a, i) => 
                        <AgendaPointCard key={i} AgendaPoint={a} IsOpen={this.state.RecordOfMeeting.Status === 1}/>
                    )}
                </AgendaPointCards>
                <CardActions>
                    <RaisedButton
                        label="Baixar"
                        primary={true}
                        icon={<FileDownloadIcon/>}
                    />
                </CardActions>
            </Paper>
        );
    }

}

export default RecordOfMeetingCard;

const PresidentAndAteiroCard = styled(Card)`
    margin: 0 2%;
    border: 1px solid #e0e0e0;
`;
const AbsentsOrLatesCard = styled(Card)`
    margin: 3% 2%;
    background-color: ${orange900}!important;
`;
const AbsentsOrLatesList = styled.div`
    display: flex;
    flexWrap: wrap;
`;
const MyChip = styled(Chip)`
    margin: 4px!important;
`;
const AgendaPointCards = styled.div`
    margin: 0 2%;
`;